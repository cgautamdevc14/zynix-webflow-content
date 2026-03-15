/**
 * Zynix AI — Full Website Rebuild v2
 * Mega menu, 41 pages, full content from docs, Calendly CTAs.
 * Loaded externally from Webflow Footer custom code.
 */
(function() {
  'use strict';

  var CALENDLY = 'https://calendly.com/david-zynix-ai-calendar/30min';

  // ── Image URLs ──
  var IMG = {
    hero: 'https://files.catbox.moe/l8lgb8.png',
    doctor: 'https://files.catbox.moe/faluo2.png',
    patient: 'https://files.catbox.moe/xg6g4w.png',
    analytics: 'https://files.catbox.moe/ko2qst.png',
    data: 'https://files.catbox.moe/rhb9oc.png',
    care: 'https://files.catbox.moe/39uax4.png',
    scribe: 'https://files.catbox.moe/eo8r75.png',
    patients: 'https://files.catbox.moe/l10936.png',
    enterprise: 'https://files.catbox.moe/93ecaf.png',
    mesh: 'https://files.catbox.moe/vo5biu.png',
    logo: 'https://files.catbox.moe/d7rq25.png',
    logoWhite: 'https://files.catbox.moe/hthre9.png',
    symbol: 'https://files.catbox.moe/qw9hwf.png',
    // Portal Screenshots
    portalACO: 'https://files.catbox.moe/ymjdj1.png',
    portalProvider: 'https://files.catbox.moe/sem2y4.png',
    portalChatbot: 'https://files.catbox.moe/mbj7sl.png',
    portalPredictive: 'https://files.catbox.moe/ey06uy.png',
    portalQuality: 'https://files.catbox.moe/3f5hx5.png',
    portalACOQuality: 'https://files.catbox.moe/9aqd5n.png',
    portalACORisk: 'https://files.catbox.moe/64syr8.png'
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
    '': { title: 'Zynix AI | The AI Operating System for Value-Based Healthcare', desc: 'Zynix unifies data, analytics, and AI agents into one platform\u2014purpose-built for value-based healthcare. 1 million VBC patients onboarded. Trusted by 16+ healthcare organizations across Florida.', img: IMG.hero, schema: 'Organization' },
    '/products-zynix-os': { title: 'Zynix OS | AI Operating System for Healthcare', desc: 'The integrated AI platform where agents work together to deliver measurable patient and financial outcomes. Serving 1M+ VBC patients across Florida ACOs and health systems.', img: IMG.enterprise, schema: 'Product' },
    '/products-data-platform': { title: 'Zynix Data Platform | Unified Healthcare Data Layer', desc: 'Ingest, clean, and normalize data from every clinical and administrative source. Real-time ADT processing, 97%+ patient matching. Trusted by Florida healthcare organizations.', img: IMG.data, schema: 'Product' },
    '/products-analytics': { title: 'Zynix Analytics | Population Health Intelligence', desc: 'AI-powered analytics for HCC gap closure, risk prediction, and clinical decision support. 40% improvement in gap closure rates. Deployed across Florida ACOs.', img: IMG.analytics, schema: 'Product' },
    '/products-ai-agents': { title: 'Zynix AI Agents | 7 Specialized Healthcare Agents', desc: 'AI agents for outreach, scheduling, triage, documentation, reminders, prior auth, and fax processing. 1M+ patient interactions handled across Florida.', img: IMG.doctor, schema: 'Product' },
    '/products-zynscribe': { title: 'ZynScribe | AI Clinical Documentation', desc: 'Ambient AI documentation that captures structured clinical notes in real-time. Reduce documentation burden by 70%. Serving physicians across Florida health systems.', img: IMG.scribe, schema: 'Product' },
    '/products-care-plans': { title: 'Zynix Care Plans | Orchestrated AI Workflows', desc: 'Deployable care plans for TCM, CCM, AWV, HEDIS, and HCC closure\u2014executed by AI agents. 85%+ TCM contact rates. Deployed by Florida ACOs.', img: IMG.care, schema: 'Product' },
    '/company-zynixllm': { title: 'ZynixLLM | Purpose-Built Healthcare Language Model', desc: 'Healthcare-native language model powering the Zynix platform. Lower hallucination rates than general-purpose models. Gets smarter with every patient interaction.', img: IMG.mesh, schema: 'Product' },
    '/products-ai-agents-zynafterhours': { title: 'ZynAfterHours | 24/7 AI Triage & After-Hours Call Agent', desc: 'AI-powered patient triage handling inbound calls 24/7 in 15+ languages. 97.3% triage accuracy, 20-30% ER diversion. Trusted by Florida healthcare organizations.', img: IMG.doctor, schema: 'Product' },
    '/products-ai-agents-zynschedule': { title: 'ZynSchedule | AI Appointment Scheduling Agent', desc: 'Always-on scheduling that captures every slot, reduces no-shows, and books appointments 24/7. Deployed across Florida practices and ACOs.', img: IMG.patient, schema: 'Product' },
    '/products-ai-agents-post-discharge': { title: 'Post-Discharge Follow-Up Agent | Zynix AI', desc: 'Automated post-discharge outreach for TCM workflows. 85%+ contact rates vs. 30-40% industry average. Used by Florida ACOs and health systems.', img: IMG.care, schema: 'Product' },
    '/products-ai-agents-med-rec': { title: 'Medication Reconciliation Agent | Zynix AI', desc: 'AI-powered medication reconciliation for discharge and high-risk transitions. Identify discrepancies, capture confirmations, route issues for follow-up.', img: IMG.care, schema: 'Product' },
    '/products-ai-agents-zynreminder': { title: 'ZynReminder | AI Appointment Reminder Agent', desc: 'Reduce no-shows by 40% with personalized reminders and patient confirmation workflows. Serving Florida practices and community health centers.', img: IMG.patient, schema: 'Product' },
    '/products-ai-agents-zynfax': { title: 'ZynFax | AI Fax Processing Agent', desc: 'Intelligent fax classification, data extraction, and routing for healthcare. Eliminate manual fax processing. Deployed by Florida health systems.', img: IMG.enterprise, schema: 'Product' },
    '/products-ai-agents-zynauth': { title: 'ZynAuth | AI Prior Authorization Agent', desc: 'Streamline prior auth with AI-powered submission, tracking, and follow-up. Reduce auth turnaround by 60%. Used by ASCs and health systems in Florida.', img: IMG.enterprise, schema: 'Product' },
    '/solutions-acos': { title: 'Zynix for ACOs & MSOs | Hit Shared Savings with AI', desc: 'Maximize AWV completion, achieve 85% TCM contact rates, and close HCC gaps. Trusted by Palm Beach ACO, West Florida ACO, Space Coast ACO, and 7+ Florida ACOs.', img: IMG.care, schema: 'Product' },
    '/solutions-health-systems': { title: 'Zynix for Health Systems | Reduce Readmissions with AI', desc: 'Unified patient engagement, post-discharge coordination, and documentation at scale. Serving Health Vision Institute, CLSCFL, and Florida health networks.', img: IMG.enterprise, schema: 'Product' },
    '/solutions-health-plans': { title: 'Zynix for Health Plans | Improve Stars & Close Gaps', desc: 'Stars ratings improvement, HCC gap closure, member engagement at scale. Trusted by eTernal Health and value-based payers across Florida.', img: IMG.analytics, schema: 'Product' },
    '/solutions-fqhcs': { title: 'Zynix for FQHCs | Multilingual AI for Community Health', desc: 'Multilingual AI for underserved populations, quality payments maximization, care management at scale. Serving AMISTAD CHC and Florida community health centers.', img: IMG.patients, schema: 'Product' },
    '/solutions-independent-practices': { title: 'Zynix for Independent Practices | Reduce No-Shows & Burnout', desc: 'After-hours coverage, appointment scheduling, no-show reduction, documentation savings. Serving Cardio & Vascular Consultants, Professional Radiology Group, and Florida practices.', img: IMG.doctor, schema: 'Product' },
    '/solutions-ascs': { title: 'Zynix for ASCs | Prior Auth & Patient Coordination', desc: 'Prior authorization automation, surgical cancellation reduction, pre-op/post-op coordination. Serving Pain Rehab Surgery Center and Florida ASCs.', img: IMG.enterprise, schema: 'Product' },
    '/solutions-use-case-tcm': { title: 'Transitional Care Management (TCM) | AI-Powered Workflow', desc: 'Automate the 30-day post-discharge TCM workflow. 85%+ contact rates vs. 30-40% industry average. Deployed by Florida ACOs and health systems.', img: IMG.care, schema: 'Product' },
    '/solutions-use-case-gap-closure': { title: 'HCC & Quality Gap Closure | AI-Prioritized Worklists', desc: 'Close HCC and quality gaps 40% faster with AI-prioritized worklists and automated outreach. Deployed across Florida ACOs and health plans.', img: IMG.analytics, schema: 'Product' },
    '/solutions-use-case-after-hours': { title: 'After-Hours Triage & Access | AI Call Handling', desc: '24/7 AI after-hours call handling with intelligent triage. 97.3% accuracy, 20-30% ER diversion rate. Serving Florida practices and FQHCs.', img: IMG.doctor, schema: 'Product' },
    '/solutions-use-case-prior-auth': { title: 'Prior Authorization Automation | AI Workflow', desc: 'Reduce prior auth turnaround by 60% with AI-powered submission, tracking, and approval workflows. Used by Florida ASCs and health systems.', img: IMG.enterprise, schema: 'Product' },
    '/solutions-use-case-preventive-screening': { title: 'Preventive Screening Completion | AI Outreach', desc: 'Increase preventive screening completion with targeted outreach and scheduling. Deployed by Florida FQHCs, ACOs, and health plans.', img: IMG.patients, schema: 'Product' },
    '/solutions-use-case-readmission-prevention': { title: 'Readmission Prevention | AI Post-Discharge Intervention', desc: 'Reduce hospital readmissions with AI-driven risk stratification and automated post-discharge intervention. 25% reduction in avoidable readmissions.', img: IMG.care, schema: 'Product' },
    '/company-about': { title: 'About Zynix AI | Healthcare AI Built in Florida', desc: 'Purpose-built AI for value-based care. 1 million VBC patients onboarded. Headquartered in Trinity, FL. Serving ACOs, health systems, health plans, and FQHCs.', img: IMG.patients, schema: 'MedicalBusiness' },
    '/company-careers': { title: 'Careers at Zynix AI | Join the Healthcare AI Revolution', desc: 'Join the team building healthcare\u2019s AI operating system. Engineering, clinical, and operations roles in Trinity, FL and remote.', img: IMG.hero, schema: 'Organization' },
    '/company-press': { title: 'Press & News | Zynix AI', desc: 'Latest news, press releases, and media coverage about Zynix AI\u2014the operating system for value-based healthcare.', img: IMG.hero, schema: 'Organization' },
    '/company-trust-center': { title: 'Trust Center | Zynix AI Security & Compliance', desc: 'HIPAA compliant, SOC 2 Type II, HITRUST ready. Learn about Zynix AI\u2019s security practices, data governance, and compliance certifications.', img: IMG.enterprise, schema: 'Organization' },
    '/contact': { title: 'Contact Zynix AI | Request a Demo', desc: 'Schedule a 30-minute demo with the Zynix AI team. See how AI can transform your healthcare operations. Based in Trinity, FL.', img: IMG.hero, schema: 'MedicalBusiness' },
    '/resources-faq': { title: 'FAQ | Zynix AI Healthcare Platform', desc: 'Answers to common questions about Zynix AI implementation, HIPAA compliance, EHR integration, pricing, and support for healthcare organizations.', img: IMG.hero, schema: 'FAQPage' },
    '/resources-blog': { title: 'Blog | Zynix AI Healthcare Insights', desc: 'Insights on healthcare AI, value-based care, population health, and operational transformation from the Zynix AI team.', img: IMG.hero, schema: 'Organization' },
    '/resources-case-studies': { title: 'Case Studies | Zynix AI Customer Results', desc: 'See how Florida ACOs, health systems, and practices use Zynix AI to improve outcomes. 1M+ VBC patients served.', img: IMG.care, schema: 'Organization' },
    '/resources-glossary': { title: 'Healthcare AI Glossary | Zynix AI', desc: 'Comprehensive glossary of healthcare AI, value-based care, interoperability, coding, claims, and compliance terminology.', img: IMG.hero, schema: 'Organization' },
    '/resources-webinars': { title: 'Webinars & Events | Zynix AI', desc: 'Upcoming and on-demand webinars on healthcare AI, value-based care operations, and care management best practices.', img: IMG.hero, schema: 'Organization' },
    '/resources-whitepapers': { title: 'Whitepapers & Reports | Zynix AI', desc: 'Research on healthcare AI, VBC outcomes, population health analytics, and operational transformation in healthcare.', img: IMG.hero, schema: 'Organization' },
    '/company-privacy': { title: 'Privacy Policy | Zynix AI', desc: 'Zynix AI privacy policy. How we collect, use, and protect your personal and health-related information.', img: IMG.hero, schema: 'Organization' },
    '/company-terms': { title: 'Terms of Service | Zynix AI', desc: 'Zynix AI terms of service governing use of our healthcare AI platform and related services.', img: IMG.hero, schema: 'Organization' }
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
    setMeta('name','robots','index, follow');
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
    injectJSONLD(pagePath, seo);
  }

  function injectJSONLD(pagePath, seo) {
    var orgSchema = {
      '@context':'https://schema.org','@type':'Organization',
      name:'Zynix AI',url:'https://www.zynix.ai',logo:IMG.logo,
      description:'The AI operating system for value-based healthcare. 1 million VBC patients onboarded across 16+ healthcare organizations.',
      address:{'@type':'PostalAddress',streetAddress:'3535 Little Rd',addressLocality:'Trinity',addressRegion:'FL',postalCode:'34655',addressCountry:'US'},
      contactPoint:{'@type':'ContactPoint',email:'info@zynix.ai',contactType:'sales'},
      areaServed:{'@type':'State',name:'Florida'},
      numberOfEmployees:{'@type':'QuantitativeValue',value:'50-100'},
      foundingDate:'2023',
      sameAs:['https://www.linkedin.com/company/zynix-ai']
    };
    var schemas = [orgSchema];
    if (seo.schema === 'Product') {
      schemas.push({'@context':'https://schema.org','@type':'SoftwareApplication',name:seo.title.split('|')[0].trim(),description:seo.desc,applicationCategory:'HealthcareApplication',operatingSystem:'Web',offers:{'@type':'Offer',price:'0',priceCurrency:'USD',description:'Contact for pricing'},brand:{'@type':'Organization',name:'Zynix AI'}});
    }
    if (seo.schema === 'MedicalBusiness') {
      schemas.push({'@context':'https://schema.org','@type':'MedicalBusiness',name:'Zynix AI',description:seo.desc,address:orgSchema.address,geo:{'@type':'GeoCoordinates',latitude:28.1856,longitude:-82.6800},areaServed:'Florida',medicalSpecialty:'Value-Based Care',url:'https://www.zynix.ai'});
    }
    if (seo.schema === 'FAQPage') {
      var faqEls = document.querySelectorAll('.zynix-faq-item');
      var mainEntity = [];
      faqEls.forEach(function(f) {
        var q = f.querySelector('.zynix-faq-q');
        var a = f.querySelector('.zynix-faq-a');
        if (q && a) mainEntity.push({'@type':'Question',name:q.textContent,acceptedAnswer:{'@type':'Answer',text:a.textContent}});
      });
      if (mainEntity.length) schemas.push({'@context':'https://schema.org','@type':'FAQPage',mainEntity:mainEntity});
    }
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
      if (child.classList.contains('zynix-injected') || child.classList.contains('zynix-mega-nav') || child.classList.contains('zynix-mobile-menu')) continue;
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
  function renderFooter() {
    return '<footer class="zynix-footer"><div class="zynix-footer-inner">' +
      '<div class="zynix-footer-brand"><img src="' + IMG.logoWhite + '" alt="Zynix AI" style="height:48px;margin-bottom:16px;"><p>The operating system for value-based care. Purpose-built AI that unifies clinical, financial, and operational intelligence.</p></div>' +
      '<div class="zynix-footer-col"><h4>PRODUCTS</h4><a href="/products-zynix-os">Zynix OS</a><a href="/products-data-platform">Data Platform</a><a href="/products-analytics">Analytics</a><a href="/products-ai-agents">AI Agents</a><a href="/products-zynscribe">ZynScribe</a><a href="/products-care-plans">Care Plans</a><a href="/company-zynixllm">ZynixLLM</a></div>' +
      '<div class="zynix-footer-col"><h4>SOLUTIONS</h4><a href="/solutions-acos">ACOs & MSOs</a><a href="/solutions-health-systems">Health Systems</a><a href="/solutions-health-plans">Health Plans</a><a href="/solutions-fqhcs">FQHCs</a><a href="/solutions-independent-practices">Practices</a><a href="/solutions-ascs">ASCs</a></div>' +
      '<div class="zynix-footer-col"><h4>COMPANY</h4><a href="/company-about">About</a><a href="/company-careers">Careers</a><a href="/company-trust-center">Trust Center</a><a href="/company-press">Press</a><a href="/contact">Contact</a></div>' +
      '<div class="zynix-footer-col"><h4>RESOURCES</h4><a href="/resources-blog">Blog</a><a href="/resources-case-studies">Case Studies</a><a href="/resources-faq">FAQ</a><a href="/resources-glossary">Glossary</a><a href="/company-privacy">Privacy</a><a href="/company-terms">Terms</a></div>' +
      '</div><div class="zynix-footer-bottom"><p>&copy; 2026 Zynix AI. All rights reserved.</p></div></footer>';
  }

  function renderCTA(title, subtitle, btnText) {
    return '<section class="zynix-cta-section"><div class="zynix-container">' +
      '<h2>' + (title || 'See Zynix in Action') + '</h2>' +
      '<p>' + (subtitle || 'Join the healthcare organizations already transforming care with AI-powered intelligence.') + '</p>' +
      '<a href="' + CALENDLY + '" class="zynix-btn-primary" target="_blank">' + (btnText || 'Request a Demo') + ' &rarr;</a>' +
      '</div></section>';
  }

  function renderInnerHero(tag, title, subtitle, image, imgAlt) {
    return '<section class="zynix-inner-hero"><div class="zynix-container zynix-inner-hero-grid">' +
      '<div class="zynix-inner-hero-text">' +
      (tag ? '<span class="zynix-tag">' + tag + '</span>' : '') +
      '<h1>' + title + '</h1>' +
      '<p>' + subtitle + '</p>' +
      '<div class="zynix-hero-btns"><a href="' + CALENDLY + '" class="zynix-btn-primary" target="_blank">Request a Demo &rarr;</a><a href="#capabilities" class="zynix-btn-secondary">Explore Capabilities</a></div>' +
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
      'An integrated platform where AI agents work together like a coordinated workforce\u2014delivering measurable patient and financial outcomes at scale.',
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
    '<div class="zynix-arch-card fade-in-up" style="border-left:4px solid #fddbc8"><div class="zynix-arch-num">03</div><h3>Execution</h3><p>Complete work that normally sits on staff worklists\u2014calls, documentation, triage, and care coordination.</p></div>' +
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
      { icon: '&#128300;', title: 'Risk Stratification', desc: 'Predictive modeling to identify high-risk patients before crisis\u2014enabling proactive intervention.' }
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
      'The unified healthcare data layer that ingests, cleans, normalizes, and organizes data from every clinical and administrative source\u2014in real time.',
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
    '<div class="zynix-data-layer fade-in-up"><h3>&#9889; Real-Time Feeds</h3><p>EHR APIs, HL7/FHIR feeds, claims (837/835), ADT streams, labs, pharmacy, SDOH, scheduling, and financial data\u2014all flowing in real time.</p></div>' +
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
      'AI-powered analytics that go beyond dashboards. Identify HCC opportunities, predict risk, close quality gaps, and support clinical decisions\u2014all in real time.',
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
      'Stop chatting. Start executing. Our AI agents convert insights into completed actions\u201424/7, across every department, handling the work humans shouldn\u2019t have to do.',
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
    '<p>Intelligent scheduling that books appointments through calls, texts, and chat\u2014matching patients with available slots and managing cancellations.</p>' +
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
    '<p>Automated prior authorization submission, tracking, denial management, and expiration alerts\u2014eliminating the admin burden.</p>' +
    '<div class="zynix-agent-metrics"><span>75%+ Time Reduction</span><span>$20+ Saved Per Auth</span></div></div>' +

    '<div class="zynix-agent-card fade-in-up">' +
    '<div class="zynix-agent-header"><span class="zynix-agent-icon">&#128138;</span><h3>ZynPharmacy</h3></div>' +
    '<p>Automated discrepancy detection, drug interaction checking, and adherence assessment with clinical team alerts.</p>' +
    '<div class="zynix-agent-metrics"><span>95%+ Accuracy</span><span>50-70% Time Reduction</span></div></div>' +

    '</div></div></section>' +

    '<section class="zynix-orchestration-section"><div class="zynix-container">' +
    '<span class="zynix-tag">ORCHESTRATION</span>' +
    '<h2>Agents That Work Together</h2>' +
    '<p class="zynix-section-sub">Zynix agents don\u2019t operate in silos. They hand off tasks, share context, and coordinate across workflows\u2014just like a high-performing care team.</p>' +
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
      'Transform patient encounters into accurate documentation instantly. AI-powered transcription that generates precise SOAP notes in seconds\u2014so you can focus on patients, not paperwork.',
      IMG.scribe, 'ZynScribe Ambient AI') +

    renderProblemSection('The Documentation Crisis', [
      { icon: '&#128337;', title: '2 Hours Per 1 Hour', desc: 'Physicians spend 2 hours on documentation for every 1 hour with patients. That\u2019s backwards.' },
      { icon: '&#128564;', title: '16 Min Pajama Time', desc: '16 minutes of after-hours documentation every night. Burnout isn\u2019t a mystery\u2014it\u2019s a math problem.' },
      { icon: '&#128148;', title: '63% Report Burnout', desc: 'The #1 driver of physician dissatisfaction is documentation burden. ZynScribe eliminates it.' }
    ]) +

    '<section class="zynix-capabilities-section" id="capabilities"><div class="zynix-container">' +
    '<span class="zynix-tag">CAPABILITIES</span>' +
    '<h2>How ZynScribe Works</h2>' +
    renderFeatureCards([
      { icon: '&#127908;', title: 'Ambient Capture', desc: 'Captures natural conversation between clinician and patient without interruption. Works in any clinical setting.' },
      { icon: '&#128101;', title: 'Multi-Speaker Recognition', desc: 'Handles conversations with patients, family members, interpreters, and other care team members with accurate voice distinction.' },
      { icon: '&#128196;', title: 'Automated Note Generation', desc: 'Generates SOAP notes, H&P, progress notes, and procedure notes automatically\u2014organized, compliant, ready for review.' },
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
      'The orchestration layer atop Zynix OS. Takes insights from the Data Platform and executes through coordinated AI agents\u2014seamlessly handing off tasks from one agent to the next.',
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
      'The foundation model purpose-built for medicine. Not a retrofit of general-purpose AI\u2014every component is designed for medical intelligence, clinical safety, and real-world care delivery.',
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
    '<li>Certainty calibration\u2014flags uncertainty</li>' +
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
      { icon: '&#9881;', title: 'AI-Enabled Workflows', desc: 'Not just intelligent\u2014operationalized. Powers agents that call, schedule, close gaps, and document visits.' },
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
  function renderSolutionPage(tag, title, subtitle, image, challenges, solutions, metrics, cta, customers) {
    var html = renderInnerHero(tag, title, subtitle, image, tag + ' solution') +
      renderProblemSection('Your Challenges', challenges);

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
        { icon: '&#128196;', title: 'Deployable Care Plans', desc: 'Standardized, evidence-based care plans deployed across your entire ACO network\u2014from discharge to follow-up.' },
        { icon: '&#128202;', title: 'Analytics Platform', desc: 'Real-time visibility into performance metrics, shared savings progress, and population health across all providers.' },
        { icon: '&#129302;', title: 'AI Agent Suite', desc: 'Autonomous agents orchestrate care coordination, appointment scheduling, and patient engagement at scale.' },
        { icon: '&#128268;', title: 'Unified Data Platform', desc: 'Unified data integration across providers, payers, and EHRs\u2014a single source of truth for your ACO.' }
      ],
      [
        { value: '85%', label: 'TCM Contact Rate' },
        { value: '3x', label: 'AWV Completion Lift' },
        { value: '60%', label: 'Coordinator Time Saved' },
        { value: '8-12 wk', label: 'Time to Positive ROI' }
      ],
      { title: 'Ready to Hit Your Shared Savings Targets?', sub: 'Schedule a demo to see how Zynix transforms ACO operations.', btn: 'Schedule a Demo' },
      ['Palm Beach ACO', 'West Florida ACO', 'Space Coast ACO', 'Central Florida ACO', 'Assurity ACO REACH', 'Advanced ACO & Affiliates', 'Sun Flower ACO']
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
      { title: 'Ready to Transform Your Health System?', sub: 'See how Zynix delivers unified intelligence across your entire organization.', btn: 'Schedule a Demo' },
      ['Health Vision Institute', 'CLSCFL']
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
      { title: 'Ready to Transform FQHC Operations?', sub: 'See how Zynix helps community health centers do more with less.', btn: 'Schedule a Demo' },
      ['AMISTAD CHC']
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
        { icon: '&#129302;', title: 'AI Agent Suite', desc: 'Autonomous agents handle member outreach, appointment scheduling, and follow-up\u2014reaching 85%+ of members.' },
        { icon: '&#128300;', title: 'Risk Stratification', desc: 'Predictive models identify members most likely to benefit from intervention\u2014before they become high-cost.' }
      ],
      [
        { value: '85%', label: 'Contact Rates' },
        { value: '9/10', label: 'Member Satisfaction' },
        { value: '40%', label: 'Faster Gap Closure' },
        { value: '30%', label: 'HCC Capture Improvement' }
      ],
      { title: 'Ready to Drive Stars Ratings?', sub: 'See how Zynix helps health plans achieve quality targets at scale.', btn: 'Schedule a Demo' },
      ['eTernal Health']
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
        { icon: '&#127769;', title: 'ZynAfterHours', desc: 'AI-powered after-hours support handles routine calls and urgent triage\u201424/7, 365 days a year.' },
        { icon: '&#128197;', title: 'ZynSchedule', desc: 'Intelligent scheduling captures every available appointment slot around the clock.' },
        { icon: '&#127908;', title: 'ZynScribe', desc: 'AI-powered note generation saves physicians 1-2 hours daily on documentation.' }
      ],
      [
        { value: '40%', label: 'No-Show Reduction' },
        { value: '$200K+', label: 'Revenue Capture (TCM)' },
        { value: '2 hrs', label: 'Saved Per Physician/Day' },
        { value: '24/7', label: 'Patient Access' }
      ],
      { title: 'Ready to Transform Your Practice?', sub: 'See how Zynix brings enterprise AI to independent practices.', btn: 'Schedule a Demo' },
      ['Cardio & Vascular Consultants', 'Professional Radiology Group', 'Pain Rehab Surgery Center']
    );
  }

  // ── PAGE: ASCs ──
  function renderASCs() {
    return renderSolutionPage('ASCs',
      'Streamline Surgical Operations from Auth to Recovery',
      'Eliminate prior authorization delays, reduce surgical cancellations, and automate post-procedure workflows with AI-powered orchestration.',
      IMG.enterprise,
      [
        { icon: '&#128203;', title: 'Prior Auth Delays', desc: 'Lengthy approval processes delay surgeries and block OR capacity\u2014costing revenue every day.' },
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
      { title: 'Ready to Optimize Your ASC?', sub: 'See how Zynix streamlines surgical operations from authorization to recovery.', btn: 'Schedule a Demo' },
      []
    );
  }

  // ── PAGE: About ──
  function renderAbout() {
    return renderInnerHero('ABOUT ZYNIX', 'We Are Building Healthcare\u2019s Intelligence',
      'Purpose-built AI for medicine. Not another tool\u2014an operating system that transforms how healthcare organizations deliver care at scale.',
      IMG.patients, 'Zynix AI Team') +

    '<section class="zynix-manifesto-section"><div class="zynix-container">' +
    '<span class="zynix-tag">OUR MANIFESTO</span>' +
    '<h2>Healthcare Is Broken, But Not For The Reason You Think</h2>' +
    '<p class="zynix-section-sub">The gap isn\u2019t knowledge\u2014it\u2019s execution. Every organization knows who needs care. The problem is delivering that care at scale, consistently, across every patient.</p>' +
    '<div class="zynix-about-quote fade-in-up"><blockquote>\u201cZynix is not about replacing doctors. It\u2019s about multiplying the impact of every person in healthcare\u2014so the system works for patients, not against them.\u201d</blockquote></div>' +
    '</div></section>' +

    '<section class="zynix-capabilities-section"><div class="zynix-container">' +
    '<span class="zynix-tag">WHY WE EXIST</span>' +
    '<h2>Why Healthcare Needs Its Own AI</h2>' +
    renderFeatureCards([
      { icon: '&#129504;', title: 'Clinical Reasoning Engine', desc: 'Built on real medical conversations and protocols\u2014not internet data. Understands medicine at its core.' },
      { icon: '&#128737;', title: 'Safety Constellation', desc: 'Multi-layer safety woven into every output. Protocol validation, uncertainty detection, human escalation.' },
      { icon: '&#127919;', title: 'Certainty Calibration', desc: 'Knows what it doesn\u2019t know. Flags uncertainty explicitly and escalates to human clinicians when needed.' },
      { icon: '&#128064;', title: 'Multimodal Understanding', desc: 'Processes text, structured data, clinical workflows, EHR records, and imaging notes in unified context.' }
    ]) +
    '</div></section>' +

    '<section class="zynix-mission-section"><div class="zynix-container">' +
    '<span class="zynix-tag">MISSION & VISION</span>' +
    '<h2>What We\u2019re Building Toward</h2>' +
    '<div class="zynix-compare-grid">' +
    '<div class="zynix-compare-card zynix-compare-good fade-in-up"><h3>Our Mission</h3><p style="font-size:16px;line-height:1.8">To transform healthcare operations by building the AI operating system that turns insight into action\u2014enabling every organization to deliver the right care, to the right patient, at the right time.</p></div>' +
    '<div class="zynix-compare-card zynix-compare-good fade-in-up"><h3>Our Vision</h3><p style="font-size:16px;line-height:1.8">A world where healthcare\u2019s intelligence gap is closed\u2014where AI handles the operational complexity so human caregivers can focus entirely on what they do best: caring for patients.</p></div>' +
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
    '<form class="zynix-contact-form" onsubmit="event.preventDefault();this.innerHTML=\'<div style=padding:40px;text-align:center><h3 style=color:#F16529>Thank you!</h3><p>We\\\'ll be in touch within 24 hours.</p></div>\'">' +
    '<div class="zynix-form-row"><div class="zynix-form-group"><label>First Name</label><input type="text" placeholder="John" required></div><div class="zynix-form-group"><label>Last Name</label><input type="text" placeholder="Smith" required></div></div>' +
    '<div class="zynix-form-group"><label>Work Email</label><input type="email" placeholder="john@organization.com" required></div>' +
    '<div class="zynix-form-group"><label>Organization</label><input type="text" placeholder="Your organization name"></div>' +
    '<div class="zynix-form-group"><label>Healthcare Segment</label><select><option value="">Select your segment</option><option>ACO / MSO</option><option>Health System</option><option>FQHC</option><option>Health Plan</option><option>Independent Practice</option><option>ASC</option><option>Other</option></select></div>' +
    '<div class="zynix-form-group"><label>Message (Optional)</label><textarea rows="4" placeholder="Tell us about your goals..."></textarea></div>' +
    '<button type="submit" class="zynix-btn-primary" style="width:100%;text-align:center">Request a Demo &rarr;</button>' +
    '</form></div></div></div></section>' +
    renderFooter();
  }

  // ── PAGE: FAQ ──
  function renderFAQ() {
    var faqs = [
      { q: 'What is Zynix AI?', a: 'Zynix is the AI operating system for value-based healthcare. It unifies data, analytics, and autonomous AI agents into a single platform that turns insight into action\u2014at scale.' },
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
      html += '<div class="zynix-blog-card fade-in-up"><span class="zynix-blog-cat">' + p.cat + '</span><h3>' + p.title + '</h3><span class="zynix-blog-date">' + p.date + '</span></div>';
    });
    html += '</div>';

    return renderInnerHero('BLOG', 'Insights & Research',
      'Perspectives on operational excellence, AI transformation, and clinical innovation in healthcare. 28 articles on healthcare AI, value-based care, and population health.',
      null, '') +
    '<section class="zynix-blog-section"><div class="zynix-container">' + html + '</div></section>' +
    renderCTA('Want More Insights?', 'Subscribe to our newsletter for the latest in healthcare AI.', 'Contact Us') +
    renderFooter();
  }

  // ── PAGE: Case Studies ──
  function renderCaseStudies() {
    var studies = [
      { title: 'Pine Street Medical Group', metric: '34%', label: 'Appointment Availability Improvement', seg: 'Independent Practice' },
      { title: 'HarborPoint Family Practice', metric: '28%', label: 'No-Show Reduction', seg: 'Independent Practice' },
      { title: 'Clearview ASC Network', metric: '5 \u2192 1 day', label: 'Prior Auth Turnaround', seg: 'ASC' },
      { title: 'BlueOak Health Plan', metric: '$8M', label: 'HCC Gap Closure', seg: 'Health Plan' },
      { title: 'NorthBridge Health System', metric: '22%', label: 'Readmission Reduction', seg: 'Health System' },
      { title: 'Cedar Valley Health Network', metric: '65%', label: 'Med Reconciliation Error Reduction', seg: 'Health System' },
      { title: 'Riverside Community Health', metric: '31%', label: 'Preventive Screening Improvement', seg: 'FQHC' }
    ];
    var html = '<div class="zynix-case-grid">';
    studies.forEach(function(s) {
      html += '<div class="zynix-case-card fade-in-up"><span class="zynix-case-seg">' + s.seg + '</span><h3>' + s.title + '</h3><div class="zynix-case-metric"><span>' + s.metric + '</span><small>' + s.label + '</small></div></div>';
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
            al('/products-ai-agents-post-discharge','Post-Discharge','<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>','Follow-up automation') +
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

    document.body.prepend(mobile);
    document.body.prepend(nav);

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
    var html = renderInnerHero('AI AGENT', name + ' \u2014 ' + tagline, subtitle, image, name) +
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
  function renderUseCasePage(name, subtitle, problems, steps, replaces, kpis, story) {
    var html = '<section class="zynix-inner-hero"><div class="zynix-container" style="position:relative;z-index:1;text-align:center;max-width:800px;margin:0 auto">' +
      '<span class="zynix-tag" style="display:inline-block">USE CASE</span>' +
      '<h1 style="font-size:42px;font-weight:600;margin:0 0 20px">' + name + '</h1>' +
      '<p style="color:var(--z-text-secondary,#94a3b8);font-size:18px;line-height:1.7">' + subtitle + '</p>' +
      '<div class="zynix-hero-btns" style="justify-content:center;margin-top:32px"><a href="' + CALENDLY + '" class="zynix-btn-primary" target="_blank">Request a Demo &rarr;</a></div>' +
      '</div></section>';

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
      'AI-powered patient engagement that handles inbound calls 24/7\u2014triaging symptoms, scheduling appointments, and diverting unnecessary ER visits.',
      IMG.doctor,
      [
        { icon: '&#128222;', title: '67% of Calls Abandoned', desc: 'After-hours calls go to voicemail. Patients give up and go to the ER\u2014costing $1,500-3,000 per avoidable visit.' },
        { icon: '&#128176;', title: '$38 Billion Problem', desc: 'Nearly two-thirds of patients avoid care due to scheduling frustration. 30% of ER visits are non-emergent.' },
        { icon: '&#128101;', title: 'Staff Burnout', desc: 'Traditional nurse triage lines cost $15-25 per call and cannot scale. Human staff burn out and turn over.' }
      ],
      [
        { icon: '&#128138;', title: 'Intelligent Symptom Triage', desc: 'Evidence-based protocols (Schmitt-Thompson), real-time assessment, automatic escalation for high-acuity cases.' },
        { icon: '&#128197;', title: 'Smart Scheduling', desc: 'Books same-day and next-day appointments based on urgency and provider availability.' },
        { icon: '&#127973;', title: 'ER Diversion', desc: 'Identifies patients who can safely wait. Provides self-care guidance and routes to appropriate care level.' },
        { icon: '&#127760;', title: 'Multilingual Support', desc: '15+ languages including Spanish, Mandarin, Vietnamese, Tagalog, Korean\u2014with no translation delays.' },
        { icon: '&#128101;', title: 'Warm Handoffs', desc: 'Seamless transfer to human staff with complete clinical context. No starting from scratch.' },
        { icon: '&#128196;', title: 'EHR Documentation', desc: 'Every interaction automatically logged with structured ICD-10 ready documentation.' }
      ],
      [
        { title: 'Patient calls in', desc: 'Inbound voice call received. EHR context loaded (demographics, medical history, medications).', tag: 'Input' },
        { title: 'Symptom assessment', desc: 'Natural language understanding of symptoms. Clinical decision support algorithms applied. Urgency scored 1-5.', tag: 'Processing' },
        { title: 'Disposition & action', desc: 'Real-time triage decision: self-care guidance, appointment booking, ER referral, or 911 instruction.', tag: 'Output' },
        { title: 'Documentation & follow-up', desc: 'Encounter note uploaded to EHR. Escalation alerts sent. Patient follow-up messages delivered.', tag: 'Documentation' }
      ],
      { title: '2:47 AM \u2014 Patient calls with chest discomfort', body: 'ZynAfterHours answers in 2 rings. Patient describes pressure in their chest for about an hour. The AI asks structured questions: location, radiation, shortness of breath, risk factors. Patient reports no radiation, no SOB, history of GERD, ate spicy food. Triage assessment: likely non-cardiac, but age/timing warrants evaluation. Action: same-day urgent care appointment scheduled. Red flag instructions provided. Complete encounter note documented in EHR. Total time: 4 minutes 23 seconds.' },
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
        { q: 'What happens during a real emergency?', a: 'The system recognizes emergency keywords and symptoms immediately. It connects to a live nurse or instructs the patient to call 911\u2014within seconds.' },
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
      { title: 'A patient needs a follow-up after abnormal labs', body: 'At 9 PM, a patient receives a message about abnormal lab results and needs to schedule a follow-up. ZynSchedule is available immediately\u2014no waiting until morning. It identifies the urgency, finds the next available slot with the right provider, books the appointment, and sends confirmation with prep instructions. The patient sleeps knowing their follow-up is scheduled.' },
      [
        { value: '40%', label: 'No-Show Reduction' },
        { value: '24/7', label: 'Booking Availability' },
        { value: '3x', label: 'Scheduling Throughput' },
        { value: '95%+', label: 'Patient Satisfaction' }
      ],
      [
        { q: 'What scheduling systems do you integrate with?', a: 'Epic, Cerner, athenahealth, eClinicalWorks, NextGen, and all major EHRs via HL7/FHIR.' },
        { q: 'Can it handle complex scheduling rules?', a: 'Yes\u2014provider preferences, appointment types, insurance verification, and multi-provider visits.' }
      ]
    );
  }

  // ── NEW PAGE: Post-Discharge Follow-Up ──
  function renderPostDischarge() {
    return renderAgentPage('Post-Discharge Follow-Up',
      'From Discharge to Recovery, Automatically',
      'AI-powered outreach that contacts every patient within 24-48 hours of discharge\u2014confirming safe arrival, reviewing meds, and scheduling follow-ups.',
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
      { title: 'TCM Workflow: Patient discharged at 2:47 PM Tuesday', body: 'Minute 0: ADT feed hits Zynix. Minute 1: Patient record enriched with discharge diagnosis, medications, risk score. Minute 2: Risk model flags HIGH (82nd percentile readmission risk). Minute 5: TCM care plan auto-deployed. Hours 1-24: AI calls patient, confirms safe arrival, reviews meds, identifies confusion, escalates to pharmacist, schedules 7-day follow-up. Day 3: Appointment reminder sent. Day 5: Patient confirms via text. Day 7: Patient attends, TCM billing code captured. Day 30: Patient did NOT readmit\u2014shared savings preserved. Total human involvement: pharmacist review (5 min), PCP visit (15 min). Everything else: automated.' },
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
      { title: 'Patient stops a new medication due to dizziness', body: 'The medication reconciliation agent discovers during a routine post-discharge call that the patient stopped their new blood pressure medication because of dizziness. The agent captures symptom severity, routes the case for clinician review, documents the medication change, and schedules a follow-up to confirm stability\u2014rather than discovering the issue at an ED visit weeks later.' },
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
      'AI that reads, classifies, and routes faxes automatically\u2014turning a paper-based bottleneck into a digital workflow.',
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
      { title: 'MRI prior auth delays a diagnosis', body: 'A clinician orders an MRI for back pain with concerning symptoms. ZynAuth flags missing documentation early\u2014conservative therapy records needed. It assembles the clinical justification, submits to the payer portal, and tracks status. When additional information is requested, ZynAuth routes it as a task with an owner and deadline. Once approved, scheduling is triggered automatically. Result: weeks of delay reduced to days.' },
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
        { icon: '&#128196;', title: 'Documentation is Afterthought', desc: 'Teams do the work but fail to capture it cleanly\u2014lost billing, poor audit readiness.' }
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
      'A patient returns home after CHF exacerbation. On day 1-2 they receive a call and admit they did not fill one discharge med and feel more short of breath. The care plan routes symptom escalation to the on-call clinician, triggers pharmacy follow-up for the missing med, schedules a tele-visit within a week due to transport barriers, and sends appointment reminders. The episode stays open until those steps are verified.'
    );
  }

  function renderUseCaseGapClosure() {
    return renderUseCasePage('Gap Closure (HCC / HEDIS / Quality)',
      'Turn gap identification into completed closures\u2014labs done, visits completed, documentation aligned.',
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
      'A diabetic patient is overdue for A1c and retinal exam. The care plan pushes an outreach sequence, captures that the patient works nights, schedules an after-hours lab, and sets reminders. When results return abnormal, a follow-up visit is scheduled and tracked until completed.'
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
      'A parent calls about a child\u2019s fever and rash at 11 PM. The care plan captures red flag status, escalates to the on-call clinician when the rash is concerning, or schedules a next-day visit and sends confirmations. The case does not disappear into a voicemail box.'
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
      'A patient needs an MRI. The clinic previously lost weeks to back-and-forth. This workflow creates an auth case, flags missing conservative therapy notes before submission, tracks payer requests, schedules the MRI immediately after approval, and keeps the patient from repeatedly calling with no answers.'
    );
  }

  function renderUseCasePreventiveScreening() {
    return renderUseCasePage('Preventive Screening Completion',
      'Move preventive screening from order to completion, especially in populations with access barriers.',
      [
        { icon: '&#128269;', title: 'Overdue Screenings', desc: 'Patients avoid screenings due to anxiety, confusion, and scheduling friction.' },
        { icon: '&#128683;', title: 'Prep Barriers', desc: 'Colonoscopy prep confusion, mammogram scheduling difficulty\u2014logistics kill compliance.' },
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
      'A patient avoids colon screening due to prep anxiety and scheduling confusion. The care plan provides plain-language guidance, sets a concrete appointment during a time that works, sends timed reminders including prep instructions, and ensures results follow-through when findings require action.'
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
      'A patient repeatedly goes to the ED for COPD flares. Outreach reveals they stopped inhalers due to cost and can\u2019t get timely clinic visits. The care plan routes medication assistance review, schedules a follow-up, sets reminders, and ensures the patient knows how to reach the after-hours line instead of the ED.'
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
    return renderPlaceholderPage('GLOSSARY', 'Healthcare AI Glossary',
      'Key terms and definitions across interoperability, coding, claims, quality, and compliance.',
      '<section style="padding:80px 0"><div class="zynix-container">' +
      '<div class="zynix-feature-grid">' +
      '<div class="zynix-feature-card"><h3>Interoperability & Health Data</h3><p>HL7, FHIR, ADT feeds, HIE, USCDI, and health data exchange standards.</p></div>' +
      '<div class="zynix-feature-card"><h3>Coding & Terminology</h3><p>ICD-10, CPT, SNOMED, LOINC, HCC, and clinical data standards.</p></div>' +
      '<div class="zynix-feature-card"><h3>Claims & Billing</h3><p>837/835 transactions, prior authorization, RCM, and administrative workflows.</p></div>' +
      '<div class="zynix-feature-card"><h3>Quality & Risk Adjustment</h3><p>HEDIS, Stars, RAF scores, MSSP, ACO REACH, and value-based metrics.</p></div>' +
      '<div class="zynix-feature-card"><h3>Compliance</h3><p>HIPAA, SOC 2, HITRUST, BAA, and healthcare regulatory frameworks.</p></div>' +
      '<div class="zynix-feature-card"><h3>AI & Healthcare Operations</h3><p>LLM, NLP, ambient scribe, clinical decision support, and agentic AI.</p></div>' +
      '</div></div></section>' +
      renderCTA('Have Questions About Healthcare AI?', 'Our team can help you understand how AI fits into your operations.'));
  }

  function renderWebinars() {
    return renderPlaceholderPage('WEBINARS & EVENTS', 'Learn from Healthcare AI Leaders',
      'Upcoming webinars, events, and on-demand content from the Zynix team.');
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
      '<span class="zynix-tag">THE AI OPERATING SYSTEM FOR HEALTHCARE</span>' +
      '<h1>Turn Healthcare Data<br>Into Patient Outcomes</h1>' +
      '<p>The only platform that unifies data, analytics, and AI agents into a single operating system\u2014purpose-built for value-based care. 1M+ patients served.</p>' +
      '<div class="zynix-hero-btns"><a href="' + CALENDLY + '" class="zynix-btn-primary" target="_blank">Get Started &rarr;</a><a href="#how-it-works" class="zynix-btn-secondary">See How It Works</a></div>' +
      '</div>' +
      '<div class="zynix-inner-hero-img"><img src="' + IMG.portalACO + '" alt="Zynix AI Healthcare Dashboard"></div>' +
      '</div></section>';

    // -- CUSTOMER TRUST STRIP --
    html += '<section class="zynix-trust-strip"><div class="zynix-container">' +
      '<p class="zynix-trust-label">1 MILLION+ VBC PATIENTS ONBOARDED \u2014 TRUSTED BY ACOs, HEALTH PLANS, HEALTH SYSTEMS, FQHCs, PRACTICES, LABS &amp; PHARMACIES</p>' +
      '<div class="zynix-trust-marquee"><div class="zynix-trust-track">' +
      '<span>Palm Beach ACO</span><span>West Florida ACO</span><span>Space Coast ACO</span><span>Central Florida ACO</span>' +
      '<span>Assurity ACO REACH</span><span>Advanced ACO &amp; Affiliates</span><span>IncentiveCare IPA</span><span>eTernal Health</span>' +
      '<span>Cardio &amp; Vascular Consultants</span><span>AMISTAD CHC</span><span>Health Vision Institute</span><span>CLSCFL</span>' +
      '<span>Professional Radiology Group</span><span>Value Services Management</span><span>Sun Flower ACO</span><span>Pain Rehab Surgery Center</span>' +
      // duplicate for seamless loop
      '<span>Palm Beach ACO</span><span>West Florida ACO</span><span>Space Coast ACO</span><span>Central Florida ACO</span>' +
      '<span>Assurity ACO REACH</span><span>Advanced ACO &amp; Affiliates</span><span>IncentiveCare IPA</span><span>eTernal Health</span>' +
      '<span>Cardio &amp; Vascular Consultants</span><span>AMISTAD CHC</span><span>Health Vision Institute</span><span>CLSCFL</span>' +
      '<span>Professional Radiology Group</span><span>Value Services Management</span><span>Sun Flower ACO</span><span>Pain Rehab Surgery Center</span>' +
      '</div></div></div></section>';

    // -- CRISIS STATS --
    html += '<section class="zynix-crisis-section"><div class="zynix-container">' +
      '<span class="zynix-tag">THE CRISIS</span>' +
      '<h2>Healthcare Has a Doing Problem, Not a Knowing Problem</h2>' +
      '<p class="zynix-section-sub">Every organization has invested millions in analytics. The problem isn\u2019t knowing who needs care\u2014it\u2019s delivering that care at scale.</p>' +
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
      '<div class="zynix-arch-card fade-in-up" style="border-left:4px solid #ccfdcf"><div class="zynix-arch-num">01</div><h3>AI Data Foundation</h3><p>Ingest, clean, and normalize data from every source\u2014EHRs, claims, ADT, labs, pharmacy, SDOH\u2014into one unified layer.</p></div>' +
      '<div class="zynix-arch-card fade-in-up" style="border-left:4px solid #cebffa"><div class="zynix-arch-num">02</div><h3>Intelligence &amp; Reasoning</h3><p>Predict, prioritize, and surface actionable insights\u2014risk scores, gap worklists, clinical decision support.</p></div>' +
      '<div class="zynix-arch-card fade-in-up" style="border-left:4px solid #fddbc8"><div class="zynix-arch-num">03</div><h3>AI Agent Suite</h3><p>Specialized agents that take action: outreach, scheduling, triage, documentation, reminders, and follow-up.</p></div>' +
      '<div class="zynix-arch-card fade-in-up" style="border-left:4px solid #d7e9ff"><div class="zynix-arch-num">04</div><h3>Care Management</h3><p>Orchestrated workflows where agents collaborate on end-to-end care plans\u2014TCM, AWV, gap closure, and more.</p></div>' +
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
      '<div class="zynix-feature-card fade-in-up"><div class="zynix-feature-icon">&#128203;</div><h3>Care Plans</h3><p>Deployable, orchestrated care plans for TCM, CCM, AWV, HEDIS, and HCC closure\u2014executed by AI agents.</p><a href="/products-care-plans" class="zynix-card-link">Learn more &rarr;</a></div>' +
      '<div class="zynix-feature-card fade-in-up"><div class="zynix-feature-icon">&#129504;</div><h3>ZynixLLM</h3><p>Purpose-built healthcare language model that powers the entire platform. Gets smarter with every patient interaction.</p><a href="/company-zynixllm" class="zynix-card-link">Learn more &rarr;</a></div>' +
      '</div></div></section>';

    // -- PLATFORM SCREENSHOTS --
    html += '<section class="zynix-screenshot-section"><div class="zynix-container">' +
      '<span class="zynix-tag">INSIDE THE PLATFORM</span>' +
      '<h2>See What You Get on Day One</h2>' +
      '<p class="zynix-section-sub">Real product screenshots from live deployments across Florida healthcare organizations.</p>' +
      '<div class="zynix-screenshot-gallery">' +
      '<div class="zynix-screenshot-card fade-in-up"><img src="' + IMG.portalACO + '" alt="ACO Dashboard"><div class="caption">ACO Performance Dashboard</div></div>' +
      '<div class="zynix-screenshot-card fade-in-up"><img src="' + IMG.portalProvider + '" alt="Provider View"><div class="caption">Clinical Quality Metrics</div></div>' +
      '<div class="zynix-screenshot-card fade-in-up"><img src="' + IMG.portalPredictive + '" alt="Predictive Analytics"><div class="caption">Predictive Analytics Engine</div></div>' +
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
      '<div class="zynix-feature-grid" style="max-width:800px;margin:0 auto;">' +
      '<div class="zynix-feature-card fade-in-up"><h3>More Calls</h3><p>Better conversation models</p></div>' +
      '<div class="zynix-feature-card fade-in-up"><h3>More Triage</h3><p>Better clinical reasoning</p></div>' +
      '<div class="zynix-feature-card fade-in-up"><h3>More Documentation</h3><p>Better ambient scribe</p></div>' +
      '<div class="zynix-feature-card fade-in-up"><h3>More Outcomes</h3><p>Better risk prediction</p></div>' +
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
    '/case-studies': renderCaseStudies,
    '/resources-case-studies': renderCaseStudies,
    '/resources-glossary': renderGlossary,
    '/resources-webinars': renderWebinars,
    '/resources-whitepapers': renderWhitepapers,
    // Legal
    '/privacy-policy': renderPrivacy,
    '/company-privacy': renderPrivacy,
    '/terms-of-service': renderTerms,
    '/company-terms': renderTerms
  };

  function initAnimations() {
    // IntersectionObserver for fade-in-up animations
    var fadeEls = document.querySelectorAll('.fade-in-up');
    if (fadeEls.length && 'IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      fadeEls.forEach(function(el) { observer.observe(el); });
    } else {
      // Fallback: show all
      fadeEls.forEach(function(el) { el.classList.add('visible'); });
    }
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
      // FAQ accordion toggle
      document.querySelectorAll('.zynix-faq-q').forEach(function(q) {
        q.addEventListener('click', function() {
          q.parentElement.classList.toggle('open');
        });
      });
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', doInject);
    } else {
      doInject();
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
          { name: 'CareConnect', desc: 'Patient engagement platform', link: '/solutions-use-case-patient-engagement' }
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
