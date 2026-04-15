# Webflow 301 Redirects — Add in Site Settings

**Why this matters:** SEMrush crawls static HTML without running JS. Client-side redirects in our bundle only help Googlebot (JS-rendered). Webflow hosting 301s resolve SEMrush's 4XX errors and all downstream broken-internal-link findings.

**Where to add:** Webflow Designer → Site Settings → Publishing → 301 Redirects → Add each pair below.

| Old Path (From) | New Path (To) |
|---|---|
| `/blog-beyond-chatbots-autonomous-ai-agents-healthcare` | `/blog-posts/beyond-chatbots-autonomous-ai-agents-healthcare` |
| `/blog-prior-authorization-bottlenecks-ai-automation-helps-providers` | `/blog-posts/prior-authorization-bottlenecks-ai-automation-helps-providers` |
| `/blog-predictive-analytics-healthcare-ai-population-health-management` | `/blog-posts/predictive-analytics-healthcare-ai-population-health-management` |
| `/blog-ai-changing-decision-making-healthcare` | `/blog-posts/ai-changing-decision-making-healthcare` |
| `/blog-ai-medical-scribes-reduce-physician-burnout` | `/blog-posts/ai-medical-scribes-reduce-physician-burnout` |
| `/blog-reducing-no-shows-behaviorally-intelligent-ai-scheduling-agents` | `/blog-posts/reducing-no-shows-behaviorally-intelligent-ai-scheduling-agents` |
| `/blog-zynix-ai-surpasses-1-million-vbc-patients` | `/blog-posts/zynix-ai-surpasses-1-million-vbc-patients` |
| `/blog-tools-driving-shift-value-based-healthcare` | `/blog-posts/tools-driving-shift-value-based-healthcare` |
| `/blog-acos-consistent-30-day-post-discharge-program` | `/blog-posts/acos-consistent-30-day-post-discharge-program` |
| `/press/pbaco-partnership` | `/press` |
| `/agents/transitions-of-care` | `/agents` |
| `/agents/operational-efficiency` | `/agents` |
| `/agents/clinical-performance` | `/agents` |
| `/agents/operational-efficiency/zynafterhours-triage` | `/agents` |
| `/agents/operational-efficiency/zynschedule` | `/agents` |
| `/agents/preventive-quality-activation/zynreminder` | `/agents` |
| `/who-we-serve/acos-msos` | `/audience-segments/acos-msos` |
| `/who-we-serve/health-plans` | `/audience-segments/health-plans` |
| `/who-we-serve/fqhcs` | `/audience-segments/fqhcs` |

**After adding all 19:** Click "Save Changes" → Publish the site → trigger SEMrush re-crawl.

**Expected SEMrush impact:**
- **19 4XX errors** → 0
- **10 broken internal links** → 0 (or near-zero; 301s resolve the hop)
- **9 broken canonicals** → 0 (canonicals on /blog-posts/ pages are already correct; the 301s remove the ambiguity)
- **Duplicate "Page Not Found" titles** → removed (no more /blog-<slug> rendering 404)
