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
    '/case-studies/palm-beach-aco': { title: 'Palm Beach ACO Case Study | Zynix AI', desc: 'Palm Beach ACO achieved 85% TCM contact rates, 40% gap closure improvement, and 3x AWV lift using Zynix AI. Read the full value-based care case study results.', img: IMG.care, schema: 'Article', datePublished: '2026-02-01' },
    // V7: Platform + Agent Pages
    '/platform': { title: 'Zynix Intelligent Platform (ZIP) | Zynix AI', desc: 'The unified AI operating system for value-based care. Data foundation, intelligence engine, agent orchestration, and deployable care plans in one platform.', schema: 'Product' },
    '/agents': { title: 'AI Agents for Healthcare | Zynix AI', desc: 'Twelve purpose-built AI agents that automate care coordination, outreach, triage, scheduling, documentation, and prior auth. Over 1M patient interactions across 30 states.', schema: 'Product' },
    '/agents/clinical-performance': { title: 'Clinical Performance AI Agents | Zynix AI', desc: 'AI agents for chronic care management, transitions of care, preventive activation, AWV outreach, and SDoH determination.', schema: 'Product' },
    '/agents/predictive-activation': { title: 'Predictive Activation AI Agents | Zynix AI', desc: 'AI agents that predict readmission risk, identify rising-risk patients, and trigger proactive outreach before clinical events occur.', schema: 'Product' },
    '/agents/operational-efficiency': { title: 'Operational Efficiency AI Agents | Zynix AI', desc: 'AI agents for after-hours triage, scheduling, prior authorization, referral management, and fax processing.', schema: 'Product' },
    '/agents/chronic-care-management': { title: 'Chronic Care Management AI Agent | Zynix AI', desc: 'Automate CCM workflows with AI-driven medication adherence tracking, risk-tiered outreach, and care plan reinforcement.', schema: 'Product' },
    '/agents/transitions-of-care': { title: 'Transitions of Care AI Agent | Zynix AI', desc: 'Automate post-discharge follow-up, medication reconciliation, and readmission prevention with 85%+ contact rates.', schema: 'Product' },
    '/agents/preventive-quality-activation': { title: 'Preventive & Quality Activation Agents | Zynix AI', desc: 'AI agents for AWV outreach, appointment reminders, vaccination scheduling, and HEDIS quality gap closure.', schema: 'Product' },
    '/agents/operational-efficiency/zynafterhours-triage': { title: 'ZynAfterHours AI Triage | Zynix AI', desc: '24/7 AI-powered after-hours call handling with 97.3% triage accuracy in 15+ languages.', schema: 'Product' },
    '/agents/operational-efficiency/zynschedule': { title: 'ZynSchedule AI Scheduling | Zynix AI', desc: 'Always-on AI appointment scheduling that reduces no-shows by 40% and books patients 24/7.', schema: 'Product' },
    '/agents/preventive-quality-activation/zynreminder': { title: 'ZynReminder AI Appointment Reminders | Zynix AI', desc: 'Smart two-way appointment reminders that reduce no-shows by 40%.', schema: 'Product' },
    '/agents/chronic-care-management/chronic-disease-monitoring': { title: 'Chronic Disease Monitoring | Zynix AI', desc: 'Continuous AI-powered chronic disease monitoring with symptom tracking and escalation workflows.', schema: 'Product' },
    '/agents/preventive-quality-activation/awv-outreach': { title: 'AWV Outreach AI Agent | Zynix AI', desc: 'Automate Annual Wellness Visit identification, outreach, scheduling, and completion tracking.', schema: 'Product' },
    '/agents/sdoh-determination': { title: 'SDoH Determination AI Agent | Zynix AI', desc: 'Screen patients for social determinants of health and route to community resources.', schema: 'Product' },
    '/zynscribe': { title: 'ZynScribe AI Clinical Documentation | Zynix AI', desc: 'Ambient AI documentation that captures clinical encounters and generates structured SOAP notes in seconds.', schema: 'Product' },
    '/care-plans': { title: 'Deployable Care Plans | Zynix AI', desc: 'AI-orchestrated care plans that coordinate agents across TCM, CCM, AWV, and gap closure workflows.', schema: 'Product' },
    '/solutions/zynix-data-analytics': { title: 'Zynix Data Analytics | Zynix AI', desc: 'AI-powered population health analytics with HCC gap closure, risk stratification, and HEDIS quality tracking.', schema: 'Product' },
    // V7: Audience Pages
    '/who-we-serve/health-systems': { title: 'AI Care Coordination for Health Systems | Zynix AI', desc: 'Zynix AI helps health systems close the gap between care management strategy and execution at scale.', schema: 'Product' },
    '/who-we-serve/acos-msos': { title: 'AI for MSSP ACOs and MSOs | Zynix AI', desc: 'Zynix AI helps MSSP ACOs close the gap between care management analytics and execution.', schema: 'Product' },
    '/who-we-serve/health-plans': { title: 'AI for Medicare Advantage Plans | Zynix AI', desc: 'Zynix AI helps Medicare Advantage plans close the gap between population analytics and member engagement.', schema: 'Product' },
    '/who-we-serve/independent-group-practices': { title: 'AI for Independent Group Practices | Zynix AI', desc: 'Zynix AI helps independent physician groups handle after-hours triage, scheduling, CCM billing, and prior auth.', schema: 'Product' },
    '/who-we-serve/ascs': { title: 'AI Workflow Automation for ASCs | Zynix AI', desc: 'Zynix AI helps ASCs streamline prior authorization, referral intake, OR scheduling, and post-procedure follow-up.', schema: 'Product' },
    '/who-we-serve/fqhcs': { title: 'AI Care Coordination for FQHCs | Zynix AI', desc: 'Zynix AI helps FQHCs reach multilingual and high-barrier populations with AI care coordination.', schema: 'Product' },
    // V7: Company Pages
    '/company/zynixllm': { title: 'ZynixLLM Healthcare-Native AI | Zynix AI', desc: 'ZynixLLM is the healthcare-native intelligence layer powering the Zynix AI platform.', schema: 'Product' },
    '/security': { title: 'Security & Compliance | Zynix AI', desc: 'Zynix AI is SOC 2 Type II certified and HIPAA-aligned. Enterprise-grade security for healthcare AI deployments.', schema: 'Organization' },
    '/press': { title: 'Press | Zynix AI', desc: 'Press resources, media kit, and contact information for journalists covering Zynix AI.', schema: 'Organization', noindex: true },
    '/newsroom': { title: 'Press | Zynix AI', desc: 'Press resources, media kit, and contact information for journalists covering Zynix AI.', schema: 'Organization', noindex: true },
    '/careers': { title: 'Careers | Zynix AI', desc: 'Join the team building the AI operating system for value-based healthcare.', schema: 'Organization', noindex: true },
    '/resources/blog': { title: 'Blog | Healthcare AI Insights | Zynix AI', desc: 'Expert healthcare AI insights on value-based care and population health from the Zynix AI team.', schema: 'Organization' },
    '/resources/faq': { title: 'FAQ | Zynix AI', desc: 'Find answers about the Zynix healthcare AI platform, HIPAA compliance, EHR integration, and pricing.', schema: 'FAQPage' },
    '/resources/glossary': { title: 'Healthcare AI Glossary | Zynix AI', desc: 'Browse the complete healthcare AI glossary covering value-based care and compliance terms.', schema: 'Organization' },
    '/resources/webinars': { title: 'Webinars & Events | Zynix AI', desc: 'Upcoming and on-demand webinars on healthcare AI and value-based care from Zynix AI experts.', schema: 'Organization', noindex: true },
    '/resources/whitepapers': { title: 'Whitepapers & Reports | Zynix AI', desc: 'Download research on healthcare AI and value-based care outcomes from Zynix AI.', schema: 'Organization', noindex: true },
    '/case-studies/pbaco': { title: 'Palm Beach ACO Case Study | Zynix AI', desc: 'Palm Beach ACO achieved 85% TCM contact rates and 40% gap closure improvement using Zynix AI.', schema: 'Article', datePublished: '2026-02-01' },
    // V7: Use Case Pages (SEO populated dynamically from USE_CASE_SEO)
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
      '<div class="zynix-footer-col"><h4>SOLUTIONS</h4><a href="/platform">Platform</a><a href="/solutions/zynix-data-analytics">Data Analytics</a><a href="/agents">AI Agents</a><a href="/zynscribe">ZynScribe</a><a href="/care-plans">Care Plans</a><a href="/company/zynixllm">ZynixLLM</a></div>' +
      '<div class="zynix-footer-col"><h4>WHOM WE SERVE</h4><a href="/who-we-serve/health-systems">Health Systems</a><a href="/who-we-serve/acos-msos">ACOs &amp; MSOs</a><a href="/who-we-serve/health-plans">Health Plans</a><a href="/who-we-serve/independent-group-practices">Group Practices</a><a href="/who-we-serve/ascs">ASCs</a><a href="/who-we-serve/fqhcs">FQHCs</a></div>' +
      '<div class="zynix-footer-col"><h4>COMPANY</h4><a href="/about">About</a><a href="/newsroom">Newsroom</a><a href="/careers">Careers</a><a href="/security">Security</a><a href="/contact">Contact</a></div>' +
      '<div class="zynix-footer-col"><h4>RESOURCES</h4><a href="/case-studies">Case Studies</a><a href="/resources/blog">Blog</a><a href="/resources/faq">FAQ</a><a href="/resources/webinars">Webinars</a><a href="/resources/whitepapers">Whitepapers</a><a href="/privacy-policy">Privacy</a><a href="/terms-of-service">Terms</a></div>' +
      '</div>' +
      '<div class="zynix-footer-compliance">' +
      '<div class="zynix-compliance-badge"><div class="zynix-compliance-icon">' + SVG_HIPAA + '</div><div><strong>HIPAA</strong><span>Compliant</span></div></div>' +
      '<div class="zynix-compliance-badge"><div class="zynix-compliance-icon">' + SVG_SOC2 + '</div><div><strong>SOC 2</strong><span>Type II Certified</span></div></div>' +
      '<div class="zynix-compliance-badge"><div class="zynix-compliance-icon">' + SVG_HITRUST + '</div><div><strong>HITRUST</strong><span>CSF Ready</span></div></div>' +
      '<div class="zynix-compliance-badge"><div class="zynix-compliance-icon">' + SVG_GDPR + '</div><div><strong>GDPR</strong><span>Compliant</span></div></div>' +
      '</div>' +
      '<div class="zynix-footer-bottom"><p>&copy; 2026 Zynix AI. All rights reserved. &middot; <a href="/privacy-policy">Privacy Policy</a> &middot; <a href="/terms-of-service">Terms of Service</a> &middot; <a href="/security">Security</a></p></div></footer>';
  }

  function renderCTA(title, subtitle, btnText) {
    return '<section class="zynix-cta-section"><div class="zynix-container">' +
      '<h2>' + (title || 'See Zynix in Action') + '</h2>' +
      '<p>' + (subtitle || 'Join the healthcare organizations already transforming care with AI-powered intelligence.') + '</p>' +
      '<div class="zynix-cta-btns">' +
      '<a href="' + CALENDLY + '" class="zynix-btn-primary" target="_blank">' + (btnText || 'Request a Demo') + ' &rarr;</a>' +
      '<a href="/security" class="zynix-btn-secondary">Security & Compliance</a>' +
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
      '<span class="zynix-hero-badge">&#128737; HIPAA Compliant</span>' +
      '<span class="zynix-hero-badge">&#128274; SOC 2 Type II</span>' +
      '<span class="zynix-hero-badge">&#9989; HITRUST Ready</span>' +
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
      'An integrated platform where AI agents work together like a coordinated workforce — delivering measurable patient and financial outcomes at scale.',
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
    '<div class="zynix-arch-card fade-in-up" style="border-left:4px solid #fddbc8"><div class="zynix-arch-num">03</div><h3>Execution</h3><p>Complete work that normally sits on staff worklists — calls, documentation, triage, and care coordination.</p></div>' +
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
      { icon: '&#128300;', title: 'Risk Stratification', desc: 'Predictive modeling to identify high-risk patients before crisis — enabling proactive intervention.' }
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
      'The unified healthcare data layer that ingests, cleans, normalizes, and organizes data from every clinical and administrative source — in real time.',
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
    '<div class="zynix-data-layer fade-in-up"><h3>&#9889; Real-Time Feeds</h3><p>EHR APIs, HL7/FHIR feeds, claims (837/835), ADT streams, labs, pharmacy, SDOH, scheduling, and financial data — all flowing in real time.</p></div>' +
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
      'AI-powered analytics that go beyond dashboards. Identify HCC opportunities, predict risk, close quality gaps, and support clinical decisions — all in real time.',
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
    '<p>Intelligent scheduling that books appointments through calls, texts, and chat — matching patients with available slots and managing cancellations.</p>' +
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
    '<p>Automated prior authorization submission, tracking, denial management, and expiration alerts — eliminating the admin burden.</p>' +
    '<div class="zynix-agent-metrics"><span>75%+ Time Reduction</span><span>$20+ Saved Per Auth</span></div></div>' +

    '<div class="zynix-agent-card fade-in-up">' +
    '<div class="zynix-agent-header"><span class="zynix-agent-icon">&#128138;</span><h3>ZynPharmacy</h3></div>' +
    '<p>Automated discrepancy detection, drug interaction checking, and adherence assessment with clinical team alerts.</p>' +
    '<div class="zynix-agent-metrics"><span>95%+ Accuracy</span><span>50-70% Time Reduction</span></div></div>' +

    '</div></div></section>' +

    '<section class="zynix-orchestration-section"><div class="zynix-container">' +
    '<span class="zynix-tag">ORCHESTRATION</span>' +
    '<h2>Agents That Work Together</h2>' +
    '<p class="zynix-section-sub">Zynix agents don\u2019t operate in silos. They hand off tasks, share context, and coordinate across workflows — just like a high-performing care team.</p>' +
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
      'Transform patient encounters into accurate documentation instantly. AI-powered transcription that generates precise SOAP notes in seconds — so you can focus on patients, not paperwork.',
      IMG.scribe, 'ZynScribe Ambient AI') +

    renderProblemSection('The Documentation Crisis', [
      { icon: '&#128337;', title: '2 Hours Per 1 Hour', desc: 'Physicians spend 2 hours on documentation for every 1 hour with patients. That\u2019s backwards.' },
      { icon: '&#128564;', title: '16 Min Pajama Time', desc: '16 minutes of after-hours documentation every night. Burnout isn\u2019t a mystery — it\u2019s a math problem.' },
      { icon: '&#128148;', title: '63% Report Burnout', desc: 'The #1 driver of physician dissatisfaction is documentation burden. ZynScribe eliminates it.' }
    ]) +

    '<section class="zynix-capabilities-section" id="capabilities"><div class="zynix-container">' +
    '<span class="zynix-tag">CAPABILITIES</span>' +
    '<h2>How ZynScribe Works</h2>' +
    renderFeatureCards([
      { icon: '&#127908;', title: 'Ambient Capture', desc: 'Captures natural conversation between clinician and patient without interruption. Works in any clinical setting.' },
      { icon: '&#128101;', title: 'Multi-Speaker Recognition', desc: 'Handles conversations with patients, family members, interpreters, and other care team members with accurate voice distinction.' },
      { icon: '&#128196;', title: 'Automated Note Generation', desc: 'Generates SOAP notes, H&P, progress notes, and procedure notes automatically — organized, compliant, ready for review.' },
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
      'The orchestration layer atop Zynix OS. Takes insights from the Data Platform and executes through coordinated AI agents — seamlessly handing off tasks from one agent to the next.',
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
      'The foundation model purpose-built for medicine. Not a retrofit of general-purpose AI — every component is designed for medical intelligence, clinical safety, and real-world care delivery.',
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
    '<li>Certainty calibration — flags uncertainty</li>' +
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
      { icon: '&#9881;', title: 'AI-Enabled Workflows', desc: 'Not just intelligent — operationalized. Powers agents that call, schedule, close gaps, and document visits.' },
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
    '<h2>Healthcare AI Deployment Built for Your Infrastructure</h2>' +
    renderFeatureCards([
      { icon: '&#9729;', title: 'Cloud-Hosted (Zynix Cloud)', desc: 'Fully managed healthcare AI deployment on HIPAA-compliant, SOC 2 Type II certified infrastructure. Automatic updates, managed scaling, and 99.9% uptime SLA. Zero infrastructure overhead.' },
      { icon: '&#128274;', title: 'Private Cloud (AWS / Azure / GCP)', desc: 'Dedicated ZynixLLM instance deployed within your VPC. Private cloud healthcare AI with customer-managed encryption keys, full network isolation, and complete data residency control.' },
      { icon: '&#127970;', title: 'On-Premises', desc: 'Deploy the complete on-premises healthcare LLM stack in your own data center. Air-gapped medical AI option available for facilities requiring zero external network connectivity. PHI never leaves your physical infrastructure.' },
      { icon: '&#128260;', title: 'Hybrid', desc: 'Cloud orchestration with on-premises inference for HIPAA compliant AI deployment. Non-sensitive workloads in the cloud, clinical inference on-site. Sensitive patient data never leaves the facility.' }
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
        { icon: '&#128196;', title: 'Deployable Care Plans', desc: 'Standardized, evidence-based care plans deployed across your entire ACO network — from discharge to follow-up.' },
        { icon: '&#128202;', title: 'Analytics Platform', desc: 'Real-time visibility into performance metrics, shared savings progress, and population health across all providers.' },
        { icon: '&#129302;', title: 'AI Agent Suite', desc: 'Autonomous agents orchestrate care coordination, appointment scheduling, and patient engagement at scale.' },
        { icon: '&#128268;', title: 'Unified Data Platform', desc: 'Unified data integration across providers, payers, and EHRs — a single source of truth for your ACO.' },
        { icon: '&#127963;', title: 'CMS ACCESS Model Ready', desc: 'Purpose-built support for the CMS ACCESS model (Advancing All-Payer Health Equity Approaches and Development). Zynix enables health equity measurement across diverse payer mixes, multi-payer alignment for quality reporting, population health management for underserved communities, and SDoH-integrated care coordination — meeting ACCESS requirements for all-payer health equity approaches in value-based care.' }
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
        { icon: '&#129302;', title: 'AI Agent Suite', desc: 'Autonomous agents handle member outreach, appointment scheduling, and follow-up — reaching 85%+ of members.' },
        { icon: '&#128300;', title: 'Risk Stratification', desc: 'Predictive models identify members most likely to benefit from intervention — before they become high-cost.' },
        { icon: '&#127963;', title: 'CMS ACCESS Model Ready', desc: 'Built-in support for the CMS ACCESS model (Advancing All-Payer Health Equity Approaches and Development). Enable all-payer health equity measurement, multi-payer quality reporting alignment, population health management across diverse payer mixes, and SDoH-driven member engagement strategies that meet ACCESS program requirements.' }
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
        { icon: '&#128203;', title: 'Prior Auth Delays', desc: 'Lengthy approval processes delay surgeries and block OR capacity — costing revenue every day.' },
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
      'Purpose-built AI for medicine. Not another tool \u2014 an operating system that transforms how healthcare organizations deliver care at scale.',
      IMG.patients, 'Zynix AI Team') +

    '<section class="zynix-manifesto-section"><div class="zynix-container">' +
    '<span class="zynix-tag">OUR MANIFESTO</span>' +
    '<h2>Healthcare Is Broken, But Not For The Reason You Think</h2>' +
    '<p class="zynix-section-sub">The gap isn\u2019t knowledge — it\u2019s execution. Every organization knows who needs care. The problem is delivering that care at scale, consistently, across every patient.</p>' +
    '<div class="zynix-about-quote fade-in-up"><blockquote>\u201cZynix is not about replacing doctors. It\u2019s about multiplying the impact of every person in healthcare — so the system works for patients, not against them.\u201d</blockquote></div>' +
    '</div></section>' +

    '<section class="zynix-capabilities-section"><div class="zynix-container">' +
    '<span class="zynix-tag">WHY WE EXIST</span>' +
    '<h2>Why Healthcare Needs Its Own AI</h2>' +
    renderFeatureCards([
      { icon: '&#129504;', title: 'Clinical Reasoning Engine', desc: 'Built on real medical conversations and protocols — not internet data. Understands medicine at its core.' },
      { icon: '&#128737;', title: 'Safety Constellation', desc: 'Multi-layer safety woven into every output. Protocol validation, uncertainty detection, human escalation.' },
      { icon: '&#127919;', title: 'Certainty Calibration', desc: 'Knows what it doesn\u2019t know. Flags uncertainty explicitly and escalates to human clinicians when needed.' },
      { icon: '&#128064;', title: 'Multimodal Understanding', desc: 'Processes text, structured data, clinical workflows, EHR records, and imaging notes in unified context.' }
    ]) +
    '</div></section>' +

    '<section class="zynix-mission-section"><div class="zynix-container">' +
    '<span class="zynix-tag">MISSION & VISION</span>' +
    '<h2>What We\u2019re Building Toward</h2>' +
    '<div class="zynix-compare-grid">' +
    '<div class="zynix-compare-card zynix-compare-good fade-in-up"><h3>Our Mission</h3><p style="font-size:16px;line-height:1.8">To transform healthcare operations by building the AI operating system that turns insight into action — enabling every organization to deliver the right care, to the right patient, at the right time.</p></div>' +
    '<div class="zynix-compare-card zynix-compare-good fade-in-up"><h3>Our Vision</h3><p style="font-size:16px;line-height:1.8">A world where healthcare\u2019s intelligence gap is closed — where AI handles the operational complexity so human caregivers can focus entirely on what they do best: caring for patients.</p></div>' +
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
      { q: 'What is Zynix AI?', a: 'Zynix is the AI operating system for value-based healthcare. It unifies data, analytics, and autonomous AI agents into a single platform that turns insight into action — at scale.' },
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
        // 1. Platform & Solutions — merged mega panel
        '<div class="zynix-nav-dropdown"><button class="zynix-nav-trigger">Platform <span class="chevron">&#9662;</span></button>' +
        '<div class="zynix-mega-panel"><div class="zynix-mega-panel-inner">' +
          '<div class="zynix-mega-col"><h5>Platform Overview</h5>' +
            al('/platform','Zynix Intelligent Platform','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>','The AI Operating System for VBC') +
          '<h5 style="margin-top:16px">Data &amp; Documentation</h5>' +
            al('/solutions/zynix-data-analytics','Zynix Data Analytics','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>','Population health intelligence and gap closure') +
            al('/zynscribe','ZynScribe','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/></svg>','Ambient AI clinical documentation') +
            al('/care-plans','Deployable Care Plans','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>','Configurable evidence-based care workflows') +
          '</div>' +
          '<div class="zynix-mega-col"><h5>AI Agent Suite</h5>' +
            '<div class="zynix-mega-group"><h6>Clinical Performance</h6>' +
              al('/agents/clinical-performance','Clinical Performance Hub','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>','Clinical and quality agent overview') +
              al('/agents/chronic-care-management','Chronic Care Management','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg>','Longitudinal care automation') +
              al('/agents/transitions-of-care','Transitions of Care','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg>','Post-discharge and readmission prevention') +
              al('/agents/preventive-quality-activation','Preventive &amp; Quality Activation','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>','AWV, reminders, and gap closure') +
            '</div>' +
            '<div class="zynix-mega-group"><h6>Predictive Activation</h6>' +
              al('/agents/predictive-activation','Predictive Activation Hub','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>','Risk-based proactive outreach') +
            '</div>' +
            '<div class="zynix-mega-group"><h6>Operational Efficiency</h6>' +
              al('/agents/operational-efficiency','Operational Efficiency Hub','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33"/></svg>','Scheduling, triage, and prior auth') +
              al('/agents/operational-efficiency/zynafterhours-triage','ZynAfterHours &amp; Triage','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 5.18 2 2 0 0 1 5.11 3h3a2 2 0 0 1 2 1.72c.13.81.36 1.59.68 2.33a2 2 0 0 1-.45 2.11L9.09 10.41"/></svg>','24/7 AI-powered call handling') +
              al('/agents/operational-efficiency/zynschedule','ZynSchedule','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>','Inbound calls and smart scheduling') +
            '</div>' +
          '</div>' +
          '<div class="zynix-mega-col zynix-mega-featured">' +
            '<div class="zynix-mega-featured-card">' +
              '<h5>AI Agents Suite</h5>' +
              '<p>12 purpose-built AI agents for value-based care</p>' +
              '<a href="/agents" class="zynix-mega-featured-link">Explore All Agents &rarr;</a>' +
            '</div>' +
          '</div>' +
        '</div></div></div>' +
        // 3. Whom We Serve — mega panel (2 columns + featured)
        '<div class="zynix-nav-dropdown"><button class="zynix-nav-trigger">Whom We Serve <span class="chevron">&#9662;</span></button>' +
        '<div class="zynix-mega-panel"><div class="zynix-mega-panel-inner">' +
          '<div class="zynix-mega-col"><h5>By Organization</h5>' +
            al('/who-we-serve/health-systems','Health Systems','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="12" y1="6" x2="12" y2="12"/></svg>','Enterprise AI at scale') +
            al('/who-we-serve/acos-msos','ACOs &amp; MSOs','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>','Shared savings optimization') +
            al('/who-we-serve/health-plans','Health Plans','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>','Stars and HEDIS improvement') +
            al('/who-we-serve/independent-group-practices','Group Practices','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33"/></svg>','Reduce burnout and no-shows') +
            al('/who-we-serve/ascs','ASCs','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/></svg>','Surgical workflow AI') +
            al('/who-we-serve/fqhcs','FQHCs','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>','Community health AI') +
          '</div>' +
          '<div class="zynix-mega-col zynix-mega-featured">' +
            '<div class="zynix-mega-featured-card">' +
              '<h5>Use Cases</h5>' +
              '<p>30 real-world use cases across 6 care segments</p>' +
              '<a href="/who-we-serve/health-systems" class="zynix-mega-featured-link">Browse All Use Cases &rarr;</a>' +
            '</div>' +
            '<div class="zynix-mega-featured-card" style="margin-top:16px">' +
              '<h5>Case Study Spotlight</h5>' +
              '<p>See real outcomes from organizations using Zynix AI</p>' +
              '<a href="/case-studies" class="zynix-mega-featured-link">View Case Studies &rarr;</a>' +
            '</div>' +
          '</div>' +
        '</div></div></div>' +
        // 4. Company — narrow dropdown
        '<div class="zynix-nav-dropdown"><button class="zynix-nav-trigger">Company <span class="chevron">&#9662;</span></button>' +
        '<div class="zynix-dropdown-panel"><div class="zynix-dropdown-panel-inner">' +
          al('/about','About','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>') +
          al('/company/zynixllm','ZynixLLM','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>') +
          al('/newsroom','Newsroom','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/></svg>') +
          al('/careers','Careers','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>') +
          al('/security','Security','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>') +
          '<div class="zynix-dropdown-featured"><p>AI built for healthcare, by healthcare leaders.</p><a href="/about">Meet Our Leadership &rarr;</a></div>' +
        '</div></div></div>' +
        // 5. Resources — narrow dropdown
        '<div class="zynix-nav-dropdown"><button class="zynix-nav-trigger">Resources <span class="chevron">&#9662;</span></button>' +
        '<div class="zynix-dropdown-panel"><div class="zynix-dropdown-panel-inner">' +
          al('/case-studies','Case Studies','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>') +
          al('/resources/blog','Blog','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>') +
          al('/resources/webinars','Webinars &amp; Events','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>') +
          al('/resources/faq','FAQ','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>') +
          al('/resources/glossary','Glossary','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>') +
          al('/resources/whitepapers','Whitepapers','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>') +
          '<div class="zynix-dropdown-featured"><a href="' + CALENDLY + '" target="_blank">Request a Demo &rarr;</a></div>' +
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
      '<div class="zynix-mobile-section"><button class="zynix-mobile-section-trigger">Platform &#9662;</button><div class="zynix-mobile-section-links">' +
      '<a href="/platform"><strong>Zynix Intelligent Platform</strong></a>' +
      '<strong>Data &amp; Documentation</strong>' +
      '<a href="/solutions/zynix-data-analytics">Zynix Data Analytics</a><a href="/zynscribe">ZynScribe</a><a href="/care-plans">Deployable Care Plans</a>' +
      '<strong>AI Agents &mdash; Clinical Performance</strong>' +
      '<a href="/agents/clinical-performance">Clinical Performance Hub</a><a href="/agents/chronic-care-management">Chronic Care Management</a><a href="/agents/transitions-of-care">Transitions of Care</a><a href="/agents/preventive-quality-activation">Preventive &amp; Quality Activation</a>' +
      '<strong>AI Agents &mdash; Predictive</strong>' +
      '<a href="/agents/predictive-activation">Predictive Activation Hub</a>' +
      '<strong>AI Agents &mdash; Operational</strong>' +
      '<a href="/agents/operational-efficiency">Operational Efficiency Hub</a><a href="/agents/operational-efficiency/zynafterhours-triage">ZynAfterHours &amp; Triage</a><a href="/agents/operational-efficiency/zynschedule">ZynSchedule</a>' +
      '<a href="/agents" style="color:#F16529;font-weight:600;margin-top:8px;display:block">Explore All Agents &rarr;</a>' +
      '</div></div>' +
      '<div class="zynix-mobile-section"><button class="zynix-mobile-section-trigger">Whom We Serve &#9662;</button><div class="zynix-mobile-section-links">' +
      '<a href="/who-we-serve/health-systems">Health Systems</a><a href="/who-we-serve/acos-msos">ACOs &amp; MSOs</a><a href="/who-we-serve/health-plans">Health Plans</a><a href="/who-we-serve/independent-group-practices">Group Practices</a><a href="/who-we-serve/ascs">ASCs</a><a href="/who-we-serve/fqhcs">FQHCs</a></div></div>' +
      '<div class="zynix-mobile-section"><button class="zynix-mobile-section-trigger">Company &#9662;</button><div class="zynix-mobile-section-links">' +
      '<a href="/about">About</a><a href="/company/zynixllm">ZynixLLM</a><a href="/newsroom">Newsroom</a><a href="/careers">Careers</a><a href="/security">Security</a></div></div>' +
      '<div class="zynix-mobile-section"><button class="zynix-mobile-section-trigger">Resources &#9662;</button><div class="zynix-mobile-section-links">' +
      '<a href="/case-studies">Case Studies</a><a href="/resources/blog">Blog</a><a href="/resources/webinars">Webinars &amp; Events</a><a href="/resources/faq">FAQ</a><a href="/resources/glossary">Glossary</a><a href="/resources/whitepapers">Whitepapers</a></div></div>' +
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
    var html = renderInnerHero('AI AGENT', name + ' — ' + tagline, subtitle, image, name) +
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

    html += '<div style="text-align:center;padding:24px 0"><a href="/agents" style="color:#F16529;font-weight:600;font-size:14px">&larr; Back to All AI Agents</a></div>';
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
      'AI-powered patient engagement that handles inbound calls 24/7 — triaging symptoms, scheduling appointments, and diverting unnecessary ER visits.',
      IMG.doctor,
      [
        { icon: '&#128222;', title: '67% of Calls Abandoned', desc: 'After-hours calls go to voicemail. Patients give up and go to the ER — costing $1,500-3,000 per avoidable visit.' },
        { icon: '&#128176;', title: '$38 Billion Problem', desc: 'Nearly two-thirds of patients avoid care due to scheduling frustration. 30% of ER visits are non-emergent.' },
        { icon: '&#128101;', title: 'Staff Burnout', desc: 'Traditional nurse triage lines cost $15-25 per call and cannot scale. Human staff burn out and turn over.' }
      ],
      [
        { icon: '&#128138;', title: 'Intelligent Symptom Triage', desc: 'Evidence-based protocols (Schmitt-Thompson), real-time assessment, automatic escalation for high-acuity cases.' },
        { icon: '&#128197;', title: 'Smart Scheduling', desc: 'Books same-day and next-day appointments based on urgency and provider availability.' },
        { icon: '&#127973;', title: 'ER Diversion', desc: 'Identifies patients who can safely wait. Provides self-care guidance and routes to appropriate care level.' },
        { icon: '&#127760;', title: 'Multilingual Support', desc: '15+ languages including Spanish, Mandarin, Vietnamese, Tagalog, Korean — with no translation delays.' },
        { icon: '&#128101;', title: 'Warm Handoffs', desc: 'Seamless transfer to human staff with complete clinical context. No starting from scratch.' },
        { icon: '&#128196;', title: 'EHR Documentation', desc: 'Every interaction automatically logged with structured ICD-10 ready documentation.' }
      ],
      [
        { title: 'Patient calls in', desc: 'Inbound voice call received. EHR context loaded (demographics, medical history, medications).', tag: 'Input' },
        { title: 'Symptom assessment', desc: 'Natural language understanding of symptoms. Clinical decision support algorithms applied. Urgency scored 1-5.', tag: 'Processing' },
        { title: 'Disposition & action', desc: 'Real-time triage decision: self-care guidance, appointment booking, ER referral, or 911 instruction.', tag: 'Output' },
        { title: 'Documentation & follow-up', desc: 'Encounter note uploaded to EHR. Escalation alerts sent. Patient follow-up messages delivered.', tag: 'Documentation' }
      ],
      { title: '2:47 AM — Patient calls with chest discomfort', body: 'ZynAfterHours answers in 2 rings. Patient describes pressure in their chest for about an hour. The AI asks structured questions: location, radiation, shortness of breath, risk factors. Patient reports no radiation, no SOB, history of GERD, ate spicy food. Triage assessment: likely non-cardiac, but age/timing warrants evaluation. Action: same-day urgent care appointment scheduled. Red flag instructions provided. Complete encounter note documented in EHR. Total time: 4 minutes 23 seconds.' },
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
        { q: 'What happens during a real emergency?', a: 'The system recognizes emergency keywords and symptoms immediately. It connects to a live nurse or instructs the patient to call 911 — within seconds.' },
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
      { title: 'A patient needs a follow-up after abnormal labs', body: 'At 9 PM, a patient receives a message about abnormal lab results and needs to schedule a follow-up. ZynSchedule is available immediately — no waiting until morning. It identifies the urgency, finds the next available slot with the right provider, books the appointment, and sends confirmation with prep instructions. The patient sleeps knowing their follow-up is scheduled.' },
      [
        { value: '40%', label: 'No-Show Reduction' },
        { value: '24/7', label: 'Booking Availability' },
        { value: '3x', label: 'Scheduling Throughput' },
        { value: '95%+', label: 'Patient Satisfaction' }
      ],
      [
        { q: 'What scheduling systems do you integrate with?', a: 'Epic, Cerner, athenahealth, eClinicalWorks, NextGen, and all major EHRs via HL7/FHIR.' },
        { q: 'Can it handle complex scheduling rules?', a: 'Yes — provider preferences, appointment types, insurance verification, and multi-provider visits.' }
      ]
    );
  }

  // ── NEW PAGE: Post-Discharge Follow-Up ──
  function renderPostDischarge() {
    return renderAgentPage('Post-Discharge Follow-Up',
      'From Discharge to Recovery, Automatically',
      'AI-powered outreach that contacts every patient within 24-48 hours of discharge — confirming safe arrival, reviewing meds, and scheduling follow-ups.',
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
      { title: 'TCM Workflow: Patient discharged at 2:47 PM Tuesday', body: 'Minute 0: ADT feed hits Zynix. Minute 1: Patient record enriched with discharge diagnosis, medications, risk score. Minute 2: Risk model flags HIGH (82nd percentile readmission risk). Minute 5: TCM care plan auto-deployed. Hours 1-24: AI calls patient, confirms safe arrival, reviews meds, identifies confusion, escalates to pharmacist, schedules 7-day follow-up. Day 3: Appointment reminder sent. Day 5: Patient confirms via text. Day 7: Patient attends, TCM billing code captured. Day 30: Patient did NOT readmit — shared savings preserved. Total human involvement: pharmacist review (5 min), PCP visit (15 min). Everything else: automated.' },
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
      { title: 'Patient stops a new medication due to dizziness', body: 'The medication reconciliation agent discovers during a routine post-discharge call that the patient stopped their new blood pressure medication because of dizziness. The agent captures symptom severity, routes the case for clinician review, documents the medication change, and schedules a follow-up to confirm stability — rather than discovering the issue at an ED visit weeks later.' },
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
      'AI that reads, classifies, and routes faxes automatically — turning a paper-based bottleneck into a digital workflow.',
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
      { title: 'MRI prior auth delays a diagnosis', body: 'A clinician orders an MRI for back pain with concerning symptoms. ZynAuth flags missing documentation early — conservative therapy records needed. It assembles the clinical justification, submits to the payer portal, and tracks status. When additional information is requested, ZynAuth routes it as a task with an owner and deadline. Once approved, scheduling is triggered automatically. Result: weeks of delay reduced to days.' },
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
        { icon: '&#128196;', title: 'Documentation is Afterthought', desc: 'Teams do the work but fail to capture it cleanly — lost billing, poor audit readiness.' }
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
      'Turn gap identification into completed closures — labs done, visits completed, documentation aligned.',
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
        { icon: '&#128683;', title: 'Prep Barriers', desc: 'Colonoscopy prep confusion, mammogram scheduling difficulty — logistics kill compliance.' },
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
    '<p style="font-size:16px;line-height:1.7;color:var(--z-text-secondary);margin-bottom:24px">Join Zynix AI at the VBC Exhibit Hall to explore how AI-powered automation is helping ACOs scale patient engagement — from post-discharge follow-ups to preventive screenings — without adding staff burnout. Learn real strategies for balancing accountability and efficiency in value-based care.</p>' +
    '<a href="https://register.gotowebinar.com/register/6452881364816065371?source=Newsletter" class="zynix-btn-primary" target="_blank" rel="noopener">Register Now &rarr;</a>' +
    '</div></div>' +
    '</div></section>' +
    '<section class="zynix-section" style="background:var(--z-blue-light)">' +
    '<div class="zynix-container" style="text-align:center;max-width:800px">' +
    '<span class="zynix-tag">ACCESS & EMR CONNECTIVITY</span>' +
    '<h2 class="zynix-section-title">Zynix AI is Participating in ACCESS</h2>' +
    '<p class="zynix-section-sub" style="font-size:18px;line-height:1.7">Zynix AI is connected to all major EMRs and participating in ACCESS. If your organization wants to sign up for AI-powered care coordination, outbound patient engagement, or clinical documentation — we can connect directly to your existing systems.</p>' +
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
      '<p>Zynix unifies your clinical data, deploys AI agents, and automates outreach — so your team can focus on patients, not paperwork.</p>' +
      '<div class="zynix-hero-btns"><a href="' + CALENDLY + '" class="zynix-btn-primary" target="_blank">Request a Demo &rarr;</a><a href="#how-it-works" class="zynix-btn-secondary">See How It Works</a></div>' +
      '<div class="zynix-hero-trust">' +
      '<span class="zynix-hero-badge">&#128737; HIPAA Compliant</span>' +
      '<span class="zynix-hero-badge">&#128274; SOC 2 Type II</span>' +
      '<span class="zynix-hero-badge">&#9989; HITRUST Ready</span>' +
      '</div>' +
      '</div>' +
      '<div class="zynix-inner-hero-img"><img src="' + IMG.gifDashboard + '" alt="Zynix AI Healthcare Dashboard"></div>' +
      '</div></section>';

    // -- AEO SUMMARY (hidden meta for LLMs/screen readers, rendered as structured data not visible div) --

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
      '<p class="zynix-section-sub">Every organization has invested millions in analytics. The problem isn\u2019t knowing who needs care — it\u2019s delivering that care at scale.</p>' +
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
      '<div class="zynix-arch-card fade-in-up" style="border-left:4px solid #ccfdcf"><div class="zynix-arch-num">01</div><h3>AI Data Foundation</h3><p>Ingest, clean, and normalize data from every source \u2014 EHRs, claims, ADT, labs, pharmacy, SDOH \u2014 into one unified layer.</p></div>' +
      '<div class="zynix-arch-card fade-in-up" style="border-left:4px solid #cebffa"><div class="zynix-arch-num">02</div><h3>Intelligence &amp; Reasoning</h3><p>Predict, prioritize, and surface actionable insights — risk scores, gap worklists, clinical decision support.</p></div>' +
      '<div class="zynix-arch-card fade-in-up" style="border-left:4px solid #fddbc8"><div class="zynix-arch-num">03</div><h3>AI Agent Suite</h3><p>Specialized agents that take action: outreach, scheduling, triage, documentation, reminders, and follow-up.</p></div>' +
      '<div class="zynix-arch-card fade-in-up" style="border-left:4px solid #d7e9ff"><div class="zynix-arch-num">04</div><h3>Care Management</h3><p>Orchestrated workflows where agents collaborate on end-to-end care plans \u2014 TCM, AWV, gap closure, and more.</p></div>' +
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
      '<div class="zynix-feature-card fade-in-up"><div class="zynix-feature-icon">&#128203;</div><h3>Care Plans</h3><p>Deployable, orchestrated care plans for TCM, CCM, AWV, HEDIS, and HCC closure — executed by AI agents.</p><a href="/products-care-plans" class="zynix-card-link">Learn more &rarr;</a></div>' +
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

    // (AEO FAQ merged into main FAQ section below)

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

  // ── 301 REDIRECT MAP (v7 rebuild) ──
  var REDIRECTS = {
    // Old use case slugs → correct slugs
    '/use-cases/post-discharge-followup-health-systems': '/use-cases/post-discharge-follow-up',
    '/use-cases/hcc-gap-closure-health-systems': '/use-cases/hcc-gap-closure-health-system-aco',
    '/use-cases/after-hours-ed-diversion-aco': '/use-cases/after-hours-ed-diversion',
    '/use-cases/post-discharge-followup-acos': '/use-cases/post-discharge-tcm-readmission',
    '/use-cases/hcc-gap-closure-acos': '/use-cases/hcc-gap-raf-optimization',
    '/use-cases/after-hours-triage-health-systems': '/use-cases/after-hours-triage-multi-site',
    '/use-cases/prior-auth-health-systems': '/use-cases/prior-auth-high-volume-specialty',
    '/use-cases/physician-documentation-health-systems': '/use-cases/physician-documentation-ambient-ai',
    // Products → Platform / Solutions
    '/products-zynix-os': '/platform',
    '/products-data-platform': '/platform',
    '/products-analytics': '/solutions/zynix-data-analytics',
    '/products-ai-agents': '/agents',
    '/products-zynscribe': '/zynscribe',
    '/products-care-plans': '/care-plans',
    '/company-zynixllm': '/company/zynixllm',
    '/products-zynixllm': '/company/zynixllm',

    // AI Agent Detail Pages → Agents hierarchy
    '/products-ai-agents-zynafterhours': '/agents/operational-efficiency/zynafterhours-triage',
    '/products-ai-agents-zynschedule': '/agents/operational-efficiency/zynschedule',
    '/products-ai-agents-post-discharge': '/agents/transitions-of-care',
    '/products-ai-agents-med-rec': '/agents/clinical-performance',
    '/products-ai-agents-zynreminder': '/agents/preventive-quality-activation/zynreminder',
    '/products-ai-agents-zynfax': '/agents/operational-efficiency',
    '/products-ai-agents-zynauth': '/agents/operational-efficiency',

    // Solutions by Org Type → Who We Serve
    '/solutions-acos': '/who-we-serve/acos-msos',
    '/solutions-health-systems': '/who-we-serve/health-systems',
    '/solutions-fqhcs': '/who-we-serve/fqhcs',
    '/solutions-health-plans': '/who-we-serve/health-plans',
    '/solutions-independent-practices': '/who-we-serve/independent-group-practices',
    '/solutions-ascs': '/who-we-serve/ascs',

    // Solutions by Use Case → Use Cases CMS
    '/solutions-use-case-tcm': '/use-cases/post-discharge-follow-up',
    '/solutions-use-case-gap-closure': '/use-cases/hcc-gap-closure-health-system-aco',
    '/solutions-use-case-after-hours': '/use-cases/after-hours-triage-multi-site',
    '/solutions-use-case-prior-auth': '/use-cases/prior-auth-high-volume-specialty',
    '/solutions-use-case-preventive-screening': '/use-cases/preventive-screening-gap-fqhc',
    '/solutions-use-case-readmission-prevention': '/use-cases/post-discharge-tcm-readmission',

    // Company aliases
    '/company-about': '/about',
    '/company-careers': '/careers',
    '/company-press': '/press',
    '/trust-center': '/security',
    '/company-trust-center': '/security',

    // Resources (hyphen → slash)
    '/faq': '/resources/faq',
    '/resources-faq': '/resources/faq',
    '/blog': '/resources/blog',
    '/resources-blog': '/resources/blog',
    '/resources-blog-1m-patients': '/resources/blog/1m-patients',
    '/resources-case-studies': '/case-studies',
    '/resources-glossary': '/resources/glossary',
    '/resources-webinars': '/resources/webinars',
    '/resources-whitepapers': '/resources/whitepapers',

    // Legal aliases
    '/company-privacy': '/privacy-policy',
    '/company-terms': '/terms-of-service',

    // Comparison pages (retired)
    '/compare/zynix-vs-point-solutions': '/platform',
    '/compare/zynix-vs-innovaccer': '/platform',
    '/compare/zynix-vs-commure': '/platform',

    // Blog posts (blog/ → resources/blog/)
    '/blog/what-is-value-based-care-ai': '/resources/blog/what-is-value-based-care-ai',
    '/blog/how-ai-closes-care-gaps': '/resources/blog/how-ai-closes-care-gaps',
    '/blog/ai-agents-vs-chatbots-healthcare': '/resources/blog/ai-agents-vs-chatbots-healthcare',

    // Case studies
    '/case-studies/palm-beach-aco': '/case-studies/pbaco'
  };

  // ── PAGE ROUTER ──
  var path = window.location.pathname.replace(/\/$/, '').toLowerCase();

  // Check redirects first — replaceState mimics 301 for SPA
  if (REDIRECTS[path]) {
    window.history.replaceState(null, '', REDIRECTS[path]);
    path = REDIRECTS[path];
  }


  // ── V7 REBUILD: Use Case Pages ──────────────────────────────────────────

/* ============================================================
   Zynix AI v7 — Use Case Pages
   Template renderer, data objects (UC01–UC30), routes, SEO
   ============================================================ */

// ── Template B Renderer ─────────────────────────────────────
function renderUseCaseV7(data) {
  var html = '';

  var segLabel = (data.segments && data.segments.primary) ? data.segments.primary.toUpperCase() : 'USE CASE';
  html += renderInnerHero(segLabel, data.h1, data.subhead, IMG.care, data.title);

  html += '<section style="padding:80px 0"><div class="zynix-container" style="max-width:800px">' +
    '<span class="zynix-tag">THE PROBLEM</span>' +
    '<h2>' + data.problemHeading + '</h2>' +
    '<div style="font-size:16px;line-height:1.8;color:var(--z-text-secondary);margin-top:24px">' + data.problem + '</div>' +
    '</div></section>';

  html += '<section style="padding:80px 0;background:var(--z-bg-alt)"><div class="zynix-container">' +
    '<span class="zynix-tag">WHY CURRENT TOOLS FALL SHORT</span>' +
    '<h2>Where Existing Approaches Break Down</h2>' +
    '<div class="zynix-compare-grid" style="margin-top:40px">';
  for (var s = 0; s < data.shortfalls.length; s++) {
    html += '<div class="zynix-compare-card zynix-compare-bad fade-in-up">' +
      '<h3>&#9888; ' + data.shortfalls[s].tool + '</h3>' +
      '<p style="font-size:15px;line-height:1.7;color:var(--z-text-secondary);margin:0">' + data.shortfalls[s].description + '</p>' +
      '</div>';
  }
  html += '</div></div></section>';

  html += '<section style="padding:80px 0"><div class="zynix-container" style="max-width:800px">' +
    '<span class="zynix-tag">HOW ZYNIX AI FITS</span>' +
    '<h2>' + data.solutionHeading + '</h2>' +
    '<div style="font-size:16px;line-height:1.8;color:var(--z-text-secondary);margin-top:24px">' + data.solution + '</div>' +
    '</div></section>';

  html += '<section style="padding:80px 0;background:var(--z-bg-alt)"><div class="zynix-container">' +
    '<span class="zynix-tag">CAPABILITIES USED</span>' +
    '<h2>Platform Capabilities</h2>' +
    '<div class="zynix-feature-grid" style="margin-top:40px">';
  var prodIcons = ['&#129302;','&#128300;','&#128197;','&#128203;','&#9881;','&#128196;'];
  for (var p = 0; p < data.products.length; p++) {
    html += '<div class="zynix-feature-card fade-in-up">' +
      '<div class="zynix-feature-icon">' + (prodIcons[p] || '&#9881;') + '</div>' +
      '<h3>' + data.products[p].name + '</h3>' +
      '<p>' + data.products[p].descriptor + '</p>' +
      (data.products[p].status !== 'Available' ? '<div class="zynix-feature-metric"><span style="color:var(--z-accent)">' + data.products[p].status + '</span></div>' : '') +
      '<a href="' + data.products[p].url + '" class="zynix-card-link">Learn more &rarr;</a>' +
      '</div>';
  }
  html += '</div></div></section>';

  html += renderCTA(data.cta.headline, 'See how Zynix AI can transform this workflow for your organization.', data.cta.label);

  html += '<section style="padding:80px 0"><div class="zynix-container">' +
    '<span class="zynix-tag">EXPLORE MORE</span>' +
    '<h2>Related Use Cases</h2>' +
    '<div class="zynix-agents-grid" style="margin-top:40px">';
  var ucIcons = ['&#128196;','&#129302;','&#128300;'];
  for (var r = 0; r < data.readNext.length; r++) {
    html += '<a href="/use-cases/' + data.readNext[r].slug + '" class="zynix-agent-card fade-in-up" style="text-decoration:none;color:inherit;display:block">' +
      '<div class="zynix-agent-header"><span class="zynix-agent-icon">' + (ucIcons[r] || '&#128196;') + '</span><h3>' + data.readNext[r].title + '</h3></div>' +
      '<p style="color:var(--z-accent);font-weight:500;font-size:14px;margin-top:12px">View use case &rarr;</p>' +
      '</a>';
  }
  html += '</div></div></section>';

  html += renderFooter();
  return html;
}


function renderAudiencePageV7(data) {
  var html = '';

  html += renderInnerHero(data.eyebrow, data.headline, data.subhead, IMG.patients, data.audienceName);

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">THE CHALLENGE</span>' +
    '<h2>Key Challenges</h2>' +
    '<p class="zynix-section-sub">' + data.challengeIntro + '</p>' +
    '<div class="zynix-problem-grid">';
  for (var i = 0; i < data.challenges.length; i++) {
    html += '<div class="zynix-problem-card fade-in-up"><div class="zynix-problem-icon">&#9888;</div><h3>' + data.challenges[i].title + '</h3><p>' + data.challenges[i].body + '</p></div>';
  }
  html += '</div></div></section>';

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">HOW ZYNIX AI FITS</span>' +
    '<h2>Platform Capabilities</h2>' +
    '<p class="zynix-section-sub">' + data.fitIntro + '</p>' +
    '<div class="zynix-feature-grid">';
  for (var j = 0; j < data.capabilities.length; j++) {
    html += '<div class="zynix-feature-card fade-in-up"><div class="zynix-feature-icon">&#9889;</div><h3>' + data.capabilities[j].title + '</h3><p>' + data.capabilities[j].body + '</p></div>';
  }
  html += '</div></div></section>';

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">USE CASES</span>' +
    '<h2>Primary Use Cases</h2>' +
    '<div class="zynix-agents-grid">';
  for (var k = 0; k < data.primaryUseCases.length; k++) {
    var uc = data.primaryUseCases[k];
    html += '<div class="zynix-agent-card fade-in-up">' +
      '<div class="zynix-agent-header"><span class="zynix-agent-icon">' + String(k + 1).padStart(2, '0') + '</span><h3>' + uc.title + '</h3></div>' +
      '<p>' + uc.teaser + '</p>' +
      '<p><a href="' + uc.url + '">View use case &rarr;</a></p>' +
      '</div>';
  }
  html += '</div></div></section>';

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">FEATURED PLATFORM CAPABILITIES</span>' +
    '<h2>Products That Power This</h2>' +
    '<div class="zynix-feature-grid">';
  for (var n = 0; n < data.featuredProducts.length; n++) {
    var fp = data.featuredProducts[n];
    html += '<div class="zynix-feature-card fade-in-up"><div class="zynix-feature-icon">&#128300;</div><h3><a href="' + fp.url + '">' + fp.name + '</a></h3><p>' + fp.description + '</p></div>';
  }
  html += '</div></div></section>';

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">INDUSTRY CONTEXT</span>' +
    '<h2>What the Data Shows</h2>' +
    '<div class="zynix-data-layers">';
  for (var ci = 0; ci < data.citations.length; ci++) {
    var c = data.citations[ci];
    html += '<div class="zynix-data-layer fade-in-up"><h3>' + c.stat + '</h3><p>' + c.context + '</p>' +
      (c.sourceUrl ? '<p><small><a href="' + c.sourceUrl + '" target="_blank">' + c.sourceName + ' &#8599;</a></small></p>' : '<p><small><em>' + c.sourceName + '</em></small></p>') +
      '</div>';
  }
  html += '</div></div></section>';

  html += renderCTA(data.ctaHeadline, data.ctaSubline, data.ctaButton);
  html += renderFooter();
  return html;
}






// ── Use Case Data Objects ───────────────────────────────────

var USE_CASES = {};

/* ── UC01 ── */
USE_CASES.UC01 = {
  id: 'UC01',
  slug: 'post-discharge-follow-up',
  title: 'Post-Discharge Follow-Up at Scale',
  h1: 'Your care teams know which patients to worry about. The 24-hour window closes before most of them get a call.',
  subhead: 'Health systems discharging thousands of patients a month have a follow-up problem that is not solvable by working harder. The window that protects patients from readmission is 24 to 48 hours. The volume of discharges is not. Zynix AI closes the gap between who needs contact and who gets it.',
  problemHeading: 'The follow-up gap is a volume problem, not a staffing philosophy',
  problem: '<p>A health system with 10 hospitals and 800 beds per site is discharging patients around the clock. Inpatient, observation, ED discharge \u2014 all of them enter the same 24-to-48-hour window defined by CMS as the qualifying period for Transitional Care Management billing. The clinical logic is sound. A patient leaving the hospital is at their most vulnerable: medications confused, discharge instructions half-remembered, follow-up appointment not yet confirmed. Contact within that window is not a formality. It is the intervention.</p>' +
    '<p>The problem is not that care teams are indifferent. It is that the coordination infrastructure scales linearly with staff, and discharge volume does not. A hospital discharging 60 patients on a Tuesday cannot guarantee that a care coordinator reaches each one before Wednesday morning. Manual prioritization is the only tool available \u2014 and it works exactly as expected. The highest-acuity patients get called first. The patient who appeared stable at discharge, whose medication confusion was not flagged in the chart, whose follow-up appointment was scheduled but not confirmed \u2014 that patient does not get called. And two weeks later they are back in the ED.</p>' +
    '<p>For health systems participating in value-based care arrangements, the financial exposure is direct. Preventable readmissions within 30 days affect quality scores, shared savings, and payer relationships. For health systems billing for TCM services, missed outreach means missed billing \u2014 a revenue loss that accumulates across every discharge that aged past the qualifying window.</p>',
  shortfalls: [
    { tool: 'Automated Reminder Systems', description: 'These tools send notifications \u2014 discharge summaries, appointment reminders, medication alerts. They do not confirm safe arrival, identify medication confusion, or trigger clinical escalation when a patient reports a concerning symptom. Notification is not follow-up. The gap they leave is precisely the one that leads to preventable readmissions.' },
    { tool: 'Manual Follow-Up Programs', description: 'Call programs staffed by coordinators work when caseloads are manageable. At health system discharge volume, the caseload is never manageable. Coordinators prioritize the most visible cases \u2014 the ones flagged by the clinical team. The patient who slipped out on a Thursday afternoon without any flags does not make the list until the readmission triggers a chart review.' }
  ],
  solutionHeading: 'Every discharge contacted. Every TCM window documented.',
  solution: '<p>The Transitions of Care Agent contacts every discharged patient within 24 to 48 hours \u2014 not the flagged ones, not the highest-risk tier, every discharge. The interaction confirms safe arrival at home, identifies medication confusion or gaps, assesses for new or worsening symptoms, and schedules the required follow-up visit within the CMS billing window. Every qualifying interaction is documented for TCM billing in the same workflow.</p>' +
    '<p>ZynSchedule manages the follow-up appointment booking in the same interaction. Medication Reconciliation identifies discrepancies between what the patient was taking before admission, what was prescribed at discharge, and what they are actually taking now \u2014 routing clinical concerns to the appropriate pharmacist or care team member. The coordinator receives escalations and exceptions, not a list of calls to start from scratch.</p>' +
    '<p>For health system ACOs and value-based care contracts, this changes the math on post-discharge performance. More patients reached within the qualifying window means more TCM billing captured, fewer preventable readmissions within 30 days, and better performance on the quality measures that determine shared savings distributions.</p>',
  products: [
    { name: 'Transitions of Care Agent', descriptor: 'Post-discharge outreach, TCM billing documentation, and clinical escalation routing', url: '/agents/transitions-of-care', status: 'Active' },
    { name: 'ZynSchedule', descriptor: 'Appointment scheduling and follow-up access management', url: '/agents/operational-efficiency/zynschedule', status: 'Active' },
    { name: 'Medication Reconciliation', descriptor: 'Post-discharge medication discrepancy identification and clinical routing', url: '/agents/transitions-of-care', status: 'Active' }
  ],
  cta: { headline: 'Every discharged patient. Every 48-hour window. No exceptions.', label: 'See how it works' },
  readNext: [
    { id: 'UC02', title: 'After-Hours Patient Triage Across Multiple Sites', slug: 'after-hours-triage-multi-site' },
    { id: 'UC03', title: 'HCC Gap Closure at Health System ACO Scale', slug: 'hcc-gap-closure-health-system-aco' },
    { id: 'UC06', title: 'Post-Discharge TCM and Readmission Prevention', slug: 'post-discharge-tcm-readmission' }
  ],
  segments: { primary: 'Health Systems', alsoTagged: ['ACOs & MSOs'] },
  seo: {
    title: 'Post-Discharge Follow-Up at Scale | Zynix AI',
    desc: 'Reach every discharged patient in the 24\u201348 hour TCM window. Zynix AI automates post-discharge follow-up at health system volume with documented TCM billing support.',
    schema: 'HowTo'
  }
};

/* ── UC02 ── */
USE_CASES.UC02 = {
  id: 'UC02',
  slug: 'after-hours-triage-multi-site',
  title: 'After-Hours Patient Triage Across Multiple Sites',
  h1: 'Patients calling your sites after hours are getting voicemail. Some of them go to the ED. Some of them are not serious. You will not know which until Monday.',
  subhead: 'Multi-site health systems cannot staff clinical after-hours coverage at every location without significant cost and burnout. The calls keep coming. Zynix AI handles every one of them \u2014 triaging by symptom, routing what is urgent, and scheduling what can wait until morning.',
  problemHeading: 'After-hours access is not consistent across your sites \u2014 and patients feel it',
  problem: '<p>A health system operating 12 ambulatory sites does not have 12 after-hours clinical coverage arrangements. It might have a centralized nurse triage line, an answering service contract, and a rotation of on-call physicians who receive calls ranging from clinical emergencies to prescription refill requests at 2 a.m. The coverage model was not designed for the call volume. It was designed for what was affordable when the system had fewer sites.</p>' +
    '<p>The result is structural inconsistency. A patient calling Site A reaches a clinically trained triage nurse. A patient calling Site B reaches voicemail with instructions to call 911 for emergencies. A patient calling Site C reaches an answering service that takes a message and promises a callback by the next business day. None of these outcomes are what a patient needs when they are concerned enough to call their doctor after hours. Some of them go to the ED not because their condition warrants it, but because there was no accessible alternative.</p>' +
    '<p>For health systems in value-based care arrangements, avoidable ED visits have a direct cost. HCAHPS scores reflect patient experience with after-hours access. On-call physicians fielding non-urgent calls are not available for the urgent ones. The after-hours access problem compounds across every metric that connects patient experience to financial performance.</p>',
  shortfalls: [
    { tool: 'Answering Service Vendors', description: 'Traditional answering services take messages, relay callback requests, and follow escalation scripts for true emergencies. They cannot triage clinically, differentiate between a symptom that warrants an urgent callback and one that warrants a morning appointment, or schedule the follow-up access the patient actually needs. The message is taken. The patient is still waiting.' },
    { tool: 'EHR Patient Portals', description: 'Portal messaging systems require a patient to navigate a digital tool at a moment when they want to speak with someone. Adoption rates for portal after-hours contact are low among the populations who call most frequently \u2014 older patients, those with limited digital literacy, patients for whom English is not a first language. The access gap the portal was meant to close remains open for the patients who need after-hours access most.' }
  ],
  solutionHeading: 'Consistent clinical coverage across every site \u2014 without extending on-call burdens',
  solution: '<p>ZynAfterHours handles after-hours calls across all sites simultaneously \u2014 applying consistent clinical triage logic, assessing symptoms, routing urgent cases to on-call clinicians, answering routine questions, and scheduling next-day appointments for everything that can wait. It operates in 15-plus languages, which means the same quality of access extends to every patient in the attributed population regardless of primary language.</p>' +
    '<p>On-call physicians receive only the cases that genuinely require physician involvement. Routine symptom questions, medication questions, and appointment requests are handled and resolved without a physician callback. ZynSchedule books the next available appointment at the patient\u2019s preferred site in the same interaction \u2014 so the patient ends the call with a confirmed appointment rather than a message in a queue.</p>' +
    '<p>For health systems tracking ED utilization and HCAHPS scores, the change in after-hours access patterns is measurable across quarters. The patients who previously defaulted to the ED because they could not reach a clinical voice after hours are reaching one. The on-call burden that contributed to staff burnout is reduced to the clinical escalations that actually required it.</p>',
  products: [
    { name: 'ZynAfterHours & Triage', descriptor: '24/7 after-hours clinical triage in 15+ languages \u2014 symptom assessment, escalation routing, appointment scheduling', url: '/agents/operational-efficiency/zynafterhours-triage', status: 'Active' },
    { name: 'ZynSchedule', descriptor: 'Appointment scheduling and follow-up access management', url: '/agents/operational-efficiency/zynschedule', status: 'Active' }
  ],
  cta: { headline: 'Every after-hours call handled. Every site covered. Every patient reaches a clinical voice.', label: 'Book a demo' },
  readNext: [
    { id: 'UC01', title: 'Post-Discharge Follow-Up at Scale', slug: 'post-discharge-follow-up' },
    { id: 'UC03', title: 'HCC Gap Closure at Health System ACO Scale', slug: 'hcc-gap-closure-health-system-aco' },
    { id: 'UC09', title: 'After-Hours Access and ED Diversion for ACO Populations', slug: 'after-hours-ed-diversion' }
  ],
  segments: { primary: 'Health Systems', alsoTagged: ['ACOs & MSOs'] },
  seo: {
    title: 'After-Hours Patient Triage Multi-Site Health System | Zynix AI',
    desc: 'Clinical triage across every ambulatory site after hours \u2014 without extending on-call burden. Zynix AI handles calls in 15+ languages and schedules next-day access.',
    schema: 'HowTo'
  }
};

/* ── UC03 ── */
USE_CASES.UC03 = {
  id: 'UC03',
  slug: 'hcc-gap-closure-health-system-aco',
  title: 'HCC Gap Closure at Health System ACO Scale',
  h1: 'The HCC documentation gaps are identified. The worklist exists. The performance year is closing. And the patients without upcoming appointments are not being reached.',
  subhead: 'At 50,000 attributed lives, an HCC gap list is not a to-do list. It is an infrastructure problem. Zynix AI connects gap identification to outreach, scheduling, and pre-visit documentation \u2014 so the work that closes the gap actually gets done before the year ends.',
  problemHeading: 'The gap is not in the analytics. It is between the analytics and the action.',
  problem: '<p>Health system ACOs managing 50,000 or more attributed lives have, in most cases, invested meaningfully in analytics infrastructure. Population health dashboards identify every patient with a chronic condition documented in a prior year that has not been coded in the current data submission. The RAF impact per patient is calculated. Prioritization by dollar value and coding deadline is built into the tool. The gap list exists, is accurate, and is refreshed regularly.</p>' +
    '<p>The gap list does not move by itself. For patients who have upcoming appointments, the workflow is manageable \u2014 pre-visit documentation briefs need to reach the care team before the visit. For patients who do not have upcoming appointments, the problem is more fundamental: the patient needs to be brought in before the year-end coding window closes, and that requires a two-way contact that identifies the barrier, schedules the visit, and confirms it.</p>' +
    '<p>Across a 50,000-life population, the number of patients who qualify for HCC recapture without a scheduled visit in the next 60 days can run to several thousand. At that volume, manual outreach from coordinators already managing active caseloads is not a realistic path to year-end closure. The RAF leakage accumulates in proportion to the gap between the worklist and available outreach capacity.</p>',
  shortfalls: [
    { tool: 'Analytics and Population Health Platforms', description: 'These tools identify gaps, calculate impact, produce prioritized worklists. What they do not do is trigger outreach to bring unscheduled patients in or generate and distribute pre-visit documentation briefs to care teams before the appointment. The worklist is the output. Acting on it is a separate workflow that requires separate infrastructure.' },
    { tool: 'Coordinator-Managed Outreach', description: 'Care coordinators managing active chronic care caseloads, post-discharge follow-up, and quality gap programs cannot absorb the additional volume of HCC outreach for thousands of unscheduled patients in the final quarter. Prioritization means the patients at the bottom of the list, often those with the most complex documentation gaps, age past the closure window.' }
  ],
  solutionHeading: 'Gap identification connected to outreach, scheduling, and documentation in one workflow',
  solution: '<p>ZynGap identifies and prioritizes HCC documentation gaps across the attributed population \u2014 ranking by RAF dollar impact, coding deadline proximity, and patient-level EHR and claims history. For patients with upcoming appointments, pre-visit documentation briefs are generated and routed to the care team before the visit. For patients without upcoming appointments, the Preventive and Quality Activation Agents run outreach to bring them in.</p>' +
    '<p>The outreach is two-way. The agent identifies the reason the patient has not been seen, addresses scheduling barriers, and books the appointment through ZynSchedule. ZynReminder follows up with patients who agreed to schedule but have not yet confirmed. Every step is tracked \u2014 how many gaps were identified, how many patients received outreach, how many visits were scheduled, and how many conditions were documented at the encounter.</p>' +
    '<p>For health system ACOs where RAF score accuracy drives shared savings distributions, closing the documentation gap before year-end is the most direct lever on financial performance. The platform tracks completion \u2014 not just identification \u2014 so year-end reconciliation reflects work that actually happened.</p>',
  products: [
    { name: 'ZynGap', descriptor: 'HCC and quality gap identification prioritized by RAF impact and closure window', url: '/solutions/zynix-data-analytics', status: 'Planned' },
    { name: 'Preventive & Quality Activation Agents', descriptor: 'Outreach agents for gap closure, preventive care, and quality measure completion', url: '/agents/preventive-quality-activation', status: 'Active' },
    { name: 'ZynReminder', descriptor: 'Two-way outreach for care gap follow-through and patient engagement', url: '/agents/preventive-quality-activation/zynreminder', status: 'Active' },
    { name: 'ZynSchedule', descriptor: 'Appointment scheduling and follow-up access management', url: '/agents/operational-efficiency/zynschedule', status: 'Active' }
  ],
  cta: { headline: 'The gap list exists. Let\u2019s connect it to the outreach that closes it.', label: 'Talk to our team' },
  readNext: [
    { id: 'UC01', title: 'Post-Discharge Follow-Up at Scale', slug: 'post-discharge-follow-up' },
    { id: 'UC04', title: 'Prior Authorization Across High-Volume Specialty Services', slug: 'prior-auth-high-volume-specialty' },
    { id: 'UC07', title: 'HCC Gap Closure and RAF Score Optimization', slug: 'hcc-gap-raf-optimization' }
  ],
  segments: { primary: 'Health Systems', alsoTagged: ['ACOs & MSOs'] },
  seo: {
    title: 'HCC Gap Closure Health System ACO Scale | Zynix AI',
    desc: 'Close HCC documentation gaps at health system ACO scale. Zynix AI connects gap identification to patient outreach, scheduling, and pre-visit documentation before year-end.',
    schema: 'HowTo'
  }
};

/* ── UC04 ── */
USE_CASES.UC04 = {
  id: 'UC04',
  slug: 'prior-auth-high-volume-specialty',
  title: 'Prior Authorization Across High-Volume Specialty Services',
  h1: 'Your cardiology and orthopedics teams are waiting on prior authorizations submitted three weeks ago. Staff are making status calls. Patients are calling to ask why their appointment has not been confirmed.',
  subhead: 'High-volume specialty services generate hundreds of concurrent prior authorization requests every month. Each requires documentation, submission, status tracking, and denial response. Zynix AI handles the entire workflow so staff attention shifts to clinical exceptions \u2014 not administrative queues.',
  problemHeading: 'Prior authorization volume scales with your specialty services. Staff capacity does not.',
  problem: '<p>Health systems with active cardiology, orthopedics, oncology, and imaging service lines are managing prior authorization workflows that are, in most cases, held together by dedicated administrative staff, payer portal logins maintained on shared spreadsheets, and a follow-up process that depends heavily on who is available to make calls on a given day. At 300 concurrent authorizations across four service lines, that system is already at its limits. At 600, it breaks.</p>' +
    '<p>The cost of a broken prior auth workflow is distributed across everyone who depends on it. Surgeons see OR slots go idle when a case cannot be confirmed because the authorization is still pending. Patients who were scheduled three weeks ago are calling the front desk to ask why they have not heard back. Referring physicians who sent patients expecting a confirmed timeline receive no update until the authorization clears \u2014 or the denial arrives.</p>' +
    '<p>Denial management compounds the problem. An authorization that was denied is not the end of the workflow \u2014 it is the beginning of an appeals process with its own documentation requirements, deadlines, and tracking obligations. For health systems where high-value specialty procedures represent significant revenue, a denial that is not appealed within the payer\u2019s response window is a lost authorization.</p>',
  shortfalls: [
    { tool: 'RCM Platforms and Authorization Tracking Tools', description: 'Revenue cycle management platforms log the status of outstanding authorizations and flag overdue items. They do not assemble the clinical documentation package, submit it to the payer, or proactively follow up before the payer deadline passes. Staff are still expected to own every step of the submission and tracking workflow \u2014 the platform simply shows them what has not been done yet.' },
    { tool: 'Staff-Managed Prior Auth Queues', description: 'Dedicated prior authorization staff are typically among the most stretched in a health system\u2019s administrative workforce. Their capacity is fixed. Authorization volume is not. When submission backlogs build, they address the highest-priority cases and the long tail of standard authorizations ages in the queue. Status calls become the primary workday activity, consuming the time needed for documentation work that would prevent them.' }
  ],
  solutionHeading: 'Documentation assembled, submitted, and managed across every service line simultaneously',
  solution: '<p>ZynAuth assembles the required clinical documentation for each prior authorization request from the patient record and procedure orders, formats it for the payer, and submits through the appropriate channel. For fax-based payer communications, ZynFax handles the submission and receipt workflow. Every authorization is tracked against the payer\u2019s response timeline \u2014 and ZynAuth initiates follow-up before the deadline rather than after it passes.</p>' +
    '<p>When a denial arrives, ZynAuth identifies the basis for the denial, assembles the required appeal documentation, and routes the response to the payer within the appeal window. Staff attention is directed to cases that require clinical judgment or peer-to-peer review \u2014 not to the administrative management of cases that can be handled procedurally.</p>' +
    '<p>For health system specialty service lines where OR scheduling depends on timely authorization clearance, the change is measurable in schedule reliability and staff utilization. Cases that were previously delayed or cancelled due to pending authorizations clear on schedule. Staff who were spending significant time on status calls redirect that capacity to work that actually requires their involvement.</p>',
  products: [
    { name: 'ZynAuth', descriptor: 'Prior authorization documentation assembly, submission, tracking, denial management, and appeals', url: '/agents/operational-efficiency', status: 'Active' },
    { name: 'ZynFax', descriptor: 'Reads, classifies, routes, and assigns ownership to incoming and outgoing fax documents', url: '/agents/operational-efficiency', status: 'Active' },
    { name: 'ZynSchedule', descriptor: 'Appointment and procedure scheduling confirmation upon authorization clearance', url: '/agents/operational-efficiency/zynschedule', status: 'Active' }
  ],
  cta: { headline: 'Authorization backlogs are a workflow problem. Let\u2019s solve the workflow.', label: 'See how it works' },
  readNext: [
    { id: 'UC03', title: 'HCC Gap Closure at Health System ACO Scale', slug: 'hcc-gap-closure-health-system-aco' },
    { id: 'UC05', title: 'Reducing Physician Documentation Burden with Ambient AI', slug: 'physician-documentation-ambient-ai' },
    { id: 'UC21', title: 'Prior Authorization for Surgical Procedures', slug: 'prior-auth-surgical-procedures' }
  ],
  segments: { primary: 'Health Systems', alsoTagged: ['ASCs'] },
  seo: {
    title: 'Prior Authorization Automation Health System Specialty | Zynix AI',
    desc: 'Manage prior authorizations across cardiology, orthopedics, oncology, and imaging at scale. Zynix AI handles documentation, submission, tracking, and denial appeals.',
    schema: 'HowTo'
  }
};

/* ── UC05 ── */
USE_CASES.UC05 = {
  id: 'UC05',
  slug: 'physician-documentation-ambient-ai',
  title: 'Reducing Physician Documentation Burden with Ambient AI',
  h1: 'Physicians are spending more time documenting what happened in the visit than they spent in the visit itself. The clinical note is written at 9 p.m., not in the exam room.',
  subhead: 'Documentation burden is one of the most cited drivers of physician burnout and clinical throughput reduction at health system scale. ZynScribe turns the patient-clinician conversation directly into a structured, review-ready clinical note \u2014 uploaded to the EHR without dictation, formatting, or after-hours catch-up.',
  problemHeading: 'Documentation is the job that follows physicians home',
  problem: '<p>A primary care physician seeing 20 patients in a clinic day is not done when the last patient leaves. The note for the first patient is already behind. EHR documentation requirements for structured clinical notes, coding-supporting language, and quality measure documentation have added layers to every encounter that were not there 10 years ago. The physician who finishes clinic at 5 p.m. typically finishes the documentation for that clinic at 8 or 9 p.m. \u2014 sometimes later.</p>' +
    '<p>The clinical consequences are real. Documentation completed hours after the encounter depends on memory rather than the real-time clinical exchange. Detail that matters \u2014 the patient\u2019s specific description of a symptom, a subtle change in their presentation, a concern raised in the final minutes of the visit \u2014 can be compressed into summary language by the time the note is written. The note that supports clinical decision-making for the next provider is less accurate than it could be because it was written hours after the encounter it describes.</p>' +
    '<p>For health systems managing hundreds of physicians across multiple specialties and sites, documentation burden is a throughput problem as much as a clinician wellbeing problem. Physicians who spend two hours documenting for every hour of direct clinical time cannot see more patients without extending their working day further. The clinical capacity the system needs is already present \u2014 being consumed by administrative work that technology should have absorbed.</p>',
  shortfalls: [
    { tool: 'Voice Dictation Tools', description: 'Dictation tools convert speech to text \u2014 which still requires the physician to review, correct, and format the output into a structured clinical note. The documentation step is shortened but not eliminated. For physicians whose burnout is driven by total documentation time rather than the mechanics of typing versus speaking, dictation moves the bottleneck without removing it.' },
    { tool: 'EHR-Native Documentation Features', description: 'EHR-native note templates and smart text tools accelerate documentation within the EHR\u2019s existing structure. They require the physician to fill in a template rather than complete a blank note. They do not produce structured notes from a natural clinical conversation \u2014 they require the physician to translate the conversation into template fields, which is still documentation work.' }
  ],
  solutionHeading: 'The conversation becomes the note. The physician stays in the room.',
  solution: '<p>ZynScribe listens to the patient-clinician conversation during the visit and produces a structured, review-ready clinical note \u2014 uploaded directly to the EHR. No dictation after the patient leaves. No template to fill in while the patient is sitting across the desk. No late-evening note completion from home. The physician reviews the structured note before it is finalized, making corrections where needed \u2014 but the drafting work is done.</p>' +
    '<p>For health systems integrating ZynScribe across a physician group, the impact on clinical throughput is measurable in documentation time reduced per encounter. For individual physicians, the change is experienced as the ability to be fully present in the clinical encounter rather than managing note-taking and patient interaction simultaneously. The clinical note quality improves because it is derived from the actual conversation, not a reconstruction of it from memory.</p>' +
    '<p>ZynScribe is Zynix AI\u2019s longest-standing product \u2014 formerly Medvise, acquired and extended into the Zynix platform. It is a standalone product with its own implementation pathway and EHR integration architecture, deployable independently of the broader Zynix AI agent suite.</p>',
  products: [
    { name: 'ZynScribe', descriptor: 'Ambient AI clinical documentation \u2014 structured notes from patient-clinician conversation, uploaded directly to EHR', url: '/zynscribe', status: 'Active' }
  ],
  cta: { headline: 'Clinical notes written from the conversation. Not from memory, at 9 p.m.', label: 'See how it works' },
  readNext: [
    { id: 'UC01', title: 'Post-Discharge Follow-Up at Scale', slug: 'post-discharge-follow-up' },
    { id: 'UC04', title: 'Prior Authorization Across High-Volume Specialty Services', slug: 'prior-auth-high-volume-specialty' },
    { id: 'UC19', title: 'CCM Billing Execution and Chronic Care Management', slug: 'ccm-billing-chronic-care' }
  ],
  segments: { primary: 'Health Systems', alsoTagged: [] },
  seo: {
    title: 'Ambient AI Scribe Physician Documentation Health System | Zynix AI',
    desc: 'ZynScribe converts the patient-clinician conversation into a structured clinical note uploaded to the EHR \u2014 eliminating after-hours documentation at health system scale.',
    schema: 'FAQPage'
  }
};

/* ── UC06 ── */
USE_CASES.UC06 = {
  id: 'UC06',
  slug: 'post-discharge-tcm-readmission',
  title: 'Post-Discharge TCM and Readmission Prevention',
  h1: 'Every preventable readmission in your attributed population is a shared savings loss that was visible in the data the day the patient was discharged. The 48-hour window closed before outreach happened.',
  subhead: 'MSSP ACOs and risk-bearing MSOs carry direct financial exposure to preventable readmissions. The intervention window is 24 to 48 hours post-discharge. Most attributed patients are not reached in that window \u2014 not because the care team is not trying, but because manual outreach cannot scale to the volume of discharges across an attributed population.',
  problemHeading: 'The 30-day readmission window is where shared savings are won or lost',
  problem: '<p>An MSSP ACO managing 15,000 attributed lives across a primary care network will see a meaningful fraction of that population discharged from one of dozens of hospitals in any given month. Some of those hospitals have strong care transition programs. Most have processes that work for their highest-risk patients and leave the rest to the outpatient team to follow up with. The outpatient team is the ACO\u2019s care coordinators \u2014 already managing active chronic care caseloads, quality gap programs, and a rising-risk outreach list.</p>' +
    '<p>The 24-to-48-hour post-discharge window is where the most valuable intervention can happen. Medication confusion shows up in those first two days. Discharge instruction confusion surfaces when the patient is not sure what a warning sign actually looks like. The follow-up appointment is not yet scheduled, or was scheduled at the hospital and has not been confirmed with the outpatient team. These are the moments where a contact prevents a readmission.</p>' +
    '<p>For an ACO with financial exposure to every 30-day readmission in the attributed population, the cost of missing the outreach window is direct. A readmission that was preventable with a 20-minute call in the 48-hour window generates a claims event that affects the TCOC calculation, the performance year benchmark, and the shared savings distribution.</p>',
  shortfalls: [
    { tool: 'Care Management Software and Task Lists', description: 'Care management platforms create post-discharge task lists and alert coordinators when attributed patients are discharged. They do not execute the outreach. The task that says \u201ccontact patient within 48 hours\u201d still requires a coordinator to make the call. When coordinators are at caseload capacity \u2014 which is almost always \u2014 that task competes with every other task on the list. The highest-acuity cases get addressed. The ones that looked stable at discharge age past the TCM billing window.' },
    { tool: 'Coordinator-Managed Follow-Up Programs', description: 'High-touch follow-up programs work for the patients actively enrolled in care management. They do not scale to every discharge across a 15,000-life attributed population. Staffing ratios that made sense for a 5,000-life panel create coverage gaps at 15,000. Practices that have grown their attributed populations through value-based care agreements often find that their care coordination infrastructure has not scaled proportionally with the financial exposure.' }
  ],
  solutionHeading: 'Every attributed discharge reached. Every TCM interaction documented. Every billing window captured.',
  solution: '<p>The Transitions of Care Agent contacts every attributed patient within 24 to 48 hours of hospital discharge. The interaction qualifies for TCM billing, confirms safe arrival, identifies medication confusion or discrepancies, catches new or worsening symptoms, and schedules the required follow-up visit within the CMS billing window. Every qualifying interaction is documented. The ACO\u2019s billing team receives TCM-ready documentation without requiring a coordinator to initiate or document the contact.</p>' +
    '<p>ZynPredict feeds the discharge workflow with risk scores \u2014 so the coordinator team sees which patients triggered elevated risk signals and need a follow-up call with a human. ZynSchedule confirms the follow-up appointment. Medication Reconciliation identifies discrepancies between pre-admission, discharge, and current medications \u2014 routing clinical concerns to the pharmacist or care team.</p>' +
    '<p>For MSSP ACOs, the financial case is direct: more qualifying TCM interactions billed, fewer preventable readmissions within 30 days, and better performance on the TCOC metrics that determine shared savings distributions. The platform does not replace the care coordinator team \u2014 it handles the volume so the team is deployed at the escalations that actually need them.</p>',
  products: [
    { name: 'Transitions of Care Agent', descriptor: 'Post-discharge outreach, TCM billing documentation, and clinical escalation routing', url: '/agents/transitions-of-care', status: 'Active' },
    { name: 'Medication Reconciliation', descriptor: 'Post-discharge medication discrepancy identification and clinical routing', url: '/agents/transitions-of-care', status: 'Active' },
    { name: 'ZynSchedule', descriptor: 'Follow-up appointment scheduling within the TCM billing window', url: '/agents/operational-efficiency/zynschedule', status: 'Active' },
    { name: 'ZynPredict', descriptor: 'Readmission and ED utilization risk scoring for discharged patients', url: '/solutions/zynix-data-analytics', status: 'Planned' }
  ],
  cta: { headline: 'Every discharge in the attributed population. Every TCM window. Documented and billed.', label: 'Book a demo' },
  readNext: [
    { id: 'UC07', title: 'HCC Gap Closure and RAF Score Optimization', slug: 'hcc-gap-raf-optimization' },
    { id: 'UC08', title: 'Rising-Risk Patient Outreach Before a Clinical Event', slug: 'rising-risk-patient-outreach' },
    { id: 'UC14', title: 'Post-Discharge Care Management for MA Members', slug: 'post-discharge-ma-members' }
  ],
  segments: { primary: 'ACOs & MSOs', alsoTagged: ['Health Systems', 'Health Plans'] },
  seo: {
    title: 'Post-Discharge TCM MSSP ACO Readmission Prevention | Zynix AI',
    desc: 'Reach every attributed patient in the 48-hour TCM window. Zynix AI documents qualifying interactions, prevents readmissions, and captures TCM billing at MSSP ACO scale.',
    schema: 'HowTo'
  }
};

/* ── UC07 ── */
USE_CASES.UC07 = {
  id: 'UC07',
  slug: 'hcc-gap-raf-optimization',
  title: 'HCC Gap Closure and RAF Score Optimization',
  h1: 'The RAF leakage in your performance year is not a coding problem. It is a workflow problem. Chronic conditions are documented in the EHR. They are not making it into current-year coding.',
  subhead: 'In an MSSP ACO, RAF score accuracy is a direct financial lever. Every chronic condition documented in a prior year but not coded in the current submission period is shared savings that does not get captured. Zynix AI connects the gap to the workflow that closes it \u2014 before the year-end deadline.',
  problemHeading: 'RAF score leakage accumulates in the space between knowing and acting',
  problem: '<p>An MSSP ACO\u2019s shared savings calculation depends on the accuracy of its risk score relative to its benchmark. Patients with complex chronic disease profiles \u2014 multiple comorbidities, documented histories of heart failure, diabetes with complications, COPD, chronic kidney disease \u2014 carry significant RAF weight. When those conditions are coded in the current data submission, the risk score reflects the true population complexity. When they are not, the benchmark is set against a population profile that does not accurately represent the patients being managed.</p>' +
    '<p>The documentation is there. In most cases, the conditions have been active and treated throughout the year. The problem is that current-year coding requires a face-to-face encounter in which the condition is reviewed, documented as active, and appropriately coded in the visit note. Patients who are not seen in a given year \u2014 or whose visit notes do not include explicit documentation of the chronic condition \u2014 do not contribute to current-year RAF. Across hundreds of patients with complex co-morbidity profiles, the aggregate RAF impact is not marginal.</p>' +
    '<p>Closing the gap before year-end requires two parallel workflows: for patients with upcoming appointments, pre-visit documentation briefs need to reach the care team in time for the condition to be reviewed and coded. For patients without upcoming appointments, outreach is needed to schedule a visit before the year-end coding window closes. Both workflows require infrastructure that runs at population scale.</p>',
  shortfalls: [
    { tool: 'Quality Reporting and Analytics Tools', description: 'Reporting platforms calculate aggregate gap rates and produce patient-level gap lists sorted by RAF dollar impact. They do not connect the gap list to a pre-visit documentation workflow or trigger outreach to bring unscheduled patients in before the coding window closes. The gap is identified. Acting on it requires a separate workflow that reporting tools are not designed to support.' },
    { tool: 'EHR Coding Support and Alerts', description: 'EHR-native coding support tools surface suspect diagnoses and suggest codes at the point of documentation. They work for patients who are in the exam room. They do not reach the patients who have not been seen this year, do not generate pre-visit briefs for care teams with high patient volume, and do not trigger outreach to bring in the patients whose RAF weight most needs current-year documentation.' }
  ],
  solutionHeading: 'Every HCC gap prioritized, tracked, and closed \u2014 before the year-end coding deadline',
  solution: '<p>ZynGap surfaces HCC and quality gaps for every patient in the attributed population, ranked by RAF dollar impact and closure timing. For patients with upcoming appointments, pre-visit documentation briefs are generated and delivered to the care team before the visit \u2014 so the chronic condition review and documentation happens at the encounter rather than being missed.</p>' +
    '<p>For patients without upcoming appointments, the Preventive and Quality Activation Agents run outreach \u2014 identifying barriers to scheduling, booking the visit through ZynSchedule, and following up with patients who agreed to schedule but have not confirmed. ZynReminder handles the follow-up cadence so coordinators do not need to manage individual patient tracking across hundreds of open items.</p>' +
    '<p>The platform tracks completion at every step. For an ACO executive team tracking shared savings performance against the year-end target, this visibility allows mid-year course correction rather than a post-performance-year reconciliation of what was missed.</p>',
  products: [
    { name: 'ZynGap', descriptor: 'HCC and quality gap identification prioritized by RAF impact and closure timing', url: '/solutions/zynix-data-analytics', status: 'Planned' },
    { name: 'Preventive & Quality Activation Agents', descriptor: 'Outreach agents for gap closure, preventive care, and quality measure completion', url: '/agents/preventive-quality-activation', status: 'Active' },
    { name: 'ZynReminder', descriptor: 'Two-way outreach for care gap follow-through and patient engagement', url: '/agents/preventive-quality-activation/zynreminder', status: 'Active' },
    { name: 'ZynSchedule', descriptor: 'Appointment scheduling and follow-up access management', url: '/agents/operational-efficiency/zynschedule', status: 'Active' }
  ],
  cta: { headline: 'The RAF opportunity is in the data today. Let\u2019s close it before the year ends.', label: 'Book a demo' },
  readNext: [
    { id: 'UC06', title: 'Post-Discharge TCM and Readmission Prevention', slug: 'post-discharge-tcm-readmission' },
    { id: 'UC10', title: 'Chronic Care Coordination at Scale', slug: 'chronic-care-coordination-scale' },
    { id: 'UC03', title: 'HCC Gap Closure at Health System ACO Scale', slug: 'hcc-gap-closure-health-system-aco' }
  ],
  segments: { primary: 'ACOs & MSOs', alsoTagged: ['Health Systems'] },
  seo: {
    title: 'HCC Gap Closure RAF Score Optimization MSSP ACO | Zynix AI',
    desc: 'Close HCC documentation gaps and optimize RAF scores before year-end. Zynix AI connects gap identification to outreach, pre-visit documentation, and scheduling at ACO scale.',
    schema: 'HowTo'
  }
};

/* ── UC08 ── */
USE_CASES.UC08 = {
  id: 'UC08',
  slug: 'rising-risk-patient-outreach',
  title: 'Rising-Risk Patient Outreach Before a Clinical Event',
  h1: 'The patients most likely to be readmitted next month are already in your data. The question is whether anything happens before the hospitalization.',
  subhead: 'Risk stratification tools surface the signal. The problem is that care teams cannot act on every elevated flag when coordinators are managing active caseloads. Rising-risk patients sit on a list. Zynix AI moves them into an outreach workflow \u2014 so the 90-day risk window becomes a 90-day action window.',
  problemHeading: 'The care management gap nobody talks about is the one between the risk flag and the phone call',
  problem: '<p>Every MSSP ACO and risk-bearing MSO has a risk stratification tool. The analytics work. ZynPredict, Epic\u2019s risk model, Arcadia, whatever the platform \u2014 these tools surface patients whose trajectory is pointing toward a costly clinical event. The score is accurate. The flag is real. A patient with a recent ED visit, a gap in their blood pressure medication, worsening kidney function labs, and no scheduled follow-up in the next 60 days is, with some predictable probability, heading toward an acute event.</p>' +
    '<p>The problem is what happens next. A care coordinator\u2019s active caseload on any given day is not three patients. It is 80. The rising-risk worklist is a second job sitting on top of the first one. Outreach to a patient who has not been admitted and does not have an immediate need \u2014 that call gets made last, if it gets made at all. And then the readmission happens, and everybody knew it was coming, and the post-event chart review confirms all the signals that were there six weeks ago.</p>' +
    '<p>This is not a staffing problem. You cannot hire your way out of a workflow that scales with your attributed population. A 10,000-life ACO with 400 rising-risk patients flagged in any given month needs infrastructure that can carry the outreach volume at the same time coordinators are managing active transitions, chronic care programs, and quality gap closure.</p>',
  shortfalls: [
    { tool: 'Risk Stratification Engines', description: 'Risk scores and flags are the output of a prediction model \u2014 not an outreach infrastructure. These tools identify who is likely to deteriorate. They do not initiate contact, carry a conversation, document the interaction, or route a clinical concern to the care team. The move from prediction to action is a manual step that requires a coordinator to open the list, prioritize it, and find time that does not exist at scale.' },
    { tool: 'Care Management Platforms', description: 'Care management platforms create task lists and track open items. They do not execute outreach. A task that says \u201ccall rising-risk patient\u201d is still a task someone has to pick up. When caseloads are at capacity, rising-risk outreach ages in the queue. The coordinator team is not failing. The workflow architecture is.' }
  ],
  solutionHeading: 'Risk intelligence connected to action \u2014 before the clinical event',
  solution: '<p>ZynPredict identifies patients whose clinical signals \u2014 recent ED use, medication gaps, worsening chronic condition indicators, utilization pattern changes \u2014 place them in an elevated risk tier. The Predictive Activation Agents carry that signal into an outreach workflow without waiting for a coordinator to initiate it.</p>' +
    '<p>Every flagged patient receives proactive contact. The interaction is two-way \u2014 it captures current medication status, identifies new or worsening symptoms, confirms that the patient has a follow-up scheduled, and flags clinical concerns for coordinator review. When a patient reports a concerning symptom or medication gap, the agent routes the escalation to the care team with the full contact summary attached. ZynSchedule manages the follow-up booking.</p>' +
    '<p>For ACOs and MSOs operating under shared savings targets, the financial logic is direct. The cost of proactive outreach for 400 rising-risk patients is a fraction of the cost of the readmissions that outreach prevents. Reaching those patients consistently and documentably \u2014 at the moment the risk signal flags rather than after the clinical event confirms it \u2014 is the workflow Zynix AI is built to run.</p>',
  products: [
    { name: 'ZynPredict', descriptor: 'Predictive analytics for rising risk, readmissions, and ED utilization', url: '/solutions/zynix-data-analytics', status: 'Planned' },
    { name: 'Predictive Activation Agents', descriptor: 'Proactive outreach agents acting on risk intelligence before clinical events', url: '/agents/predictive-activation', status: 'Active' },
    { name: 'ZynSchedule', descriptor: 'Appointment scheduling and follow-up access management', url: '/agents/operational-efficiency/zynschedule', status: 'Active' }
  ],
  cta: { headline: 'Your risk stratification is already working. Let\u2019s connect it to outreach that runs at scale.', label: 'Talk to our team' },
  readNext: [
    { id: 'UC06', title: 'Post-Discharge TCM and Readmission Prevention', slug: 'post-discharge-tcm-readmission' },
    { id: 'UC10', title: 'Chronic Care Coordination at Scale', slug: 'chronic-care-coordination-scale' },
    { id: 'UC13', title: 'High-Cost and High-Utilizer Member Management', slug: 'high-utilizer-member-management' }
  ],
  segments: { primary: 'ACOs & MSOs', alsoTagged: ['Health Systems', 'Health Plans'] },
  seo: { title: 'Rising-Risk Patient Outreach ACO Predictive Care | Zynix AI', desc: 'Reach rising-risk patients before the clinical event. Zynix AI connects risk stratification to proactive outreach \u2014 documented, two-way, and escalated to your care team.', schema: 'HowTo' }
};

/* ── UC09 ── */
USE_CASES.UC09 = {
  id: 'UC09', slug: 'after-hours-ed-diversion', title: 'After-Hours Access and ED Diversion for ACO Populations',
  h1: 'Patients who cannot reach their care team after hours go to the ED. Many of them do not need the ED. Each one of those visits is a direct shared savings impact.',
  subhead: 'Unnecessary ED visits are among the most direct cost drivers in any risk-bearing care arrangement. The majority originate after hours, when patients cannot reach their care team and have no alternative. Zynix AI provides clinical triage access around the clock \u2014 so the attributed population has somewhere to call that is not the emergency department.',
  problemHeading: 'The after-hours access gap is a shared savings problem \u2014 not just a patient experience problem',
  problem: '<p>An MSSP ACO managing 15,000 attributed lives has, in most configurations, a business-hours care team and a fragmented after-hours arrangement. A nurse triage line that operates until 8 p.m. An answering service that takes messages and relays callback requests. An on-call physician rotation that was designed for clinical emergencies and now handles everything from chest pain to medication refill questions because there is no other option after 9 p.m.</p>' +
    '<p>Patients who cannot reach clinical guidance after hours make rational decisions. They go to urgent care if one is available and open. They go to the ED if it is not, or if their concern is significant enough that waiting until morning does not feel like an option. A patient with type 2 diabetes who woke up at midnight with a headache and blurred vision \u2014 uncertain whether this is concerning, unsure whether it can wait \u2014 makes that decision without any guidance from their care team. Some of those decisions result in non-urgent ED visits. The urgency determination is the service that was unavailable.</p>' +
    '<p>For an ACO carrying financial responsibility for TCOC, every non-urgent ED visit in the attributed population is a direct cost. CMS tracks ED utilization rates as a quality metric. Payer contracts for risk-bearing MSOs often include ED utilization performance targets. The correlation between after-hours access gap and avoidable ED utilization is well-documented.</p>',
  shortfalls: [
    { tool: 'Nurse Triage Lines', description: 'Nurse-staffed triage lines are clinically capable when they are available. They are expensive to staff after hours for extended coverage windows, and their availability is often limited to specific hours \u2014 not 24/7. They are typically staffed for English-speaking populations, which leaves language access gaps for the multilingual attributed populations many ACOs manage. When call volume spikes, wait times eliminate the access benefit.' },
    { tool: 'Patient Portal Messaging', description: 'Portal messaging is asynchronous by design. A patient with a health concern at 10 p.m. does not experience submitting a message and waiting for a next-day response as access. They experience it as an instruction to manage their concern alone until morning. For populations with lower digital literacy or limited portal adoption \u2014 common among the highest-need attributed populations \u2014 the portal is not an accessible channel at all.' }
  ],
  solutionHeading: 'Clinical access for the full attributed population \u2014 every hour the care team is not available',
  solution: '<p>ZynAfterHours handles every after-hours call from the attributed population \u2014 assessing symptoms using consistent clinical triage logic, resolving routine questions, scheduling next-day appointments for concerns that can wait, and routing genuinely urgent cases to the on-call clinician. It operates in 15-plus languages, which means the same quality of access extends to every patient regardless of primary language. The on-call physician receives only the cases that require physician judgment.</p>' +
    '<p>For patients identified as high-risk or recently discharged, ZynAfterHours flags the interaction for care team review the next morning \u2014 so the clinical team has context on any after-hours contact before the patient\u2019s next scheduled encounter. ZynSchedule confirms next-day appointments in the same call. The patient ends the interaction with a plan rather than a message in a queue.</p>' +
    '<p>For ACO and MSO leadership teams tracking ED utilization against performance year targets, the change in after-hours contact patterns is visible in claims within quarters. Patients who previously defaulted to the ED because no clinical alternative was available are reaching one. The on-call burden on the physician team is reduced to the clinical escalations that genuinely warranted it.</p>',
  products: [
    { name: 'ZynAfterHours & Triage', descriptor: '24/7 clinical triage in 15+ languages \u2014 symptom assessment, escalation routing, next-day scheduling', url: '/agents/operational-efficiency/zynafterhours-triage', status: 'Active' },
    { name: 'ZynSchedule', descriptor: 'Next-day appointment scheduling completed in the after-hours interaction', url: '/agents/operational-efficiency/zynschedule', status: 'Active' }
  ],
  cta: { headline: 'After-hours access for every patient in the attributed population \u2014 24 hours a day.', label: 'See how it works' },
  readNext: [
    { id: 'UC06', title: 'Post-Discharge TCM and Readmission Prevention', slug: 'post-discharge-tcm-readmission' },
    { id: 'UC08', title: 'Rising-Risk Patient Outreach Before a Clinical Event', slug: 'rising-risk-patient-outreach' },
    { id: 'UC02', title: 'After-Hours Patient Triage Across Multiple Sites', slug: 'after-hours-triage-multi-site' }
  ],
  segments: { primary: 'ACOs & MSOs', alsoTagged: ['Health Systems', 'Health Plans'] },
  seo: { title: 'After-Hours ED Diversion ACO Population Health | Zynix AI', desc: 'Reduce avoidable ED visits for your attributed population. Zynix AI provides 24/7 clinical triage in 15+ languages \u2014 scheduling next-day access before patients default to the ED.', schema: 'HowTo' }
};

/* ── UC10 ── */
USE_CASES.UC10 = {
  id: 'UC10', slug: 'chronic-care-coordination-scale', title: 'Chronic Care Coordination at Scale',
  h1: 'An MSSP ACO with 10,000 attributed lives may have 3,000 patients in active chronic care programs. Each requires monthly documented contact. None of that volume fits inside a human-only workflow.',
  subhead: 'Chronic care management at the population level requires outreach that runs every month, two-way, across thousands of patients with different condition profiles and different barriers. Zynix AI runs the outreach, captures the documentation, and routes the exceptions \u2014 so the care coordination team manages the complex cases rather than the contact volume.',
  problemHeading: 'The caseload math does not work at ACO scale without a different infrastructure',
  problem: '<p>An MSSP ACO managing 10,000 attributed lives with a typical chronic disease prevalence profile may have 2,500 to 3,500 patients enrolled in active CCM programs. Each of those patients requires, under CMS billing requirements, at least 20 minutes of non-face-to-face care management monthly, documented with a time-stamped record of the interaction.</p>' +
    '<p>A care coordination team of 10 full-time coordinators managing 3,000 active CCM patients faces a structural caseload problem. Ten coordinators working 40-hour weeks, accounting for documentation, care plan management, and administrative time, have roughly 1,600 to 1,800 available hours per month for patient contact. At 3,000 patients, that is approximately 30 minutes per patient per month \u2014 before the time required for any patient who presents a barrier, requires a medication review, or generates a clinical escalation.</p>' +
    '<p>The consequences of the caseload gap are not abstract. Patients who do not receive monthly CCM contact do not get their documentation \u2014 which affects billing. Patients whose medication barriers are not captured in a routine check-in present with preventable clinical events. The CCM program that is supposed to manage these patients at scale is limited by the same infrastructure that served a smaller panel.</p>',
  shortfalls: [
    { tool: 'Care Management Platforms and Worklists', description: 'Care management software creates visibility into the caseload \u2014 who needs contact this month, whose care plan is overdue, which patients have not had a documented touchpoint. It does not execute the outreach. Every item on the worklist still requires a coordinator to make the call, capture the documentation, identify the barrier, and decide on the next step. The platform shows the work. The coordinator does it.' },
    { tool: 'EHR-Native CCM Modules', description: 'EHR-native CCM tools track time, manage care plan templates, and generate billing documentation when encounters are logged. They do not initiate patient contact, run two-way outreach interactions, or capture barriers in a structured format for care team review. They are documentation systems for work that has already been done \u2014 not execution systems for work that needs to happen.' }
  ],
  solutionHeading: 'Two-way chronic care outreach at population scale \u2014 with barriers captured and escalations routed',
  solution: '<p>The Chronic and Longitudinal Care Management Agent runs monthly two-way outreach for the full chronic care population \u2014 capturing current medication status, identifying barriers, checking for new or worsening symptoms, reinforcing care plan adherence, and routing clinical concerns to the coordinator or care team for follow-up. Every interaction is time-stamped and documented for CCM billing eligibility. The coordinator team receives a daily queue of escalations and exceptions \u2014 not a list of 3,000 patients to work through from scratch.</p>' +
    '<p>ZynReminder handles the patients who need a follow-up outreach after the initial monthly contact \u2014 those who reported a barrier that needed resolution, who agreed to schedule an appointment but have not confirmed, or whose medication concern required a pharmacist callback.</p>' +
    '<p>For ACOs where CCM billing represents a meaningful revenue stream alongside the shared savings calculation, the change in monthly contact completion rates directly affects revenue capture. For the care coordination team, the change is operational: coordinators spend their time managing the patients whose situations require clinical judgment, not managing the contact volume for the entire caseload.</p>',
  products: [
    { name: 'Chronic & Longitudinal Care Management Agent', descriptor: 'Two-way monthly CCM outreach, barrier capture, escalation routing, and billing documentation', url: '/agents/chronic-care-management', status: 'Active' },
    { name: 'ZynReminder', descriptor: 'Follow-up outreach for barrier resolution, scheduling confirmation, and care plan adherence', url: '/agents/preventive-quality-activation/zynreminder', status: 'Active' },
    { name: 'ZynSchedule', descriptor: 'Appointment scheduling for chronic care follow-up visits', url: '/agents/operational-efficiency/zynschedule', status: 'Active' }
  ],
  cta: { headline: 'Monthly CCM contact for every patient in the program \u2014 documented, two-way, and escalated when needed.', label: 'Book a demo' },
  readNext: [
    { id: 'UC07', title: 'HCC Gap Closure and RAF Score Optimization', slug: 'hcc-gap-raf-optimization' },
    { id: 'UC09', title: 'After-Hours Access and ED Diversion for ACO Populations', slug: 'after-hours-ed-diversion' },
    { id: 'UC15', title: 'Medication Adherence for Chronic Disease Populations', slug: 'medication-adherence-chronic-populations' }
  ],
  segments: { primary: 'ACOs & MSOs', alsoTagged: ['Health Systems', 'Health Plans'] },
  seo: { title: 'Chronic Care Coordination at Scale ACO CCM Billing | Zynix AI', desc: 'Run monthly CCM outreach for thousands of chronic disease patients. Zynix AI captures documentation, identifies barriers, and routes escalations \u2014 at MSSP ACO population scale.', schema: 'HowTo' }
};

/* ── UC11 ── */
USE_CASES.UC11 = {
  id: 'UC11', slug: 'hedis-stars-quality-improvement', title: 'HEDIS and Stars Quality Measure Improvement',
  h1: 'The members holding down your Stars score this year are identified. The measurement window is open. They have not completed the measure. A reminder was sent. Nothing happened.',
  subhead: 'Medicare Advantage Stars ratings are directly tied to HEDIS measure performance \u2014 and HEDIS performance is directly tied to whether members with open measures complete them before the measurement window closes. Zynix AI runs the outreach that turns open measures into completed ones.',
  problemHeading: 'The gap between knowing a measure is open and closing it before the window ends is the Stars problem',
  problem: '<p>Medicare Advantage health plans with direct Stars financial exposure know, months before the measurement window closes, which members are holding down specific measure scores. A member who has not had a glycosylated hemoglobin test in the measurement year is an open HEDIS CDC measure. A member who has not filled their statin for three consecutive months is an open Medication Adherence measure. The member is identified. The financial impact of non-completion is calculated. The window is still open.</p>' +
    '<p>The challenge is that knowing a measure is open is different from having the infrastructure to close it. Sending a letter that tells a member a test is due results in low response rates \u2014 not because members do not care about their health, but because a letter does not schedule the appointment, does not identify the reason the test has not been completed, and does not navigate the specific barrier that kept the member from completing it in the first place.</p>' +
    '<p>For health plans where Stars ratings drive plan revenue, per-member-per-month payments, and CMS bonus pools, HEDIS measure performance is a financial performance lever that affects the plan\u2019s margin materially. A plan that moves from three to four stars generates meaningfully higher revenue per member. The plan that knows which members and which measures represent the gap between those ratings \u2014 and still cannot close them before the measurement window ends \u2014 is leaving a known financial opportunity uncaptured.</p>',
  shortfalls: [
    { tool: 'Member Outreach Programs and Mailings', description: 'Letters, postcards, and portal notifications inform members that a measure is due. They do not identify why the member has not completed the measure, navigate the specific barrier to completion, or schedule the lab or visit in the same interaction. Response rates to passive outreach are low across all member populations and lower for the members most at risk for measure non-completion. The measure stays open.' },
    { tool: 'Call Center Outreach Programs', description: 'Call center programs can have two-way conversations with members \u2014 but they are expensive to staff for a full open-measure population, particularly in the final quarter of a Stars measurement year when all open measures need to be addressed simultaneously. Coverage gaps are common. The members who most need the outreach are often the hardest to reach and the most likely to require multiple attempts across the window.' }
  ],
  solutionHeading: 'HEDIS-specific outreach that navigates the barrier and books the service before the window closes',
  solution: '<p>ZynReminder runs HEDIS-specific member outreach \u2014 explaining the measure in plain language, identifying the specific reason the member has not completed it, and navigating the resolution in the same interaction. If the barrier is scheduling, ZynSchedule books the lab or visit at the member\u2019s preferred location and time before the call ends. If the barrier is cost or access, the interaction routes to a care coordinator or patient assistance resource.</p>' +
    '<p>The outreach scales across the full open-measure population simultaneously \u2014 not sequentially. A Stars quality team monitoring 12 HEDIS measures with thousands of open items per measure does not have to choose which measures to prioritize for outreach resources. ZynReminder runs the full population for every measure in the window, and the quality team receives completion tracking by measure, member tier, and closure timeline.</p>' +
    '<p>For health plan quality and Stars teams, the most useful metric is measure closure rate by week of the measurement window \u2014 how many open measures are being closed per week relative to the window deadline. Zynix AI provides that visibility in real time, which allows the team to identify measures where barrier rates are higher than expected and adjust the approach before the window closes.</p>',
  products: [
    { name: 'ZynReminder', descriptor: 'Two-way HEDIS-specific member outreach with barrier identification and scheduling integration', url: '/agents/preventive-quality-activation/zynreminder', status: 'Active' },
    { name: 'ZynSchedule', descriptor: 'Appointment and lab scheduling completed in the member outreach interaction', url: '/agents/operational-efficiency/zynschedule', status: 'Active' },
    { name: 'ZynGap', descriptor: 'Quality gap identification and prioritization by measure impact and closure timing', url: '/solutions/zynix-data-analytics', status: 'Planned' }
  ],
  cta: { headline: 'The measurement window is open. Let\u2019s close the measures before it ends.', label: 'Book a demo' },
  readNext: [
    { id: 'UC12', title: 'HCC Risk Adjustment Accuracy', slug: 'hcc-risk-adjustment-ma' },
    { id: 'UC14', title: 'Post-Discharge Care Management for MA Members', slug: 'post-discharge-ma-members' },
    { id: 'UC07', title: 'HCC Gap Closure and RAF Score Optimization', slug: 'hcc-gap-raf-optimization' }
  ],
  segments: { primary: 'Health Plans', alsoTagged: [] },
  seo: { title: 'HEDIS Quality Measure Improvement Medicare Advantage Stars | Zynix AI', desc: 'Close HEDIS measures before the Stars window ends. Zynix AI runs barrier-aware two-way member outreach \u2014 identifying why measures are open and scheduling the service to close them.', schema: 'HowTo' }
};

/* ── UC12 ── */
USE_CASES.UC12 = { id: 'UC12', slug: 'hcc-risk-adjustment-ma', title: 'HCC Risk Adjustment Accuracy', h1: 'Your MA members have chronic conditions documented in their chart from prior years. Those conditions are not in the current CMS data submission. The revenue gap accumulates with every submission cycle.', subhead: 'Medicare Advantage plan revenue is tied directly to the accuracy of HCC coding in the CMS risk adjustment model. Members with chronic conditions documented historically but not coded in the current period represent a direct and quantifiable revenue gap. Zynix AI connects the gap identification to the visit that closes it.', problemHeading: 'The revenue gap is in the documentation, not in the diagnosis', problem: '<p>Medicare Advantage plans operating under the CMS risk adjustment model receive higher per-member-per-month payments for members with greater chronic disease burden, as documented through HCC codes in the current data submission period. The accuracy of the HCC coding directly determines whether the revenue the plan receives reflects the true complexity of the population it is managing.</p><p>The documentation gap is structural. A member with heart failure, type 2 diabetes, and chronic kidney disease may have all three conditions managed actively and documented in their claims and clinical records from prior years. If none of those conditions appear in a face-to-face encounter coded in the current submission period, none of them contribute to the plan\u2019s current-year risk score.</p><p>Plans managing hundreds of thousands of members with complex chronic disease profiles are leaving risk adjustment revenue uncaptured not because their populations are not sick, but because the workflow that connects known chronic conditions to current-year coding encounters is not consistently in place.</p>', shortfalls: [ { tool: 'Risk Adjustment Analytics Tools', description: 'Risk adjustment analytics platforms identify suspect HCC gaps at the member level, calculate the revenue impact of each uncoded condition, and rank members by documentation priority. They do not connect to a member outreach workflow, generate a pre-visit documentation brief for the provider, or trigger scheduling for members who do not have an upcoming appointment.' }, { tool: 'Provider Coding Education and Support Programs', description: 'Provider education programs improve coding accuracy at the point of documentation \u2014 but only for members who are seen. For members without an upcoming encounter in the current submission period, provider coding education does not generate a qualifying visit.' } ], solutionHeading: 'From risk adjustment gap to qualifying encounter \u2014 at member population scale', solution: '<p>ZynGap surfaces member-level HCC gaps for the MA population, prioritized by risk adjustment revenue impact and submission deadline. For members with upcoming appointments, pre-visit documentation briefs are generated and delivered to the provider before the encounter.</p><p>For members without upcoming appointments, the Preventive and Quality Activation Agents run outreach to schedule a visit within the submission window. The interaction identifies scheduling barriers, books the appointment through ZynSchedule, and follows up with members who agreed to schedule but have not confirmed.</p><p>For MA plan finance and risk adjustment teams, the change is measurable in current-year risk scores relative to prior-year benchmarks, and in the completeness of the HCC documentation submitted in each payment year.</p>', products: [ { name: 'ZynGap', descriptor: 'HCC gap identification for MA populations, prioritized by risk adjustment revenue impact', url: '/solutions/zynix-data-analytics', status: 'Planned' }, { name: 'Preventive & Quality Activation Agents', descriptor: 'Member outreach for risk adjustment encounters and preventive care scheduling', url: '/agents/preventive-quality-activation', status: 'Active' }, { name: 'ZynSchedule', descriptor: 'Appointment scheduling within the risk adjustment submission window', url: '/agents/operational-efficiency/zynschedule', status: 'Active' } ], cta: { headline: 'The risk adjustment gap is in the data. Let\u2019s close it before the submission deadline.', label: 'Talk to our team' }, readNext: [ { id: 'UC11', title: 'HEDIS and Stars Quality Measure Improvement', slug: 'hedis-stars-quality-improvement' }, { id: 'UC13', title: 'High-Cost and High-Utilizer Member Management', slug: 'high-utilizer-member-management' }, { id: 'UC07', title: 'HCC Gap Closure and RAF Score Optimization', slug: 'hcc-gap-raf-optimization' } ], segments: { primary: 'Health Plans', alsoTagged: ['ACOs & MSOs'] }, seo: { title: 'HCC Risk Adjustment Accuracy Medicare Advantage MA Plan | Zynix AI', desc: 'Close HCC documentation gaps before the MA submission deadline. Zynix AI connects risk adjustment analytics to member outreach, provider preparation, and qualifying encounters.', schema: 'HowTo' } };

/* ── UC13 ── */
USE_CASES.UC13 = { id: 'UC13', slug: 'high-utilizer-member-management', title: 'High-Cost and High-Utilizer Member Management', h1: 'A small fraction of your membership drives a disproportionate share of medical spend. They are identified. They are enrolled in case management. They are still hard to reach consistently. The next admission is coming.', subhead: 'High-cost, high-utilizer members are known. Actuarial models identify them. Case management programs enroll them. The challenge is maintaining consistent outreach and care plan follow-through for the members who are hardest to reach and most likely to generate the next admission without it.', problemHeading: 'Case management programs identify the right members. Consistent outreach does not always follow.', problem: '<p>In most health plan books of business, 5 percent of members account for 50 percent or more of total medical expenditure. These members are not unknown to the plan. Actuarial risk models identify them. Complex case management programs enroll the highest-acuity tier.</p><p>High-utilizer members present specific engagement challenges. Many have fragmented care relationships \u2014 multiple specialists, frequent care transitions, gaps between inpatient and outpatient follow-up. Many have significant social needs that affect their willingness and ability to engage with the health plan.</p><p>Case management staff managing complex member caseloads are typically among the most clinically skilled in the plan\u2019s care management workforce. Their time is most valuable in the interactions that require clinical judgment. It is least valuable in the routine monthly check-in contact that is required to maintain program enrollment and catch emerging issues before they become acute events. That is where consistent outreach breaks down.</p>', shortfalls: [ { tool: 'Actuarial Risk Models and Identification Tools', description: 'Risk stratification models identify high-utilizer members accurately. They do not initiate contact, maintain an outreach cadence, capture barriers in a structured format, or route clinical concerns to the care team.' }, { tool: 'Complex Case Management Programs', description: 'High-touch case management works for the members who are actively enrolled and engaged. For members who are hard to reach \u2014 those who do not answer calls reliably, who have had negative experiences with plan outreach, or whose living situations create access barriers \u2014 maintaining the consistent monthly contact that program enrollment requires strains the case management team.' } ], solutionHeading: 'Rising-utilizer signals caught early. Consistent outreach maintained between case management touchpoints.', solution: '<p>ZynPredict identifies members whose utilization and clinical signals indicate a rising trajectory \u2014 not just the members already in high-tier case management, but the members approaching that threshold. The Predictive Activation Agents initiate outreach for rising-utilizer members before the next admission.</p><p>For members already enrolled in complex case management programs, the Chronic and Longitudinal Care Management Agent maintains the routine monthly outreach cadence \u2014 confirming medication adherence, checking for new symptoms, reinforcing care plan components, and identifying barriers that need case manager attention.</p><p>For health plan care management and medical management teams, the change is in how caseload hours are distributed. Case managers spend their time on the high-judgment interventions. The routine contact volume that keeps members engaged between those interventions runs through the Zynix AI workflow.</p>', products: [ { name: 'ZynPredict', descriptor: 'Predictive analytics for rising utilization and high-cost member identification', url: '/solutions/zynix-data-analytics', status: 'Planned' }, { name: 'Chronic & Longitudinal Care Management Agent', descriptor: 'Two-way monthly outreach, barrier capture, and care plan reinforcement for complex chronic members', url: '/agents/chronic-care-management', status: 'Active' }, { name: 'Predictive Activation Agents', descriptor: 'Proactive outreach acting on rising utilization signals before the next clinical event', url: '/agents/predictive-activation', status: 'Active' } ], cta: { headline: 'The members driving your highest costs are identifiable. Let\u2019s reach them consistently.', label: 'Talk to our team' }, readNext: [ { id: 'UC12', title: 'HCC Risk Adjustment Accuracy', slug: 'hcc-risk-adjustment-ma' }, { id: 'UC15', title: 'Medication Adherence for Chronic Disease Populations', slug: 'medication-adherence-chronic-populations' }, { id: 'UC08', title: 'Rising-Risk Patient Outreach Before a Clinical Event', slug: 'rising-risk-patient-outreach' } ], segments: { primary: 'Health Plans', alsoTagged: ['ACOs & MSOs', 'Health Systems'] }, seo: { title: 'High-Cost High-Utilizer Member Management Health Plan | Zynix AI', desc: 'Reach high-utilizer members before the next admission. Zynix AI combines predictive risk identification with consistent outreach and care plan follow-through for health plans.', schema: 'HowTo' } };

/* ── UC14 ── */
USE_CASES.UC14 = { id: 'UC14', slug: 'post-discharge-ma-members', title: 'Post-Discharge Care Management for MA Members', h1: 'By the time your claims system identifies that an MA member was discharged from the hospital, the TCM outreach window has already closed. The readmission risk has not.', subhead: 'Medicare Advantage plans have financial and quality exposure to post-discharge outcomes \u2014 but most plans receive discharge information on a claims lag that makes the TCM window unreachable. Zynix AI connects to real-time ADT feeds so the 48-hour contact window opens the day the member leaves the hospital, not three weeks later.', problemHeading: 'The discharge happened. The claims will tell you about it in four weeks.', problem: '<p>Medicare Advantage plans carrying quality and financial responsibility for their attributed members\u2019 post-discharge outcomes face a structural information lag. Most plans identify that a member was hospitalized through claims data \u2014 which arrives weeks after the event. By the time a care coordinator reviews the discharge report and initiates outreach, the 24-to-48-hour TCM contact window has long since closed.</p><p>The 30-day post-discharge period is when preventable readmissions occur. The first 48 hours are when the most actionable interventions can happen \u2014 identifying medication confusion before it leads to an adverse event, confirming that the follow-up appointment has been scheduled and is accessible, addressing the transportation or social barriers that might prevent the member from keeping it.</p><p>For MA plans where 30-day readmission rates affect Stars quality scores and where each readmission adds directly to MLR, the claims identification lag is not a data problem that can be solved by better reporting. It requires a fundamentally different signal source \u2014 real-time ADT feeds.</p>', shortfalls: [ { tool: 'Claims-Based Discharge Identification', description: 'Claims data provides accurate discharge identification with a two-to-four-week processing lag. By the time the discharge appears in a plan\u2019s care management system, the TCM billing window has closed and the highest-risk post-discharge period has passed.' }, { tool: 'Manual Outreach Programs for Identified Discharges', description: 'Even for plans with ADT notification systems in place, converting a discharge notification into an outreach call requires staff to review the notification, prioritize against the existing caseload, and make the call within the intervention window. At the volume of a regional MA plan\u2019s monthly discharges, manual prioritization consistently misses a significant fraction of the eligible population.' } ], solutionHeading: 'Real-time discharge detection. Forty-eight-hour contact. Every MA member.', solution: '<p>The Transitions of Care Agent connects to real-time ADT feeds from the hospital network, identifies MA member discharges within hours of occurrence, and initiates the 24-to-48-hour contact window automatically. The interaction confirms safe arrival, catches medication confusion, assesses for new or worsening symptoms, and schedules the required follow-up visit.</p><p>Medication Reconciliation identifies discrepancies between the member\u2019s pre-admission medications, discharge prescriptions, and current reported medications \u2014 routing concerns to the plan\u2019s clinical team or the member\u2019s primary care provider as appropriate. ZynSchedule confirms the follow-up appointment before the interaction ends.</p><p>For MA plan quality teams tracking 30-day readmission rates against Stars performance targets, the operational change is in how many members receive timely post-discharge contact \u2014 not which members were identified.</p>', products: [ { name: 'Transitions of Care Agent', descriptor: 'Real-time ADT-connected post-discharge outreach and quality documentation for MA members', url: '/agents/transitions-of-care', status: 'Active' }, { name: 'ZynSchedule', descriptor: 'Follow-up appointment scheduling within the post-discharge contact interaction', url: '/agents/operational-efficiency/zynschedule', status: 'Active' }, { name: 'Medication Reconciliation', descriptor: 'Post-discharge medication discrepancy identification and clinical routing', url: '/agents/transitions-of-care', status: 'Active' } ], cta: { headline: 'The member was discharged this morning. The 48-hour window is open now.', label: 'Book a demo' }, readNext: [ { id: 'UC11', title: 'HEDIS and Stars Quality Measure Improvement', slug: 'hedis-stars-quality-improvement' }, { id: 'UC12', title: 'HCC Risk Adjustment Accuracy', slug: 'hcc-risk-adjustment-ma' }, { id: 'UC06', title: 'Post-Discharge TCM and Readmission Prevention', slug: 'post-discharge-tcm-readmission' } ], segments: { primary: 'Health Plans', alsoTagged: ['ACOs & MSOs'] }, seo: { title: 'Post-Discharge Care Management Medicare Advantage Members | Zynix AI', desc: 'Reach MA members within 48 hours of discharge using real-time ADT feeds. Zynix AI eliminates the claims-lag gap and delivers post-discharge outreach before the readmission window closes.', schema: 'HowTo' } };

/* ── UC15 ── */
USE_CASES.UC15 = { id: 'UC15', slug: 'medication-adherence-chronic-populations', title: 'Medication Adherence for Chronic Disease Populations', h1: 'Non-adherent members are known. Their PDC scores are calculated. A refill reminder was sent. The prescription still has not been filled. The reason for non-adherence was never captured.', subhead: 'PDC-based medication adherence measures are among the highest-weighted Stars metrics for Medicare Advantage plans. Non-adherent members are identifiable in the pharmacy claims. The gap between knowing who has not filled their medication and knowing why \u2014 and routing the resolution \u2014 is where standard outreach programs fall short.', problemHeading: 'The non-adherent member is not unidentified. They are unreached in a way that matters.', problem: '<p>A Medicare Advantage plan managing its Stars medication adherence measures can identify, from pharmacy claims, every member who has not filled their diabetes, blood pressure, or cholesterol medication in the past 30 to 90 days. The PDC calculation is automated. The member list is current.</p><p>The question is what happens next. A refill reminder tells the member that their prescription is due. It does not ask whether the member stopped taking the medication because it caused side effects they did not report. It does not identify whether the member cannot afford the copay for a brand-name medication that has a generic alternative they were not offered.</p><p>Each of those barriers requires a different response. Side effects route to the pharmacist or prescribing provider. Cost barriers route to a patient assistance program or a formulary review. A refill reminder system cannot distinguish between these situations because it does not have a two-way conversation with the member.</p>', shortfalls: [ { tool: 'Automated Refill Reminder Systems', description: 'Refill reminders notify members that a prescription is due. They do not capture why the member has not filled it, differentiate between barrier types, or route the resolution. The measure stays open because the barrier was never identified.' }, { tool: 'Pharmacist Outreach and Intervention Programs', description: 'Clinical pharmacist programs provide high-quality, barrier-specific medication adherence intervention. They are expensive to staff at a scale that covers the full non-adherent population for a large MA plan, and they are typically limited to the highest-risk tier.' } ], solutionHeading: 'Two-way adherence outreach that captures the barrier and routes the resolution', solution: '<p>The Medication Adherence workflow within the Chronic and Longitudinal Care Management Agent contacts non-adherent members with a two-way interaction that identifies the specific barrier to medication access. Cost barriers route to patient assistance program information. Side effect concerns route to the pharmacist or prescribing provider. Clinical misunderstandings are routed to the care team for clarification.</p><p>ZynReminder manages the follow-up cadence for members who need a second contact or whose barrier resolution requires a callback confirmation. Every interaction is documented with the barrier type, routing action, and outcome.</p><p>For MA plans where medication adherence measures are among the highest-weighted components of the Stars composite, the change in PDC scores is visible at the measure level within a Stars measurement cycle.</p>', products: [ { name: 'Chronic & Longitudinal Care Management Agent', descriptor: 'Two-way medication adherence outreach with barrier identification and clinical routing', url: '/agents/chronic-care-management', status: 'Active' }, { name: 'ZynReminder', descriptor: 'Follow-up outreach for barrier resolution and medication adherence confirmation', url: '/agents/preventive-quality-activation/zynreminder', status: 'Active' } ], cta: { headline: 'Non-adherence has a reason. Let\u2019s identify it and route the resolution.', label: 'See how it works' }, readNext: [ { id: 'UC13', title: 'High-Cost and High-Utilizer Member Management', slug: 'high-utilizer-member-management' }, { id: 'UC14', title: 'Post-Discharge Care Management for MA Members', slug: 'post-discharge-ma-members' }, { id: 'UC29', title: 'Medication Adherence for Complex Chronic Patients', slug: 'medication-adherence-complex-chronic' } ], segments: { primary: 'Health Plans', alsoTagged: ['ACOs & MSOs', 'FQHCs'] }, seo: { title: 'Medication Adherence Medicare Advantage PDC Stars | Zynix AI', desc: 'Two-way adherence outreach that identifies why MA members stopped their medication \u2014 and routes the resolution to the pharmacist, provider, or assistance program that can address it.', schema: 'HowTo' } };

/* ── UC16 ── */
USE_CASES.UC16 = { id: 'UC16', slug: 'after-hours-call-handling-group-practices', title: 'After-Hours Call Handling and Patient Triage', h1: 'After your office closes, patients with health concerns have three choices: leave a voicemail, go to urgent care, or go to the ED. None of those outcomes serves your practice or your patients.', subhead: 'Independent group practices cannot afford to staff clinical after-hours coverage consistently. The calls keep coming anyway. ZynAfterHours handles every after-hours call \u2014 triaging by symptom, routing urgent cases, and scheduling next-day appointments for everything else.', problemHeading: 'After-hours call volume is a staffing problem most practices have solved with a workaround that does not work', problem: '<p>An independent group practice with four to twelve physicians typically manages after-hours calls through some combination of a physician rotation, an answering service contract, and a patient portal. The physician rotation routes every after-hours call to a physician, regardless of whether the call requires physician involvement.</p><p>The practical outcome is that patients who call after hours either reach a physician who handles a mix of genuine clinical concerns and routine questions, reach an answering service that documents the call without resolving it, or go to urgent care or the ED because none of the available options felt accessible or timely.</p><p>For independent group practices participating in value-based care arrangements, the after-hours access gap has a direct effect on care continuity and patient retention. Patients who consistently cannot reach their practice after hours develop alternative care relationships.</p>', shortfalls: [ { tool: 'Traditional Answering Services', description: 'Answering services receive after-hours calls and relay messages for callback. They cannot triage clinical urgency, differentiate between a symptom that warrants an urgent physician callback and one that warrants a next-morning appointment, or schedule follow-up access in the interaction.' }, { tool: 'On-Call Physician Rotations', description: 'Physician rotations provide clinical quality \u2014 but the rotation does not discriminate between call types. A physician who agreed to handle after-hours clinical emergencies is receiving prescription refill requests and medication question calls at 9 p.m. Burnout in on-call roles accumulates.' } ], solutionHeading: 'Clinical triage after hours \u2014 with urgent cases reaching the physician and everything else handled', solution: '<p>ZynAfterHours handles every after-hours call for the practice \u2014 assessing symptoms against consistent clinical triage logic, answering routine questions, and scheduling next-day appointments for everything that can wait. Urgent clinical situations route to the on-call physician with a summary of the patient\u2019s concern and the triage assessment.</p><p>The interaction is available in 15-plus languages. ZynSchedule books next-morning appointments in the same call \u2014 so the patient ends the interaction with a confirmed access plan.</p><p>For practices tracking patient satisfaction and retention, the change in after-hours experience is directly relevant. For practices in value-based care arrangements, the reduction in non-urgent ED visits from patients who previously had no after-hours alternative is visible in the ED utilization data within months.</p>', products: [ { name: 'ZynAfterHours & Triage', descriptor: '24/7 after-hours clinical triage in 15+ languages \u2014 symptom assessment, escalation routing, next-day scheduling', url: '/agents/operational-efficiency/zynafterhours-triage', status: 'Active' }, { name: 'ZynSchedule', descriptor: 'Next-day appointment scheduling completed in the after-hours interaction', url: '/agents/operational-efficiency/zynschedule', status: 'Active' } ], cta: { headline: 'After-hours calls handled. Urgent cases routed. Appointments scheduled. Every night.', label: 'Book a demo' }, readNext: [ { id: 'UC17', title: 'Appointment Scheduling and No-Show Reduction', slug: 'appointment-scheduling-no-show' }, { id: 'UC19', title: 'CCM Billing Execution and Chronic Care Management', slug: 'ccm-billing-chronic-care' }, { id: 'UC09', title: 'After-Hours Access and ED Diversion for ACO Populations', slug: 'after-hours-ed-diversion' } ], segments: { primary: 'Independent Group Practices', alsoTagged: ['ACOs & MSOs'] }, seo: { title: 'After-Hours Call Handling Physician Group Practice Triage | Zynix AI', desc: 'Clinical triage for every after-hours call at your group practice \u2014 urgent cases routed to the on-call physician, everything else handled and scheduled by Zynix AI.', schema: 'HowTo' } };

/* ── UC17 ── */
USE_CASES.UC17 = { id: 'UC17', slug: 'appointment-scheduling-no-show', title: 'Appointment Scheduling and No-Show Reduction', h1: 'A no-show rate of 20 percent means one in five appointment slots generates no revenue and cannot be backfilled. Your front desk staff spent time confirming appointments that did not happen.', subhead: 'High no-show rates represent a direct and compounding revenue loss for independent group practices. The problem is not that patients forget their appointments \u2014 it is that the barrier to attending was never identified or addressed. ZynSchedule runs the confirmation and rescheduling workflow that standard reminder systems are not designed to handle.', problemHeading: 'The no-show is not the problem. The barrier that caused it is the problem.', problem: '<p>An independent group practice with a 25 percent no-show rate is not experiencing a reminder system failure. It is experiencing a barrier identification failure. The patient who did not come to their appointment received the reminder. What they did not receive was a two-way conversation that identified why they were not going to make it \u2014 transportation, work schedule, childcare \u2014 and connected them to a rescheduling option before the slot was lost.</p><p>Front desk staff at independent group practices spend a meaningful portion of their time managing the scheduling consequences of no-shows \u2014 calling patients after missed appointments, managing the waitlist, and rescheduling.</p><p>For specialty practices where procedure or high-value visit slots are involved, the no-show cost compounds. A cardiology stress test slot or an orthopedic consult missed represents a significantly higher revenue loss.</p>', shortfalls: [ { tool: 'Automated Appointment Reminder Systems', description: 'Reminder systems confirm the appointment is scheduled. They do not identify the barrier to attending, offer to rebook at a more accessible time, manage the waitlist to fill a cancelled slot, or follow up when a confirmation is not received.' }, { tool: 'Front Desk Staff Confirmation Calls', description: 'Staff-managed confirmation calls provide the two-way interaction that reminder systems lack, but at a labor cost that scales with patient volume. Practices that grow their panel sizes without growing scheduling support staff see no-show rates remain constant or increase.' } ], solutionHeading: 'Barrier-aware scheduling that reduces no-shows and manages the waitlist automatically', solution: '<p>ZynSchedule handles the full appointment scheduling workflow \u2014 confirmation outreach, barrier identification, rescheduling, and waitlist management. When a patient indicates they cannot make an appointment, the interaction identifies the barrier and offers rescheduling options. The waitlist is managed dynamically so that cancellations trigger outreach to waiting patients before the slot is lost.</p><p>For new patient scheduling, ZynSchedule handles inbound requests and books appointments based on provider availability, appointment type requirements, and patient preference.</p><p>For practices with specialty or high-value procedure slots, ZynReminder runs pre-appointment preparation outreach \u2014 confirming preparation requirements and ensuring the patient arrives ready for the appointment.</p>', products: [ { name: 'ZynSchedule', descriptor: 'Full appointment scheduling workflow \u2014 confirmation, waitlist management, barrier-aware rescheduling', url: '/agents/operational-efficiency/zynschedule', status: 'Active' }, { name: 'ZynReminder', descriptor: 'Pre-appointment preparation outreach and barrier-aware confirmation', url: '/agents/preventive-quality-activation/zynreminder', status: 'Active' } ], cta: { headline: 'No-show rates go down when barriers get identified. Let\u2019s build that workflow.', label: 'See how it works' }, readNext: [ { id: 'UC16', title: 'After-Hours Call Handling and Patient Triage', slug: 'after-hours-call-handling-group-practices' }, { id: 'UC19', title: 'CCM Billing Execution and Chronic Care Management', slug: 'ccm-billing-chronic-care' }, { id: 'UC26', title: 'After-Hours Triage for Multilingual and Underserved Populations', slug: 'after-hours-triage-multilingual-fqhc' } ], segments: { primary: 'Independent Group Practices', alsoTagged: ['FQHCs'] }, seo: { title: 'Appointment Scheduling No-Show Reduction Group Practice | Zynix AI', desc: 'Reduce no-show rates with barrier-aware confirmation and dynamic rescheduling. Zynix AI handles the full scheduling workflow so your front desk focuses on patients in the office.', schema: 'HowTo' } };

/* ── UC18 ── */
USE_CASES.UC18 = { id: 'UC18', slug: 'prior-auth-workflow-management', title: 'Prior Authorization Workflow Management', h1: 'Prior authorization requests submitted two weeks ago have not been resolved. The patient\u2019s appointment is scheduled. The authorization is still pending. Staff are making status calls instead of doing the documentation work that would move the queue.', subhead: 'Independent group practices submit hundreds of prior authorization requests monthly. Each requires documentation assembly, payer submission, status follow-up, and denial management. ZynAuth handles the administrative workflow so staff focus on the clinical work that requires their judgment.', problemHeading: 'Prior authorization is not a complex problem. It is a volume problem that became a staff capacity problem.', problem: '<p>An independent group practice with eight providers across primary care, behavioral health, and specialty services submits prior authorization requests for imaging, specialty referrals, procedures, and medications every day. At any given moment, there are 60 to 100 open authorization requests in various stages of the submission and approval process.</p><p>The staff managing this queue are typically the same staff managing front desk operations, insurance verification, claim submission, and scheduling support. Prior authorization is one of many administrative responsibilities, and it competes for attention with everything else.</p><p>The patient experience consequence is real. A patient who was scheduled for an MRI three weeks ago and whose authorization is still pending is not getting the care their physician ordered.</p>', shortfalls: [ { tool: 'Practice Management System Authorization Tracking', description: 'Practice management systems log submitted authorization requests and provide a status field for tracking. They do not automatically follow up with payers before the response deadline, flag denials for escalation, or route documentation requests. They provide visibility into the queue \u2014 not movement through it.' }, { tool: 'Staff-Managed Authorization Queues', description: 'Dedicated prior authorization staff manage the queue manually. At smaller practice sizes where authorization management is shared among administrative staff with multiple responsibilities, the queue ages faster than it clears. Denials get missed. Follow-up windows close. Patients wait.' } ], solutionHeading: 'Authorization assembled, submitted, and managed \u2014 with staff attention reserved for the exceptions', solution: '<p>ZynAuth assembles the clinical documentation required for each prior authorization request from the patient record and provider order, formats it for the payer, and submits through the appropriate channel. For fax-based payer submissions, ZynFax handles the transmission. Every request is tracked against the payer\u2019s response timeline, and ZynAuth initiates status follow-up before the payer deadline passes.</p><p>When a denial arrives, ZynAuth identifies the basis for the denial and routes the appeal documentation workflow \u2014 assembling the required records, drafting the appeal, and routing to the physician or staff member for review and signature where clinical input is required.</p><p>For independent group practices where prior authorization management is consuming administrative staff time that should be available for patient-facing work, the change is in how staff time is distributed. Authorization submissions, tracking, and routine denial responses run through Zynix AI. Staff handle the escalations.</p>', products: [ { name: 'ZynAuth', descriptor: 'Prior authorization documentation assembly, submission, tracking, denial management, and appeals', url: '/agents/operational-efficiency', status: 'Active' }, { name: 'ZynFax', descriptor: 'Fax-based payer submission and receipt handling for authorization workflows', url: '/agents/operational-efficiency', status: 'Active' }, { name: 'ZynSchedule', descriptor: 'Scheduling confirmation upon authorization clearance', url: '/agents/operational-efficiency/zynschedule', status: 'Active' } ], cta: { headline: 'Prior auth submitted, tracked, and resolved \u2014 without consuming your staff\u2019s day.', label: 'Talk to our team' }, readNext: [ { id: 'UC16', title: 'After-Hours Call Handling and Patient Triage', slug: 'after-hours-call-handling-group-practices' }, { id: 'UC20', title: 'Referral Coordination and Leakage Prevention', slug: 'referral-coordination-leakage' }, { id: 'UC21', title: 'Prior Authorization for Surgical Procedures', slug: 'prior-auth-surgical-procedures' } ], segments: { primary: 'Independent Group Practices', alsoTagged: ['ASCs', 'ACOs & MSOs'] }, seo: { title: 'Prior Authorization Workflow Management Physician Practice | Zynix AI', desc: 'ZynAuth handles prior authorization from documentation assembly through denial management \u2014 so staff at independent group practices focus on patients, not status calls.', schema: 'HowTo' } };

/* ── UC19 ── */
USE_CASES.UC19 = { id: 'UC19', slug: 'ccm-billing-chronic-care', title: 'CCM Billing Execution and Chronic Care Management', h1: 'Your practice has hundreds of patients eligible for CCM billing. Most of the monthly touchpoints are not documented. The CMS revenue is not being captured. The patients are not being managed.', subhead: 'Independent group practices with large chronic disease panels are leaving significant CCM billing revenue uncaptured \u2014 not because they are unaware of the program, but because the monthly documented touchpoint requirement is administratively intensive at volume. Zynix AI executes the outreach, captures the documentation, and routes the clinical questions.', problemHeading: 'CCM billing revenue exists in the patient panel. Capturing it requires a workflow most practices do not have.', problem: '<p>CMS Chronic Care Management codes provide reimbursement for monthly non-face-to-face care management provided to Medicare beneficiaries with two or more chronic conditions. For an independent group practice with 500 Medicare patients, a significant fraction of that panel qualifies for CCM billing at a reimbursement rate that, aggregated across a year, represents material practice revenue. Most practices know this. Most practices are capturing a fraction of it.</p><p>The documentation requirement is the operational bottleneck. CCM billing requires at least 20 minutes of documented care management time per patient per month, including a time-stamped record of non-face-to-face contact.</p><p>The irony is that the patients who most benefit from CCM outreach are the same patients who, without it, are most likely to generate the unplanned visits and ED encounters that drive practice costs and value-based care penalties.</p>', shortfalls: [ { tool: 'EHR-Native CCM Modules', description: 'EHR CCM modules track patient eligibility, generate care plan templates, and provide time-tracking tools. They do not initiate outreach, execute the monthly contact, capture patient-reported barriers, or route clinical questions to the care team. They are documentation systems for care management work that has been done.' }, { tool: 'Care Coordinator Staff Outreach', description: 'Care coordinators or medical assistants assigned CCM outreach responsibilities can execute the program \u2014 for the patients they have time to reach. At 200 to 400 monthly contacts, the outreach volume competes with every other clinical support responsibility during the day.' } ], solutionHeading: 'Monthly CCM outreach executed, documented, and billed \u2014 for every eligible patient', solution: '<p>The Chronic and Longitudinal Care Management Agent runs monthly outreach for every CCM-eligible patient in the practice panel \u2014 a two-way interaction that confirms current medication status, identifies barriers, captures clinical concerns, and documents the time-stamped interaction record required for CMS billing.</p><p>ZynReminder manages the patients who need a second contact within the month. ZynSchedule books follow-up appointments for patients whose monthly interaction identified a clinical need for a face-to-face visit.</p><p>For practices tracking CCM billing revenue as a distinct contribution to practice financials, the change is in completion rates \u2014 how many of the eligible monthly contacts are documented and billed versus how many aged uncaptured.</p>', products: [ { name: 'Chronic & Longitudinal Care Management Agent', descriptor: 'Monthly two-way CCM outreach, documentation, escalation routing, and billing record generation', url: '/agents/chronic-care-management', status: 'Active' }, { name: 'ZynReminder', descriptor: 'Follow-up outreach for non-responsive patients and barrier resolution within the CCM contact cycle', url: '/agents/preventive-quality-activation/zynreminder', status: 'Active' }, { name: 'ZynSchedule', descriptor: 'Follow-up appointment scheduling when monthly interaction identifies a face-to-face need', url: '/agents/operational-efficiency/zynschedule', status: 'Active' } ], cta: { headline: 'CCM billing revenue is in your panel. Let\u2019s build the workflow that captures it.', label: 'Book a demo' }, readNext: [ { id: 'UC16', title: 'After-Hours Call Handling and Patient Triage', slug: 'after-hours-call-handling-group-practices' }, { id: 'UC17', title: 'Appointment Scheduling and No-Show Reduction', slug: 'appointment-scheduling-no-show' }, { id: 'UC10', title: 'Chronic Care Coordination at Scale', slug: 'chronic-care-coordination-scale' } ], segments: { primary: 'Independent Group Practices', alsoTagged: ['ACOs & MSOs', 'FQHCs'] }, seo: { title: 'CCM Billing Execution Chronic Care Management Group Practice | Zynix AI', desc: 'Capture CCM billing revenue for every eligible patient in your panel. Zynix AI runs monthly documented outreach, identifies barriers, and produces billing-ready records at practice scale.', schema: 'HowTo' } };

/* ── UC20 ── */
USE_CASES.UC20 = { id: 'UC20', slug: 'referral-coordination-leakage', title: 'Referral Coordination and Leakage Prevention', h1: 'Referrals generated in your practice complete at far lower rates than you expect. The patient received the referral and did not follow through. The specialist never confirmed receipt. Neither of you will know until the patient mentions it at the next visit.', subhead: 'Referrals generated by a group practice complete at far lower rates than the ordering clinician expects. The clinical handoff sits in a fax queue or a patient\u2019s good intentions \u2014 and the downstream impact on outcomes and network retention compounds. Zynix AI tracks every referral until it is closed.', problemHeading: 'The referral was generated. What happens next is not being tracked.', problem: '<p>A group practice ordering a referral to cardiology, orthopedics, or a specialist for a patient with a new or worsening condition has, in most cases, completed what the practice management system considers a completed workflow. The referral document was generated. The fax was sent to the specialist. The patient was told to call and schedule. The task is closed.</p><p>The reality is that a significant fraction of those referrals never result in a specialist appointment. Patients receive the referral and do not follow through. Specialist offices receive the fax and do not confirm receipt.</p><p>The clinical consequences are real. For group practices in value-based care arrangements, referral completion rates affect continuity of care metrics, network retention, and the downstream outcomes that determine shared savings performance.</p>', shortfalls: [ { tool: 'Practice Management System Referral Tracking', description: 'Practice management systems generate referral documentation and provide a status field for tracking. They do not confirm that the specialist received the referral, that the patient has scheduled the appointment, or that the specialist has the clinical context they need for the visit.' }, { tool: 'Staff Follow-Up Programs', description: 'Administrative staff calling patients to confirm referral scheduling is a workflow that works for the referrals prioritized for follow-up. At the volume of referrals generated by a multi-physician group practice, systematic follow-up for every referral until completion is not achievable alongside other administrative responsibilities.' } ], solutionHeading: 'Every referral tracked from generation to specialist appointment \u2014 without adding to staff workload', solution: '<p>ZynFax receives incoming communications from the specialist office \u2014 confirmations, scheduling requests, clinical questions, and results \u2014 and routes them to the appropriate staff member with the context needed to act. The referring practice knows what the specialist received and when.</p><p>ZynReminder follows up with the patient after the referral is generated \u2014 confirming they have contacted the specialist, identifying barriers to scheduling, and providing the specialist\u2019s contact information and a direct scheduling link if the patient has not yet called.</p><p>For ACO-affiliated group practices, referral completion rates and network retention are performance metrics that affect shared savings calculations.</p>', products: [ { name: 'ZynFax', descriptor: 'Reads, classifies, routes, and assigns ownership to incoming specialist communications and referral documents', url: '/agents/operational-efficiency', status: 'Active' }, { name: 'ZynReminder', descriptor: 'Patient follow-up outreach to confirm referral scheduling and identify barriers', url: '/agents/preventive-quality-activation/zynreminder', status: 'Active' }, { name: 'ZynSchedule', descriptor: 'Specialist appointment booking at the point of referral when integrated', url: '/agents/operational-efficiency/zynschedule', status: 'Active' } ], cta: { headline: 'Referrals generated. Tracked. Closed. Every one.', label: 'See how it works' }, readNext: [ { id: 'UC18', title: 'Prior Authorization Workflow Management', slug: 'prior-auth-workflow-management' }, { id: 'UC17', title: 'Appointment Scheduling and No-Show Reduction', slug: 'appointment-scheduling-no-show' }, { id: 'UC22', title: 'Referral Intake and Documentation Management', slug: 'referral-intake-asc' } ], segments: { primary: 'Independent Group Practices', alsoTagged: ['ACOs & MSOs', 'Health Systems'] }, seo: { title: 'Referral Coordination Leakage Prevention Group Practice | Zynix AI', desc: 'Track every referral until the specialist appointment is confirmed. Zynix AI follows up with patients, routes specialist communications, and closes referral loops for group practices.', schema: 'HowTo' } };

/* ── UC21 ── */
USE_CASES.UC21 = { id: 'UC21', slug: 'prior-auth-surgical-procedures', title: 'Prior Authorization for Surgical Procedures', h1: 'The OR slot is blocked. The authorization was submitted 10 days ago. The payer has not responded. Staff are on hold. The surgeon is asking why the case is not confirmed.', subhead: 'Ambulatory surgery centers face authorization requirements for the majority of their procedure volume. Delays stall OR scheduling, frustrate surgeons, and generate expensive idle time when approvals arrive after the case date. Zynix AI manages the entire workflow so the OR schedule stays intact.', problemHeading: 'Authorization delays in a surgical environment are not an administrative inconvenience \u2014 they are an OR efficiency problem', problem: '<p>Ambulatory surgery centers managing orthopedic, ophthalmologic, GI, and general surgery case volumes are processing prior authorization requests for the majority of their procedures. An ASC doing 80 cases per month might have 60 or more active authorization requests in process at any given time.</p><p>The authorization management workflow in most ASCs is held together by one or two administrative staff who manage payer portals, respond to information requests, track status, and handle denials alongside their other responsibilities.</p><p>For ASCs with surgical volume that includes high-reimbursement procedure categories \u2014 total joint replacement, spine surgery, complex GI \u2014 a missed authorization window or an uncontested denial is a direct revenue loss.</p>', shortfalls: [ { tool: 'Authorization Status Tracking Across Payer Portals', description: 'Tracking authorization status across multiple payer portals requires staff to log in to each portal individually, check the status of outstanding requests, and manually update the internal tracking system. The staff time consumed tracking status is time not spent on the documentation work that moves authorizations forward.' }, { tool: 'Manual Denial Management', description: 'When a denial arrives, the response window is short and the documentation requirements are specific. ASC administrative staff managing active case volumes often discover denials late \u2014 after the response window has narrowed \u2014 because denial notifications are mixed in with normal case correspondence.' } ], solutionHeading: 'Documentation assembled, submitted, and tracked \u2014 with denials flagged before the window closes', solution: '<p>ZynAuth assembles the required clinical documentation from the surgical order and patient record, formats it for the payer\u2019s requirements, and submits. For ASCs with fax-based payer communications, ZynFax handles the transmission and incoming acknowledgment. Every authorization is tracked against the payer\u2019s stated response timeline \u2014 and ZynAuth initiates follow-up before the deadline passes.</p><p>Denial notifications are flagged immediately. ZynAuth identifies the denial basis, assembles the appeal documentation, and routes to the clinical or administrative staff member who needs to review and sign off before submission. Peer-to-peer review requests are escalated directly to the surgeon with the authorization context attached.</p><p>For ASC operations teams managing OR scheduling efficiency, the change is in how many cases are confirmed on schedule versus delayed or cancelled due to authorization status.</p>', products: [ { name: 'ZynAuth', descriptor: 'Surgical prior authorization documentation assembly, submission, tracking, denial management, and appeals', url: '/agents/operational-efficiency', status: 'Active' }, { name: 'ZynFax', descriptor: 'Fax-based payer submission and receipt handling for authorization workflows', url: '/agents/operational-efficiency', status: 'Active' } ], cta: { headline: 'OR schedules stay intact when authorizations are managed before they stall.', label: 'Book a demo' }, readNext: [ { id: 'UC22', title: 'Referral Intake and Documentation Management', slug: 'referral-intake-asc' }, { id: 'UC23', title: 'Patient Scheduling and Pre-Procedure Preparation', slug: 'surgical-scheduling-pre-procedure' }, { id: 'UC04', title: 'Prior Authorization Across High-Volume Specialty Services', slug: 'prior-auth-high-volume-specialty' } ], segments: { primary: 'ASCs', alsoTagged: ['Health Systems'] }, seo: { title: 'Prior Authorization Surgical Procedures Ambulatory Surgery Center | Zynix AI', desc: 'Manage surgical prior authorizations from documentation assembly through denial appeals. Zynix AI keeps OR schedules intact and flags denials before the response window closes.', schema: 'HowTo' } };

/* ── UC22 ── */
USE_CASES.UC22 = { id: 'UC22', slug: 'referral-intake-asc', title: 'Referral Intake and Documentation Management', h1: 'Your ASC receives referral faxes from a dozen different referring practices. Each one arrives as an unclassified document in a queue. Someone has to open every page to figure out what it is, where it belongs, and what is missing.', subhead: 'ASCs receive the majority of their case volume through specialist referrals \u2014 arriving as faxes with clinical documentation, imaging, and insurance information. Processing incoming referrals manually is time-intensive and error-prone. ZynFax reads, classifies, and routes every incoming document so the surgical intake team starts with organized, action-ready information.', problemHeading: 'The fax queue is not a workflow problem. It is a volume problem that looks like a workflow problem.', problem: '<p>An ambulatory surgery center managing 80 cases per month across orthopedics, ophthalmology, and GI receives a corresponding volume of incoming fax documents \u2014 referral packets, preoperative clearance notes, imaging reports, lab results, insurance correspondence, and prior authorization confirmations.</p><p>The intake team opens every incoming fax, identifies the document type, determines which patient it belongs to, routes it to the appropriate staff member, and flags any missing items.</p><p>The consequences of an unmanaged fax queue in an ASC setting are measured in case delays and cancellations \u2014 both of which have costs that significantly exceed the administrative time that better intake management would have saved.</p>', shortfalls: [ { tool: 'Electronic Fax Systems and Digital Fax Platforms', description: 'Digital fax platforms deliver incoming faxes as PDFs and provide a shared inbox for the team. They do not read the content of the fax, identify the document type, match it to the correct patient, determine which staff member should receive it, or flag missing items. The queue is digital rather than paper. The work is the same.' }, { tool: 'Manual Intake Workflows and Staff Assignment', description: 'Assigning specific staff members to fax intake processing creates accountability but does not change the fundamental time requirement of reading and classifying each document. In ASC environments where intake staff also manage scheduling, insurance verification, and pre-op coordination, fax processing competes with higher-priority activities.' } ], solutionHeading: 'Fax queue classified, routed, and action-ready before the intake team starts their day', solution: '<p>ZynFax reads every incoming fax at the document level \u2014 identifying document type (referral packet, lab result, imaging report, insurance correspondence, authorization confirmation), matching to the appropriate patient and case, and routing to the staff queue responsible for that document type. Missing items are flagged immediately.</p><p>For ASC intake coordinators who previously spent the first hour of every morning processing the fax queue, the change is in what that hour is used for. The queue is organized by document type and priority.</p><p>For referring practices, the intake experience changes as well \u2014 ZynFax routes the acknowledgment of received referral documents back to the practice\u2019s fax number, closing the communication loop.</p>', products: [ { name: 'ZynFax', descriptor: 'Reads, classifies, routes, and assigns ownership to incoming referral faxes and clinical documents', url: '/agents/operational-efficiency', status: 'Active' } ], cta: { headline: 'The fax queue is already organized before the intake team arrives.', label: 'Talk to our team' }, readNext: [ { id: 'UC21', title: 'Prior Authorization for Surgical Procedures', slug: 'prior-auth-surgical-procedures' }, { id: 'UC23', title: 'Patient Scheduling and Pre-Procedure Preparation', slug: 'surgical-scheduling-pre-procedure' }, { id: 'UC20', title: 'Referral Coordination and Leakage Prevention', slug: 'referral-coordination-leakage' } ], segments: { primary: 'ASCs', alsoTagged: ['Independent Group Practices'] }, seo: { title: 'Referral Intake Document Management Ambulatory Surgery Center | Zynix AI', desc: 'ZynFax reads, classifies, and routes every incoming referral fax at your ASC \u2014 so the surgical intake team starts with organized, action-ready information instead of an unclassified queue.', schema: 'HowTo' } };

/* ── UC23 ── */
USE_CASES.UC23 = { id: 'UC23', slug: 'surgical-scheduling-pre-procedure', title: 'Patient Scheduling and Pre-Procedure Preparation', h1: 'The surgical case is scheduled. The pre-op labs were ordered six weeks ago. The patient has not completed them. You will find out at check-in \u2014 two hours before the OR time.', subhead: 'Surgical cases require more than a confirmed date. Patients need specific preparation \u2014 dietary restrictions, medication holds, transportation, consent, lab completion. When pre-procedure preparation is incomplete at check-in, cases are delayed or cancelled at significant cost to OR efficiency and patient experience. Zynix AI runs the preparation workflow that scheduling systems are not designed to manage.', problemHeading: 'Case cancellations do not happen in the OR. They happen when preparation was not confirmed.', problem: '<p>An ambulatory surgery center that cancels a case on the day of surgery has already absorbed most of the cost of that case. Staff are present. The OR is prepared. The surgeon has arrived. A case cancellation at that stage is an operational and financial loss that the scheduling confirmation call two days prior could have prevented.</p><p>Pre-procedure preparation for surgical patients is genuinely complex. The requirements vary by procedure type, surgeon preference, patient comorbidity profile, and anesthesia plan.</p><p>ASC scheduling staff who are responsible for pre-op coordination alongside scheduling, insurance verification, and authorization management cannot consistently execute the full preparation workflow for every patient on every case.</p>', shortfalls: [ { tool: 'Scheduling Systems and Appointment Confirmation', description: 'Scheduling systems confirm the appointment date and send a standard reminder. They do not verify that the pre-op lab was completed, that the patient understood the dietary restriction, that medication holds were implemented correctly, or that transportation is confirmed.' }, { tool: 'Pre-Op Preparation Phone Call Programs', description: 'Staff-managed pre-op calls provide the personalized preparation verification that automated reminders cannot. They are time-intensive at case volume and depend on patients being available by phone during business hours. Patients who cannot be reached receive a voicemail with preparation instructions.' } ], solutionHeading: 'Preparation verified, not just confirmed \u2014 before the case reaches the OR', solution: '<p>ZynSchedule manages the confirmation workflow \u2014 booking appointments, managing the schedule, and triggering the pre-procedure preparation sequence for each scheduled case. ZynReminder runs the preparation outreach in the days leading up to the procedure, customized to the procedure type and patient profile: verifying lab completion, reviewing dietary and medication preparation instructions, confirming transportation, and flagging any item that is incomplete or unclear.</p><p>When a pre-op item is incomplete, the flag routes to the clinical or scheduling staff member who can resolve it before the case date.</p><p>For ASC operations teams tracking case cancellation rates and OR utilization, the change is in how many cases proceed on schedule versus how many are cancelled or delayed due to incomplete preparation.</p>', products: [ { name: 'ZynSchedule', descriptor: 'Surgical appointment scheduling and pre-procedure preparation sequence trigger', url: '/agents/operational-efficiency/zynschedule', status: 'Active' }, { name: 'ZynReminder', descriptor: 'Pre-procedure preparation outreach \u2014 verification of labs, dietary restrictions, medication holds, and transportation', url: '/agents/preventive-quality-activation/zynreminder', status: 'Active' } ], cta: { headline: 'Pre-op preparation confirmed before the case date. Every item. Every patient.', label: 'See how it works' }, readNext: [ { id: 'UC21', title: 'Prior Authorization for Surgical Procedures', slug: 'prior-auth-surgical-procedures' }, { id: 'UC22', title: 'Referral Intake and Documentation Management', slug: 'referral-intake-asc' }, { id: 'UC24', title: 'Post-Procedure Follow-Up and Complication Monitoring', slug: 'post-procedure-followup-complication' } ], segments: { primary: 'ASCs', alsoTagged: [] }, seo: { title: 'Surgical Patient Scheduling Pre-Procedure Preparation ASC | Zynix AI', desc: 'Verify every pre-procedure preparation item before the case date. Zynix AI confirms labs, dietary instructions, medication holds, and transportation \u2014 so day-of cancellations stop happening.', schema: 'HowTo' } };

/* ── UC24 ── */
USE_CASES.UC24 = { id: 'UC24', slug: 'post-procedure-followup-complication', title: 'Post-Procedure Follow-Up and Complication Monitoring', h1: 'Most post-procedure complications surface in the first 24 to 72 hours after an outpatient surgical case. Most ASCs have no structured outreach workflow for that window. The patient manages alone until something becomes concerning enough to call.', subhead: 'Post-procedure complications \u2014 wound concerns, pain management questions, unexpected symptoms \u2014 typically emerge in the first 24 to 72 hours after outpatient surgery. Most ASCs have no structured outreach workflow for this window. Zynix AI contacts every patient in the monitoring period and routes what needs clinical attention.', problemHeading: 'The 72-hour post-procedure window is the most important patient contact most ASCs are not making', problem: '<p>A patient who underwent a laparoscopic cholecystectomy yesterday morning left the ASC with discharge instructions, a follow-up appointment in two weeks, and a phone number to call if they had concerns. They are at home managing mild nausea, a wound site that looks different from what the discharge photo showed, and uncertainty about whether their pain level is normal or not.</p><p>Most ASCs have no proactive outreach infrastructure for the 24-to-72-hour post-procedure window. The clinical team assumes patients will call if something is wrong. Patients assume their symptoms are normal unless they are obviously severe.</p><p>For ASCs, the clinical and operational consequences of a missed post-procedure complication are significant. For ASCs building quality reputations with referring surgeons and health systems, post-procedure outcomes in the monitoring period are a direct reflection of the care coordination infrastructure.</p>', shortfalls: [ { tool: 'Automated Post-Procedure Survey Systems', description: 'Automated post-discharge surveys collect patient-reported symptom data \u2014 usually through a portal link. They do not triage urgency, interpret clinical significance, or route concerning responses to the clinical team in real time.' }, { tool: 'Staff Callback Programs', description: 'Staff-managed post-procedure callback programs provide real clinical value when they are consistently executed. They are difficult to staff consistently at surgical case volume. Callbacks that happen for the highest-acuity cases do not happen for the cases that appeared routine at discharge.' } ], solutionHeading: 'Proactive post-procedure contact for every patient \u2014 with clinical concerns routed before they escalate', solution: '<p>The Transitions of Care Agent contacts every post-procedure patient within 24 to 72 hours \u2014 assessing current symptom status, capturing questions about recovery, routing clinical concerns to the surgeon or clinical team with full context, and scheduling follow-up appointments where warranted.</p><p>ZynReminder handles the patients who need a follow-up contact. ZynSchedule manages the follow-up appointment booking when the clinical concern warrants a visit.</p><p>For ASC operations teams tracking complication-related ED visits and unplanned returns to the OR, the change in post-procedure contact rates is directly relevant to quality performance data.</p>', products: [ { name: 'Transitions of Care Agent', descriptor: 'Post-procedure patient outreach, symptom assessment, clinical escalation routing, and follow-up scheduling', url: '/agents/transitions-of-care', status: 'Active' }, { name: 'ZynReminder', descriptor: 'Follow-up outreach for patients requiring monitoring or who were not reached in the primary contact window', url: '/agents/preventive-quality-activation/zynreminder', status: 'Active' }, { name: 'ZynSchedule', descriptor: 'Follow-up appointment scheduling when post-procedure concern warrants a clinical visit', url: '/agents/operational-efficiency/zynschedule', status: 'Active' } ], cta: { headline: 'Post-procedure complications are caught when patients are contacted. Let\u2019s build that workflow.', label: 'Book a demo' }, readNext: [ { id: 'UC23', title: 'Patient Scheduling and Pre-Procedure Preparation', slug: 'surgical-scheduling-pre-procedure' }, { id: 'UC21', title: 'Prior Authorization for Surgical Procedures', slug: 'prior-auth-surgical-procedures' }, { id: 'UC01', title: 'Post-Discharge Follow-Up at Scale', slug: 'post-discharge-follow-up' } ], segments: { primary: 'ASCs', alsoTagged: ['Health Systems'] }, seo: { title: 'Post-Procedure Follow-Up Complication Monitoring Outpatient Surgery | Zynix AI', desc: 'Reach every outpatient surgical patient in the 24\u201372 hour monitoring window. Zynix AI assesses symptoms, routes clinical concerns, and schedules follow-up before complications escalate.', schema: 'HowTo' } };

/* ── UC25 ── */
USE_CASES.UC25 = { id: 'UC25', slug: 'fax-inbound-document-routing', title: 'Fax and Inbound Document Routing', h1: 'Your ASC receives hundreds of incoming faxes each week. Every one of them arrives as an unclassified PDF. Staff open each one to figure out what it is. Half of them are waiting to be acted on by someone who has not seen them yet.', subhead: 'High-volume surgical environments receive hundreds of faxes daily \u2014 referral documents, lab results, insurance correspondence, prior auth confirmations, imaging reports. Processing this volume manually requires dedicated staff time. Documents get lost in queues. Zynix AI turns the fax queue into an organized, prioritized action list.', problemHeading: 'A fax queue that nobody has time to process is a patient care delay waiting to happen', problem: '<p>An ASC receiving 150 faxes per week across referral intake, payer correspondence, and clinical documentation has a document management problem that scales with case volume. Each fax arrives as a PDF image with no metadata beyond the sending fax number.</p><p>The time cost of processing incoming faxes at this volume is not marginal. In ASC environments where administrative staff are also managing scheduling, insurance verification, and patient communications, fax processing competes directly with patient-facing work.</p><p>The clinical risk is specific. A lab result that does not reach the surgeon before the pre-operative assessment window closes delays the case. An authorization denial that is not routed to the billing coordinator within the appeal window loses the authorization.</p>', shortfalls: [ { tool: 'Digital Fax Systems', description: 'Electronic fax platforms convert incoming faxes from physical transmission to digital PDFs and deliver them to a shared inbox. They do not read the content of each document, identify what type of document it is, determine which staff member or department should receive it, or flag items that require immediate action.' }, { tool: 'Manual Document Distribution Workflows', description: 'Assigning a dedicated staff member to process incoming faxes creates consistency when that person is available and at capacity. It creates a bottleneck the moment they are not. The labor cost of manual fax processing scales directly with document volume, with no technology leverage applied to the most time-consuming step.' } ], solutionHeading: 'Every incoming document read, classified, and routed \u2014 without a staff member opening a single fax', solution: '<p>ZynFax processes every incoming fax at the document level \u2014 reading the content, identifying the document type across dozens of categories, matching to the correct patient and case record, and routing to the appropriate staff queue. Items that require immediate action are flagged for priority review.</p><p>For staff who previously spent the first portion of each morning processing the fax queue, the change is in what that time is used for. Documents arrive pre-classified. The referral intake coordinator sees referral packets. The billing coordinator sees authorization correspondence. The surgeon sees lab results and imaging reports.</p><p>For ASC leadership teams tracking administrative staff utilization and case workflow efficiency, the reduction in fax processing time is directly available for reallocation to higher-value work.</p>', products: [ { name: 'ZynFax', descriptor: 'Reads, classifies, routes, and assigns ownership to every incoming fax by document type, clinical content, and ownership', url: '/agents/operational-efficiency', status: 'Active' } ], cta: { headline: 'The fax queue is organized before anyone opens it. Let\u2019s show you how.', label: 'See how it works' }, readNext: [ { id: 'UC22', title: 'Referral Intake and Documentation Management', slug: 'referral-intake-asc' }, { id: 'UC21', title: 'Prior Authorization for Surgical Procedures', slug: 'prior-auth-surgical-procedures' }, { id: 'UC20', title: 'Referral Coordination and Leakage Prevention', slug: 'referral-coordination-leakage' } ], segments: { primary: 'ASCs', alsoTagged: ['Health Systems', 'Independent Group Practices'] }, seo: { title: 'Fax Inbound Document Routing Healthcare Workflow Automation | Zynix AI', desc: 'ZynFax reads, classifies, and routes every incoming healthcare fax by document type and ownership \u2014 turning an unclassified queue into a prioritized action list for your ASC or practice.', schema: 'HowTo' } };

/* ── UC26 ── */
USE_CASES.UC26 = { id: 'UC26', slug: 'after-hours-triage-multilingual-fqhc', title: 'After-Hours Triage for Multilingual and Underserved Populations', h1: 'A patient calls your FQHC at 9 p.m. in Spanish. Your answering service speaks English. The patient is concerned about their child\u2019s fever. They end up in the ED \u2014 not because they needed emergency care, but because there was no alternative.', subhead: 'FQHCs serve patient populations with significant language diversity and elevated after-hours healthcare need. When a patient cannot reach their FQHC after hours in their primary language, the barrier compounds \u2014 medical urgency in a second language leads to delayed care or a preventable ED visit. Zynix AI provides consistent multilingual clinical triage access around the clock.', problemHeading: 'The language barrier after hours is a care access barrier \u2014 and a patient safety gap', problem: '<p>An FQHC serving a predominantly Spanish-speaking, Haitian Creole-speaking, or Vietnamese-speaking community does not have the after-hours coverage infrastructure that matches its patient population\u2019s access needs. After-hours calls go to an English-only answering service, or to a rotation of on-call clinicians who may not speak the patient\u2019s primary language.</p><p>The after-hours access problem at FQHCs is not simply a staffing cost problem \u2014 it is a structural equity problem. The populations FQHCs exist to serve have disproportionately high after-hours healthcare need: higher rates of chronic disease, more complex social circumstances, less access to alternative care settings.</p><p>For FQHCs tracking ED utilization as a HRSA UDS metric and managing the cost burden of preventable ED visits on an already resource-constrained budget, the after-hours access gap has both clinical and financial consequences.</p>', shortfalls: [ { tool: 'English-Only Answering Services', description: 'Traditional answering services receive after-hours calls, take messages, and relay callback requests. Most operate in English with limited or no capacity for other languages. For FQHCs whose patient populations include significant proportions of non-English speakers, an English-only answering service does not provide clinical triage access. It provides documentation of an access failure.' }, { tool: 'On-Call Clinician Rotations', description: 'On-call clinicians provide genuine clinical value \u2014 when they speak the patient\u2019s language, when the call is a clinical concern that requires physician involvement, and when the volume is manageable. FQHCs running on-call rotations find that call volume includes a significant proportion of non-clinical questions and routine concerns that do not require physician involvement.' } ], solutionHeading: 'Clinical triage in every patient\u2019s language \u2014 every hour the FQHC is not available', solution: '<p>ZynAfterHours handles after-hours calls in 15-plus languages \u2014 applying consistent clinical triage logic to assess urgency, provide guidance, route clinical concerns to the on-call clinician, and schedule next-day appointments for everything that can wait. A Spanish-speaking patient calling at 9 p.m. with a concern about their child\u2019s symptoms reaches a clinical triage interaction in Spanish.</p><p>For patients with urgent clinical concerns, ZynAfterHours routes to the on-call clinician with a summary of the patient\u2019s concern and the triage assessment. ZynSchedule books next-day appointments in the same interaction.</p><p>For FQHCs reporting HRSA UDS metrics on after-hours access and ED utilization, the change in after-hours contact resolution rates and preventable ED visits is directly relevant to quality reporting.</p>', products: [ { name: 'ZynAfterHours & Triage', descriptor: '24/7 after-hours clinical triage in 15+ languages \u2014 symptom assessment, escalation routing, next-day scheduling', url: '/agents/operational-efficiency/zynafterhours-triage', status: 'Active' }, { name: 'ZynSchedule', descriptor: 'Next-day appointment scheduling completed in the after-hours interaction', url: '/agents/operational-efficiency/zynschedule', status: 'Active' } ], cta: { headline: 'Every patient. Every language. Every hour the FQHC is not available.', label: 'Book a demo' }, readNext: [ { id: 'UC27', title: 'SDoH Screening, Identification, and Care Navigation', slug: 'sdoh-screening-care-navigation' }, { id: 'UC30', title: 'Post-Discharge Follow-Up for High-Risk FQHC Patients', slug: 'post-discharge-followup-fqhc' }, { id: 'UC16', title: 'After-Hours Call Handling and Patient Triage', slug: 'after-hours-call-handling-group-practices' } ], segments: { primary: 'FQHCs', alsoTagged: ['Independent Group Practices'] }, seo: { title: 'After-Hours Triage Multilingual FQHC Underserved Population | Zynix AI', desc: 'ZynAfterHours provides 24/7 clinical triage in 15+ languages for FQHC patient populations \u2014 routing urgent concerns and scheduling next-day access so the ED is a last resort.', schema: 'HowTo' } };

/* ── UC27 ── */
USE_CASES.UC27 = { id: 'UC27', slug: 'sdoh-screening-care-navigation', title: 'SDoH Screening, Identification, and Care Navigation', h1: 'Your FQHC is required to screen for social determinants of health. The screening form exists. It is not integrated into the outreach workflow. Transportation barriers, food insecurity, and housing instability are being identified in clinic \u2014 but not in the patient interactions where you could route them to a resource before the next visit.', subhead: 'FQHCs are required to screen for and address social determinants of health, but integrating SDoH identification into a high-volume outreach workflow is operationally demanding. Zynix AI identifies social barriers during existing patient interactions and routes them to the right resource without requiring a separate screening visit.', problemHeading: 'SDoH screening that happens at the visit misses the patients who are not coming in', problem: '<p>FQHCs operating under HRSA UDS reporting requirements collect SDoH data as part of the clinical encounter. The problem is that screening happens at the point of care, which means it only captures patients who make it to the clinic.</p><p>For FQHC patient populations where social barriers are among the primary reasons patients do not make it to the clinic, a screening process that only operates at the visit misses the patients with the highest social need.</p><p>Integrating SDoH identification into outreach interactions \u2014 the chronic care management check-in, the appointment reminder call, the post-discharge follow-up \u2014 allows the FQHC to capture social barriers at the moments when patients are engaged, not just when they are present.</p>', shortfalls: [ { tool: 'Paper-Based and In-Clinic SDoH Screening Tools', description: 'Standardized SDoH screening instruments capture structured SDoH data effectively in the clinical encounter. They are administered at the point of care and require the patient to be present. They do not integrate with outreach workflows or connect to community resource routing in real time.' }, { tool: 'Separate Care Navigation Programs', description: 'Care navigation programs that follow up on identified SDoH needs add a valuable layer of support \u2014 but they add a step. A patient who discloses a food insecurity concern at a clinical screening and then receives a callback from a care navigator two weeks later has experienced a fragmented process.' } ], solutionHeading: 'Social barriers identified and routed in the same interaction \u2014 without a separate screening visit', solution: '<p>The SDoH Determination Agent identifies social barriers during existing outreach interactions \u2014 chronic care management check-ins, appointment confirmation calls, post-discharge follow-up \u2014 capturing transportation barriers, food insecurity, housing instability, and language access needs in a structured format.</p><p>When a social barrier is identified, the agent routes to the appropriate community resource or care navigator in the same interaction. A patient who discloses a transportation barrier during their monthly chronic care check-in receives the routing to the transportation assistance program before the call ends.</p><p>For FQHCs reporting HRSA UDS SDoH screening rates and tracking the connection between social needs and clinical outcomes, the change is in how many patient interactions include structured SDoH data \u2014 not just the patients who arrived for a visit.</p>', products: [ { name: 'SDoH Determination Agent', descriptor: 'Identifies social barriers during outreach interactions and routes to community resources or care navigators', url: '/agents/clinical-performance', status: 'Planned' }, { name: 'Chronic & Longitudinal Care Management Agent', descriptor: 'Monthly two-way outreach workflow within which SDoH screening is embedded', url: '/agents/chronic-care-management', status: 'Active' } ], cta: { headline: 'Social barriers get addressed when they are identified in the workflow. Let\u2019s build that integration.', label: 'Talk to our team' }, readNext: [ { id: 'UC26', title: 'After-Hours Triage for Multilingual and Underserved Populations', slug: 'after-hours-triage-multilingual-fqhc' }, { id: 'UC28', title: 'Preventive Screening Gap Closure for High-Barrier Populations', slug: 'preventive-screening-gap-fqhc' }, { id: 'UC30', title: 'Post-Discharge Follow-Up for High-Risk FQHC Patients', slug: 'post-discharge-followup-fqhc' } ], segments: { primary: 'FQHCs', alsoTagged: ['ACOs & MSOs', 'Health Systems'] }, seo: { title: 'SDoH Screening Care Navigation FQHC Social Determinants | Zynix AI', desc: 'Identify and route social determinants of health during outreach interactions \u2014 not just in-clinic screenings. Zynix AI captures SDoH barriers and routes to community resources in the same workflow.', schema: 'HowTo' } };

/* ── UC28 ── */
USE_CASES.UC28 = { id: 'UC28', slug: 'preventive-screening-gap-fqhc', title: 'Preventive Screening Gap Closure for High-Barrier Populations', h1: 'A patient in your FQHC panel has had an open mammogram order for six months. They have not scheduled the appointment. A reminder was sent. Nothing happened. The reason the order is still open has never been asked.', subhead: 'Preventive screening completion rates in FQHC populations are structurally lower than in the general population \u2014 not because patients decline, but because the path from order to completion is longer and more barrier-prone. Zynix AI identifies open screening gaps and routes the specific barrier to resolution rather than sending a reminder that assumes the barrier does not exist.', problemHeading: 'The screening order exists. The barrier to completing it does not appear in the data.', problem: '<p>An FQHC with a large panel of patients eligible for preventive cancer screenings, diabetes testing, and cardiovascular risk assessments has, in most cases, the clinical infrastructure to order those screenings. The ordering rates are reasonable. The completion rates are not.</p><p>The reason for non-completion is almost never clinical indifference. It is almost always a barrier that was not identified, not addressed, and not resolved. Transportation to the imaging center is not available. The patient works during all the appointment slots at the lab. The cost is not manageable. The instructions were in a language the patient does not read.</p><p>For FQHCs tracking preventive screening rates as HRSA UDS quality metrics, low completion rates are not a patient engagement problem to be solved by sending more reminders. They are a barrier navigation problem.</p>', shortfalls: [ { tool: 'Generic Reminder Systems', description: 'Automated reminder systems send notifications that a preventive screening is due. They reach patients who are responsive to notifications. For patients who are not responsive \u2014 and who are disproportionately the patients with the highest social barriers \u2014 reminders generate low response rates and do not address the underlying barrier. The gap stays open.' }, { tool: 'Care Coordinator Outreach Programs', description: 'Care coordinators who address screening barriers individually can do so effectively \u2014 for the patients they have time to reach. At FQHC case volumes where hundreds of patients may have open preventive screening gaps simultaneously, individual coordinator outreach for every gap is not feasible.' } ], solutionHeading: 'Open screening gaps addressed one barrier at a time \u2014 at the scale of the full gap population', solution: '<p>ZynReminder identifies patients with open preventive screening gaps and runs two-way outreach to understand the specific barrier to completion. The interaction is not a reminder. It is a conversation that asks why the screening has not happened and then addresses the answer.</p><p>When the barrier is scheduling, ZynSchedule books the appointment. When the barrier is transportation, the interaction routes to the transportation assistance program. When the barrier is cost, it connects to the financial assistance workflow. When the barrier is language, the interaction is conducted in the patient\u2019s primary language.</p><p>For FQHCs where preventive screening completion rates are a direct input to HRSA UDS reporting, the change is in completion rates across the full open-gap population.</p>', products: [ { name: 'ZynReminder', descriptor: 'Two-way preventive screening gap outreach with barrier identification, scheduling integration, and community resource routing', url: '/agents/preventive-quality-activation/zynreminder', status: 'Active' }, { name: 'ZynGap', descriptor: 'Preventive and quality gap identification prioritized by closure window and patient-level barrier profile', url: '/solutions/zynix-data-analytics', status: 'Planned' }, { name: 'ZynSchedule', descriptor: 'Appointment scheduling for preventive screening completion in the outreach interaction', url: '/agents/operational-efficiency/zynschedule', status: 'Active' } ], cta: { headline: 'Open screening gaps have a reason. Let\u2019s identify it and remove it.', label: 'Book a demo' }, readNext: [ { id: 'UC27', title: 'SDoH Screening, Identification, and Care Navigation', slug: 'sdoh-screening-care-navigation' }, { id: 'UC29', title: 'Medication Adherence for Complex Chronic Patients', slug: 'medication-adherence-complex-chronic' }, { id: 'UC11', title: 'HEDIS and Stars Quality Measure Improvement', slug: 'hedis-stars-quality-improvement' } ], segments: { primary: 'FQHCs', alsoTagged: ['ACOs & MSOs', 'Health Plans'] }, seo: { title: 'Preventive Screening Gap Closure High-Barrier Population FQHC | Zynix AI', desc: 'Close preventive screening gaps in high-barrier FQHC populations. Zynix AI identifies why gaps are open \u2014 transportation, cost, language, access \u2014 and routes the resolution in the same interaction.', schema: 'HowTo' } };

/* ── UC29 ── */
USE_CASES.UC29 = { id: 'UC29', slug: 'medication-adherence-complex-chronic', title: 'Medication Adherence for Complex Chronic Patients', h1: 'A patient managing hypertension, diabetes, and heart failure stopped taking their blood pressure medication three months ago because it made them dizzy. They never told anyone. A refill reminder did not ask.', subhead: 'FQHC patients managing multiple chronic conditions face medication adherence challenges that go beyond access. Cost barriers, side effect confusion, polypharmacy complexity, and language gaps compound each other. Zynix AI identifies the specific barrier in a two-way interaction and routes the resolution \u2014 so the patient gets the right support, not another refill reminder.', problemHeading: 'The adherence problem in complex chronic FQHC patients is not a reminder problem. It is a barrier problem.', problem: '<p>FQHC patients managing diabetes, hypertension, heart failure, COPD, and chronic kidney disease \u2014 often in combination \u2014 face a medication adherence environment that is structurally more difficult than the general population. Polypharmacy complexity means multiple medications with different dosing schedules, different side effect profiles, and different prescribers who may not be coordinating with each other.</p><p>A patient who stopped taking their lisinopril because it caused a persistent dry cough and did not know that the cough was a known side effect with alternative medications available represents a preventable adherence gap. A patient who is taking their metformin intermittently because they cannot afford to fill it every month represents a different kind of adherence gap requiring a different response.</p><p>Each of these situations requires a two-way conversation to identify. A refill reminder system that sends a notification when the prescription fill window opens does not have that conversation.</p>', shortfalls: [ { tool: 'Refill Reminder Systems', description: 'Refill reminders notify patients that a prescription is due for refill. They are effective for patients who have no barrier. They are ineffective for patients who stopped taking the medication because of side effects, cost, confusion, or a misunderstood clinical instruction \u2014 because those patients need a conversation, not a notification.' }, { tool: 'Pharmacist Intervention Programs', description: 'Clinical pharmacist outreach provides the highest-quality medication adherence intervention \u2014 barrier-specific, clinically informed, and personalized. Pharmacist programs are resource-intensive and are typically reserved for the highest-risk tier. For FQHC populations where the majority of chronic disease patients have multiple adherence challenges, pharmacist-level attention for every non-adherent patient is not achievable at the volume needed.' } ], solutionHeading: 'Two-way adherence outreach that identifies the barrier and routes the resolution for every complex chronic patient', solution: '<p>The Medication Adherence workflow within the Chronic and Longitudinal Care Management Agent conducts two-way outreach with FQHC patients managing complex chronic conditions \u2014 capturing current medication status, identifying the specific barrier to adherence, and routing the resolution to the appropriate resource. Side effect concerns route to the pharmacist or prescribing provider. Cost barriers route to the patient assistance program. Language or comprehension barriers are addressed in the patient\u2019s primary language.</p><p>ZynReminder manages the follow-up contact for patients whose barrier required a resolution that takes time \u2014 a pharmacist callback, a cost assistance application, a prescription change.</p><p>For FQHCs where medication adherence is tracked as a quality metric, the change is in how many adherence barriers are identified and resolved versus how many result in an acute clinical event that was preventable.</p>', products: [ { name: 'Chronic & Longitudinal Care Management Agent', descriptor: 'Two-way medication adherence outreach with barrier identification and clinical routing for complex chronic patients', url: '/agents/chronic-care-management', status: 'Active' }, { name: 'ZynReminder', descriptor: 'Follow-up outreach for barrier resolution and medication adherence confirmation', url: '/agents/preventive-quality-activation/zynreminder', status: 'Active' } ], cta: { headline: 'Medication non-adherence has a specific reason. Let\u2019s identify it and route the resolution.', label: 'See how it works' }, readNext: [ { id: 'UC27', title: 'SDoH Screening, Identification, and Care Navigation', slug: 'sdoh-screening-care-navigation' }, { id: 'UC28', title: 'Preventive Screening Gap Closure for High-Barrier Populations', slug: 'preventive-screening-gap-fqhc' }, { id: 'UC15', title: 'Medication Adherence for Chronic Disease Populations', slug: 'medication-adherence-chronic-populations' } ], segments: { primary: 'FQHCs', alsoTagged: ['Health Plans', 'ACOs & MSOs'] }, seo: { title: 'Medication Adherence Complex Chronic Patients FQHC Social Barriers | Zynix AI', desc: 'Two-way medication adherence outreach for complex chronic FQHC patients \u2014 identifying the specific barrier (cost, side effects, polypharmacy, language) and routing the resolution.', schema: 'HowTo' } };

/* ── UC30 ── */
USE_CASES.UC30 = { id: 'UC30', slug: 'post-discharge-followup-fqhc', title: 'Post-Discharge Follow-Up for High-Risk FQHC Patients', h1: 'An FQHC patient was discharged from the hospital two days ago. The discharge instructions were in English. The patient\u2019s primary language is Haitian Creole. Transportation to the follow-up appointment is not available. The FQHC did not know they were admitted until they called to reschedule a different appointment.', subhead: 'FQHC patients discharged from a hospital face the same post-discharge risks as any population \u2014 medication confusion, missed follow-up, unresolved barriers \u2014 with added complexity. Transportation, language barriers, and delayed notification to the FQHC compound the risk. Zynix AI contacts every high-risk discharged patient within 48 hours and addresses the social barriers that prevent follow-through in the same interaction.', problemHeading: 'FQHC patients face the same post-discharge risks as any population \u2014 with compounding barriers that the standard follow-up workflow was not designed for', problem: '<p>A post-discharge follow-up program that relies on the patient reading and understanding English-language discharge instructions, arranging their own transportation to a follow-up appointment, and knowing to call their FQHC primary care team within a week will fail for a significant portion of FQHC patient populations.</p><p>Transportation barriers are among the most common reasons FQHC patients miss post-discharge follow-up appointments. A patient who was hospitalized at a facility across town, discharged with instructions to see their primary care provider within seven days, and who relies on public transit has a scheduling problem that no appointment reminder can solve.</p><p>The FQHC is often the last to know the patient was discharged. Without real-time ADT connectivity, the FQHC learns about the hospitalization when the patient calls, when claims data arrives weeks later, or when the patient presents to the clinic with unresolved post-discharge issues.</p>', shortfalls: [ { tool: 'ADT Notification Systems', description: 'ADT notification systems alert the FQHC when an attributed patient is admitted or discharged from a connected hospital. They provide the signal. They do not initiate outreach, conduct the follow-up interaction, identify the social barriers that prevent follow-through, or connect the patient back to their care team.' }, { tool: 'Standard Post-Discharge Follow-Up Programs', description: 'Post-discharge follow-up programs designed for general clinical populations assume the patient can navigate phone contact in English, arrange transportation independently, and understand standard discharge instructions. For FQHC patient populations where language barriers, transportation limitations, and health literacy challenges are common, a standard follow-up program produces lower-than-expected contact rates.' } ], solutionHeading: 'Post-discharge contact in the right language, with social barriers addressed in the same interaction', solution: '<p>The Transitions of Care Agent contacts FQHC patients within 24 to 48 hours of discharge \u2014 in the patient\u2019s primary language, using consistent clinical triage logic to assess medication status, identify discharge instruction confusion, and route clinical concerns to the FQHC care team. The interaction does not assume the patient read the discharge paperwork. It asks.</p><p>The SDoH Determination Agent is embedded in the same interaction \u2014 identifying transportation barriers, financial constraints, language comprehension gaps, and other social circumstances that affect the patient\u2019s ability to complete follow-up. ZynSchedule confirms the follow-up appointment with the patient\u2019s FQHC primary care team.</p><p>For FQHCs tracking 30-day readmission rates and post-discharge follow-up completion as a quality metric, the change is in how many discharged patients are reached within the intervention window and how many have their barriers addressed before those barriers result in a preventable readmission.</p>', products: [ { name: 'Transitions of Care Agent', descriptor: 'Post-discharge outreach in patient\u2019s primary language, clinical assessment, escalation routing, and follow-up scheduling', url: '/agents/transitions-of-care', status: 'Active' }, { name: 'SDoH Determination Agent', descriptor: 'Identifies social barriers during post-discharge interaction and routes to community resources or care navigators', url: '/agents/clinical-performance', status: 'Planned' }, { name: 'ZynSchedule', descriptor: 'Follow-up appointment scheduling with FQHC primary care team in the post-discharge interaction', url: '/agents/operational-efficiency/zynschedule', status: 'Active' }, { name: 'Medication Reconciliation', descriptor: 'Post-discharge medication discrepancy identification and clinical routing', url: '/agents/transitions-of-care', status: 'Active' } ], cta: { headline: 'Every high-risk FQHC patient reached within 48 hours of discharge \u2014 in their language, with barriers addressed.', label: 'Talk to our team' }, readNext: [ { id: 'UC27', title: 'SDoH Screening, Identification, and Care Navigation', slug: 'sdoh-screening-care-navigation' }, { id: 'UC26', title: 'After-Hours Triage for Multilingual and Underserved Populations', slug: 'after-hours-triage-multilingual-fqhc' }, { id: 'UC06', title: 'Post-Discharge TCM and Readmission Prevention', slug: 'post-discharge-tcm-readmission' } ], segments: { primary: 'FQHCs', alsoTagged: ['ACOs & MSOs'] }, seo: { title: 'Post-Discharge Follow-Up High-Risk FQHC Patients Transitional Care | Zynix AI', desc: 'Reach high-risk FQHC patients within 48 hours of discharge \u2014 in their primary language, with social barriers addressed in the same interaction. Zynix AI prevents readmissions for complex populations.', schema: 'HowTo' } };


// ── Route Entries ───────────────────────────────────────────

var USE_CASE_ROUTES = {};

(function () {
  var keys = Object.keys(USE_CASES);
  for (var i = 0; i < keys.length; i++) {
    var uc = USE_CASES[keys[i]];
    USE_CASE_ROUTES['/use-cases/' + uc.slug] = (function (data) {
      return function () { return renderUseCaseV7(data); };
    })(uc);
  }
})();


// ── PAGE_SEO Entries ────────────────────────────────────────

var USE_CASE_SEO = {};

(function () {
  var keys = Object.keys(USE_CASES);
  for (var i = 0; i < keys.length; i++) {
    var uc = USE_CASES[keys[i]];
    USE_CASE_SEO['/use-cases/' + uc.slug] = {
      title: uc.seo.title,
      desc: uc.seo.desc,
      schema: uc.seo.schema
    };
  }
})();


// ── Merge USE_CASE_SEO into PAGE_SEO ──
(function () {
  var keys = Object.keys(USE_CASE_SEO);
  for (var i = 0; i < keys.length; i++) {
    PAGE_SEO[keys[i]] = USE_CASE_SEO[keys[i]];
  }
})();


  // ── V7 REBUILD: Audience + Company Pages ────────────────────────────────

/**
 * Zynix AI v7 — Audience Pages (Whom We Serve) & Company Pages
 * Render functions for 6 audience pages (Template A) and 6 company pages (Template E).
 * All content sourced from approved .md content specifications.
 * Uses existing CSS classes from the Zynix design system.
 */

// ============================================================================
// AUDIENCE PAGES — Template A (Whom We Serve)
// ============================================================================

// ---------------------------------------------------------------------------
// Shared audience-page renderer (Template A pattern)


// ============================================================================
// 1. HEALTH SYSTEMS
// ============================================================================
function renderWhoWeServeHealthSystems() {
  return renderAudiencePageV7({
    audienceName: 'Health Systems',
    breadcrumb: 'Who We Serve &gt; Health Systems',
    eyebrow: 'Who We Serve \u2014 Page 1 of 6',
    headline: 'Reach every patient. Close every gap. Run every care program at health system scale.',
    subhead: 'You have the staff, the data, and the clinical programs. The gap is execution at the scale of a health system attribution \u2014 post-discharge follow-up that misses the highest-risk patients, after-hours calls that default to the ED, HCC documentation that closes short of year-end targets, and prior auth backlogs that delay care for patients already scheduled.',
    challengeIntro: 'Health systems managing large attributed populations face the same structural problem across every care management program: the analytics layer identifies who needs attention. The execution infrastructure cannot keep up with the volume of acting on it.',
    challenges: [
      { title: 'Post-Discharge Follow-Up Rates', body: 'CMS requires contact within 24\u201348 hours and a follow-up visit within 7\u201314 days for TCM billing. At health system scale, manual outreach consistently misses a significant share of eligible patients \u2014 often the highest-risk ones, the most likely to return to the ED.' },
      { title: 'After-Hours Access Across Multiple Sites', body: 'Patients calling after hours frequently reach voicemail or answering services that cannot triage clinically. Non-urgent ED visits increase. On-call physicians field routine calls. HCAHPS scores reflect the access gap, and shared savings take the hit.' },
      { title: 'HCC Documentation and Gap Closure', body: 'Analytics identify every underdocumented condition and quality measure gap. Closing them before year-end requires outreach, scheduling, visit completion, and documentation alignment that coordinator capacity cannot sustain at health system ACO scale.' },
      { title: 'Prior Authorization Volume in Specialty Services', body: 'High-volume specialty services \u2014 orthopedics, cardiology, oncology, imaging \u2014 process thousands of prior authorizations monthly. Manual submission, tracking, and denial management consumes significant administrative FTE and delays care for patients already in the system.' }
    ],
    fitIntro: 'Zynix AI is an execution layer that sits between your care management programs and your patient population. It carries the contact volume, documentation, and coordination work that your team identifies but cannot sustain at health system scale.',
    capabilities: [
      { title: 'Closed-Loop Patient Outreach at Attributed Population Scale', body: 'Every discharged patient contacted. Every chronic care touchpoint documented. Every quality gap outreach triggered and tracked through to completion. Coordinators receive escalations and exceptions \u2014 not a list of calls to make from scratch.' },
      { title: 'After-Hours Clinical Intelligence Across All Sites', body: 'Evidence-based triage handles routine after-hours calls in 15+ languages, schedules next-day access, and surfaces only genuine clinical escalations. Consistent coverage across every site without additional on-call burden.' },
      { title: 'HCC and Quality Gap Closure Orchestrated to Year-End Deadline', body: 'Gaps prioritized by RAF impact and closure window. Outreach, scheduling, and documentation alignment run in sequence. The platform tracks completion, not just identification \u2014 so year-end performance reflects work that actually got done.' },
      { title: 'Administrative Workflows That Stop Blocking Clinical Capacity', body: 'Documentation assembly, prior auth submission, denial routing, fax classification, and referral coordination run without coordinator involvement at every step. Clinical staff spend their time on patients who need a human.' }
    ],
    primaryUseCases: [
      { title: 'Post-Discharge Follow-Up at Scale', teaser: 'Reaching every discharged patient within 24\u201348 hours \u2014 consistently, at health system volume, with TCM billing documentation captured in parallel.', url: '/use-cases/post-discharge-follow-up' },
      { title: 'After-Hours Patient Triage Across Multiple Sites', teaser: 'Clinical triage at every site after hours \u2014 without routing routine calls to on-call physicians or losing patients to non-urgent ED visits.', url: '/use-cases/after-hours-triage-multi-site' },
      { title: 'HCC Gap Closure at Health System ACO Scale', teaser: 'Closing HCC documentation and quality measure gaps before year-end through coordinated outreach and scheduling \u2014 not raw gap lists.', url: '/use-cases/hcc-gap-closure-health-system-aco' },
      { title: 'Prior Authorization Across High-Volume Specialty Services', teaser: 'Automated documentation assembly, payer submission, tracking, and denial management for thousands of monthly prior auths.', url: '/use-cases/prior-auth-high-volume-specialty' },
      { title: 'Reducing Physician Documentation Burden with Ambient AI', teaser: 'Structured clinical notes from every patient visit, uploaded directly to the EHR \u2014 without adding documentation time after the encounter.', url: '/use-cases/physician-documentation-ambient-ai' }
    ],
    additionalUseCases: [
      { id: 'UC06', title: 'Post-Discharge TCM and Readmission Prevention', primarySegment: 'ACOs & MSOs', url: '/use-cases/post-discharge-tcm-readmission' },
      { id: 'UC07', title: 'HCC Gap Closure and RAF Score Optimization', primarySegment: 'ACOs & MSOs', url: '/use-cases/hcc-gap-raf-optimization' },
      { id: 'UC08', title: 'Rising-Risk Patient Outreach Before a Clinical Event', primarySegment: 'ACOs & MSOs', url: '/use-cases/rising-risk-patient-outreach' },
      { id: 'UC09', title: 'After-Hours Access and ED Diversion for ACO Populations', primarySegment: 'ACOs & MSOs', url: '/use-cases/after-hours-ed-diversion' },
      { id: 'UC10', title: 'Chronic Care Coordination at Scale', primarySegment: 'ACOs & MSOs', url: '/use-cases/chronic-care-coordination-scale' },
      { id: 'UC13', title: 'High-Cost and High-Utilizer Member Management', primarySegment: 'Health Plans', url: '/use-cases/high-utilizer-member-management' },
      { id: 'UC20', title: 'Referral Coordination and Leakage Prevention', primarySegment: 'Independent Group Practices', url: '/use-cases/referral-coordination-leakage' },
      { id: 'UC27', title: 'SDoH Screening, Identification, and Care Navigation', primarySegment: 'FQHCs', url: '/use-cases/sdoh-screening-care-navigation' }
    ],
    featuredProducts: [
      { name: 'Transitions of Care Agent', url: '/agents/transitions-of-care', description: 'Manages every post-discharge step from ADT trigger to 30-day close. Medication reconciliation, symptom assessment, TCM visit scheduling, and billing documentation \u2014 one closed-loop workflow.' },
      { name: 'ZynAfterHours', url: '/agents/operational-efficiency/zynafterhours-triage', description: '24/7 clinical triage across all health system sites. Evidence-based triage logic, 15+ languages, EHR-integrated. Escalates only when escalation is clinically warranted.' },
      { name: 'Deployable Care Plans', url: '/care-plans', description: 'Post-Discharge TCM, HCC + Quality Gap Closure Sprint, Prior Auth Acceleration. Orchestrated multi-agent programs that run from trigger to outcome.' },
      { name: 'ZynScribe', url: '/zynscribe', description: 'Ambient AI scribing that captures the patient-clinician conversation and produces structured clinical notes uploaded directly to the EHR.' }
    ],
    citations: [
      { stat: 'Fewer than 30% of eligible patients are reached within the 24\u201348 hour post-discharge window when outreach relies on manual coordinator workflows.', context: 'The gap widens at health system volume \u2014 higher throughput, stretched teams, and inconsistent ADT notification across sites compound the shortfall.', sourceName: 'CMS Transitional Care Management Services', sourceUrl: 'https://www.cms.gov/medicare/physician-fee-schedule/transitional-care-management-services' },
      { stat: 'Health system ACOs capturing full TCM reimbursement maintain measurably higher post-discharge visit completion rates than those relying on manual outreach.', context: 'TCM billing eligibility and post-discharge contact quality are closely correlated \u2014 systems that reach more patients also bill more completely.', sourceName: 'CMS Shared Savings Program', sourceUrl: 'https://www.cms.gov/medicare/shared-savings-program/about' },
      { stat: 'Physicians in large health systems report spending significant administrative time weekly on prior authorization submission, status tracking, and denial management.', context: 'High-volume specialty services bear a disproportionate share \u2014 orthopedics, cardiology, and oncology consistently top prior auth volume rankings.', sourceName: 'AMA Prior Authorization and Administrative Burden', sourceUrl: 'https://www.ama-assn.org/practice-management/prior-authorization/prior-authorization-and-administrative-burden' },
      { stat: 'Top-quartile health system ACOs outperform bottom-quartile peers on post-discharge contact rates and HCC closure rates by a measurable and consistent margin.', context: 'The spread is not explained by panel size or patient complexity alone \u2014 operational execution quality is the differentiating variable.', sourceName: 'NAACOS ACO Benchmarking Data', sourceUrl: null }
    ],
    ctaHeadline: 'Book a Demo',
    ctaSubline: 'Talk to our team about your health system\'s care coordination and operational priorities.',
    ctaButton: 'Book a Demo'
  });
}


// ============================================================================
// 2. ACOs & MSOs
// ============================================================================
function renderWhoWeServeACOs() {
  return renderAudiencePageV7({
    audienceName: 'ACOs & MSOs',
    breadcrumb: 'Who We Serve &gt; ACOs &amp; MSOs',
    eyebrow: 'Who We Serve \u2014 Page 2 of 6',
    headline: 'Better post-discharge rates. Higher HCC closure. More shared savings \u2014 without adding headcount.',
    subhead: 'Your analytics tell you who needs attention. Your care management program tracks the work. The gap is getting it done \u2014 at the scale of your attributed panel, across a full performance year, without adding coordinator headcount you don\'t have budget for.',
    challengeIntro: 'MSSP ACOs and risk-bearing MSOs operate with a clear financial equation: shared savings depend on keeping total cost of care below benchmark, which depends on care management execution quality. The data to identify the work is usually adequate. The execution infrastructure to complete it at panel scale is not.',
    challenges: [
      { title: 'Post-Discharge Contact Rates', body: 'Industry data consistently shows that manual outreach reaches fewer than 30% of eligible patients within the 24\u201348 hour window. The missed patients are the ones most likely to return to the ED \u2014 and most likely to drive readmission costs against your TCOC benchmark.' },
      { title: 'HCC Gap Closure Before Year-End', body: 'ZynGap identifies the gaps. Closing them before the performance year ends requires outreach, scheduling, visit completion, and documentation alignment that coordinator capacity cannot sustain at full-panel scale. Most ACOs leave RAF score on the table at year-end.' },
      { title: 'Coordinator Capacity Against Panel Size', body: 'Care coordinators carry the full execution load of value-based care programs. The patient-to-coordinator ratio means some work doesn\'t get done \u2014 not because the team isn\'t working, but because the volume requires an execution layer, not more headcount.' },
      { title: 'Chronic Disease Management at Scale', body: 'CCM billing represents significant unrealized revenue for ACOs with chronic disease panels. Capturing it requires consistent monthly patient contact and billing-ready documentation that most coordinator teams cannot sustain at scale.' }
    ],
    fitIntro: 'Zynix AI carries the execution volume that care management programs generate but coordinator teams cannot sustain. It operates at the intersection of your intelligence layer and your patient population \u2014 completing the work the analytics identify.',
    capabilities: [
      { title: 'Execution at Full Panel Scale Without Adding Headcount', body: 'Every patient on the follow-up list gets contacted. Every CCM-eligible patient gets a monthly touchpoint. Every HCC gap gets an outreach trigger. The care team handles clinical escalations \u2014 Zynix AI handles the volume.' },
      { title: 'Performance-Year Programs That Run to Completion', body: 'The HCC + Quality Gap Closure Sprint coordinates outreach, scheduling, and documentation on a performance-year timeline \u2014 prioritizing by RAF impact and closure window. Programs don\'t stall in Q4 when coordinator bandwidth is already stretched.' },
      { title: 'Total Cost of Care Protection Through Proactive Outreach', body: 'Predictive signals on rising-risk and readmission-risk patients trigger outreach before the clinical event. Barrier capture routes resolution through the same interaction. The cost that doesn\'t happen is the shared savings that does.' },
      { title: 'After-Hours Access That Keeps Attributed Patients Out of the ED', body: 'Every non-emergent ED visit by an attributed patient is a direct hit to TCOC. Consistent after-hours access \u2014 clinical triage, self-care guidance, next-day scheduling \u2014 keeps routine care needs from defaulting to the ED.' },
      { title: 'CMS ACCESS Model Alignment', body: 'Zynix AI supports the CMS ACCESS model (Advancing All-Payer Health Equity Approaches and Development) requirements. The platform enables health equity measurement across all-payer populations, multi-payer quality alignment, SDoH-integrated outreach for underserved communities, and population health management that meets ACCESS program standards for advancing health equity in value-based care. CMS ACCESS model AI capabilities are built into the core platform.' }
    ],
    primaryUseCases: [
      { title: 'Post-Discharge TCM and Readmission Prevention', teaser: 'The 48-hour post-discharge window is where ACO performance is won or lost \u2014 full workflow from ADT trigger through 30-day close, including TCM billing capture.', url: '/use-cases/post-discharge-tcm-readmission' },
      { title: 'HCC Gap Closure and RAF Score Optimization', teaser: 'RAF scores are documentation scores. End-to-end gap closure \u2014 prioritized by RAF impact, executed before year-end performance close.', url: '/use-cases/hcc-gap-raf-optimization' },
      { title: 'Rising-Risk Patient Outreach Before a Clinical Event', teaser: 'Prediction without action is just an earlier warning about a cost you didn\'t prevent. How ZynPredict signals translate into structured proactive outreach.', url: '/use-cases/rising-risk-patient-outreach' },
      { title: 'After-Hours Access and ED Diversion for ACO Populations', teaser: 'The ACO\'s after-hours answer rate is a shared savings metric hiding in the phone system. The connection between access and TCOC, operationalized.', url: '/use-cases/after-hours-ed-diversion' },
      { title: 'Chronic Care Coordination at Scale', teaser: 'CCM billing revenue is sitting in your patient panel. The consistent monthly contact and documentation workflow that most ACO coordinator teams cannot sustain manually.', url: '/use-cases/chronic-care-coordination-scale' }
    ],
    additionalUseCases: [
      { id: 'UC01', title: 'Post-Discharge Follow-Up at Scale', primarySegment: 'Health Systems', url: '/use-cases/post-discharge-follow-up' },
      { id: 'UC02', title: 'After-Hours Patient Triage Across Multiple Sites', primarySegment: 'Health Systems', url: '/use-cases/after-hours-triage-multi-site' },
      { id: 'UC03', title: 'HCC Gap Closure at Health System ACO Scale', primarySegment: 'Health Systems', url: '/use-cases/hcc-gap-closure-health-system-aco' },
      { id: 'UC12', title: 'HCC Risk Adjustment Accuracy', primarySegment: 'Health Plans', url: '/use-cases/hcc-risk-adjustment-ma' },
      { id: 'UC14', title: 'Post-Discharge Care Management for MA Members', primarySegment: 'Health Plans', url: '/use-cases/post-discharge-ma-members' },
      { id: 'UC15', title: 'Medication Adherence for Chronic Disease Populations', primarySegment: 'Health Plans', url: '/use-cases/medication-adherence-chronic-populations' },
      { id: 'UC16', title: 'After-Hours Call Handling and Patient Triage', primarySegment: 'Independent Group Practices', url: '/use-cases/after-hours-call-handling-group-practices' },
      { id: 'UC18', title: 'Prior Authorization Workflow Management', primarySegment: 'Independent Group Practices', url: '/use-cases/prior-auth-workflow-management' },
      { id: 'UC19', title: 'CCM Billing Execution and Chronic Care Management', primarySegment: 'Independent Group Practices', url: '/use-cases/ccm-billing-chronic-care' },
      { id: 'UC20', title: 'Referral Coordination and Leakage Prevention', primarySegment: 'Independent Group Practices', url: '/use-cases/referral-coordination-leakage' },
      { id: 'UC30', title: 'Post-Discharge Follow-Up for High-Risk FQHC Patients', primarySegment: 'FQHCs', url: '/use-cases/post-discharge-followup-fqhc' }
    ],
    featuredProducts: [
      { name: 'Deployable Care Plans', url: '/care-plans', description: 'Post-Discharge TCM Care Plan, HCC + Quality Gap Closure Sprint, High-Utilizer ED Diversion Plan, Medication Safety & Adherence Plan. Multi-agent programs built around ACO performance-year priorities.' },
      { name: 'Clinical Performance Agents', url: '/agents/clinical-performance', description: 'Transitions of Care Agent, Chronic & Longitudinal Care Management Agent, Preventive & Quality Activation Agents, SDoH Determination Agent. The execution layer your care management program identifies the work for.' },
      { name: 'ZynGap', url: '/solutions/zyngap', description: 'HCC and quality gap identification prioritized by RAF impact and closure timing. Actionable worklists for coordinators \u2014 not raw gap data that has to be triaged before it can be acted on.' },
      { name: 'ZynAfterHours', url: '/agents/operational-efficiency/zynafterhours-triage', description: '24/7 after-hours triage for your attributed population. Clinical triage logic, 15+ languages, ED diversion built in. Every non-emergent call that stays out of the ED is a TCOC win.' }
    ],
    citations: [
      { stat: 'ACOs achieving benchmark shared savings consistently show higher care management completion rates, post-discharge contact rates, and HCC closure rates than those that miss targets.', context: 'The performance gap between top and bottom ACO quartiles is not explained by panel complexity alone \u2014 execution quality is the differentiating factor.', sourceName: 'CMS Shared Savings Program', sourceUrl: 'https://www.cms.gov/medicare/shared-savings-program/about' },
      { stat: 'Manual post-discharge outreach reaches fewer than 30% of eligible patients within the 24\u201348 hour contact window \u2014 the window where readmission risk is highest.', context: 'For MSSP ACOs, every missed post-discharge contact in this window represents both a care quality gap and a TCOC exposure.', sourceName: 'CMS Transitional Care Management Services', sourceUrl: 'https://www.cms.gov/medicare/physician-fee-schedule/transitional-care-management-services' },
      { stat: 'ACOs relying on manual outreach capture a significantly lower share of eligible TCM reimbursement than those using systematic outreach workflows.', context: 'Reaching more patients produces more complete billing documentation \u2014 contact rate and TCM billing capture move together.', sourceName: 'CMS Transitional Care Management Services', sourceUrl: 'https://www.cms.gov/medicare/physician-fee-schedule/transitional-care-management-services' },
      { stat: 'Coordinator-to-patient ratios in most MSSP ACOs make full-panel chronic care management execution impossible without a systematic outreach infrastructure.', context: 'The CCM billing gap in most ACO panels is a contact rate problem, not a patient eligibility problem.', sourceName: 'AAFP Chronic Care Management Billing Guidance', sourceUrl: 'https://www.aafp.org/family-physician/practice-and-career/getting-paid/coding/chronic-care-management.html' }
    ],
    ctaHeadline: 'Book a Demo',
    ctaSubline: 'Talk to our team about your performance-year priorities.',
    ctaButton: 'Book a Demo'
  });
}


// ============================================================================
// 3. HEALTH PLANS
// ============================================================================
function renderWhoWeServeHealthPlans() {
  return renderAudiencePageV7({
    audienceName: 'Health Plans',
    breadcrumb: 'Who We Serve &gt; Health Plans',
    eyebrow: 'Who We Serve \u2014 Page 3 of 6',
    headline: 'Move your Star Rating. Close your HCC gaps. Reach every member who needs outreach this performance year.',
    subhead: 'Your population health analytics are sophisticated. The gap between identifying a member who needs outreach and completing that outreach \u2014 at full-member-population scale, across the measures that move your Star Rating \u2014 is where revenue is won or lost.',
    challengeIntro: 'Medicare Advantage plans compete on Star Ratings and risk adjustment accuracy. Both depend on member engagement, clinical documentation, and care coordination that most plans cannot execute at full-member-population scale. The analytics to identify the gap are sophisticated. The workflow execution layer to close it is the missing piece.',
    challenges: [
      { title: 'Quality Measure Completion at Scale', body: 'HEDIS measures that move Stars \u2014 medication adherence, diabetes care, blood pressure control, colorectal screening \u2014 require member contact, appointment scheduling, and clinical follow-through that plan-level care management cannot execute at full-population scale.' },
      { title: 'HCC Documentation Accuracy', body: 'Members with chronic conditions present but underdocumented suppress risk adjustment revenue. Closing documentation gaps requires outreach, visit completion, and documentation alignment that internal teams can\'t sustain across the full member population.' },
      { title: 'High-Cost Member Engagement Before the Clinical Event', body: 'The members who drive the highest total cost of care are often the hardest to engage proactively. Reaching them before a hospitalization or ED visit requires outreach capacity that case manager caseloads cannot sustain across the full high-risk cohort.' },
      { title: 'Medication Adherence and PDC Scores', body: 'PDC scores for diabetes, hypertension, and cholesterol medications directly affect Star Ratings. Moving PDC scores requires consistent member contact and barrier resolution \u2014 cost, pharmacy access, side effects \u2014 not just fill reminders that generate no-responses.' }
    ],
    fitIntro: 'Zynix AI is the member outreach and care coordination execution layer between your population health intelligence and your member population. It handles the contact volume, barrier resolution, and documentation workflows that your Stars and risk adjustment programs require but cannot execute manually at scale.',
    capabilities: [
      { title: 'Member Outreach That Reaches the Full Population, Not a Sample', body: 'Quality gap reminders, HCC documentation outreach, medication adherence check-ins, and preventive care follow-through executed for every eligible member \u2014 not just those a case manager had time to call. Contact rates move when the outreach reaches the full cohort.' },
      { title: 'Barrier Resolution Built Into the Outreach Interaction', body: 'Two-way conversations identify cost, access, transportation, and language barriers in the same interaction where the clinical need is surfaced \u2014 and route each barrier to resolution without requiring a second follow-up. PDC scores and quality measure completion both depend on this step.' },
      { title: 'Risk Adjustment Documentation Closed Before the Deadline', body: 'HCC gaps prioritized by revenue impact. Outreach, scheduling, visit completion, and documentation coordinated in sequence. The risk adjustment deadline is a fixed constraint \u2014 the execution layer runs to meet it.' },
      { title: 'High-Risk Member Engagement Before the Claim Arrives', body: 'ZynPredict surfaces members on a deterioration trajectory before a hospitalization or ED visit. Proactive outreach engages them at the right window \u2014 identifying the barriers driving the risk and connecting to chronic care management for stabilization.' },
      { title: 'CMS ACCESS Model Alignment', body: 'Zynix AI supports the CMS ACCESS model (Advancing All-Payer Health Equity Approaches and Development) requirements for health plans. The platform enables health equity measurement and quality reporting across all-payer populations, multi-payer data alignment for ACCESS program participation, SDoH-integrated member outreach for underserved populations, and population health management that meets ACCESS standards for advancing health equity across diverse payer mixes.' }
    ],
    primaryUseCases: [
      { title: 'HEDIS and Stars Quality Measure Improvement', teaser: 'Star Ratings are earned member by member. How quality measure completion moves at full-member-population scale \u2014 not just for the members a case manager reached.', url: '/use-cases/hedis-stars-quality-improvement' },
      { title: 'HCC Risk Adjustment Accuracy', teaser: 'Underdocumented conditions suppress risk adjustment revenue. Closing documentation gaps at member-population scale requires more than a case manager workflow can deliver.', url: '/use-cases/hcc-risk-adjustment-ma' },
      { title: 'High-Cost and High-Utilizer Member Management', teaser: 'The members who drive the most cost are the hardest to reach proactively. Structured, risk-tiered outreach before the clinical event \u2014 before the claim arrives.', url: '/use-cases/high-utilizer-member-management' },
      { title: 'Post-Discharge Care Management for MA Members', teaser: 'High-risk MA members discharged from hospital face compounded readmission risk. The 48-hour window is where the outcome is determined.', url: '/use-cases/post-discharge-ma-members' },
      { title: 'Medication Adherence for Chronic Disease Populations', teaser: 'Moving PDC scores requires barrier resolution, not fill reminders. The two-way outreach workflow that identifies and routes the real obstacles to medication adherence.', url: '/use-cases/medication-adherence-chronic-populations' }
    ],
    additionalUseCases: [
      { id: 'UC08', title: 'Rising-Risk Patient Outreach Before a Clinical Event', primarySegment: 'ACOs & MSOs', url: '/use-cases/rising-risk-patient-outreach' },
      { id: 'UC09', title: 'After-Hours Access and ED Diversion for ACO Populations', primarySegment: 'ACOs & MSOs', url: '/use-cases/after-hours-ed-diversion' },
      { id: 'UC10', title: 'Chronic Care Coordination at Scale', primarySegment: 'ACOs & MSOs', url: '/use-cases/chronic-care-coordination-scale' },
      { id: 'UC28', title: 'Preventive Screening Gap Closure for High-Barrier Populations', primarySegment: 'FQHCs', url: '/use-cases/preventive-screening-gap-fqhc' },
      { id: 'UC29', title: 'Medication Adherence for Complex Chronic Patients', primarySegment: 'FQHCs', url: '/use-cases/medication-adherence-complex-chronic' },
      { id: 'UC06', title: 'Post-Discharge TCM and Readmission Prevention', primarySegment: 'ACOs & MSOs', url: '/use-cases/post-discharge-tcm-readmission' }
    ],
    featuredProducts: [
      { name: 'ZynGap', url: '/solutions/zyngap', description: 'HCC and quality gap identification across your member population, prioritized by risk adjustment impact and Stars measure completion timing. Actionable worklists, not raw gap exports.' },
      { name: 'Predictive Activation Agents', url: '/agents/predictive-activation', description: 'Rising risk member outreach, readmission risk monitoring, high-utilizer ED diversion. Acts on ZynPredict signals before the clinical event \u2014 not after the claim arrives.' },
      { name: 'Clinical Performance Agents', url: '/agents/clinical-performance', description: 'Medication adherence outreach, Transitions of Care Agent, Preventive & Quality Activation. The member engagement execution layer for Medicare Advantage population scale.' },
      { name: 'HCC + Quality Gap Closure Sprint', url: '/care-plans', description: 'Orchestrated program that coordinates outreach, visit completion, and documentation for the highest-impact HCC and quality gaps before the risk adjustment deadline.' }
    ],
    citations: [
      { stat: 'Medication adherence, care coordination, and chronic disease management measures carry the highest weight in overall Star Rating calculation for Medicare Advantage plans.', context: 'Plans that move these measures by even a fraction of a star generate significant revenue implications \u2014 the bonus structure amplifies the value of incremental improvement.', sourceName: 'CMS Medicare Advantage Star Ratings', sourceUrl: 'https://www.cms.gov/medicare/health-plans/medicareadvtgspecratestats/star-ratings' },
      { stat: 'HCC documentation gaps are most common in members with multiple chronic conditions who have limited care team contact \u2014 the cohort where risk adjustment revenue opportunity is highest.', context: 'Closing documentation gaps requires proactive outreach and visit completion \u2014 administrative coding review alone cannot close gaps that require a clinical encounter.', sourceName: 'CMS Risk Adjustors \u2014 Medicare Advantage', sourceUrl: 'https://www.cms.gov/medicare/health-plans/medicareadvtgspecratestats/risk-adjustors' },
      { stat: 'Plans with higher member outreach completion rates consistently show stronger Stars performance on quality and outcome measures than plans with lower contact rates.', context: 'Contact rate is the leading indicator \u2014 the relationship is about whether the member was reached at all, not the sophistication of the outreach program.', sourceName: 'NAACOS Research on Care Management Outcomes', sourceUrl: null },
      { stat: 'After-hours access and post-discharge follow-up rates are significant predictors of avoidable hospitalization and ED utilization in Medicare Advantage populations.', context: 'For MA plans, avoidable hospitalizations affect both Stars measures and total cost of care \u2014 the financial and quality incentives align on the same workflow gap.', sourceName: 'Published Medicare Advantage outcomes research', sourceUrl: null }
    ],
    ctaHeadline: 'Book a Demo',
    ctaSubline: 'Talk to our team about your Stars and risk adjustment priorities.',
    ctaButton: 'Book a Demo'
  });
}


// ============================================================================
// 4. INDEPENDENT GROUP PRACTICES
// ============================================================================
function renderWhoWeServeIndependentPractices() {
  return renderAudiencePageV7({
    audienceName: 'Independent Group Practices',
    breadcrumb: 'Who We Serve &gt; Independent Group Practices',
    eyebrow: 'Who We Serve \u2014 Page 4 of 6',
    headline: 'Handle more after-hours calls. Capture more CCM billing. Spend less coordinator time on prior auth.',
    subhead: 'Your front desk manages inbound calls, scheduling, prior auth, and refill requests at the same time. Your care quality programs need coordinator time you don\'t have to spare. After-hours calls go to voicemail. These are solvable workflow problems \u2014 and they don\'t require health system infrastructure to solve.',
    challengeIntro: 'Independent physician groups carry the full operational weight of value-based care without health system infrastructure. Coordinators wear multiple hats. Care quality programs that require consistent monthly patient contact produce inconsistent results because the capacity isn\'t there.',
    challenges: [
      { title: 'After-Hours Access', body: 'Patients calling after 5 PM reach voicemail or a basic answering service. Patients with urgent questions go to the ED. For a practice participating in value-based care contracts, after-hours ED visits affect both cost performance and patient satisfaction scores.' },
      { title: 'Prior Authorization Time Cost', body: 'Practices submitting 20\u201350 prior auths per week without dedicated PA staff spend significant coordinator hours on documentation assembly, payer portal tracking, and denial management. That time comes directly from patient-facing work.' },
      { title: 'Scheduling Abandonment and No-Show Rate', body: 'Hold times at the front desk mean missed bookings. No-show rates create empty appointment slots that rarely fill proactively. Both have quantifiable revenue impact \u2014 and both have workflow solutions that do not require additional staff.' },
      { title: 'CCM Billing Execution', body: 'Chronic Care Management billing represents significant unrealized revenue for practices with Medicare-eligible chronic disease populations. Capturing it requires consistent monthly patient contact and billing-ready documentation that most independent practice teams cannot sustain at scale.' }
    ],
    fitIntro: 'Zynix AI brings the operational execution infrastructure of a health system to independent practice economics. The same tools \u2014 after-hours triage, scheduling, chronic care management, referral coordination \u2014 sized and priced for a 5\u201350 physician group.',
    capabilities: [
      { title: 'After-Hours and Scheduling Coverage Without Additional Staff', body: 'Routine after-hours calls handled clinically. Inbound scheduling processed without a hold queue. Waitlists managed proactively when cancellations occur. The front desk team handles patient relationships \u2014 the workflow volume routes through Zynix AI.' },
      { title: 'Care Quality Programs That Run Consistently', body: 'CCM monthly contact, AWV outreach, quality gap reminders, and care plan reinforcement executed for every eligible patient \u2014 not just those the coordinator had capacity to reach. Billing-ready documentation captured in the same workflow.' },
      { title: 'Administrative Workflows Reclaimed From Coordinator Time', body: 'Prior auth documentation assembly, payer portal submission, status tracking, denial management, and fax routing handled without coordinator involvement at every step. The hours reclaimed go back to patient-facing work.' },
      { title: 'Referrals That Complete Instead of Going Dark', body: 'From referral order to confirmed specialist appointment \u2014 documentation completeness checked, specialist follow-up tracked, inbound results routed. Sending the referral is not the same as completing it.' }
    ],
    primaryUseCases: [
      { title: 'After-Hours Call Handling and Patient Triage', teaser: 'Clinical triage after 5 PM \u2014 without voicemail, without the ED as default, without waking the physician on-call for routine questions.', url: '/use-cases/after-hours-call-handling-group-practices' },
      { title: 'Appointment Scheduling and No-Show Reduction', teaser: 'Every empty slot and every abandoned scheduling call is recoverable revenue. Inbound scheduling, waitlist management, and reminder sequences that reduce no-shows.', url: '/use-cases/appointment-scheduling-no-show' },
      { title: 'Prior Authorization Workflow Management', teaser: 'Prior auth is consuming coordinator hours. Documentation assembly, payer submission, status tracking, and denial management \u2014 running automatically.', url: '/use-cases/prior-auth-workflow-management' },
      { title: 'CCM Billing Execution and Chronic Care Management', teaser: 'CCM billing revenue is sitting in your patient list. Consistent monthly contact and billing-ready documentation \u2014 the workflow most independent practices can\'t sustain manually.', url: '/use-cases/ccm-billing-chronic-care' },
      { title: 'Referral Coordination and Leakage Prevention', teaser: 'Sending the referral is not the same as completing the referral. From referral order to confirmed specialist appointment \u2014 documented and tracked.', url: '/use-cases/referral-coordination-leakage' }
    ],
    additionalUseCases: [],
    featuredProducts: [
      { name: 'ZynAfterHours', url: '/agents/operational-efficiency/zynafterhours-triage', description: '24/7 after-hours triage built for independent practice economics. Evidence-based clinical triage logic, 15+ languages, next-day appointment scheduling. Physician on-call receives only the calls that genuinely need them.' },
      { name: 'ZynSchedule', url: '/agents/operational-efficiency/zynschedule', description: 'Inbound scheduling without the hold queue. Waitlist management when cancellations occur. Confirmation and reminder sequences that reduce no-shows. Built for the volume of a 5\u201350 physician practice.' },
      { name: 'Chronic & Longitudinal Care Management Agent', url: '/agents/chronic-care-management', description: 'Monthly outreach, medication adherence check-ins, care plan reinforcement, and CCM/PCM billing documentation for every eligible chronic disease patient. CCM becomes a sustainable, billable program.' },
      { name: 'ZynScribe', url: '/zynscribe', description: 'Ambient AI scribing that captures every patient-clinician conversation and produces structured clinical notes uploaded directly to the EHR. Reduces after-hours documentation time. Works with your existing EHR.' }
    ],
    citations: [
      { stat: 'Independent practices without dedicated prior auth staff spend a disproportionate share of coordinator time on authorization submission, status tracking, and denial management.', context: 'For a 10-physician group submitting 30\u201350 prior auths per week, the cumulative coordinator time cost competes directly with patient-facing care coordination capacity.', sourceName: 'AMA Prior Authorization and Administrative Burden', sourceUrl: 'https://www.ama-assn.org/practice-management/prior-authorization/prior-authorization-and-administrative-burden' },
      { stat: 'Most independent practices with Medicare-eligible chronic disease populations are billing a fraction of eligible CCM codes \u2014 not due to lack of qualifying patients, but due to the contact and documentation workflow.', context: 'The CCM billing gap is a workflow gap, not a patient gap. Consistent monthly contact is what most practices cannot sustain at eligible-patient scale.', sourceName: 'AAFP Chronic Care Management Billing Guidance', sourceUrl: 'https://www.aafp.org/family-physician/practice-and-career/getting-paid/coding/chronic-care-management.html' },
      { stat: 'No-show rates and scheduling abandonment at independent practices have measurable and quantifiable revenue impact per physician per year.', context: 'The combination of front desk hold abandonment and unfilled no-show slots compounds \u2014 each individually recoverable with the right scheduling workflow.', sourceName: 'MGMA Benchmarking Data', sourceUrl: 'https://www.mgma.com/data/benchmarking-data' },
      { stat: 'The majority of after-hours calls that reach voicemail or default to the ED at independent practices are clinically routine \u2014 resolvable without escalation to a physician.', context: 'Self-care guidance, next-day appointment scheduling, and medication questions represent the bulk of after-hours call volume. Most can be resolved without on-call physician involvement.', sourceName: 'AAFP and MGMA after-hours access research', sourceUrl: null }
    ],
    ctaHeadline: 'Book a Demo',
    ctaSubline: 'Talk to our team about your practice\'s most pressing operational priorities.',
    ctaButton: 'Book a Demo'
  });
}


// ============================================================================
// 5. ASCs
// ============================================================================
function renderWhoWeServeASCs() {
  return renderAudiencePageV7({
    audienceName: 'Ambulatory Surgery Centers',
    breadcrumb: 'Who We Serve &gt; Ambulatory Surgery Centers',
    eyebrow: 'Who We Serve \u2014 Page 5 of 6',
    headline: 'Fewer prior auth delays. Faster referral-to-schedule. More OR days that run on plan.',
    subhead: 'Your margin runs on procedure throughput. The administrative workflows surrounding that throughput \u2014 prior authorizations, referral intake, patient scheduling, pre-procedure preparation, and post-procedure follow-up \u2014 are where delays originate, where referrals stall, and where recoverable revenue goes unrecovered.',
    challengeIntro: 'ASCs run on procedure throughput and margin. Every stalled prior auth is a delayed surgery. Every incomplete referral packet delays scheduling and frustrates the referring surgeon. Every day-of cancellation is a gap the OR schedule absorbs. The administrative workflows before and after the procedure are where operational efficiency is won or lost.',
    challenges: [
      { title: 'Prior Authorization Delays', body: 'Surgical prior auths are among the most documentation-intensive in ambulatory care. An ASC submitting 30\u201380 prior auths per week without an automated workflow is running a bottleneck that directly delays OR scheduling \u2014 and creating revenue cycle risk when authorization windows are missed.' },
      { title: 'Referral Intake Friction', body: 'Referrals arrive with varying documentation completeness. Managing incomplete intake manually \u2014 reading faxes, identifying missing items, contacting referring offices \u2014 delays scheduling and creates a poor handoff experience for referring surgeons who can and do route volume elsewhere.' },
      { title: 'Scheduling Gaps and Day-Of Cancellations', body: 'When scheduling staff manage procedure-specific time blocks, surgeon templates, equipment requirements, and payer constraints manually while handling inbound calls and cancellations, the OR schedule runs suboptimally. Preventable gaps and day-of cancellations have direct revenue impact.' },
      { title: 'Post-Procedure Patient Access', body: 'Patients experiencing medication confusion or post-procedure concerns after discharge often don\'t know who to call \u2014 and default to the ED. A structured post-procedure outreach program reaches them first and keeps recoverable issues out of the emergency department.' }
    ],
    fitIntro: 'Zynix AI handles the administrative execution layer that surrounds your OR \u2014 from the moment a referral arrives to the 72-hour post-procedure follow-up. The workflows that determine whether procedures happen on schedule, and whether patients recover without avoidable complications.',
    capabilities: [
      { title: 'Prior Auth and Referral Intake That Don\'t Create Queues', body: 'Documentation assembled, payers submitted, status tracked, denials routed, referral packets classified and checked for completeness \u2014 without a coordinator managing each step manually. The revenue cycle team and scheduling staff handle exceptions. Procedures stay on schedule.' },
      { title: 'OR Scheduling Optimized From the Cancellation Inward', body: 'Procedure-specific scheduling rules, surgeon template matching, and payer constraints enforced automatically. Waitlists filled when cancellations occur. Pre-procedure preparation sequences and day-of confirmations reduce preventable day-of cancellations.' },
      { title: 'Referring Surgeon Relationships Protected by Smooth Intake', body: 'Incomplete referral packets flagged and resolved before they delay scheduling. Referring surgeons receive a consistent, professional handoff \u2014 and continue routing volume to an ASC that makes their referrals easy to complete.' },
      { title: 'Post-Procedure Recovery Supported Through the Discharge Window', body: 'Structured 24-hour and 72-hour outreach contacts every discharged patient. Medication and wound care instructions confirmed via two-way interaction. After-hours patient questions answered without the ED as the only option.' }
    ],
    primaryUseCases: [
      { title: 'Prior Authorization for Surgical Procedures', teaser: 'A stalled prior auth is a delayed surgery. Criteria-aware documentation assembly, payer submission, denial management, and appeal routing for surgical authorization workflows.', url: '/use-cases/prior-auth-surgical-procedures' },
      { title: 'Referral Intake and Documentation Management', teaser: 'Referring surgeons judge your ASC by how smoothly referrals move. From received fax to classified, checked, and scheduled \u2014 incomplete packets resolved before they cause delays.', url: '/use-cases/referral-intake-asc' },
      { title: 'Patient Scheduling and Pre-Procedure Preparation', teaser: 'An optimized OR schedule starts with an optimized scheduling workflow. Procedure-specific rules, cancellation management, waitlist filling, and the prep sequences that reduce day-of cancellations.', url: '/use-cases/surgical-scheduling-pre-procedure' },
      { title: 'Post-Procedure Follow-Up and Complication Monitoring', teaser: 'Post-procedure safety doesn\'t end at discharge. The 24-hour and 72-hour follow-up workflow \u2014 what it checks, what it routes, and how it connects to after-hours coverage.', url: '/use-cases/post-procedure-followup-complication' },
      { title: 'Fax and Inbound Document Routing', teaser: 'Your fax inbox is a clinical workflow. Referral packets, auth responses, clearances, and lab results \u2014 read, classified, and routed, not stacked in a manual queue.', url: '/use-cases/fax-inbound-document-routing' }
    ],
    additionalUseCases: [
      { id: 'UC04', title: 'Prior Authorization Across High-Volume Specialty Services', primarySegment: 'Health Systems', url: '/use-cases/prior-auth-high-volume-specialty' }
    ],
    featuredProducts: [
      { name: 'ZynSchedule', url: '/agents/operational-efficiency/zynschedule', description: 'Procedure-specific scheduling with surgeon template matching, payer constraints, and waitlist management for surgical cancellations. Pre-procedure preparation and day-of confirmation sequences reduce preventable day-of cancellations.' },
      { name: 'Prior Auth Acceleration Care Plan', url: '/care-plans', description: 'Orchestrated workflow from authorization order to approved and scheduled. Handles documentation assembly, payer submission, denial management, and scheduling trigger when authorization is confirmed.' },
      { name: 'Transitions of Care Agent', url: '/agents/transitions-of-care', description: 'Post-procedure follow-up adapted to the ASC discharge context: 24-hour and 72-hour structured outreach, medication and wound care confirmation, complication routing, and integration with after-hours coverage.' },
      { name: 'ZynAfterHours', url: '/agents/operational-efficiency/zynafterhours-triage', description: '24/7 after-hours coverage for post-procedure patient concerns. Clinical triage logic, 15+ languages. Patients who would otherwise go to the ED get a clinical answer and a clear next step instead.' }
    ],
    citations: [
      { stat: 'Surgical prior authorizations are among the most documentation-intensive authorization categories in ambulatory care \u2014 and denial rates for surgical procedures are higher than most other service categories.', context: 'For an ASC submitting 30\u201380 prior auths per week without automation, the administrative burden and procedure delay risk compounds as payer portal requirements multiply.', sourceName: 'AMA Prior Authorization and Administrative Burden', sourceUrl: 'https://www.ama-assn.org/practice-management/prior-authorization/prior-authorization-and-administrative-burden' },
      { stat: 'No-show rates and day-of cancellations in ambulatory surgery settings have direct and measurable revenue impact per OR day \u2014 with proactive scheduling workflows reducing cancellation rates.', context: 'Automated waitlist management, preparation reminders, and day-of confirmation sequences address the preventable share of day-of cancellations before they happen.', sourceName: 'MGMA Benchmarking Data', sourceUrl: 'https://www.mgma.com/data/benchmarking-data' },
      { stat: 'Manual fax management in high-volume ambulatory surgery centers consumes significant staff time daily \u2014 with the highest risk concentrated in time-sensitive categories like prior auth approvals and medical clearances.', context: 'The risk is not just the staff time \u2014 it is the clinical and scheduling implication when a time-sensitive document sits unprocessed. Auth approvals missed, clearances delayed, procedures rescheduled.', sourceName: 'ASCA ASC Operational Benchmarking', sourceUrl: null },
      { stat: 'Structured post-surgical follow-up outreach within 24\u201372 hours of ASC discharge reduces avoidable ED visits for post-procedure complications and medication confusion.', context: 'For ASC patients, the post-discharge window is the highest-risk clinical period and the period where patient communication is typically least structured.', sourceName: 'Published post-surgical care and ambulatory outcomes research', sourceUrl: null }
    ],
    ctaHeadline: 'Book a Demo',
    ctaSubline: 'Talk to our team about your ASC\'s operational and throughput priorities.',
    ctaButton: 'Book a Demo'
  });
}


// ============================================================================
// 6. FQHCs
// ============================================================================
function renderWhoWeServeFQHCs() {
  return renderAudiencePageV7({
    audienceName: 'Federally Qualified Health Centers',
    breadcrumb: 'Who We Serve &gt; FQHCs',
    eyebrow: 'Who We Serve \u2014 Page 6 of 6',
    headline: 'Reach more patients in their language. Close more care gaps. Reduce avoidable ED visits for your highest-barrier population.',
    subhead: 'FQHCs serve the most complex patient populations in US healthcare \u2014 with some of the leanest care management staffing ratios in the ambulatory sector. The clinical mission is clear. The execution gap is structural: too many patients, too few coordinators, too many barriers between a clinical need and a completed clinical action.',
    challengeIntro: 'FQHCs serve patients with high chronic disease burden, significant social determinants of health, linguistic diversity, and limited access to alternative care settings. The execution gap is structural. The ratio of care management staff to patients makes full-panel execution impossible without an execution layer that handles contact volume, barrier identification, and multilingual outreach.',
    challenges: [
      { title: 'SDoH Barriers That Block Clinical Follow-Through', body: 'Transportation, food insecurity, housing instability, language barriers, and medication cost affect care plan adherence in ways clinical interventions alone cannot address. Identifying the barriers is one problem. Routing them to resolution is another. Most outreach tools do the first and skip the second.' },
      { title: 'Multilingual Patient Population', body: 'A significant share of FQHC patient panels speak a primary language other than English. Standard outreach tools reach the English-speaking cohort. They miss the rest \u2014 consistently, at exactly the moment when patient contact matters most. Language is not an edge case. It is a panel-level access problem.' },
      { title: 'Chronic Disease Volume With Limited Coordinator Capacity', body: 'FQHC patient panels carry high chronic disease burden. The ratio of care management staff to patients makes consistent monthly contact for every chronic care patient impossible without an execution layer. Most FQHCs are reaching a fraction of their CCM-eligible and care plan-enrolled panel.' },
      { title: 'After-Hours Access and ED Utilization', body: 'FQHC patients have fewer alternatives to the ED when they can\'t reach their care team after hours. When the call goes to voicemail or reaches an English-only line, patients in this population go to the ED at higher rates than the general ambulatory population.' }
    ],
    fitIntro: 'Zynix AI is built for the execution complexity of FQHC populations \u2014 multilingual, high-barrier, high chronic disease volume. It doesn\'t simplify the problem. It handles the work at the depth and scale the population requires.',
    capabilities: [
      { title: 'Outreach That Reaches the Full Panel, in the Patient\'s Language', body: 'Care management outreach, after-hours triage, and patient engagement in 15+ languages. The patient who calls in Spanish, Vietnamese, Haitian Creole, or Somali receives the same quality of clinical triage and care coordination as the patient who calls in English. Language is not a reason a patient goes unserved.' },
      { title: 'SDoH Barriers Identified, Routed, and Documented', body: 'Transportation, food, housing, cost, and language barriers captured during outreach interactions \u2014 in the same conversation as the clinical need. Each barrier type routes to the appropriate community resource or scheduling alternative. Resolution documented for HRSA reporting and quality measure tracking.' },
      { title: 'Chronic Care Programs That Reach the Full Enrolled Panel', body: 'Monthly check-ins, medication adherence monitoring, care plan reinforcement, and CCM billing documentation for every eligible patient \u2014 not just those the coordinator had time to reach. Patients with the highest barrier burden get more consistent contact, not less.' },
      { title: 'Post-Discharge Follow-Up That Accounts for Every FQHC-Specific Risk', body: 'ADT-triggered multilingual outreach reaches every discharged FQHC patient within 48 hours. Medication reconciliation accounts for polypharmacy complexity. Follow-up scheduling accommodates transportation barriers. Clinical escalation routes based on risk tier.' }
    ],
    primaryUseCases: [
      { title: 'After-Hours Triage for Multilingual and Underserved Populations', teaser: '24/7 clinical triage in 15+ languages, at FQHC economics \u2014 with ED diversion built into the workflow. After-hours access is an equity issue.', url: '/use-cases/after-hours-triage-multilingual-fqhc' },
      { title: 'SDoH Screening, Identification, and Care Navigation', teaser: 'Screening without routing is documentation. Routing without resolution is delay. Full workflow from positive SDoH screen to routed, documented, and resolved barrier.', url: '/use-cases/sdoh-screening-care-navigation' },
      { title: 'Preventive Screening Gap Closure for High-Barrier Populations', teaser: 'Two-way outreach that acknowledges barriers, offers a path through them, and books the appointment in the same interaction \u2014 not a generic reminder.', url: '/use-cases/preventive-screening-gap-fqhc' },
      { title: 'Medication Adherence for Complex Chronic Patients', teaser: 'In FQHC populations, medication non-adherence is a social problem as much as a clinical one. Barrier identification \u2014 cost, pharmacy access, side effects \u2014 and routing to resolution.', url: '/use-cases/medication-adherence-complex-chronic' },
      { title: 'Post-Discharge Follow-Up for High-Risk FQHC Patients', teaser: 'For FQHC patients, the post-discharge window is where outcomes are determined. Multilingual outreach, medication reconciliation, and transportation-accommodated follow-up scheduling.', url: '/use-cases/post-discharge-followup-fqhc' }
    ],
    additionalUseCases: [
      { id: 'UC17', title: 'Appointment Scheduling and No-Show Reduction', primarySegment: 'Independent Group Practices', url: '/use-cases/appointment-scheduling-no-show' },
      { id: 'UC19', title: 'CCM Billing Execution and Chronic Care Management', primarySegment: 'Independent Group Practices', url: '/use-cases/ccm-billing-chronic-care' },
      { id: 'UC15', title: 'Medication Adherence for Chronic Disease Populations', primarySegment: 'Health Plans', url: '/use-cases/medication-adherence-chronic-populations' }
    ],
    featuredProducts: [
      { name: 'ZynAfterHours', url: '/agents/operational-efficiency/zynafterhours-triage', description: '24/7 clinical triage with native support for 15+ languages. Evidence-based triage logic, ED diversion built in, next-day appointment scheduling. Built to operate at FQHC population economics.' },
      { name: 'SDoH Determination Agent', url: '/agents/sdoh-determination', description: 'Captures transportation, housing, food insecurity, language, and cost barriers during outreach interactions \u2014 routes each barrier type to the appropriate community resource or scheduling alternative. Resolution documented for HRSA reporting.' },
      { name: 'Preventive & Quality Activation Agents', url: '/agents/preventive-quality-activation', description: 'Two-way outreach for preventive screening, AWV, and quality gaps \u2014 with plain-language education, barrier capture, and same-session scheduling for patients who face access barriers that generic reminders don\'t address.' },
      { name: 'Transitions of Care Agent', url: '/agents/transitions-of-care', description: 'Post-discharge follow-up with multilingual outreach, medication reconciliation for polypharmacy FQHC patients, transportation-accommodated follow-up scheduling, and clinical escalation based on risk tier.' }
    ],
    citations: [
      { stat: 'FQHCs with higher patient outreach completion rates consistently outperform on HRSA UDS preventive care quality measures \u2014 with the performance gap most visible on measures that require patient-initiated follow-through.', context: 'For high-barrier populations, the outreach must navigate the barrier in the same interaction, not schedule a second touch. Contact rate and barrier resolution are the leading indicators.', sourceName: 'HRSA Uniform Data System (UDS) Mapper', sourceUrl: 'https://data.hrsa.gov/tools/uds-mapper' },
      { stat: 'Multilingual patient communication \u2014 in the patient\'s primary language, without a third-party interpreter \u2014 improves engagement, care plan adherence, and follow-up completion rates in underserved populations.', context: 'For patients whose primary language is not English, language-matched outreach is the threshold between contacted and unreached. This is not a marginal issue for FQHCs with diverse panels.', sourceName: 'Published health equity and community health outcomes research', sourceUrl: null },
      { stat: 'FQHCs that close the loop between SDoH screening and barrier resolution show measurably better chronic care quality measure performance than those that screen and document without routing.', context: 'PCMH quality measures and HRSA UDS metrics both reward SDoH identification and action \u2014 the action step is what separates documentation from impact.', sourceName: 'PCMH quality measure data and HRSA program guidelines', sourceUrl: null },
      { stat: 'FQHC patients face a higher 30-day readmission risk than the general ambulatory population \u2014 driven by post-discharge follow-up gaps, language barriers in the discharge process, and medication reconciliation failures in the 24\u201348 hour window.', context: 'For FQHCs under value-based contracts, readmission risk in the discharged patient cohort is both a care quality issue and a cost exposure. The 48-hour contact window is the highest-leverage intervention point.', sourceName: 'Post-discharge outcomes research in FQHC and community health center populations', sourceUrl: null }
    ],
    ctaHeadline: 'Book a Demo',
    ctaSubline: 'Talk to our team about your FQHC\'s care coordination and population health priorities.',
    ctaButton: 'Book a Demo'
  });
}


// ============================================================================
// COMPANY PAGES — Template E (Variable Structure)
// ============================================================================


// ============================================================================
// 7. ABOUT US
// ============================================================================


function renderAboutV7() {
  var html = '';

  html += renderInnerHero('ABOUT ZYNIX AI', 'Physician-led. Built for the people running value-based care every day.',
    'Zynix AI combines a clinical intelligence engine with purpose-built AI agents and orchestrated care plans \u2014 built by operators who spent decades watching the gap between knowing and acting cost organizations their shared savings and their patients their care.',
    IMG.patients, 'Zynix AI leadership team');

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">OUR STORY</span>' +
    '<h2>Thirty Years Inside the System. One Conclusion.</h2>' +
    '<p class="zynix-section-sub">Jayadeva (Jay) Chowdappa, M.D. has spent more than thirty years operating inside US healthcare \u2014 as a physician, managed care leader, and ACO operator. After building Apollo Medical Group and Next Healthcare Solutions, he spent over a decade running MSSP ACOs, REACH ACOs, and Medicare Advantage programs across seven states, managing more than 35,000 Medicare patients across 140 practices.</p>' +
    '<p class="zynix-section-sub">He brought together a team of engineers, clinical informaticists, and healthcare operators to build what was missing. A platform that combines a data and analytics intelligence engine with purpose-built AI agents, orchestrated by deployable care plans that coordinate multiple workflows until the work is actually done.</p>' +
    '</div></section>';

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">OUR MISSION</span>' +
    '<h2>Why We Exist</h2>' +
    '<div class="zynix-about-quote"><blockquote>To give value-based care organizations the intelligence to see what matters and the execution infrastructure to act on it \u2014 so more patients receive the care they need, and the organizations delivering it can sustain the work.</blockquote></div>' +
    '</div></section>';

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">WHAT WE BELIEVE</span>' +
    '<h2>Healthcare\'s Doing Problem Is Solvable</h2>' +
    renderFeatureCards([
      { icon: '&#128161;', title: 'The Chaos Is Not Inevitable', desc: 'What looks like an inherent limitation of care operations is almost always a workflow problem with a workflow solution.' },
      { icon: '&#128300;', title: 'Clinical Trust Is Earned Through Precision', desc: 'AI in healthcare only works if the clinicians and operators using it believe it understands the domain.' },
      { icon: '&#9889;', title: 'Insight Without Execution Is a Missed Deadline', desc: 'Seeing who needs care is not the same as reaching them. Zynix AI connects intelligence to agents that act.' },
      { icon: '&#128101;', title: 'Built by People Accountable for Outcomes', desc: 'The founding team has run ACOs, managed risk contracts, and been in the room where performance-year results are reviewed.' }
    ]) +
    '</div></section>';

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">OUR TEAM</span>' +
    '<h2>Our Leadership Team</h2>' +
    '<p class="zynix-section-sub">The driving force behind Zynix AI \u2014 operators and builders who have been accountable for the problems this platform is designed to solve.</p>' +
    '<div class="zynix-agents-grid">' +
    '<div class="zynix-agent-card fade-in-up"><div class="zynix-agent-header"><span class="zynix-agent-icon">&#129657;</span><h3>Jayadeva (Jay) Chowdappa, M.D.</h3></div><p style="font-size:13px;color:var(--z-accent);font-weight:600;margin-bottom:8px">Co-Founder & CEO</p><p>Physician executive with 30+ years in Internal Medicine, managed care, and physician leadership. Built Next Healthcare Solutions into a multi-state ACO network serving 35,000+ Medicare patients across 140 practices and seven states.</p><div class="zynix-agent-metrics"><span><a href="https://www.linkedin.com/in/jayadeva-jay-chowdappa-m-d-6b221616/" target="_blank" rel="noopener">LinkedIn</a></span></div></div>' +
    '<div class="zynix-agent-card fade-in-up"><div class="zynix-agent-header"><span class="zynix-agent-icon">&#128187;</span><h3>Gautamdev Chowdary</h3></div><p style="font-size:13px;color:var(--z-accent);font-weight:600;margin-bottom:8px">Co-Founder & CTO</p><p>Architects Kubernetes-orchestrated microservices, production ML pipelines, and HIPAA-secure LLM agents. Background spans graduate-level AI research and deployment of predictive analytics stacks.</p><div class="zynix-agent-metrics"><span><a href="https://www.linkedin.com/in/cgautamdevc/" target="_blank" rel="noopener">LinkedIn</a></span></div></div>' +
    '<div class="zynix-agent-card fade-in-up"><div class="zynix-agent-header"><span class="zynix-agent-icon">&#128200;</span><h3>David McDonald</h3></div><p style="font-size:13px;color:var(--z-accent);font-weight:600;margin-bottom:8px">Vice President, Sales</p><p>31 years of healthcare industry experience spanning population health, clinical analytics, risk adjustment, and the commercial partnerships that connect clinical performance to financial outcomes.</p><div class="zynix-agent-metrics"><span><a href="https://www.linkedin.com/in/mcdonalddavidl/" target="_blank" rel="noopener">LinkedIn</a></span></div></div>' +
    '</div></div></section>';

  html += renderMetricsBar([
    { value: '1M+', label: 'Patients Served' },
    { value: '40%', label: 'Reduction in Admin Burden' },
    { value: '25%', label: 'Revenue Capture Improvement' }
  ]);

  html += renderCTA('Built on Clinical Insight. Powered by AI Agents.', 'Talk to our team about what Zynix AI looks like for your organization.', 'Book a Demo');
  html += renderFooter();
  return html;
}


function renderZynixLLMV7() {
  var html = '';

  html += renderInnerHero('COMPANY \u2014 TECHNOLOGY', 'Healthcare-Native Intelligence, Built for Real-World Care',
    'ZynixLLM is the intelligence layer built into the Zynix AI platform. It was developed specifically for healthcare \u2014 trained on clinical language, built with safety guardrails, and designed to support the workflows that care teams depend on.',
    IMG.mesh, 'ZynixLLM Healthcare AI');

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">WHAT IS ZYNIXLLM</span>' +
    '<h2>The Reasoning Engine Behind Every Workflow</h2>' +
    '<p class="zynix-section-sub">ZynixLLM is Zynix AI\'s healthcare-adapted language model \u2014 built by fine-tuning foundational AI systems on US healthcare data, clinical documentation, care coordination language, and value-based care workflows. It is the intelligence infrastructure that powers everything on the platform. It is not a product customers buy separately. It is the reasoning engine built into every agent, analytics tool, and documentation workflow.</p>' +
    '</div></section>';

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">WHY HEALTHCARE NEEDS DIFFERENT AI</span>' +
    '<h2>General-Purpose AI Falls Short in Clinical Settings</h2>' +
    renderFeatureCards([
      { icon: '&#128300;', title: 'The Language Is Specialized', desc: 'Healthcare documentation uses terminology, abbreviations, and coding conventions that general AI systems were not trained to handle with clinical precision.' },
      { icon: '&#9888;', title: 'Incomplete Context Creates Real Risk', desc: 'A model that cannot reason under uncertainty and does not flag gaps for human review is not appropriate for clinical environments.' },
      { icon: '&#128274;', title: 'Compliance Is Not Optional', desc: 'Healthcare organizations operate under HIPAA, CMS guidelines, and enterprise security requirements.' },
      { icon: '&#9881;', title: 'Workflows Are the Unit of Value', desc: 'AI that only produces outputs, without integrating into defined workflows, stops short of the problem.' }
    ]) +
    '</div></section>';

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">DIFFERENTIATORS</span>' +
    '<h2>What Makes ZynixLLM Different</h2>' +
    '<div class="zynix-arch-grid">';
  var diffs = [
    { num: '01', title: 'Healthcare-Native Design', desc: 'Fine-tuned on clinical language, US healthcare workflows, care coordination documentation, and value-based care operations.' },
    { num: '02', title: 'Multi-Modal Understanding', desc: 'Processes voice, structured EHR data, free-text notes, claims data, lab results, and diagnostic documentation together.' },
    { num: '03', title: 'Safety-First Architecture', desc: 'Layered safety framework. Uncertainty is flagged rather than masked. Critical decisions include a human in the loop.' },
    { num: '04', title: 'Workflow Integration', desc: 'Designed to support defined clinical and operational workflows where outputs feed into the next step of a process.' },
    { num: '05', title: 'Flexible Deployment', desc: 'Supports secure cloud, customer-controlled cloud, on-premise, and hybrid configurations.' }
  ];
  // Use 5 cards - first 4 in arch-grid (2x2), last one below
  for (var d = 0; d < 4; d++) {
    html += '<div class="zynix-arch-card fade-in-up"><div class="zynix-arch-num">' + diffs[d].num + '</div><h3>' + diffs[d].title + '</h3><p>' + diffs[d].desc + '</p></div>';
  }
  html += '</div>' +
    '<div class="zynix-arch-grid" style="grid-template-columns:1fr"><div class="zynix-arch-card fade-in-up"><div class="zynix-arch-num">' + diffs[4].num + '</div><h3>' + diffs[4].title + '</h3><p>' + diffs[4].desc + '</p></div></div>' +
    '</div></section>';

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">WHERE IT IS USED</span>' +
    '<h2>ZynixLLM Powers Every Platform Layer</h2>' +
    renderFeatureCards([
      { icon: '&#128222;', title: 'Patient Engagement & AI Voice Agents', desc: 'Powers clinical language understanding behind patient-facing AI voice agents for two-way outreach conversations.' },
      { icon: '&#127908;', title: 'Ambient Clinical Documentation', desc: 'Enables real-time transcription and structuring of patient-clinician conversations into clinical notes.' },
      { icon: '&#128202;', title: 'Care Gap Detection & Prioritization', desc: 'Identifies patients with open quality and risk gaps, prioritizes by clinical urgency and RAF impact.' },
      { icon: '&#128200;', title: 'Predictive Analytics & Risk Stratification', desc: 'Interprets signals across claims, EHR data, labs, and SDoH to surface patients rising in risk.' },
      { icon: '&#128268;', title: 'Care Coordination & Workflow Orchestration', desc: 'Provides the reasoning backbone that moves work through multi-step clinical workflows to completion.' },
      { icon: '&#128161;', title: 'After-Hours Triage & Clinical Communication', desc: 'Supports triage logic and clinical communication in after-hours contexts in 15+ languages.' }
    ]) +
    '</div></section>';

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">COMPARISON</span>' +
    '<h2>ZynixLLM vs General-Purpose AI</h2>' +
    '<div class="zynix-compare-grid">' +
    '<div class="zynix-compare-card zynix-compare-good"><h3>ZynixLLM</h3><ul>' +
    '<li>Built specifically for healthcare workflows</li>' +
    '<li>Optimized for clinical terminology and coding</li>' +
    '<li>Safety checks, uncertainty flagging, and human escalation</li>' +
    '<li>Supports multi-step care workflows to completion</li>' +
    '<li>Tuned for healthcare conversation and triage logic</li>' +
    '<li>Secure cloud, on-premise, hybrid deployment</li>' +
    '<li>Built for HIPAA and enterprise security</li>' +
    '</ul></div>' +
    '<div class="zynix-compare-card zynix-compare-bad"><h3>General-Purpose AI</h3><ul>' +
    '<li>Built for broad general-purpose language tasks</li>' +
    '<li>Limited healthcare-specific language depth</li>' +
    '<li>General content moderation only</li>' +
    '<li>Response-based; no workflow execution</li>' +
    '<li>Not optimized for clinical nuance</li>' +
    '<li>Typically cloud-only</li>' +
    '<li>Not healthcare-specific compliance</li>' +
    '</ul></div>' +
    '</div></div></section>';

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">DEPLOYMENT FLEXIBILITY</span>' +
    '<h2>Deploy ZynixLLM Where Your Data Lives</h2>' +
    '<p class="zynix-section-sub">Healthcare organizations require control over where AI models run and where patient data is processed. ZynixLLM supports every deployment model \u2014 from fully managed cloud to air-gapped on-premises installations \u2014 ensuring HIPAA compliant AI deployment that meets your organization\'s data sovereignty requirements.</p>' +
    '<div class="zynix-arch-grid">' +
    '<div class="zynix-arch-card fade-in-up" style="border-left-color:#ccfdcf"><div class="zynix-arch-num">&#9729;</div><h3>Zynix Cloud</h3><p>Fully managed healthcare AI deployment on HIPAA-compliant, SOC 2 Type II certified infrastructure. Zero infrastructure management. Automatic updates and scaling. The fastest path to production.</p></div>' +
    '<div class="zynix-arch-card fade-in-up" style="border-left-color:#cebffa"><div class="zynix-arch-num">&#128274;</div><h3>Private Cloud (AWS / Azure / GCP)</h3><p>Dedicated ZynixLLM instance in your VPC. Private cloud healthcare AI with customer-managed encryption keys, network isolation, and full data residency control. All inference stays within your cloud boundary.</p></div>' +
    '<div class="zynix-arch-card fade-in-up" style="border-left-color:#fddbc8"><div class="zynix-arch-num">&#127970;</div><h3>On-Premises</h3><p>Run the complete on-premises healthcare LLM stack in your own data center. Air-gapped medical AI deployment available for facilities requiring zero external connectivity. PHI never leaves your physical infrastructure.</p></div>' +
    '<div class="zynix-arch-card fade-in-up" style="border-left-color:#d7e9ff"><div class="zynix-arch-num">&#128260;</div><h3>Hybrid</h3><p>Cloud orchestration with on-premises inference. Workflow management runs in the cloud while ZynixLLM clinical inference runs locally. Sensitive data never leaves the facility. Best of both deployment models.</p></div>' +
    '</div></div></section>';

  html += renderCTA('Healthcare AI That Understands How Care Actually Works', 'Talk to our team about how ZynixLLM powers intelligent workflows across the Zynix platform.', 'Talk to Our Team');
  html += renderFooter();
  return html;
}


function renderSecurityV7() {
  var html = '';

  html += renderInnerHero('SECURITY & COMPLIANCE', 'Security and Compliance Built for Healthcare',
    'Zynix AI is SOC 2 Type II certified and operates HIPAA-aligned safeguards across every deployment. This page summarizes our security posture for prospective customers, procurement teams, and compliance reviewers.',
    IMG.enterprise, 'Zynix AI Security');

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">COMPLIANCE</span>' +
    '<h2>Compliance Highlights</h2>' +
    renderFeatureCards([
      { icon: '&#128274;', title: 'SOC 2 Type II', desc: 'Certified. Coverage: Zynix AI platform and supporting systems. Full audit documentation available through the Zynix AI Trust Portal powered by Drata. Contact info@zynix.ai to request access.', metric: 'Certified', metricLabel: 'Current' },
      { icon: '&#128737;', title: 'HIPAA', desc: 'HIPAA-aligned safeguards and operating practices for all deployments involving PHI. Validated through our SOC 2 program. Business Associate Agreement (BAA) available for all covered entity customers.', metric: 'Aligned', metricLabel: 'BAA Available' },
      { icon: '&#128272;', title: 'HITRUST CSF', desc: 'HITRUST CSF readiness assessment completed. Enterprise-grade security framework alignment for healthcare AI deployments.', metric: 'Ready', metricLabel: 'Assessment Complete' }
    ]) +
    '</div></section>';

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">SECURITY PROGRAM</span>' +
    '<h2>Security Program Overview</h2>' +
    '<div class="zynix-data-layers">' +
    '<div class="zynix-data-layer fade-in-up"><h3>Data Protection</h3><p>Encryption in transit and at rest across all platform components. Access controls based on least-privilege principles. Separation of production and non-production environments.</p></div>' +
    '<div class="zynix-data-layer fade-in-up"><h3>Identity & Access Management</h3><p>Role-based access controls (RBAC) across all systems. Multi-factor authentication (MFA) required for all administrative access. Periodic access reviews.</p></div>' +
    '<div class="zynix-data-layer fade-in-up"><h3>Monitoring & Incident Response</h3><p>Continuous security monitoring across key systems. Documented incident response plan with defined escalation paths. Customer notification obligations defined in agreements.</p></div>' +
    '<div class="zynix-data-layer fade-in-up"><h3>Business Continuity</h3><p>Backup and recovery procedures for all critical systems, tested periodically. Business continuity planning for operational resilience across healthcare deployments.</p></div>' +
    '</div></div></section>';

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">TRUST PORTAL</span>' +
    '<h2>Access Our Security Documentation</h2>' +
    '<p class="zynix-section-sub">Zynix AI\'s security and compliance documentation \u2014 including our SOC 2 Type II report, security policies, and compliance certificates \u2014 is available through our Trust Portal, powered by Drata. Contact <a href="mailto:info@zynix.ai">info@zynix.ai</a> to request access.</p>' +
    '</div></section>';

  html += '<section class="zynix-faq-section"><div class="zynix-container">' +
    '<span class="zynix-tag">FAQ</span>' +
    '<h2>Frequently Asked Questions</h2>' +
    '<div class="zynix-faq-list">';
  var faqItems = [
    { q: 'Are you SOC 2 Type II certified?', a: 'Yes. Zynix AI holds a current SOC 2 Type II certification covering our platform and supporting systems. The full report is available under NDA.' },
    { q: 'Is a Business Associate Agreement (BAA) available?', a: 'Yes. A BAA is available for all customers operating under HIPAA-regulated workflows. Contact info@zynix.ai to initiate.' },
    { q: 'How does Zynix AI handle protected health information (PHI)?', a: 'PHI is processed in accordance with our executed BAA and applicable HIPAA safeguards \u2014 including encryption in transit and at rest, access controls, and audit logging.' },
    { q: 'Do you support customer security assessments?', a: 'Yes. We regularly support procurement and security review processes. Contact info@zynix.ai to submit a questionnaire.' },
    { q: 'Do you conduct penetration testing?', a: 'Yes. Third-party penetration testing is conducted periodically. Results are available to customers under NDA.' },
    { q: 'Do you run vulnerability management?', a: 'Yes. Vulnerability scanning, prioritized remediation, and tracking against defined SLAs are part of our ongoing security operations.' }
  ];
  for (var f = 0; f < faqItems.length; f++) {
    html += '<div class="zynix-faq-item"><div class="zynix-faq-q">' + faqItems[f].q + '<span class="zynix-faq-toggle">+</span></div><div class="zynix-faq-a"><p>' + faqItems[f].a + '</p></div></div>';
  }
  html += '</div></div></section>';

  html += renderCTA('Working Through a Security Review?', 'Our team supports questionnaires, documentation requests, and BAA execution as part of every customer evaluation.', 'Contact Our Security Team');
  html += renderFooter();
  return html;
}


function renderPressV7() {
  var html = '';

  html += renderInnerHero('PRESS', 'Press Resources',
    'Everything you need to cover Zynix AI \u2014 in one place. Official logos, brand guidelines, leadership bios, company boilerplate, and press contact information.',
    IMG.hero, 'Zynix AI Press');

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">ABOUT</span>' +
    '<h2>About Zynix AI</h2>' +
    '<p class="zynix-section-sub">Zynix AI is an AI operating layer for value-based care. The platform connects healthcare data, clinical intelligence, and workflow execution so care teams can act on the right patient, at the right time, through the right channel. It is built on ZynixLLM, a healthcare-native language model, and is used by MSSP ACOs, risk-bearing MSOs, Medicare Advantage plans, and value-based care organizations throughout the United States. Headquartered in Florida, co-founded by Jayadeva (Jay) Chowdappa, M.D. and Gautamdev Chowdary.</p>' +
    '</div></section>';

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">MEDIA KIT</span>' +
    '<h2>Download the Press Kit</h2>' +
    '<p class="zynix-section-sub">The Zynix AI Press Kit includes official logos, brand color and typography guidelines, leadership bios and headshots, company boilerplate, and product visuals guide. All assets are cleared for editorial use.</p>' +
    renderFeatureCards([
      { icon: '&#127912;', title: 'Logo Assets', desc: 'SVG, PNG 1080px, and high-resolution PNG formats. Light and dark background versions.' },
      { icon: '&#128203;', title: 'Brand Guidelines', desc: 'Colors, typography, usage rules, and brand voice guidance.' },
      { icon: '&#128100;', title: 'Leadership Bios', desc: 'Full bios and headshots for co-founders and executive team.' }
    ]) +
    '</div></section>';

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">OUR TEAM</span>' +
    '<h2>Leadership Team</h2>' +
    '<div class="zynix-agents-grid">' +
    '<div class="zynix-agent-card fade-in-up"><div class="zynix-agent-header"><span class="zynix-agent-icon">&#129657;</span><h3>Jayadeva (Jay) Chowdappa, M.D.</h3></div><p style="font-size:13px;color:var(--z-accent);font-weight:600;margin-bottom:8px">Co-Founder & CEO</p><p>Dr. Jay Chowdappa is a physician executive with more than 30 years of experience. He built Next Healthcare Solutions into a multi-state ACO network serving 35,000+ Medicare patients.</p></div>' +
    '<div class="zynix-agent-card fade-in-up"><div class="zynix-agent-header"><span class="zynix-agent-icon">&#128187;</span><h3>Gautamdev Chowdary</h3></div><p style="font-size:13px;color:var(--z-accent);font-weight:600;margin-bottom:8px">Co-Founder & CTO</p><p>Leads technology and platform development. Architects Kubernetes-orchestrated microservices, production ML pipelines, and HIPAA-secure LLM agents.</p></div>' +
    '<div class="zynix-agent-card fade-in-up"><div class="zynix-agent-header"><span class="zynix-agent-icon">&#128200;</span><h3>David McDonald</h3></div><p style="font-size:13px;color:var(--z-accent);font-weight:600;margin-bottom:8px">Vice President, Sales</p><p>31 years of healthcare industry experience spanning population health, clinical analytics, risk adjustment, and commercial partnerships.</p></div>' +
    '</div></div></section>';

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">PRESS CONTACT</span>' +
    '<h2>Talk to Us</h2>' +
    '<p class="zynix-section-sub">For press inquiries, interview requests, background briefings, analyst calls, or permission to use Zynix AI brand assets, contact our press team directly. We aim to respond to all media inquiries within one business day.</p>' +
    '<div class="zynix-feature-grid">' +
    '<div class="zynix-feature-card"><div class="zynix-feature-icon">&#128231;</div><h3>Press Contact</h3><p>Jayadeva (Jay) Chowdappa, M.D.<br>Co-Founder & CEO<br><a href="mailto:press@zynix.ai">press@zynix.ai</a></p></div>' +
    '<div class="zynix-feature-card"><div class="zynix-feature-icon">&#127760;</div><h3>Website</h3><p>zynix.ai</p></div>' +
    '<div class="zynix-feature-card"><div class="zynix-feature-icon">&#128205;</div><h3>Headquarters</h3><p>3535 Little Rd<br>Trinity, FL 34655, USA</p></div>' +
    '</div></div></section>';

  html += renderFooter();
  return html;
}


function renderPrivacyV7() {
  var html = '';

  html += renderInnerHero('PRIVACY POLICY', 'Your Privacy Is Part of How We Build',
    'This policy explains how Zynix AI collects, uses, and protects information when you visit our website or contact us about our services.',
    IMG.hero, 'Zynix AI Privacy Policy');

  html += '<section class="zynix-legal-section"><div class="zynix-container"><div class="zynix-legal-content">' +
    '<p><strong>Effective Date:</strong> March 22, 2026 | <strong>Last Updated:</strong> March 22, 2026</p>' +
    '<h2>1. Who This Policy Applies To</h2>' +
    '<p>This policy applies to visitors to the Zynix AI website (zynix.ai), people who contact us for demos or inquiries, and business contacts interacting with Zynix AI for procurement, security reviews, or partnerships.</p>' +
    '<h2>2. Information We Collect</h2>' +
    '<p><strong>Information you provide:</strong> Contact details (name, email, phone), company name and role, messages and form submissions.</p>' +
    '<p><strong>Information collected automatically:</strong> IP address, browser type, pages visited, referring source, and device information through cookies and analytics tools.</p>' +
    '<h2>3. How We Use Information</h2>' +
    '<p>We use information to respond to demo requests and inquiries, improve our website, comply with legal obligations, and communicate about our services when you have opted in.</p>' +
    '<h2>4. Data Sharing</h2>' +
    '<p>We do not sell personal information. We may share with service providers who help operate our website, professional advisors, and as required by law.</p>' +
    '<h2>5. Data Security</h2>' +
    '<p>We implement appropriate technical and organizational measures to protect information. Zynix AI is SOC 2 Type II certified and operates HIPAA-aligned safeguards.</p>' +
    '<h2>6. Your Rights</h2>' +
    '<p>You may request access to, correction of, or deletion of your personal information. Contact <a href="mailto:info@zynix.ai">info@zynix.ai</a> to exercise these rights.</p>' +
    '<h2>7. Contact</h2>' +
    '<p><strong>Email:</strong> <a href="mailto:info@zynix.ai">info@zynix.ai</a></p>' +
    '<p><strong>Address:</strong> 3535 Little Rd, Trinity, FL 34655, USA</p>' +
    '</div></div></section>';

  html += renderCTA('Questions About Our Privacy Practices?', 'Our team is happy to help with questions about how we handle your information.', 'Contact Us');
  html += renderFooter();
  return html;
}


function renderTermsV7() {
  var html = '';

  html += renderInnerHero('TERMS OF SERVICE', 'Terms of Service',
    'These terms govern your use of the Zynix AI website. By accessing or using this site, you agree to the terms below.',
    IMG.hero, 'Zynix AI Terms');

  html += '<section class="zynix-legal-section"><div class="zynix-container"><div class="zynix-legal-content">' +
    '<p><strong>Effective Date:</strong> March 22, 2026 | <strong>Last Updated:</strong> March 22, 2026</p>' +
    '<h2>1. Who We Are</h2>' +
    '<p>Zynix AI (referred to as "Zynix," "we," "us," or "our") operates this website.</p>' +
    '<p><strong>Contact:</strong> <a href="mailto:info@zynix.ai">info@zynix.ai</a> | 3535 Little Rd, Trinity, FL 34655, USA</p>' +
    '<h2>2. Permitted Use</h2>' +
    '<p>You may use this website for lawful business purposes. You agree not to: attempt to disrupt or compromise the website\'s security; reverse engineer, scrape, or harvest data unlawfully; upload malicious code; or transmit unlawful content.</p>' +
    '<h2>3. No Medical Advice</h2>' +
    '<p>This website is provided for informational and business purposes only. Nothing on this website constitutes medical advice, clinical guidance, diagnosis, or treatment.</p>' +
    '<h2>4. Intellectual Property</h2>' +
    '<p>All content on this website is owned by Zynix AI or its licensors and is protected by applicable intellectual property laws.</p>' +
    '<h2>5. Third-Party Links</h2>' +
    '<p>This website may contain links to third-party websites. Zynix AI does not control those sites and is not responsible for their content.</p>' +
    '<h2>6. Disclaimers</h2>' +
    '<p>This website is provided on an "AS IS" and "AS AVAILABLE" basis. Zynix AI disclaims all warranties to the maximum extent permitted by law.</p>' +
    '<h2>7. Limitation of Liability</h2>' +
    '<p>Zynix AI will not be liable for any indirect, incidental, special, consequential, or punitive damages arising from use of this website. Total liability will not exceed USD $100.</p>' +
    '<h2>8. Indemnification</h2>' +
    '<p>You agree to indemnify and hold harmless Zynix AI from claims arising out of your misuse of this website or violation of these Terms.</p>' +
    '<h2>9. Changes</h2>' +
    '<p>We may update these Terms at any time. Continued use constitutes acceptance of revised Terms.</p>' +
    '<h2>10. Governing Law</h2>' +
    '<p>These Terms are governed by the laws of the State of Florida. Disputes shall be subject to the exclusive jurisdiction of courts in Pasco County, Florida.</p>' +
    '<h2>11. Contact</h2>' +
    '<p><strong>Email:</strong> <a href="mailto:info@zynix.ai">info@zynix.ai</a> | <strong>Address:</strong> 3535 Little Rd, Trinity, FL 34655, USA</p>' +
    '</div></div></section>';

  html += renderCTA('Questions About Our Terms?', 'Our team is happy to help with questions about our website, services, or how we operate.', 'Contact Us');
  html += renderFooter();
  return html;
}

// ============================================================================
// ROUTE ENTRIES
// ============================================================================
var AUDIENCE_COMPANY_ROUTES = {
  // Audience Pages (Whom We Serve)
  '/who-we-serve/health-systems': renderWhoWeServeHealthSystems,
  '/who-we-serve/acos-msos': renderWhoWeServeACOs,
  '/who-we-serve/health-plans': renderWhoWeServeHealthPlans,
  '/who-we-serve/independent-group-practices': renderWhoWeServeIndependentPractices,
  '/who-we-serve/ascs': renderWhoWeServeASCs,
  '/who-we-serve/fqhcs': renderWhoWeServeFQHCs,
  // Company Pages
  '/about': renderAboutV7,
  '/company/zynixllm': renderZynixLLMV7,
  '/security': renderSecurityV7,
  '/press': renderPressV7,
  '/privacy-policy': renderPrivacyV7,
  '/terms-of-service': renderTermsV7
};


// ============================================================================
// PAGE_SEO ENTRIES

  // ── V7 REBUILD: Agent + Platform Pages ──────────────────────────────────

function renderAgentPageV7(data) {
  var html = '';

  html += renderInnerHero(data.category, data.headline, data.subhead, data.heroImage, data.heroAlt);

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">WHAT IT DOES</span>' +
    '<h2>' + data.whatHeading + '</h2>' +
    '<p class="zynix-section-sub">' + data.whatBody + '</p>' +
    '</div></section>';

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">HOW IT WORKS</span>' +
    '<h2>' + data.workflowHeading + '</h2>' +
    '<div class="zynix-orch-flow">';
  data.workflowSteps.forEach(function(step, i) {
    if (i > 0) html += '<div class="zynix-orch-arrow">&rarr;</div>';
    html += '<div class="zynix-orch-step fade-in-up"><span>' + (i + 1) + '</span><p>' + step.title + '</p></div>';
  });
  html += '</div>' +
    '<div class="zynix-careplan-grid" style="margin-top:32px">';
  data.workflowSteps.forEach(function(step, i) {
    html += '<div class="zynix-careplan-card fade-in-up"><div class="zynix-cp-num">' + (i + 1) + '</div><div><h4>' + step.title + '</h4><p>' + step.description + '</p></div></div>';
  });
  html += '</div></div></section>';

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">INPUTS &amp; OUTPUTS</span>' +
    '<h2>What Goes In. What Comes Out.</h2>' +
    '<div class="zynix-compare-grid">' +
    '<div class="zynix-compare-card zynix-compare-bad"><h3>Inputs</h3><ul>';
  data.inputs.forEach(function(item) { html += '<li>' + item + '</li>'; });
  html += '</ul></div>' +
    '<div class="zynix-compare-card zynix-compare-good"><h3>Outputs</h3><ul>';
  data.outputs.forEach(function(item) { html += '<li>' + item + '</li>'; });
  html += '</ul></div></div></div></section>';

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">INTEGRATIONS</span>' +
    '<h2>Where It Connects</h2>' +
    '<div class="zynix-feature-grid">';
  data.integrations.forEach(function(intg) {
    html += '<div class="zynix-feature-card fade-in-up"><div class="zynix-feature-icon">&#128268;</div><h3>' + intg.system + '</h3><p>' + intg.description + '</p></div>';
  });
  html += '</div></div></section>';

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">GOVERNANCE</span>' +
    '<h2>Human Oversight Built In</h2>' +
    '<p class="zynix-section-sub">' + data.governanceBody + '</p>' +
    '<div class="zynix-problem-grid">';
  data.governancePoints.forEach(function(g) {
    html += '<div class="zynix-problem-card fade-in-up"><div class="zynix-problem-icon">&#128737;</div><h3>' + g.title + '</h3><p>' + g.body + '</p></div>';
  });
  html += '</div></div></section>';

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">RELATED</span>' +
    '<h2>Related Use Cases</h2>' +
    '<div class="zynix-agents-grid">';
  data.relatedUseCases.forEach(function(uc) {
    html += '<div class="zynix-agent-card fade-in-up">' +
      '<div class="zynix-agent-header"><span class="zynix-agent-icon">' + uc.ucId + '</span><h3>' + uc.title + '</h3></div>' +
      '<p><a href="' + uc.url + '">View use case &rarr;</a></p>' +
      '</div>';
  });
  html += '</div></div></section>';

  html += renderCTA(data.ctaHeadline, data.ctaSubline, data.ctaButton);
  html += renderFooter();
  return html;
}



function renderPlatformHub() {
  var html = '';

  html += renderInnerHero('THE PLATFORM', 'The AI Operating System for Value-Based Care',
    'Zynix Intelligent Platform (ZIP) unifies healthcare data, clinical intelligence, autonomous AI agents, and deployable care plans into a single operating system. One platform replaces the patchwork of point solutions that fragment care delivery and limit performance improvement.',
    IMG.enterprise, 'Zynix Intelligent Platform');

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">OVERVIEW</span>' +
    '<h2>What ZIP Is</h2>' +
    '<p class="zynix-section-sub">ZIP is the unified platform that connects data ingestion, AI-driven intelligence, autonomous agent execution, and orchestrated care plans into a single system of record and action. It replaces the fragmented stack of analytics dashboards, outreach tools, scheduling software, and documentation platforms that most healthcare organizations operate today.</p>' +
    '<p class="zynix-section-sub">Every component shares the same data layer, the same patient context, and the same security posture. ZIP is deployed across ACOs, health systems, health plans, FQHCs, and independent practices serving over 1 million patients in 30 states.</p>' +
    '</div></section>';

  html += '<section id="capabilities"><div class="zynix-container">' +
    '<span class="zynix-tag">ARCHITECTURE</span>' +
    '<h2>Four Layers. One Integrated Platform.</h2>' +
    '<div class="zynix-arch-grid">' +
    '<div class="zynix-arch-card fade-in-up" style="border-left-color:#ccfdcf"><div class="zynix-arch-num">01</div><h3>AI Data Foundation</h3><p>Ingest, clean, normalize, and unify data from EHR systems (Epic, Cerner, athenahealth, eClinicalWorks, NextGen, Allscripts), claims feeds (837/835), ADT streams, lab results, pharmacy fills, and SDOH sources. 97%+ patient matching accuracy.</p></div>' +
    '<div class="zynix-arch-card fade-in-up" style="border-left-color:#cebffa"><div class="zynix-arch-num">02</div><h3>Intelligence & Reasoning</h3><p>ZynixLLM and proprietary clinical models power risk stratification, HCC gap detection, quality measure identification, readmission prediction, and clinical decision support. Intelligence feeds directly into agent workflows.</p></div>' +
    '<div class="zynix-arch-card fade-in-up" style="border-left-color:#fddbc8"><div class="zynix-arch-num">03</div><h3>AI Agent Suite</h3><p>Twelve specialized AI agents that take autonomous action: after-hours triage, scheduling, post-discharge outreach, medication reconciliation, prior authorization, fax processing, appointment reminders, AWV scheduling, chronic disease monitoring, and more.</p></div>' +
    '<div class="zynix-arch-card fade-in-up" style="border-left-color:#d7e9ff"><div class="zynix-arch-num">04</div><h3>Deployable Care Plans</h3><p>Pre-built, configurable care plan templates that orchestrate multiple agents into end-to-end workflows: TCM 30-day follow-through, CCM longitudinal management, AWV identification-to-completion, quality gap closure, and prior authorization sequences.</p></div>' +
    '</div></div></section>';

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">INTEGRATIONS</span>' +
    '<h2>Connects to Everything You Already Use</h2>' +
    '<div class="zynix-data-layers">' +
    '<div class="zynix-data-layer fade-in-up"><h3>EHR Systems</h3><p>Epic, Cerner (Oracle Health), athenahealth, eClinicalWorks, NextGen, Allscripts</p></div>' +
    '<div class="zynix-data-layer fade-in-up"><h3>Data Feeds</h3><p>Claims (837/835), ADT (HL7 v2), FHIR R4 APIs, Lab results (ORU), Pharmacy fill data, SDOH databases</p></div>' +
    '<div class="zynix-data-layer fade-in-up"><h3>Communication</h3><p>Voice (SIP/PSTN), SMS/MMS, Email, Patient portals, Secure messaging</p></div>' +
    '<div class="zynix-data-layer fade-in-up"><h3>Payer Systems</h3><p>Prior auth portals, Eligibility verification, Claims adjudication, Quality measure reporting</p></div>' +
    '</div></div></section>';

  html += renderMetricsBar([
    { value: '1M+', label: 'Patients Served' },
    { value: '30', label: 'States Active' },
    { value: '97%+', label: 'Patient Matching' },
    { value: 'SOC 2', label: 'Type II Certified' }
  ]);

  html += '<section id="deployment"><div class="zynix-container">' +
    '<span class="zynix-tag">DEPLOYMENT OPTIONS</span>' +
    '<h2>Healthcare AI Deployment That Meets Your Requirements</h2>' +
    '<p class="zynix-section-sub">Every healthcare organization has different data sovereignty, compliance, and infrastructure requirements. Zynix supports flexible HIPAA compliant AI deployment models \u2014 from fully managed cloud to air-gapped on-premises installations \u2014 so sensitive patient data stays exactly where your policies require.</p>' +
    '<div class="zynix-feature-grid">' +
    '<div class="zynix-feature-card fade-in-up"><div class="zynix-feature-icon">&#9729;</div><h3>Cloud-Hosted (Zynix Cloud)</h3><p>Fully managed SaaS on HIPAA-compliant infrastructure. SOC 2 Type II certified. Automatic updates, managed scaling, and 99.9% uptime SLA. The fastest path to production for healthcare AI deployment with zero infrastructure management.</p></div>' +
    '<div class="zynix-feature-card fade-in-up"><div class="zynix-feature-icon">&#128274;</div><h3>Private Cloud</h3><p>Dedicated Zynix instance deployed on AWS, Azure, or GCP within your organization\'s own VPC. Full data isolation with private cloud healthcare AI controls. Customer-managed encryption keys, network policies, and access controls. Ideal for health systems with strict data residency requirements.</p></div>' +
    '<div class="zynix-feature-card fade-in-up"><div class="zynix-feature-icon">&#127970;</div><h3>On-Premises</h3><p>Deploy ZynixLLM and all AI agents within your hospital\'s own data center. Air-gapped medical AI option available for environments with no external network connectivity. On-premises healthcare LLM deployment ensures PHI never leaves your facility. Full operational control with Zynix support.</p></div>' +
    '<div class="zynix-feature-card fade-in-up"><div class="zynix-feature-icon">&#128260;</div><h3>Hybrid</h3><p>Cloud orchestration with on-premises inference. Non-sensitive workloads run in Zynix Cloud while clinical AI inference happens locally. Sensitive patient data never leaves the facility. Combines the scalability of cloud with the data sovereignty of on-premises healthcare AI deployment.</p></div>' +
    '</div></div></section>';

  html += renderCTA('See the Platform in Action', 'Schedule a 30-minute demo to see how ZIP replaces your point-solution stack with one integrated operating system.', 'Request a Demo');
  html += renderFooter();
  return html;
}


function renderAgentsHub() {
  var html = '';

  html += renderInnerHero('AI AGENT SUITE', 'AI Agents That Don\'t Just Inform \u2014 They Act',
    'Twelve purpose-built AI agents that convert clinical intelligence into completed actions. They call patients, book appointments, reconcile medications, process faxes, submit prior authorizations, and document encounters \u2014 24/7, across every department, in 15+ languages.',
    IMG.doctor, 'Zynix AI Agents Suite');

  // Clinical Performance Agents
  html += '<section id="clinical-performance"><div class="zynix-container">' +
    '<span class="zynix-tag">CLINICAL PERFORMANCE</span>' +
    '<h2>Agents for Care Quality and Patient Outcomes</h2>' +
    '<p class="zynix-section-sub">Automate chronic care management, transitions of care, preventive screening, AWV outreach, and social determinant assessment.</p>' +
    '<div class="zynix-agents-grid">';

  var clinicalAgents = [
    { icon: '&#128138;', name: 'Chronic Care Management', desc: 'Longitudinal care automation for chronic disease populations. Risk-tiered outreach, medication adherence tracking, and care plan reinforcement across CCM billing cycles.', metrics: ['85%+ Contact Rate', 'CCM Revenue Capture'], url: '/agents/chronic-care-management' },
    { icon: '&#128222;', name: 'Transitions of Care', desc: 'Post-discharge follow-up within TCM billing windows. Medication reconciliation, symptom monitoring, follow-up scheduling, and readmission prevention.', metrics: ['85%+ Contact Rate', '25% Readmission Reduction'], url: '/agents/transitions-of-care' },
    { icon: '&#128276;', name: 'Preventive & Quality Activation', desc: 'AWV outreach, appointment reminders, vaccination scheduling, and HEDIS quality gap closure. Drive preventive care completion at population scale.', metrics: ['3x AWV Lift', '40% No-Show Reduction'], url: '/agents/preventive-quality-activation' },
    { icon: '&#127968;', name: 'SDoH Determination', desc: 'Screen patients for social determinants of health and route to community resources. Identify housing, food, transportation, and financial barriers to care.', metrics: ['Planned', 'Coming Soon'], url: '/agents/sdoh-determination' }
  ];

  clinicalAgents.forEach(function(agent) {
    html += '<div class="zynix-agent-card fade-in-up">' +
      '<div class="zynix-agent-header"><span class="zynix-agent-icon">' + agent.icon + '</span><h3>' + agent.name + '</h3></div>' +
      '<p>' + agent.desc + '</p>' +
      '<div class="zynix-agent-metrics"><span>' + agent.metrics[0] + '</span><span>' + agent.metrics[1] + '</span></div>' +
      '<p><a href="' + agent.url + '">Learn more &rarr;</a></p>' +
      '</div>';
  });

  html += '</div></div></section>';

  // Predictive Activation Agents
  html += '<section id="predictive-activation"><div class="zynix-container">' +
    '<span class="zynix-tag">PREDICTIVE ACTIVATION</span>' +
    '<h2>Agents That Act Before Events Occur</h2>' +
    '<p class="zynix-section-sub">Risk-based proactive outreach triggered by predictive models. Identify rising-risk patients, predict readmissions, and intervene before clinical deterioration.</p>' +
    '<div class="zynix-agents-grid">';

  var predictiveAgents = [
    { icon: '&#128202;', name: 'Readmission Risk Agent', desc: 'Identifies high-risk patients at the moment of discharge using predictive models validated against real outcomes. Triggers automated intervention sequences.', metrics: ['25% Readmission Reduction', 'Real-Time Scoring'] },
    { icon: '&#128200;', name: 'Rising Risk Outreach', desc: 'Monitors patient populations continuously for clinical and utilization patterns that signal escalating risk. Initiates proactive outreach before patients reach crisis.', metrics: ['Weeks of Lead Time', 'Continuous Monitoring'] },
    { icon: '&#128161;', name: 'Predictive Deterioration Monitor', desc: 'Tracks chronic disease patients for early signs of clinical deterioration using lab trends, medication adherence patterns, and encounter frequency.', metrics: ['Early Detection', 'Automated Escalation'] }
  ];

  predictiveAgents.forEach(function(agent) {
    html += '<div class="zynix-agent-card fade-in-up">' +
      '<div class="zynix-agent-header"><span class="zynix-agent-icon">' + agent.icon + '</span><h3>' + agent.name + '</h3></div>' +
      '<p>' + agent.desc + '</p>' +
      '<div class="zynix-agent-metrics"><span>' + agent.metrics[0] + '</span><span>' + agent.metrics[1] + '</span></div>' +
      '</div>';
  });

  html += '</div></div></section>';

  // Operational Efficiency Agents
  html += '<section id="operational-efficiency"><div class="zynix-container">' +
    '<span class="zynix-tag">OPERATIONAL EFFICIENCY</span>' +
    '<h2>Agents That Eliminate Administrative Burden</h2>' +
    '<p class="zynix-section-sub">Automate after-hours call handling, appointment scheduling, prior authorization, referral coordination, and fax processing.</p>' +
    '<div class="zynix-agents-grid">';

  var opsAgents = [
    { icon: '&#128161;', name: 'ZynAfterHours & Triage', desc: '24/7 AI-powered call handling that triages symptoms using Schmitt-Thompson protocols, diverts unnecessary ER visits, and schedules appropriate care. 15+ languages.', metrics: ['97.3% Accuracy', '20-30% ER Diversion'], url: '/agents/operational-efficiency/zynafterhours-triage' },
    { icon: '&#128197;', name: 'ZynSchedule', desc: 'Always-on appointment scheduling via voice, text, and web. Matches patient urgency with provider availability.', metrics: ['40% No-Show Reduction', '24/7 Availability'], url: '/agents/operational-efficiency/zynschedule' },
    { icon: '&#128203;', name: 'Prior Authorization', desc: 'Automated submission to payer portals with optimized clinical documentation. Status tracking, denial management, appeal preparation.', metrics: ['75% Time Reduction', '$20+ Saved Per Auth'] },
    { icon: '&#128268;', name: 'Referral Management', desc: 'Track referrals from order to completed visit. Confirm appointments, retrieve results, prevent leakage.', metrics: ['3x Faster Processing', '50% Less Leakage'] },
    { icon: '&#128424;', name: 'ZynFax', desc: 'AI-powered fax classification, data extraction, patient matching, and intelligent routing.', metrics: ['90%+ Classification', '75% Staff Time Saved'] }
  ];

  opsAgents.forEach(function(agent) {
    html += '<div class="zynix-agent-card fade-in-up">' +
      '<div class="zynix-agent-header"><span class="zynix-agent-icon">' + agent.icon + '</span><h3>' + agent.name + '</h3></div>' +
      '<p>' + agent.desc + '</p>' +
      '<div class="zynix-agent-metrics"><span>' + agent.metrics[0] + '</span><span>' + agent.metrics[1] + '</span></div>' +
      (agent.url ? '<p><a href="' + agent.url + '">Learn more &rarr;</a></p>' : '') +
      '</div>';
  });

  html += '</div></div></section>';

  // Agents vs Chatbots
  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">WHY AGENTS</span>' +
    '<h2>Agents Are Not Chatbots</h2>' +
    '<div class="zynix-compare-grid">' +
    '<div class="zynix-compare-card zynix-compare-bad"><h3>Chatbots Answer Questions</h3><ul><li>Traditional healthcare chatbots respond to patient queries with pre-scripted answers. They cannot access EHR data, take clinical action, or coordinate across systems.</li></ul></div>' +
    '<div class="zynix-compare-card zynix-compare-good"><h3>Agents Complete Work</h3><ul><li>Zynix AI agents access patient records, apply clinical protocols, take autonomous action, and coordinate with other agents. Full audit trails and human escalation built in.</li></ul></div>' +
    '</div></div></section>';

  html += renderCTA('See AI Agents in Action', 'Schedule a demo to see how autonomous agents handle the work that overwhelms your care teams today.', 'Request a Demo');
  html += renderFooter();
  return html;
}


function renderClinicalPerformanceHub() {
  var html = '';

  html += renderInnerHero('CLINICAL PERFORMANCE AGENTS', 'Automate the Clinical Workflows That Drive Quality Outcomes',
    'AI agents purpose-built for chronic care management, transitions of care, preventive activation, annual wellness visit outreach, and social determinant screening.',
    IMG.care, 'Clinical Performance AI Agents');

  html += '<section id="capabilities"><div class="zynix-container">' +
    '<span class="zynix-tag">AGENTS IN THIS CATEGORY</span>' +
    '<h2>Five Agents. One Clinical Mission.</h2>' +
    '<div class="zynix-agents-grid">';

  var agents = [
    { icon: '&#128138;', name: 'Chronic Care Management Agent', desc: 'Automates CCM billing workflows with longitudinal patient engagement: medication adherence tracking, risk-tiered outreach cadences, symptom monitoring, and care plan reinforcement.', url: '/agents/chronic-care-management', metrics: ['85%+ Contact Rate', 'CCM Revenue Capture'] },
    { icon: '&#128222;', name: 'Transitions of Care Agent', desc: 'Executes post-discharge follow-up within CMS TCM billing windows. Contacts patients within 24-48 hours, reviews discharge instructions, reconciles medications, schedules follow-up visits.', url: '/agents/transitions-of-care', metrics: ['85%+ Contact Rate', '25% Readmission Reduction'] },
    { icon: '&#128276;', name: 'Preventive & Quality Activation', desc: 'Drives HEDIS quality measure completion through automated patient outreach for preventive screenings, vaccinations, and quality gap closure.', url: '/agents/preventive-quality-activation', metrics: ['3x AWV Lift', '40% Gap Closure Improvement'] },
    { icon: '&#128200;', name: 'Chronic Disease Monitoring', desc: 'Continuous AI-powered monitoring for patients with diabetes, CHF, COPD, and other chronic conditions. Tracks symptom trends, lab results, and medication patterns.', url: '/agents/chronic-care-management/chronic-disease-monitoring', metrics: ['Continuous Monitoring', 'Early Escalation'] },
    { icon: '&#127968;', name: 'SDoH Determination Agent', desc: 'Screens patients for social determinants of health including housing instability, food insecurity, transportation barriers, and financial hardship.', url: '/agents/sdoh-determination', metrics: ['Planned', 'Coming Soon'] }
  ];

  agents.forEach(function(agent) {
    html += '<div class="zynix-agent-card fade-in-up">' +
      '<div class="zynix-agent-header"><span class="zynix-agent-icon">' + agent.icon + '</span><h3>' + agent.name + '</h3></div>' +
      '<p>' + agent.desc + '</p>' +
      '<div class="zynix-agent-metrics"><span>' + agent.metrics[0] + '</span><span>' + agent.metrics[1] + '</span></div>' +
      '<p><a href="' + agent.url + '">Learn more &rarr;</a></p>' +
      '</div>';
  });

  html += '</div></div></section>';

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">RELATED USE CASES</span>' +
    '<h2>See These Agents in Action</h2>' +
    '<div class="zynix-agents-grid">' +
    '<div class="zynix-agent-card fade-in-up"><div class="zynix-agent-header"><span class="zynix-agent-icon">UC01</span><h3>Post-Discharge Follow-Up at Scale</h3></div><p><a href="/use-cases/post-discharge-follow-up">View use case &rarr;</a></p></div>' +
    '<div class="zynix-agent-card fade-in-up"><div class="zynix-agent-header"><span class="zynix-agent-icon">UC10</span><h3>Chronic Care Coordination at Scale</h3></div><p><a href="/use-cases/chronic-care-coordination-scale">View use case &rarr;</a></p></div>' +
    '<div class="zynix-agent-card fade-in-up"><div class="zynix-agent-header"><span class="zynix-agent-icon">UC11</span><h3>HEDIS and Stars Quality Improvement</h3></div><p><a href="/use-cases/hedis-stars-quality-improvement">View use case &rarr;</a></p></div>' +
    '</div></div></section>';

  html += renderCTA('Automate Clinical Performance at Scale', 'See how AI agents drive quality outcomes across your entire patient population.', 'Request a Demo');
  html += renderFooter();
  return html;
}


function renderPredictiveActivationHub() {
  var html = '';

  html += renderInnerHero('PREDICTIVE ACTIVATION AGENTS', 'Intervene Before the Crisis, Not After',
    'Predictive models identify patients heading toward hospitalization, clinical deterioration, or care disengagement. Activation agents convert those predictions into proactive outreach and intervention \u2014 weeks before an event would otherwise occur.',
    IMG.analytics, 'Predictive Activation AI Agents');

  html += '<section id="capabilities"><div class="zynix-container">' +
    '<span class="zynix-tag">AGENTS IN THIS CATEGORY</span>' +
    '<h2>From Prediction to Prevention</h2>' +
    '<div class="zynix-agents-grid">';

  var agents = [
    { icon: '&#128202;', name: 'Readmission Risk Agent', desc: 'At the moment of discharge, this agent scores every patient against validated readmission risk models. High-risk patients are automatically enrolled in intensified post-discharge care plans.', metrics: ['25% Readmission Reduction', 'Real-Time Risk Scoring'] },
    { icon: '&#128200;', name: 'Rising Risk Outreach Agent', desc: 'Continuously monitors population-level data for patients whose clinical trajectory is worsening. Triggers proactive outreach to engage patients before they require acute intervention.', metrics: ['Weeks of Lead Time', 'Proactive Engagement'] },
    { icon: '&#128161;', name: 'Predictive Deterioration Monitor', desc: 'Specialized monitoring for chronic disease patients using longitudinal lab trends, vital sign patterns, and encounter frequency analysis. Detects subtle deterioration signals.', metrics: ['Early Detection', 'Automated Clinical Alerts'] }
  ];

  agents.forEach(function(agent) {
    html += '<div class="zynix-agent-card fade-in-up">' +
      '<div class="zynix-agent-header"><span class="zynix-agent-icon">' + agent.icon + '</span><h3>' + agent.name + '</h3></div>' +
      '<p>' + agent.desc + '</p>' +
      '<div class="zynix-agent-metrics"><span>' + agent.metrics[0] + '</span><span>' + agent.metrics[1] + '</span></div>' +
      '</div>';
  });

  html += '</div></div></section>';

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">HOW IT WORKS</span>' +
    '<h2>The Prediction-to-Action Pipeline</h2>' +
    '<div class="zynix-orch-flow">' +
    '<div class="zynix-orch-step fade-in-up"><span>&#11015;</span><p>Data Ingestion</p></div><div class="zynix-orch-arrow">&rarr;</div>' +
    '<div class="zynix-orch-step fade-in-up"><span>&#128202;</span><p>Risk Scoring</p></div><div class="zynix-orch-arrow">&rarr;</div>' +
    '<div class="zynix-orch-step fade-in-up"><span>&#9888;</span><p>Threshold Activation</p></div><div class="zynix-orch-arrow">&rarr;</div>' +
    '<div class="zynix-orch-step fade-in-up"><span>&#128222;</span><p>Proactive Outreach</p></div><div class="zynix-orch-arrow">&rarr;</div>' +
    '<div class="zynix-orch-step fade-in-up"><span>&#9989;</span><p>Resolution</p></div>' +
    '</div></div></section>';

  html += renderCTA('Move from Reactive to Predictive', 'See how predictive activation agents reduce readmissions and total cost of care.', 'Request a Demo');
  html += renderFooter();
  return html;
}


function renderOperationalEfficiencyHub() {
  var html = '';

  html += renderInnerHero('OPERATIONAL EFFICIENCY AGENTS', 'Automate the Administrative Work That Burns Out Your Staff',
    'AI agents that handle after-hours triage, inbound scheduling, prior authorization, referral coordination, and fax processing. They operate 24/7, integrate with your EHR, and escalate to staff only when human judgment is required.',
    IMG.enterprise, 'Operational Efficiency AI Agents');

  html += '<section id="capabilities"><div class="zynix-container">' +
    '<span class="zynix-tag">AGENTS IN THIS CATEGORY</span>' +
    '<h2>Five Agents. Zero Admin Burden.</h2>' +
    '<div class="zynix-agents-grid">';

  var agents = [
    { icon: '&#128161;', name: 'ZynAfterHours & Triage', desc: 'Answers patient calls 24/7 in 15+ languages. Applies Schmitt-Thompson triage protocols to assess symptom severity, provides self-care guidance, diverts unnecessary ER visits, and schedules appointments.', url: '/agents/operational-efficiency/zynafterhours-triage', metrics: ['97.3% Triage Accuracy', '60-80% Cost Reduction'] },
    { icon: '&#128197;', name: 'ZynSchedule', desc: 'Captures every inbound scheduling request via phone, text, or web. Matches patient urgency with real-time provider availability, books appointments, handles rescheduling and cancellations.', url: '/agents/operational-efficiency/zynschedule', metrics: ['40% No-Show Reduction', '3x Scheduling Throughput'] },
    { icon: '&#128203;', name: 'Prior Authorization Agent', desc: 'Submits prior authorization requests to payer portals with optimized clinical justification. Tracks status, manages denials, prepares appeals, and alerts before authorizations expire.', metrics: ['75% Processing Time Saved', '10-15% Higher First-Pass'] },
    { icon: '&#128268;', name: 'Referral Management Agent', desc: 'Tracks referrals from order to completed specialist visit. Confirms scheduling, retrieves results, closes the loop with referring providers, and prevents referral leakage.', metrics: ['3x Faster Processing', '50% Less Leakage'] },
    { icon: '&#128424;', name: 'ZynFax', desc: 'Reads, classifies, and routes incoming faxes using AI document understanding. Matches content to patient records, detects missing documentation, and queues items for workflows.', metrics: ['90%+ Classification Accuracy', '75% Staff Time Saved'] }
  ];

  agents.forEach(function(agent) {
    html += '<div class="zynix-agent-card fade-in-up">' +
      '<div class="zynix-agent-header"><span class="zynix-agent-icon">' + agent.icon + '</span><h3>' + agent.name + '</h3></div>' +
      '<p>' + agent.desc + '</p>' +
      '<div class="zynix-agent-metrics"><span>' + agent.metrics[0] + '</span><span>' + agent.metrics[1] + '</span></div>' +
      (agent.url ? '<p><a href="' + agent.url + '">Learn more &rarr;</a></p>' : '') +
      '</div>';
  });

  html += '</div></div></section>';

  html += renderCTA('Eliminate Administrative Overhead', 'See how operational AI agents free your staff to focus on patient care.', 'Request a Demo');
  html += renderFooter();
  return html;
}



// ═══════════════════════════════════════════════════════════════
// 6. CHRONIC CARE MANAGEMENT AGENT — /agents/chronic-care-management
// ═══════════════════════════════════════════════════════════════

function renderChronicCareAgent() {
  return renderAgentPageV7({
    agentName: 'Chronic Care Management',
    category: 'Clinical Performance',
    headline: 'Longitudinal Care Management at Population Scale',
    subhead: 'An AI agent that automates CCM workflows across chronic disease populations &mdash; medication adherence tracking, risk-tiered outreach, symptom monitoring, and care plan reinforcement throughout every billing cycle.',
    heroImage: IMG.care,
    heroAlt: 'Chronic Care Management AI Agent',
    whatHeading: 'Automated Chronic Care Coordination',
    whatBody: '<p>The Chronic Care Management Agent automates the high-volume, repetitive workflows that CCM programs require to remain clinically effective and financially viable. It identifies patients eligible for CCM services, enrolls them into risk-tiered outreach cadences, tracks medication adherence, monitors symptom trends, and reinforces individualized care plans.</p>' +
      '<p>For each patient, the agent maintains a running clinical context that includes recent lab results, medication fill history, appointment adherence, and prior interaction summaries. Every outreach contact is documented with the structured detail required for CMS CCM billing compliance, including time tracking against the 20-minute monthly threshold.</p>' +
      '<p>When a patient reports worsening symptoms, medication side effects, or barriers to adherence, the agent escalates to the appropriate clinical team member with full context. The goal is simple: keep chronic disease patients engaged, adherent, and stable between office visits.</p>',
    workflowHeading: 'From Eligibility to Ongoing Management',
    workflowSteps: [
      { title: 'Patient Identification', description: 'The data layer identifies patients with qualifying chronic conditions (2+ chronic conditions) who are eligible for CCM services but not yet enrolled or actively managed.' },
      { title: 'Enrollment & Consent', description: 'Agent initiates outreach to eligible patients, explains CCM program benefits, and captures verbal or written consent. Consent documentation is recorded in the EHR.' },
      { title: 'Risk-Tiered Outreach', description: 'Patients are stratified by clinical risk and assigned outreach cadences. High-risk patients receive weekly check-ins. Moderate-risk patients receive biweekly contact. Stable patients receive monthly touchpoints.' },
      { title: 'Medication & Symptom Monitoring', description: 'During each contact, the agent reviews medication adherence, assesses symptom changes, and checks for barriers to care. Pharmacy fill data is cross-referenced with prescribed medications.' },
      { title: 'Escalation & Documentation', description: 'Issues requiring clinical judgment are routed to care managers or providers with a complete summary. Every interaction is documented with structured time tracking for CCM billing.' }
    ],
    inputs: [
      'EHR patient demographics and problem lists',
      'Claims data for chronic condition identification',
      'Pharmacy fill data for medication adherence',
      'Lab results and vital sign trends',
      'Prior CCM interaction history',
      'Care plan goals and interventions'
    ],
    outputs: [
      'Patient outreach calls (voice) and messages (SMS/text)',
      'Structured CCM encounter documentation with time tracking',
      'Medication adherence reports',
      'Escalation alerts to clinical staff with full context',
      'CCM billing-ready documentation (99490, 99491)',
      'Monthly patient status summaries'
    ],
    integrations: [
      { system: 'EHR Systems', description: 'Epic, Cerner, athenahealth, eClinicalWorks, NextGen. Reads patient records and writes CCM documentation.' },
      { system: 'Pharmacy Data', description: 'Prescription fill data, medication history, and adherence patterns from pharmacy benefit managers.' },
      { system: 'Voice & SMS', description: 'Outbound and inbound voice calls and text messages via SIP/PSTN and SMS gateways.' }
    ],
    governanceBody: '<p>The Chronic Care Management Agent operates within defined clinical protocols. It does not make treatment decisions, adjust medications, or override provider care plans. Every clinical concern is escalated to a licensed care manager or provider.</p>',
    governancePoints: [
      { title: 'Clinical Escalation Thresholds', body: 'Configurable rules determine when patient-reported symptoms, vital sign changes, or medication issues require immediate human review versus documentation-only follow-up.' },
      { title: 'Provider Oversight', body: 'Supervising providers review agent-generated documentation and patient status summaries at configurable intervals. No CCM billing is submitted without provider attestation.' },
      { title: 'Audit Trail', body: 'Every agent interaction is logged with timestamp, content summary, clinical context used, and action taken. Full audit trail available for CMS compliance review.' }
    ],
    relatedUseCases: [
      { ucId: 'UC10', title: 'Chronic Care Coordination at Scale', url: '/use-cases/chronic-care-coordination-scale' },
      { ucId: 'UC15', title: 'Medication Adherence for Chronic Populations', url: '/use-cases/medication-adherence-chronic-populations' },
      { ucId: 'UC19', title: 'CCM Billing and Chronic Care Management', url: '/use-cases/ccm-billing-chronic-care' }
    ],
    ctaHeadline: 'Scale Chronic Care Management with AI',
    ctaSubline: 'See how the CCM agent reaches patients your staff cannot &mdash; consistently, compliantly, and at population scale.',
    ctaButton: 'Request a Demo'
  });
}


// ═══════════════════════════════════════════════════════════════
// 7. TRANSITIONS OF CARE AGENT — /agents/transitions-of-care
// ═══════════════════════════════════════════════════════════════

function renderTransitionsOfCareAgent() {
  return renderAgentPageV7({
    agentName: 'Transitions of Care',
    category: 'Clinical Performance',
    headline: 'From Discharge to Recovery, Automatically',
    subhead: 'An AI agent that contacts every discharged patient within 24-48 hours, reviews discharge instructions, reconciles medications, schedules follow-ups, and monitors for readmission red flags &mdash; all within CMS TCM billing windows.',
    heroImage: IMG.care,
    heroAlt: 'Transitions of Care AI Agent',
    whatHeading: 'Systematic Post-Discharge Follow-Through',
    whatBody: '<p>The Transitions of Care Agent automates the 30-day post-discharge workflow that determines whether a patient recovers safely or bounces back to the hospital. It processes ADT discharge feeds in real time, risk-stratifies each patient, and initiates outreach within the TCM billing window.</p>' +
      '<p>During the initial contact, the agent confirms the patient arrived home safely, reviews discharge instructions for comprehension, walks through the medication list to identify confusion or missing medications, and schedules the required 7-day or 14-day follow-up visit. If the patient reports worsening symptoms, the agent applies red-flag protocols and escalates to clinical staff immediately.</p>' +
      '<p>Throughout the 30-day post-discharge period, the agent conducts follow-up check-ins, sends appointment reminders, and monitors for signs of deterioration. Every interaction is documented with the structured detail required for TCM billing code capture (99495, 99496).</p>',
    workflowHeading: 'The 30-Day TCM Execution Sequence',
    workflowSteps: [
      { title: 'Discharge Detection', description: 'ADT feed signals a discharge event. The data layer normalizes the record, enriches it with diagnosis, medications, and prior history, and calculates a readmission risk score.' },
      { title: 'Risk Stratification', description: 'Patient is scored against validated readmission models. High-risk patients (top quintile) receive intensified outreach. The appropriate TCM care plan template is auto-deployed.' },
      { title: '24-48 Hour Contact', description: 'Agent calls the patient within the TCM billing window. Confirms safe arrival, reviews discharge instructions, walks through the medication list, and identifies any immediate concerns.' },
      { title: 'Medication Reconciliation', description: 'Agent compares discharge medication list with the patient\'s reported medications. Discrepancies are flagged and routed to pharmacy or provider review.' },
      { title: 'Follow-Up Scheduling', description: 'Agent books the 7-day or 14-day follow-up appointment with the appropriate provider. Sends confirmation and pre-visit reminders.' },
      { title: 'Ongoing Monitoring', description: 'Check-in contacts at day 7, 14, and 30. Symptom assessment, appointment confirmation, and outcome documentation. TCM billing codes captured upon completion.' }
    ],
    inputs: [
      'ADT discharge feeds (real-time)',
      'Discharge summaries and medication lists',
      'EHR patient demographics and medical history',
      'Readmission risk model scores',
      'Provider scheduling availability',
      'Pharmacy fill data'
    ],
    outputs: [
      'Patient outreach calls within TCM billing windows',
      'Discharge instruction comprehension assessments',
      'Medication reconciliation reports with discrepancies flagged',
      'Follow-up appointment bookings and confirmations',
      'TCM billing-ready documentation (99495, 99496)',
      'Escalation alerts for clinical concerns'
    ],
    integrations: [
      { system: 'ADT Feeds', description: 'Real-time HL7 v2 ADT messages from hospital systems for discharge detection and processing.' },
      { system: 'EHR Systems', description: 'Epic, Cerner, athenahealth. Reads discharge summaries, writes TCM documentation, and updates patient records.' },
      { system: 'Scheduling Systems', description: 'Integrates with provider scheduling to book follow-up appointments and check real-time availability.' }
    ],
    governanceBody: '<p>The Transitions of Care Agent follows evidence-based post-discharge protocols. It does not make clinical treatment decisions. Any patient reporting emergency symptoms is immediately directed to call 911 or present to the nearest emergency department.</p>',
    governancePoints: [
      { title: 'Red Flag Protocols', body: 'Defined symptom combinations (chest pain, shortness of breath, fever with immunosuppression, etc.) trigger immediate escalation to on-call clinical staff with full patient context.' },
      { title: 'Medication Safety Escalation', body: 'All medication discrepancies are routed to a pharmacist or prescribing provider for review before the patient is instructed to make any changes.' },
      { title: 'TCM Compliance Documentation', body: 'Every interaction is timestamped and structured for CMS TCM billing compliance. Provider attestation is required before billing submission.' }
    ],
    relatedUseCases: [
      { ucId: 'UC01', title: 'Post-Discharge Follow-Up at Scale', url: '/use-cases/post-discharge-follow-up' },
      { ucId: 'UC06', title: 'Post-Discharge TCM and Readmission Prevention', url: '/use-cases/post-discharge-tcm-readmission' },
      { ucId: 'UC30', title: 'Post-Discharge Follow-Up for High-Risk FQHC Patients', url: '/use-cases/post-discharge-followup-fqhc' }
    ],
    ctaHeadline: 'Close the Post-Discharge Gap',
    ctaSubline: 'See how the Transitions of Care Agent achieves 85%+ contact rates versus the 30-40% industry average.',
    ctaButton: 'Request a Demo'
  });
}


// ═══════════════════════════════════════════════════════════════
// 8. PREVENTIVE & QUALITY ACTIVATION — /agents/preventive-quality-activation
// ═══════════════════════════════════════════════════════════════

function renderPreventiveQualityAgent() {
  return renderAgentPageV7({
    agentName: 'Preventive & Quality Activation',
    category: 'Clinical Performance',
    headline: 'Drive Preventive Care Completion at Population Scale',
    subhead: 'AI agents that automate AWV outreach, appointment reminders, vaccination scheduling, and HEDIS quality gap closure. Identify eligible patients, initiate multi-channel outreach, schedule appointments, and confirm completion &mdash; across your entire attributed population.',
    heroImage: IMG.patient,
    heroAlt: 'Preventive and Quality Activation Agents',
    whatHeading: 'From Gap Identification to Confirmed Closure',
    whatBody: '<p>The Preventive and Quality Activation agent group identifies patients with open quality gaps, overdue preventive screenings, and upcoming Annual Wellness Visit eligibility. It then executes multi-channel outreach campaigns to schedule and confirm the appropriate services.</p>' +
      '<p>For HEDIS quality measures, the agent cross-references claims, EHR, and lab data to identify which specific measures each patient is missing. It prioritizes outreach by measure impact, patient engagement likelihood, and remaining time in the measurement year. When a patient responds, the agent books the appointment, sends preparation instructions, and follows up to confirm completion.</p>' +
      '<p>This agent group includes two specialized sub-agents: the AWV Outreach agent for Annual Wellness Visit identification and scheduling, and ZynReminder for intelligent appointment reminders and no-show reduction.</p>',
    workflowHeading: 'The Gap-to-Closure Workflow',
    workflowSteps: [
      { title: 'Gap Identification', description: 'Analytics engine identifies patients with open quality gaps, overdue preventive screenings, or AWV eligibility based on claims, EHR, and lab data analysis.' },
      { title: 'Patient Prioritization', description: 'Patients are ranked by measure impact (RAF value, quality weight), engagement probability, and remaining measurement year timeline.' },
      { title: 'Multi-Channel Outreach', description: 'Agent initiates contact via the patient\'s preferred channel (phone, SMS, email). Explains the needed service, answers questions, and offers to schedule.' },
      { title: 'Appointment Scheduling', description: 'When the patient agrees, the agent books the appointment with an appropriate provider, sends confirmation, and delivers any preparation instructions.' },
      { title: 'Completion Confirmation', description: 'After the scheduled date, the agent confirms the service was completed by checking claims and EHR data. Uncompleted services trigger follow-up outreach.' }
    ],
    inputs: [
      'Claims data with quality measure analysis',
      'EHR preventive care history and immunization records',
      'Lab results for screening measures',
      'AWV eligibility based on Medicare enrollment',
      'Patient communication preferences',
      'Provider scheduling availability'
    ],
    outputs: [
      'Patient outreach for gap closure and preventive services',
      'Appointment bookings for AWV, screenings, and vaccinations',
      'Pre-visit preparation instructions',
      'Gap closure confirmation and documentation',
      'Quality measure completion tracking and reporting',
      'Escalation of patients with barriers to care'
    ],
    integrations: [
      { system: 'EHR Systems', description: 'Epic, Cerner, athenahealth. Reads preventive care history and immunization records. Writes scheduling orders.' },
      { system: 'Claims & Quality Data', description: 'HEDIS measure gaps, HCC opportunities, and quality performance data from claims adjudication and quality reporting systems.' },
      { system: 'Communication Channels', description: 'Voice (SIP/PSTN), SMS, and email for multi-channel patient outreach and confirmation.' }
    ],
    governanceBody: '<p>The Preventive and Quality Activation agents operate within CMS quality measure specifications and evidence-based preventive care guidelines. They schedule services but do not make clinical decisions about patient eligibility or contraindications.</p>',
    governancePoints: [
      { title: 'Clinical Exclusion Handling', body: 'Patients who report contraindications or clinical reasons for declining a service are documented and excluded from further outreach for that measure. The exclusion is routed for provider confirmation.' },
      { title: 'Patient Preference Respect', body: 'Patients who decline outreach or opt out of specific communications are immediately flagged and removed from automated contact lists for the declined service.' },
      { title: 'Measure Accuracy Validation', body: 'Gap identification is validated against multiple data sources (claims, EHR, labs) before outreach is initiated to minimize false-positive outreach to patients who have already completed the service.' }
    ],
    relatedUseCases: [
      { ucId: 'UC11', title: 'HEDIS and Stars Quality Measure Improvement', url: '/use-cases/hedis-stars-quality-improvement' },
      { ucId: 'UC28', title: 'Preventive Screening Gap Closure', url: '/use-cases/preventive-screening-gap-fqhc' },
      { ucId: 'UC17', title: 'Appointment Scheduling and No-Show Reduction', url: '/use-cases/appointment-scheduling-no-show' }
    ],
    ctaHeadline: 'Close Quality Gaps Faster',
    ctaSubline: 'See how AI-driven preventive activation closes gaps 40% faster than manual outreach programs.',
    ctaButton: 'Request a Demo'
  });
}


// ═══════════════════════════════════════════════════════════════
// 9. ZYNAFTERHOURS V7 — /agents/operational-efficiency/zynafterhours-triage
// ═══════════════════════════════════════════════════════════════

function renderZynAfterHoursV7() {
  return renderAgentPageV7({
    agentName: 'ZynAfterHours & Triage',
    category: 'Operational Efficiency',
    headline: 'Your Best Nurse. Available 24/7. Speaking 15 Languages.',
    subhead: 'AI-powered after-hours call handling that triages patient symptoms using evidence-based clinical protocols, diverts unnecessary ER visits, schedules appropriate care, and documents every interaction in your EHR.',
    heroImage: IMG.doctor,
    heroAlt: 'ZynAfterHours AI Triage Agent',
    whatHeading: '24/7 Clinical Triage Without the Staffing Burden',
    whatBody: '<p>ZynAfterHours answers patient calls around the clock in 15+ languages, including Spanish, Mandarin, Vietnamese, Tagalog, and Korean. It applies Schmitt-Thompson clinical triage protocols to assess symptom severity, determine the appropriate level of care, and take immediate action &mdash; whether that means providing self-care guidance, scheduling a same-day appointment, or instructing the patient to call 911.</p>' +
      '<p>67% of after-hours calls currently go to voicemail. Patients give up and go to the ER, costing $1,500-3,000 per avoidable visit. ZynAfterHours eliminates that gap by answering every call within 60 seconds, loading the patient\'s EHR context (demographics, medical history, medications, allergies), and conducting a structured clinical assessment.</p>' +
      '<p>The agent handles 70-80% of routine inquiries autonomously. For complex cases requiring human clinical judgment, it performs a warm handoff to on-call staff with the complete assessment, EHR context, and recommended disposition.</p>',
    workflowHeading: 'From Inbound Call to Documented Outcome',
    workflowSteps: [
      { title: 'Call Received', description: 'Patient calls the practice number after hours. ZynAfterHours answers within 60 seconds, verifies identity, and loads EHR context including demographics, medical history, medications, and allergies.' },
      { title: 'Symptom Assessment', description: 'Natural language understanding captures the patient\'s symptoms. Clinical decision support algorithms (Schmitt-Thompson protocols) score urgency on a 1-5 scale based on symptom combination, severity, and patient risk factors.' },
      { title: 'Disposition Decision', description: 'Based on the clinical assessment: Level 1-2 (self-care guidance provided, follow-up recommended), Level 3 (same-day or next-day appointment scheduled), Level 4-5 (warm handoff to on-call provider or 911 instruction).' },
      { title: 'Action Taken', description: 'For scheduling dispositions, ZynAfterHours books an appointment with the appropriate provider based on urgency and availability. For self-care dispositions, it delivers evidence-based guidance and red-flag instructions.' },
      { title: 'Documentation', description: 'Structured encounter note uploaded to the EHR with ICD-10-ready documentation. Includes symptom narrative, assessment, disposition, action taken, and follow-up instructions. Escalation alerts sent to relevant staff.' },
      { title: 'Follow-Up', description: 'Patient receives follow-up messages confirming next steps. For high-concern cases, automated check-in calls are scheduled within 24 hours.' }
    ],
    inputs: [
      'Inbound patient voice calls (SIP/PSTN)',
      'EHR patient context (demographics, history, medications, allergies)',
      'Schmitt-Thompson clinical triage protocols',
      'Provider scheduling availability (real-time)',
      'Practice-specific escalation rules and on-call schedules'
    ],
    outputs: [
      'Clinical triage assessments with urgency scoring',
      'Same-day and next-day appointment bookings',
      'Self-care guidance with red-flag instructions',
      'Structured EHR encounter notes (ICD-10 ready)',
      'Escalation alerts to on-call clinical staff',
      'Patient follow-up messages and check-in calls'
    ],
    integrations: [
      { system: 'EHR Systems', description: 'Epic, Cerner, athenahealth, eClinicalWorks, NextGen. Reads patient context and writes triage encounter notes.' },
      { system: 'Telephony', description: 'SIP/PSTN integration for inbound and outbound voice calls. Supports call recording and quality monitoring.' },
      { system: 'Scheduling Systems', description: 'Real-time provider availability checking and appointment booking across practices and locations.' }
    ],
    governanceBody: '<p>ZynAfterHours operates within strict clinical safety parameters. Emergency symptoms trigger immediate escalation protocols. The agent does not provide medical diagnoses or treatment recommendations beyond evidence-based triage guidance.</p>',
    governancePoints: [
      { title: 'Emergency Escalation', body: 'The system recognizes emergency keywords and symptom combinations immediately. It connects to a live nurse or instructs the patient to call 911 within seconds. No delay. No ambiguity.' },
      { title: 'Clinical Protocol Compliance', body: 'All triage decisions follow Schmitt-Thompson protocols validated for telephone nurse triage. Protocol updates are applied across the system immediately upon release.' },
      { title: 'Quality Monitoring', body: 'Call recordings and triage decisions are available for clinical review. Configurable sampling rates for quality assurance. Triage accuracy validated at 97.3% against clinical review.' }
    ],
    relatedUseCases: [
      { ucId: 'UC02', title: 'After-Hours Patient Triage Across Multiple Sites', url: '/use-cases/after-hours-triage-multi-site' },
      { ucId: 'UC09', title: 'After-Hours Access and ED Diversion', url: '/use-cases/after-hours-ed-diversion' },
      { ucId: 'UC26', title: 'After-Hours Triage for Multilingual Populations', url: '/use-cases/after-hours-triage-multilingual-fqhc' }
    ],
    ctaHeadline: 'Never Miss Another After-Hours Call',
    ctaSubline: 'See how ZynAfterHours delivers 97.3% triage accuracy while reducing costs 60-80% versus traditional nurse lines.',
    ctaButton: 'Request a Demo'
  });
}


// ═══════════════════════════════════════════════════════════════
// 10. ZYNSCHEDULE V7 — /agents/operational-efficiency/zynschedule
// ═══════════════════════════════════════════════════════════════

function renderZynScheduleV7() {
  return renderAgentPageV7({
    agentName: 'ZynSchedule',
    category: 'Operational Efficiency',
    headline: 'Always-On Appointment Scheduling',
    subhead: 'AI-powered inbound call handling and smart scheduling that books patients 24/7, reduces no-shows by 40%, and fills every available appointment slot &mdash; without staff involvement.',
    heroImage: IMG.patient,
    heroAlt: 'ZynSchedule AI Scheduling Agent',
    whatHeading: 'Scheduling That Never Sleeps',
    whatBody: '<p>ZynSchedule captures every inbound scheduling request via phone, text, or web portal. It verifies patient identity, determines the reason for the visit, checks real-time provider availability across practices and locations, and books the optimal appointment slot based on urgency, provider preference, and patient convenience.</p>' +
      '<p>When patients call during business hours and lines are busy, ZynSchedule handles overflow. When patients call at 9 PM because that is when they have time, ZynSchedule is there. When a patient needs to reschedule, ZynSchedule finds the next best slot and sends updated confirmation without any staff intervention.</p>' +
      '<p>The agent also manages cancellation recovery: when a patient cancels, ZynSchedule immediately identifies patients on the waitlist who could fill the slot and contacts them proactively. The result is fewer empty slots, fewer no-shows, and 3x scheduling throughput compared to manual processes.</p>',
    workflowHeading: 'From Request to Confirmed Appointment',
    workflowSteps: [
      { title: 'Request Received', description: 'Patient contacts the practice via phone, text, or web. ZynSchedule verifies identity using date of birth, name, and phone number. Loads patient context from EHR.' },
      { title: 'Visit Reason Assessment', description: 'Agent determines the type of visit needed (follow-up, new patient, urgent, wellness, specialist referral) and any special requirements (interpreter, specific equipment, fasting labs).' },
      { title: 'Availability Matching', description: 'Real-time check of provider availability across all locations. Matches urgency level with scheduling rules, provider preferences, and insurance verification.' },
      { title: 'Booking Confirmation', description: 'Appointment booked in the scheduling system. Confirmation sent via the patient\'s preferred channel (text, email, voice). Pre-visit preparation instructions delivered if applicable.' },
      { title: 'Reminder Sequence', description: 'Automated reminders at 72 hours, 24 hours, and 2 hours before the appointment. Two-way communication allows patients to confirm or reschedule directly.' }
    ],
    inputs: [
      'Inbound patient requests (phone, SMS, web)',
      'EHR patient demographics and visit history',
      'Real-time provider scheduling availability',
      'Insurance eligibility verification',
      'Practice scheduling rules and preferences',
      'Waitlist and cancellation data'
    ],
    outputs: [
      'Confirmed appointment bookings in the scheduling system',
      'Patient confirmation messages (SMS, email, voice)',
      'Pre-visit preparation instructions',
      'Automated reminder sequences',
      'Cancellation recovery outreach to waitlisted patients',
      'Scheduling analytics (fill rate, no-show rate, throughput)'
    ],
    integrations: [
      { system: 'EHR/PM Systems', description: 'Epic, Cerner, athenahealth, eClinicalWorks, NextGen. Reads availability and writes appointment bookings.' },
      { system: 'Communication Channels', description: 'Voice (SIP/PSTN), SMS, email, and web portal integration for omni-channel scheduling access.' },
      { system: 'Insurance Verification', description: 'Real-time eligibility checks against payer systems to verify coverage before booking.' }
    ],
    governanceBody: '<p>ZynSchedule operates within practice-defined scheduling rules. It does not override provider availability preferences, bypass insurance requirements, or schedule services outside the scope of practice-approved appointment types.</p>',
    governancePoints: [
      { title: 'Scheduling Rules Engine', body: 'All booking decisions follow practice-configured rules including provider preferences, appointment type durations, buffer times, and new patient vs. established patient slots.' },
      { title: 'Urgent Escalation', body: 'Patients describing acute symptoms during a scheduling call are transferred to ZynAfterHours triage or directed to emergency services. Scheduling agents do not perform clinical triage.' },
      { title: 'Data Privacy', body: 'Patient identity verification follows minimum necessary principles. Scheduling data is encrypted and access-controlled per HIPAA requirements.' }
    ],
    relatedUseCases: [
      { ucId: 'UC17', title: 'Appointment Scheduling and No-Show Reduction', url: '/use-cases/appointment-scheduling-no-show' },
      { ucId: 'UC23', title: 'Patient Scheduling and Pre-Procedure Preparation', url: '/use-cases/surgical-scheduling-pre-procedure' },
      { ucId: 'UC16', title: 'After-Hours Call Handling and Patient Triage', url: '/use-cases/after-hours-call-handling-group-practices' }
    ],
    ctaHeadline: 'Fill Every Slot. Reduce Every No-Show.',
    ctaSubline: 'See how ZynSchedule delivers 3x scheduling throughput and 40% no-show reduction.',
    ctaButton: 'Request a Demo'
  });
}


// ═══════════════════════════════════════════════════════════════
// 11. ZYNREMINDER V7 — /agents/preventive-quality-activation/zynreminder
// ═══════════════════════════════════════════════════════════════

function renderZynReminderV7() {
  return renderAgentPageV7({
    agentName: 'ZynReminder',
    category: 'Clinical Performance &mdash; Preventive & Quality Activation',
    headline: 'Smart Reminders That Drive Action',
    subhead: 'Automated two-way appointment reminders that reduce no-shows by 40%, enable instant rescheduling, and keep patients engaged through their preferred communication channel.',
    heroImage: IMG.patient,
    heroAlt: 'ZynReminder AI Appointment Reminders',
    whatHeading: 'Beyond One-Way Reminder Calls',
    whatBody: '<p>ZynReminder replaces manual reminder calls and one-way notification systems with intelligent, two-way patient communication. It sends personalized reminders via voice, text, or email based on the patient\'s preferred channel and engagement history. When a patient responds that they cannot make their appointment, ZynReminder immediately offers alternative times and rebooks the slot.</p>' +
      '<p>Reminder timing is optimized by AI based on appointment type, patient behavior patterns, and historical engagement data. A specialist consultation that requires fasting labs gets different reminder timing and content than a routine follow-up. Patients who historically confirm via text receive text reminders. Patients who respond better to voice calls get voice reminders.</p>' +
      '<p>For practices with 20-30% no-show rates, ZynReminder typically reduces no-shows to 12-15% within 60 days of deployment. The financial impact of recovering those appointment slots is immediate and measurable.</p>',
    workflowHeading: 'The Reminder-to-Confirmation Sequence',
    workflowSteps: [
      { title: 'Appointment Detection', description: 'ZynReminder monitors the scheduling system for new, rescheduled, and upcoming appointments. Each appointment is tagged with type, preparation requirements, and patient communication preferences.' },
      { title: '72-Hour Reminder', description: 'First reminder sent via the patient\'s preferred channel. Includes appointment details, preparation instructions (fasting, documents to bring), and a confirmation/reschedule option.' },
      { title: '24-Hour Reminder', description: 'Second reminder with confirmation request. If the patient has not confirmed, the reminder is sent via an alternate channel (e.g., SMS if voice was sent first).' },
      { title: '2-Hour Reminder', description: 'Final reminder for confirmed patients. For patients who have not confirmed, an urgent outreach attempt is made.' },
      { title: 'Reschedule Handling', description: 'When a patient indicates they cannot attend, ZynReminder immediately offers alternative slots from the provider\'s schedule and rebooks. The vacated slot is offered to waitlisted patients.' }
    ],
    inputs: [
      'Scheduling system appointment data',
      'Patient communication preferences',
      'Patient engagement history and response patterns',
      'Appointment type and preparation requirements',
      'Provider availability for rescheduling',
      'Waitlist data for cancellation recovery'
    ],
    outputs: [
      'Multi-channel reminders (voice, SMS, email)',
      'Appointment confirmations and reschedule bookings',
      'Pre-visit preparation instructions',
      'No-show risk flags for clinical review',
      'Cancellation recovery outreach to waitlisted patients',
      'Engagement analytics (confirmation rate, response time, no-show rate)'
    ],
    integrations: [
      { system: 'Scheduling Systems', description: 'Epic, Cerner, athenahealth, eClinicalWorks. Monitors appointments and writes reschedule bookings.' },
      { system: 'Communication Channels', description: 'Voice, SMS, and email delivery with two-way response handling and conversation threading.' },
      { system: 'Analytics', description: 'Feeds no-show rate, confirmation rate, and engagement data into Zynix analytics dashboards for operational reporting.' }
    ],
    governanceBody: '<p>ZynReminder communicates appointment logistics and preparation instructions. It does not provide clinical advice, share test results, or discuss treatment plans during reminder interactions.</p>',
    governancePoints: [
      { title: 'Communication Compliance', body: 'All reminders comply with TCPA regulations for automated communications. Patients can opt out of automated reminders at any time via reply or through the practice.' },
      { title: 'Content Boundaries', body: 'Reminder messages contain only appointment logistics (date, time, location, preparation). No PHI beyond the minimum necessary for appointment identification is included in SMS or email.' },
      { title: 'Escalation Path', body: 'Patients who report symptoms or clinical concerns during a reminder interaction are transferred to ZynAfterHours triage or instructed to contact the practice clinical line.' }
    ],
    relatedUseCases: [
      { ucId: 'UC17', title: 'Appointment Scheduling and No-Show Reduction', url: '/use-cases/appointment-scheduling-no-show' },
      { ucId: 'UC11', title: 'HEDIS and Stars Quality Improvement', url: '/use-cases/hedis-stars-quality-improvement' },
      { ucId: 'UC28', title: 'Preventive Screening Gap Closure', url: '/use-cases/preventive-screening-gap-fqhc' }
    ],
    ctaHeadline: 'Cut No-Shows by 40%',
    ctaSubline: 'See how ZynReminder recovers thousands in lost appointment revenue with intelligent two-way reminders.',
    ctaButton: 'Request a Demo'
  });
}


// ═══════════════════════════════════════════════════════════════
// 12. CHRONIC DISEASE MONITORING — /agents/chronic-care-management/chronic-disease-monitoring
// ═══════════════════════════════════════════════════════════════


function renderChronicDiseaseMonitoring() {
  var html = '';

  html += renderInnerHero('CLINICAL PERFORMANCE', 'Continuous Monitoring Between Visits',
    'AI-powered chronic disease monitoring that tracks symptoms, lab trends, and medication patterns for patients with diabetes, CHF, COPD, and CKD. Detects deterioration early and routes alerts to clinical teams.',
    IMG.care, 'Chronic Disease Monitoring');

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">WHAT IT DOES</span>' +
    '<h2>Filling the Gap Between Office Visits</h2>' +
    '<p class="zynix-section-sub">Most chronic disease patients are seen 2-4 times per year. Between those visits, clinical teams have limited visibility. The Chronic Disease Monitoring agent fills that gap with periodic automated check-ins, cross-referencing patient-reported data with pharmacy fill records and lab result trends to identify early warning signals.</p>' +
    '</div></section>';

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">HOW IT WORKS</span>' +
    '<h2>Structured Check-In Workflow</h2>' +
    '<div class="zynix-orch-flow">' +
    '<div class="zynix-orch-step fade-in-up"><span>1</span><p>Patient Enrollment</p></div><div class="zynix-orch-arrow">&rarr;</div>' +
    '<div class="zynix-orch-step fade-in-up"><span>2</span><p>Automated Check-In</p></div><div class="zynix-orch-arrow">&rarr;</div>' +
    '<div class="zynix-orch-step fade-in-up"><span>3</span><p>Trend Analysis</p></div><div class="zynix-orch-arrow">&rarr;</div>' +
    '<div class="zynix-orch-step fade-in-up"><span>4</span><p>Alert or Continue</p></div>' +
    '</div></div></section>';

  html += renderCTA('Monitor Chronic Patients Continuously', 'See how continuous AI monitoring detects deterioration before it becomes a hospitalization.', 'Request a Demo');
  html += renderFooter();
  return html;
}


function renderAWVOutreach() {
  var html = '';

  html += renderInnerHero('CLINICAL PERFORMANCE', 'Annual Wellness Visits: Identified, Scheduled, Completed',
    'AI-powered identification of AWV-eligible patients, automated outreach campaigns, appointment scheduling, and completion tracking. Increase AWV completion rates by 3x compared to manual outreach programs.',
    IMG.patient, 'AWV Outreach Agent');

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">WHAT IT DOES</span>' +
    '<h2>Automated AWV Pipeline</h2>' +
    '<p class="zynix-section-sub">The AWV Outreach agent identifies Medicare patients eligible for Annual Wellness Visits who have not yet been scheduled. It cross-references enrollment data, claims history, and scheduling records to build a prioritized outreach list. Post-visit, it confirms completion and updates quality tracking dashboards.</p>' +
    '</div></section>';

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">HOW IT WORKS</span>' +
    '<h2>The AWV Outreach Sequence</h2>' +
    '<div class="zynix-orch-flow">' +
    '<div class="zynix-orch-step fade-in-up"><span>1</span><p>Eligibility ID</p></div><div class="zynix-orch-arrow">&rarr;</div>' +
    '<div class="zynix-orch-step fade-in-up"><span>2</span><p>Prioritized Outreach</p></div><div class="zynix-orch-arrow">&rarr;</div>' +
    '<div class="zynix-orch-step fade-in-up"><span>3</span><p>Scheduling</p></div><div class="zynix-orch-arrow">&rarr;</div>' +
    '<div class="zynix-orch-step fade-in-up"><span>4</span><p>Completion Tracking</p></div>' +
    '</div></div></section>';

  html += renderCTA('Triple Your AWV Completion Rate', 'See how AI-driven AWV outreach delivers 3x improvement over manual scheduling programs.', 'Request a Demo');
  html += renderFooter();
  return html;
}


function renderSDoHAgent() {
  var html = '';

  html += renderInnerHero('PLANNED CAPABILITY', 'Social Determinants of Health Screening and Navigation',
    'An AI agent that screens patients for social determinants of health \u2014 housing instability, food insecurity, transportation barriers, financial hardship, and social isolation \u2014 and routes identified needs to community resources and care navigators.',
    IMG.patients, 'SDoH Determination Agent');

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">PLANNED</span>' +
    '<h2>Addressing the Non-Clinical Drivers of Health Outcomes</h2>' +
    '<p class="zynix-section-sub">Social determinants of health account for an estimated 30-55% of health outcomes. The SDoH Determination Agent will automate validated screening instruments (PRAPARE, AHC HRSN), identify patients with unmet social needs, and connect them with community resources.</p>' +
    renderFeatureCards([
      { icon: '&#127968;', title: 'Housing & Food Security', desc: 'Screen for housing instability, food insecurity, and utility needs. Route to local assistance programs.' },
      { icon: '&#128663;', title: 'Transportation Barriers', desc: 'Identify patients who miss appointments due to transportation. Connect with ride services and community transit.' },
      { icon: '&#128176;', title: 'Financial Hardship', desc: 'Screen for inability to pay for medications, copays, or basic needs. Route to financial assistance and pharmacy discount programs.' }
    ]) +
    '</div></section>';

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">RELATED USE CASES</span>' +
    '<h2>See Related Work</h2>' +
    '<div class="zynix-agents-grid">' +
    '<div class="zynix-agent-card fade-in-up"><div class="zynix-agent-header"><span class="zynix-agent-icon">UC27</span><h3>SDoH Screening and Care Navigation</h3></div><p><a href="/use-cases/sdoh-screening-care-navigation">View use case &rarr;</a></p></div>' +
    '<div class="zynix-agent-card fade-in-up"><div class="zynix-agent-header"><span class="zynix-agent-icon">UC28</span><h3>Preventive Screening Gap Closure</h3></div><p><a href="/use-cases/preventive-screening-gap-fqhc">View use case &rarr;</a></p></div>' +
    '<div class="zynix-agent-card fade-in-up"><div class="zynix-agent-header"><span class="zynix-agent-icon">UC29</span><h3>Medication Adherence for Complex Chronic Patients</h3></div><p><a href="/use-cases/medication-adherence-complex-chronic">View use case &rarr;</a></p></div>' +
    '</div></div></section>';

  html += renderCTA('Interested in SDoH Screening?', 'Contact us to learn about our development timeline and early access program.', 'Contact Us');
  html += renderFooter();
  return html;
}


function renderZynScribeV7() {
  var html = '';

  html += renderInnerHero('AI CLINICAL DOCUMENTATION', 'Ambient AI Scribe for Healthcare',
    'Transform patient encounters into accurate, structured clinical documentation instantly. ZynScribe captures natural conversation, generates SOAP notes, suggests ICD-10 and CPT codes, and uploads directly to your EHR.',
    IMG.scribe, 'ZynScribe AI Clinical Documentation');

  html += renderProblemSection('The Documentation Crisis', [
    { icon: '&#128337;', title: '2 Hours Per 1 Hour', desc: 'Physicians spend 2 hours on documentation for every 1 hour with patients. That\'s backwards.' },
    { icon: '&#128564;', title: '16 Min Pajama Time', desc: '16 minutes of after-hours documentation every night. Burnout isn\'t a mystery \u2014 it\'s a math problem.' },
    { icon: '&#128148;', title: '63% Report Burnout', desc: 'The #1 driver of physician dissatisfaction is documentation burden. ZynScribe eliminates it.' }
  ]);

  html += '<section id="capabilities"><div class="zynix-container">' +
    '<span class="zynix-tag">HOW IT WORKS</span>' +
    '<h2>From Conversation to Completed Note</h2>' +
    '<div class="zynix-orch-flow">' +
    '<div class="zynix-orch-step fade-in-up"><span>&#127908;</span><p>Ambient Capture</p></div><div class="zynix-orch-arrow">&rarr;</div>' +
    '<div class="zynix-orch-step fade-in-up"><span>&#128101;</span><p>Speaker Recognition</p></div><div class="zynix-orch-arrow">&rarr;</div>' +
    '<div class="zynix-orch-step fade-in-up"><span>&#128196;</span><p>Note Generation</p></div><div class="zynix-orch-arrow">&rarr;</div>' +
    '<div class="zynix-orch-step fade-in-up"><span>&#128300;</span><p>Code Suggestions</p></div><div class="zynix-orch-arrow">&rarr;</div>' +
    '<div class="zynix-orch-step fade-in-up"><span>&#9989;</span><p>Review & Upload</p></div>' +
    '</div></div></section>';

  html += renderMetricsBar([
    { value: '15K+', label: 'Notes Processed' },
    { value: '40%', label: 'Time Savings' },
    { value: '97%', label: 'Accuracy Rate' },
    { value: '90+', label: 'Specialties Supported' }
  ]);

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">INTEGRATIONS</span>' +
    '<h2>Where It Connects</h2>' +
    renderFeatureCards([
      { icon: '&#9881;', title: 'EHR Systems', desc: 'Direct upload to Epic, Cerner, athenahealth, eClinicalWorks, and NextGen with one-click physician review.' },
      { icon: '&#128176;', title: 'Billing & Coding', desc: 'ICD-10 and CPT code suggestions feed into billing workflows. Revenue cycle integration for claim optimization.' },
      { icon: '&#128268;', title: 'Zynix Platform', desc: 'Notes generated by ZynScribe feed into the Zynix data layer, enabling AI agents and analytics to leverage encounter documentation.' }
    ]) +
    '</div></section>';

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">GOVERNANCE</span>' +
    '<h2>Physician Control at Every Step</h2>' +
    '<p class="zynix-section-sub">ZynScribe generates notes. Physicians approve them. No note is uploaded to the EHR or used for billing without explicit physician review and approval.</p>' +
    '<div class="zynix-problem-grid">' +
    '<div class="zynix-problem-card fade-in-up"><div class="zynix-problem-icon">&#128737;</div><h3>Physician Review Required</h3><p>Every generated note must be reviewed and approved by the clinician before upload.</p></div>' +
    '<div class="zynix-problem-card fade-in-up"><div class="zynix-problem-icon">&#128274;</div><h3>HIPAA Compliant</h3><p>Audio processing and note generation comply with HIPAA. All data encrypted in transit and at rest. SOC 2 Type II certified.</p></div>' +
    '<div class="zynix-problem-card fade-in-up"><div class="zynix-problem-icon">&#128203;</div><h3>Audit Trail</h3><p>Complete record of original transcription, generated note, physician edits, and final approved version.</p></div>' +
    '</div></div></section>';

  html += renderCTA('Reclaim Your Time', 'See how ZynScribe saves physicians 1-2 hours daily with ambient AI documentation.', 'Request a Demo');
  html += renderFooter();
  return html;
}


function renderCarePlansV7() {
  var html = '';

  html += renderInnerHero('CARE ORCHESTRATION', 'Stop Managing Care. Start Deploying It.',
    'Pre-built, configurable care plan templates that orchestrate multiple AI agents into end-to-end workflows. Deploy TCM, CCM, AWV, gap closure, and prior authorization care plans in days. Reach 85%+ of patients.',
    IMG.care, 'Zynix Deployable Care Plans');

  html += renderProblemSection('Your Staff Cannot Scale to Your Population', [
    { icon: '&#128202;', title: '50,000 Attributed Patients', desc: 'A typical large ACO or MA plan has 50,000 attributed patients requiring active outreach and coordination.' },
    { icon: '&#128100;', title: 'Manual Reaches 30-40%', desc: 'Manual care management reaches 30-40% of eligible patients. The rest fall through the cracks.' },
    { icon: '&#128176;', title: 'Missed Revenue', desc: 'Missed TCM billing windows, open quality gaps, and preventable readmissions are the result.' }
  ]);

  html += '<section id="capabilities"><div class="zynix-container">' +
    '<span class="zynix-tag">10 PRE-BUILT TEMPLATES</span>' +
    '<h2>Care Plans Ready to Deploy</h2>' +
    '<p class="zynix-section-sub">Each template orchestrates multiple AI agents into coordinated workflows. Configurable to your population, protocols, and operational requirements.</p>' +
    '<div class="zynix-careplan-grid">';

  var carePlans = [
    { num: '01', title: 'Hospital Discharge (TCM)', desc: '30-day post-discharge follow-through with TCM billing capture.' },
    { num: '02', title: 'Quality & HCC Gap Closure', desc: 'Identification and closure of HEDIS, Stars, and HCC documentation gaps.' },
    { num: '03', title: 'Prior Authorization', desc: 'Submission, tracking, denial management, and appeal preparation.' },
    { num: '04', title: '24/7 Scheduling', desc: 'After-hours and weekend scheduling with triage integration.' },
    { num: '05', title: 'Post-Medication Monitoring', desc: '30-day monitoring after medication changes.' },
    { num: '06', title: 'Specialist Referral Management', desc: 'Track referrals from order to completed visit.' },
    { num: '07', title: 'Abnormal Lab/Imaging Alerts', desc: 'Flag critical results, contact patient, escalate to provider.' },
    { num: '08', title: 'Preventive Care & Screenings', desc: 'Cancer screenings, immunizations, wellness visits.' },
    { num: '09', title: 'ED Diversion', desc: 'Identify high-utilizers, offer alternatives, schedule PCP visits.' },
    { num: '10', title: 'Chronic Condition Pre-Visit', desc: 'Pre-visit preparation for diabetes, CHF, COPD.' }
  ];

  carePlans.forEach(function(cp) {
    html += '<div class="zynix-careplan-card fade-in-up"><div class="zynix-cp-num">' + cp.num + '</div><div><h4>' + cp.title + '</h4><p>' + cp.desc + '</p></div></div>';
  });

  html += '</div></div></section>';

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">TCM WORKFLOW EXAMPLE</span>' +
    '<h2>See How a Care Plan Executes</h2>' +
    '<div class="zynix-orch-flow">' +
    '<div class="zynix-orch-step fade-in-up"><span>0</span><p>Day 0: Discharge</p></div><div class="zynix-orch-arrow">&rarr;</div>' +
    '<div class="zynix-orch-step fade-in-up"><span>1</span><p>Day 1: Outreach</p></div><div class="zynix-orch-arrow">&rarr;</div>' +
    '<div class="zynix-orch-step fade-in-up"><span>4</span><p>Day 4: Reminder</p></div><div class="zynix-orch-arrow">&rarr;</div>' +
    '<div class="zynix-orch-step fade-in-up"><span>7</span><p>Day 7: Visit</p></div><div class="zynix-orch-arrow">&rarr;</div>' +
    '<div class="zynix-orch-step fade-in-up"><span>30</span><p>Day 30: Outcome</p></div>' +
    '</div></div></section>';

  html += renderMetricsBar([
    { value: '85%', label: 'Patient Contact Rate' },
    { value: '3x', label: 'vs Traditional Models' },
    { value: '60%', label: 'Coordinator Time Saved' },
    { value: '40%', label: 'Readmission Reduction' }
  ]);

  html += renderCTA('Deploy Care Plans at Scale', 'Stop managing care manually. Deploy intelligent orchestration that reaches every patient who needs follow-through.', 'Request a Demo');
  html += renderFooter();
  return html;
}


function renderDataAnalyticsV7() {
  var html = '';

  html += renderInnerHero('DATA INTELLIGENCE', 'Intelligence That Drives Action',
    'AI-powered population health analytics that go beyond dashboards. Identify HCC opportunities, predict readmission risk, close quality gaps, and support clinical decisions \u2014 all in real time, all connected to agents that take action on findings.',
    IMG.analytics, 'Zynix Data Analytics');

  html += renderProblemSection('Why Traditional Analytics Fall Short', [
    { icon: '&#128337;', title: 'Stale Data', desc: 'Most healthcare analytics are 3-6 months old. You\'re always analyzing yesterday\'s problems.' },
    { icon: '&#128566;', title: 'Analysis Paralysis', desc: 'Too many dashboards, too much data, no clarity. Teams spend weeks interpreting instead of acting.' },
    { icon: '&#128268;', title: 'Fragmented Insights', desc: 'Risk scores live in silos. Quality gaps aren\'t connected to HCC opportunities. Everything stays disconnected.' }
  ]);

  html += '<section id="capabilities"><div class="zynix-container">' +
    '<span class="zynix-tag">THREE ANALYTICS TRACKS</span>' +
    '<h2>Analytics That Actually Move the Needle</h2>' +
    '<div class="zynix-track fade-in-up"><div class="zynix-track-header"><span class="zynix-track-num">01</span><h3>HCC & Quality Analytics</h3></div><div class="zynix-track-body"><ul><li>Identify all HCC opportunities with clinical documentation analysis</li><li>Flag quality measures with actionable closure recommendations</li><li>Rank by RAF impact, closure probability, and optimal timing</li><li>Trigger gap closure workflows automatically</li></ul></div></div>' +
    '<div class="zynix-track fade-in-up"><div class="zynix-track-header"><span class="zynix-track-num">02</span><h3>Risk & Readmission Prediction</h3></div><div class="zynix-track-body"><ul><li>Predict hospitalizations weeks in advance for early intervention</li><li>Identify high-risk patients at the moment of discharge</li><li>Industry-leading models validated against real outcomes</li></ul></div></div>' +
    '<div class="zynix-track fade-in-up"><div class="zynix-track-header"><span class="zynix-track-num">03</span><h3>Clinical Decision Support</h3></div><div class="zynix-track-body"><ul><li>Immediate alerts at point of care for critical decisions</li><li>Guideline-aligned treatment recommendations in context</li><li>Real-time allergy and contraindication warnings</li></ul></div></div>' +
    '</div></section>';

  html += renderMetricsBar([
    { value: '30%', label: 'HCC Gap Closure Improvement' },
    { value: '25%', label: 'Readmission Reduction' },
    { value: 'Real-time', label: 'Analytics Processing' },
    { value: '100+', label: 'Quality Measures Tracked' }
  ]);

  html += '<section class="zynix-screenshot-section"><div class="zynix-container">' +
    '<span class="zynix-tag">THE PLATFORM</span>' +
    '<h2>See the Zynix Portal in Action</h2>' +
    '<p class="zynix-section-sub">Real product screenshots from the Zynix analytics and quality dashboards.</p>' +
    '<div class="zynix-screenshot-gallery">' +
    '<div class="zynix-screenshot-card fade-in-up"><img src="' + IMG.portalQuality + '" alt="Quality Dashboard"><div class="caption">Provider Quality Dashboard</div></div>' +
    '<div class="zynix-screenshot-card fade-in-up"><img src="' + IMG.portalPredictive + '" alt="Predictive Analytics"><div class="caption">Predictive Analytics & Risk</div></div>' +
    '<div class="zynix-screenshot-card fade-in-up"><img src="' + IMG.portalACOQuality + '" alt="ACO Quality Dashboard"><div class="caption">ACO Quality Performance</div></div>' +
    '</div></div></section>';

  html += '<section><div class="zynix-container">' +
    '<span class="zynix-tag">DATA SOURCES</span>' +
    '<h2>Unified Data From Every Source</h2>' +
    '<div class="zynix-data-layers">' +
    '<div class="zynix-data-layer fade-in-up"><h3>EHR Systems</h3><p>Epic, Cerner, athenahealth, eClinicalWorks, NextGen, Allscripts. Clinical data, encounters, orders, and documentation.</p></div>' +
    '<div class="zynix-data-layer fade-in-up"><h3>Claims & Financial</h3><p>837/835 claims, eligibility, enrollment, and attribution data. RAF scoring and financial performance analytics.</p></div>' +
    '<div class="zynix-data-layer fade-in-up"><h3>Clinical Data Feeds</h3><p>ADT streams, lab results (ORU), pharmacy fill data, SDOH sources, and scheduling system data. Real-time processing.</p></div>' +
    '<div class="zynix-data-layer fade-in-up"><h3>Quality & Compliance</h3><p>HEDIS measure tracking, Stars performance data, HCC documentation analysis, and compliance reporting.</p></div>' +
    '</div></div></section>';

  html += renderCTA('Turn Analytics Into Action', 'See how Zynix Data Analytics drives measurable outcomes with intelligence connected to autonomous agents.', 'Request a Demo');
  html += renderFooter();
  return html;
}



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
    '/case-studies/palm-beach-aco': renderCaseStudyPalmBeach,
    // V7: Platform
    '/platform': renderPlatformHub,
    '/solutions/zynix-data-analytics': renderDataAnalyticsV7,
    // V7: AI Agents
    '/agents': renderAgentsHub,
    '/agents/clinical-performance': renderClinicalPerformanceHub,
    '/agents/chronic-care-management': renderChronicCareAgent,
    '/agents/chronic-care-management/chronic-disease-monitoring': renderChronicDiseaseMonitoring,
    '/agents/transitions-of-care': renderTransitionsOfCareAgent,
    '/agents/preventive-quality-activation': renderPreventiveQualityAgent,
    '/agents/preventive-quality-activation/awv-outreach': renderAWVOutreach,
    '/agents/preventive-quality-activation/zynreminder': renderZynReminderV7,
    '/agents/sdoh-determination': renderSDoHAgent,
    '/agents/predictive-activation': renderPredictiveActivationHub,
    '/agents/operational-efficiency': renderOperationalEfficiencyHub,
    '/agents/operational-efficiency/zynafterhours-triage': renderZynAfterHoursV7,
    '/agents/operational-efficiency/zynschedule': renderZynScheduleV7,
    // V7: Standalone Products
    '/zynscribe': renderZynScribeV7,
    '/care-plans': renderCarePlansV7,
    // V7: Whom We Serve
    '/who-we-serve/health-systems': renderWhoWeServeHealthSystems,
    '/who-we-serve/acos-msos': renderWhoWeServeACOs,
    '/who-we-serve/health-plans': renderWhoWeServeHealthPlans,
    '/who-we-serve/independent-group-practices': renderWhoWeServeIndependentPractices,
    '/who-we-serve/ascs': renderWhoWeServeASCs,
    '/who-we-serve/fqhcs': renderWhoWeServeFQHCs,
    // V7: Company
    '/company/zynixllm': renderZynixLLMV7,
    '/security': renderSecurityV7,
    '/press': renderPressV7,
    '/newsroom': renderPressV7,
    '/careers': renderCareers,
    // V7: Resources (new URLs)
    '/resources/blog': renderBlog,
    '/resources/blog/1m-patients': renderBlog1MPatients,
    '/resources/blog/what-is-value-based-care-ai': renderBlogVBCAI,
    '/resources/blog/how-ai-closes-care-gaps': renderBlogCareGaps,
    '/resources/blog/ai-agents-vs-chatbots-healthcare': renderBlogAgentsVsChatbots,
    '/resources/faq': renderFAQ,
    '/resources/glossary': renderGlossary,
    '/resources/webinars': renderWebinars,
    '/resources/whitepapers': renderWhitepapers,
    '/case-studies/pbaco': renderCaseStudyPalmBeach,
    // V7: Use Cases (all 30)
    '/use-cases/post-discharge-follow-up': USE_CASE_ROUTES['/use-cases/post-discharge-follow-up'],
    '/use-cases/after-hours-triage-multi-site': USE_CASE_ROUTES['/use-cases/after-hours-triage-multi-site'],
    '/use-cases/hcc-gap-closure-health-system-aco': USE_CASE_ROUTES['/use-cases/hcc-gap-closure-health-system-aco'],
    '/use-cases/prior-auth-high-volume-specialty': USE_CASE_ROUTES['/use-cases/prior-auth-high-volume-specialty'],
    '/use-cases/physician-documentation-ambient-ai': USE_CASE_ROUTES['/use-cases/physician-documentation-ambient-ai'],
    '/use-cases/post-discharge-tcm-readmission': USE_CASE_ROUTES['/use-cases/post-discharge-tcm-readmission'],
    '/use-cases/hcc-gap-raf-optimization': USE_CASE_ROUTES['/use-cases/hcc-gap-raf-optimization'],
    '/use-cases/rising-risk-patient-outreach': USE_CASE_ROUTES['/use-cases/rising-risk-patient-outreach'],
    '/use-cases/after-hours-ed-diversion': USE_CASE_ROUTES['/use-cases/after-hours-ed-diversion'],
    '/use-cases/chronic-care-coordination-scale': USE_CASE_ROUTES['/use-cases/chronic-care-coordination-scale'],
    '/use-cases/hedis-stars-quality-improvement': USE_CASE_ROUTES['/use-cases/hedis-stars-quality-improvement'],
    '/use-cases/hcc-risk-adjustment-ma': USE_CASE_ROUTES['/use-cases/hcc-risk-adjustment-ma'],
    '/use-cases/high-utilizer-member-management': USE_CASE_ROUTES['/use-cases/high-utilizer-member-management'],
    '/use-cases/post-discharge-ma-members': USE_CASE_ROUTES['/use-cases/post-discharge-ma-members'],
    '/use-cases/medication-adherence-chronic-populations': USE_CASE_ROUTES['/use-cases/medication-adherence-chronic-populations'],
    '/use-cases/after-hours-call-handling-group-practices': USE_CASE_ROUTES['/use-cases/after-hours-call-handling-group-practices'],
    '/use-cases/appointment-scheduling-no-show': USE_CASE_ROUTES['/use-cases/appointment-scheduling-no-show'],
    '/use-cases/prior-auth-workflow-management': USE_CASE_ROUTES['/use-cases/prior-auth-workflow-management'],
    '/use-cases/ccm-billing-chronic-care': USE_CASE_ROUTES['/use-cases/ccm-billing-chronic-care'],
    '/use-cases/referral-coordination-leakage': USE_CASE_ROUTES['/use-cases/referral-coordination-leakage'],
    '/use-cases/prior-auth-surgical-procedures': USE_CASE_ROUTES['/use-cases/prior-auth-surgical-procedures'],
    '/use-cases/referral-intake-asc': USE_CASE_ROUTES['/use-cases/referral-intake-asc'],
    '/use-cases/surgical-scheduling-pre-procedure': USE_CASE_ROUTES['/use-cases/surgical-scheduling-pre-procedure'],
    '/use-cases/post-procedure-followup-complication': USE_CASE_ROUTES['/use-cases/post-procedure-followup-complication'],
    '/use-cases/fax-inbound-document-routing': USE_CASE_ROUTES['/use-cases/fax-inbound-document-routing'],
    '/use-cases/after-hours-triage-multilingual-fqhc': USE_CASE_ROUTES['/use-cases/after-hours-triage-multilingual-fqhc'],
    '/use-cases/sdoh-screening-care-navigation': USE_CASE_ROUTES['/use-cases/sdoh-screening-care-navigation'],
    '/use-cases/preventive-screening-gap-fqhc': USE_CASE_ROUTES['/use-cases/preventive-screening-gap-fqhc'],
    '/use-cases/medication-adherence-complex-chronic': USE_CASE_ROUTES['/use-cases/medication-adherence-complex-chronic'],
    '/use-cases/post-discharge-followup-fqhc': USE_CASE_ROUTES['/use-cases/post-discharge-followup-fqhc']
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
        '<a href="/platform" class="zynix-btn-outline" style="text-decoration:none">Explore Platform</a>' +
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
