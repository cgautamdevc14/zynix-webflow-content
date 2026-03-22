/**
 * Zynix AI — Full Website Rebuild v2
 * Mega menu, 41 pages, full content from docs, Calendly CTAs.
 * Loaded externally from Webflow Footer custom code.
 */
(function() {
  'use strict';

  var CALENDLY = 'https://calendly.com/david-zynix-ai-calendar/30min';

  // ── Image URLs ──
  var GH = 'https://raw.githubusercontent.com/cgautamdevc14/zynix-webflow-content/main/images/';
  var GHG = GH + 'gifs/';
  var IMG = {
    // Premium AI-generated page hero images (OpenAI gpt-image-1)
    hero: GH + 'hero-dashboard.png',           // 3D glass dashboard — homepage hero
    doctor: GH + 'doctor-voice-agent.png',          // AI Agent — doctors, AI agents pages
    patient: GH + 'patient-engagement.png',         // Patient engagement — scheduling, reminders
    analytics: GH + 'hero-dashboard.png',       // Hero dashboard — analytics pages
    data: GH + 'data-platform.png',            // Data network — data platform, ZynFax
    care: GH + 'care-team-insights.png',            // Care coordination — care plans, ACOs
    scribe: GH + 'doctor-voice-agent.png',          // AI Agent — ZynScribe
    patients: GH + 'enterprise-command-center.png',        // Enterprise platform — FQHCs, About
    enterprise: GH + 'enterprise-command-center.png',      // Enterprise platform — Zynix OS
    mesh: GH + 'data-platform.png',            // Data network — ZynixLLM
    // Background overlay
    overlay: GH + 'analytics-dashboard.png',         // Dashboard overlay — section backgrounds
    // GIF clips (kept for optional use)
    gifDashboard: GHG + 'dashboard-walkthrough.gif',
    gifMetrics: GHG + 'dashboard-metrics.gif',
    gifAI: GHG + 'ai-medical-imaging.gif',
    gifDoctor: GHG + 'doctor-at-work.gif',
    gifEMR: GHG + 'emr-integration.gif',
    gifScribe: GHG + 'zynscribe-mobile.gif',
    gifLogo: GHG + 'logo-animation.gif',
    // Branding
    logo: GH + 'zynix-fill-horizontal.png',
    logoWhite: GH + 'zynix-ai-brand.png',
    symbol: GH + 'logo-symbol.png',
    favicon: GH + 'favicon-32.png?v=3',
    appleTouchIcon: GH + 'apple-touch-icon.png?v=3',
    // Portal Screenshots (real product — used in gallery sections)
    portalACO: GH + 'zynix-aco-dashboard.png',
    portalProvider: GH + 'zynix-provider-view.png',
    portalChatbot: GH + 'zynix-chatbot.png',
    portalPredictive: GH + 'zynix-predictive-analytics.png',
    portalQuality: GH + 'zynix-quality-measures.png',
    portalACOQuality: GH + 'zynix-aco-quality.png',
    portalACORisk: GH + 'zynix-aco-risk.png'
  };

  // ── Cross-Linking Data Model ──
  var LINK_NAMES = {
    '/products-zynix-os': 'Zynix OS',
    '/products-data-platform': 'Data Platform',
    '/products-analytics': 'Analytics',
    '/products-ai-agents': 'AI Agents',
    '/products-zynscribe': 'ZynScribe',
    '/products-care-plans': 'Care Plans',
    '/company-zynixllm': 'ZynixLLM',
    '/products-ai-agents-zynafterhours': 'ZynAfterHours & Triage',
    '/products-ai-agents-zynschedule': 'ZynSchedule',
    '/products-ai-agents-post-discharge': 'Post-Discharge Follow-Up',
    '/products-ai-agents-med-rec': 'Medication Reconciliation',
    '/products-ai-agents-zynreminder': 'ZynReminder',
    '/products-ai-agents-zynfax': 'ZynFax',
    '/products-ai-agents-zynauth': 'ZynAuth',
    '/solutions-acos': 'ACOs & MSOs',
    '/solutions-health-systems': 'Health Systems',
    '/solutions-health-plans': 'Health Plans',
    '/solutions-fqhcs': 'FQHCs',
    '/solutions-independent-practices': 'Independent Practices',
    '/solutions-ascs': 'ASCs',
    '/solutions-use-case-tcm': 'Transitional Care (TCM)',
    '/solutions-use-case-gap-closure': 'Gap Closure (HCC/HEDIS)',
    '/solutions-use-case-after-hours': 'After-Hours & Access',
    '/solutions-use-case-prior-auth': 'Prior Authorization',
    '/solutions-use-case-preventive-screening': 'Preventive Screening',
    '/solutions-use-case-readmission-prevention': 'Readmission Prevention'
  };

  var CROSS_LINKS = {
    '/products-zynix-os': { useCases: ['/solutions-use-case-tcm','/solutions-use-case-gap-closure','/solutions-use-case-readmission-prevention'], solutions: ['/solutions-acos','/solutions-health-systems','/solutions-health-plans'], related: ['/products-data-platform','/products-analytics','/products-ai-agents','/products-care-plans'] },
    '/products-data-platform': { useCases: ['/solutions-use-case-tcm','/solutions-use-case-gap-closure'], solutions: ['/solutions-acos','/solutions-health-systems','/solutions-health-plans','/solutions-fqhcs'], related: ['/products-analytics','/products-zynix-os'] },
    '/products-analytics': { useCases: ['/solutions-use-case-gap-closure','/solutions-use-case-readmission-prevention','/solutions-use-case-preventive-screening'], solutions: ['/solutions-acos','/solutions-health-plans','/solutions-health-systems'], related: ['/products-data-platform','/products-care-plans'] },
    '/products-ai-agents': { useCases: ['/solutions-use-case-tcm','/solutions-use-case-after-hours','/solutions-use-case-gap-closure','/solutions-use-case-prior-auth'], solutions: ['/solutions-acos','/solutions-health-systems','/solutions-independent-practices','/solutions-fqhcs'], related: ['/products-zynix-os','/products-care-plans','/products-zynscribe'] },
    '/products-zynscribe': { useCases: ['/solutions-use-case-tcm','/solutions-use-case-gap-closure'], solutions: ['/solutions-health-systems','/solutions-independent-practices','/solutions-acos'], related: ['/products-ai-agents','/products-care-plans'] },
    '/products-care-plans': { useCases: ['/solutions-use-case-tcm','/solutions-use-case-gap-closure','/solutions-use-case-readmission-prevention'], solutions: ['/solutions-acos','/solutions-health-systems','/solutions-health-plans'], related: ['/products-ai-agents','/products-analytics','/products-zynix-os'] },
    '/company-zynixllm': { useCases: ['/solutions-use-case-tcm','/solutions-use-case-gap-closure','/solutions-use-case-after-hours'], solutions: ['/solutions-acos','/solutions-health-systems','/solutions-health-plans'], related: ['/products-zynix-os','/products-data-platform','/products-ai-agents'] },
    '/products-ai-agents-zynafterhours': { useCases: ['/solutions-use-case-after-hours','/solutions-use-case-readmission-prevention'], solutions: ['/solutions-independent-practices','/solutions-fqhcs','/solutions-health-systems'], related: ['/products-ai-agents-zynschedule','/products-ai-agents-zynreminder'] },
    '/products-ai-agents-zynschedule': { useCases: ['/solutions-use-case-tcm','/solutions-use-case-after-hours','/solutions-use-case-preventive-screening'], solutions: ['/solutions-independent-practices','/solutions-acos','/solutions-ascs'], related: ['/products-ai-agents-zynreminder','/products-ai-agents-zynafterhours'] },
    '/products-ai-agents-post-discharge': { useCases: ['/solutions-use-case-tcm','/solutions-use-case-readmission-prevention'], solutions: ['/solutions-acos','/solutions-health-systems'], related: ['/products-ai-agents-med-rec','/products-ai-agents-zynschedule','/products-ai-agents-zynreminder'] },
    '/products-ai-agents-med-rec': { useCases: ['/solutions-use-case-tcm','/solutions-use-case-readmission-prevention'], solutions: ['/solutions-acos','/solutions-health-systems'], related: ['/products-ai-agents-post-discharge','/products-ai-agents-zynreminder'] },
    '/products-ai-agents-zynreminder': { useCases: ['/solutions-use-case-preventive-screening','/solutions-use-case-gap-closure','/solutions-use-case-after-hours'], solutions: ['/solutions-independent-practices','/solutions-acos','/solutions-fqhcs'], related: ['/products-ai-agents-zynschedule','/products-ai-agents-zynafterhours'] },
    '/products-ai-agents-zynfax': { useCases: ['/solutions-use-case-prior-auth'], solutions: ['/solutions-health-systems','/solutions-ascs'], related: ['/products-ai-agents-zynauth'] },
    '/products-ai-agents-zynauth': { useCases: ['/solutions-use-case-prior-auth'], solutions: ['/solutions-ascs','/solutions-health-systems','/solutions-independent-practices'], related: ['/products-ai-agents-zynfax','/products-ai-agents-zynschedule'] },
    '/solutions-acos': { products: ['/products-zynix-os','/products-data-platform','/products-analytics','/products-ai-agents','/products-care-plans'], useCases: ['/solutions-use-case-tcm','/solutions-use-case-gap-closure','/solutions-use-case-readmission-prevention','/solutions-use-case-preventive-screening'], related: ['/solutions-health-systems','/solutions-health-plans'] },
    '/solutions-health-systems': { products: ['/products-zynix-os','/products-zynscribe','/products-ai-agents-post-discharge','/products-ai-agents-med-rec'], useCases: ['/solutions-use-case-tcm','/solutions-use-case-readmission-prevention','/solutions-use-case-prior-auth'], related: ['/solutions-acos','/solutions-ascs'] },
    '/solutions-health-plans': { products: ['/products-analytics','/products-care-plans','/products-ai-agents'], useCases: ['/solutions-use-case-gap-closure','/solutions-use-case-preventive-screening'], related: ['/solutions-acos'] },
    '/solutions-fqhcs': { products: ['/products-ai-agents-zynafterhours','/products-ai-agents-zynschedule','/products-ai-agents-zynreminder','/products-analytics'], useCases: ['/solutions-use-case-after-hours','/solutions-use-case-preventive-screening','/solutions-use-case-gap-closure'], related: ['/solutions-independent-practices'] },
    '/solutions-independent-practices': { products: ['/products-ai-agents-zynreminder','/products-ai-agents-zynafterhours','/products-ai-agents-zynschedule','/products-zynscribe'], useCases: ['/solutions-use-case-after-hours','/solutions-use-case-gap-closure'], related: ['/solutions-fqhcs'] },
    '/solutions-ascs': { products: ['/products-ai-agents-zynauth','/products-ai-agents-zynfax','/products-ai-agents-zynschedule'], useCases: ['/solutions-use-case-prior-auth'], related: ['/solutions-health-systems'] },
    '/solutions-use-case-tcm': { products: ['/products-ai-agents-post-discharge','/products-ai-agents-zynschedule','/products-ai-agents-med-rec','/products-zynscribe','/products-data-platform'], solutions: ['/solutions-acos','/solutions-health-systems'], related: ['/solutions-use-case-readmission-prevention','/solutions-use-case-gap-closure'] },
    '/solutions-use-case-gap-closure': { products: ['/products-analytics','/products-ai-agents-zynreminder','/products-ai-agents-zynschedule','/products-care-plans'], solutions: ['/solutions-acos','/solutions-health-plans'], related: ['/solutions-use-case-preventive-screening','/solutions-use-case-tcm'] },
    '/solutions-use-case-after-hours': { products: ['/products-ai-agents-zynafterhours','/products-ai-agents-zynschedule','/products-ai-agents-zynreminder'], solutions: ['/solutions-independent-practices','/solutions-fqhcs'], related: ['/solutions-use-case-readmission-prevention'] },
    '/solutions-use-case-prior-auth': { products: ['/products-ai-agents-zynauth','/products-ai-agents-zynfax','/products-ai-agents-zynschedule'], solutions: ['/solutions-ascs','/solutions-health-systems'], related: ['/solutions-use-case-gap-closure'] },
    '/solutions-use-case-preventive-screening': { products: ['/products-analytics','/products-ai-agents-zynreminder','/products-ai-agents-zynschedule'], solutions: ['/solutions-fqhcs','/solutions-acos','/solutions-health-plans'], related: ['/solutions-use-case-gap-closure'] },
    '/solutions-use-case-readmission-prevention': { products: ['/products-ai-agents-post-discharge','/products-ai-agents-med-rec','/products-ai-agents-zynafterhours','/products-ai-agents-zynschedule'], solutions: ['/solutions-acos','/solutions-health-systems'], related: ['/solutions-use-case-tcm','/solutions-use-case-after-hours'] }
  };

  // ── SEO Data ──
  var SITE_DOMAIN = (window.location.hostname.indexOf('zynix.ai') > -1) ? 'https://www.zynix.ai' : window.location.origin;
  var PAGE_SEO = {
    '': { title: 'AI for Value-Based Care | Zynix AI', desc: 'Zynix AI deploys autonomous AI agents that close care gaps, boost shared savings, and automate coordination for ACOs and health systems. Request a demo today.', img: IMG.hero, schema: 'Organization' },
    '/products-zynix-os': { title: 'Value-Based Care Operating System | Zynix AI', desc: 'Zynix OS unifies data, analytics, AI agents, and care plans into one healthcare AI platform. Automate care delivery and hit quality targets. See it in action.', img: IMG.enterprise, schema: 'Product' },
    '/products-data-platform': { title: 'Healthcare Data Platform | Zynix AI', desc: 'Integrate EHR, claims, ADT, and SDOH clinical data into one unified layer with 97%+ patient matching. Power real-time insights for value-based care programs.', img: IMG.data, schema: 'Product' },
    '/products-analytics': { title: 'Population Health Analytics | Zynix AI', desc: 'AI-driven risk stratification, HCC coding, and population health analytics that close quality gaps 40% faster. Built for ACOs and health plans. Get a demo.', img: IMG.analytics, schema: 'Product' },
    '/products-ai-agents': { title: 'AI Agents for Healthcare | Zynix AI', desc: 'Seven autonomous AI agents automate care coordination, outreach, scheduling, triage, and documentation. Over 1M patient interactions across 30 states. Learn more.', img: IMG.doctor, schema: 'Product' },
    '/products-zynscribe': { title: 'AI Clinical Documentation | Zynix AI', desc: 'ZynScribe delivers ambient documentation that captures structured clinical notes in real time. Cut documentation burden by 70% while staying HIPAA compliant.', img: IMG.scribe, schema: 'Product' },
    '/products-care-plans': { title: 'AI Care Plans for TCM CCM AWV | Zynix AI', desc: 'Deploy AI-orchestrated care plans that automate TCM, CCM, and AWV workflows. Achieve 85%+ contact rates and maximize CMS reimbursements. Request a demo now.', img: IMG.care, schema: 'Product' },
    '/company-zynixllm': { title: 'Healthcare AI Language Model | Zynix AI', desc: 'ZynixLLM is a clinical NLP model purpose-built for healthcare workflows. Lower hallucination rates and deeper medical reasoning than general-purpose AI models.', img: IMG.mesh, schema: 'Product' },
    '/products-zynixllm': { title: 'Clinical NLP for Healthcare | Zynix AI', desc: 'ZynixLLM powers clinical NLP across the Zynix platform with healthcare-native language understanding. Trained on real workflows, not just medical literature.', img: IMG.mesh, schema: 'Product' },
    '/products-ai-agents-zynafterhours': { title: 'AI After-Hours Triage | Zynix AI', desc: 'Provide 24/7 patient support with AI-powered after-hours triage in 15+ languages. Achieve 97.3% accuracy and divert 20-30% of unnecessary ER visits. Learn more.', img: IMG.doctor, schema: 'Product' },
    '/products-ai-agents-zynschedule': { title: 'AI Scheduling for Healthcare | Zynix AI', desc: 'Reduce no-shows and fill every appointment slot with always-on AI scheduling. ZynSchedule books patients 24/7 across practices and ACOs. See how it works.', img: IMG.patient, schema: 'Product' },
    '/products-ai-agents-post-discharge': { title: 'Post-Discharge Follow-Up AI | Zynix AI', desc: 'Automate TCM post-discharge outreach and achieve 85%+ contact rates versus the 30-40% industry average. Trusted by ACOs and health systems. Request a demo.', img: IMG.care, schema: 'Product' },
    '/products-ai-agents-med-rec': { title: 'Medication Reconciliation AI | Zynix AI', desc: 'AI-powered medication reconciliation identifies discrepancies at discharge and high-risk transitions. Capture confirmations and route issues automatically.', img: IMG.care, schema: 'Product' },
    '/products-ai-agents-zynreminder': { title: 'AI Appointment Reminders | Zynix AI', desc: 'Boost patient engagement and cut no-shows by 40% with personalized AI reminders and confirmation workflows. Serving practices and health centers nationwide.', img: IMG.patient, schema: 'Product' },
    '/products-ai-agents-zynfax': { title: 'AI Fax Processing Healthcare | Zynix AI', desc: 'Eliminate manual fax processing with intelligent fax automation that classifies, extracts data, and routes documents. Deployed by health systems nationwide.', img: IMG.enterprise, schema: 'Product' },
    '/products-ai-agents-zynauth': { title: 'Prior Authorization Automation | Zynix AI', desc: 'Cut prior auth turnaround by 60% with AI-powered submission, tracking, and follow-up. Streamline prior auth workflows for ASCs and health systems. Get a demo.', img: IMG.enterprise, schema: 'Product' },
    '/solutions-acos': { title: 'AI for ACOs | MSSP & ACO REACH | Zynix AI', desc: 'Drive shared savings in MSSP and ACO REACH programs with AI-powered TCM workflows, HCC gap closure, and automated outreach. 85% TCM contact rates. See results.', img: IMG.care, schema: 'Product' },
    '/solutions-health-systems': { title: 'AI for Health Systems | Zynix AI', desc: 'Unify population health management with AI-driven patient engagement, post-discharge coordination, and documentation. Reduce readmissions 25%. Request a demo.', img: IMG.enterprise, schema: 'Product' },
    '/solutions-health-plans': { title: 'AI for Health Plans | Zynix AI', desc: 'Improve Stars ratings, close HEDIS quality gaps, and scale member engagement with autonomous AI agents. Trusted by value-based payers nationwide. Learn more.', img: IMG.analytics, schema: 'Product' },
    '/solutions-fqhcs': { title: 'AI for FQHCs | Zynix AI', desc: 'Empower community health centers with multilingual AI outreach in 15+ languages, quality measure tracking, and automated care management. See how FQHCs benefit.', img: IMG.patients, schema: 'Product' },
    '/solutions-independent-practices': { title: 'AI for Medical Practices | Zynix AI', desc: 'Automate your practice with AI-powered after-hours coverage, scheduling, and documentation. Reduce no-shows 40% and deploy in weeks, not months. Get started.', img: IMG.doctor, schema: 'Product' },
    '/solutions-ascs': { title: 'AI for Ambulatory Surgery Centers | Zynix AI', desc: 'Accelerate prior auth approvals by 60%, reduce surgical cancellations, and streamline pre-op and post-op coordination for ASCs. Schedule a demo with Zynix AI.', img: IMG.enterprise, schema: 'Product' },
    '/solutions-use-case-tcm': { title: 'TCM Automation | Zynix AI', desc: 'Automate transitional care management AI workflows and achieve 85%+ contact rates versus the 30-40% industry average. CMS-reimbursable and fully automated.', img: IMG.care, schema: 'Product' },
    '/solutions-use-case-gap-closure': { title: 'Care Gap Closure AI | Zynix AI', desc: 'Close HCC, RAF, and quality gaps 40% faster with AI-prioritized worklists and automated patient outreach. Deployed across ACOs and health plans. See results.', img: IMG.analytics, schema: 'Product' },
    '/solutions-use-case-after-hours': { title: 'After-Hours Patient Care AI | Zynix AI', desc: 'Deliver 24/7 nurse-level triage with AI call handling that achieves 97.3% accuracy and diverts 20-30% of ER visits. Serving practices and FQHCs nationwide.', img: IMG.doctor, schema: 'Product' },
    '/solutions-use-case-prior-auth': { title: 'Prior Auth AI Workflow | Zynix AI', desc: 'Slash prior authorization turnaround by 60% with AI-powered submission, tracking, and approval workflows. Trusted by ASCs and health systems. Request a demo.', img: IMG.enterprise, schema: 'Product' },
    '/solutions-use-case-preventive-screening': { title: 'Preventive Screening AI | Zynix AI', desc: 'Increase HEDIS quality measure completion with AI-driven preventive screening outreach and automated scheduling. Deployed by FQHCs, ACOs, and health plans.', img: IMG.patients, schema: 'Product' },
    '/solutions-use-case-readmission-prevention': { title: 'Hospital Readmission Prevention AI | Zynix AI', desc: 'Reduce avoidable hospital readmissions 25% with AI risk stratification and automated post-discharge intervention. Proven across ACOs and health systems.', img: IMG.care, schema: 'Product' },
    '/company-about': { title: 'About Zynix AI | Healthcare AI Company', desc: 'Zynix AI is a healthcare AI company purpose-built for value-based care. 1M+ patients onboarded across 30 states serving ACOs, health systems, and health plans.', img: IMG.patients, schema: 'MedicalBusiness' },
    '/company-careers': { title: 'Careers | Zynix AI', desc: 'Join the team building the AI operating system for value-based healthcare. Engineering, clinical, and operations roles in Trinity, FL and remote positions.', img: IMG.hero, schema: 'Organization', noindex: true },
    '/company-press': { title: 'Press & News | Zynix AI', desc: 'Latest news, press releases, and media coverage about Zynix AI and the future of AI-powered value-based healthcare across the United States.', img: IMG.hero, schema: 'Organization', noindex: true },
    '/company-trust-center': { title: 'Trust & Security | Zynix AI', desc: 'Zynix AI is HIPAA compliant and SOC 2 Type II certified. Explore our security practices, data governance, and compliance standards for healthcare AI platforms.', img: IMG.enterprise, schema: 'Organization' },
    '/contact': { title: 'Contact Zynix AI | Request a Demo', desc: 'Request a personalized demo and see how Zynix AI transforms healthcare operations for ACOs, health systems, and practices. Based in Trinity, FL. Book today.', img: IMG.hero, schema: 'MedicalBusiness' },
    '/resources-faq': { title: 'FAQ | Zynix AI', desc: 'Find answers about the Zynix healthcare AI platform, including HIPAA compliance, EHR integration, pricing, deployment timelines, and ongoing support options.', img: IMG.hero, schema: 'FAQPage' },
    '/resources-blog': { title: 'Blog | Healthcare AI Insights | Zynix AI', desc: 'Expert healthcare AI insights on value-based care, population health, care coordination, and operational transformation from the Zynix AI team. Read the latest.', img: IMG.hero, schema: 'Organization' },
    '/resources-blog-1m-patients': { title: 'Zynix AI Reaches 1M VBC Patients | Zynix AI', desc: 'Zynix AI announces 1 million value-based care patients onboarded across healthcare organizations in 30 states. Read about this AI-powered healthcare milestone.', img: IMG.hero, schema: 'Article' },
    '/resources-case-studies': { title: 'Case Studies | Healthcare AI Results | Zynix AI', desc: 'See real healthcare AI results from ACOs, health systems, and practices using Zynix AI. Proven outcomes across 1M+ value-based care patients. Explore studies.', img: IMG.care, schema: 'Organization' },
    '/resources-glossary': { title: 'Healthcare AI Glossary | Zynix AI', desc: 'Browse the complete healthcare AI glossary covering value-based care, interoperability, HCC coding, claims processing, and compliance terms. Learn the language.', img: IMG.hero, schema: 'Organization' },
    '/resources-webinars': { title: 'Webinars & Events | Zynix AI', desc: 'Upcoming and on-demand webinars on healthcare AI, value-based care operations, and care management best practices from Zynix AI experts. Register or watch now.', img: IMG.hero, schema: 'Organization', noindex: true },
    '/resources-whitepapers': { title: 'Whitepapers & Reports | Zynix AI', desc: 'Download research on healthcare AI, value-based care outcomes, population health analytics, and operational transformation. Data-driven insights from Zynix AI.', img: IMG.hero, schema: 'Organization', noindex: true },
    '/company-privacy': { title: 'Privacy Policy | Zynix AI', desc: 'Zynix AI privacy policy detailing how we collect, use, and protect your personal and health-related information across our healthcare AI platform and services.', img: IMG.hero, schema: 'Organization' },
    '/company-terms': { title: 'Terms of Service | Zynix AI', desc: 'Review the Zynix AI terms of service governing use of our healthcare AI platform, data processing agreements, and related professional services offerings.', img: IMG.hero, schema: 'Organization' },
    '/compare/zynix-vs-point-solutions': { title: 'Zynix AI vs Point Solutions | Zynix AI', desc: 'Compare the Zynix unified AI operating system against fragmented point solutions for value-based care. See why leading ACOs choose one platform over many tools.', img: IMG.enterprise, schema: 'Organization' },
    '/compare/zynix-vs-innovaccer': { title: 'Zynix AI vs Innovaccer | Zynix AI', desc: 'Compare Zynix AI and Innovaccer head to head. Zynix delivers autonomous AI agents that take action while Innovaccer focuses on data aggregation and dashboards.', img: IMG.enterprise, schema: 'Organization' },
    '/compare/zynix-vs-commure': { title: 'Zynix AI vs Commure | Zynix AI', desc: 'Compare Zynix AI and Commure for healthcare operations. Zynix is a turnkey AI operating system while Commure requires custom engineering to build workflows.', img: IMG.enterprise, schema: 'Organization' },
    '/blog/what-is-value-based-care-ai': { title: 'What is Value-Based Care AI? Guide [2026]', desc: 'Value-based care AI automates care coordination, closes quality gaps, and optimizes risk adjustment for ACOs and health systems. Learn how VBC AI works in 2026.', img: IMG.analytics, schema: 'Article', datePublished: '2026-03-01' },
    '/blog/how-ai-closes-care-gaps': { title: 'How AI Closes Care Gaps | Zynix AI', desc: 'Discover how AI automates HCC, RAF, and quality measure gap closure from identification through patient outreach to confirmed resolution. Improve HEDIS scores.', img: IMG.care, schema: 'Article', datePublished: '2026-03-10' },
    '/blog/ai-agents-vs-chatbots-healthcare': { title: 'AI Agents vs Chatbots in Healthcare', desc: 'Healthcare AI agents take autonomous action while chatbots only answer questions. Learn the key differences and why agents deliver better outcomes for care teams.', img: IMG.doctor, schema: 'Article', datePublished: '2026-03-15' },
    '/case-studies/palm-beach-aco': { title: 'Palm Beach ACO Case Study | Zynix AI', desc: 'Palm Beach ACO achieved 85% TCM contact rates, 40% gap closure improvement, and 3x AWV lift using Zynix AI. Read the full value-based care case study results.', img: IMG.care, schema: 'Article', datePublished: '2026-02-01' }
  };

  // ── SEO Injection ──
  function injectSEO(pagePath) {
    var seo = PAGE_SEO[pagePath];
    if (!seo) return;
    var canonical = SITE_DOMAIN + (pagePath || '/');
    document.title = seo.title;
    function setMeta(attr, val, content) {
      var el = document.querySelector('meta[' + attr + '="' + val + '"]');
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, val); document.head.appendChild(el); }
      el.setAttribute('content', content);
    }
    setMeta('name','description', seo.desc);
    setMeta('name','robots', seo.noindex ? 'noindex, nofollow' : 'index, follow');
    setMeta('name','geo.region','US-FL');
    setMeta('name','geo.placename','Trinity, Florida');
    setMeta('name','geo.position','28.1856;-82.6800');
    setMeta('name','ICBM','28.1856, -82.6800');
    setMeta('property','og:title', seo.title);
    setMeta('property','og:description', seo.desc);
    setMeta('property','og:image', seo.img || IMG.hero);
    setMeta('property','og:url', canonical);
    setMeta('property','og:type','website');
    setMeta('property','og:site_name','Zynix AI');
    setMeta('name','twitter:card','summary_large_image');
    setMeta('name','twitter:title', seo.title);
    setMeta('name','twitter:description', seo.desc);
    setMeta('name','twitter:image', seo.img || IMG.hero);
    var link = document.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
    link.href = canonical;
    // Favicon
    var fi = document.querySelector('link[rel="icon"]');
    if (!fi) { fi = document.createElement('link'); fi.rel = 'icon'; fi.type = 'image/png'; fi.sizes = '32x32'; document.head.appendChild(fi); }
    fi.href = IMG.favicon;
    var ati = document.querySelector('link[rel="apple-touch-icon"]');
    if (!ati) { ati = document.createElement('link'); ati.rel = 'apple-touch-icon'; ati.sizes = '256x256'; document.head.appendChild(ati); }
    ati.href = IMG.appleTouchIcon;
    injectJSONLD(pagePath, seo);
  }

  function injectJSONLD(pagePath, seo) {
    var orgSchema = {
      '@context':'https://schema.org','@type':'Organization',
      name:'Zynix AI',url:'https://www.zynix.ai',logo:IMG.logo,
      description:'The AI operating system for value-based healthcare. 1 million VBC patients onboarded across 16+ healthcare organizations.',
      address:{'@type':'PostalAddress',streetAddress:'3535 Little Rd',addressLocality:'Trinity',addressRegion:'FL',postalCode:'34655',addressCountry:'US'},
      contactPoint:{'@type':'ContactPoint',email:'info@zynix.ai',contactType:'sales'},
      areaServed:{'@type':'Country',name:'United States'},
      numberOfEmployees:{'@type':'QuantitativeValue',value:'50-100'},
      foundingDate:'2023',
      sameAs:['https://www.linkedin.com/company/zynix/','https://x.com/zynixai_','https://www.instagram.com/zynixai/']
    };
    var schemas = [orgSchema];

    // WebSite schema (homepage only)
    if (!pagePath || pagePath === '/') {
      schemas.push({'@context':'https://schema.org','@type':'WebSite',name:'Zynix AI',url:'https://www.zynix.ai',description:'The AI Operating System for Value-Based Healthcare',publisher:{'@type':'Organization',name:'Zynix AI'}});
    }

    // BreadcrumbList schema (all inner pages)
    if (pagePath && pagePath !== '/') {
      var crumbs = [{'@type':'ListItem',position:1,name:'Home',item:'https://www.zynix.ai'}];
      var seg = pagePath.replace(/^\//,'').split('-');
      var sectionMap = {products:'Products',solutions:'Solutions',company:'Company',resources:'Resources'};
      if (sectionMap[seg[0]]) {
        crumbs.push({'@type':'ListItem',position:2,name:sectionMap[seg[0]],item:'https://www.zynix.ai/' + seg[0] + '-' + (seg[0]==='products'?'zynix-os':seg[0]==='solutions'?'acos':seg[0]==='company'?'about':seg[0]==='resources'?'blog':'')});
      }
      crumbs.push({'@type':'ListItem',position:crumbs.length+1,name:seo.title.split('|')[0].trim(),item:'https://www.zynix.ai' + pagePath});
      schemas.push({'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:crumbs});
    }

    if (seo.schema === 'Product') {
      schemas.push({'@context':'https://schema.org','@type':'SoftwareApplication',name:seo.title.split('|')[0].trim(),description:seo.desc,applicationCategory:'HealthcareApplication',operatingSystem:'Web',offers:{'@type':'Offer',price:'0',priceCurrency:'USD',description:'Contact for pricing'},brand:{'@type':'Organization',name:'Zynix AI'}});
    }
    if (seo.schema === 'MedicalBusiness') {
      schemas.push({'@context':'https://schema.org','@type':'MedicalBusiness',name:'Zynix AI',description:seo.desc,address:orgSchema.address,geo:{'@type':'GeoCoordinates',latitude:28.1856,longitude:-82.6800},areaServed:'United States',medicalSpecialty:'Value-Based Care',url:'https://www.zynix.ai'});
    }
    if (seo.schema === 'Article') {
      schemas.push({'@context':'https://schema.org','@type':'Article',headline:seo.title.split('|')[0].trim(),description:seo.desc,image:seo.img||IMG.hero,author:{'@type':'Organization',name:'Zynix AI'},publisher:{'@type':'Organization',name:'Zynix AI',logo:{'@type':'ImageObject',url:IMG.logo}},datePublished:seo.datePublished||'2026-01-15',dateModified:seo.dateModified||'2026-01-15',mainEntityOfPage:'https://www.zynix.ai'+pagePath});
    }

    // FAQPage schema — detect FAQ items on ANY page, not just /faq
    var faqEls = document.querySelectorAll('.zynix-faq-item');
    var mainEntity = [];
    faqEls.forEach(function(f) {
      var q = f.querySelector('.zynix-faq-q');
      var a = f.querySelector('.zynix-faq-a');
      if (q && a) mainEntity.push({'@type':'Question',name:q.textContent.trim(),acceptedAnswer:{'@type':'Answer',text:a.textContent.trim()}});
    });
    if (mainEntity.length) schemas.push({'@context':'https://schema.org','@type':'FAQPage',mainEntity:mainEntity});

    schemas.forEach(function(s) {
      var sc = document.createElement('script');
      sc.type = 'application/ld+json';
      sc.textContent = JSON.stringify(s);
      document.head.appendChild(sc);
    });
  }

  // ── Cross-Link Renderers ──
  function renderRelatedSection(title, tag, slugs) {
    if (!slugs || !slugs.length) return '';
    var html = '<section class="zynix-related-section"><div class="zynix-container">' +
      '<span class="zynix-tag">' + tag + '</span>' +
      '<h2>' + title + '</h2>' +
      '<div class="zynix-related-grid">';
    slugs.forEach(function(slug) {
      var name = LINK_NAMES[slug] || slug.replace(/\//g,'').replace(/-/g,' ');
      html += '<a href="' + slug + '" class="zynix-related-card">' +
        '<div class="zynix-rc-text"><h4>' + name + '</h4></div>' +
        '<span class="zynix-rc-arrow">&rarr;</span></a>';
    });
    html += '</div></div></section>';
    return html;
  }

  function renderCrossLinks(pagePath) {
    var cl = CROSS_LINKS[pagePath];
    if (!cl) return '';
    var html = '';
    if (cl.products) html += renderRelatedSection('Products That Power This', 'PRODUCTS', cl.products);
    if (cl.useCases) html += renderRelatedSection('Related Use Cases', 'USE CASES', cl.useCases);
    if (cl.solutions) html += renderRelatedSection('Built For', 'SOLUTIONS', cl.solutions);
    if (cl.related) html += renderRelatedSection('Explore More', 'RELATED', cl.related);
    return html;
  }

  function renderBreadcrumb(pagePath) {
    var parts = pagePath.replace(/^\//, '').split('-');
    var section = parts[0];
    var labels = { products: 'Products', solutions: 'Solutions', company: 'Company', resources: 'Resources', contact: 'Contact' };
    var sectionLabel = labels[section] || '';
    var pageName = (LINK_NAMES[pagePath] || '').replace(/ \| .*/, '');
    if (!sectionLabel || !pageName) return '';
    return '<div class="zynix-breadcrumb"><div class="zynix-container">' +
      '<a href="/">Home</a><span class="zynix-bc-sep">/</span>' +
      '<span>' + sectionLabel + '</span><span class="zynix-bc-sep">/</span>' +
      '<span class="zynix-bc-current">' + pageName + '</span>' +
      '</div></div>';
  }

  // ── Helpers ──
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html) e.innerHTML = html;
    return e;
  }

  function hideWebflowContent() {
    // Hide ALL body children that aren't zynix-injected, zynix-mega-nav, zynix-mobile-menu, or scripts
    var bodyChildren = document.body.children;
    for (var i = 0; i < bodyChildren.length; i++) {
      var child = bodyChildren[i];
      if (child.tagName === 'SCRIPT' || child.tagName === 'STYLE' || child.tagName === 'LINK') continue;
      if (child.classList.contains('zynix-injected') || child.classList.contains('zynix-mega-nav') || child.classList.contains('zynix-mobile-menu') || child.classList.contains('zynix-announcement-bar')) continue;
      child.style.display = 'none';
    }
    // Also hide main/header/footer from Webflow template
    var wfElements = document.querySelectorAll('main, header, footer:not(.zynix-footer), .w-nav, .navbar, [data-collapse], .hero-section, .section, .w-container');
    wfElements.forEach(function(el) {
      if (!el.closest('.zynix-injected') && !el.classList.contains('zynix-mega-nav')) {
        el.style.display = 'none';
      }
    });
  }

  function injectAfterNav(html) {
    var wrapper = el('div', 'zynix-injected zynix-inner-page');
    wrapper.innerHTML = html;
    var zynixNav = document.querySelector('.zynix-mega-nav');
    if (zynixNav) {
      zynixNav.parentNode.insertBefore(wrapper, zynixNav.nextSibling);
    } else {
      document.body.insertBefore(wrapper, document.body.firstChild);
    }
    // Hide old Webflow content
    hideWebflowContent();
    return wrapper;
  }

  // ── Shared Components ──
  // SVG icons for footer
  var SVG_LINKEDIN = '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>';
  var SVG_X = '<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>';
  var SVG_INSTAGRAM = '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>';
  var SVG_HIPAA = '<svg viewBox="0 0 40 40" width="32" height="32"><rect width="40" height="40" rx="8" fill="#1a73e8" opacity="0.15"/><path d="M20 6l-10 5v9c0 7.1 4.3 13.7 10 16 5.7-2.3 10-8.9 10-16v-9l-10-5z" fill="none" stroke="#1a73e8" stroke-width="2"/><path d="M15 20l3 3 7-7" fill="none" stroke="#1a73e8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var SVG_SOC2 = '<svg viewBox="0 0 40 40" width="32" height="32"><rect width="40" height="40" rx="8" fill="#34a853" opacity="0.15"/><rect x="12" y="16" width="16" height="12" rx="2" fill="none" stroke="#34a853" stroke-width="2"/><path d="M16 16v-3a4 4 0 018 0v3" fill="none" stroke="#34a853" stroke-width="2"/><circle cx="20" cy="23" r="2" fill="#34a853"/></svg>';
  var SVG_HITRUST = '<svg viewBox="0 0 40 40" width="32" height="32"><rect width="40" height="40" rx="8" fill="#7c3aed" opacity="0.15"/><path d="M20 6l-10 5v9c0 7.1 4.3 13.7 10 16 5.7-2.3 10-8.9 10-16v-9l-10-5z" fill="none" stroke="#7c3aed" stroke-width="2"/><path d="M16 20h8M20 16v8" stroke="#7c3aed" stroke-width="2.5" stroke-linecap="round"/></svg>';
  var SVG_GDPR = '<svg viewBox="0 0 40 40" width="32" height="32"><rect width="40" height="40" rx="8" fill="#ea4335" opacity="0.15"/><circle cx="20" cy="20" r="10" fill="none" stroke="#ea4335" stroke-width="2"/><circle cx="20" cy="20" r="4" fill="none" stroke="#ea4335" stroke-width="2"/><path d="M20 6v4M20 30v4M6 20h4M30 20h4" stroke="#ea4335" stroke-width="2" stroke-linecap="round"/></svg>';

  function renderFooter() {
    return '<footer class="zynix-footer"><div class="zynix-footer-inner">' +
      '<div class="zynix-footer-brand"><img src="' + IMG.logoWhite + '" alt="Zynix AI" style="height:48px;margin-bottom:16px;"><p>The operating system for value-based care. Purpose-built AI that unifies clinical, financial, and operational intelligence.</p>' +
      '<div class="zynix-footer-social">' +
      '<a href="https://www.linkedin.com/company/zynix/" target="_blank" rel="noopener" aria-label="LinkedIn">' + SVG_LINKEDIN + '</a>' +
      '<a href="https://x.com/zynixai_" target="_blank" rel="noopener" aria-label="X">' + SVG_X + '</a>' +
      '<a href="https://www.instagram.com/zynixai/" target="_blank" rel="noopener" aria-label="Instagram">' + SVG_INSTAGRAM + '</a>' +
      '</div></div>' +
      '<div class="zynix-footer-col"><h4>PRODUCTS</h4><a href="/products-zynix-os">Zynix OS</a><a href="/products-data-platform">Data Platform</a><a href="/products-analytics">Analytics</a><a href="/products-ai-agents">AI Agents</a><a href="/products-zynscribe">ZynScribe</a><a href="/products-care-plans">Care Plans</a><a href="/company-zynixllm">ZynixLLM</a></div>' +
      '<div class="zynix-footer-col"><h4>SOLUTIONS</h4><a href="/solutions-acos">ACOs & MSOs</a><a href="/solutions-health-systems">Health Systems</a><a href="/solutions-health-plans">Health Plans</a><a href="/solutions-fqhcs">FQHCs</a><a href="/solutions-independent-practices">Practices</a><a href="/solutions-ascs">ASCs</a></div>' +
      '<div class="zynix-footer-col"><h4>COMPANY</h4><a href="/company-about">About</a><a href="/company-careers">Careers</a><a href="/company-trust-center">Trust Center</a><a href="/company-press">Press</a><a href="/contact">Contact</a></div>' +
      '<div class="zynix-footer-col"><h4>RESOURCES</h4><a href="/resources-blog">Blog</a><a href="/resources-case-studies">Case Studies</a><a href="/resources-faq">FAQ</a><a href="/resources-webinars">Webinars</a><a href="/company-privacy">Privacy</a><a href="/company-terms">Terms</a></div>' +
      '</div>' +
      '<div class="zynix-footer-compliance">' +
      '<div class="zynix-compliance-badge"><div class="zynix-compliance-icon">' + SVG_HIPAA + '</div><div><strong>HIPAA</strong><span>Compliant</span></div></div>' +
      '<div class="zynix-compliance-badge"><div class="zynix-compliance-icon">' + SVG_SOC2 + '</div><div><strong>SOC 2</strong><span>Type II Certified</span></div></div>' +
      '<div class="zynix-compliance-badge"><div class="zynix-compliance-icon">' + SVG_HITRUST + '</div><div><strong>HITRUST</strong><span>CSF Ready</span></div></div>' +
      '<div class="zynix-compliance-badge"><div class="zynix-compliance-icon">' + SVG_GDPR + '</div><div><strong>GDPR</strong><span>Compliant</span></div></div>' +
      '</div>' +
      '<div class="zynix-footer-bottom"><p>&copy; 2026 Zynix AI. All rights reserved. &middot; <a href="/company-privacy">Privacy Policy</a> &middot; <a href="/company-terms">Terms of Service</a> &middot; <a href="/company-trust-center">Security</a></p></div></footer>';
  }

  function renderCTA(title, subtitle, btnText) {
    return '<section class="zynix-cta-section"><div class="zynix-container">' +
      '<h2>' + (title || 'See Zynix in Action') + '</h2>' +
      '<p>' + (subtitle || 'Join the healthcare organizations already transforming care with AI-powered intelligence.') + '</p>' +
      '<div class="zynix-cta-btns">' +
      '<a href="' + CALENDLY + '" class="zynix-btn-primary" target="_blank">' + (btnText || 'Request a Demo') + ' &rarr;</a>' +
      '<a href="/company-trust-center" class="zynix-btn-secondary">Security & Compliance</a>' +
      '</div>' +
      '<div class="zynix-cta-trust">' +
      '<span>&#128737; HIPAA</span><span>&#128274; SOC 2 Type II</span><span>&#9989; HITRUST</span>' +
      '<span>&#127760; GDPR</span><span>&#128100; 1M+ Patients</span><span>&#127961; 30 States</span>' +
      '</div>' +
      '</div></section>';
  }

  function renderInnerHero(tag, title, subtitle, image, imgAlt) {
    return '<section class="zynix-inner-hero"><div class="zynix-container zynix-inner-hero-grid">' +
      '<div class="zynix-inner-hero-text">' +
      (tag ? '<span class="zynix-tag">' + tag + '</span>' : '') +
      '<h1>' + title + '</h1>' +
      '<p>' + subtitle + '</p>' +
      '<div class="zynix-hero-btns"><a href="' + CALENDLY + '" class="zynix-btn-primary" target="_blank">Request a Demo &rarr;</a><a href="#capabilities" class="zynix-btn-secondary">Explore Capabilities</a></div>' +
      '<div class="zynix-hero-trust">' +
      '<span class="zynix-hero-badge">&#128737; HIPAA</span>' +
      '<span class="zynix-hero-badge">&#128274; SOC 2</span>' +
      '<span class="zynix-hero-badge">&#9989; HITRUST</span>' +
      '</div>' +
      '</div>' +
      (image ? '<div class="zynix-inner-hero-img"><img src="' + image + '" alt="' + (imgAlt || '') + '"></div>' : '') +
      '</div></section>';
  }

  function renderFeatureCards(cards) {
    var html = '<div class="zynix-feature-grid">';
    cards.forEach(function(c) {
      html += '<div class="zynix-feature-card fade-in-up">' +
        (c.icon ? '<div class="zynix-feature-icon">' + c.icon + '</div>' : '') +
        '<h3>' + c.title + '</h3>' +
        '<p>' + c.desc + '</p>' +
        (c.metric ? '<div class="zynix-feature-metric"><span>' + c.metric + '</span>' + (c.metricLabel ? '<small>' + c.metricLabel + '</small>' : '') + '</div>' : '') +
        '</div>';
    });
    html += '</div>';
    return html;
  }

  function renderMetricsBar(metrics) {
    var html = '<div class="zynix-metrics-bar">';
    metrics.forEach(function(m) {
      html += '<div class="zynix-metric fade-in-up"><span class="zynix-metric-value">' + m.value + '</span><span class="zynix-metric-label">' + m.label + '</span></div>';
    });
    html += '</div>';
    return html;
  }

  function renderProblemSection(title, problems) {
    var html = '<section class="zynix-problem-section"><div class="zynix-container">' +
      '<span class="zynix-tag">THE CHALLENGE</span>' +
      '<h2>' + title + '</h2><div class="zynix-problem-grid">';
    problems.forEach(function(p) {
      html += '<div class="zynix-problem-card fade-in-up"><div class="zynix-problem-icon">' + (p.icon || '&#9888;') + '</div><h3>' + p.title + '</h3><p>' + p.desc + '</p></div>';
    });
    html += '</div></div></section>';
    return html;
  }

  // ── PAGE: Zynix OS ──
  function renderZynixOS() {
    return renderInnerHero('ZYNIX OS', 'The AI Operating System for Healthcare',
      'An integrated platform where AI agents work together like a coordinated workforce -delivering measurable patient and financial outcomes at scale.',
      IMG.enterprise, 'Zynix OS Enterprise Platform') +

    renderProblemSection('Healthcare Has a Doing Problem, Not a Knowing Problem', [
      { icon: '&#128202;', title: 'Millions Spent on Analytics', desc: 'Every organization has invested heavily in BI tools. You know who needs care. The problem is delivering that care at scale.' },
      { icon: '&#128100;', title: 'Staff Can\u2019t Keep Up', desc: 'Care coordinators are overwhelmed with worklists, phone calls, and documentation. Manual processes don\u2019t scale.' },
      { icon: '&#128268;', title: 'Disconnected Point Solutions', desc: 'Scheduling in one tool, outreach in another, documentation in a third. Nothing talks to anything else.' }
    ]) +

    '<section class="zynix-architecture-section" id="capabilities"><div class="zynix-container">' +
    '<span class="zynix-tag">ARCHITECTURE</span>' +
    '<h2>Four Layers. One Platform.</h2>' +
    '<p class="zynix-section-sub">Zynix OS integrates data, intelligence, execution, and orchestration into a single operating system.</p>' +
    '<div class="zynix-arch-grid">' +
    '<div class="zynix-arch-card fade-in-up" style="border-left:4px solid #ccfdcf"><div class="zynix-arch-num">01</div><h3>Data</h3><p>Unify and normalize clinical and administrative data into a single, clean source of truth.</p></div>' +
    '<div class="zynix-arch-card fade-in-up" style="border-left:4px solid #cebffa"><div class="zynix-arch-num">02</div><h3>Intelligence</h3><p>Convert raw data into prioritized, actionable insight that drives real clinical and operational decisions.</p></div>' +
    '<div class="zynix-arch-card fade-in-up" style="border-left:4px solid #fddbc8"><div class="zynix-arch-num">03</div><h3>Execution</h3><p>Complete work that normally sits on staff worklists -calls, documentation, triage, and care coordination.</p></div>' +
    '<div class="zynix-arch-card fade-in-up" style="border-left:4px solid #d7e9ff"><div class="zynix-arch-num">04</div><h3>Orchestration</h3><p>Coordinate multiple agents into end-to-end workflows that deliver measurable patient and financial outcomes.</p></div>' +
    '</div></div></section>' +

    '<section class="zynix-products-overview"><div class="zynix-container">' +
    '<span class="zynix-tag">PRODUCT SUITE</span>' +
    '<h2>Everything You Need. Nothing You Don\u2019t.</h2>' +
    renderFeatureCards([
      { icon: '&#9881;', title: 'Zynix Data Platform', desc: 'Unified, normalized clinical and administrative data with enterprise-grade security and compliance.' },
      { icon: '&#128202;', title: 'Zynix Analytics', desc: 'Identify care gaps and compliance opportunities across populations with AI-powered analytics.' },
      { icon: '&#129302;', title: 'Zynix AI Agents', desc: 'Autonomous agents for outreach, triage, documentation, and care coordination at scale.' },
      { icon: '&#128196;', title: 'Deployable Care Plans', desc: 'Multi-agent care workflows that coordinate across your entire care delivery system.' },
      { icon: '&#127908;', title: 'ZynScribe', desc: 'Ambient AI documentation that captures encounters and generates structured notes in seconds.' },
      { icon: '&#128300;', title: 'Risk Stratification', desc: 'Predictive modeling to identify high-risk patients before crisis -enabling proactive intervention.' }
    ]) +
    '</div></section>' +

    '<section class="zynix-screenshot-section"><div class="zynix-container">' +
    '<span class="zynix-tag">INSIDE THE PLATFORM</span>' +
    '<h2>Built for Healthcare Operations</h2>' +
    '<p class="zynix-section-sub">Real screenshots from the Zynix OS portal showing dashboards, analytics, and AI-powered insights.</p>' +
    '<div class="zynix-screenshot-gallery">' +
    '<div class="zynix-screenshot-card fade-in-up"><img src="' + IMG.portalACO + '" alt="ACO Dashboard"><div class="caption">ACO Owner Dashboard</div></div>' +
    '<div class="zynix-screenshot-card fade-in-up"><img src="' + IMG.portalProvider + '" alt="Provider Dashboard"><div class="caption">Provider Clinical Dashboard</div></div>' +
    '<div class="zynix-screenshot-card fade-in-up"><img src="' + IMG.portalChatbot + '" alt="AI Chatbot"><div class="caption">AI Data Query Chatbot</div></div>' +
    '</div></div></section>' +

    '<section class="zynix-flywheel-section"><div class="zynix-container">' +
    '<span class="zynix-tag">THE DATA FLYWHEEL</span>' +
    '<h2>Every Interaction Makes the System Smarter</h2>' +
    '<div class="zynix-flywheel-grid">' +
    '<div class="zynix-flywheel-step fade-in-up"><span>1</span><p>Better conversation models</p></div>' +
    '<div class="zynix-flywheel-arrow">&rarr;</div>' +
    '<div class="zynix-flywheel-step fade-in-up"><span>2</span><p>More triage decisions</p></div>' +
    '<div class="zynix-flywheel-arrow">&rarr;</div>' +
    '<div class="zynix-flywheel-step fade-in-up"><span>3</span><p>More ambient scribe data</p></div>' +
    '<div class="zynix-flywheel-arrow">&rarr;</div>' +
    '<div class="zynix-flywheel-step fade-in-up"><span>4</span><p>More outcomes data</p></div>' +
    '</div></div></section>' +

    renderCTA('Ready to Transform Your Operations?', 'Schedule a demo to see how Zynix OS turns insight into action across your organization.', 'Schedule a Demo') +
    renderFooter();
  }

  // ── PAGE: Data Platform ──
  function renderDataPlatform() {
    return renderInnerHero('DATA PLATFORM', 'Your Data. Finally Useful.',
      'The unified healthcare data layer that ingests, cleans, normalizes, and organizes data from every clinical and administrative source -in real time.',
      IMG.data, 'Zynix Data Platform') +

    renderProblemSection('Why Your Data Isn\u2019t Working', [
      { icon: '&#128268;', title: 'Fragmented Data', desc: 'Claims in one system, clinical in another, labs in a third. You\u2019re flying blind with partial information.' },
      { icon: '&#128683;', title: 'Insights Without Action', desc: 'Your BI tool tells you 2,000 patients have gaps. Nobody has time to call them. Insights gather dust.' },
      { icon: '&#9888;', title: 'Bad Data for AI', desc: 'AI agents need clean, unified, real-time data. Garbage in, garbage out. Zynix solves this from day one.' }
    ]) +

    '<section class="zynix-capabilities-section" id="capabilities"><div class="zynix-container">' +
    '<span class="zynix-tag">CAPABILITIES</span>' +
    '<h2>End-to-End Data Intelligence</h2>' +
    '<div class="zynix-data-layers">' +
    '<div class="zynix-data-layer fade-in-up"><h3>&#11015; Ingestion Layer</h3><p>EHRs (Epic, Cerner, athena, eCW, NextGen, Allscripts), Claims, ADT, Labs, Pharmacy, SDOH. Every data source. Every format. Connected.</p></div>' +
    '<div class="zynix-data-layer fade-in-up"><h3>&#9881; Processing Layer</h3><p>De-duplication, standardized coding (ICD-10, CPT, SNOMED, LOINC), golden record creation, risk prediction, gap identification, and worklist generation.</p></div>' +
    '<div class="zynix-data-layer fade-in-up"><h3>&#9889; Real-Time Feeds</h3><p>EHR APIs, HL7/FHIR feeds, claims (837/835), ADT streams, labs, pharmacy, SDOH, scheduling, and financial data -all flowing in real time.</p></div>' +
    '<div class="zynix-data-layer fade-in-up"><h3>&#128196; Outputs</h3><p>Unified patient records, risk-stratified views, gap closure worklists, dashboards, scorecards, and API endpoints for AI agents.</p></div>' +
    '</div></div></section>' +

    '<section class="zynix-audience-section"><div class="zynix-container">' +
    '<span class="zynix-tag">BUILT FOR LEADERS</span>' +
    '<h2>Healthcare Leaders Trust Zynix Data</h2>' +
    renderFeatureCards([
      { icon: '&#129657;', title: 'Chief Medical Officers', desc: 'Deep insight into population health across your entire attributed patient base.' },
      { icon: '&#128203;', title: 'Quality Officers', desc: 'Track metrics and documentation compliance with real-time quality dashboards.' },
      { icon: '&#127968;', title: 'Population Health Officers', desc: 'Optimize populations at scale with unified, actionable data intelligence.' },
      { icon: '&#128176;', title: 'Finance Leaders', desc: 'Measure care impact and ROI with transparent financial data integration.' }
    ]) +
    '</div></section>' +

    renderMetricsBar([
      { value: '30 days', label: 'Time to measurable impact' },
      { value: '6-12 mo', label: 'Full ROI realization' },
      { value: '100%', label: 'Data sources connected' },
      { value: 'Real-time', label: 'Data processing speed' }
    ]) +

    renderCTA('Ready to Transform Your Data Into Action?', 'Join healthcare leaders who\u2019ve made their data work for them. Schedule a 30-minute demo.', 'Schedule a Demo') +
    renderFooter();
  }

  // ── PAGE: Analytics ──
  function renderAnalytics() {
    return renderInnerHero('ANALYTICS', 'Intelligence That Drives Action',
      'AI-powered analytics that go beyond dashboards. Identify HCC opportunities, predict risk, close quality gaps, and support clinical decisions -all in real time.',
      IMG.analytics, 'Zynix Analytics Dashboard') +

    renderProblemSection('Why Traditional Analytics Fall Short', [
      { icon: '&#128337;', title: 'Stale Data', desc: 'Most healthcare analytics are 3-6 months old. You\u2019re always analyzing yesterday\u2019s problems while today\u2019s patients need help now.' },
      { icon: '&#128566;', title: 'Analysis Paralysis', desc: 'Too many dashboards, too much data, no clarity. Teams spend weeks interpreting instead of taking action.' },
      { icon: '&#128268;', title: 'Fragmented Insights', desc: 'Risk scores live in silos. Quality gaps aren\u2019t connected to HCC opportunities. Everything stays disconnected.' }
    ]) +

    '<section class="zynix-tracks-section" id="capabilities"><div class="zynix-container">' +
    '<span class="zynix-tag">THREE TRACKS</span>' +
    '<h2>Analytics That Actually Move the Needle</h2>' +

    '<div class="zynix-track fade-in-up">' +
    '<div class="zynix-track-header"><span class="zynix-track-num">01</span><h3>HCC & Quality Analytics</h3></div>' +
    '<div class="zynix-track-body"><ul>' +
    '<li>Identify all HCC opportunities with clinical documentation analysis</li>' +
    '<li>Flag quality measures with actionable closure recommendations</li>' +
    '<li>Rank by RAF impact, closure probability, and optimal timing</li>' +
    '<li>Trigger gap closure workflows automatically</li>' +
    '<li>Monitor closure completion and ROI in real-time</li>' +
    '</ul></div></div>' +

    '<div class="zynix-track fade-in-up">' +
    '<div class="zynix-track-header"><span class="zynix-track-num">02</span><h3>Risk & Readmission Prediction</h3></div>' +
    '<div class="zynix-track-body"><ul>' +
    '<li>Predict hospitalizations weeks in advance for early intervention</li>' +
    '<li>Identify high-risk patients at the moment of discharge</li>' +
    '<li>Enable palliative care discussions for appropriate patients</li>' +
    '<li>Industry-leading models validated against real outcomes</li>' +
    '</ul></div></div>' +

    '<div class="zynix-track fade-in-up">' +
    '<div class="zynix-track-header"><span class="zynix-track-num">03</span><h3>Clinical Decision Support</h3></div>' +
    '<div class="zynix-track-body"><ul>' +
    '<li>Immediate alerts at point of care for critical decisions</li>' +
    '<li>Guideline-aligned treatment recommendations in context</li>' +
    '<li>Real-time allergy and contraindication warnings</li>' +
    '<li>Seamlessly integrated with EHR workflows</li>' +
    '</ul></div></div>' +

    '</div></section>' +

    '<section class="zynix-screenshot-section"><div class="zynix-container">' +
    '<span class="zynix-tag">THE PLATFORM</span>' +
    '<h2>See the Zynix Portal in Action</h2>' +
    '<p class="zynix-section-sub">Real product screenshots from the Zynix analytics and quality dashboards.</p>' +
    '<div class="zynix-screenshot-gallery">' +
    '<div class="zynix-screenshot-card fade-in-up"><img src="' + IMG.portalQuality + '" alt="Quality Dashboard"><div class="caption">Provider Quality Dashboard</div></div>' +
    '<div class="zynix-screenshot-card fade-in-up"><img src="' + IMG.portalPredictive + '" alt="Predictive Analytics"><div class="caption">Predictive Analytics & Risk</div></div>' +
    '<div class="zynix-screenshot-card fade-in-up"><img src="' + IMG.portalACOQuality + '" alt="ACO Quality Dashboard"><div class="caption">ACO Quality Performance</div></div>' +
    '</div></div></section>' +

    renderMetricsBar([
      { value: '30%', label: 'HCC Gap Closure Improvement' },
      { value: '25%', label: 'Readmission Reduction' },
      { value: 'Real-time', label: 'Analytics Processing' },
      { value: '100+', label: 'Quality Measures Tracked' }
    ]) +

    '<section class="zynix-audience-section"><div class="zynix-container">' +
    '<span class="zynix-tag">WHO BENEFITS</span>' +
    '<h2>Built for Every Healthcare Leader</h2>' +
    renderFeatureCards([
      { icon: '&#129657;', title: 'CMOs & Pop Health Officers', desc: 'Optimize outcomes across entire patient populations with predictive insights.' },
      { icon: '&#128203;', title: 'Quality & VBC Officers', desc: 'Meet quality targets and close HEDIS/STARS gaps with actionable intelligence.' },
      { icon: '&#128200;', title: 'Risk Executives', desc: 'Maximize HCC capture and RAF scores with comprehensive documentation analysis.' },
      { icon: '&#128176;', title: 'CFOs & Revenue Cycle', desc: 'Drive revenue optimization and cost reduction with financial intelligence.' }
    ]) +
    '</div></section>' +

    renderCTA('Ready to Turn Analytics Into Action?', 'See how Zynix Analytics drives measurable outcomes for your organization.', 'Request a Demo') +
    renderFooter();
  }

  // ── PAGE: AI Agents ──
  function renderAIAgents() {
    return renderInnerHero('AI AGENT SUITE', 'Specialized AI Agents That Get Work Done',
      'Stop chatting. Start executing. Our AI agents convert insights into completed actions -24/7, across every department, handling the work humans shouldn\u2019t have to do.',
      IMG.doctor, 'Zynix AI Agents') +

    '<section class="zynix-agents-section" id="capabilities"><div class="zynix-container">' +
    '<span class="zynix-tag">7 SPECIALIZED AGENTS</span>' +
    '<h2>The Execution Layer of Healthcare</h2>' +
    '<p class="zynix-section-sub">Each agent is purpose-built for a specific workflow, trained on healthcare data, and designed to work autonomously or in coordination.</p>' +

    '<div class="zynix-agents-grid">' +

    '<div class="zynix-agent-card fade-in-up">' +
    '<div class="zynix-agent-header"><span class="zynix-agent-icon">&#128161;</span><h3>ZynTriage</h3></div>' +
    '<p>24/7 AI-powered triage that assesses symptoms, diverts low-acuity cases, and handles initial intake across 15+ languages.</p>' +
    '<div class="zynix-agent-metrics"><span>60-80% Cost Reduction</span><span>97.3% Accuracy</span></div></div>' +

    '<div class="zynix-agent-card fade-in-up">' +
    '<div class="zynix-agent-header"><span class="zynix-agent-icon">&#128197;</span><h3>ZynScheduling</h3></div>' +
    '<p>Intelligent scheduling that books appointments through calls, texts, and chat -matching patients with available slots and managing cancellations.</p>' +
    '<div class="zynix-agent-metrics"><span>70-80% Autonomous Booking</span><span>24/7 Availability</span></div></div>' +

    '<div class="zynix-agent-card fade-in-up">' +
    '<div class="zynix-agent-header"><span class="zynix-agent-icon">&#128222;</span><h3>ZynOutreach</h3></div>' +
    '<p>Automatic outreach within 24-48 hours post-discharge for instruction review, medication reconciliation, and symptom monitoring.</p>' +
    '<div class="zynix-agent-metrics"><span>85%+ Contact Rate</span><span>2.8x vs Manual</span></div></div>' +

    '<div class="zynix-agent-card fade-in-up">' +
    '<div class="zynix-agent-header"><span class="zynix-agent-icon">&#128276;</span><h3>ZynReminders</h3></div>' +
    '<p>Smart two-way appointment reminders, medication alerts, and preventive care notifications that reduce no-shows.</p>' +
    '<div class="zynix-agent-metrics"><span>30-50% No-Show Reduction</span><span>Multi-Channel</span></div></div>' +

    '<div class="zynix-agent-card fade-in-up">' +
    '<div class="zynix-agent-header"><span class="zynix-agent-icon">&#128424;</span><h3>ZynFax</h3></div>' +
    '<p>AI-powered fax processing that classifies documents, extracts data, routes intelligently, and integrates with your EHR.</p>' +
    '<div class="zynix-agent-metrics"><span>95%+ Classification Accuracy</span><span>Real-time</span></div></div>' +

    '<div class="zynix-agent-card fade-in-up">' +
    '<div class="zynix-agent-header"><span class="zynix-agent-icon">&#128203;</span><h3>ZynPA</h3></div>' +
    '<p>Automated prior authorization submission, tracking, denial management, and expiration alerts -eliminating the admin burden.</p>' +
    '<div class="zynix-agent-metrics"><span>75%+ Time Reduction</span><span>$20+ Saved Per Auth</span></div></div>' +

    '<div class="zynix-agent-card fade-in-up">' +
    '<div class="zynix-agent-header"><span class="zynix-agent-icon">&#128138;</span><h3>ZynPharmacy</h3></div>' +
    '<p>Automated discrepancy detection, drug interaction checking, and adherence assessment with clinical team alerts.</p>' +
    '<div class="zynix-agent-metrics"><span>95%+ Accuracy</span><span>50-70% Time Reduction</span></div></div>' +

    '</div></div></section>' +

    '<section class="zynix-orchestration-section"><div class="zynix-container">' +
    '<span class="zynix-tag">ORCHESTRATION</span>' +
    '<h2>Agents That Work Together</h2>' +
    '<p class="zynix-section-sub">Zynix agents don\u2019t operate in silos. They hand off tasks, share context, and coordinate across workflows -just like a high-performing care team.</p>' +
    '<div class="zynix-orch-flow">' +
    '<div class="zynix-orch-step fade-in-up"><span>&#128161;</span><p>ZynTriage assesses patient</p></div>' +
    '<div class="zynix-orch-arrow">&rarr;</div>' +
    '<div class="zynix-orch-step fade-in-up"><span>&#128197;</span><p>ZynScheduling books visit</p></div>' +
    '<div class="zynix-orch-arrow">&rarr;</div>' +
    '<div class="zynix-orch-step fade-in-up"><span>&#127908;</span><p>ZynScribe documents encounter</p></div>' +
    '<div class="zynix-orch-arrow">&rarr;</div>' +
    '<div class="zynix-orch-step fade-in-up"><span>&#128222;</span><p>ZynOutreach follows up</p></div>' +
    '</div></div></section>' +

    renderCTA('Ready to Deploy Your AI Workforce?', 'See how Zynix AI Agents can transform your operations with autonomous execution.', 'Request a Demo') +
    renderFooter();
  }

  // ── PAGE: ZynScribe ──
  function renderZynScribe() {
    return renderInnerHero('ZYNSCRIBE', 'Ambient AI Scribe for Healthcare',
      'Transform patient encounters into accurate documentation instantly. AI-powered transcription that generates precise SOAP notes in seconds -so you can focus on patients, not paperwork.',
      IMG.scribe, 'ZynScribe Ambient AI') +

    renderProblemSection('The Documentation Crisis', [
      { icon: '&#128337;', title: '2 Hours Per 1 Hour', desc: 'Physicians spend 2 hours on documentation for every 1 hour with patients. That\u2019s backwards.' },
      { icon: '&#128564;', title: '16 Min Pajama Time', desc: '16 minutes of after-hours documentation every night. Burnout isn\u2019t a mystery -it\u2019s a math problem.' },
      { icon: '&#128148;', title: '63% Report Burnout', desc: 'The #1 driver of physician dissatisfaction is documentation burden. ZynScribe eliminates it.' }
    ]) +

    '<section class="zynix-capabilities-section" id="capabilities"><div class="zynix-container">' +
    '<span class="zynix-tag">CAPABILITIES</span>' +
    '<h2>How ZynScribe Works</h2>' +
    renderFeatureCards([
      { icon: '&#127908;', title: 'Ambient Capture', desc: 'Captures natural conversation between clinician and patient without interruption. Works in any clinical setting.' },
      { icon: '&#128101;', title: 'Multi-Speaker Recognition', desc: 'Handles conversations with patients, family members, interpreters, and other care team members with accurate voice distinction.' },
      { icon: '&#128196;', title: 'Automated Note Generation', desc: 'Generates SOAP notes, H&P, progress notes, and procedure notes automatically -organized, compliant, ready for review.' },
      { icon: '&#129657;', title: '90+ Specialty Templates', desc: 'Cardiology, orthopedics, pediatrics, and more. Customizable templates ensure you never miss critical elements.' },
      { icon: '&#128178;', title: 'Intelligent Coding', desc: 'ICD-10 and CPT code suggestions that optimize billing, reduce missing codes, and improve revenue cycle performance.' },
      { icon: '&#128260;', title: 'EHR Integration', desc: 'Direct upload to Epic, Cerner, athenahealth, and more. One-click integration with physician review before finalization.' }
    ]) +
    '</div></section>' +

    renderMetricsBar([
      { value: '15K+', label: 'Notes Processed' },
      { value: '40%', label: 'Time Savings' },
      { value: '97%', label: 'Accuracy Rate' },
      { value: '90+', label: 'Specialties Supported' }
    ]) +

    '<section class="zynix-audience-section"><div class="zynix-container">' +
    '<span class="zynix-tag">WHO BENEFITS</span>' +
    '<h2>Built for Every Clinician</h2>' +
    renderFeatureCards([
      { icon: '&#129657;', title: 'Physicians & Primary Care', desc: 'Save 1-2 hours per day. Spend more time with patients, less time typing.' },
      { icon: '&#128300;', title: 'Specialists', desc: 'Deliver complex consultations with specialty-specific templates and structured notes for 90+ specialties.' },
      { icon: '&#127968;', title: 'Healthcare Organizations', desc: 'Improve clinician satisfaction, reduce burnout, and ensure accurate coding and care continuity.' }
    ]) +
    '</div></section>' +

    renderCTA('Ready to Reclaim Your Time?', 'Join thousands of physicians saving 1-2 hours daily with ZynScribe.', 'Start Free Trial') +
    renderFooter();
  }

  // ── PAGE: Care Plans ──
  function renderCarePlans() {
    return renderInnerHero('DEPLOYABLE CARE PLANS', 'Stop Managing Care. Start Deploying It.',
      'The orchestration layer atop Zynix OS. Takes insights from the Data Platform and executes through coordinated AI agents -seamlessly handing off tasks from one agent to the next.',
      IMG.care, 'Zynix Care Plans') +

    renderProblemSection('The Math Doesn\u2019t Work', [
      { icon: '&#128101;', title: '50,000 Patients', desc: 'A typical large ACO or MA plan population. 20% need AWV completion. 10% have undiagnosed conditions needing closure.' },
      { icon: '&#128100;', title: '35 Staff Members', desc: '20 coordinators + 10 nurses + 5 CHWs cannot scale to reach every patient who needs care.' },
      { icon: '&#128200;', title: '85% Reach with AI', desc: 'Zynix deploys AI agents that reach 85%+ of patients while your human staff focuses on the 15-20% requiring clinical judgment.' }
    ]) +

    '<section class="zynix-capabilities-section" id="capabilities"><div class="zynix-container">' +
    '<span class="zynix-tag">10 PRE-BUILT TEMPLATES</span>' +
    '<h2>Care Plans Ready to Deploy</h2>' +
    '<p class="zynix-section-sub">Each care plan template orchestrates multiple AI agents into end-to-end workflows. Deploy in days, not months.</p>' +
    '<div class="zynix-careplan-grid">' +
    '<div class="zynix-careplan-card fade-in-up"><span class="zynix-cp-num">01</span><h4>Hospital Discharge (TCM)</h4><p>30-day follow-through. Calls, med reviews, appointment scheduling, escalation.</p></div>' +
    '<div class="zynix-careplan-card fade-in-up"><span class="zynix-cp-num">02</span><h4>Quality & HCC Gap Closure</h4><p>Rapid identification and closure of HEDIS, STARS, and HCC documentation gaps.</p></div>' +
    '<div class="zynix-careplan-card fade-in-up"><span class="zynix-cp-num">03</span><h4>Prior Authorization</h4><p>PA submission tracking, appeals management, outcome documentation.</p></div>' +
    '<div class="zynix-careplan-card fade-in-up"><span class="zynix-cp-num">04</span><h4>24/7 Scheduling</h4><p>After-hours outreach, weekend scheduling, patient choice scheduling.</p></div>' +
    '<div class="zynix-careplan-card fade-in-up"><span class="zynix-cp-num">05</span><h4>Post-Medication Monitoring</h4><p>30-day post-change monitoring. Dosage reviews, side effect checks.</p></div>' +
    '<div class="zynix-careplan-card fade-in-up"><span class="zynix-cp-num">06</span><h4>Specialist Referral Management</h4><p>Track referrals. Confirm visits. Retrieve results. Prevent care gaps.</p></div>' +
    '<div class="zynix-careplan-card fade-in-up"><span class="zynix-cp-num">07</span><h4>Abnormal Lab/Imaging Alerts</h4><p>Flag results. Contact patient. Escalate to PCP. Schedule follow-up.</p></div>' +
    '<div class="zynix-careplan-card fade-in-up"><span class="zynix-cp-num">08</span><h4>Preventive Care & Screenings</h4><p>Cancer screenings, immunizations, wellness visits. Identify, schedule, confirm.</p></div>' +
    '<div class="zynix-careplan-card fade-in-up"><span class="zynix-cp-num">09</span><h4>ED Diversion</h4><p>Identify high-utilizers. Offer alternatives. Schedule PCP visits. Reduce ED volume.</p></div>' +
    '<div class="zynix-careplan-card fade-in-up"><span class="zynix-cp-num">10</span><h4>Chronic Condition Pre-Visit</h4><p>Pre-visit prep for diabetes, CHF, COPD. Labs ordered. Meds reviewed. Goals set.</p></div>' +
    '</div></div></section>' +

    renderMetricsBar([
      { value: '85%', label: 'Patient Contact Rate' },
      { value: '3x', label: 'vs Traditional Models' },
      { value: '60%', label: 'Coordinator Time Saved' },
      { value: '40%', label: 'Readmission Reduction' }
    ]) +

    '<section class="zynix-workflow-section"><div class="zynix-container">' +
    '<span class="zynix-tag">TCM WORKFLOW EXAMPLE</span>' +
    '<h2>See How a Care Plan Executes</h2>' +
    '<div class="zynix-workflow-timeline">' +
    '<div class="zynix-wf-step fade-in-up"><div class="zynix-wf-dot"></div><div class="zynix-wf-content"><h4>Day 0: Discharge</h4><p>Discharge data flows into Zynix. Care plan eligibility model runs. Patient flagged HIGH RISK (82nd percentile).</p></div></div>' +
    '<div class="zynix-wf-step fade-in-up"><div class="zynix-wf-dot"></div><div class="zynix-wf-content"><h4>Day 1: Outreach</h4><p>ZynOutreach calls patient. Confirms safe arrival. Reviews medications. Detects confusion. Escalates to pharmacist.</p></div></div>' +
    '<div class="zynix-wf-step fade-in-up"><div class="zynix-wf-dot"></div><div class="zynix-wf-content"><h4>Day 4: Reminder</h4><p>Automated SMS reminder sent 72 hours before PCP visit. Patient confirms attendance.</p></div></div>' +
    '<div class="zynix-wf-step fade-in-up"><div class="zynix-wf-dot"></div><div class="zynix-wf-content"><h4>Day 7: Visit</h4><p>PCP visit completed. TCM billing code captured. ZynScribe documents visit with full care plan context.</p></div></div>' +
    '<div class="zynix-wf-step fade-in-up"><div class="zynix-wf-dot"></div><div class="zynix-wf-content"><h4>Day 30: Outcome</h4><p>Follow-up check-in conducted. Patient did NOT readmit. Shared savings preserved. Full cycle documented.</p></div></div>' +
    '</div></div></section>' +

    renderCTA('Ready to Deploy Care Plans at Scale?', 'Stop managing care manually. Deploy intelligent orchestration and reach every patient.', 'Schedule a Demo') +
    renderFooter();
  }

  // ── PAGE: ZynixLLM ──
  function renderZynixLLM() {
    return renderInnerHero('ZYNIXLLM', 'Healthcare-Native Intelligence',
      'The foundation model purpose-built for medicine. Not a retrofit of general-purpose AI -every component is designed for medical intelligence, clinical safety, and real-world care delivery.',
      IMG.mesh, 'ZynixLLM AI') +

    '<section class="zynix-why-section"><div class="zynix-container">' +
    '<span class="zynix-tag">WHY HEALTHCARE NEEDS DIFFERENT AI</span>' +
    '<h2>General-Purpose AI Wasn\u2019t Built for Medicine</h2>' +
    '<div class="zynix-compare-grid">' +
    '<div class="zynix-compare-card zynix-compare-bad fade-in-up"><h3>General-Purpose AI</h3><ul>' +
    '<li>Not trained on clinical data</li>' +
    '<li>Confidence without accuracy</li>' +
    '<li>Safety bolted on as afterthought</li>' +
    '<li>Not designed for HIPAA/FDA regulation</li>' +
    '</ul></div>' +
    '<div class="zynix-compare-card zynix-compare-good fade-in-up"><h3>ZynixLLM</h3><ul>' +
    '<li>Built on real clinical conversations & protocols</li>' +
    '<li>Certainty calibration -flags uncertainty</li>' +
    '<li>Multi-layer safety architecture</li>' +
    '<li>HIPAA-aligned, audit-ready compliance</li>' +
    '</ul></div>' +
    '</div></div></section>' +

    '<section class="zynix-capabilities-section" id="capabilities"><div class="zynix-container">' +
    '<span class="zynix-tag">CORE DIFFERENTIATORS</span>' +
    '<h2>What Makes ZynixLLM Different</h2>' +
    renderFeatureCards([
      { icon: '&#129657;', title: 'Healthcare-Native Design', desc: 'Built from scratch for medicine. Every architectural decision prioritizes clinical safety and accuracy.' },
      { icon: '&#128064;', title: 'Multi-Modal Understanding', desc: 'Understands text, structured medical data, clinical workflows, EHR records, lab results, and imaging notes.' },
      { icon: '&#128737;', title: 'Safety-First Architecture', desc: 'Safety woven into every layer. Validates against protocols, detects uncertainty, triggers human review.' },
      { icon: '&#9881;', title: 'AI-Enabled Workflows', desc: 'Not just intelligent -operationalized. Powers agents that call, schedule, close gaps, and document visits.' },
      { icon: '&#127968;', title: 'Enterprise-Grade Deployment', desc: 'Secure cloud, customer cloud, or on-premise. Audit trails, compliance reporting, and security controls built in.' }
    ]) +
    '</div></section>' +

    '<section class="zynix-safety-section"><div class="zynix-container">' +
    '<span class="zynix-tag">FOUR-LAYER SAFETY</span>' +
    '<h2>Safety at Every Level</h2>' +
    '<div class="zynix-safety-grid">' +
    '<div class="zynix-safety-card fade-in-up"><span class="zynix-safety-num">1</span><h4>Clinical Protocol Validation</h4><p>Every output validated against evidence-based protocols and standard of care.</p></div>' +
    '<div class="zynix-safety-card fade-in-up"><span class="zynix-safety-num">2</span><h4>Uncertainty Detection</h4><p>Knows what it doesn\u2019t know. Flags uncertainty and edge cases explicitly.</p></div>' +
    '<div class="zynix-safety-card fade-in-up"><span class="zynix-safety-num">3</span><h4>Consistency Checking</h4><p>Multiple verification systems check for internal contradictions and logical inconsistencies.</p></div>' +
    '<div class="zynix-safety-card fade-in-up"><span class="zynix-safety-num">4</span><h4>Human Escalation</h4><p>When stakes are high or judgment required, escalates to human clinicians. AI augments, never replaces.</p></div>' +
    '</div></div></section>' +

    '<section class="zynix-deploy-section"><div class="zynix-container">' +
    '<span class="zynix-tag">DEPLOYMENT OPTIONS</span>' +
    '<h2>Flexible, Secure Deployment</h2>' +
    renderFeatureCards([
      { icon: '&#9729;', title: 'Secure Cloud', desc: 'Zynix-managed infrastructure with enterprise security, SOC 2 compliance, and 99.95% uptime SLA.' },
      { icon: '&#128187;', title: 'Customer Cloud', desc: 'Deploy in your AWS, Azure, or GCP account. You control the environment, we provide the intelligence.' },
      { icon: '&#127968;', title: 'On-Premise / Hybrid', desc: 'Deploy locally with complete data residency, or hybrid. Full control, full compliance.' }
    ]) +
    '</div></section>' +

    renderCTA('Ready to Build with Healthcare-Native Intelligence?', 'Start with a 30-minute Readiness Conversation. We\u2019ll walk through your use cases and implementation.', 'Schedule Conversation') +
    renderFooter();
  }

  // ── Shared: Solution Page Template ──
  function renderSolutionPage(tag, title, subtitle, image, challenges, solutions, metrics, cta, customers, opts) {
    opts = opts || {};
    var html = renderInnerHero(tag, title, subtitle, image, tag + ' solution');

    // AEO summary block
    if (opts.summary) {
      html += '<div class="zynix-container"><div class="zynix-summary-block">' + opts.summary + '</div></div>';
    }

    html += renderProblemSection('Your Challenges', challenges);

    html += '<section class="zynix-capabilities-section" id="capabilities"><div class="zynix-container">' +
      '<span class="zynix-tag">HOW ZYNIX HELPS</span>' +
      '<h2>Purpose-Built for ' + tag + '</h2>' +
      renderFeatureCards(solutions) +
      '</div></section>';

    if (metrics && metrics.length) {
      html += renderMetricsBar(metrics);
    }

    if (customers && customers.length) {
      html += '<section class="zynix-customers-section"><div class="zynix-container">' +
        '<span class="zynix-tag">TRUSTED BY</span>' +
        '<h2>Organizations That Trust Zynix</h2>' +
        '<div class="zynix-customer-list">';
      customers.forEach(function(c) {
        html += '<div class="zynix-customer-chip">' + c + '</div>';
      });
      html += '</div></div></section>';
    }

    // FAQ section
    if (opts.faqs && opts.faqs.length) {
      html += '<section class="zynix-page-faq"><div class="zynix-container">' +
        '<span class="zynix-tag">FAQ</span>' +
        '<h2>Frequently Asked Questions</h2>' +
        '<div class="zynix-faq-list">';
      opts.faqs.forEach(function(faq) {
        html += '<div class="zynix-faq-item"><div class="zynix-faq-q">' + faq.q + '<span class="zynix-faq-toggle">+</span></div><div class="zynix-faq-a"><p>' + faq.a + '</p></div></div>';
      });
      html += '</div></div></section>';
    }

    html += renderCTA(cta.title, cta.sub, cta.btn) + renderFooter();
    return html;
  }

  // ── PAGE: ACOs & MSOs ──
  function renderACOs() {
    return renderSolutionPage('ACOs & MSOs',
      'Achieve Shared Savings Through Operational Excellence',
      'Maximize AWV completion rates, hit shared savings targets, and transform care coordination with AI-powered operational intelligence.',
      IMG.care,
      [
        { icon: '&#128200;', title: 'AWV Completion Gaps', desc: 'Low completion rates leave money on the table and miss early intervention opportunities across your attributed population.' },
        { icon: '&#128176;', title: 'Shared Savings Targets', desc: 'Hitting thresholds requires coordinated care management. Siloed operations make it nearly impossible to reach benchmarks.' },
        { icon: '&#128222;', title: 'TCM Contact Underperformance', desc: 'Contact rates stuck at 30-40%, far below the 85%+ needed for optimal outcomes and revenue capture.' }
      ],
      [
        { icon: '&#128196;', title: 'Deployable Care Plans', desc: 'Standardized, evidence-based care plans deployed across your entire ACO network -from discharge to follow-up.' },
        { icon: '&#128202;', title: 'Analytics Platform', desc: 'Real-time visibility into performance metrics, shared savings progress, and population health across all providers.' },
        { icon: '&#129302;', title: 'AI Agent Suite', desc: 'Autonomous agents orchestrate care coordination, appointment scheduling, and patient engagement at scale.' },
        { icon: '&#128268;', title: 'Unified Data Platform', desc: 'Unified data integration across providers, payers, and EHRs -a single source of truth for your ACO.' }
      ],
      [
        { value: '85%', label: 'TCM Contact Rate' },
        { value: '3x', label: 'AWV Completion Lift' },
        { value: '60%', label: 'Coordinator Time Saved' },
        { value: '8-12 wk', label: 'Time to Positive ROI' }
      ],
      { title: 'See How ACOs Grow Shared Savings with Zynix', sub: 'Schedule a demo to see how Zynix transforms ACO operations.', btn: 'Schedule a Demo' },
      ['Palm Beach ACO', 'West Florida ACO', 'Space Coast ACO', 'Central Florida ACO', 'Assurity ACO REACH', 'Advanced ACO & Affiliates', 'Sun Flower ACO'],
      {
        summary: '<strong>Zynix for ACOs</strong> is an AI-powered operating system that helps Accountable Care Organizations maximize shared savings, achieve 85%+ TCM contact rates, close HCC and quality gaps, and automate care coordination across their attributed populations. Trusted by 7+ ACOs nationwide including Palm Beach ACO, West Florida ACO, and Space Coast ACO.',
        faqs: [
          { q: 'How can ACOs use AI to close care gaps?', a: 'Zynix uses AI to identify open HCC and quality gaps across your attributed population, prioritize them by RAF impact, and automatically deploy outreach campaigns to schedule patients for gap-closing visits. The system achieves 40% improvement in gap closure rates compared to manual worklist management.' },
          { q: 'What ROI can ACOs expect from Zynix?', a: 'Most ACOs see positive ROI within 8-12 weeks. Key financial impacts include increased TCM revenue from 85%+ contact rates (vs 30-40% industry average), improved RAF scores from HCC gap closure, and reduced administrative costs through AI agent automation. Typical annual savings range from $500K to $5M+ depending on attributed lives.' },
          { q: 'How does Zynix integrate with existing ACO infrastructure?', a: 'Zynix integrates with all major EHR systems, claims feeds, ADT notifications, and HIE connections. The Data Platform normalizes data from multiple provider organizations within your ACO network into a single unified view. Implementation typically takes 4-6 weeks.' },
          { q: 'Can Zynix help with MSSP quality benchmarks?', a: 'Yes. Zynix tracks all CMS MSSP quality measures in real-time, identifies patients who need interventions, and deploys AI agents to schedule preventive visits, close quality gaps, and ensure documentation completeness \u2014 all of which directly improve your quality gate performance.' }
        ]
      }
    );
  }

  // ── PAGE: Health Systems ──
  function renderHealthSystems() {
    return renderSolutionPage('Health Systems',
      'Unified Intelligence for Complex Health Systems',
      'Reduce readmissions, improve care coordination, and transform patient engagement across your entire system with AI-powered workflows.',
      IMG.enterprise,
      [
        { icon: '&#127973;', title: 'Escalating Readmissions', desc: 'Unplanned 30-day readmissions cost billions annually. Current discharge processes miss critical follow-up windows.' },
        { icon: '&#128268;', title: 'Fragmented Engagement', desc: 'Inconsistent messaging across departments leads to poor compliance, missed appointments, and declining satisfaction.' },
        { icon: '&#128196;', title: 'Documentation Burden', desc: 'Clinical staff spend 40% of their time on administrative tasks instead of delivering patient care.' }
      ],
      [
        { icon: '&#128222;', title: 'ZynOutreach', desc: 'Intelligently coordinate post-discharge follow-ups, medication reconciliation, and care transitions across facilities.' },
        { icon: '&#127908;', title: 'ZynScribe', desc: 'Reduce documentation burden by 40% with AI-powered clinical note generation across every department.' },
        { icon: '&#128138;', title: 'Medication Reconciliation', desc: 'Automated medication reviews ensure safe, complete medication lists at every transition point.' },
        { icon: '&#128202;', title: 'System-Wide Analytics', desc: 'Enterprise dashboards with real-time visibility across departments, facilities, and care teams.' }
      ],
      [
        { value: '85%', label: 'TCM Contact Rate' },
        { value: '40%', label: 'Burnout Reduction' },
        { value: '60%', label: 'Coordinator Time Saved' },
        { value: '25%', label: 'Readmission Reduction' }
      ],
      { title: 'See How Health Systems Reduce Readmissions with Zynix', sub: 'See how Zynix delivers unified intelligence across your entire organization.', btn: 'Schedule a Demo' },
      ['Health Vision Institute', 'CLSCFL'],
      {
        summary: '<strong>Zynix for Health Systems</strong> provides unified AI-powered patient engagement, post-discharge coordination, and clinical documentation across multi-facility health networks. The platform reduces 30-day readmissions by 25%, cuts documentation burden by 40%, and automates care transitions at enterprise scale.',
        faqs: [
          { q: 'How does AI reduce hospital readmissions?', a: 'Zynix uses predictive analytics to identify high-risk patients at discharge, then automatically deploys the Post-Discharge Follow-Up Agent to contact patients within 48 hours. The agent confirms safe arrival, reviews medications, and schedules follow-up visits \u2014 achieving 85%+ contact rates and 25% reduction in avoidable readmissions.' },
          { q: 'Can Zynix scale across multiple facilities?', a: 'Yes. Zynix is built for enterprise-scale deployment. The platform normalizes data across multiple EHR instances, departments, and facilities into one unified layer. AI agents can be configured per facility or department while maintaining system-wide analytics and reporting.' },
          { q: 'How does Zynix help with CMS readmission penalties?', a: 'By automating post-discharge follow-up, medication reconciliation, and care transition workflows, Zynix directly addresses the Hospital Readmissions Reduction Program (HRRP) penalties. Our platform tracks readmission metrics in real-time and proactively intervenes with at-risk patients.' }
        ]
      }
    );
  }

  // ── PAGE: FQHCs ──
  function renderFQHCs() {
    return renderSolutionPage('FQHCs',
      'Scaling Care for Underserved Communities with AI',
      'Maximize quality payments, serve multilingual populations, and extend care management capabilities with limited staff resources.',
      IMG.patients,
      [
        { icon: '&#128101;', title: 'Limited Staff Resources', desc: 'Lean teams managing large populations. Every staff member is essential and burnout threatens care continuity.' },
        { icon: '&#127760;', title: 'Multilingual Populations', desc: 'Vulnerable communities require culturally competent, multilingual support that traditional systems can\u2019t provide.' },
        { icon: '&#128176;', title: 'Quality Payment Optimization', desc: 'Maximizing quality metrics and capturing every eligible payment is critical to sustainability.' }
      ],
      [
        { icon: '&#127760;', title: 'Multilingual AI Support', desc: 'AI-powered after-hours support in 15+ languages serving diverse patient populations with cultural competence.' },
        { icon: '&#128276;', title: 'Smart Reminders', desc: 'Automated appointment reminders and preventive care nudges reduce no-shows and improve compliance.' },
        { icon: '&#128197;', title: 'Intelligent Scheduling', desc: 'Capture every available appointment slot and manage patient flow efficiently with AI-powered scheduling.' },
        { icon: '&#128202;', title: 'Quality Gap Analytics', desc: 'Identify quality gaps and preventive care opportunities across your entire patient population.' }
      ],
      [
        { value: '3x', label: 'AWV Scheduling Lift' },
        { value: '40%', label: 'Faster Gap Closure' },
        { value: '15+', label: 'Languages Supported' },
        { value: '24/7', label: 'Patient Access' }
      ],
      { title: 'See How FQHCs Scale Care with Zynix', sub: 'See how Zynix helps community health centers do more with less.', btn: 'Schedule a Demo' },
      ['AMISTAD CHC'],
      {
        summary: '<strong>Zynix for FQHCs</strong> provides multilingual AI-powered outreach in 15+ languages, quality payment optimization, and automated care management for community health centers serving underserved populations. The platform helps FQHCs maximize UDS quality metrics while extending limited staff resources.',
        faqs: [
          { q: 'How do FQHCs use AI for multilingual patient outreach?', a: 'Zynix AI agents communicate with patients in 15+ languages via phone calls, text messages, and voice. The agents handle appointment reminders, preventive care nudges, and after-hours triage in the patient\u2019s preferred language \u2014 improving engagement with diverse, underserved populations without adding staff.' },
          { q: 'Can Zynix help FQHCs improve UDS reporting?', a: 'Yes. Zynix tracks UDS clinical quality measures in real-time, identifies patients who need preventive screenings or follow-up care, and deploys automated outreach to schedule visits. This directly improves quality measure performance for HRSA reporting.' },
          { q: 'How does Zynix work with limited FQHC budgets?', a: 'Zynix is designed for cost-effectiveness. The platform automates tasks that would otherwise require additional FTEs \u2014 after-hours coverage, appointment reminders, care gap outreach. Most FQHCs see positive ROI within 8-12 weeks through increased quality payments and reduced staffing costs.' }
        ]
      }
    );
  }

  // ── PAGE: Health Plans ──
  function renderHealthPlans() {
    return renderSolutionPage('Health Plans',
      'Drive Stars Ratings, Member Engagement, and Quality at Scale',
      'Improve quality metrics, close HCC gaps, reduce avoidable ER utilization, and grow member satisfaction with AI-powered care management.',
      IMG.analytics,
      [
        { icon: '&#11088;', title: 'Stars Rating Pressure', desc: 'Every star point impacts revenue and member choice. Manual processes can\u2019t scale to meet quality targets.' },
        { icon: '&#128101;', title: 'Member Engagement at Scale', desc: 'Reaching millions of members with personalized outreach at reasonable cost requires automation.' },
        { icon: '&#128200;', title: 'HCC Gap Closure', desc: 'Identifying and validating high-cost chronic conditions across your entire population is resource-intensive.' }
      ],
      [
        { icon: '&#128202;', title: 'Analytics Suite', desc: 'Identify quality gaps, HCC opportunities, and high-risk members with AI-powered population analytics.' },
        { icon: '&#128196;', title: 'Deployable Care Plans', desc: 'Standardized, evidence-based care plans deployed across your entire member population at scale.' },
        { icon: '&#129302;', title: 'AI Agent Suite', desc: 'Autonomous agents handle member outreach, appointment scheduling, and follow-up -reaching 85%+ of members.' },
        { icon: '&#128300;', title: 'Risk Stratification', desc: 'Predictive models identify members most likely to benefit from intervention -before they become high-cost.' }
      ],
      [
        { value: '85%', label: 'Contact Rates' },
        { value: '9/10', label: 'Member Satisfaction' },
        { value: '40%', label: 'Faster Gap Closure' },
        { value: '30%', label: 'HCC Capture Improvement' }
      ],
      { title: 'See How Health Plans Improve Stars with Zynix', sub: 'See how Zynix helps health plans achieve quality targets at scale.', btn: 'Schedule a Demo' },
      ['eTernal Health'],
      {
        summary: '<strong>Zynix for Health Plans</strong> helps payers improve CMS Stars ratings, close HCC and quality gaps at population scale, and drive member engagement through AI-powered outreach. The platform identifies high-impact intervention opportunities and deploys autonomous agents to reach 85%+ of targeted members.',
        faqs: [
          { q: 'How can health plans use AI to improve Stars ratings?', a: 'Zynix identifies members with open quality gaps that impact Stars measures, prioritizes them by potential impact, and deploys AI agents to schedule preventive visits, close care gaps, and ensure proper documentation. The system tracks HEDIS measures in real-time and proactively intervenes before measurement periods close.' },
          { q: 'How does Zynix help with HCC risk adjustment?', a: 'Zynix Analytics identifies suspected HCC gaps by analyzing claims history, clinical data, and predictive models. The platform prioritizes members by RAF impact and deploys automated outreach to schedule visits with providers who can validate and document chronic conditions, improving risk adjustment accuracy.' },
          { q: 'Can Zynix handle member engagement at scale?', a: 'Yes. Zynix AI agents can autonomously reach millions of members via phone calls, text messages, and digital channels. The agents handle appointment scheduling, medication adherence reminders, preventive care nudges, and post-discharge follow-ups \u2014 all personalized to the individual member.' }
        ]
      }
    );
  }

  // ── PAGE: Independent Practices ──
  function renderPractices() {
    return renderSolutionPage('Independent Practices',
      'Enterprise-Grade AI, Built for Independent Practices',
      'Reduce no-shows, eliminate after-hours burden, and capture missed revenue with AI-powered workflows designed for small to mid-size practices.',
      IMG.doctor,
      [
        { icon: '&#128683;', title: 'No-Show Crisis', desc: 'High no-show rates directly impact revenue. Manual reminders are labor-intensive and inconsistent.' },
        { icon: '&#127769;', title: 'After-Hours Burden', desc: 'Night and weekend calls drain staff morale. Patients can\u2019t reach you when they need you most.' },
        { icon: '&#128176;', title: 'Missed Revenue', desc: 'Uncaptured TCM visits and quality payments represent significant lost revenue for your practice.' }
      ],
      [
        { icon: '&#128276;', title: 'ZynReminder', desc: 'Automated appointment reminders via call, text, and email reduce no-shows by up to 40%.' },
        { icon: '&#127769;', title: 'ZynAfterHours', desc: 'AI-powered after-hours support handles routine calls and urgent triage -24/7, 365 days a year.' },
        { icon: '&#128197;', title: 'ZynSchedule', desc: 'Intelligent scheduling captures every available appointment slot around the clock.' },
        { icon: '&#127908;', title: 'ZynScribe', desc: 'AI-powered note generation saves physicians 1-2 hours daily on documentation.' }
      ],
      [
        { value: '40%', label: 'No-Show Reduction' },
        { value: '$200K+', label: 'Revenue Capture (TCM)' },
        { value: '2 hrs', label: 'Saved Per Physician/Day' },
        { value: '24/7', label: 'Patient Access' }
      ],
      { title: 'See How Practices Reduce No-Shows with Zynix', sub: 'See how Zynix brings enterprise AI to independent practices.', btn: 'Schedule a Demo' },
      ['Cardio & Vascular Consultants', 'Professional Radiology Group', 'Pain Rehab Surgery Center'],
      {
        summary: '<strong>Zynix for Independent Practices</strong> brings enterprise-grade AI to small and mid-size medical practices. The platform reduces no-shows by 40%, provides 24/7 AI-powered after-hours coverage, automates appointment scheduling, and saves physicians 1-2 hours daily on documentation \u2014 all without adding staff.',
        faqs: [
          { q: 'How does AI reduce no-shows for medical practices?', a: 'Zynix ZynReminder sends personalized appointment reminders via phone call, text message, and email at optimal intervals before the visit. Patients can confirm, reschedule, or cancel directly through the AI agent. Practices using Zynix see 40% reduction in no-shows, directly recovering lost revenue.' },
          { q: 'What does AI after-hours coverage look like for a small practice?', a: 'ZynAfterHours answers patient calls 24/7 in 15+ languages. The AI agent triages symptoms using clinical protocols, directs emergencies to 911, schedules urgent next-day appointments, and handles routine questions \u2014 all without waking your on-call physician. You get a detailed report every morning.' },
          { q: 'How quickly can an independent practice deploy Zynix?', a: 'Most practices go live within 2-4 weeks. The implementation starts with connecting to your EHR and phone system, then activating the agents you need most. Many practices start with ZynReminder and ZynAfterHours, then add scheduling and documentation capabilities over time.' }
        ]
      }
    );
  }

  // ── PAGE: ASCs ──
  function renderASCs() {
    return renderSolutionPage('ASCs',
      'Streamline Surgical Operations from Auth to Recovery',
      'Eliminate prior authorization delays, reduce surgical cancellations, and automate post-procedure workflows with AI-powered orchestration.',
      IMG.enterprise,
      [
        { icon: '&#128203;', title: 'Prior Auth Delays', desc: 'Lengthy approval processes delay surgeries and block OR capacity -costing revenue every day.' },
        { icon: '&#128683;', title: 'Surgical Cancellations', desc: 'Inadequate patient prep and missing clearances lead to last-minute cancellations and wasted OR time.' },
        { icon: '&#128222;', title: 'Post-Op Follow-Up Gaps', desc: 'Poor post-procedure communication leads to complications, readmissions, and patient dissatisfaction.' }
      ],
      [
        { icon: '&#128203;', title: 'ZynAuth', desc: 'Accelerate prior authorization with AI-powered documentation collection, submission, and tracking.' },
        { icon: '&#128276;', title: 'Pre-Op Reminders', desc: 'Automated pre-op reminders ensure patients arrive prepared with all required clearances and documentation.' },
        { icon: '&#128197;', title: 'Smart Scheduling', desc: 'Intelligent surgical scheduling optimizes OR utilization and reduces gaps between procedures.' },
        { icon: '&#128222;', title: 'Post-Discharge Follow-Up', desc: 'Automated workflows ensure proper recovery tracking and early complication detection.' }
      ],
      [
        { value: '50%', label: 'Faster Auth Turnaround' },
        { value: '35%', label: 'Cancellation Reduction' },
        { value: '24/7', label: 'Patient Communication' },
        { value: '95%+', label: 'Patient Satisfaction' }
      ],
      { title: 'See How ASCs Streamline Operations with Zynix', sub: 'See how Zynix streamlines surgical operations from authorization to recovery.', btn: 'Schedule a Demo' },
      ['Pain Rehab Surgery Center'],
      {
        summary: '<strong>Zynix for ASCs</strong> automates prior authorization workflows, reduces surgical cancellations, and coordinates pre-op and post-op patient communication for ambulatory surgery centers. The platform achieves 60% faster auth turnaround and 35% reduction in day-of-surgery cancellations.',
        faqs: [
          { q: 'How does AI speed up prior authorization for ASCs?', a: 'ZynAuth automates the entire prior auth workflow: gathering clinical documentation, submitting authorization requests to payers, tracking approval status, and following up on pending authorizations. The AI agent works 24/7 and reduces auth turnaround time by 60%, ensuring surgeries aren\u2019t delayed by administrative bottlenecks.' },
          { q: 'Can Zynix reduce surgical cancellations?', a: 'Yes. Zynix sends automated pre-op reminders that verify patient readiness \u2014 confirming fasting instructions, medication holds, transportation arrangements, and required lab work. By ensuring patients arrive fully prepared, ASCs using Zynix see 35% reduction in day-of-surgery cancellations.' },
          { q: 'How does Zynix handle post-operative follow-up?', a: 'After surgery, the Post-Discharge Follow-Up Agent automatically contacts patients to check on recovery, review medication instructions, identify potential complications, and schedule follow-up visits. This proactive approach catches issues early and improves patient satisfaction scores.' }
        ]
      }
    );
  }

  // ── PAGE: About ──
  function renderAbout() {
    return renderInnerHero('ABOUT ZYNIX', 'We Are Building Healthcare\u2019s Intelligence',
      'Purpose-built AI for medicine. Not another tool -an operating system that transforms how healthcare organizations deliver care at scale.',
      IMG.patients, 'Zynix AI Team') +

    '<section class="zynix-manifesto-section"><div class="zynix-container">' +
    '<span class="zynix-tag">OUR MANIFESTO</span>' +
    '<h2>Healthcare Is Broken, But Not For The Reason You Think</h2>' +
    '<p class="zynix-section-sub">The gap isn\u2019t knowledge -it\u2019s execution. Every organization knows who needs care. The problem is delivering that care at scale, consistently, across every patient.</p>' +
    '<div class="zynix-about-quote fade-in-up"><blockquote>\u201cZynix is not about replacing doctors. It\u2019s about multiplying the impact of every person in healthcare -so the system works for patients, not against them.\u201d</blockquote></div>' +
    '</div></section>' +

    '<section class="zynix-capabilities-section"><div class="zynix-container">' +
    '<span class="zynix-tag">WHY WE EXIST</span>' +
    '<h2>Why Healthcare Needs Its Own AI</h2>' +
    renderFeatureCards([
      { icon: '&#129504;', title: 'Clinical Reasoning Engine', desc: 'Built on real medical conversations and protocols -not internet data. Understands medicine at its core.' },
      { icon: '&#128737;', title: 'Safety Constellation', desc: 'Multi-layer safety woven into every output. Protocol validation, uncertainty detection, human escalation.' },
      { icon: '&#127919;', title: 'Certainty Calibration', desc: 'Knows what it doesn\u2019t know. Flags uncertainty explicitly and escalates to human clinicians when needed.' },
      { icon: '&#128064;', title: 'Multimodal Understanding', desc: 'Processes text, structured data, clinical workflows, EHR records, and imaging notes in unified context.' }
    ]) +
    '</div></section>' +

    '<section class="zynix-mission-section"><div class="zynix-container">' +
    '<span class="zynix-tag">MISSION & VISION</span>' +
    '<h2>What We\u2019re Building Toward</h2>' +
    '<div class="zynix-compare-grid">' +
    '<div class="zynix-compare-card zynix-compare-good fade-in-up"><h3>Our Mission</h3><p style="font-size:16px;line-height:1.8">To transform healthcare operations by building the AI operating system that turns insight into action -enabling every organization to deliver the right care, to the right patient, at the right time.</p></div>' +
    '<div class="zynix-compare-card zynix-compare-good fade-in-up"><h3>Our Vision</h3><p style="font-size:16px;line-height:1.8">A world where healthcare\u2019s intelligence gap is closed -where AI handles the operational complexity so human caregivers can focus entirely on what they do best: caring for patients.</p></div>' +
    '</div></div></section>' +

    renderCTA('Join Us in Transforming Healthcare', 'See how Zynix is building the future of healthcare intelligence.', 'Request a Demo') +
    renderFooter();
  }

  // ── PAGE: Trust Center ──
  function renderTrustCenter() {
    return renderInnerHero('TRUST CENTER', 'Security, Privacy, and Compliance',
      'Everything you need to evaluate Zynix\u2019s security posture. Built for healthcare\u2019s most demanding compliance requirements.',
      IMG.enterprise, 'Zynix Trust Center') +

    '<section class="zynix-capabilities-section" id="capabilities"><div class="zynix-container">' +
    '<span class="zynix-tag">TRUST AT A GLANCE</span>' +
    '<h2>Enterprise-Grade Security for Healthcare</h2>' +
    renderFeatureCards([
      { icon: '&#128274;', title: 'Security Controls', desc: 'End-to-end encryption, intrusion detection, penetration testing, and continuous security monitoring.' },
      { icon: '&#128737;', title: 'Privacy', desc: 'HIPAA-aligned data handling, de-identification, and strict access controls for all patient information.' },
      { icon: '&#128203;', title: 'Compliance', desc: 'SOC 2 Type II certified, HIPAA-aligned, GDPR compliant. Regular third-party audits and assessments.' },
      { icon: '&#128269;', title: 'Auditability', desc: 'Complete audit trails for every action, decision, and data access. Full transparency for compliance teams.' },
      { icon: '&#9989;', title: 'Reliability', desc: '99.95% uptime SLA with redundant infrastructure, disaster recovery, and business continuity planning.' },
      { icon: '&#128101;', title: 'Vendor Management', desc: 'Rigorous vendor assessment process with documented security reviews for all third-party integrations.' }
    ]) +
    '</div></section>' +

    renderMetricsBar([
      { value: 'SOC 2', label: 'Type II Certified' },
      { value: 'HIPAA', label: 'Aligned' },
      { value: 'GDPR', label: 'Compliant' },
      { value: '99.95%', label: 'Uptime SLA' }
    ]) +

    '<section class="zynix-audience-section"><div class="zynix-container">' +
    '<span class="zynix-tag">SECURITY PROGRAM</span>' +
    '<h2>How We Protect Your Data</h2>' +
    renderFeatureCards([
      { icon: '&#128272;', title: 'Data Protection', desc: 'AES-256 encryption at rest, TLS 1.3 in transit. Customer-controlled encryption keys available.' },
      { icon: '&#128100;', title: 'Identity & Access', desc: 'Role-based access control, MFA enforcement, SSO integration, and principle of least privilege.' },
      { icon: '&#128226;', title: 'Monitoring & Response', desc: '24/7 security monitoring, automated alerting, and documented incident response procedures.' },
      { icon: '&#128260;', title: 'Business Continuity', desc: 'Geo-redundant infrastructure, automated backups, and tested disaster recovery procedures.' }
    ]) +
    '</div></section>' +

    renderCTA('Questions About Security or Compliance?', 'Our security team is ready to help with your evaluation. Request documentation or schedule a call.', 'Contact Security Team') +
    renderFooter();
  }

  // ── PAGE: Contact ──
  function renderContact() {
    return '<section class="zynix-inner-hero" style="padding:140px 0 60px"><div class="zynix-container">' +
    '<div style="text-align:center;position:relative;z-index:1">' +
    '<span class="zynix-tag">CONTACT US</span>' +
    '<h1 style="color:#fff;font-size:42px;font-weight:800;margin:0 0 16px">Get in Touch</h1>' +
    '<p style="color:rgba(255,255,255,0.8);font-size:18px;max-width:600px;margin:0 auto">Schedule a demo, ask questions, or explore partnership opportunities with Zynix AI.</p>' +
    '</div></div></section>' +

    '<section class="zynix-contact-section"><div class="zynix-container">' +
    '<div class="zynix-contact-grid">' +
    '<div class="zynix-contact-info">' +
    '<h3>Contact Information</h3>' +
    '<div class="zynix-contact-item"><strong>Email</strong><p><a href="mailto:info@zynix.ai" style="color:#F16529">info@zynix.ai</a></p></div>' +
    '<div class="zynix-contact-item"><strong>Address</strong><p>3535 Little Rd<br>Trinity, FL 34655</p></div>' +
    '<div class="zynix-contact-divider"></div>' +
    '<h3>What to Expect</h3>' +
    '<div class="zynix-expect-list">' +
    '<div class="zynix-expect-item"><span>1</span><p>Submit your information</p></div>' +
    '<div class="zynix-expect-item"><span>2</span><p>Discovery call within 24 hours</p></div>' +
    '<div class="zynix-expect-item"><span>3</span><p>Personalized demo of Zynix</p></div>' +
    '<div class="zynix-expect-item"><span>4</span><p>Implementation roadmap</p></div>' +
    '</div></div>' +
    '<div class="zynix-contact-form-wrap">' +
    '<h3>Request a Demo</h3>' +
    '<form class="zynix-contact-form" id="zynix-demo-form" onsubmit="event.preventDefault();var f=this;var d={fields:[{name:\'firstname\',value:f.querySelector(\'[name=firstname]\').value},{name:\'lastname\',value:f.querySelector(\'[name=lastname]\').value},{name:\'email\',value:f.querySelector(\'[name=email]\').value},{name:\'company\',value:f.querySelector(\'[name=company]\').value},{name:\'healthcare_segment\',value:f.querySelector(\'[name=segment]\').value},{name:\'message\',value:f.querySelector(\'[name=message]\').value}]};fetch(\'https://api.hsforms.com/submissions/v3/integration/submit/242472215/66a6d29e-8c74-4f74-8235-0205ed4d6ed3\',{method:\'POST\',headers:{\'Content-Type\':\'application/json\'},body:JSON.stringify(d)}).then(function(){f.innerHTML=\'<div style=padding:40px;text-align:center><h3 style=color:#F16529>Thank you!</h3><p>We\\\'ll be in touch within 24 hours.</p></div>\'}).catch(function(){f.innerHTML=\'<div style=padding:40px;text-align:center><h3 style=color:#F16529>Thank you!</h3><p>We\\\'ll be in touch within 24 hours.</p></div>\'})">' +
    '<div class="zynix-form-row"><div class="zynix-form-group"><label>First Name</label><input type="text" name="firstname" placeholder="John" required></div><div class="zynix-form-group"><label>Last Name</label><input type="text" name="lastname" placeholder="Smith" required></div></div>' +
    '<div class="zynix-form-group"><label>Work Email</label><input type="email" name="email" placeholder="john@organization.com" required></div>' +
    '<div class="zynix-form-group"><label>Organization</label><input type="text" name="company" placeholder="Your organization name"></div>' +
    '<div class="zynix-form-group"><label>Healthcare Segment</label><select name="segment"><option value="">Select your segment</option><option>ACO / MSO</option><option>Health System</option><option>FQHC</option><option>Health Plan</option><option>Independent Practice</option><option>ASC</option><option>Other</option></select></div>' +
    '<div class="zynix-form-group"><label>Message (Optional)</label><textarea name="message" rows="4" placeholder="Tell us about your goals..."></textarea></div>' +
    '<button type="submit" class="zynix-btn-primary" style="width:100%;text-align:center">Request a Demo &rarr;</button>' +
    '</form></div></div></div></section>' +
    renderFooter();
  }

  // ── PAGE: FAQ ──
  function renderFAQ() {
    var faqs = [
      { q: 'What is Zynix AI?', a: 'Zynix is the AI operating system for value-based healthcare. It unifies data, analytics, and autonomous AI agents into a single platform that turns insight into action -at scale.' },
      { q: 'What types of healthcare organizations use Zynix?', a: 'ACOs, MSOs, health systems, FQHCs, health plans, independent practices, and ASCs. Any organization accountable for patient outcomes and operational efficiency.' },
      { q: 'What products are included in the Zynix platform?', a: 'Zynix OS includes: Data Platform, Analytics, AI Agent Suite (7 specialized agents), ZynScribe (ambient AI scribe), Deployable Care Plans, and ZynixLLM (healthcare foundation model).' },
      { q: 'How long does implementation take?', a: 'Typical implementation is 3-4 months from contract to full deployment. Many organizations see measurable impact within the first 30 days.' },
      { q: 'Is Zynix HIPAA compliant?', a: 'Yes. Zynix is HIPAA-aligned, SOC 2 Type II certified, and GDPR compliant. We maintain enterprise-grade security with complete audit trails.' },
      { q: 'What EHR systems does Zynix integrate with?', a: 'Epic, Cerner, athenahealth, eClinicalWorks, NextGen, Allscripts, and more. We support HL7/FHIR feeds, claims (837/835), ADT streams, and custom integrations.' },
      { q: 'How does pricing work?', a: 'Pricing is based on your organization size and selected products. We offer risk-sharing models aligned with your outcomes. Contact us for a customized quote.' },
      { q: 'What support is included?', a: '24/7 technical support, dedicated customer success manager, quarterly business reviews, and ongoing training for your team.' }
    ];
    var faqHtml = '<div class="zynix-faq-list">';
    faqs.forEach(function(f, i) {
      faqHtml += '<div class="zynix-faq-item fade-in-up"><div class="zynix-faq-q" onclick="this.parentElement.classList.toggle(\'open\')"><span>' + f.q + '</span><span class="zynix-faq-toggle">+</span></div><div class="zynix-faq-a"><p>' + f.a + '</p></div></div>';
    });
    faqHtml += '</div>';

    return renderInnerHero('FAQ', 'Frequently Asked Questions',
      'Find answers to common questions about our platform, implementation, data security, and pricing.',
      null, '') +
    '<section class="zynix-faq-section"><div class="zynix-container">' + faqHtml + '</div></section>' +
    renderCTA('Still Have Questions?', 'Our team is happy to help. Reach out for a personalized conversation.', 'Contact Us') +
    renderFooter();
  }

  // ── PAGE: Blog ──
  function renderBlog() {
    var posts = [
      { title: 'Zynix AI Surpasses 1 Million VBC Patients Onboarded Across 30 States', cat: 'Company News', date: 'Mar 15, 2026', slug: '/resources-blog-1m-patients', featured: true },
      { title: 'Healthcare AI Agents vs. Chatbots: What\u2019s the Difference?', cat: 'AI Implementation', date: 'Mar 15, 2026', slug: '/blog/ai-agents-vs-chatbots-healthcare' },
      { title: 'How AI Closes Care Gaps: From Identification to Resolution', cat: 'Population Health & Analytics', date: 'Mar 10, 2026', slug: '/blog/how-ai-closes-care-gaps' },
      { title: 'What Is Value-Based Care AI? A Complete Guide for 2026', cat: 'Value-Based Care Strategy', date: 'Mar 1, 2026', slug: '/blog/what-is-value-based-care-ai' },
      { title: 'Prior Authorization Delays: What They Actually Cost And How to Fix Them', cat: 'Prior Authorization & RCM', date: 'Mar 3, 2026' },
      { title: 'Your EHR Is Not Broken. It Was Just Never Built to Think.', cat: 'AI Implementation', date: 'Mar 3, 2026' },
      { title: 'Harnessing Generative AI Applications for Healthcare Innovation', cat: 'AI Implementation', date: 'Mar 2, 2026' },
      { title: 'Revolutionizing Healthcare with AI Breakthroughs in Medicine', cat: 'AI Implementation', date: 'Feb 23, 2026' },
      { title: 'Eligibility Verification Automation: The Front Door to Faster Prior Authorization and Fewer Denials', cat: 'Patient Access & Scheduling', date: 'Jan 8, 2026' },
      { title: 'Transforming HCC Risk Adjustment: From Q4 Scramble to Year-Round Success', cat: 'HCC Risk Adjustment', date: 'Dec 23, 2025' },
      { title: 'How To Safely Roll Out AI Medical Scribes Across a Multi-Site Practice', cat: 'AI Medical Scribes', date: 'Dec 17, 2025' },
      { title: 'Using AI To Identify Rising-Risk Patients Before They Deteriorate', cat: 'Value-Based Care Strategy', date: 'Dec 13, 2025' },
      { title: 'Reducing No-Shows With Behaviorally Intelligent AI Scheduling Agents', cat: 'Patient Access & Scheduling', date: 'Dec 9, 2025' },
      { title: 'Prior Authorization Bottlenecks: How AI Automation Helps Providers Win Back Time', cat: 'Prior Authorization & RCM', date: 'Dec 4, 2025' },
      { title: 'The New Era of HCC Risk Adjustment: What CMS Changes Mean for Providers', cat: 'HCC Risk Adjustment', date: 'Nov 26, 2025' },
      { title: 'Year-End ACO Gap Closure: How ACOs Can Close Gaps Faster With Zynix AI', cat: 'Value-Based Care Strategy', date: 'Nov 25, 2025' },
      { title: 'Harnessing Generative AI in Healthcare', cat: 'AI Implementation', date: 'Nov 24, 2025' },
      { title: 'Transforming Healthcare with AI-Driven Value-Based Care Analytics', cat: 'Population Health & Analytics', date: 'Nov 21, 2025' },
      { title: 'Revolutionizing Healthcare: The Role of AI', cat: 'AI Implementation', date: 'Nov 17, 2025' },
      { title: 'Generative AI in Healthcare: Enhancing Outcomes While Ensuring Trust and Safety', cat: 'Responsible AI & Governance', date: 'Nov 15, 2025' },
      { title: 'Autonomous AI Agents in Healthcare: Automating Scheduling, Patient Communication, and Follow-Ups', cat: 'AI Implementation', date: 'Nov 14, 2025' },
      { title: 'Predictive Analytics in Healthcare: Leveraging AI for Population Health Management', cat: 'Population Health & Analytics', date: 'Nov 9, 2025' },
      { title: 'Revolutionizing Clinical Documentation: How AI Medical Scribes Reduce Physician Burnout', cat: 'AI Medical Scribes', date: 'Nov 3, 2025' },
      { title: 'Innovative Approaches to Enhance Patient Recovery and Satisfaction', cat: 'Value-Based Care Strategy', date: 'Oct 27, 2025' },
      { title: 'Strategies for Coordinating Better Patient Care Systems', cat: 'Operations', date: 'Oct 20, 2025' },
      { title: 'How Artificial Intelligence is Transforming the Medical Field', cat: 'AI Implementation', date: 'Oct 13, 2025' },
      { title: 'Essential AI Tools Every Medical Professional Should Know', cat: 'AI Implementation', date: 'Oct 6, 2025' },
      { title: 'How AI is Changing Decision-Making in Healthcare', cat: 'AI Implementation', date: 'Oct 2, 2025' },
      { title: 'Tools Driving the Shift to Value-Based Healthcare', cat: 'Value-Based Care Strategy', date: 'Oct 2, 2025' },
      { title: 'How ACOs Can Run a Consistent 30-Day Post-Discharge Program', cat: 'Operations', date: 'Sep 15, 2025' },
      { title: 'Why TCM Fails in Real Workflows', cat: 'Operations', date: 'Sep 8, 2025' },
      { title: 'The Documentation Crisis: Why Physicians Are Burning Out', cat: 'Clinical Excellence', date: 'Sep 1, 2025' }
    ];
    var html = '<div class="zynix-blog-grid">';
    posts.forEach(function(p) {
      var featuredClass = p.featured ? ' zynix-blog-featured' : '';
      var cardInner = '<span class="zynix-blog-cat">' + p.cat + '</span><h3>' + p.title + '</h3><span class="zynix-blog-date">' + p.date + '</span>';
      if (p.slug) {
        html += '<a href="' + p.slug + '" class="zynix-blog-card fade-in-up' + featuredClass + '" style="text-decoration:none;color:inherit;display:block">' + cardInner + '</a>';
      } else {
        html += '<div class="zynix-blog-card fade-in-up' + featuredClass + '">' + cardInner + '</div>';
      }
    });
    html += '</div>';

    return renderInnerHero('BLOG', 'Insights & Research',
      'Perspectives on operational excellence, AI transformation, and clinical innovation in healthcare. 28 articles on healthcare AI, value-based care, and population health.',
      null, '') +
    '<section class="zynix-blog-section"><div class="zynix-container">' + html + '</div></section>' +
    renderCTA('Want More Insights?', 'Subscribe to our newsletter for the latest in healthcare AI.', 'Contact Us') +
    renderFooter();
  }

  // ── PAGE: Blog Post — 1M VBC Patients ──
  function renderBlog1MPatients() {
    return renderInnerHero('COMPANY NEWS', 'Zynix AI Surpasses 1 Million VBC Patients Onboarded Across 30 States',
      'March 15, 2026 — A milestone in healthcare AI adoption as healthcare organizations across 30 states trust Zynix to manage over one million value-based care patients.',
      null, '') +
    '<section class="zynix-blog-post-section"><div class="zynix-container" style="max-width:780px;margin:0 auto">' +
    '<article class="zynix-blog-post-content">' +
    '<p style="font-size:18px;line-height:1.9;color:var(--z-text)"><strong>Trinity, FL</strong> — Zynix AI, the AI operating system for value-based healthcare, today announced that its platform has surpassed one million patients onboarded across value-based care organizations in 30 states. This milestone represents the rapid adoption of AI-powered clinical and operational intelligence among ACOs, health systems, FQHCs, and independent practices.</p>' +
    '<h2 style="font-size:28px;font-weight:700;margin:40px 0 16px;color:var(--z-text)">From Data Chaos to Coordinated Care</h2>' +
    '<p style="font-size:16px;line-height:1.8;color:var(--z-text-secondary)">When Zynix launched its platform, the healthcare industry was drowning in fragmented data and manual workflows. Clinicians spent more time documenting than caring. ACOs struggled to close quality gaps before measurement periods ended. Prior authorization delays cost practices revenue and patients their health.</p>' +
    '<p style="font-size:16px;line-height:1.8;color:var(--z-text-secondary)">The Zynix platform was built to solve these problems with a fundamentally different approach: an integrated operating system where AI agents work together like a coordinated workforce — ingesting data, identifying risks, executing outreach, completing documentation, and closing care gaps automatically.</p>' +
    '<div class="zynix-metrics-bar" style="margin:40px 0"><div class="zynix-metric"><span class="zynix-metric-value">1M+</span><span class="zynix-metric-label">VBC Patients Onboarded</span></div><div class="zynix-metric"><span class="zynix-metric-value">85%+</span><span class="zynix-metric-label">Quality Score Improvement</span></div><div class="zynix-metric"><span class="zynix-metric-value">40%</span><span class="zynix-metric-label">Admin Time Reduction</span></div><div class="zynix-metric"><span class="zynix-metric-value">2\u20133x</span><span class="zynix-metric-label">ROI in Year One</span></div></div>' +
    '<h2 style="font-size:28px;font-weight:700;margin:40px 0 16px;color:var(--z-text)">What 1 Million Patients Means</h2>' +
    '<p style="font-size:16px;line-height:1.8;color:var(--z-text-secondary)">Reaching one million patients is more than a number. It represents millions of AI-completed tasks: risk assessments generated, care gaps identified and closed, after-hours calls triaged, appointments scheduled, and clinical notes documented in real time.</p>' +
    '<p style="font-size:16px;line-height:1.8;color:var(--z-text-secondary)">For participating organizations, the impact is measurable: shared savings targets met, readmission rates reduced, HEDIS measures improved, and clinician burnout reduced through ambient AI documentation.</p>' +
    '<h2 style="font-size:28px;font-weight:700;margin:40px 0 16px;color:var(--z-text)">Purpose-Built for American Healthcare</h2>' +
    '<p style="font-size:16px;line-height:1.8;color:var(--z-text-secondary)">Zynix was built in Trinity, Florida, with a deep understanding of the complex U.S. healthcare landscape — from Medicare Advantage-heavy markets to rural FQHCs, serving organizations in 30 states. The platform integrates with every major EHR (Epic, Cerner, athena, eCW, NextGen) and processes claims, ADT feeds, labs, pharmacy data, and SDOH signals in real time.</p>' +
    '<blockquote style="border-left:4px solid var(--z-blue);padding:20px 24px;margin:32px 0;background:var(--z-blue-light);border-radius:0 8px 8px 0"><p style="font-size:16px;line-height:1.8;color:var(--z-text);margin:0;font-style:italic">"We didn\u2019t set out to build another analytics tool. We built an operating system that does the work — the calls, the documentation, the follow-ups, the gap closures. One million patients is proof that healthcare organizations want AI that acts, not just AI that reports."</p><cite style="display:block;margin-top:12px;font-size:14px;color:var(--z-text-secondary);font-style:normal"><strong>— Gautamdev Chowdary</strong>, CTO & Co-Founder, Zynix AI</cite></blockquote>' +
    '<h2 style="font-size:28px;font-weight:700;margin:40px 0 16px;color:var(--z-text)">Looking Ahead</h2>' +
    '<p style="font-size:16px;line-height:1.8;color:var(--z-text-secondary)">With the one-million-patient milestone behind it, Zynix is focused on expanding its platform capabilities with new AI agents, deeper EHR integrations, and its proprietary ZynixLLM — a healthcare-specific language model that improves with every patient interaction. The company plans to continue expanding to serve healthcare organizations in all 50 states.</p>' +
    '<p style="font-size:16px;line-height:1.8;color:var(--z-text-secondary)">To learn more about how Zynix can transform your organization\u2019s value-based care performance, visit <a href="/" style="color:var(--z-blue);font-weight:600">zynix.ai</a> or <a href="/contact" style="color:var(--z-blue);font-weight:600">request a demo</a>.</p>' +
    '</article></div></section>' +
    renderCTA('Ready to Join the 1 Million?', 'See how Zynix can transform your organization\u2019s value-based care performance.', 'Request a Demo') +
    renderFooter();
  }

  // ── PAGE: Case Studies ──
  function renderCaseStudies() {
    var studies = [
      { title: 'West Florida ACO', metric: '40%', label: 'Quality Gap Closure Improvement', seg: 'ACO', desc: 'AI Data Platform, Inbound & Outbound Agents, Predictive Analytics' },
      { title: 'Space Coast ACO', metric: '85%+', label: 'TCM Contact Rate', seg: 'ACO', desc: 'AI Data Platform, Inbound & Outbound Agents, Predictive Analytics' },
      { title: 'Central Florida ACO', metric: '2.5x', label: 'ROI in Year One', seg: 'ACO', desc: 'AI Data Platform, Inbound & Outbound Agents, Predictive Analytics' },
      { title: 'Palm Beach ACO', metric: '3x', label: 'AWV Completion Improvement', seg: 'ACO', desc: 'Outbound Agents (PDV & AWV), AI Scribe', slug: '/case-studies/palm-beach-aco' },
      { title: 'eTernal Health', metric: '45%', label: 'Medication Adherence Improvement', seg: 'Health Plan', desc: 'PDV Agents, Medication Adherence Programs' }
    ];
    var html = '<div class="zynix-case-grid">';
    studies.forEach(function(s) {
      var cardInner = '<span class="zynix-case-seg">' + s.seg + '</span><h3>' + s.title + '</h3><div class="zynix-case-metric"><span>' + s.metric + '</span><small>' + s.label + '</small></div>' + (s.desc ? '<p style="font-size:13px;color:var(--z-text-secondary);margin-top:12px;line-height:1.5">' + s.desc + '</p>' : '');
      if (s.slug) {
        html += '<a href="' + s.slug + '" class="zynix-case-card fade-in-up" style="text-decoration:none;color:inherit;display:block">' + cardInner + '<span style="display:inline-block;margin-top:12px;color:var(--z-primary);font-size:14px;font-weight:600">Read case study &rarr;</span></a>';
      } else {
        html += '<div class="zynix-case-card fade-in-up">' + cardInner + '</div>';
      }
    });
    html += '</div>';

    return renderInnerHero('CASE STUDIES', 'Real Results from Real Organizations',
      'See how healthcare organizations are transforming operations and improving outcomes with Zynix.',
      null, '') +
    '<section class="zynix-case-section"><div class="zynix-container">' + html + '</div></section>' +
    renderCTA('Ready to Write Your Success Story?', 'Join the organizations already achieving measurable results with Zynix.', 'Request a Demo') +
    renderFooter();
  }

  // ── PAGE: Privacy Policy ──
  function renderPrivacy() {
    return '<section class="zynix-inner-hero" style="padding:140px 0 60px"><div class="zynix-container" style="text-align:center;position:relative;z-index:1">' +
    '<h1 style="color:#fff;font-size:42px;font-weight:800;margin:0 0 16px">Privacy Policy</h1>' +
    '<p style="color:rgba(255,255,255,0.8);font-size:16px">Last updated: March 2026</p>' +
    '</div></section>' +
    '<section class="zynix-legal-section"><div class="zynix-container zynix-legal-content">' +
    '<h2>1. Introduction</h2><p>Zynix AI (\u201cZynix,\u201d \u201cwe,\u201d \u201cour\u201d) is committed to protecting your privacy. This Privacy Policy describes how we collect, use, and share information when you use our platform and services.</p>' +
    '<h2>2. Information We Collect</h2><p>We collect information you provide directly (account registration, contact forms), information collected automatically (usage data, device information), and information from third-party integrations (EHR data processed under BAAs).</p>' +
    '<h2>3. How We Use Information</h2><p>We use collected information to provide and improve our services, communicate with you, ensure security and compliance, and fulfill our contractual obligations under Business Associate Agreements.</p>' +
    '<h2>4. Data Security</h2><p>We implement industry-standard security measures including AES-256 encryption at rest, TLS 1.3 in transit, role-based access controls, and continuous security monitoring. We maintain SOC 2 Type II certification and HIPAA alignment.</p>' +
    '<h2>5. HIPAA Compliance</h2><p>For customers who are Covered Entities or Business Associates under HIPAA, we enter into Business Associate Agreements (BAAs) and comply with all applicable HIPAA requirements for the protection of PHI.</p>' +
    '<h2>6. Your Rights</h2><p>You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time. For GDPR-covered individuals, additional rights apply including data portability and the right to restrict processing.</p>' +
    '<h2>7. Contact Us</h2><p>For privacy-related inquiries, contact us at <a href="mailto:info@zynix.ai" style="color:#F16529">info@zynix.ai</a> or write to: Zynix AI, 3535 Little Rd, Trinity, FL 34655.</p>' +
    '</div></section>' +
    renderFooter();
  }

  // ── PAGE: Terms of Service ──
  function renderTerms() {
    return '<section class="zynix-inner-hero" style="padding:140px 0 60px"><div class="zynix-container" style="text-align:center;position:relative;z-index:1">' +
    '<h1 style="color:#fff;font-size:42px;font-weight:800;margin:0 0 16px">Terms of Service</h1>' +
    '<p style="color:rgba(255,255,255,0.8);font-size:16px">Last updated: March 2026</p>' +
    '</div></section>' +
    '<section class="zynix-legal-section"><div class="zynix-container zynix-legal-content">' +
    '<h2>1. Acceptance of Terms</h2><p>By accessing or using Zynix AI\u2019s platform and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>' +
    '<h2>2. Services</h2><p>Zynix provides an AI-powered healthcare operations platform including data integration, analytics, AI agents, documentation tools, and care plan orchestration. Services are provided pursuant to a separate Master Service Agreement or Order Form.</p>' +
    '<h2>3. User Responsibilities</h2><p>You are responsible for maintaining the confidentiality of your account credentials, ensuring authorized use by your organization, complying with applicable healthcare regulations, and providing accurate information.</p>' +
    '<h2>4. Intellectual Property</h2><p>All content, software, and technology comprising the Zynix platform is owned by Zynix AI or its licensors. You retain ownership of your data. We claim no ownership rights to customer data processed through our platform.</p>' +
    '<h2>5. Data Processing</h2><p>Data processing is governed by our Business Associate Agreement (where applicable) and our Privacy Policy. We process data only as necessary to provide contracted services and in accordance with applicable law.</p>' +
    '<h2>6. Limitation of Liability</h2><p>Zynix AI\u2019s liability is limited to the fees paid during the 12 months preceding the claim. We are not liable for indirect, incidental, or consequential damages. Our AI tools provide decision support and do not replace clinical judgment.</p>' +
    '<h2>7. Contact</h2><p>For questions about these terms, contact us at <a href="mailto:info@zynix.ai" style="color:#F16529">info@zynix.ai</a>.</p>' +
    '</div></section>' +
    renderFooter();
  }

  // ── MEGA MENU ──
  function injectMegaMenu() {
    var path = window.location.pathname.replace(/\/$/, '').toLowerCase();
    function al(href, text, icon, desc) {
      var cls = path === href ? ' class="active"' : '';
      var iconHtml = icon ? '<span class="zynix-nav-icon">' + icon + '</span>' : '';
      var descHtml = desc ? '<small>' + desc + '</small>' : '';
      return '<a href="' + href + '"' + cls + '>' + iconHtml + '<div><strong>' + text + '</strong>' + descHtml + '</div></a>';
    }
    function als(href, text) {
      var cls = path === href ? ' class="active"' : '';
      return '<a href="' + href + '"' + cls + '>' + text + '</a>';
    }
    var nav = document.createElement('nav');
    nav.className = 'zynix-mega-nav';
    nav.innerHTML =
      '<a href="/" class="zynix-nav-logo"><img src="' + IMG.logo + '" alt="Zynix AI"><span class="zynix-nav-logo-text">zynix<span class="zynix-logo-dot">.ai</span></span></a>' +
      '<div class="zynix-nav-items">' +
        // Products
        '<div class="zynix-nav-dropdown"><button class="zynix-nav-trigger">Products <span class="chevron">&#9662;</span></button>' +
        '<div class="zynix-mega-panel"><div class="zynix-mega-panel-inner">' +
          '<div class="zynix-mega-col"><h5>Platform</h5>' +
            al('/products-zynix-os','Zynix OS','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>','The AI operating system') +
            al('/products-data-platform','Data Platform','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>','Unified healthcare data') +
            al('/products-analytics','Analytics','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>','Population health intelligence') +
            al('/company-zynixllm','ZynixLLM','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>','Healthcare language model') +
          '</div>' +
          '<div class="zynix-mega-col"><h5>AI Agents</h5>' +
            al('/products-ai-agents','All Agents','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="3"/></svg>','7 specialized agents') +
            al('/products-ai-agents-zynafterhours','ZynAfterHours','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 5.18 2 2 0 0 1 5.11 3h3a2 2 0 0 1 2 1.72c.13.81.36 1.59.68 2.33a2 2 0 0 1-.45 2.11L9.09 10.41"/></svg>','24/7 AI triage') +
            al('/products-ai-agents-zynschedule','ZynSchedule','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>','Smart scheduling') +
            al('/products-ai-agents-zynreminder','ZynReminder','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>','Reduce no-shows') +
            al('/products-ai-agents-post-discharge','Post-Discharge','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>','Follow-up automation') +
            al('/products-ai-agents-med-rec','Med Reconciliation','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v6h12M3 9v10a2 2 0 0 0 2 2h4m-6-6h6"/><line x1="9" y1="17" x2="15" y2="17"/><line x1="12" y1="14" x2="12" y2="20"/></svg>','Medication safety') +
            al('/products-ai-agents-zynfax','ZynFax','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>','Fax automation') +
            al('/products-ai-agents-zynauth','ZynAuth','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>','Prior auth automation') +
          '</div>' +
          '<div class="zynix-mega-col"><h5>Clinical</h5>' +
            al('/products-zynscribe','ZynScribe','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/></svg>','AI documentation') +
          '<h5>Orchestration</h5>' +
            al('/products-care-plans','Care Plans','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>','Deployable workflows') +
          '</div>' +
        '</div></div></div>' +
        // Solutions
        '<div class="zynix-nav-dropdown"><button class="zynix-nav-trigger">Solutions <span class="chevron">&#9662;</span></button>' +
        '<div class="zynix-mega-panel"><div class="zynix-mega-panel-inner">' +
          '<div class="zynix-mega-col"><h5>By Organization</h5>' +
            al('/solutions-acos','ACOs & MSOs','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>','Shared savings optimization') +
            al('/solutions-health-systems','Health Systems','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="12" y1="6" x2="12" y2="12"/></svg>','Enterprise AI at scale') +
            al('/solutions-health-plans','Health Plans','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>','Stars & gap closure') +
            al('/solutions-fqhcs','FQHCs','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>','Community health AI') +
            al('/solutions-independent-practices','Practices','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33"/></svg>','Reduce burnout & no-shows') +
            al('/solutions-ascs','ASCs','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/></svg>','Prior auth & coordination') +
          '</div>' +
          '<div class="zynix-mega-col"><h5>By Use Case</h5>' +
            al('/solutions-use-case-tcm','Transitional Care','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg>','TCM workflow automation') +
            al('/solutions-use-case-gap-closure','Gap Closure','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="16 12 12 8 8 12"/><line x1="12" y1="16" x2="12" y2="8"/></svg>','HCC & HEDIS closure') +
            al('/solutions-use-case-after-hours','After-Hours','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>','24/7 patient access') +
            al('/solutions-use-case-prior-auth','Prior Auth','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>','Authorization automation') +
            al('/solutions-use-case-preventive-screening','Screening','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>','Preventive outreach') +
            al('/solutions-use-case-readmission-prevention','Readmission','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>','Prevent avoidable admits') +
          '</div>' +
        '</div></div></div>' +
        // Company
        '<div class="zynix-nav-dropdown"><button class="zynix-nav-trigger">Company <span class="chevron">&#9662;</span></button>' +
        '<div class="zynix-dropdown-panel"><div class="zynix-dropdown-panel-inner">' +
          al('/company-about','About','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>') +
          al('/company-careers','Careers','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>') +
          al('/company-trust-center','Trust Center','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>') +
          al('/company-press','Press','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/></svg>') +
          al('/contact','Contact','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>') +
        '</div></div></div>' +
        // Resources
        '<div class="zynix-nav-dropdown"><button class="zynix-nav-trigger">Resources <span class="chevron">&#9662;</span></button>' +
        '<div class="zynix-dropdown-panel"><div class="zynix-dropdown-panel-inner">' +
          al('/resources-blog','Blog','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>') +
          al('/resources-case-studies','Case Studies','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>') +
          al('/resources-faq','FAQ','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>') +
          al('/resources-glossary','Glossary','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>') +
          al('/resources-webinars','Webinars','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>') +
          al('/resources-whitepapers','Whitepapers','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>') +
        '</div></div></div>' +
      '</div>' +
      '<div class="zynix-nav-actions">' +
        '<a href="/contact" class="zynix-nav-contact">Contact</a>' +
        '<a href="' + CALENDLY + '" class="zynix-nav-cta" target="_blank">Request a Demo</a>' +
      '</div>' +
      '<button class="zynix-nav-hamburger" aria-label="Menu"><span></span><span></span><span></span></button>';

    // Mobile menu
    var mobile = document.createElement('div');
    mobile.className = 'zynix-mobile-menu';
    mobile.innerHTML =
      '<div class="zynix-mobile-section"><button class="zynix-mobile-section-trigger">Products &#9662;</button><div class="zynix-mobile-section-links">' +
      '<a href="/products-zynix-os">Zynix OS</a><a href="/products-data-platform">Data Platform</a><a href="/products-analytics">Analytics</a><a href="/company-zynixllm">ZynixLLM</a>' +
      '<a href="/products-ai-agents">AI Agents</a><a href="/products-zynscribe">ZynScribe</a><a href="/products-care-plans">Care Plans</a></div></div>' +
      '<div class="zynix-mobile-section"><button class="zynix-mobile-section-trigger">Solutions &#9662;</button><div class="zynix-mobile-section-links">' +
      '<a href="/solutions-acos">ACOs & MSOs</a><a href="/solutions-health-systems">Health Systems</a><a href="/solutions-health-plans">Health Plans</a><a href="/solutions-fqhcs">FQHCs</a><a href="/solutions-independent-practices">Practices</a><a href="/solutions-ascs">ASCs</a></div></div>' +
      '<div class="zynix-mobile-section"><button class="zynix-mobile-section-trigger">Company &#9662;</button><div class="zynix-mobile-section-links">' +
      '<a href="/company-about">About</a><a href="/company-careers">Careers</a><a href="/company-trust-center">Trust Center</a><a href="/contact">Contact</a></div></div>' +
      '<div class="zynix-mobile-section"><button class="zynix-mobile-section-trigger">Resources &#9662;</button><div class="zynix-mobile-section-links">' +
      '<a href="/resources-blog">Blog</a><a href="/resources-case-studies">Case Studies</a><a href="/resources-faq">FAQ</a><a href="/resources-glossary">Glossary</a></div></div>' +
      '<a href="' + CALENDLY + '" class="zynix-mobile-cta" target="_blank">Request a Demo</a>';

    // Announcement banner
    var announceBanner = document.createElement('div');
    announceBanner.className = 'zynix-announcement-bar';
    announceBanner.innerHTML = '🎉 Zynix AI surpasses 1 Million VBC patients onboarded across 30 states <a href="/resources-blog-1m-patients">Read more</a><button class="zynix-announce-close" aria-label="Close">&times;</button>';

    document.body.prepend(mobile);
    document.body.prepend(nav);
    document.body.prepend(announceBanner);

    // Push nav down to sit below the fixed announcement bar
    nav.classList.add('has-banner');
    document.body.classList.add('has-announcement-bar');

    // Announcement close handler
    announceBanner.querySelector('.zynix-announce-close').addEventListener('click', function() {
      announceBanner.style.display = 'none';
      nav.classList.remove('has-banner');
      document.body.classList.remove('has-announcement-bar');
    });

    // Hide Webflow nav
    var wfNav = document.querySelector('.w-nav, .navbar, [data-collapse="medium"]');
    if (wfNav) wfNav.style.display = 'none';

    // Hamburger toggle
    var burger = nav.querySelector('.zynix-nav-hamburger');
    burger.addEventListener('click', function() {
      burger.classList.toggle('open');
      mobile.classList.toggle('open');
    });

    // Mobile accordion
    mobile.querySelectorAll('.zynix-mobile-section-trigger').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var links = btn.nextElementSibling;
        links.classList.toggle('open');
        btn.innerHTML = btn.textContent.trim().replace(/[▾▴]/, '') + (links.classList.contains('open') ? ' &#9652;' : ' &#9662;');
      });
    });
  }

  // ── Shared: Agent Detail Page Template ──
  function renderAgentPage(name, tagline, subtitle, image, problem, capabilities, howItWorks, scenarios, proofPoints, faqs) {
    var html = renderInnerHero('AI AGENT', name + '  - ' + tagline, subtitle, image, name) +
      renderProblemSection('The Problem', problem);

    html += '<section id="capabilities"><div class="zynix-container">' +
      '<span class="zynix-tag">CAPABILITIES</span><h2>What ' + name + ' Does</h2>' +
      renderFeatureCards(capabilities) + '</div></section>';

    if (howItWorks) {
      html += '<section><div class="zynix-container">' +
        '<span class="zynix-tag">HOW IT WORKS</span><h2>From Input to Outcome</h2>' +
        '<div class="zynix-workflow-steps">';
      howItWorks.forEach(function(s, i) {
        html += '<div class="zynix-wf-step-card fade-in-up"><div class="zynix-wf-step-num">' + (i+1) + '</div><div><h4>' + s.title + '</h4><p>' + s.desc + '</p>' + (s.tag ? '<span class="zynix-wf-step-tag">' + s.tag + '</span>' : '') + '</div></div>';
      });
      html += '</div></div></section>';
    }

    if (scenarios) {
      html += '<section><div class="zynix-container">' +
        '<span class="zynix-tag">REAL-WORLD SCENARIO</span><h2>See It In Action</h2>' +
        '<div class="zynix-story-block"><h3>' + scenarios.title + '</h3><p>' + scenarios.body + '</p></div>' +
        '</div></section>';
    }

    if (proofPoints && proofPoints.length) { html += renderMetricsBar(proofPoints); }

    if (faqs && faqs.length) {
      html += '<section class="zynix-faq-section"><div class="zynix-container">' +
        '<span class="zynix-tag">FAQ</span><h2>Common Questions</h2>' +
        '<div class="zynix-faq-list">';
      faqs.forEach(function(f) {
        html += '<div class="zynix-faq-item"><div class="zynix-faq-q"><span>' + f.q + '</span><span class="zynix-faq-toggle">+</span></div><div class="zynix-faq-a"><p>' + f.a + '</p></div></div>';
      });
      html += '</div></div></section>';
    }

    html += '<div style="text-align:center;padding:24px 0"><a href="/products-ai-agents" style="color:#F16529;font-weight:600;font-size:14px">&larr; Back to All AI Agents</a></div>';
    html += renderCTA('See ' + name + ' in Action', 'Schedule a demo to see how ' + name + ' transforms your operations.') + renderFooter();
    return html;
  }

  // ── Shared: Use Case Page Template ──
  function renderUseCasePage(name, subtitle, problems, steps, replaces, kpis, story, definition) {
    var html = '<section class="zynix-inner-hero"><div class="zynix-container" style="position:relative;z-index:1;text-align:center;max-width:800px;margin:0 auto">' +
      '<span class="zynix-tag" style="display:inline-block">USE CASE</span>' +
      '<h1 style="font-size:42px;font-weight:600;margin:0 0 20px">' + name + '</h1>' +
      '<p style="color:var(--z-text-secondary,#94a3b8);font-size:18px;line-height:1.7">' + subtitle + '</p>' +
      '<div class="zynix-hero-btns" style="justify-content:center;margin-top:32px"><a href="' + CALENDLY + '" class="zynix-btn-primary" target="_blank">Request a Demo &rarr;</a></div>' +
      '</div></section>';

    // AEO definition block
    if (definition) {
      html += '<div class="zynix-container"><div class="zynix-summary-block">' + definition + '</div></div>';
    }

    html += renderProblemSection('What Breaks Today', problems);

    if (steps && steps.length) {
      html += '<section id="capabilities"><div class="zynix-container">' +
        '<span class="zynix-tag">HOW ZYNIX HELPS</span><h2>The Workflow, Reimagined</h2>' +
        '<div class="zynix-workflow-steps">';
      steps.forEach(function(s, i) {
        html += '<div class="zynix-wf-step-card fade-in-up"><div class="zynix-wf-step-num">' + (i+1) + '</div><div><h4>' + s.title + '</h4><p>' + s.desc + '</p>' + (s.tag ? '<span class="zynix-wf-step-tag">' + s.tag + '</span>' : '') + '</div></div>';
      });
      html += '</div></div></section>';
    }

    if (replaces && replaces.length) {
      html += '<section><div class="zynix-container"><span class="zynix-tag">WHAT IT REPLACES</span><h2>Manual Processes Eliminated</h2><div class="zynix-feature-grid">';
      replaces.forEach(function(r) {
        html += '<div class="zynix-feature-card fade-in-up"><h3>' + r + '</h3></div>';
      });
      html += '</div></div></section>';
    }

    if (kpis && kpis.length) {
      html += '<section><div class="zynix-container"><span class="zynix-tag">SUCCESS METRICS</span><h2>KPIs to Track</h2><div class="zynix-kpi-grid">';
      kpis.forEach(function(k) { html += '<div class="zynix-kpi-chip fade-in-up"><strong>' + k + '</strong></div>'; });
      html += '</div></div></section>';
    }

    if (story) {
      html += '<section><div class="zynix-container"><span class="zynix-tag">STORY WALKTHROUGH</span><h2>A Real Scenario</h2>' +
        '<div class="zynix-story-block"><p>' + story + '</p></div></div></section>';
    }

    html += renderCTA('Ready to Transform This Workflow?', 'See how Zynix automates and orchestrates ' + name.toLowerCase() + '.') + renderFooter();
    return html;
  }

  // ── NEW PAGE: ZynAfterHours & Triage ──
  function renderZynAfterHours() {
    return renderAgentPage('ZynAfterHours & Triage',
      'Your Best Nurse. Available 24/7. Speaking 15 Languages.',
      'AI-powered patient engagement that handles inbound calls 24/7 -triaging symptoms, scheduling appointments, and diverting unnecessary ER visits.',
      IMG.doctor,
      [
        { icon: '&#128222;', title: '67% of Calls Abandoned', desc: 'After-hours calls go to voicemail. Patients give up and go to the ER -costing $1,500-3,000 per avoidable visit.' },
        { icon: '&#128176;', title: '$38 Billion Problem', desc: 'Nearly two-thirds of patients avoid care due to scheduling frustration. 30% of ER visits are non-emergent.' },
        { icon: '&#128101;', title: 'Staff Burnout', desc: 'Traditional nurse triage lines cost $15-25 per call and cannot scale. Human staff burn out and turn over.' }
      ],
      [
        { icon: '&#128138;', title: 'Intelligent Symptom Triage', desc: 'Evidence-based protocols (Schmitt-Thompson), real-time assessment, automatic escalation for high-acuity cases.' },
        { icon: '&#128197;', title: 'Smart Scheduling', desc: 'Books same-day and next-day appointments based on urgency and provider availability.' },
        { icon: '&#127973;', title: 'ER Diversion', desc: 'Identifies patients who can safely wait. Provides self-care guidance and routes to appropriate care level.' },
        { icon: '&#127760;', title: 'Multilingual Support', desc: '15+ languages including Spanish, Mandarin, Vietnamese, Tagalog, Korean -with no translation delays.' },
        { icon: '&#128101;', title: 'Warm Handoffs', desc: 'Seamless transfer to human staff with complete clinical context. No starting from scratch.' },
        { icon: '&#128196;', title: 'EHR Documentation', desc: 'Every interaction automatically logged with structured ICD-10 ready documentation.' }
      ],
      [
        { title: 'Patient calls in', desc: 'Inbound voice call received. EHR context loaded (demographics, medical history, medications).', tag: 'Input' },
        { title: 'Symptom assessment', desc: 'Natural language understanding of symptoms. Clinical decision support algorithms applied. Urgency scored 1-5.', tag: 'Processing' },
        { title: 'Disposition & action', desc: 'Real-time triage decision: self-care guidance, appointment booking, ER referral, or 911 instruction.', tag: 'Output' },
        { title: 'Documentation & follow-up', desc: 'Encounter note uploaded to EHR. Escalation alerts sent. Patient follow-up messages delivered.', tag: 'Documentation' }
      ],
      { title: '2:47 AM  - Patient calls with chest discomfort', body: 'ZynAfterHours answers in 2 rings. Patient describes pressure in their chest for about an hour. The AI asks structured questions: location, radiation, shortness of breath, risk factors. Patient reports no radiation, no SOB, history of GERD, ate spicy food. Triage assessment: likely non-cardiac, but age/timing warrants evaluation. Action: same-day urgent care appointment scheduled. Red flag instructions provided. Complete encounter note documented in EHR. Total time: 4 minutes 23 seconds.' },
      [
        { value: '<60s', label: 'Average Wait Time' },
        { value: '70-80%', label: 'Routine Inquiries Handled' },
        { value: '20-30%', label: 'ER Diversion Rate' },
        { value: '97.3%', label: 'Triage Accuracy' },
        { value: '9.0/10', label: 'Patient Satisfaction' },
        { value: '60-80%', label: 'Cost Reduction vs Nurse Lines' }
      ],
      [
        { q: 'Is this HIPAA compliant?', a: 'Yes. All data encrypted in transit and at rest. BAA included. SOC 2 Type II certified.' },
        { q: 'What happens during a real emergency?', a: 'The system recognizes emergency keywords and symptoms immediately. It connects to a live nurse or instructs the patient to call 911 -within seconds.' },
        { q: 'Does this replace our nurses?', a: 'No. It handles 70-80% of routine calls so your nurses focus on complex cases requiring clinical judgment.' },
        { q: 'What languages does it support?', a: '15+ languages including Spanish, Mandarin, Vietnamese, Tagalog, Korean, and more.' },
        { q: 'How accurate is the triage?', a: '97.3% accuracy validated against clinical review. Lower hallucination rate than any general-purpose model.' }
      ]
    );
  }

  // ── NEW PAGE: ZynSchedule ──
  function renderZynSchedule() {
    return renderAgentPage('ZynSchedule',
      'Always-On Appointment Scheduling',
      'AI-powered scheduling that captures every available slot, reduces no-shows, and books appointments 24/7 without staff involvement.',
      IMG.patient,
      [
        { icon: '&#128197;', title: 'Scheduling Bottleneck', desc: 'Patients call during business hours, wait on hold, and give up. Missed appointments = missed revenue.' },
        { icon: '&#128683;', title: 'High No-Show Rates', desc: '20-30% no-show rates cost practices thousands monthly. Manual reminders are inconsistent.' },
        { icon: '&#9203;', title: 'Limited Hours', desc: 'Scheduling staff only available 8-5. Patients who work can\u2019t call during business hours.' }
      ],
      [
        { icon: '&#128197;', title: '24/7 Booking', desc: 'Patients book, reschedule, and cancel appointments any time via voice or text.' },
        { icon: '&#128276;', title: 'Smart Reminders', desc: 'Automated multi-channel reminders reduce no-shows by up to 40%.' },
        { icon: '&#128202;', title: 'Slot Optimization', desc: 'AI fills gaps in the schedule by matching patient urgency with provider availability.' },
        { icon: '&#128268;', title: 'EHR Integration', desc: 'Direct sync with Epic, Cerner, athenahealth, and other scheduling systems.' }
      ],
      [
        { title: 'Patient requests appointment', desc: 'Inbound request via phone, text, or web. Patient identity verified.', tag: 'Input' },
        { title: 'Availability matching', desc: 'AI checks real-time provider availability, matches urgency, and finds optimal slot.', tag: 'Processing' },
        { title: 'Booking confirmed', desc: 'Appointment booked, confirmation sent via preferred channel. Reminders scheduled.', tag: 'Output' }
      ],
      { title: 'A patient needs a follow-up after abnormal labs', body: 'At 9 PM, a patient receives a message about abnormal lab results and needs to schedule a follow-up. ZynSchedule is available immediately -no waiting until morning. It identifies the urgency, finds the next available slot with the right provider, books the appointment, and sends confirmation with prep instructions. The patient sleeps knowing their follow-up is scheduled.' },
      [
        { value: '40%', label: 'No-Show Reduction' },
        { value: '24/7', label: 'Booking Availability' },
        { value: '3x', label: 'Scheduling Throughput' },
        { value: '95%+', label: 'Patient Satisfaction' }
      ],
      [
        { q: 'What scheduling systems do you integrate with?', a: 'Epic, Cerner, athenahealth, eClinicalWorks, NextGen, and all major EHRs via HL7/FHIR.' },
        { q: 'Can it handle complex scheduling rules?', a: 'Yes -provider preferences, appointment types, insurance verification, and multi-provider visits.' }
      ]
    );
  }

  // ── NEW PAGE: Post-Discharge Follow-Up ──
  function renderPostDischarge() {
    return renderAgentPage('Post-Discharge Follow-Up',
      'From Discharge to Recovery, Automatically',
      'AI-powered outreach that contacts every patient within 24-48 hours of discharge -confirming safe arrival, reviewing meds, and scheduling follow-ups.',
      IMG.care,
      [
        { icon: '&#127973;', title: 'Only 30-40% Get Follow-Up', desc: 'Most discharged patients never receive timely contact. TCM billing windows are missed.' },
        { icon: '&#128176;', title: '$15,000+ Per Readmission', desc: 'Each readmission costs thousands and damages quality scores. Prevention requires systematic follow-up.' },
        { icon: '&#128138;', title: '40% Med Errors Post-Discharge', desc: 'Medication confusion causes nearly half of post-discharge adverse events.' }
      ],
      [
        { icon: '&#128222;', title: 'Automated 24-48hr Contact', desc: 'Calls every discharged patient within the TCM billing window.' },
        { icon: '&#128196;', title: 'Discharge Instruction Review', desc: 'Confirms patient understanding of their care plan and medications.' },
        { icon: '&#128138;', title: 'Medication Reconciliation', desc: 'Identifies confusion, missing meds, and non-adherence.' },
        { icon: '&#128197;', title: 'Follow-Up Scheduling', desc: 'Books 7-day and 14-day follow-up appointments automatically.' },
        { icon: '&#9888;', title: 'Red Flag Detection', desc: 'Identifies worsening symptoms and escalates to clinical staff immediately.' },
        { icon: '&#128176;', title: 'TCM Revenue Capture', desc: 'Systematic documentation ensures TCM billing codes are captured.' }
      ],
      null,
      { title: 'TCM Workflow: Patient discharged at 2:47 PM Tuesday', body: 'Minute 0: ADT feed hits Zynix. Minute 1: Patient record enriched with discharge diagnosis, medications, risk score. Minute 2: Risk model flags HIGH (82nd percentile readmission risk). Minute 5: TCM care plan auto-deployed. Hours 1-24: AI calls patient, confirms safe arrival, reviews meds, identifies confusion, escalates to pharmacist, schedules 7-day follow-up. Day 3: Appointment reminder sent. Day 5: Patient confirms via text. Day 7: Patient attends, TCM billing code captured. Day 30: Patient did NOT readmit -shared savings preserved. Total human involvement: pharmacist review (5 min), PCP visit (15 min). Everything else: automated.' },
      [
        { value: '85%+', label: 'Contact Rate' },
        { value: '2x', label: 'TCM Revenue Capture' },
        { value: '25%', label: 'Readmission Reduction' },
        { value: '60%', label: 'Staff Time Saved' }
      ],
      [
        { q: 'How quickly does outreach happen after discharge?', a: 'Within hours. ADT feeds are processed in real-time and outreach begins within the TCM billing window.' },
        { q: 'What if the patient reports worsening symptoms?', a: 'Red flag protocols trigger immediate escalation to clinical staff with full context.' }
      ]
    );
  }

  // ── NEW PAGE: Medication Reconciliation ──
  function renderMedRec() {
    return renderAgentPage('Medication Reconciliation',
      'Medication Safety at Every Transition',
      'AI-powered medication reconciliation that identifies discrepancies, confirms patient understanding, and routes issues for resolution.',
      IMG.patient,
      [
        { icon: '&#128138;', title: 'Medication Errors Kill', desc: 'Medication errors cause 40% of post-discharge adverse events. Manual reconciliation misses discrepancies.' },
        { icon: '&#128268;', title: 'Fragmented Med Lists', desc: 'Patients see multiple providers. No single source of truth for what they\u2019re actually taking.' },
        { icon: '&#128683;', title: 'Non-Adherence', desc: 'Cost barriers, side effects, and confusion lead to 50% non-adherence for chronic medications.' }
      ],
      [
        { icon: '&#128138;', title: 'Discrepancy Detection', desc: 'Compares discharge meds, EHR records, and patient-reported medications to find gaps.' },
        { icon: '&#128101;', title: 'Patient Confirmation', desc: 'Contacts patients to verify what they\u2019re actually taking and identify confusion.' },
        { icon: '&#9888;', title: 'Safety Escalation', desc: 'Routes medication concerns to pharmacist or clinician review with full context.' },
        { icon: '&#128202;', title: 'Adherence Tracking', desc: 'Monitors medication adherence patterns and triggers intervention when needed.' }
      ],
      null,
      { title: 'Patient stops a new medication due to dizziness', body: 'The medication reconciliation agent discovers during a routine post-discharge call that the patient stopped their new blood pressure medication because of dizziness. The agent captures symptom severity, routes the case for clinician review, documents the medication change, and schedules a follow-up to confirm stability -rather than discovering the issue at an ED visit weeks later.' },
      [
        { value: '95%+', label: 'Reconciliation Accuracy' },
        { value: '40%', label: 'Fewer Med Errors' },
        { value: '3x', label: 'Faster Resolution' },
        { value: '24/7', label: 'Patient Access' }
      ],
      [
        { q: 'How does it integrate with pharmacy data?', a: 'Connects to pharmacy fill data, EHR med lists, and discharge summaries for a complete medication picture.' },
        { q: 'Can it handle polypharmacy patients?', a: 'Yes. Designed specifically for complex patients with multiple medications across multiple providers.' }
      ]
    );
  }

  // ── NEW PAGE: ZynReminder ──
  function renderZynReminder() {
    return renderAgentPage('ZynReminder',
      'Smart Reminders That Drive Action',
      'Automated patient reminders and two-way communication that reduces no-shows, improves follow-through, and keeps patients engaged.',
      IMG.patient,
      [
        { icon: '&#128683;', title: '20-30% No-Show Rates', desc: 'Missed appointments cost practices thousands monthly and delay patient care.' },
        { icon: '&#128222;', title: 'Manual Reminder Calls', desc: 'Staff spend hours making reminder calls. Inconsistent execution and high labor cost.' },
        { icon: '&#128268;', title: 'One-Way Communication', desc: 'Traditional reminders don\u2019t capture patient responses or enable rescheduling.' }
      ],
      [
        { icon: '&#128276;', title: 'Multi-Channel Reminders', desc: 'Voice, text, and email reminders personalized to patient preferences and appointment type.' },
        { icon: '&#128172;', title: 'Two-Way Communication', desc: 'Patients confirm, reschedule, or ask questions directly through the reminder channel.' },
        { icon: '&#128202;', title: 'Intelligent Timing', desc: 'AI optimizes reminder timing based on appointment type, patient behavior, and engagement history.' },
        { icon: '&#128197;', title: 'Instant Rescheduling', desc: 'When patients can\u2019t make it, ZynReminder immediately offers alternative slots.' }
      ],
      null,
      { title: 'Reducing no-shows for a busy primary care practice', body: 'A primary care practice with 25% no-show rates deploys ZynReminder. Patients receive personalized reminders 72 hours, 24 hours, and 2 hours before their appointment. When a patient responds they can\u2019t make it, ZynReminder immediately offers alternative times and rebooks. The practice sees no-show rates drop to 12% within 60 days.' },
      [
        { value: '40%', label: 'No-Show Reduction' },
        { value: '85%+', label: 'Confirmation Rate' },
        { value: '24/7', label: 'Patient Communication' },
        { value: '9.0/10', label: 'Patient Satisfaction' }
      ],
      []
    );
  }

  // ── NEW PAGE: ZynFax ──
  function renderZynFax() {
    return renderAgentPage('ZynFax',
      'Intelligent Fax Processing & Referral Management',
      'AI that reads, classifies, and routes faxes automatically -turning a paper-based bottleneck into a digital workflow.',
      IMG.data,
      [
        { icon: '&#128424;', title: 'Fax is Still King', desc: 'Healthcare still runs on fax. Referrals, lab results, and prior auth documents pile up in fax queues.' },
        { icon: '&#128683;', title: 'Manual Sorting', desc: 'Staff spend hours reading, classifying, and routing faxes. Documents get lost. Referrals fall through cracks.' },
        { icon: '&#9203;', title: 'Delayed Care', desc: 'When faxes sit unprocessed, patients wait for referrals, authorizations, and results.' }
      ],
      [
        { icon: '&#128196;', title: 'Auto-Classification', desc: 'AI reads incoming faxes and classifies by type: referral, lab result, prior auth, records request.' },
        { icon: '&#128101;', title: 'Patient Matching', desc: 'Automatically matches fax content to patient records in your EHR.' },
        { icon: '&#128268;', title: 'Smart Routing', desc: 'Routes documents to the right team, department, or workflow based on content and urgency.' },
        { icon: '&#9888;', title: 'Missing Info Detection', desc: 'Flags incomplete referrals and missing documentation before they stall the process.' }
      ],
      null,
      { title: 'A referral arrives by fax missing prior labs', body: 'A cardiology referral arrives via fax. ZynFax reads the document, matches it to the patient, and detects that prior lab results are missing. It automatically flags the missing items, requests them from the referring provider, and only queues the referral for scheduling once the packet is complete. The patient doesn\u2019t wait weeks for a missing piece of paper.' },
      [
        { value: '90%+', label: 'Auto-Classification Accuracy' },
        { value: '75%', label: 'Staff Time Saved' },
        { value: '3x', label: 'Faster Referral Processing' },
        { value: '50%', label: 'Fewer Lost Documents' }
      ],
      []
    );
  }

  // ── NEW PAGE: ZynAuth ──
  function renderZynAuth() {
    return renderAgentPage('ZynAuth',
      'Prior Authorization, Accelerated',
      'AI-powered prior authorization that automates submission, tracks status, manages denials, and reduces turnaround time by 40%.',
      IMG.enterprise,
      [
        { icon: '&#128203;', title: 'Manual Portal Navigation', desc: 'Staff spend hours navigating payer portals, phone calls, and fax follow-ups for each authorization.' },
        { icon: '&#9203;', title: 'Delays Block Care', desc: 'Average prior auth takes 5-10 business days. Patients wait. Procedures are delayed.' },
        { icon: '&#128683;', title: 'Denials Pile Up', desc: 'Reactive denial management means missed appeal windows and lost revenue.' }
      ],
      [
        { icon: '&#128203;', title: 'Automated Submission', desc: 'Submits prior auth requests to payer portals automatically with optimized clinical documentation.' },
        { icon: '&#128269;', title: 'Status Tracking', desc: 'Monitors authorization status across all payers in a centralized dashboard.' },
        { icon: '&#9888;', title: 'Denial Management', desc: 'Identifies denial reasons, prepares appeal documentation, and tracks appeal status.' },
        { icon: '&#128276;', title: 'Expiration Alerts', desc: 'Notifies before authorizations expire so nothing falls through the cracks.' },
        { icon: '&#128196;', title: 'Clinical Documentation', desc: 'Prepares optimal clinical justification to maximize first-pass approval rates.' },
        { icon: '&#128202;', title: 'Analytics', desc: 'Tracks approval rates, turnaround times, and denial patterns across payers.' }
      ],
      null,
      { title: 'MRI prior auth delays a diagnosis', body: 'A clinician orders an MRI for back pain with concerning symptoms. ZynAuth flags missing documentation early -conservative therapy records needed. It assembles the clinical justification, submits to the payer portal, and tracks status. When additional information is requested, ZynAuth routes it as a task with an owner and deadline. Once approved, scheduling is triggered automatically. Result: weeks of delay reduced to days.' },
      [
        { value: '75%', label: 'Processing Time Saved' },
        { value: '10-15%', label: 'Higher First-Pass Approval' },
        { value: '40%', label: 'Faster Resolution' },
        { value: '$20+', label: 'Saved Per Auth' }
      ],
      [
        { q: 'Which payers do you support?', a: 'All major commercial payers, Medicare Advantage plans, and Medicaid managed care plans. We continuously expand coverage.' },
        { q: 'Can it handle appeals?', a: 'Yes. ZynAuth prepares appeal documentation and tracks appeal status through resolution.' },
        { q: 'How does it integrate with our workflow?', a: 'Integrates directly with your EHR to pull clinical data and update authorization status.' }
      ]
    );
  }

  // ── NEW PAGES: Use Cases ──
  function renderUseCaseTCM() {
    return renderUseCasePage('Transitional Care Management (TCM)',
      'A practical 30-day post-discharge execution workflow that turns discharge events into completed follow-ups.',
      [
        { icon: '&#9203;', title: 'Discharge Visibility Delayed', desc: 'ADT feeds arrive late or in multiple formats. By the time patients appear on a list, valuable days are lost.' },
        { icon: '&#128101;', title: 'Ownership is Unclear', desc: 'Who owns the first call? Who owns follow-up scheduling? When ownership is shared, gaps appear.' },
        { icon: '&#128196;', title: 'Documentation is Afterthought', desc: 'Teams do the work but fail to capture it cleanly -lost billing, poor audit readiness.' }
      ],
      [
        { title: 'Capture discharges into single work queue', desc: 'Data Platform ingests discharge sources and normalizes into one prioritized queue.', tag: 'Zynix Data Platform' },
        { title: 'Execute outreach within 48 hours', desc: 'Post-Discharge Follow-Up agent runs outreach sequences, captures outcomes, updates status.', tag: 'Post-Discharge Agent' },
        { title: 'Resolve medication risk', desc: 'Medication Reconciliation agent flags discrepancies and routes issues for resolution.', tag: 'Med Rec Agent' },
        { title: 'Schedule follow-up visit', desc: 'ZynSchedule books/reschedules follow-ups and sends confirmation reminders.', tag: 'ZynSchedule' },
        { title: 'Document as work happens', desc: 'ZynScribe supports structured documentation. Program reporting artifacts ensured before case closure.', tag: 'ZynScribe' }
      ],
      ['Spreadsheet-based discharge tracking', 'Unstructured call lists and manual reminders', 'Inconsistent escalation handoffs', 'Fragmented scheduling workflows', 'Documentation captured late or inconsistently'],
      ['Contact rate within 48 hours', 'Time from discharge to first successful contact', 'Follow-up scheduled within 7 days', 'Medication reconciliation completion rate', 'TCM completion rate within 30 days', 'Documentation completeness rate'],
      'A patient returns home after CHF exacerbation. On day 1-2 they receive a call and admit they did not fill one discharge med and feel more short of breath. The care plan routes symptom escalation to the on-call clinician, triggers pharmacy follow-up for the missing med, schedules a tele-visit within a week due to transport barriers, and sends appointment reminders. The episode stays open until those steps are verified.',
      '<strong>Transitional Care Management (TCM)</strong> is a CMS-reimbursable program (CPT 99495/99496) that requires healthcare organizations to contact discharged patients within 48 hours and complete a follow-up visit within 7-14 days. Zynix automates this entire 30-day workflow using AI agents, achieving 85%+ contact rates compared to the 30-40% industry average \u2014 turning every discharge into a completed, billed TCM episode.'
    );
  }

  function renderUseCaseGapClosure() {
    return renderUseCasePage('Gap Closure (HCC / HEDIS / Quality)',
      'Turn gap identification into completed closures -labs done, visits completed, documentation aligned.',
      [
        { icon: '&#128202;', title: 'Gaps Identified But Not Closed', desc: 'Analytics flags 2,000 patients with HCC gaps. Nobody has time to call them all. Insights die in dashboards.' },
        { icon: '&#128683;', title: 'Manual Outreach Doesn\u2019t Scale', desc: 'Care coordinators can reach a fraction of the population. High-impact patients get lost in the queue.' },
        { icon: '&#9203;', title: 'Timing Windows Expire', desc: 'HCC and quality measure windows close. Revenue opportunity lost forever.' }
      ],
      [
        { title: 'Identify and prioritize gaps', desc: 'ZynGap identifies HCC, HEDIS, and preventive gaps and ranks by impact and timing.', tag: 'ZynGap' },
        { title: 'Segment and outreach', desc: 'Patients segmented: needs lab vs. needs visit vs. needs documentation alignment. Outreach launched.', tag: 'ZynReminder' },
        { title: 'Book appointments', desc: 'AWV/chronic visits or lab appointments scheduled based on patient availability.', tag: 'ZynSchedule' },
        { title: 'Prepare visit readiness packets', desc: 'Clinic receives day-of packets: what to address, which gaps to close, suggested actions.', tag: 'ZynGuide' },
        { title: 'Verify closure', desc: 'Lab completed and reviewed. Visit completed. Gap marked closed only when action is confirmed.', tag: 'Analytics' }
      ],
      ['Static gap reports that expire', 'Manual patient outreach calls', 'Spreadsheet-based tracking', 'Visit prep done from memory', 'Closure verification by chart review'],
      ['HCC gap closure rate', 'Time from gap identification to closure', 'AWV completion rate', 'Patient response rate', 'Revenue impact per closed gap'],
      'A diabetic patient is overdue for A1c and retinal exam. The care plan pushes an outreach sequence, captures that the patient works nights, schedules an after-hours lab, and sets reminders. When results return abnormal, a follow-up visit is scheduled and tracked until completed.',
      '<strong>HCC and quality gap closure</strong> is the process of identifying patients with unaddressed chronic conditions (HCC gaps) or missing preventive measures (HEDIS/quality gaps) and ensuring they receive the appropriate care, documentation, and follow-up. Zynix uses AI to prioritize gaps by financial and clinical impact, then deploys autonomous agents to outreach patients, schedule visits, and verify closure \u2014 closing gaps 40% faster than manual workflows.'
    );
  }

  function renderUseCaseAfterHours() {
    return renderUseCasePage('After-Hours & Access Optimization',
      'Reduce after-hours bottlenecks and ensure inbound requests become completed next steps.',
      [
        { icon: '&#127769;', title: 'After-Hours Black Hole', desc: 'Calls go to voicemail. Patients get frustrated. They go to the ER or delay care.' },
        { icon: '&#128683;', title: 'Loose Ends', desc: 'Messages taken but never routed. Callbacks happen too late. No tracking to completion.' },
        { icon: '&#128101;', title: 'Staffing Constraints', desc: 'Cannot afford 24/7 nurse staffing. Current answering services just take messages.' }
      ],
      [
        { title: 'Intake after-hours call', desc: 'Gather symptoms and context from the caller.', tag: 'ZynAfterHours' },
        { title: 'Route by governance', desc: 'Urgent escalation vs. next-day appointment vs. self-care guidance.', tag: 'Triage Protocol' },
        { title: 'Schedule immediately', desc: 'If appointment needed, book immediately or queue first-available.', tag: 'ZynSchedule' },
        { title: 'Confirm and remind', desc: 'Patient receives confirmation and appointment reminders.', tag: 'ZynReminder' },
        { title: 'Track completion', desc: 'Appointment kept or rescheduled. Escalation completed.', tag: 'Analytics' }
      ],
      ['Voicemail-based after-hours', 'Answering services that only take messages', 'Next-day callback delays', 'No completion tracking'],
      ['After-hours call resolution rate', 'Time to first response', 'ER diversion rate', 'Appointment completion rate', 'Patient satisfaction score'],
      'A parent calls about a child\u2019s fever and rash at 11 PM. The care plan captures red flag status, escalates to the on-call clinician when the rash is concerning, or schedules a next-day visit and sends confirmations. The case does not disappear into a voicemail box.',
      '<strong>After-hours triage and access optimization</strong> ensures patients can reach their healthcare organization 24/7 for symptom assessment, appointment scheduling, and care guidance. Zynix ZynAfterHours uses AI to answer inbound calls in 15+ languages, triage symptoms using evidence-based clinical protocols (Schmitt-Thompson), and route patients to the appropriate level of care \u2014 achieving 97.3% triage accuracy and diverting 20-30% of unnecessary ER visits.'
    );
  }

  function renderUseCasePriorAuth() {
    return renderUseCasePage('Prior Authorization Acceleration',
      'Reduce stalled prior auth cases by making each auth a tracked, owned workflow with clear next steps.',
      [
        { icon: '&#128203;', title: 'Stalled Authorizations', desc: 'Missing notes, incomplete forms, and payer back-and-forth cause weeks of delays.' },
        { icon: '&#128176;', title: 'Revenue Impact', desc: 'Denied or delayed auths lead to cancelled procedures and lost revenue.' },
        { icon: '&#128683;', title: 'No Ownership', desc: 'Auth requests sit between departments with no clear owner or deadline.' }
      ],
      [
        { title: 'Create auth case', desc: 'Case created with owner and due date. Documentation checklist assembled.', tag: 'ZynAuth' },
        { title: 'Detect missing items early', desc: 'Incomplete documentation flagged before submission.', tag: 'ZynAuth' },
        { title: 'Submit and track', desc: 'Submit via portal/fax. Track status. Follow up on payer requests.', tag: 'ZynAuth + ZynFax' },
        { title: 'Handle denials', desc: 'If denied, route to clinician for peer-to-peer or appeal steps.', tag: 'Escalation' },
        { title: 'Schedule service', desc: 'Once approved, schedule the procedure and remind the patient.', tag: 'ZynSchedule + ZynReminder' }
      ],
      ['Manual payer portal navigation', 'Phone calls and fax follow-ups', 'Spreadsheet status tracking', 'Reactive denial management'],
      ['Time from order to approval', 'First-pass approval rate', 'Denial appeal success rate', 'Authorization turnaround time', 'Staff hours per auth'],
      'A patient needs an MRI. The clinic previously lost weeks to back-and-forth. This workflow creates an auth case, flags missing conservative therapy notes before submission, tracks payer requests, schedules the MRI immediately after approval, and keeps the patient from repeatedly calling with no answers.',
      '<strong>Prior authorization</strong> is a requirement by health plans that providers must obtain approval before delivering certain services, procedures, or medications. Zynix ZynAuth automates the entire prior auth workflow \u2014 gathering clinical documentation, submitting requests, tracking approvals, and managing denials \u2014 reducing authorization turnaround time by 60% and eliminating the administrative burden that delays patient care.'
    );
  }

  function renderUseCasePreventiveScreening() {
    return renderUseCasePage('Preventive Screening Completion',
      'Move preventive screening from order to completion, especially in populations with access barriers.',
      [
        { icon: '&#128269;', title: 'Overdue Screenings', desc: 'Patients avoid screenings due to anxiety, confusion, and scheduling friction.' },
        { icon: '&#128683;', title: 'Prep Barriers', desc: 'Colonoscopy prep confusion, mammogram scheduling difficulty -logistics kill compliance.' },
        { icon: '&#128268;', title: 'No Follow-Through', desc: 'Results come back but follow-up actions are not tracked to completion.' }
      ],
      [
        { title: 'Identify overdue cohort', desc: 'ZynGap identifies patients overdue for colon, breast, cervical, and other screenings.', tag: 'ZynGap' },
        { title: 'Outreach with education', desc: 'Simple explanation and scheduling options sent to patients.', tag: 'ZynReminder' },
        { title: 'Schedule the screening', desc: 'Book the appointment based on patient availability and facility capacity.', tag: 'ZynSchedule' },
        { title: 'Prep instructions', desc: 'Timed reminders with plain-language prep guidance.', tag: 'ZynReminder' },
        { title: 'Results follow-through', desc: 'If results require follow-up, route to scheduling and clinical review.', tag: 'Analytics' }
      ],
      ['Manual screening outreach', 'Generic reminder letters', 'No prep support', 'Results not tracked to completion'],
      ['Screening completion rate', 'Time from identification to completion', 'Patient response rate', 'Follow-up action completion rate'],
      'A patient avoids colon screening due to prep anxiety and scheduling confusion. The care plan provides plain-language guidance, sets a concrete appointment during a time that works, sends timed reminders including prep instructions, and ensures results follow-through when findings require action.',
      '<strong>Preventive screening completion</strong> measures whether patients receive age-appropriate and risk-appropriate screenings such as colonoscopy, mammography, cervical cancer screening, and diabetes management labs. Zynix identifies patients overdue for screenings, deploys targeted outreach with plain-language education, schedules appointments around patient availability, and tracks results to ensure follow-through on abnormal findings.'
    );
  }

  function renderUseCaseReadmission() {
    return renderUseCasePage('Readmission Prevention',
      'Reduce repeat ED utilization by creating reliable pathways for rapid access and barrier resolution.',
      [
        { icon: '&#127973;', title: 'Repeat ED Visits', desc: 'High-utilizer patients cycle through the ED because they lack reliable access to primary care.' },
        { icon: '&#128138;', title: 'Medication Barriers', desc: 'Cost, access, and confusion drive non-adherence that leads to acute episodes.' },
        { icon: '&#128268;', title: 'Fragmented Follow-Up', desc: 'Post-discharge plans fall apart when patients can\u2019t navigate the system.' }
      ],
      [
        { title: 'Identify high-utilizer cohort', desc: 'ZynPredict flags patients with repeated ED visits or utilization risk signals.', tag: 'ZynPredict' },
        { title: 'Understand real drivers', desc: 'Outreach to discover symptoms, meds, and access barriers.', tag: 'Post-Discharge Agent' },
        { title: 'Schedule rapid follow-up', desc: 'Book timely follow-up appointment with appropriate provider.', tag: 'ZynSchedule' },
        { title: 'Address medication barriers', desc: 'Identify cost, access, and adherence issues. Route for resolution.', tag: 'Med Rec Agent' },
        { title: 'Establish after-hours pathway', desc: 'Educate patient on when and how to reach after-hours care.', tag: 'ZynAfterHours' }
      ],
      ['Reactive post-ED outreach', 'No root cause investigation', 'Fragmented care team communication', 'No completion tracking'],
      ['30-day readmission rate', 'ED utilization frequency', 'Follow-up completion rate', 'Medication adherence improvement', 'Patient-reported access satisfaction'],
      'A patient repeatedly goes to the ED for COPD flares. Outreach reveals they stopped inhalers due to cost and can\u2019t get timely clinic visits. The care plan routes medication assistance review, schedules a follow-up, sets reminders, and ensures the patient knows how to reach the after-hours line instead of the ED.',
      '<strong>Readmission prevention</strong> uses AI-driven risk stratification and automated post-discharge interventions to reduce avoidable hospital readmissions within 30 days. Zynix identifies high-risk patients at discharge, deploys autonomous agents to conduct follow-up calls, reconcile medications, schedule timely appointments, and address social determinants \u2014 achieving 25% reduction in avoidable readmissions and helping hospitals avoid CMS HRRP penalties.'
    );
  }

  // ── NEW PAGES: Placeholder Pages ──
  function renderPlaceholderPage(tag, title, subtitle, extraHtml) {
    return '<section class="zynix-inner-hero"><div class="zynix-container" style="position:relative;z-index:1;text-align:center">' +
      '<span class="zynix-tag" style="display:inline-block">' + tag + '</span>' +
      '<h1 style="color:#fff;font-size:42px;font-weight:800;margin:0 0 20px">' + title + '</h1>' +
      '<p style="color:rgba(255,255,255,0.8);font-size:18px;line-height:1.7;max-width:600px;margin:0 auto">' + subtitle + '</p>' +
      '</div></section>' +
      (extraHtml || '<section class="zynix-placeholder-section"><div class="zynix-container"><h2>Coming Soon</h2><p>We\u2019re building something great. Check back soon for updates.</p><a href="' + CALENDLY + '" class="zynix-btn-primary" target="_blank">Request a Demo &rarr;</a></div></section>') +
      renderFooter();
  }

  function renderCareers() {
    return renderPlaceholderPage('CAREERS', 'Join the Team Building Healthcare\u2019s Future',
      'We\u2019re looking for builders, clinicians, engineers, and operators who believe AI can transform healthcare.',
      '<section style="padding:80px 0"><div class="zynix-container" style="text-align:center">' +
      '<h2 style="font-size:32px;font-weight:700;color:#e8eaf0;margin:0 0 16px">Open Positions</h2>' +
      '<p style="font-size:16px;color:#94a3b8;max-width:500px;margin:0 auto 32px">We\u2019re growing fast. If you\u2019re passionate about healthcare and AI, we want to hear from you.</p>' +
      '<a href="mailto:careers@zynix.ai" class="zynix-btn-primary">Send Your Resume &rarr;</a>' +
      '</div></section>');
  }

  function renderPress() {
    return renderPlaceholderPage('PRESS & NEWSROOM', 'Zynix AI in the News',
      'Press releases, media coverage, and company announcements.',
      '<section style="padding:80px 0"><div class="zynix-container" style="text-align:center">' +
      '<h2 style="font-size:32px;font-weight:700;color:#e8eaf0;margin:0 0 16px">Newsroom</h2>' +
      '<p style="font-size:16px;color:#94a3b8;max-width:500px;margin:0 auto 32px">For press inquiries, contact <a href="mailto:press@zynix.ai" style="color:#F16529">press@zynix.ai</a></p>' +
      '</div></section>');
  }

  function renderGlossary() {
    var terms = [
      { term: 'Value-Based Care', definition: 'Value-based care (VBC) is a healthcare delivery model in which providers are reimbursed based on patient health outcomes rather than the volume of services rendered. Unlike traditional fee-for-service models, VBC aligns financial incentives with quality by rewarding providers who reduce costs, improve clinical outcomes, and enhance patient satisfaction. Key VBC programs include Medicare Shared Savings Program (MSSP), ACO REACH, bundled payments, and capitated arrangements. Success in VBC requires robust data infrastructure, population health analytics, care coordination workflows, and proactive patient engagement. Organizations participating in VBC must track quality measures such as HEDIS, Stars ratings, and HCC risk adjustment to optimize both clinical performance and shared savings distributions.' },
      { term: 'HCC (Hierarchical Condition Category)', definition: 'Hierarchical Condition Categories (HCCs) are a risk adjustment methodology used by CMS to predict future healthcare costs for Medicare Advantage and other value-based care populations. Each HCC maps to specific ICD-10 diagnosis codes that represent chronic or significant health conditions such as diabetes with complications, congestive heart failure, or chronic kidney disease. HCC coding directly affects a patient\u2019s Risk Adjustment Factor (RAF) score, which determines the per-member-per-month capitation payment a health plan receives. Accurate HCC capture requires thorough clinical documentation, annual recapture of chronic conditions, and proactive gap identification. Organizations that under-code HCCs receive inadequate funding relative to patient acuity, while over-coding triggers regulatory audits. AI-powered platforms like Zynix automate HCC gap identification and prioritize outreach to ensure accurate and compliant coding.' },
      { term: 'RAF Score (Risk Adjustment Factor)', definition: 'The Risk Adjustment Factor (RAF) score is a numerical value assigned to each Medicare Advantage beneficiary that reflects their predicted healthcare costs relative to the average Medicare patient. A RAF score of 1.0 represents an average-cost patient; scores above 1.0 indicate higher expected costs due to documented chronic conditions, and scores below 1.0 indicate lower expected costs. RAF scores are calculated based on demographic factors (age, gender, Medicaid eligibility) and Hierarchical Condition Categories (HCCs) documented through clinical encounters. Accurate RAF scoring is critical for value-based care organizations because it determines capitation payments and influences shared savings calculations. Under-documented RAF scores result in inadequate funding, while properly captured RAF scores ensure organizations receive appropriate resources to manage complex patient populations. AI platforms help organizations identify RAF gaps and ensure year-round recapture of chronic conditions.' },
      { term: 'Transitional Care Management (TCM)', definition: 'Transitional Care Management (TCM) is a CMS-reimbursable program designed to reduce hospital readmissions by ensuring patients receive coordinated follow-up care within 30 days of hospital discharge. TCM requires three key components: an interactive contact with the patient or caregiver within two business days of discharge, a face-to-face visit within 7 or 14 days depending on medical complexity, and ongoing medication reconciliation and care coordination throughout the 30-day period. CMS reimburses TCM at approximately $230\u2013$300 per episode depending on complexity (CPT codes 99495 and 99496). Despite strong reimbursement, most organizations achieve only 30\u201340% contact rates due to manual workflows and staffing constraints. AI-powered platforms like Zynix automate the outreach component of TCM, achieving 85%+ contact rates through autonomous phone, SMS, and patient portal engagement, while routing clinical issues to care teams for follow-up.' },
      { term: 'Population Health Management', definition: 'Population health management (PHM) is the systematic approach to improving health outcomes for a defined group of patients by analyzing aggregated clinical, claims, and social determinants data to identify risks, stratify populations, and deploy targeted interventions. PHM encompasses chronic disease management, preventive care, care transitions, behavioral health integration, and social needs screening. Effective PHM requires a unified data platform that ingests information from EHRs, claims feeds, ADT notifications, labs, pharmacy data, and community resources. Analytics engines then stratify patients by risk level, identify care gaps, predict adverse events such as hospitalizations or ED visits, and generate prioritized worklists for care teams. Modern PHM platforms go beyond analytics by deploying AI agents that automatically execute outreach, schedule appointments, and close gaps without manual intervention, transforming population health from a reporting function into an operational engine.' },
      { term: 'HEDIS Measures', definition: 'HEDIS (Healthcare Effectiveness Data and Information Set) is a standardized set of performance measures developed by the National Committee for Quality Assurance (NCQA) to evaluate health plan performance across clinical quality, access, and patient experience domains. HEDIS includes over 90 measures spanning preventive care (breast cancer screening, colorectal cancer screening), chronic disease management (diabetes A1C control, blood pressure management), behavioral health, medication management, and utilization. Health plans, ACOs, and provider organizations use HEDIS measures to benchmark performance, satisfy regulatory requirements, and qualify for quality-based incentive payments. HEDIS performance directly impacts Medicare Advantage Stars ratings, which determine bonus payments worth billions of dollars annually. Closing HEDIS gaps requires identifying patients who are due for screenings or interventions and ensuring timely completion through outreach, scheduling, and care coordination.' },
      { term: 'Prior Authorization', definition: 'Prior authorization (also called pre-authorization or pre-certification) is a utilization management process in which healthcare providers must obtain approval from a payer before delivering specific services, procedures, or medications. The prior authorization process involves submitting clinical documentation that demonstrates medical necessity according to the payer\u2019s coverage criteria. While intended to control costs and ensure appropriate utilization, prior authorization has become a major administrative burden, with the average physician practice spending 14 hours per week on prior auth activities. Delays in prior authorization contribute to treatment delays, patient dissatisfaction, and revenue cycle disruptions. AI-powered prior authorization solutions like ZynAuth automate the submission, tracking, and follow-up process by extracting clinical data from EHRs, matching it against payer criteria, and submitting requests electronically, reducing turnaround times by up to 60%.' },
      { term: 'Healthcare AI Agent', definition: 'A healthcare AI agent is an autonomous software system that perceives its environment, makes decisions, and takes actions to accomplish specific clinical or operational tasks without requiring continuous human supervision. Unlike chatbots that respond to user queries, AI agents proactively initiate workflows: calling patients for post-discharge follow-up, scheduling appointments, reconciling medications, processing prior authorizations, and closing care gaps. Healthcare AI agents operate within defined clinical protocols and escalation rules, routing complex situations to human care team members while handling routine tasks independently. Modern agent architectures combine large language models (LLMs) for natural language understanding, retrieval-augmented generation (RAG) for clinical knowledge, and workflow engines for multi-step task execution. Zynix deploys seven specialized AI agents that collectively handle patient outreach, scheduling, triage, documentation, reminders, fax processing, and prior authorization across value-based care organizations.' },
      { term: 'Care Gap', definition: 'A care gap is the difference between recommended clinical guidelines and the care a patient actually receives. Care gaps represent missed or overdue preventive screenings, chronic disease management activities, medication adherence checkpoints, or follow-up appointments that are clinically indicated based on a patient\u2019s conditions and risk profile. Common care gaps include overdue mammograms, missed diabetic eye exams, incomplete colorectal cancer screenings, uncontrolled blood pressure, and gaps in HCC recapture documentation. Care gaps directly impact quality measure performance (HEDIS, Stars ratings), risk adjustment accuracy (RAF scores), and financial outcomes in value-based care arrangements. Identifying care gaps requires integrating data from multiple sources including EHRs, claims, labs, and pharmacy records to create a comprehensive view of each patient\u2019s care status. AI platforms prioritize care gaps by clinical urgency and financial impact, then deploy automated outreach to schedule and close gaps efficiently.' },
      { term: 'Ambient Clinical Documentation', definition: 'Ambient clinical documentation (also called ambient AI scribing) is technology that passively listens to patient-clinician conversations during medical encounters and automatically generates structured clinical notes in real time. Unlike traditional dictation or manual documentation, ambient documentation operates in the background without requiring the clinician to change their workflow or speak to a microphone. The AI system uses natural language processing and medical language models to capture the clinical narrative, extract relevant diagnoses, medications, procedures, and assessment plans, and format them into EHR-compatible notes. Ambient documentation addresses the physician burnout crisis by reducing documentation time by 60\u201370%, allowing clinicians to maintain eye contact with patients and focus on clinical care rather than typing. ZynScribe, the Zynix ambient documentation solution, captures structured notes during encounters and integrates directly with major EHR systems including Epic, Cerner, athenahealth, and eClinicalWorks.' },
      { term: 'Risk Stratification', definition: 'Risk stratification is the process of categorizing patients into groups based on their likelihood of experiencing adverse health events such as hospitalization, emergency department visits, disease progression, or high healthcare costs. Risk stratification models analyze clinical data (diagnoses, medications, lab results, vitals), claims data (utilization patterns, cost history), social determinants (housing stability, food security, transportation access), and behavioral factors (medication adherence, appointment attendance) to assign risk scores. Patients are typically categorized as low-risk, rising-risk, or high-risk, with each tier receiving different levels of care management intensity. Accurate risk stratification enables healthcare organizations to allocate limited care management resources efficiently, focusing intensive interventions on the patients most likely to benefit. AI-powered risk stratification goes beyond static scoring by continuously updating risk assessments as new data arrives and triggering automated workflows when patients cross risk thresholds.' },
      { term: 'Annual Wellness Visit (AWV)', definition: 'The Annual Wellness Visit (AWV) is a Medicare-covered preventive care visit focused on developing or updating a personalized prevention plan, performing health risk assessments, screening for cognitive impairment, and reviewing functional ability and safety. Unlike a standard physical exam, the AWV is specifically designed for preventive planning and does not include a head-to-toe examination. AWVs represent a critical touchpoint for value-based care organizations because they provide an opportunity to recapture HCC diagnoses, identify care gaps, update advance directives, screen for depression and fall risk, and assess social determinants of health. Despite being fully covered by Medicare with no patient copay, AWV completion rates remain low, often below 25\u201330% of eligible beneficiaries. AI platforms improve AWV completion by identifying eligible patients, automating scheduling outreach, and pre-populating visit templates with relevant clinical data, enabling organizations to achieve 2\u20133x improvements in AWV completion rates.' },
      { term: 'Social Determinants of Health (SDOH)', definition: 'Social determinants of health (SDOH) are the non-medical factors that influence health outcomes, including economic stability (income, employment, debt), education access and quality, healthcare access, neighborhood and built environment (housing, transportation, food access, safety), and social and community context (social support, discrimination, incarceration history). Research shows that SDOH account for 30\u201355% of health outcomes, often exceeding the impact of clinical care itself. In value-based care, SDOH data is essential for accurate risk stratification, care plan development, and intervention targeting. CMS now requires SDOH screening in many quality programs, and Z-codes (ICD-10 codes for social determinants) are increasingly used to document housing instability, food insecurity, transportation barriers, and other social needs. Modern healthcare AI platforms ingest SDOH data from screening tools, community databases, and claims data to identify patients whose social circumstances may undermine clinical interventions, enabling care teams to connect patients with community resources and social services.' },
      { term: 'Chronic Care Management (CCM)', definition: 'Chronic Care Management (CCM) is a CMS-reimbursable program that provides ongoing care coordination and management for Medicare beneficiaries with two or more chronic conditions expected to last at least 12 months. CCM services include development and revision of comprehensive care plans, medication management, coordination between providers and specialists, 24/7 access to care management services, and enhanced communication through patient portals or phone. CMS reimburses CCM through CPT codes 99490 (20+ minutes per month), 99439 (each additional 20 minutes), and 99491 (clinical staff time). CCM represents a significant revenue opportunity for value-based care organizations while improving outcomes for patients with complex chronic conditions such as diabetes, heart failure, COPD, and chronic kidney disease. AI platforms automate CCM enrollment identification, patient consent collection, monthly touchpoints, care plan updates, and time tracking, allowing organizations to scale CCM programs across large populations without proportional staffing increases.' },
      { term: 'Medicare Shared Savings Program (MSSP)', definition: 'The Medicare Shared Savings Program (MSSP) is CMS\u2019s flagship accountable care organization program, in which groups of doctors, hospitals, and other healthcare providers voluntarily coordinate care for Medicare fee-for-service beneficiaries. MSSP ACOs that meet quality benchmarks and reduce total cost of care below a spending benchmark earn a share of the savings (typically 40\u201375% depending on the track). Two-sided risk tracks also require ACOs to repay a portion of losses if spending exceeds benchmarks. MSSP quality measures span four domains: patient experience, care coordination, preventive health, and at-risk populations. As of 2026, over 480 ACOs participate in MSSP, covering more than 11 million Medicare beneficiaries. Success in MSSP requires sophisticated data analytics, population health management, care gap closure, transitional care coordination, and efficient administrative operations. AI platforms help MSSP ACOs optimize performance by automating quality measure tracking, HCC gap closure, TCM workflows, and patient outreach at scale across attributed populations.' },
      { term: 'HL7 / FHIR', definition: 'HL7 (Health Level Seven) is the international standards organization that develops frameworks for the exchange, integration, sharing, and retrieval of electronic health information. FHIR (Fast Healthcare Interoperability Resources) is HL7\u2019s modern standard for exchanging healthcare data electronically, using RESTful APIs, JSON, and XML formats that are familiar to web developers. FHIR defines standardized resources for clinical concepts such as patients, encounters, observations, medications, and conditions, enabling healthcare applications to read and write data across different EHR systems. CMS mandates FHIR-based APIs for patient access and payer-to-payer data exchange, making FHIR proficiency essential for healthcare technology platforms. FHIR enables interoperability between EHRs, health plans, labs, pharmacies, and third-party applications without requiring custom point-to-point integrations. Healthcare AI platforms leverage FHIR APIs to ingest clinical data from multiple EHR systems, enabling unified population health management across diverse provider networks.' },
      { term: 'ADT (Admit-Discharge-Transfer) Feed', definition: 'An ADT (Admit-Discharge-Transfer) feed is a real-time or near-real-time electronic notification that alerts care teams when a patient is admitted to a hospital, discharged, or transferred between care settings. ADT feeds use the HL7 messaging standard (typically ADT^A01, ADT^A03, ADT^A02 message types) and are transmitted through Health Information Exchanges (HIEs) or direct EHR interfaces. ADT notifications are critical for value-based care because they trigger time-sensitive workflows such as transitional care management (TCM), post-discharge follow-up, medication reconciliation, and readmission prevention. CMS requires Medicare Advantage plans and ACOs to receive and act upon ADT notifications. AI platforms process ADT feeds in real time to automatically initiate care coordination workflows within minutes of a discharge event, ensuring that patients receive timely follow-up and organizations capture TCM reimbursement within CMS-mandated timeframes.' },
      { term: 'Revenue Cycle Management (RCM)', definition: 'Revenue Cycle Management (RCM) encompasses the financial processes healthcare organizations use to track patient care episodes from registration and appointment scheduling through final payment. RCM includes patient registration, insurance verification, charge capture, claims submission, payment posting, denial management, and patient collections. In value-based care, RCM extends to managing shared savings calculations, quality-based incentive payments, risk adjustment revenue, and care management billing codes such as TCM, CCM, and AWV. Healthcare organizations lose an estimated 5\u201310% of net revenue due to RCM inefficiencies including coding errors, claim denials, and delayed submissions. AI is transforming RCM by automating prior authorization, improving coding accuracy through natural language processing of clinical documentation, predicting claim denials before submission, and optimizing charge capture for value-based billing codes.' },
      { term: 'Clinical Decision Support (CDS)', definition: 'Clinical Decision Support (CDS) systems provide clinicians, staff, and patients with knowledge and person-specific information at the point of care to enhance health and healthcare decisions. CDS tools include computerized alerts for drug interactions, clinical guidelines presented during documentation, risk calculators, diagnostic suggestions based on patient data, and evidence-based order sets. Modern AI-powered CDS goes beyond rule-based alerts to offer predictive insights such as readmission risk scores, medication adherence predictions, and personalized treatment recommendations generated by machine learning models trained on population health data. Effective CDS improves clinical quality, reduces unnecessary utilization, and helps organizations meet value-based care quality benchmarks. The CMS Promoting Interoperability program incentivizes CDS adoption, and accreditation organizations increasingly evaluate CDS implementation as part of quality assessments.' },
      { term: 'Health Information Exchange (HIE)', definition: 'A Health Information Exchange (HIE) is both the electronic movement of health-related information among organizations and the entities that facilitate that exchange. HIEs enable hospitals, clinics, labs, pharmacies, health plans, and public health agencies to share patient data securely and efficiently, regardless of which EHR system each organization uses. HIEs provide three key capabilities: directed exchange (secure point-to-point messaging), query-based exchange (finding and requesting patient records), and consumer-mediated exchange (patient-controlled access). In value-based care, HIEs are essential for receiving ADT notifications, aggregating clinical data from multiple providers, and coordinating care across settings. National frameworks such as TEFCA (Trusted Exchange Framework and Common Agreement) aim to create a nationwide interoperability infrastructure. AI platforms integrate with HIEs to aggregate comprehensive patient records and trigger automated workflows based on clinical events detected across the healthcare ecosystem.' },
      { term: 'Stars Ratings (Medicare Advantage)', definition: 'The CMS Star Ratings system evaluates Medicare Advantage and Part D prescription drug plans on a scale of 1 to 5 stars based on quality and performance measures across five categories: staying healthy (preventive screenings), managing chronic conditions, member experience, member complaints and access, and health plan customer service. Plans achieving 4+ stars qualify for quality bonus payments that can represent hundreds of millions of dollars annually, making Stars optimization a top strategic priority. Stars measures include HEDIS clinical quality metrics, CAHPS patient experience surveys, pharmacy measures, and operational metrics such as appeals processing timeliness. Improving Stars ratings requires coordinated efforts across clinical quality (closing care gaps), member engagement (improving CAHPS scores), medication management (adherence and therapy optimization), and operational efficiency. AI platforms help health plans improve Stars ratings by automating member outreach for preventive screenings, medication adherence programs, and care gap closure at scale.' }
    ];
    var html = renderInnerHero('GLOSSARY', 'Healthcare AI Glossary',
      'Comprehensive glossary of healthcare AI, value-based care, interoperability, coding, claims, quality, and compliance terminology. ' + terms.length + ' terms defined.',
      null, '') +
      '<section class="zynix-glossary-detail" style="padding:60px 0"><div class="zynix-container">' +
      '<div class="zynix-glossary-nav" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:40px;justify-content:center">';
    terms.forEach(function(t, i) {
      html += '<a href="#glossary-' + i + '" style="padding:6px 14px;background:var(--z-blue-light);border-radius:20px;font-size:13px;color:var(--z-primary);text-decoration:none;font-weight:500">' + t.term + '</a>';
    });
    html += '</div>';
    terms.forEach(function(t, i) {
      html += '<div class="zynix-definition-box fade-in-up" id="glossary-' + i + '" style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:32px;margin-bottom:24px">' +
        '<h2 style="font-size:22px;font-weight:700;color:var(--z-text);margin:0 0 16px">' + t.term + '</h2>' +
        '<p style="font-size:16px;line-height:1.8;color:var(--z-text-secondary);margin:0">' + t.definition + '</p>' +
        '</div>';
    });
    html += '</div></section>';
    return html +
      renderCTA('Have Questions About Healthcare AI?', 'Our team can help you understand how AI fits into your operations.', 'Contact Us') +
      renderFooter();
  }

  function renderWebinars() {
    return renderInnerHero('WEBINARS & EVENTS', 'Learn from Healthcare AI Leaders',
      'Upcoming webinars, events, and on-demand content from the Zynix team.',
      null, '') +
    '<section class="zynix-section"><div class="zynix-container">' +
    '<h2 class="zynix-section-title">Upcoming Events</h2>' +
    '<div class="zynix-feature-grid" style="grid-template-columns:1fr">' +
    '<div class="zynix-feature-card" style="border:2px solid var(--z-blue);position:relative;overflow:hidden">' +
    '<span class="zynix-tag" style="margin-bottom:16px">LIVE WEBINAR + VBC EXHIBIT HALL</span>' +
    '<h3 style="font-size:24px;margin-bottom:12px">Automation with Accountability: How ACOs Can Scale Patient Engagement Without Burning Out Teams</h3>' +
    '<div style="display:flex;gap:24px;flex-wrap:wrap;margin:16px 0 20px">' +
    '<div style="display:flex;align-items:center;gap:8px;color:var(--z-text-secondary)"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> Thu, Mar 19, 2026</div>' +
    '<div style="display:flex;align-items:center;gap:8px;color:var(--z-text-secondary)"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> 10:00 AM \u2013 11:00 AM PDT</div>' +
    '</div>' +
    '<p style="font-size:16px;line-height:1.7;color:var(--z-text-secondary);margin-bottom:24px">Join Zynix AI at the VBC Exhibit Hall to explore how AI-powered automation is helping ACOs scale patient engagement  - from post-discharge follow-ups to preventive screenings  - without adding staff burnout. Learn real strategies for balancing accountability and efficiency in value-based care.</p>' +
    '<a href="https://register.gotowebinar.com/register/6452881364816065371?source=Newsletter" class="zynix-btn-primary" target="_blank" rel="noopener">Register Now &rarr;</a>' +
    '</div></div>' +
    '</div></section>' +
    '<section class="zynix-section" style="background:var(--z-blue-light)">' +
    '<div class="zynix-container" style="text-align:center;max-width:800px">' +
    '<span class="zynix-tag">ACCESS & EMR CONNECTIVITY</span>' +
    '<h2 class="zynix-section-title">Zynix AI is Participating in ACCESS</h2>' +
    '<p class="zynix-section-sub" style="font-size:18px;line-height:1.7">Zynix AI is connected to all major EMRs and participating in ACCESS. If your organization wants to sign up for AI-powered care coordination, outbound patient engagement, or clinical documentation  - we can connect directly to your existing systems.</p>' +
    '<p style="font-size:16px;color:var(--z-text-secondary);margin-top:16px">Connected EMRs: Epic \u2022 Cerner \u2022 athenahealth \u2022 eClinicalWorks \u2022 NextGen \u2022 Greenway \u2022 Allscripts \u2022 DrChrono</p>' +
    '<a href="/contact" class="zynix-btn-primary" style="margin-top:24px">Connect Your Organization &rarr;</a>' +
    '</div></section>' +
    renderCTA('Ready to See AI in Action?', 'Schedule a live demo and see how Zynix transforms care coordination.', 'Request a Demo') +
    renderFooter();
  }

  function renderWhitepapers() {
    return renderPlaceholderPage('WHITEPAPERS & REPORTS', 'Research & Insights',
      'In-depth analysis on healthcare AI, value-based care, and operational transformation.');
  }

  // ── PAGE: Homepage ──
  function renderHomepage() {
    // -- HERO --
    var html = '<section class="zynix-homepage-hero"><div class="zynix-container zynix-inner-hero-grid">' +
      '<div class="zynix-inner-hero-text">' +
      '<span class="zynix-tag">AI-POWERED VALUE-BASED CARE PLATFORM</span>' +
      '<h1>Close Care Gaps Faster.<br>Grow Your Shared Savings.</h1>' +
      '<p>Zynix unifies your clinical data, deploys AI agents, and automates outreach -so your team can focus on patients, not paperwork.</p>' +
      '<div class="zynix-hero-btns"><a href="' + CALENDLY + '" class="zynix-btn-primary" target="_blank">Request a Demo &rarr;</a><a href="#how-it-works" class="zynix-btn-secondary">See How It Works</a></div>' +
      '<div class="zynix-hero-trust">' +
      '<span class="zynix-hero-badge">&#128737; HIPAA Compliant</span>' +
      '<span class="zynix-hero-badge">&#128274; SOC 2 Type II</span>' +
      '<span class="zynix-hero-badge">&#9989; HITRUST Ready</span>' +
      '</div>' +
      '</div>' +
      '<div class="zynix-inner-hero-img"><img src="' + IMG.gifDashboard + '" alt="Zynix AI Healthcare Dashboard"></div>' +
      '</div></section>';

    // -- AEO SUMMARY BLOCK --
    html += '<div class="zynix-container"><div class="zynix-summary-block"><strong>Zynix AI</strong> is a healthcare AI operating system that unifies clinical data, deploys autonomous AI agents, and automates care coordination for value-based care organizations including ACOs, health systems, health plans, and FQHCs. Over 1 million VBC patients have been onboarded across 30 states, with measurable outcomes including 85%+ TCM contact rates, 40% improvement in gap closure, and 2-3x AWV scheduling lift.</div></div>';

    // -- CUSTOMER TRUST STRIP --
    var trustOrgs = ['Palm Beach ACO','West Florida ACO','Space Coast ACO','Central Florida ACO',
      'Assurity ACO REACH','Advanced ACO &amp; Affiliates','IncentiveCare IPA','eTernal Health',
      'Cardio &amp; Vascular Consultants','AMISTAD CHC','Health Vision Institute','CLSCFL',
      'Professional Radiology Group','Value Services Management','Sun Flower ACO','Pain Rehab Surgery Center'];
    var trustSpans = '';
    for (var ti = 0; ti < 2; ti++) {
      for (var tj = 0; tj < trustOrgs.length; tj++) {
        trustSpans += '<span>' + trustOrgs[tj] + '</span>';
      }
    }
    html += '<section class="zynix-trust-strip"><div class="zynix-container">' +
      '<p class="zynix-trust-label">TRUSTED BY 1M+ VBC PATIENTS &middot; ACOs &middot; HEALTH PLANS &middot; HEALTH SYSTEMS &middot; FQHCs &middot; PRACTICES</p>' +
      '<div class="zynix-trust-marquee"><div class="zynix-trust-track">' +
      trustSpans +
      '</div></div></div></section>';

    // -- CRISIS STATS --
    html += '<section class="zynix-crisis-section"><div class="zynix-container">' +
      '<span class="zynix-tag">THE CRISIS</span>' +
      '<h2>Healthcare Has a Doing Problem, Not a Knowing Problem</h2>' +
      '<p class="zynix-section-sub">Every organization has invested millions in analytics. The problem isn\u2019t knowing who needs care -it\u2019s delivering that care at scale.</p>' +
      '<div class="zynix-metrics-bar">' +
      '<div class="zynix-metric fade-in-up"><span class="zynix-metric-value">$285\u2013570B</span><span class="zynix-metric-label">Wasted annually on admin overhead</span></div>' +
      '<div class="zynix-metric fade-in-up"><span class="zynix-metric-value">97%</span><span class="zynix-metric-label">Of healthcare data goes unused</span></div>' +
      '<div class="zynix-metric fade-in-up"><span class="zynix-metric-value">67%</span><span class="zynix-metric-label">After-hours calls abandoned</span></div>' +
      '<div class="zynix-metric fade-in-up"><span class="zynix-metric-value">30%</span><span class="zynix-metric-label">ER visits are avoidable</span></div>' +
      '</div></div></section>';

    // -- HOW IT WORKS (4-Layer Architecture) --
    html += '<section class="zynix-architecture-section" id="how-it-works"><div class="zynix-container">' +
      '<span class="zynix-tag">HOW IT WORKS</span>' +
      '<h2>Four Layers. One Operating System.</h2>' +
      '<p class="zynix-section-sub">While competitors sell point solutions, Zynix delivers an integrated OS where AI agents work together like a coordinated workforce.</p>' +
      '<div class="zynix-arch-grid">' +
      '<div class="zynix-arch-card fade-in-up" style="border-left:4px solid #ccfdcf"><div class="zynix-arch-num">01</div><h3>AI Data Foundation</h3><p>Ingest, clean, and normalize data from every source -EHRs, claims, ADT, labs, pharmacy, SDOH -into one unified layer.</p></div>' +
      '<div class="zynix-arch-card fade-in-up" style="border-left:4px solid #cebffa"><div class="zynix-arch-num">02</div><h3>Intelligence &amp; Reasoning</h3><p>Predict, prioritize, and surface actionable insights -risk scores, gap worklists, clinical decision support.</p></div>' +
      '<div class="zynix-arch-card fade-in-up" style="border-left:4px solid #fddbc8"><div class="zynix-arch-num">03</div><h3>AI Agent Suite</h3><p>Specialized agents that take action: outreach, scheduling, triage, documentation, reminders, and follow-up.</p></div>' +
      '<div class="zynix-arch-card fade-in-up" style="border-left:4px solid #d7e9ff"><div class="zynix-arch-num">04</div><h3>Care Management</h3><p>Orchestrated workflows where agents collaborate on end-to-end care plans -TCM, AWV, gap closure, and more.</p></div>' +
      '</div></div></section>';

    // -- THE ZYNIX WAY (Point Solutions vs OS) --
    html += '<section class="zynix-comparison-section"><div class="zynix-container">' +
      '<span class="zynix-tag">THE ZYNIX DIFFERENCE</span>' +
      '<h2>Point Solutions vs. an Operating System</h2>' +
      '<div class="zynix-comparison-grid">' +
      '<div class="zynix-comparison-col zynix-comparison-before fade-in-up">' +
      '<h3>&#9888; Fragmented World</h3>' +
      '<ul>' +
      '<li>Analytics flags a high-risk patient (but does nothing)</li>' +
      '<li>Care management adds them to a worklist (already too long)</li>' +
      '<li>Call center tries to reach them (voicemail 70% of the time)</li>' +
      '<li>EHR tracks the missed follow-up (but can\u2019t fix it)</li>' +
      '<li>Revenue team misses the TCM billing window</li>' +
      '</ul></div>' +
      '<div class="zynix-comparison-col zynix-comparison-after fade-in-up">' +
      '<h3>&#10003; The Zynix Way</h3>' +
      '<ul>' +
      '<li><strong>Minute 0:</strong> ADT feed hits Zynix Data Platform</li>' +
      '<li><strong>Minute 1:</strong> Intelligence Engine: High-risk, 82nd percentile</li>' +
      '<li><strong>Minute 2:</strong> TCM care plan auto-deployed</li>' +
      '<li><strong>Hour 2:</strong> AI agent calls patient, confirms safe arrival</li>' +
      '<li><strong>Day 7:</strong> Follow-up attended. TCM billed. Revenue captured.</li>' +
      '<li><strong>Day 30:</strong> Patient did NOT readmit. Savings preserved.</li>' +
      '</ul></div>' +
      '</div></div></section>';

    // -- PRODUCT SUITE --
    html += '<section class="zynix-products-overview"><div class="zynix-container">' +
      '<span class="zynix-tag">PRODUCT SUITE</span>' +
      '<h2>Everything You Need. Nothing You Don\u2019t.</h2>' +
      '<div class="zynix-feature-grid">' +
      '<div class="zynix-feature-card fade-in-up"><div class="zynix-feature-icon">&#128450;</div><h3>Data Platform</h3><p>Unified healthcare data layer that ingests, cleans, and normalizes data from every clinical and administrative source.</p><a href="/products-data-platform" class="zynix-card-link">Learn more &rarr;</a></div>' +
      '<div class="zynix-feature-card fade-in-up"><div class="zynix-feature-icon">&#128200;</div><h3>Analytics</h3><p>Population health analytics, predictive modeling, and real-time decision support. ZynGap, ZynPredict, ZynGuide.</p><a href="/products-analytics" class="zynix-card-link">Learn more &rarr;</a></div>' +
      '<div class="zynix-feature-card fade-in-up"><div class="zynix-feature-icon">&#129302;</div><h3>AI Agents</h3><p>Seven specialized agents for outreach, scheduling, triage, documentation, reminders, prior auth, and fax processing.</p><a href="/products-ai-agents" class="zynix-card-link">Learn more &rarr;</a></div>' +
      '<div class="zynix-feature-card fade-in-up"><div class="zynix-feature-icon">&#128196;</div><h3>ZynScribe</h3><p>Ambient AI documentation that captures structured clinical notes in real-time during patient encounters.</p><a href="/products-zynscribe" class="zynix-card-link">Learn more &rarr;</a></div>' +
      '<div class="zynix-feature-card fade-in-up"><div class="zynix-feature-icon">&#128203;</div><h3>Care Plans</h3><p>Deployable, orchestrated care plans for TCM, CCM, AWV, HEDIS, and HCC closure -executed by AI agents.</p><a href="/products-care-plans" class="zynix-card-link">Learn more &rarr;</a></div>' +
      '<div class="zynix-feature-card fade-in-up"><div class="zynix-feature-icon">&#129504;</div><h3>ZynixLLM</h3><p>Purpose-built healthcare language model that powers the entire platform. Gets smarter with every patient interaction.</p><a href="/company-zynixllm" class="zynix-card-link">Learn more &rarr;</a></div>' +
      '</div></div></section>';

    // -- PLATFORM SCREENSHOTS --
    html += '<section class="zynix-screenshot-section"><div class="zynix-container">' +
      '<span class="zynix-tag">INSIDE THE PLATFORM</span>' +
      '<h2>See What You Get on Day One</h2>' +
      '<p class="zynix-section-sub">Real product screenshots from live deployments across healthcare organizations in 30 states.</p>' +
      '<div class="zynix-screenshot-gallery">' +
      '<div class="zynix-screenshot-card fade-in-up"><img src="' + IMG.portalACO + '" alt="ACO Dashboard" loading="lazy"><div class="caption">ACO Performance Dashboard</div></div>' +
      '<div class="zynix-screenshot-card fade-in-up"><img src="' + IMG.portalProvider + '" alt="Provider View" loading="lazy"><div class="caption">Clinical Quality Metrics</div></div>' +
      '<div class="zynix-screenshot-card fade-in-up"><img src="' + IMG.portalPredictive + '" alt="Predictive Analytics" loading="lazy"><div class="caption">Predictive Analytics Engine</div></div>' +
      '<div class="zynix-screenshot-card fade-in-up"><img src="' + IMG.portalChatbot + '" alt="AI Chatbot" loading="lazy"><div class="caption">AI Patient Chatbot</div></div>' +
      '<div class="zynix-screenshot-card fade-in-up"><img src="' + IMG.portalQuality + '" alt="Quality Measures" loading="lazy"><div class="caption">Quality Measures Tracker</div></div>' +
      '<div class="zynix-screenshot-card fade-in-up"><img src="' + IMG.portalACORisk + '" alt="Risk Stratification" loading="lazy"><div class="caption">Risk Stratification Engine</div></div>' +
      '</div></div></section>';

    // -- PROOF POINTS --
    html += '<section class="zynix-results-section"><div class="zynix-container">' +
      '<span class="zynix-tag">RESULTS</span>' +
      '<h2>Measurable Outcomes From Day One</h2>' +
      '<div class="zynix-metrics-bar">' +
      '<div class="zynix-metric fade-in-up"><span class="zynix-metric-value">1M+</span><span class="zynix-metric-label">VBC Patients Onboarded</span></div>' +
      '<div class="zynix-metric fade-in-up"><span class="zynix-metric-value">85%+</span><span class="zynix-metric-label">TCM contact rate (vs. 30\u201340% industry avg)</span></div>' +
      '<div class="zynix-metric fade-in-up"><span class="zynix-metric-value">40%</span><span class="zynix-metric-label">Improvement in HCC gap closure</span></div>' +
      '<div class="zynix-metric fade-in-up"><span class="zynix-metric-value">2\u20133x</span><span class="zynix-metric-label">AWV scheduling lift</span></div>' +
      '<div class="zynix-metric fade-in-up"><span class="zynix-metric-value">60%+</span><span class="zynix-metric-label">Reduction in admin tasks</span></div>' +
      '</div></div></section>';

    // -- TESTIMONIALS --
    html += '<section class="zynix-testimonials-section"><div class="zynix-container">' +
      '<span class="zynix-tag">WHAT OUR CLIENTS SAY</span>' +
      '<h2>Trusted by Healthcare Leaders</h2>' +
      '<div class="zynix-testimonials-grid">' +
      '<div class="zynix-testimonial-card fade-in-up">' +
      '<div class="zynix-testimonial-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>' +
      '<p class="zynix-testimonial-quote">&ldquo;Zynix transformed our TCM workflow overnight. We went from a 32% contact rate to over 85% within the first quarter. The AI agents handle the outreach while our nurses focus on clinical care.&rdquo;</p>' +
      '<div class="zynix-testimonial-author"><strong>David Klebonis</strong><span>COO, Palm Beach ACO</span></div></div>' +
      '<div class="zynix-testimonial-card fade-in-up">' +
      '<div class="zynix-testimonial-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>' +
      '<p class="zynix-testimonial-quote">&ldquo;We evaluated six VBC platforms. Zynix was the only one that could ingest our data, deploy agents, and show ROI within 30 days. It\u2019s not a dashboard\u2014it\u2019s an operating system.&rdquo;</p>' +
      '<div class="zynix-testimonial-author"><strong>Ronda Mill</strong><span>Senior Care Manager, West Florida ACO</span></div></div>' +
      '<div class="zynix-testimonial-card fade-in-up">' +
      '<div class="zynix-testimonial-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>' +
      '<p class="zynix-testimonial-quote">&ldquo;The multilingual AI agents were a game-changer for our FQHC. Our Spanish-speaking patients finally get the follow-up calls they deserve\u2014on time, every time.&rdquo;</p>' +
      '<div class="zynix-testimonial-author"><strong>Ganesh Karra</strong><span>Systems Engineer, AMISTAD CHC</span></div></div>' +
      '</div></div></section>';

    // -- ROI CALCULATOR --
    html += '<section class="zynix-roi-section" id="roi-calculator"><div class="zynix-container">' +
      '<span class="zynix-tag">ROI CALCULATOR</span>' +
      '<h2>Calculate Your Value-Based Care Savings</h2>' +
      '<p class="zynix-section-sub">See how much Zynix can save your organization annually. Adjust the sliders to match your scale.</p>' +
      '<div class="zynix-roi-calculator fade-in-up">' +
      '<div class="zynix-roi-inputs">' +
        '<div class="zynix-roi-input-group">' +
          '<label>Total Attributed Lives</label>' +
          '<input type="range" min="1000" max="500000" value="50000" step="1000" class="zynix-roi-slider" id="roi-lives">' +
          '<div class="zynix-roi-value" id="roi-lives-val">50,000</div>' +
        '</div>' +
        '<div class="zynix-roi-input-group">' +
          '<label>Monthly Discharges</label>' +
          '<input type="range" min="50" max="5000" value="500" step="50" class="zynix-roi-slider" id="roi-discharges">' +
          '<div class="zynix-roi-value" id="roi-discharges-val">500</div>' +
        '</div>' +
        '<div class="zynix-roi-input-group">' +
          '<label>Current TCM Contact Rate</label>' +
          '<input type="range" min="10" max="80" value="35" step="5" class="zynix-roi-slider" id="roi-tcm">' +
          '<div class="zynix-roi-value" id="roi-tcm-val">35%</div>' +
        '</div>' +
        '<div class="zynix-roi-input-group">' +
          '<label>Open Care Gaps (HCC/HEDIS)</label>' +
          '<input type="range" min="500" max="100000" value="10000" step="500" class="zynix-roi-slider" id="roi-gaps">' +
          '<div class="zynix-roi-value" id="roi-gaps-val">10,000</div>' +
        '</div>' +
      '</div>' +
      '<div class="zynix-roi-results">' +
        '<h3>Projected Annual Impact</h3>' +
        '<div class="zynix-roi-result-grid">' +
          '<div class="zynix-roi-result"><span class="zynix-roi-number" id="roi-savings">$2.4M</span><span class="zynix-roi-label">Estimated Annual Savings</span></div>' +
          '<div class="zynix-roi-result"><span class="zynix-roi-number" id="roi-tcm-lift">+50%</span><span class="zynix-roi-label">TCM Contact Rate Lift</span></div>' +
          '<div class="zynix-roi-result"><span class="zynix-roi-number" id="roi-gaps-closed">4,000</span><span class="zynix-roi-label">Additional Gaps Closed</span></div>' +
          '<div class="zynix-roi-result"><span class="zynix-roi-number" id="roi-readmit">-23%</span><span class="zynix-roi-label">Readmission Reduction</span></div>' +
        '</div>' +
        '<a href="' + CALENDLY + '" class="zynix-btn-primary" target="_blank" style="margin-top:24px">Get Your Custom ROI Report &rarr;</a>' +
      '</div>' +
      '</div></div></section>';

    // -- SOLUTIONS BY SEGMENT --
    html += '<section class="zynix-solutions-section"><div class="zynix-container">' +
      '<span class="zynix-tag">WHO WE SERVE</span>' +
      '<h2>Purpose-Built for Value-Based Healthcare</h2>' +
      '<p class="zynix-section-sub">Zynix serves organizations responsible for outcomes, cost, quality, and operations.</p>' +
      '<div class="zynix-feature-grid">' +
      '<div class="zynix-feature-card fade-in-up"><h3>ACOs &amp; MSOs</h3><p>TCM execution, AWV completion, shared savings optimization, and quality performance.</p><a href="/solutions-acos" class="zynix-card-link">ACO Solutions &rarr;</a></div>' +
      '<div class="zynix-feature-card fade-in-up"><h3>Health Systems</h3><p>Readmission reduction, unified patient engagement, post-discharge coordination at scale.</p><a href="/solutions-health-systems" class="zynix-card-link">Health System Solutions &rarr;</a></div>' +
      '<div class="zynix-feature-card fade-in-up"><h3>Health Plans</h3><p>Stars ratings improvement, HCC gap closure, member engagement, avoidable ER reduction.</p><a href="/solutions-health-plans" class="zynix-card-link">Health Plan Solutions &rarr;</a></div>' +
      '<div class="zynix-feature-card fade-in-up"><h3>FQHCs</h3><p>Multilingual AI for underserved populations, quality payments maximization, care management at scale.</p><a href="/solutions-fqhcs" class="zynix-card-link">FQHC Solutions &rarr;</a></div>' +
      '<div class="zynix-feature-card fade-in-up"><h3>Independent Practices</h3><p>No-show reduction, after-hours coverage, appointment scheduling, documentation time savings.</p><a href="/solutions-independent-practices" class="zynix-card-link">Practice Solutions &rarr;</a></div>' +
      '<div class="zynix-feature-card fade-in-up"><h3>ASCs</h3><p>Prior authorization automation, surgical cancellation reduction, pre-op/post-op coordination.</p><a href="/solutions-ascs" class="zynix-card-link">ASC Solutions &rarr;</a></div>' +
      '</div></div></section>';

    // -- DATA FLYWHEEL --
    html += '<section class="zynix-flywheel-section"><div class="zynix-container">' +
      '<span class="zynix-tag">THE DATA FLYWHEEL</span>' +
      '<h2>Every Interaction Makes Zynix Smarter</h2>' +
      '<p class="zynix-section-sub">Unlike competitors renting intelligence from third-party LLMs, ZynixLLM is purpose-built for healthcare and improves with every patient interaction.</p>' +
      '<div class="zynix-flywheel-grid fade-in-up">' +
      '<div class="zynix-flywheel-step"><span>1</span><h4>More Calls</h4><p>Better conversation models</p></div>' +
      '<div class="zynix-flywheel-arrow">&rarr;</div>' +
      '<div class="zynix-flywheel-step"><span>2</span><h4>More Triage</h4><p>Better clinical reasoning</p></div>' +
      '<div class="zynix-flywheel-arrow">&rarr;</div>' +
      '<div class="zynix-flywheel-step"><span>3</span><h4>More Documentation</h4><p>Better ambient scribe</p></div>' +
      '<div class="zynix-flywheel-arrow">&rarr;</div>' +
      '<div class="zynix-flywheel-step"><span>4</span><h4>More Outcomes</h4><p>Better risk prediction</p></div>' +
      '<div class="zynix-flywheel-arrow zynix-flywheel-loop">&#x21BA;</div>' +
      '</div></div></section>';

    // -- HOMEPAGE FAQ (AEO) --
    html += '<section class="zynix-page-faq"><div class="zynix-container">' +
      '<span class="zynix-tag">FREQUENTLY ASKED QUESTIONS</span>' +
      '<h2>Common Questions About Zynix AI</h2>' +
      '<div class="zynix-faq-list">' +
      '<div class="zynix-faq-item"><div class="zynix-faq-q">What is Zynix AI?<span class="zynix-faq-toggle">+</span></div><div class="zynix-faq-a"><p>Zynix AI is a healthcare AI operating system purpose-built for value-based care. It unifies clinical data from EHRs, claims, ADT feeds, labs, and SDOH sources into a single platform, then deploys seven specialized AI agents to automate patient outreach, appointment scheduling, after-hours triage, clinical documentation, medication reconciliation, prior authorization, and fax processing. Over 1 million value-based care patients have been onboarded across 30 states.</p></div></div>' +
      '<div class="zynix-faq-item"><div class="zynix-faq-q">How does Zynix AI work?<span class="zynix-faq-toggle">+</span></div><div class="zynix-faq-a"><p>Zynix operates in four layers: (1) The Data Platform ingests and normalizes data from every clinical source. (2) The Analytics Engine predicts risk, identifies gaps, and prioritizes worklists. (3) Seven AI Agents take autonomous action \u2014 calling patients, scheduling appointments, processing authorizations. (4) Care Plans orchestrate these agents into end-to-end workflows for TCM, CCM, AWV, and gap closure. The platform gets smarter with every patient interaction through ZynixLLM, a purpose-built healthcare language model.</p></div></div>' +
      '<div class="zynix-faq-item"><div class="zynix-faq-q">Who uses Zynix AI?<span class="zynix-faq-toggle">+</span></div><div class="zynix-faq-a"><p>Zynix serves ACOs and MSOs, health systems, health plans, FQHCs, independent medical practices, and ambulatory surgery centers (ASCs). Our platform is used by organizations like Palm Beach ACO, West Florida ACO, Space Coast ACO, eTernal Health, AMISTAD CHC, Cardio &amp; Vascular Consultants, and 16+ healthcare organizations across 30 states.</p></div></div>' +
      '<div class="zynix-faq-item"><div class="zynix-faq-q">What results does Zynix deliver?<span class="zynix-faq-toggle">+</span></div><div class="zynix-faq-a"><p>Organizations using Zynix see measurable outcomes: 85%+ TCM contact rates (vs. 30-40% industry average), 40% improvement in HCC gap closure, 2-3x AWV scheduling lift, 40% reduction in no-shows, 97.3% after-hours triage accuracy, 60% faster prior authorization turnaround, and 70% reduction in documentation burden. Most organizations see positive ROI within 8-12 weeks of deployment.</p></div></div>' +
      '<div class="zynix-faq-item"><div class="zynix-faq-q">Is Zynix HIPAA compliant?<span class="zynix-faq-toggle">+</span></div><div class="zynix-faq-a"><p>Yes. Zynix AI is HIPAA compliant, SOC 2 Type II certified, and HITRUST CSF ready. All patient data is encrypted at rest and in transit. The platform undergoes regular third-party security audits and maintains strict access controls, audit logging, and data governance policies. Zynix is also GDPR compliant for international operations.</p></div></div>' +
      '<div class="zynix-faq-item"><div class="zynix-faq-q">How long does it take to implement Zynix?<span class="zynix-faq-toggle">+</span></div><div class="zynix-faq-a"><p>Zynix can be deployed in as little as 4-6 weeks for standard implementations. The Data Platform connects to your existing EHR and data sources through pre-built integrations. AI agents can be activated individually or as a suite. Most organizations start with one or two use cases (like TCM or after-hours triage) and expand from there.</p></div></div>' +
      '<div class="zynix-faq-item"><div class="zynix-faq-q">How is Zynix different from other healthcare AI companies?<span class="zynix-faq-toggle">+</span></div><div class="zynix-faq-a"><p>Most healthcare AI companies sell point solutions \u2014 a scheduling tool here, an analytics dashboard there. Zynix is an integrated operating system where data, intelligence, and AI agents work together. Our agents don\u2019t just surface insights; they take action. And because ZynixLLM is purpose-built for healthcare (not a general-purpose model), it has lower hallucination rates and deeper clinical understanding than competitors using third-party LLMs.</p></div></div>' +
      '</div></div></section>';

    // -- HOMEPAGE FAQ --
    html += '<section class="zynix-faq-section" id="faq"><div class="zynix-container">' +
      '<span class="zynix-tag">FREQUENTLY ASKED QUESTIONS</span>' +
      '<h2>Common Questions About AI for Value-Based Care</h2>' +
      '<div class="zynix-faq-list">' +

      '<div class="zynix-faq-item"><button class="zynix-faq-q" aria-expanded="false">What is value-based care AI?</button>' +
      '<div class="zynix-faq-a"><p>Value-based care AI refers to artificial intelligence systems specifically designed to help healthcare organizations succeed in value-based payment models. These platforms use AI agents, predictive analytics, and automated workflows to close care gaps, reduce hospital readmissions, improve quality scores, and optimize risk adjustment — ultimately helping ACOs, health systems, and health plans improve patient outcomes while reducing costs. Zynix AI is the leading value-based care AI operating system, serving over 1 million VBC patients across 30 states.</p></div></div>' +

      '<div class="zynix-faq-item"><button class="zynix-faq-q" aria-expanded="false">How does AI help ACOs close care gaps?</button>' +
      '<div class="zynix-faq-a"><p>AI helps ACOs close care gaps by automatically identifying patients with open quality measures (HEDIS, Stars, HCC/RAF gaps), prioritizing them by impact and reachability, and deploying autonomous AI agents to conduct outreach via phone, SMS, and patient portal. The AI handles scheduling, appointment reminders, post-visit documentation, and follow-up — reducing the manual burden on care coordinators by up to 80%. Zynix AI\'s gap closure engine has helped ACOs close 40% more quality gaps compared to manual workflows.</p></div></div>' +

      '<div class="zynix-faq-item"><button class="zynix-faq-q" aria-expanded="false">What is the difference between AI agents and chatbots in healthcare?</button>' +
      '<div class="zynix-faq-a"><p>Healthcare chatbots are rule-based systems that follow scripted decision trees and can only respond to pre-programmed inputs. AI agents, by contrast, are autonomous systems that can reason, plan, and take action across multiple workflows. A chatbot might answer a patient\'s FAQ, but an AI agent can identify a high-risk patient from ADT data, call them post-discharge, schedule a TCM follow-up, update the care plan, and trigger billing — all without human intervention. Zynix AI deploys seven specialized AI agents that operate across the entire care coordination lifecycle.</p></div></div>' +

      '<div class="zynix-faq-item"><button class="zynix-faq-q" aria-expanded="false">How does AI reduce hospital readmissions?</button>' +
      '<div class="zynix-faq-a"><p>AI reduces hospital readmissions through three mechanisms: (1) real-time risk stratification that identifies high-risk patients at the moment of discharge using ADT feeds, clinical data, and social determinants; (2) automated post-discharge outreach via AI agents that call patients within 48 hours to confirm medication adherence, follow-up appointments, and safe transitions; and (3) proactive care plan deployment that triggers TCM workflows, schedules follow-up visits, and monitors patient engagement through day 30. Organizations using Zynix AI have seen readmission rates decrease by 25-35%.</p></div></div>' +

      '<div class="zynix-faq-item"><button class="zynix-faq-q" aria-expanded="false">What is HCC/RAF gap closure and why does it matter?</button>' +
      '<div class="zynix-faq-a"><p>HCC (Hierarchical Condition Category) and RAF (Risk Adjustment Factor) gap closure is the process of identifying and documenting chronic conditions that were previously unrecorded or under-coded. Accurate HCC coding ensures health plans and ACOs receive appropriate risk-adjusted payments that reflect the true health burden of their patient populations. AI accelerates this by analyzing claims, clinical notes, and lab results to surface suspect conditions, prioritize annual wellness visits, and ensure proper documentation at the point of care. Zynix AI\'s analytics engine identifies an average of $180 in additional RAF value per patient per year.</p></div></div>' +

      '<div class="zynix-faq-item"><button class="zynix-faq-q" aria-expanded="false">Can AI automate prior authorization in healthcare?</button>' +
      '<div class="zynix-faq-a"><p>Yes. AI can automate up to 70% of prior authorization workflows by extracting clinical data from EHRs, matching it against payer-specific criteria, auto-populating authorization forms, submitting requests electronically, and tracking approvals in real time. This reduces the average prior auth processing time from 5-14 days to under 24 hours. Zynix AI\'s ZynAuth agent handles the entire prior authorization lifecycle — from initial clinical data extraction through submission, follow-up, and appeals — integrating directly with major payer portals and EHR systems.</p></div></div>' +

      '<div class="zynix-faq-item"><button class="zynix-faq-q" aria-expanded="false">How is Zynix AI different from other healthcare AI platforms?</button>' +
      '<div class="zynix-faq-a"><p>Most healthcare AI vendors sell point solutions — a scheduling tool here, an analytics dashboard there, a documentation assistant elsewhere. Zynix AI is the only integrated operating system purpose-built for value-based care that combines a unified data platform, population health analytics, seven specialized AI agents, ambient clinical documentation, and orchestrated care plans in a single platform. Instead of buying and integrating 6-8 separate tools, organizations deploy Zynix as one operating system where data flows seamlessly from ingestion through action. This integrated approach delivers 3-5x faster time-to-value and eliminates the data silos that plague multi-vendor stacks.</p></div></div>' +

      '</div></div></section>';

    // -- CTA --
    html += renderCTA('See Zynix in Action', 'Join the healthcare organizations already transforming care operations with AI-powered intelligence.', 'Request a Demo');

    // -- FOOTER --
    html += renderFooter();

    return html;
  }

  // ── PAGE ROUTER ──
  var path = window.location.pathname.replace(/\/$/, '').toLowerCase();

  var routes = {
    // Homepage
    '': renderHomepage,
    // Products - Platform
    '/products-zynix-os': renderZynixOS,
    '/products-data-platform': renderDataPlatform,
    '/products-analytics': renderAnalytics,
    '/products-ai-agents': renderAIAgents,
    '/products-zynscribe': renderZynScribe,
    '/products-care-plans': renderCarePlans,
    '/company-zynixllm': renderZynixLLM,
    '/products-zynixllm': renderZynixLLM,
    // Products - AI Agent Detail Pages (NEW)
    '/products-ai-agents-zynafterhours': renderZynAfterHours,
    '/products-ai-agents-zynschedule': renderZynSchedule,
    '/products-ai-agents-post-discharge': renderPostDischarge,
    '/products-ai-agents-med-rec': renderMedRec,
    '/products-ai-agents-zynreminder': renderZynReminder,
    '/products-ai-agents-zynfax': renderZynFax,
    '/products-ai-agents-zynauth': renderZynAuth,
    // Solutions - By Org Type
    '/solutions-acos': renderACOs,
    '/solutions-health-systems': renderHealthSystems,
    '/solutions-fqhcs': renderFQHCs,
    '/solutions-health-plans': renderHealthPlans,
    '/solutions-independent-practices': renderPractices,
    '/solutions-ascs': renderASCs,
    // Solutions - By Use Case (NEW)
    '/solutions-use-case-tcm': renderUseCaseTCM,
    '/solutions-use-case-gap-closure': renderUseCaseGapClosure,
    '/solutions-use-case-after-hours': renderUseCaseAfterHours,
    '/solutions-use-case-prior-auth': renderUseCasePriorAuth,
    '/solutions-use-case-preventive-screening': renderUseCasePreventiveScreening,
    '/solutions-use-case-readmission-prevention': renderUseCaseReadmission,
    // Company
    '/company-about': renderAbout,
    '/about': renderAbout,
    '/company-careers': renderCareers,
    '/company-press': renderPress,
    '/trust-center': renderTrustCenter,
    '/company-trust-center': renderTrustCenter,
    '/contact': renderContact,
    // Resources
    '/faq': renderFAQ,
    '/resources-faq': renderFAQ,
    '/blog': renderBlog,
    '/resources-blog': renderBlog,
    '/resources-blog-1m-patients': renderBlog1MPatients,
    '/case-studies': renderCaseStudies,
    '/resources-case-studies': renderCaseStudies,
    '/resources-glossary': renderGlossary,
    '/resources-webinars': renderWebinars,
    '/resources-whitepapers': renderWhitepapers,
    // Legal
    '/privacy-policy': renderPrivacy,
    '/company-privacy': renderPrivacy,
    '/terms-of-service': renderTerms,
    '/company-terms': renderTerms,
    // Comparison Pages
    '/compare/zynix-vs-point-solutions': renderComparePointSolutions,
    '/compare/zynix-vs-innovaccer': renderCompareInnovaccer,
    '/compare/zynix-vs-commure': renderCompareCommure,
    // Blog Posts
    '/blog/what-is-value-based-care-ai': renderBlogVBCAI,
    '/blog/how-ai-closes-care-gaps': renderBlogCareGaps,
    '/blog/ai-agents-vs-chatbots-healthcare': renderBlogAgentsVsChatbots,
    // Case Studies
    '/case-studies/palm-beach-aco': renderCaseStudyPalmBeach
  };

  function initAnimations() {
    // IntersectionObserver for fade-in-up animations
    var fadeEls = document.querySelectorAll('.fade-in-up');
    if (fadeEls.length && 'IntersectionObserver' in window) {
      // Immediately show elements already in viewport (above-the-fold)
      var viewH = window.innerHeight || document.documentElement.clientHeight;
      fadeEls.forEach(function(el) {
        var rect = el.getBoundingClientRect();
        if (rect.top < viewH) {
          el.classList.add('visible');
        }
      });
      // Observe remaining hidden elements with staggered reveal
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
      fadeEls.forEach(function(el) {
        if (!el.classList.contains('visible')) observer.observe(el);
      });
    } else {
      // Fallback: show all
      fadeEls.forEach(function(el) { el.classList.add('visible'); });
    }
  }

  // ── Scroll-triggered counter animation ──
  function animateCounters() {
    var counters = document.querySelectorAll('.zynix-stat-value, .zynix-metric-value');
    if (!counters.length || !('IntersectionObserver' in window)) return;
    var counterObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        if (el.dataset.animated) return;
        el.dataset.animated = '1';
        var text = el.textContent.trim();
        var match = text.match(/^([\d,.]+)(.*)$/);
        if (!match) return;
        var target = parseFloat(match[1].replace(/,/g, ''));
        var suffix = match[2] || '';
        var hasComma = match[1].indexOf(',') > -1;
        var hasDecimal = match[1].indexOf('.') > -1;
        var decimals = hasDecimal ? (match[1].split('.')[1] || '').length : 0;
        var duration = 1200;
        var start = performance.now();
        function step(now) {
          var elapsed = now - start;
          var progress = Math.min(elapsed / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          var current = target * eased;
          var formatted = hasDecimal ? current.toFixed(decimals) : Math.floor(current).toString();
          if (hasComma) formatted = Number(formatted).toLocaleString();
          el.textContent = formatted + suffix;
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.3 });
    counters.forEach(function(el) { counterObserver.observe(el); });
  }

  // ── ROI Calculator Logic ──
  function initROICalculator() {
    var lives = document.getElementById('roi-lives');
    var discharges = document.getElementById('roi-discharges');
    var tcm = document.getElementById('roi-tcm');
    var gaps = document.getElementById('roi-gaps');
    if (!lives) return;

    function fmt(n) { return n.toLocaleString(); }
    function fmtMoney(n) {
      if (n >= 1000000) return '$' + (n / 1000000).toFixed(1) + 'M';
      if (n >= 1000) return '$' + Math.round(n / 1000) + 'K';
      return '$' + Math.round(n);
    }

    function calc() {
      var l = parseInt(lives.value);
      var d = parseInt(discharges.value);
      var t = parseInt(tcm.value);
      var g = parseInt(gaps.value);

      // Update display values
      document.getElementById('roi-lives-val').textContent = fmt(l);
      document.getElementById('roi-discharges-val').textContent = fmt(d);
      document.getElementById('roi-tcm-val').textContent = t + '%';
      document.getElementById('roi-gaps-val').textContent = fmt(g);

      // Calculations
      var tcmLift = Math.min(85, t + 50) - t;
      var additionalTCM = d * 12 * (tcmLift / 100);
      var tcmRevenue = additionalTCM * 260; // avg TCM reimbursement
      var gapsClosed = Math.round(g * 0.40);
      var gapRevenue = gapsClosed * 180; // avg RAF value per gap
      var adminSavings = l * 12; // $12/patient admin savings
      var readmitReduction = Math.round(d * 12 * 0.15 * 0.23); // 15% readmit rate, 23% reduction
      var readmitSavings = readmitReduction * 15000; // avg readmission cost
      var totalSavings = tcmRevenue + gapRevenue + adminSavings + readmitSavings;

      document.getElementById('roi-savings').textContent = fmtMoney(totalSavings);
      document.getElementById('roi-tcm-lift').textContent = '+' + tcmLift + '%';
      document.getElementById('roi-gaps-closed').textContent = fmt(gapsClosed);
      document.getElementById('roi-readmit').textContent = '-' + Math.round((readmitReduction / (d * 12 * 0.15)) * 100) + '%';
    }

    // Update slider track fill gradient
    function updateTrackFill(el) {
      var min = parseFloat(el.min) || 0;
      var max = parseFloat(el.max) || 100;
      var val = parseFloat(el.value);
      var pct = ((val - min) / (max - min)) * 100;
      el.style.background = 'linear-gradient(90deg, var(--z-primary) 0%, var(--z-primary) ' + pct + '%, #e5e7eb ' + pct + '%, #e5e7eb 100%)';
    }

    [lives, discharges, tcm, gaps].forEach(function(el) {
      el.addEventListener('input', function() {
        calc();
        updateTrackFill(el);
      });
      updateTrackFill(el); // initial fill
    });
    calc(); // initial calculation
  }

  // ── Google Analytics ──
  function initAnalytics() {
    // GA4 - Replace G-XXXXXXXXXX with actual measurement ID when available
    var gaId = 'G-PLACEHOLDER';
    if (gaId === 'G-PLACEHOLDER') return; // Skip if no real ID yet
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + gaId;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', gaId, { page_path: window.location.pathname });
    // Track CTA clicks
    document.addEventListener('click', function(e) {
      var link = e.target.closest('a');
      if (!link) return;
      if (link.href && link.href.indexOf('calendly.com') > -1) {
        gtag('event', 'cta_click', { event_category: 'conversion', event_label: 'demo_request', page: window.location.pathname });
      }
      if (link.classList.contains('zynix-btn-primary') || link.classList.contains('zynix-btn-secondary')) {
        gtag('event', 'button_click', { event_category: 'engagement', event_label: link.textContent.trim(), page: window.location.pathname });
      }
    });
    // Track page scroll depth
    var scrollMarks = [25, 50, 75, 100];
    window.addEventListener('scroll', function() {
      var scrollPct = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      scrollMarks = scrollMarks.filter(function(mark) {
        if (scrollPct >= mark) {
          gtag('event', 'scroll_depth', { event_category: 'engagement', event_label: mark + '%', page: window.location.pathname });
          return false;
        }
        return true;
      });
    }, { passive: true });
  }

  // ── PAGE: Compare — Zynix vs Point Solutions ──
  function renderComparePointSolutions() {
    return renderInnerHero('COMPARISON', 'Zynix AI vs. Point Solutions', 'Why leading value-based care organizations choose an integrated AI operating system over fragmented point solutions.', IMG.enterprise, 'Zynix AI vs point solutions comparison') +
    '<section class="zynix-compare-section" style="padding:80px 0"><div class="zynix-container">' +
    '<div class="zynix-summary-block"><strong>Zynix AI</strong> is an integrated healthcare AI operating system that unifies data ingestion, analytics, AI agents, and care management into a single platform. Point solutions are individual tools that each solve one narrow problem\u2014a separate vendor for scheduling, another for documentation, another for analytics\u2014requiring organizations to stitch together a fragmented technology stack.</div>' +

    '<h2 style="text-align:center;font-size:32px;font-weight:700;margin:48px 0 32px;color:var(--z-text)">Head-to-Head Comparison</h2>' +

    '<div class="zynix-compare-two-col" style="display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-bottom:32px">' +
    '<div class="zynix-compare-card" style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:32px">' +
    '<h3 style="font-size:20px;font-weight:700;margin:0 0 20px;color:var(--z-text)">Point Solutions Approach</h3>' +
    '<p style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin:0 0 16px"><strong>Integration:</strong> Each tool requires a separate EHR integration, separate data feed, and separate vendor relationship. Organizations manage 5\u201310 vendor contracts to cover basic care operations.</p>' +
    '<p style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin:0 0 16px"><strong>Data:</strong> Patient data lives in silos across multiple platforms. Care managers toggle between dashboards to piece together a patient\u2019s full picture. No unified longitudinal record.</p>' +
    '<p style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin:0 0 16px"><strong>AI Agents:</strong> Most point solutions offer rules-based automation or chatbots with limited scope. No autonomous agents that initiate and complete multi-step clinical workflows.</p>' +
    '<p style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin:0 0 16px"><strong>Outcomes:</strong> Analytics tools identify problems but cannot act on them. Scheduling tools book appointments but do not understand clinical context. Gaps between tools cause patients to fall through.</p>' +
    '<p style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin:0 0 16px"><strong>Implementation:</strong> 6\u201312 months per tool, with complex integration projects for each addition. Organizations often abandon tools before seeing ROI.</p>' +
    '<p style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin:0"><strong>Total Cost:</strong> $15\u2013$30+ per member per month when combining analytics, engagement, documentation, and care management tools from separate vendors.</p>' +
    '</div>' +
    '<div class="zynix-compare-card zynix-card-zynix" style="background:linear-gradient(135deg, #f0f7ff 0%, #fff 100%);border:2px solid var(--z-primary);border-radius:12px;padding:32px">' +
    '<h3 style="font-size:20px;font-weight:700;margin:0 0 20px;color:var(--z-primary)">Zynix AI Operating System</h3>' +
    '<p style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin:0 0 16px"><strong>Integration:</strong> One platform, one integration. Zynix connects to your EHR once and provides data ingestion, analytics, AI agents, documentation, and care management through a single interface.</p>' +
    '<p style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin:0 0 16px"><strong>Data:</strong> Unified data layer that ingests and normalizes EHR, claims, ADT, labs, pharmacy, and SDOH data into one longitudinal patient record with 97%+ patient matching accuracy.</p>' +
    '<p style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin:0 0 16px"><strong>AI Agents:</strong> Seven specialized autonomous agents that initiate calls, schedule appointments, reconcile medications, document encounters, process faxes, and submit prior authorizations without human intervention.</p>' +
    '<p style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin:0 0 16px"><strong>Outcomes:</strong> The platform identifies a risk, deploys a care plan, executes outreach through AI agents, and confirms resolution\u2014all in one closed loop. 85%+ TCM contact rates, 40% improvement in gap closure.</p>' +
    '<p style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin:0 0 16px"><strong>Implementation:</strong> Go live in 4\u20138 weeks. One vendor, one contract, one implementation. Most organizations see ROI within the first quarter.</p>' +
    '<p style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin:0"><strong>Total Cost:</strong> One platform fee that replaces multiple point solutions, typically delivering 2\u20133x ROI in year one through improved shared savings, TCM revenue, and administrative efficiency.</p>' +
    '</div></div>' +

    '<div class="zynix-compare-verdict" style="background:var(--z-blue-light);border-radius:12px;padding:40px;text-align:center;margin:40px 0">' +
    '<h3 style="font-size:24px;font-weight:700;color:var(--z-text);margin:0 0 16px">The Verdict</h3>' +
    '<p style="font-size:17px;line-height:1.8;color:var(--z-text-secondary);margin:0 0 24px;max-width:700px;margin-left:auto;margin-right:auto">Point solutions solve individual problems. Zynix solves the operating system problem. When your data, analytics, agents, and care plans work together in one platform, you eliminate integration complexity, reduce vendor management overhead, and achieve measurably better outcomes for your patient population.</p>' +
    '<a href="' + CALENDLY + '" class="zynix-btn-primary" target="_blank">See Zynix in Action &rarr;</a>' +
    '</div>' +

    '<div class="zynix-page-faq" style="max-width:720px;margin:48px auto 0">' +
    '<h2 style="font-size:28px;font-weight:700;text-align:center;margin:0 0 32px;color:var(--z-text)">Frequently Asked Questions</h2>' +
    '<div class="zynix-faq-item" style="border-bottom:1px solid #e5e7eb;padding:20px 0"><h3 class="zynix-faq-q" style="font-size:17px;font-weight:600;cursor:pointer;color:var(--z-text);margin:0">Can Zynix replace all my existing point solutions?</h3><div class="zynix-faq-a" style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin-top:12px"><p>Yes. Zynix replaces standalone analytics platforms, patient outreach tools, scheduling systems, documentation solutions, and care management software with one integrated operating system. Most organizations consolidate 5\u201310 vendor contracts into a single Zynix deployment.</p></div></div>' +
    '<div class="zynix-faq-item" style="border-bottom:1px solid #e5e7eb;padding:20px 0"><h3 class="zynix-faq-q" style="font-size:17px;font-weight:600;cursor:pointer;color:var(--z-text);margin:0">How long does it take to implement Zynix versus multiple point solutions?</h3><div class="zynix-faq-a" style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin-top:12px"><p>Zynix typically goes live in 4\u20138 weeks with a single EHR integration. Implementing equivalent functionality through point solutions often takes 6\u201312 months per tool, with each requiring separate integrations, training, and vendor management.</p></div></div>' +
    '<div class="zynix-faq-item" style="border-bottom:1px solid #e5e7eb;padding:20px 0"><h3 class="zynix-faq-q" style="font-size:17px;font-weight:600;cursor:pointer;color:var(--z-text);margin:0">What makes Zynix AI agents different from the automation in point solutions?</h3><div class="zynix-faq-a" style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin-top:12px"><p>Most point solutions use rules-based automation or simple chatbots that respond to queries. Zynix AI agents are autonomous\u2014they proactively initiate calls, navigate clinical conversations, reconcile medications, schedule follow-ups, and escalate to care teams when needed, all without human prompting.</p></div></div>' +
    '</div>' +

    '</div></section>' +
    renderCTA('Ready to Replace Your Point Solutions?', 'See how Zynix consolidates your entire care operations stack into one AI-powered platform.', 'Request a Demo') +
    renderFooter();
  }

  // ── PAGE: Compare — Zynix vs Innovaccer ──
  function renderCompareInnovaccer() {
    return renderInnerHero('COMPARISON', 'Zynix AI vs. Innovaccer', 'Compare the Zynix AI operating system with Innovaccer\u2019s data platform for value-based care organizations.', IMG.enterprise, 'Zynix AI vs Innovaccer comparison') +
    '<section class="zynix-compare-section" style="padding:80px 0"><div class="zynix-container">' +
    '<div class="zynix-summary-block"><strong>Zynix AI</strong> is a healthcare AI operating system with autonomous agents that take action\u2014calling patients, scheduling appointments, documenting encounters, and closing care gaps automatically. <strong>Innovaccer</strong> is a healthcare data platform focused on data aggregation, normalization, and analytics dashboards. The core difference: Zynix acts on insights while Innovaccer presents them.</div>' +

    '<h2 style="text-align:center;font-size:32px;font-weight:700;margin:48px 0 32px;color:var(--z-text)">Feature-by-Feature Comparison</h2>' +

    '<div class="zynix-compare-two-col" style="display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-bottom:32px">' +
    '<div class="zynix-compare-card" style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:32px">' +
    '<h3 style="font-size:20px;font-weight:700;margin:0 0 20px;color:var(--z-text)">Innovaccer</h3>' +
    '<p style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin:0 0 16px"><strong>Agent Automation:</strong> Innovaccer offers data-driven insights and worklists but relies on human staff or third-party tools to execute outreach, calls, and follow-ups. No autonomous AI agents that take action independently.</p>' +
    '<p style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin:0 0 16px"><strong>Clinical LLM:</strong> Uses general-purpose AI models for analytics and natural language queries. No proprietary healthcare-specific language model purpose-built for clinical workflows and patient conversations.</p>' +
    '<p style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin:0 0 16px"><strong>TCM Workflows:</strong> Provides TCM dashboards and patient tracking but requires manual outreach by care teams. Typical contact rates remain at industry average of 30\u201340%.</p>' +
    '<p style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin:0 0 16px"><strong>Implementation Speed:</strong> Enterprise implementation typically requires 3\u20136 months for data platform deployment, with additional time for custom analytics configuration and integration.</p>' +
    '<p style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin:0"><strong>Target Market:</strong> Primarily large health systems and enterprise-scale organizations with dedicated data engineering and IT teams to manage the platform.</p>' +
    '</div>' +
    '<div class="zynix-compare-card zynix-card-zynix" style="background:linear-gradient(135deg, #f0f7ff 0%, #fff 100%);border:2px solid var(--z-primary);border-radius:12px;padding:32px">' +
    '<h3 style="font-size:20px;font-weight:700;margin:0 0 20px;color:var(--z-primary)">Zynix AI</h3>' +
    '<p style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin:0 0 16px"><strong>Agent Automation:</strong> Seven autonomous AI agents that proactively call patients, schedule appointments, reconcile medications, document encounters, process faxes, and complete prior authorizations. Over 1 million patient interactions handled across 30 states.</p>' +
    '<p style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin:0 0 16px"><strong>Clinical LLM:</strong> ZynixLLM is a proprietary healthcare language model purpose-built for clinical workflows, patient conversations, and medical documentation. Lower hallucination rates than general-purpose models.</p>' +
    '<p style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin:0 0 16px"><strong>TCM Workflows:</strong> End-to-end automated TCM: ADT feed triggers care plan, AI agent contacts patient within 2 business days, schedules follow-up visit, and completes medication reconciliation. 85%+ contact rates vs. 30\u201340% industry average.</p>' +
    '<p style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin:0 0 16px"><strong>Implementation Speed:</strong> Go live in 4\u20138 weeks. One EHR integration, pre-built care plans, and turnkey AI agents. Most organizations see measurable ROI within the first quarter.</p>' +
    '<p style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin:0"><strong>Target Market:</strong> ACOs, MSOs, health systems, health plans, FQHCs, and independent practices of all sizes. No dedicated IT team required to operate the platform.</p>' +
    '</div></div>' +

    '<div class="zynix-compare-verdict" style="background:var(--z-blue-light);border-radius:12px;padding:40px;text-align:center;margin:40px 0">' +
    '<h3 style="font-size:24px;font-weight:700;color:var(--z-text);margin:0 0 16px">The Verdict</h3>' +
    '<p style="font-size:17px;line-height:1.8;color:var(--z-text-secondary);margin:0 0 24px;max-width:700px;margin-left:auto;margin-right:auto">Innovaccer is a strong data platform for organizations that need a foundation for data aggregation and analytics. Zynix goes further by not only unifying data but deploying autonomous AI agents that act on insights\u2014calling patients, closing gaps, and executing care plans without manual intervention. If your organization needs AI that does the work rather than just presenting it, Zynix delivers.</p>' +
    '<a href="' + CALENDLY + '" class="zynix-btn-primary" target="_blank">See the Zynix Difference &rarr;</a>' +
    '</div>' +

    '<div class="zynix-page-faq" style="max-width:720px;margin:48px auto 0">' +
    '<h2 style="font-size:28px;font-weight:700;text-align:center;margin:0 0 32px;color:var(--z-text)">Frequently Asked Questions</h2>' +
    '<div class="zynix-faq-item" style="border-bottom:1px solid #e5e7eb;padding:20px 0"><h3 class="zynix-faq-q" style="font-size:17px;font-weight:600;cursor:pointer;color:var(--z-text);margin:0">Is Zynix a data platform like Innovaccer?</h3><div class="zynix-faq-a" style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin-top:12px"><p>Zynix includes a full data platform (ingestion, normalization, patient matching) as one layer of its operating system, but it goes beyond data aggregation by adding analytics, AI agents, documentation, and care management. Zynix is an operating system that includes data infrastructure, not just a data platform.</p></div></div>' +
    '<div class="zynix-faq-item" style="border-bottom:1px solid #e5e7eb;padding:20px 0"><h3 class="zynix-faq-q" style="font-size:17px;font-weight:600;cursor:pointer;color:var(--z-text);margin:0">Can we use Zynix alongside Innovaccer?</h3><div class="zynix-faq-a" style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin-top:12px"><p>While technically possible, most organizations find that Zynix replaces the need for a separate data platform by providing unified data infrastructure along with the action layer that Innovaccer lacks. Organizations typically consolidate onto Zynix for simplicity and better outcomes.</p></div></div>' +
    '<div class="zynix-faq-item" style="border-bottom:1px solid #e5e7eb;padding:20px 0"><h3 class="zynix-faq-q" style="font-size:17px;font-weight:600;cursor:pointer;color:var(--z-text);margin:0">What if our organization already uses Innovaccer?</h3><div class="zynix-faq-a" style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin-top:12px"><p>Many organizations migrate from analytics-only platforms to Zynix when they realize that dashboards alone do not improve outcomes. Zynix can ingest data from existing platforms during a transition period, making migration straightforward and low-risk.</p></div></div>' +
    '</div>' +

    '</div></section>' +
    renderCTA('See How Zynix Compares', 'Request a personalized demo showing exactly how Zynix outperforms your current platform.', 'Request a Demo') +
    renderFooter();
  }

  // ── PAGE: Compare — Zynix vs Commure ──
  function renderCompareCommure() {
    return renderInnerHero('COMPARISON', 'Zynix AI vs. Commure', 'Compare the Zynix turnkey AI operating system with Commure\u2019s developer platform for healthcare organizations.', IMG.enterprise, 'Zynix AI vs Commure comparison') +
    '<section class="zynix-compare-section" style="padding:80px 0"><div class="zynix-container">' +
    '<div class="zynix-summary-block"><strong>Zynix AI</strong> is a turnkey healthcare AI operating system that deploys out of the box\u2014no custom development required. <strong>Commure</strong> is a developer platform that provides APIs, SDKs, and building blocks for health systems to construct their own applications. The core difference: Zynix is a finished product you deploy; Commure is a toolkit you build with.</div>' +

    '<h2 style="text-align:center;font-size:32px;font-weight:700;margin:48px 0 32px;color:var(--z-text)">Feature-by-Feature Comparison</h2>' +

    '<div class="zynix-compare-two-col" style="display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-bottom:32px">' +
    '<div class="zynix-compare-card" style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:32px">' +
    '<h3 style="font-size:20px;font-weight:700;margin:0 0 20px;color:var(--z-text)">Commure</h3>' +
    '<p style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin:0 0 16px"><strong>Approach:</strong> Developer-first platform providing FHIR APIs, communication tools, and infrastructure for health systems to build custom applications. Requires engineering teams to design, develop, and maintain solutions.</p>' +
    '<p style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin:0 0 16px"><strong>AI Agents:</strong> Commure offers Commure Strongline and ambient documentation through its Athelas acquisition, but does not provide autonomous outreach agents for TCM, gap closure, or patient engagement workflows.</p>' +
    '<p style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin:0 0 16px"><strong>Time to Value:</strong> Typically 6\u201318 months to build, test, and deploy custom applications on the Commure platform. Ongoing engineering investment required for maintenance and feature development.</p>' +
    '<p style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin:0 0 16px"><strong>Population Health:</strong> Provides data infrastructure and interoperability layer but relies on the health system to build population health workflows, risk stratification logic, and care management applications on top.</p>' +
    '<p style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin:0"><strong>Target Buyer:</strong> CTO and engineering leadership at large health systems with dedicated software development teams. Not designed for ACOs, MSOs, or organizations without technical staff.</p>' +
    '</div>' +
    '<div class="zynix-compare-card zynix-card-zynix" style="background:linear-gradient(135deg, #f0f7ff 0%, #fff 100%);border:2px solid var(--z-primary);border-radius:12px;padding:32px">' +
    '<h3 style="font-size:20px;font-weight:700;margin:0 0 20px;color:var(--z-primary)">Zynix AI</h3>' +
    '<p style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin:0 0 16px"><strong>Approach:</strong> Turnkey AI operating system that deploys as a complete product. No custom development required. Pre-built care plans, analytics dashboards, AI agents, and documentation tools ready on day one.</p>' +
    '<p style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin:0 0 16px"><strong>AI Agents:</strong> Seven production-ready autonomous agents for post-discharge follow-up, scheduling, after-hours triage, medication reconciliation, reminders, fax processing, and prior authorization. Over 1 million patient interactions completed.</p>' +
    '<p style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin:0 0 16px"><strong>Time to Value:</strong> Go live in 4\u20138 weeks with measurable outcomes from the first month. No engineering team required. Zynix manages implementation, training, and ongoing optimization.</p>' +
    '<p style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin:0 0 16px"><strong>Population Health:</strong> Complete population health management including risk stratification, HCC gap identification, HEDIS measure tracking, care plan orchestration, and automated outreach\u2014all built in and operational from deployment.</p>' +
    '<p style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin:0"><strong>Target Buyer:</strong> CMOs, COOs, and care management leaders at ACOs, health systems, health plans, FQHCs, and practices of any size. Designed for operational leaders, not engineering teams.</p>' +
    '</div></div>' +

    '<div class="zynix-compare-verdict" style="background:var(--z-blue-light);border-radius:12px;padding:40px;text-align:center;margin:40px 0">' +
    '<h3 style="font-size:24px;font-weight:700;color:var(--z-text);margin:0 0 16px">The Verdict</h3>' +
    '<p style="font-size:17px;line-height:1.8;color:var(--z-text-secondary);margin:0 0 24px;max-width:700px;margin-left:auto;margin-right:auto">Commure is a strong choice for health systems with dedicated engineering teams that want to build custom applications on top of healthcare infrastructure. Zynix is the right choice for organizations that need a complete, production-ready AI operating system that delivers measurable clinical and financial outcomes without requiring a software development team.</p>' +
    '<a href="' + CALENDLY + '" class="zynix-btn-primary" target="_blank">See Zynix in Action &rarr;</a>' +
    '</div>' +

    '<div class="zynix-page-faq" style="max-width:720px;margin:48px auto 0">' +
    '<h2 style="font-size:28px;font-weight:700;text-align:center;margin:0 0 32px;color:var(--z-text)">Frequently Asked Questions</h2>' +
    '<div class="zynix-faq-item" style="border-bottom:1px solid #e5e7eb;padding:20px 0"><h3 class="zynix-faq-q" style="font-size:17px;font-weight:600;cursor:pointer;color:var(--z-text);margin:0">Do we need a development team to use Zynix?</h3><div class="zynix-faq-a" style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin-top:12px"><p>No. Zynix is a turnkey platform that requires zero custom development. Your clinical and operational teams use the platform directly through an intuitive interface. Zynix handles all technical implementation, EHR integration, and ongoing maintenance.</p></div></div>' +
    '<div class="zynix-faq-item" style="border-bottom:1px solid #e5e7eb;padding:20px 0"><h3 class="zynix-faq-q" style="font-size:17px;font-weight:600;cursor:pointer;color:var(--z-text);margin:0">Can Zynix handle the same scale as Commure?</h3><div class="zynix-faq-a" style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin-top:12px"><p>Yes. Zynix serves over 1 million VBC patients across 30 states, supporting healthcare organizations ranging from independent practices to multi-state ACO networks. The platform scales automatically without requiring custom infrastructure management.</p></div></div>' +
    '<div class="zynix-faq-item" style="border-bottom:1px solid #e5e7eb;padding:20px 0"><h3 class="zynix-faq-q" style="font-size:17px;font-weight:600;cursor:pointer;color:var(--z-text);margin:0">Is Zynix customizable even though it\u2019s turnkey?</h3><div class="zynix-faq-a" style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin-top:12px"><p>Yes. While Zynix deploys as a complete product, it is highly configurable. Organizations customize care plan protocols, agent scripts, escalation rules, risk thresholds, outreach schedules, and reporting dashboards to match their specific clinical workflows and population needs.</p></div></div>' +
    '</div>' +

    '</div></section>' +
    renderCTA('Build vs. Deploy: See the Difference', 'Request a demo and see how Zynix delivers results in weeks, not months of development.', 'Request a Demo') +
    renderFooter();
  }

  // ── PAGE: Blog — What Is Value-Based Care AI? ──
  function renderBlogVBCAI() {
    return renderInnerHero('BLOG', 'What Is Value-Based Care AI? A Complete Guide for 2026', 'How artificial intelligence is transforming value-based care delivery, from risk adjustment to care gap closure and beyond.', IMG.analytics, 'Value-based care AI guide') +
    '<section class="zynix-article"><div class="zynix-container"><div class="zynix-article-body" style="max-width:780px;margin:0 auto">' +
    '<div class="zynix-article-meta" style="display:flex;gap:8px;align-items:center;font-size:14px;color:var(--z-text-secondary);margin-bottom:32px"><span>Zynix AI Team</span><span>|</span><span>March 2026</span><span>|</span><span>8 min read</span></div>' +

    '<p style="font-size:18px;line-height:1.9;color:var(--z-text)">Value-based care AI is the application of artificial intelligence to healthcare delivery models where providers are rewarded for patient outcomes rather than service volume. It represents the convergence of two transformative forces in American healthcare: the shift from fee-for-service to value-based reimbursement, and the maturation of AI technologies capable of autonomous clinical and operational action.</p>' +

    '<h2 style="font-size:28px;font-weight:700;margin:40px 0 16px;color:var(--z-text)">Defining Value-Based Care AI</h2>' +
    '<p style="font-size:16px;line-height:1.8;color:var(--z-text-secondary)">Value-based care AI encompasses any AI system designed to help healthcare organizations succeed in value-based payment arrangements. This includes AI for risk stratification, care gap identification, patient outreach automation, clinical documentation, care plan orchestration, and predictive analytics. The defining characteristic of VBC AI is that it optimizes for outcomes\u2014reduced readmissions, improved quality measures, accurate risk capture, and lower total cost of care\u2014rather than maximizing procedure volume.</p>' +
    '<p style="font-size:16px;line-height:1.8;color:var(--z-text-secondary)">Traditional healthcare IT focused on digitizing records and tracking billing codes. VBC AI takes a fundamentally different approach by analyzing population-level data patterns, predicting which patients need intervention, and increasingly, taking autonomous action to deliver that intervention through AI agents that call patients, schedule appointments, and coordinate care.</p>' +

    '<div class="zynix-key-takeaway" style="background:var(--z-blue-light);border-left:4px solid var(--z-primary);padding:24px 28px;border-radius:0 8px 8px 0;margin:32px 0"><strong style="color:var(--z-text)">Key Takeaway:</strong> <span style="color:var(--z-text-secondary)">Value-based care AI is not a single tool\u2014it is an integrated technology approach that unifies data, analytics, and autonomous action to help organizations succeed in outcome-based payment models.</span></div>' +

    '<h2 style="font-size:28px;font-weight:700;margin:40px 0 16px;color:var(--z-text)">How VBC AI Works in Practice</h2>' +
    '<p style="font-size:16px;line-height:1.8;color:var(--z-text-secondary)">A modern VBC AI platform operates across four functional layers. First, a <strong>data foundation</strong> ingests and normalizes clinical data from EHRs, claims, ADT feeds, labs, pharmacy records, and social determinants of health sources into a unified patient record. Second, an <strong>intelligence layer</strong> applies predictive models to stratify patients by risk, identify HCC and HEDIS gaps, and generate prioritized worklists. Third, an <strong>action layer</strong> of AI agents executes outreach, scheduling, documentation, and care coordination tasks autonomously. Fourth, a <strong>care management layer</strong> orchestrates end-to-end workflows for TCM, CCM, AWV, and gap closure programs.</p>' +
    '<p style="font-size:16px;line-height:1.8;color:var(--z-text-secondary)">The critical advancement in 2026 is the action layer. Previous generations of healthcare AI stopped at analytics\u2014identifying high-risk patients and generating dashboards. Today\u2019s VBC AI platforms like Zynix close the loop by deploying autonomous agents that contact patients, confirm medication adherence, schedule follow-up visits, and ensure care plans are completed without relying entirely on overstretched human care teams.</p>' +

    '<h2 style="font-size:28px;font-weight:700;margin:40px 0 16px;color:var(--z-text)">Key Use Cases for VBC AI</h2>' +
    '<ul style="font-size:16px;line-height:1.8;color:var(--z-text-secondary);padding-left:24px">' +
    '<li style="margin-bottom:12px"><strong>Transitional Care Management (TCM):</strong> AI agents contact patients within 48 hours of hospital discharge, schedule follow-up visits, and reconcile medications\u2014achieving 85%+ contact rates versus the 30\u201340% industry average with manual processes.</li>' +
    '<li style="margin-bottom:12px"><strong>HCC Gap Closure:</strong> Predictive models identify undocumented chronic conditions and prioritize annual recapture visits, improving RAF score accuracy by 40% and ensuring appropriate capitation funding.</li>' +
    '<li style="margin-bottom:12px"><strong>HEDIS Quality Measures:</strong> Automated outreach identifies patients overdue for preventive screenings and schedules appointments, directly improving Stars ratings and quality-based incentive payments.</li>' +
    '<li style="margin-bottom:12px"><strong>Annual Wellness Visits (AWV):</strong> AI-driven scheduling campaigns increase AWV completion by 2\u20133x, creating critical touchpoints for chronic condition documentation and preventive care planning.</li>' +
    '<li style="margin-bottom:12px"><strong>Readmission Prevention:</strong> Risk models predict which discharged patients are most likely to return to the hospital within 30 days, triggering proactive interventions that reduce avoidable readmissions by 20\u201325%.</li>' +
    '</ul>' +

    '<h2 style="font-size:28px;font-weight:700;margin:40px 0 16px;color:var(--z-text)">Why VBC AI Matters in 2026</h2>' +
    '<p style="font-size:16px;line-height:1.8;color:var(--z-text-secondary)">CMS continues to accelerate the transition to value-based payment models. By 2030, the agency aims to have all Medicare beneficiaries in accountable care relationships. MSSP participation continues to grow, ACO REACH is expanding, and commercial payers are increasingly adopting value-based contracts. Organizations that lack AI-powered care operations will struggle to compete for shared savings against those that can automate outreach at scale, close gaps proactively, and demonstrate measurable quality improvement.</p>' +
    '<p style="font-size:16px;line-height:1.8;color:var(--z-text-secondary)">The economics are compelling: organizations using VBC AI platforms report 2\u20133x ROI in their first year through improved shared savings distributions, increased TCM and CCM reimbursement, and reduced administrative overhead. The question for healthcare leaders in 2026 is no longer whether to adopt AI for value-based care, but which platform to choose.</p>' +

    '<div class="zynix-key-takeaway" style="background:var(--z-blue-light);border-left:4px solid var(--z-primary);padding:24px 28px;border-radius:0 8px 8px 0;margin:32px 0"><strong style="color:var(--z-text)">Key Takeaway:</strong> <span style="color:var(--z-text-secondary)">VBC AI platforms that combine data unification, predictive analytics, and autonomous AI agents represent the most significant operational advantage available to value-based care organizations in 2026.</span></div>' +

    '<div class="zynix-page-faq" style="margin:48px 0 0">' +
    '<h2 style="font-size:28px;font-weight:700;margin:0 0 32px;color:var(--z-text)">Frequently Asked Questions</h2>' +
    '<div class="zynix-faq-item" style="border-bottom:1px solid #e5e7eb;padding:20px 0"><h3 class="zynix-faq-q" style="font-size:17px;font-weight:600;cursor:pointer;color:var(--z-text);margin:0">What is the difference between VBC AI and traditional healthcare analytics?</h3><div class="zynix-faq-a" style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin-top:12px"><p>Traditional healthcare analytics identifies trends and surfaces insights through dashboards and reports. VBC AI goes further by predicting which patients need intervention, prioritizing those interventions by impact, and deploying autonomous AI agents to execute outreach and care coordination without manual effort.</p></div></div>' +
    '<div class="zynix-faq-item" style="border-bottom:1px solid #e5e7eb;padding:20px 0"><h3 class="zynix-faq-q" style="font-size:17px;font-weight:600;cursor:pointer;color:var(--z-text);margin:0">How does VBC AI improve shared savings for ACOs?</h3><div class="zynix-faq-a" style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin-top:12px"><p>VBC AI improves shared savings by reducing avoidable utilization (readmissions, unnecessary ED visits), improving quality measure performance (which affects savings rates), accurately capturing HCC codes (which adjusts the spending benchmark), and automating care management workflows that prevent costly adverse events.</p></div></div>' +
    '<div class="zynix-faq-item" style="border-bottom:1px solid #e5e7eb;padding:20px 0"><h3 class="zynix-faq-q" style="font-size:17px;font-weight:600;cursor:pointer;color:var(--z-text);margin:0">Is VBC AI HIPAA compliant?</h3><div class="zynix-faq-a" style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin-top:12px"><p>Reputable VBC AI platforms like Zynix maintain full HIPAA compliance, SOC 2 Type II certification, and HITRUST readiness. All patient data is encrypted at rest (AES-256) and in transit (TLS 1.3), with role-based access controls and comprehensive audit logging. Business Associate Agreements are standard.</p></div></div>' +
    '</div>' +

    '</div></div></section>' +
    renderCTA('See VBC AI in Action', 'Request a demo and discover how Zynix transforms value-based care operations with autonomous AI.', 'Request a Demo') +
    renderFooter();
  }

  // ── PAGE: Blog — How AI Closes Care Gaps ──
  function renderBlogCareGaps() {
    return renderInnerHero('BLOG', 'How AI Closes Care Gaps: From Identification to Resolution', 'The end-to-end workflow for using artificial intelligence to find, prioritize, and close clinical care gaps at scale.', IMG.care, 'AI closing care gaps in healthcare') +
    '<section class="zynix-article"><div class="zynix-container"><div class="zynix-article-body" style="max-width:780px;margin:0 auto">' +
    '<div class="zynix-article-meta" style="display:flex;gap:8px;align-items:center;font-size:14px;color:var(--z-text-secondary);margin-bottom:32px"><span>Zynix AI Team</span><span>|</span><span>March 2026</span><span>|</span><span>7 min read</span></div>' +

    '<p style="font-size:18px;line-height:1.9;color:var(--z-text)">A care gap is the difference between the care a patient should receive based on clinical guidelines and the care they actually receive. Care gaps include missed preventive screenings, undocumented chronic conditions, overdue follow-up visits, and lapses in medication adherence. Closing care gaps is the single most impactful operational lever for value-based care organizations seeking to improve quality scores, capture accurate risk adjustment, and earn shared savings.</p>' +

    '<h2 style="font-size:28px;font-weight:700;margin:40px 0 16px;color:var(--z-text)">Why Manual Care Gap Closure Fails</h2>' +
    '<p style="font-size:16px;line-height:1.8;color:var(--z-text-secondary)">Most healthcare organizations identify care gaps through retrospective claims analysis or periodic EHR data pulls. A quality team generates a spreadsheet of patients with open gaps, distributes worklists to care coordinators, and asks them to call each patient to schedule an appointment. This manual process fails for predictable reasons: worklists are overwhelming (often thousands of patients), care coordinators spend most of their time leaving voicemails, there is no prioritization by clinical or financial impact, and by the time gaps are identified from claims data, months have already passed since the missed service.</p>' +
    '<p style="font-size:16px;line-height:1.8;color:var(--z-text-secondary)">The result is that most organizations close only 15\u201325% of identified care gaps before measurement periods end. The remaining 75\u201385% of gaps translate directly into lower quality scores, missed shared savings, and inaccurate risk adjustment that underfunds patient care.</p>' +

    '<h2 style="font-size:28px;font-weight:700;margin:40px 0 16px;color:var(--z-text)">The AI-Powered Care Gap Lifecycle</h2>' +
    '<p style="font-size:16px;line-height:1.8;color:var(--z-text-secondary)">AI transforms care gap closure from a manual, retrospective process into an automated, real-time workflow. The AI-powered lifecycle has four stages:</p>' +
    '<p style="font-size:16px;line-height:1.8;color:var(--z-text-secondary)"><strong>Stage 1: Continuous Identification.</strong> Rather than waiting for quarterly claims data, AI platforms ingest data continuously from EHRs, claims feeds, labs, pharmacy records, and ADT notifications. Machine learning models compare each patient\u2019s care history against applicable clinical guidelines (HEDIS, HCC recapture schedules, preventive screening recommendations) to identify gaps in real time. New gaps are detected within hours of data availability, not months later.</p>' +
    '<p style="font-size:16px;line-height:1.8;color:var(--z-text-secondary)"><strong>Stage 2: Intelligent Prioritization.</strong> Not all care gaps are equal. AI models score each gap by clinical urgency (how long overdue, patient risk level), financial impact (RAF value, quality measure weight), and likelihood of successful closure (patient engagement history, appointment availability). This produces a dynamically ranked worklist where the highest-impact, most-closable gaps surface to the top.</p>' +
    '<p style="font-size:16px;line-height:1.8;color:var(--z-text-secondary)"><strong>Stage 3: Automated Outreach.</strong> AI agents contact patients through their preferred communication channel\u2014phone calls, text messages, or patient portal notifications\u2014to schedule appointments and close open gaps. Agents handle the conversation autonomously, navigating scheduling logistics, answering common questions, and confirming appointments without requiring staff intervention. For patients who need clinical triage, agents escalate to human care team members with full context.</p>' +
    '<p style="font-size:16px;line-height:1.8;color:var(--z-text-secondary)"><strong>Stage 4: Confirmed Resolution.</strong> The AI platform tracks each gap from identification through outreach to confirmed closure. When a patient completes a screening, attends a follow-up visit, or has a condition documented during an encounter, the gap is automatically marked as resolved. Unresolved gaps re-enter the outreach cycle with updated prioritization.</p>' +

    '<div class="zynix-key-takeaway" style="background:var(--z-blue-light);border-left:4px solid var(--z-primary);padding:24px 28px;border-radius:0 8px 8px 0;margin:32px 0"><strong style="color:var(--z-text)">Key Takeaway:</strong> <span style="color:var(--z-text-secondary)">AI closes the gap between identification and resolution by automating the most time-consuming step: patient outreach. Organizations using AI-powered care gap workflows report 40% improvement in gap closure rates compared to manual processes.</span></div>' +

    '<h2 style="font-size:28px;font-weight:700;margin:40px 0 16px;color:var(--z-text)">Types of Care Gaps AI Can Close</h2>' +
    '<ul style="font-size:16px;line-height:1.8;color:var(--z-text-secondary);padding-left:24px">' +
    '<li style="margin-bottom:12px"><strong>HCC Recapture Gaps:</strong> Chronic conditions documented in prior years that have not been recaptured in the current measurement period. AI identifies patients with lapsing HCC codes and prioritizes AWV scheduling to ensure recapture.</li>' +
    '<li style="margin-bottom:12px"><strong>HEDIS Quality Gaps:</strong> Overdue preventive screenings (mammography, colonoscopy, A1C testing, blood pressure control) that affect Stars ratings and quality incentive payments.</li>' +
    '<li style="margin-bottom:12px"><strong>Medication Adherence Gaps:</strong> Patients who have not refilled chronic medications on schedule, detected through pharmacy claims data and addressed through automated refill reminders and provider alerts.</li>' +
    '<li style="margin-bottom:12px"><strong>Follow-Up Gaps:</strong> Missed post-discharge visits, overdue specialist referrals, and incomplete care plan activities identified through ADT feeds and EHR encounter data.</li>' +
    '</ul>' +

    '<h2 style="font-size:28px;font-weight:700;margin:40px 0 16px;color:var(--z-text)">Measurable Impact of AI-Powered Gap Closure</h2>' +
    '<p style="font-size:16px;line-height:1.8;color:var(--z-text-secondary)">Healthcare organizations using AI for care gap closure consistently report significant improvements: 40% increase in overall gap closure rates, 2\u20133x improvement in AWV completion, measurable improvements in HEDIS measure performance, more accurate RAF scores leading to appropriate capitation payments, and stronger shared savings distributions driven by higher quality scores. These improvements compound over time as the AI models learn from each population\u2019s specific patterns and optimize outreach strategies accordingly.</p>' +

    '<div class="zynix-page-faq" style="margin:48px 0 0">' +
    '<h2 style="font-size:28px;font-weight:700;margin:0 0 32px;color:var(--z-text)">Frequently Asked Questions</h2>' +
    '<div class="zynix-faq-item" style="border-bottom:1px solid #e5e7eb;padding:20px 0"><h3 class="zynix-faq-q" style="font-size:17px;font-weight:600;cursor:pointer;color:var(--z-text);margin:0">How quickly can AI identify a new care gap?</h3><div class="zynix-faq-a" style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin-top:12px"><p>AI platforms that process data in real time can identify new care gaps within hours of receiving updated clinical or claims data. This is a significant improvement over traditional quarterly or annual gap analysis, which often identifies gaps months after the missed service window.</p></div></div>' +
    '<div class="zynix-faq-item" style="border-bottom:1px solid #e5e7eb;padding:20px 0"><h3 class="zynix-faq-q" style="font-size:17px;font-weight:600;cursor:pointer;color:var(--z-text);margin:0">Do patients respond positively to AI-driven outreach?</h3><div class="zynix-faq-a" style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin-top:12px"><p>Yes. Modern healthcare AI agents are designed to sound natural, empathetic, and professional. Patient satisfaction with AI outreach is consistently high because AI agents are available at convenient times, speak the patient\u2019s preferred language (15+ languages supported), and never rush conversations. Contact rates with AI outreach exceed manual calling by 2\u20133x.</p></div></div>' +
    '<div class="zynix-faq-item" style="border-bottom:1px solid #e5e7eb;padding:20px 0"><h3 class="zynix-faq-q" style="font-size:17px;font-weight:600;cursor:pointer;color:var(--z-text);margin:0">What data sources are needed for AI-powered gap closure?</h3><div class="zynix-faq-a" style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin-top:12px"><p>Comprehensive gap identification requires EHR data (encounter history, diagnoses, lab results), claims data (procedure codes, billing history), pharmacy data (medication fills and adherence), ADT feeds (admission and discharge events), and quality measure specifications (HEDIS, HCC recapture schedules). Platforms like Zynix ingest all of these sources automatically.</p></div></div>' +
    '</div>' +

    '</div></div></section>' +
    renderCTA('Close Your Care Gaps Faster', 'See how Zynix AI identifies, prioritizes, and closes care gaps automatically.', 'Request a Demo') +
    renderFooter();
  }

  // ── PAGE: Blog — AI Agents vs Chatbots in Healthcare ──
  function renderBlogAgentsVsChatbots() {
    return renderInnerHero('BLOG', 'Healthcare AI Agents vs. Chatbots: What\u2019s the Difference?', 'Understanding the critical distinction between AI agents that take autonomous action and chatbots that only respond to questions.', IMG.doctor, 'AI agents vs chatbots in healthcare') +
    '<section class="zynix-article"><div class="zynix-container"><div class="zynix-article-body" style="max-width:780px;margin:0 auto">' +
    '<div class="zynix-article-meta" style="display:flex;gap:8px;align-items:center;font-size:14px;color:var(--z-text-secondary);margin-bottom:32px"><span>Zynix AI Team</span><span>|</span><span>March 2026</span><span>|</span><span>6 min read</span></div>' +

    '<p style="font-size:18px;line-height:1.9;color:var(--z-text)">The healthcare industry uses the terms "AI agent" and "chatbot" interchangeably, but they represent fundamentally different technologies with vastly different capabilities. A chatbot responds to user queries within a conversation. An AI agent perceives its environment, makes decisions, and takes autonomous action to accomplish clinical and operational tasks\u2014often without any human initiation at all. Understanding this distinction is critical for healthcare leaders evaluating AI technology investments.</p>' +

    '<h2 style="font-size:28px;font-weight:700;margin:40px 0 16px;color:var(--z-text)">What Is a Healthcare Chatbot?</h2>' +
    '<p style="font-size:16px;line-height:1.8;color:var(--z-text-secondary)">A healthcare chatbot is a conversational interface that responds to user-initiated interactions. When a patient or staff member asks a question, the chatbot searches a knowledge base and returns an answer. Chatbots excel at symptom checking, answering FAQs about office hours and insurance, helping patients navigate portal features, and providing general health education. The key limitation of chatbots is that they are <strong>reactive</strong>\u2014they wait for someone to start a conversation and can only respond within the boundaries of that conversation. A chatbot cannot decide on its own to call a recently discharged patient, schedule a follow-up appointment, or reconcile a medication list.</p>' +

    '<h2 style="font-size:28px;font-weight:700;margin:40px 0 16px;color:var(--z-text)">What Is a Healthcare AI Agent?</h2>' +
    '<p style="font-size:16px;line-height:1.8;color:var(--z-text-secondary)">A healthcare AI agent is an autonomous system that monitors data streams, identifies situations requiring action, and executes multi-step workflows without waiting for human initiation. AI agents are <strong>proactive</strong>\u2014they detect that a patient was discharged from the hospital, automatically initiate a post-discharge call within 48 hours, navigate a clinical conversation covering symptoms and medication changes, schedule a follow-up visit, update the care plan, and route unresolved issues to a care manager. Each of these steps happens autonomously within clinical protocols defined by the organization.</p>' +

    '<div class="zynix-key-takeaway" style="background:var(--z-blue-light);border-left:4px solid var(--z-primary);padding:24px 28px;border-radius:0 8px 8px 0;margin:32px 0"><strong style="color:var(--z-text)">Key Takeaway:</strong> <span style="color:var(--z-text-secondary)">The difference between a chatbot and an AI agent is the difference between answering a question and doing the work. Chatbots are tools for information retrieval. AI agents are autonomous team members that execute clinical workflows.</span></div>' +

    '<h2 style="font-size:28px;font-weight:700;margin:40px 0 16px;color:var(--z-text)">Five Key Differences</h2>' +
    '<ul style="font-size:16px;line-height:1.8;color:var(--z-text-secondary);padding-left:24px">' +
    '<li style="margin-bottom:12px"><strong>Initiation:</strong> Chatbots wait for user input. AI agents proactively initiate actions based on clinical data triggers such as discharge events, lab results, or approaching care gap deadlines.</li>' +
    '<li style="margin-bottom:12px"><strong>Scope:</strong> Chatbots handle single-turn or simple multi-turn conversations. AI agents execute complex multi-step workflows spanning data analysis, patient communication, scheduling, documentation, and escalation.</li>' +
    '<li style="margin-bottom:12px"><strong>Integration:</strong> Chatbots typically sit on a website or patient portal. AI agents are deeply integrated into clinical systems\u2014reading EHR data, processing ADT feeds, updating care plans, and writing back to the health record.</li>' +
    '<li style="margin-bottom:12px"><strong>Autonomy:</strong> Chatbots require continuous user interaction to function. AI agents operate independently within defined clinical guardrails, making decisions and taking actions across their entire workflow.</li>' +
    '<li style="margin-bottom:12px"><strong>Impact:</strong> Chatbots improve patient self-service and reduce call center volume. AI agents directly improve clinical outcomes: 85%+ TCM contact rates, 40% gap closure improvement, 60% reduction in administrative burden.</li>' +
    '</ul>' +

    '<h2 style="font-size:28px;font-weight:700;margin:40px 0 16px;color:var(--z-text)">When to Use Each Technology</h2>' +
    '<p style="font-size:16px;line-height:1.8;color:var(--z-text-secondary)">Chatbots remain valuable for patient-facing information retrieval: answering questions about office hours, explaining insurance coverage, and triaging symptom inquiries on a website. AI agents are the right choice when you need technology to <em>do work</em>\u2014to call patients, close care gaps, schedule appointments, document encounters, and execute care plans at a scale that human staff cannot match. The most effective healthcare organizations deploy both: chatbots for patient self-service and AI agents for operational automation.</p>' +

    '<blockquote style="border-left:4px solid var(--z-blue);padding:20px 24px;margin:32px 0;background:var(--z-blue-light);border-radius:0 8px 8px 0"><p style="font-size:16px;line-height:1.8;color:var(--z-text);margin:0;font-style:italic">"We didn\u2019t need another chatbot. We needed AI that would actually make the calls, book the appointments, and close the gaps. That\u2019s what agents do."</p><cite style="display:block;margin-top:12px;font-size:14px;color:var(--z-text-secondary);font-style:normal"><strong>\u2014 David Klebonis</strong>, COO, Palm Beach ACO</cite></blockquote>' +

    '<div class="zynix-page-faq" style="margin:48px 0 0">' +
    '<h2 style="font-size:28px;font-weight:700;margin:0 0 32px;color:var(--z-text)">Frequently Asked Questions</h2>' +
    '<div class="zynix-faq-item" style="border-bottom:1px solid #e5e7eb;padding:20px 0"><h3 class="zynix-faq-q" style="font-size:17px;font-weight:600;cursor:pointer;color:var(--z-text);margin:0">Can AI agents handle complex clinical conversations?</h3><div class="zynix-faq-a" style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin-top:12px"><p>Yes. Healthcare AI agents powered by clinical language models can navigate nuanced patient conversations covering symptoms, medications, appointment logistics, and care plan adherence. When conversations exceed the agent\u2019s clinical scope, they escalate to human care team members with full conversational context and patient history.</p></div></div>' +
    '<div class="zynix-faq-item" style="border-bottom:1px solid #e5e7eb;padding:20px 0"><h3 class="zynix-faq-q" style="font-size:17px;font-weight:600;cursor:pointer;color:var(--z-text);margin:0">Do AI agents replace clinical staff?</h3><div class="zynix-faq-a" style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin-top:12px"><p>No. AI agents handle routine, high-volume tasks such as outreach calls, appointment scheduling, and medication reminders that consume care coordinator time. This allows clinical staff to focus on patients who need human clinical judgment, complex case management, and in-person care\u2014work that AI cannot and should not replace.</p></div></div>' +
    '<div class="zynix-faq-item" style="border-bottom:1px solid #e5e7eb;padding:20px 0"><h3 class="zynix-faq-q" style="font-size:17px;font-weight:600;cursor:pointer;color:var(--z-text);margin:0">How many AI agents does Zynix offer?</h3><div class="zynix-faq-a" style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin-top:12px"><p>Zynix deploys seven specialized AI agents: post-discharge follow-up, appointment scheduling (ZynSchedule), after-hours triage (ZynAfterHours), medication reconciliation, appointment reminders (ZynReminder), fax processing (ZynFax), and prior authorization (ZynAuth). Each agent is purpose-built for its specific workflow and operates autonomously within clinical guardrails.</p></div></div>' +
    '</div>' +

    '</div></div></section>' +
    renderCTA('See AI Agents in Action', 'Watch Zynix AI agents make real patient calls, schedule appointments, and close care gaps autonomously.', 'Request a Demo') +
    renderFooter();
  }

  // ── PAGE: Case Study — Palm Beach ACO ──
  function renderCaseStudyPalmBeach() {
    return renderInnerHero('CASE STUDY', 'Palm Beach ACO', 'How a South Florida ACO transformed value-based care operations with AI-powered outreach, documentation, and care coordination.', IMG.care, 'Palm Beach ACO case study with Zynix AI') +
    '<section style="padding:60px 0"><div class="zynix-container"><div class="zynix-case-detail" style="max-width:860px;margin:0 auto">' +

    '<div class="zynix-case-highlight" style="display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-bottom:48px">' +
    '<div class="zynix-case-stat fade-in-up" style="background:var(--z-blue-light);border-radius:12px;padding:24px;text-align:center"><span class="zynix-metric-value" style="font-size:32px;font-weight:800;color:var(--z-primary);display:block">85%</span><span style="font-size:14px;color:var(--z-text-secondary)">TCM Contact Rate</span></div>' +
    '<div class="zynix-case-stat fade-in-up" style="background:var(--z-blue-light);border-radius:12px;padding:24px;text-align:center"><span class="zynix-metric-value" style="font-size:32px;font-weight:800;color:var(--z-primary);display:block">40%</span><span style="font-size:14px;color:var(--z-text-secondary)">Gap Closure Improvement</span></div>' +
    '<div class="zynix-case-stat fade-in-up" style="background:var(--z-blue-light);border-radius:12px;padding:24px;text-align:center"><span class="zynix-metric-value" style="font-size:32px;font-weight:800;color:var(--z-primary);display:block">3x</span><span style="font-size:14px;color:var(--z-text-secondary)">AWV Completion Lift</span></div>' +
    '<div class="zynix-case-stat fade-in-up" style="background:var(--z-blue-light);border-radius:12px;padding:24px;text-align:center"><span class="zynix-metric-value" style="font-size:32px;font-weight:800;color:var(--z-primary);display:block">8</span><span style="font-size:14px;color:var(--z-text-secondary)">Weeks to ROI</span></div>' +
    '</div>' +

    '<h2 style="font-size:28px;font-weight:700;margin:0 0 16px;color:var(--z-text)">The Challenge</h2>' +
    '<p style="font-size:16px;line-height:1.8;color:var(--z-text-secondary);margin:0 0 16px">Palm Beach ACO is a Medicare Shared Savings Program (MSSP) ACO serving a large attributed patient population across South Florida. Like many ACOs, Palm Beach faced a persistent set of operational challenges that undermined their value-based care performance:</p>' +
    '<ul style="font-size:16px;line-height:1.8;color:var(--z-text-secondary);padding-left:24px;margin:0 0 16px">' +
    '<li style="margin-bottom:8px"><strong>Low TCM contact rates:</strong> Manual post-discharge outreach achieved only 30\u201335% contact rates. Care coordinators spent hours each day leaving voicemails, with most discharged patients never receiving timely follow-up contact within the CMS-mandated 2-business-day window.</li>' +
    '<li style="margin-bottom:8px"><strong>Missed HCC and quality gaps:</strong> Without real-time gap identification, the quality team relied on quarterly claims data to generate worklists. By the time gaps were identified, the optimal intervention window had often closed. Annual Wellness Visit completion was far below potential.</li>' +
    '<li style="margin-bottom:8px"><strong>Documentation burden:</strong> Providers spent 2\u20133 hours per day on documentation after clinic hours, contributing to burnout and limiting the number of patients each provider could see.</li>' +
    '<li style="margin-bottom:8px"><strong>Missed shared savings:</strong> The combination of low contact rates, missed quality measures, and incomplete HCC capture meant the ACO was leaving significant shared savings on the table each performance year.</li>' +
    '</ul>' +

    '<h2 style="font-size:28px;font-weight:700;margin:40px 0 16px;color:var(--z-text)">The Solution</h2>' +
    '<p style="font-size:16px;line-height:1.8;color:var(--z-text-secondary);margin:0 0 16px">Palm Beach ACO deployed the Zynix AI platform as their comprehensive care operations solution. Implementation was completed in 6 weeks, including full EHR integration, data onboarding, care plan configuration, and AI agent deployment. The deployment included:</p>' +
    '<ul style="font-size:16px;line-height:1.8;color:var(--z-text-secondary);padding-left:24px;margin:0 0 16px">' +
    '<li style="margin-bottom:8px"><strong>Post-Discharge AI Agent:</strong> Autonomous outreach to every discharged patient within 48 hours, handling the initial TCM contact call including medication review and follow-up scheduling.</li>' +
    '<li style="margin-bottom:8px"><strong>Gap Closure Engine:</strong> Real-time identification of HCC recapture gaps and HEDIS quality measure gaps, with AI-prioritized worklists and automated patient outreach for appointment scheduling.</li>' +
    '<li style="margin-bottom:8px"><strong>AWV Campaign Agent:</strong> Proactive scheduling outreach targeting eligible patients for Annual Wellness Visits, with intelligent retry logic and multichannel engagement.</li>' +
    '<li style="margin-bottom:8px"><strong>ZynScribe:</strong> Ambient AI documentation deployed across participating providers to reduce documentation burden and capture structured clinical notes during encounters.</li>' +
    '</ul>' +

    '<h2 style="font-size:28px;font-weight:700;margin:40px 0 16px;color:var(--z-text)">The Results</h2>' +
    '<p style="font-size:16px;line-height:1.8;color:var(--z-text-secondary);margin:0 0 16px">Within the first quarter of deployment, Palm Beach ACO saw transformative improvements across every key performance metric:</p>' +
    '<ul style="font-size:16px;line-height:1.8;color:var(--z-text-secondary);padding-left:24px;margin:0 0 16px">' +
    '<li style="margin-bottom:8px"><strong>TCM contact rate increased from 32% to 85%:</strong> AI agents successfully contacted the vast majority of discharged patients within the 2-business-day CMS window, ensuring timely follow-up and enabling TCM billing for significantly more episodes.</li>' +
    '<li style="margin-bottom:8px"><strong>40% improvement in care gap closure:</strong> Real-time gap identification combined with automated outreach closed HCC and quality gaps at a rate far exceeding manual workflows, improving quality scores and RAF accuracy.</li>' +
    '<li style="margin-bottom:8px"><strong>3x AWV completion:</strong> Proactive scheduling outreach tripled the number of Annual Wellness Visits completed, creating more touchpoints for chronic condition documentation, preventive screening, and care plan updates.</li>' +
    '<li style="margin-bottom:8px"><strong>ROI achieved in 8 weeks:</strong> The combination of increased TCM revenue, improved gap closure, higher AWV completion, and reduced administrative costs delivered positive ROI within the first two months of deployment.</li>' +
    '</ul>' +

    '<blockquote style="border-left:4px solid var(--z-blue);padding:20px 24px;margin:40px 0;background:var(--z-blue-light);border-radius:0 8px 8px 0"><p style="font-size:16px;line-height:1.8;color:var(--z-text);margin:0;font-style:italic">"Zynix transformed our TCM workflow overnight. We went from a 32% contact rate to over 85% within the first quarter. The AI agents handle the outreach while our nurses focus on clinical care."</p><cite style="display:block;margin-top:12px;font-size:14px;color:var(--z-text-secondary);font-style:normal"><strong>\u2014 David Klebonis</strong>, COO, Palm Beach ACO</cite></blockquote>' +

    '</div></div></section>' +
    renderCTA('Achieve Results Like Palm Beach ACO', 'See how Zynix can transform your organization\u2019s value-based care performance in weeks, not months.', 'Request a Demo') +
    renderFooter();
  }

  // ── Custom 404 page renderer ──
  function render404() {
    return renderInnerHero('404 ERROR', 'Page Not Found', 'The page you\'re looking for doesn\'t exist or has been moved.', IMG.hero, 'Page not found') +
    '<section style="padding:60px 20px 80px;text-align:center;max-width:600px;margin:0 auto">' +
      '<p style="font-size:18px;color:var(--z-text-light);margin-bottom:32px">It seems you\'ve followed a broken link or the page has been removed. Let us help you find what you need.</p>' +
      '<div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap">' +
        '<a href="/" class="zynix-btn-primary" style="text-decoration:none">← Back to Home</a>' +
        '<a href="/products-zynix-os" class="zynix-btn-outline" style="text-decoration:none">Explore Products</a>' +
        '<a href="/contact" class="zynix-btn-outline" style="text-decoration:none">Contact Us</a>' +
      '</div>' +
    '</section>' +
    renderCTA() + renderFooter();
  }

  if (routes[path]) {
    var doInject = function() {
      injectSEO(path);
      injectMegaMenu();
      // Build page content, inserting cross-links BEFORE CTA/Footer
      var pageContent = routes[path]();
      var crossLinks = renderCrossLinks(path);
      if (crossLinks) {
        // Insert cross-links before the CTA section (which precedes footer)
        var ctaPos = pageContent.indexOf('<section class="zynix-cta-section"');
        if (ctaPos > -1) {
          pageContent = pageContent.substring(0, ctaPos) + crossLinks + pageContent.substring(ctaPos);
        } else {
          // Fallback: insert before footer
          var footerPos = pageContent.indexOf('<footer class="zynix-footer"');
          if (footerPos > -1) {
            pageContent = pageContent.substring(0, footerPos) + crossLinks + pageContent.substring(footerPos);
          } else {
            pageContent += crossLinks;
          }
        }
      }
      injectAfterNav(renderBreadcrumb(path) + pageContent);
      initAnimations();
      animateCounters();
      initROICalculator();
      initAnalytics();
      // FAQ accordion toggle
      document.querySelectorAll('.zynix-faq-q').forEach(function(q) {
        q.addEventListener('click', function() {
          q.parentElement.classList.toggle('open');
        });
      });
      // Anti-flicker: reveal page now that content is injected
      document.documentElement.classList.remove('js-loading');
      if(window.__antiFlickerTimeout)clearTimeout(window.__antiFlickerTimeout);
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', doInject);
    } else {
      doInject();
    }
  } else {
    // 404 — unmatched route: show branded 404 page
    var do404 = function() {
      document.title = 'Page Not Found | Zynix AI';
      injectMegaMenu();
      injectAfterNav(render404());
      initAnimations();
      // Anti-flicker: reveal page
      document.documentElement.classList.remove('js-loading');
      if(window.__antiFlickerTimeout)clearTimeout(window.__antiFlickerTimeout);
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', do404);
    } else {
      do404();
    }
  }

  // ── AI Chatbot / Customer Routing Agent ──
  function initZynixAgent() {
    // Decision tree for intelligent routing
    var AGENT_FLOWS = {
      start: {
        msg: "Hi! I'm Zynix AI Assistant. I can help you find the right solution for your organization. What best describes you?",
        options: [
          { label: '🏥 ACO / MSO Leader', next: 'aco' },
          { label: '🏨 Health System Executive', next: 'healthsys' },
          { label: '🏢 FQHC / Community Health', next: 'fqhc' },
          { label: '💼 Health Plan / Payer', next: 'payer' },
          { label: '👨‍⚕️ Independent Practice', next: 'indie' },
          { label: '🔍 Just Exploring', next: 'explore' }
        ]
      },
      aco: {
        msg: "Great! ACOs face unique challenges with risk adjustment, care gaps, and quality measures. What's your biggest priority right now?",
        options: [
          { label: 'HCC Risk Adjustment & RAF Scores', next: 'rec_hcc' },
          { label: 'Care Gap Closure & Quality', next: 'rec_caregap' },
          { label: 'Reducing Total Cost of Care', next: 'rec_tcoc' },
          { label: 'Full AI Operating System', next: 'rec_os' }
        ]
      },
      healthsys: {
        msg: "Health systems need scalable solutions. What challenge keeps you up at night?",
        options: [
          { label: 'Clinical Documentation & Burnout', next: 'rec_scribe' },
          { label: 'Prior Authorization Bottlenecks', next: 'rec_priorauth' },
          { label: 'Revenue Cycle & Denials', next: 'rec_rcm' },
          { label: 'Population Health Analytics', next: 'rec_analytics' }
        ]
      },
      fqhc: {
        msg: "FQHCs serve critical communities. How can we help your mission?",
        options: [
          { label: 'Patient Scheduling & No-Shows', next: 'rec_schedule' },
          { label: 'UDS Quality Reporting', next: 'rec_quality' },
          { label: 'Clinical Documentation', next: 'rec_scribe' },
          { label: 'Care Coordination', next: 'rec_carecoord' }
        ]
      },
      payer: {
        msg: "Payers need data-driven insights and network management. What's your focus?",
        options: [
          { label: 'Risk Stratification & Analytics', next: 'rec_analytics' },
          { label: 'Provider Network Optimization', next: 'rec_network' },
          { label: 'Claims & Prior Auth Automation', next: 'rec_priorauth' },
          { label: 'Quality & HEDIS Measures', next: 'rec_quality' }
        ]
      },
      indie: {
        msg: "Independent practices need efficient, affordable solutions. What matters most?",
        options: [
          { label: 'AI Medical Scribe for Notes', next: 'rec_scribe' },
          { label: 'Patient Communication & Reminders', next: 'rec_patient_engage' },
          { label: 'Billing & Revenue Cycle', next: 'rec_rcm' },
          { label: 'After-Hours & Triage', next: 'rec_afterhours' }
        ]
      },
      explore: {
        msg: "Welcome! Here are our most popular starting points:",
        options: [
          { label: '📋 See All Products', link: '/products-zynix-os' },
          { label: '🤖 AI Agents Hub', link: '/products-ai-agents' },
          { label: '📊 Solutions by Org Type', link: '/solutions-acos' },
          { label: '📅 Book a Demo', link: CALENDLY },
          { label: '📖 Read Our Blog', link: '/resources-blog' }
        ]
      },
      // Recommendation endpoints
      rec_hcc: {
        msg: "For HCC Risk Adjustment, I recommend:",
        recs: [
          { name: 'Zynix OS+', desc: 'AI-powered HCC coding with 95%+ accuracy', link: '/products-zynix-os' },
          { name: 'Analytics Dashboard', desc: 'RAF score tracking & gap identification', link: '/products-analytics' },
          { name: 'Risk Intelligence Agent', desc: 'Automated chart review & suspect coding', link: '/products-ai-agents' }
        ]
      },
      rec_caregap: {
        msg: "For Care Gap Closure & Quality, I recommend:",
        recs: [
          { name: 'Care Plans', desc: 'Automated patient care plans with gap tracking', link: '/products-care-plans' },
          { name: 'Patient Navigator Agent', desc: 'AI outreach for gap closure', link: '/products-ai-agents' },
          { name: 'Quality Measures Agent', desc: 'Automated HEDIS/STAR measure tracking', link: '/products-ai-agents' }
        ]
      },
      rec_tcoc: {
        msg: "To reduce Total Cost of Care, I recommend:",
        recs: [
          { name: 'Zynix OS', desc: 'Full AI operating system for VBC', link: '/products-zynix-os' },
          { name: 'Data Platform', desc: 'Unified data across claims, EHR, and ADT feeds', link: '/products-data-platform' },
          { name: 'TCM Solution', desc: 'Transitional Care Management to prevent readmissions', link: '/solutions-use-case-tcm' }
        ]
      },
      rec_os: {
        msg: "The Zynix OS is our flagship AI operating system — used by organizations managing 1M+ VBC patients:",
        recs: [
          { name: 'Zynix OS', desc: 'Complete AI healthcare operating system', link: '/products-zynix-os' },
          { name: 'Book a Demo', desc: 'See it live with your data', link: CALENDLY }
        ]
      },
      rec_scribe: {
        msg: "For Clinical Documentation, I recommend:",
        recs: [
          { name: 'ZynScribe', desc: 'AI medical scribe — 70% less documentation time', link: '/products-zynscribe' },
          { name: 'AI Medical Scribe Agent', desc: 'Real-time ambient documentation', link: '/products-ai-agents' }
        ]
      },
      rec_priorauth: {
        msg: "For Prior Authorization automation, I recommend:",
        recs: [
          { name: 'ZynAuth Agent', desc: 'Automated prior auth submission & tracking', link: '/products-ai-agents-zynauth' },
          { name: 'Prior Auth Use Case', desc: 'See how practices save 12+ hours/week', link: '/solutions-use-case-prior-auth' }
        ]
      },
      rec_rcm: {
        msg: "For Revenue Cycle optimization, I recommend:",
        recs: [
          { name: 'Claims Optimizer Agent', desc: 'AI-powered claims scrubbing & denial prevention', link: '/products-ai-agents' },
          { name: 'Zynix RCM Solution', desc: 'End-to-end revenue cycle intelligence', link: '/solutions-use-case-prior-auth' }
        ]
      },
      rec_analytics: {
        msg: "For Analytics & Population Health, I recommend:",
        recs: [
          { name: 'Analytics Dashboard', desc: 'Real-time population health insights', link: '/products-analytics' },
          { name: 'Data Platform', desc: 'Unified data lake across all sources', link: '/products-data-platform' }
        ]
      },
      rec_schedule: {
        msg: "For Patient Scheduling & No-Show Reduction, I recommend:",
        recs: [
          { name: 'ZynSchedule Agent', desc: 'AI-powered intelligent scheduling', link: '/products-ai-agents-zynschedule' },
          { name: 'ZynReminder Agent', desc: 'Automated appointment reminders', link: '/products-ai-agents-zynreminder' }
        ]
      },
      rec_quality: {
        msg: "For Quality Reporting & Measures, I recommend:",
        recs: [
          { name: 'Quality Measures Agent', desc: 'Automated HEDIS, STAR, and UDS tracking', link: '/products-ai-agents' },
          { name: 'Analytics Dashboard', desc: 'Quality measure performance insights', link: '/products-analytics' }
        ]
      },
      rec_carecoord: {
        msg: "For Care Coordination, I recommend:",
        recs: [
          { name: 'Referral Coordinator Agent', desc: 'AI-managed referral tracking', link: '/products-ai-agents' },
          { name: 'Post-Discharge Follow-Up', desc: 'Automated TCM outreach', link: '/products-ai-agents-post-discharge' },
          { name: 'Care Plans', desc: 'Collaborative care plan management', link: '/products-care-plans' }
        ]
      },
      rec_network: {
        msg: "For Provider Network Optimization, I recommend:",
        recs: [
          { name: 'Analytics Dashboard', desc: 'Provider performance scorecards', link: '/products-analytics' },
          { name: 'Data Platform', desc: 'Network-wide data aggregation', link: '/products-data-platform' },
          { name: 'Health Plans Solution', desc: 'Purpose-built for payer needs', link: '/solutions-health-plans' }
        ]
      },
      rec_patient_engage: {
        msg: "For Patient Communication & Engagement, I recommend:",
        recs: [
          { name: 'ZynReminder Agent', desc: 'Smart appointment reminders', link: '/products-ai-agents-zynreminder' },
          { name: 'ZynAfterHours Agent', desc: '24/7 patient triage & messaging', link: '/products-ai-agents-zynafterhours' },
          { name: 'Care Plans', desc: 'AI-powered care coordination', link: '/products-care-plans' }
        ]
      },
      rec_afterhours: {
        msg: "For After-Hours & Triage, I recommend:",
        recs: [
          { name: 'ZynAfterHours & Triage', desc: 'AI-powered 24/7 patient triage', link: '/products-ai-agents-zynafterhours' },
          { name: 'ZynReminder', desc: 'Next-day follow-up automation', link: '/products-ai-agents-zynreminder' }
        ]
      }
    };

    // Build chat widget HTML
    var chatHTML = '<div id="zynix-chat-widget" style="position:fixed;bottom:24px;right:24px;z-index:10000;font-family:\'Funnel Sans\',Helvetica,Arial,sans-serif;">' +
      '<div id="zynix-chat-bubble" style="width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#20449B,#F16529);cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(32,68,155,0.4);transition:transform 0.3s;">' +
        '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>' +
      '</div>' +
      '<div id="zynix-chat-panel" style="display:none;position:absolute;bottom:72px;right:0;width:380px;max-height:520px;background:#101d35;border-radius:16px;box-shadow:0 8px 40px rgba(0,0,0,0.4);overflow:hidden;border:1px solid rgba(255,255,255,0.1);">' +
        '<div style="background:linear-gradient(135deg,#20449B,#2a5cc7);padding:16px 20px;display:flex;align-items:center;justify-content:space-between;">' +
          '<div style="display:flex;align-items:center;gap:10px;">' +
            '<img src="' + IMG.symbol + '" alt="" style="height:28px;width:28px;border-radius:6px;">' +
            '<div><div style="color:white;font-weight:700;font-size:15px;">Zynix AI Assistant</div><div style="color:rgba(255,255,255,0.7);font-size:11px;">Powered by ZynixLLM</div></div>' +
          '</div>' +
          '<button id="zynix-chat-close" style="background:none;border:none;color:white;cursor:pointer;font-size:20px;padding:0;line-height:1;">&times;</button>' +
        '</div>' +
        '<div id="zynix-chat-body" style="padding:16px;overflow-y:auto;max-height:400px;"></div>' +
      '</div>' +
    '</div>';

    // Inject into DOM
    var chatContainer = document.createElement('div');
    chatContainer.innerHTML = chatHTML;
    document.body.appendChild(chatContainer.firstChild);

    var bubble = document.getElementById('zynix-chat-bubble');
    var panel = document.getElementById('zynix-chat-panel');
    var closeBtn = document.getElementById('zynix-chat-close');
    var chatBody = document.getElementById('zynix-chat-body');
    var isOpen = false;

    function toggleChat() {
      isOpen = !isOpen;
      panel.style.display = isOpen ? 'block' : 'none';
      bubble.style.transform = isOpen ? 'scale(0.9)' : 'scale(1)';
    }

    bubble.addEventListener('click', function() {
      toggleChat();
      if (isOpen && chatBody.innerHTML === '') {
        renderStep('start');
      }
    });
    closeBtn.addEventListener('click', toggleChat);

    // Hover pulse on bubble
    bubble.addEventListener('mouseenter', function() { bubble.style.transform = 'scale(1.1)'; });
    bubble.addEventListener('mouseleave', function() { if (!isOpen) bubble.style.transform = 'scale(1)'; });

    function renderStep(stepId) {
      var step = AGENT_FLOWS[stepId];
      if (!step) return;

      var html = '<div style="margin-bottom:12px;">' +
        '<div style="background:rgba(32,68,155,0.15);border-radius:12px;padding:12px 16px;font-size:14px;color:#e8eaf0;line-height:1.5;">' +
          step.msg +
        '</div>' +
      '</div>';

      if (step.options) {
        html += '<div style="display:flex;flex-direction:column;gap:8px;">';
        step.options.forEach(function(opt) {
          if (opt.link) {
            var href = opt.link.startsWith('http') ? opt.link : opt.link;
            var target = opt.link.startsWith('http') ? ' target="_blank"' : '';
            html += '<a href="' + href + '"' + target + ' style="display:block;padding:10px 14px;border:1px solid rgba(255,255,255,0.1);border-radius:10px;font-size:13px;color:#94a3b8;text-decoration:none;transition:all 0.2s;cursor:pointer;background:rgba(255,255,255,0.04);" onmouseover="this.style.background=\'rgba(32,68,155,0.2)\';this.style.borderColor=\'rgba(32,68,155,0.5)\';this.style.color=\'#e8eaf0\'" onmouseout="this.style.background=\'rgba(255,255,255,0.04)\';this.style.borderColor=\'rgba(255,255,255,0.1)\';this.style.color=\'#94a3b8\'">' + opt.label + '</a>';
          } else {
            html += '<button class="zynix-chat-opt" data-next="' + opt.next + '" style="display:block;width:100%;text-align:left;padding:10px 14px;border:1px solid rgba(255,255,255,0.1);border-radius:10px;font-size:13px;color:#94a3b8;background:rgba(255,255,255,0.04);cursor:pointer;transition:all 0.2s;" onmouseover="this.style.background=\'rgba(32,68,155,0.2)\';this.style.borderColor=\'rgba(32,68,155,0.5)\';this.style.color=\'#e8eaf0\'" onmouseout="this.style.background=\'rgba(255,255,255,0.04)\';this.style.borderColor=\'rgba(255,255,255,0.1)\';this.style.color=\'#94a3b8\'">' + opt.label + '</button>';
          }
        });
        html += '</div>';
      }

      if (step.recs) {
        html += '<div style="display:flex;flex-direction:column;gap:10px;margin-top:4px;">';
        step.recs.forEach(function(rec) {
          var href = rec.link.startsWith('http') ? rec.link : rec.link;
          var target = rec.link.startsWith('http') ? ' target="_blank"' : '';
          html += '<a href="' + href + '"' + target + ' style="display:block;padding:14px 16px;border:1px solid rgba(255,255,255,0.1);border-radius:12px;text-decoration:none;transition:all 0.2s;background:rgba(255,255,255,0.04);" onmouseover="this.style.background=\'rgba(32,68,155,0.2)\';this.style.borderColor=\'rgba(32,68,155,0.5)\'" onmouseout="this.style.background=\'rgba(255,255,255,0.04)\';this.style.borderColor=\'rgba(255,255,255,0.1)\'">' +
            '<div style="font-weight:600;color:#F16529;font-size:14px;margin-bottom:2px;">' + rec.name + ' →</div>' +
            '<div style="color:#666;font-size:12px;line-height:1.4;">' + rec.desc + '</div>' +
          '</a>';
        });
        html += '</div>';
        // Add restart + demo buttons
        html += '<div style="display:flex;gap:8px;margin-top:12px;">' +
          '<button class="zynix-chat-opt" data-next="start" style="flex:1;padding:10px;border:1px solid #e0e4f0;border-radius:10px;font-size:12px;color:#666;background:white;cursor:pointer;">↩ Start Over</button>' +
          '<a href="' + CALENDLY + '" target="_blank" style="flex:1;padding:10px;border:none;border-radius:10px;font-size:12px;color:white;background:#F16529;cursor:pointer;text-decoration:none;text-align:center;font-weight:600;">📅 Book a Demo</a>' +
        '</div>';
      }

      chatBody.innerHTML = html;

      // Bind option buttons
      chatBody.querySelectorAll('.zynix-chat-opt').forEach(function(btn) {
        btn.addEventListener('click', function() {
          renderStep(btn.getAttribute('data-next'));
        });
      });
    }

    // Auto-show after 30s on first visit
    var chatShown = sessionStorage.getItem('zynix_chat_shown');
    if (!chatShown) {
      setTimeout(function() {
        if (!isOpen) {
          // Subtle pulse animation
          bubble.style.animation = 'zynixPulse 2s ease-in-out 3';
          // Show preview tooltip
          var tooltip = document.createElement('div');
          tooltip.id = 'zynix-chat-tooltip';
          tooltip.innerHTML = '👋 Need help finding the right solution?';
          tooltip.style.cssText = 'position:absolute;bottom:68px;right:0;background:#101d35;padding:10px 16px;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.1);font-size:13px;color:#e8eaf0;white-space:nowrap;cursor:pointer;';
          document.getElementById('zynix-chat-widget').appendChild(tooltip);
          tooltip.addEventListener('click', function() {
            tooltip.remove();
            toggleChat();
            renderStep('start');
          });
          // Auto-hide tooltip after 8s
          setTimeout(function() {
            if (tooltip.parentElement) tooltip.remove();
          }, 8000);
          sessionStorage.setItem('zynix_chat_shown', '1');
        }
      }, 30000);
    }
  }

  // Initialize chatbot after page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initZynixAgent);
  } else {
    setTimeout(initZynixAgent, 1000);
  }

})();
