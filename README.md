# zynix-webflow-content

## Deployment (continuous, from `main`)

**A merge to `main` is a production deploy.** www.zynix.ai (Webflow) loads two files from this repo through jsDelivr `@main`:

| File | Loaded from |
|---|---|
| `zynix-site-scripts-unminified.js` | Webflow site custom code → Footer |
| `zynix-site-styles.deployed.css` | Webflow site custom code → Head |

`.github/workflows/site-bundle.yml` is both the gate and the deploy step:

1. **Pull request:** `node --check`, `ci/static-checks.mjs`, then `ci/smoke.mjs`, which loads real production pages in headless Chrome with the PR's two files swapped in. It is read-only: analytics are blocked, no form is submitted, HubSpot is never contacted.
2. **Push to `main`:** the same checks, then it purges jsDelivr's `@main` cache and fails unless the CDN serves byte-identical files within 10 minutes.

Things to know:

- jsDelivr tells browsers to cache `@main` URLs for 7 days. The bundle therefore re-validates itself and the stylesheet in the background (top of the file). A returning visitor is at most one page view behind a deploy; a hard refresh is always current.
- **Roll back** with `git revert <sha>` and push. **Freeze production** by changing the two URLs in Webflow from `@main` to a commit (`@<sha>`); the background re-validation switches itself off for pinned URLs.
- Edit `zynix-site-styles.deployed.css`, not `zynix-site-styles.css`. The latter is a newer stylesheet that has never been deployed.
- `/sms-consent`, `/sms-program`, `/privacy-policy` and `/terms-of-service` also exist as native Webflow pages that no-JS fetchers (including Twilio's reviewers) read. Any SMS wording change must be made in both places and in the registered A2P campaign. `ci/static-checks.mjs` pins the strings the campaign quotes verbatim.
- Run the checks locally: `node ci/static-checks.mjs && node ci/smoke.mjs` (Node 22+, Google Chrome).
