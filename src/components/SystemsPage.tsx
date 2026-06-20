import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, Cpu, MessageSquare, PhoneCall, Sliders, CheckSquare, 
  ArrowRight, ShieldCheck, Search, Filter, Mail, Globe, Award, Play, Star, AlertTriangle, Send, Check
} from 'lucide-react';
import FAQSection from './FAQSection';

interface SystemItem {
  id: string;
  categoryId: string;
  title: string;
  bullets: string[];
  description: string;
  metrics: string;
  integrations: string[];
}

const SYSTEMS_FAQ_ITEMS = [
  {
    id: 'systems-faq-1',
    question: 'Do we own the systems you build?',
    answer: 'Yes. Every workflow, integration, automation, and asset is owned by your business. There are no platform lock-ins or proprietary dependencies.'
  },
  {
    id: 'systems-faq-2',
    question: 'Can your systems integrate with our existing tools?',
    answer: 'Yes. We can integrate with platforms such as Shopify, Klaviyo, Gorgias, Zendesk, Slack, Google Workspace, CRMs, and many other business tools.'
  },
  {
    id: 'systems-faq-3',
    question: 'Will the systems scale as our brand grows?',
    answer: 'Absolutely. Our infrastructure is designed to handle increasing customer interactions, operational complexity, and order volume without requiring a complete rebuild.'
  },
  {
    id: 'systems-faq-4',
    question: 'What kind of ROI can we expect?',
    answer: 'Results vary by brand, but clients typically see improvements in operational efficiency, customer response times, retention workflows, and reductions in manual workload.'
  },
  {
    id: 'systems-faq-5',
    question: 'Why not just hire more staff?',
    answer: 'Hiring increases recurring payroll costs. Infrastructure scales with your business and handles repetitive operational tasks consistently, allowing your team to focus on higher-value work.'
  }
];

const SectionDivider = () => (
  <div className="relative w-full h-[1px] bg-zinc-200/40 dark:bg-white/[0.03] my-10 sm:my-16 pointer-events-none flex items-center justify-center">
    <div className="absolute w-[7px] h-[7px] rotate-45 border border-zinc-300 dark:border-white/10 bg-zinc-100 dark:bg-[#09090b]" />
  </div>
);

export default function SystemsPage({ onOpenConsult }: { onOpenConsult: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSystemId, setActiveSystemId] = useState<string>('whatsapp-interaction');

  const categories = [
    { id: 'all', label: 'All Operations' },
    { id: 'attract', label: '01 Attract' },
    { id: 'convert', label: '02 Convert' },
    { id: 'support', label: '03 Support' },
    { id: 'retain', label: '04 Retain' },
    { id: 'management', label: '05 Admin' }
  ];

  const systems: SystemItem[] = [
    // --- ATTRACT SYSTEMS ---
    {
      id: 'influencer-outreach',
      categoryId: 'attract',
      title: 'Influencer Outreach Bot',
      bullets: ['Auto-discovery', 'Personalised DMs', 'Engagement scoring', 'Pipeline tracking'],
      description: 'Automatically finds and contacts relevant influencers with personalised pitches — no manual research or outreach needed.',
      metrics: '+142% influencer replies compared to manual pitches',
      integrations: ['Instagram Graph API', 'Gmail', 'Airtable']
    },
    {
      id: 'seo-blog-generator',
      categoryId: 'attract',
      title: 'SEO Blog Generator',
      bullets: ['Keyword research', 'Auto-publish', 'Trend analysis', 'Brand voice'],
      description: 'Researches trending topics and auto-publishes SEO-optimised blog content — consistent organic traffic without a content team.',
      metrics: '+280% organic clicks within 90 days',
      integrations: ['Shopify CMS', 'Google Search Console', 'Webflow']
    },
    {
      id: 'social-media-automation',
      categoryId: 'attract',
      title: 'Social Media Automation Agent',
      bullets: ['Auto-reply', 'Lead capture', '24/7 coverage', 'Multi-platform'],
      description: 'Instantly replies to every DM and comment across Instagram and Facebook — no lead or customer question goes unanswered.',
      metrics: 'Under 5-second automatic reply latency time',
      integrations: ['Meta Graph API', 'Slack', 'HubSpot']
    },
    {
      id: 'ugc-collector',
      categoryId: 'attract',
      title: 'UGC Collector & Organiser',
      bullets: ['Auto-collection', 'Content library', 'Rights management', 'Ad-ready assets'],
      description: 'Automatically collects customer photos, videos and reviews from social media and organises them ready for ad creative use.',
      metrics: '380+ monthly customer assets categorized',
      integrations: ['Shopify', 'Klaviyo', 'Dropbox']
    },
    {
      id: 'ai-ad-orchestration',
      categoryId: 'attract',
      title: 'AI Ad Orchestration',
      bullets: ['Smart bidding', 'Audience AI', 'Creative testing', 'Cross-platform sync'],
      description: 'Multi-platform ad management with AI-powered optimisation, audience targeting and dynamic creative generation.',
      metrics: '35% reduction in CAC with auto creative tests',
      integrations: ['Meta Ads Manager', 'Google Ads API', 'Shopify Analytics']
    },
    {
      id: 'landing-page-engine',
      categoryId: 'attract',
      title: 'Landing Page Engine',
      bullets: ['Dynamic content', 'A/B testing', 'Intent signals', 'Conversion tracking'],
      description: 'Dynamic landing pages that adapt in real-time to visitor behaviour, source and intent signals.',
      metrics: '+24% increase in desktop and mobile conversion rates',
      integrations: ['Shopify Storefront', 'Custom Next.js', 'Google Tag Manager']
    },
    {
      id: 'lead-magnet-automation',
      categoryId: 'attract',
      title: 'Lead Magnet Automation',
      bullets: ['Auto-delivery', 'Smart forms', 'Progressive profiling', 'Instant scoring'],
      description: 'Automated lead capture systems with personalised value delivery and instant qualification.',
      metrics: '18% opt-in subscription rate on home pages',
      integrations: ['Klaviyo', 'Shopify forms', 'Whisper PDF Compiler']
    },

    // --- CONVERT SYSTEMS ---
    {
      id: 'whatsapp-interaction',
      categoryId: 'convert',
      title: 'WhatsApp Interaction Agent',
      bullets: ['Instant response', 'Lead qualification', 'Booking flow', '24/7 availability'],
      description: 'Replies to every WhatsApp enquiry instantly with product info, pricing and booking guidance — works 24/7 without human involvement.',
      metrics: '92% of product enquiries qualified in 3 minutes',
      integrations: ['WhatsApp Business Cloud API', 'Shopify API', 'Cal.com']
    },
    {
      id: 'cart-recovery',
      categoryId: 'convert',
      title: 'Cart Abandonment Recovery Agent',
      bullets: ['Multi-step sequence', 'Discount triggers', 'Revenue recovery', 'Real-time detection'],
      description: 'Detects abandoned carts and sends a timed WhatsApp and email sequence to bring customers back and complete their purchase.',
      metrics: '18.4% of abandoned checkouts successfully recovered',
      integrations: ['Shopify checkout hooks', 'WhatsApp Business API', 'Klaviyo']
    },
    {
      id: 'product-launch-bot',
      categoryId: 'convert',
      title: 'Product Launch & Inventory Drop Bot',
      bullets: ['Instant broadcast', 'Segment targeting', 'Restock alerts', 'Launch automation'],
      description: 'Notifies your entire customer and lead list the moment a product launches or restocks — driving an immediate sales spike.',
      metrics: '$42,500+ revenue generated per automated restock drop',
      integrations: ['WhatsApp Business', 'Klaviyo segments', 'Shopify inventory']
    },
    {
      id: 'gst-invoice-generator',
      categoryId: 'convert',
      title: 'GST Invoice Generator',
      bullets: ['Auto-generation', 'GST compliant', 'Instant delivery', 'Order sync'],
      description: 'Automatically generates and sends a GST-compliant invoice the moment an order is placed — zero manual work required.',
      metrics: '100% compliant automatic invoicing pipeline',
      integrations: ['Shopify webhooks', 'QuickBooks API', 'SendGrid']
    },
    {
      id: 'instagram-fb-dm-bot',
      categoryId: 'convert',
      title: 'Instagram & Facebook DM Bot',
      bullets: ['DM automation', 'Lead capture', 'Qualification flow', 'ManyChat powered'],
      description: 'Captures leads from social DMs, qualifies them automatically and guides them toward purchase without any human involvement.',
      metrics: '42% conversion rate from DMs to cart checkouts',
      integrations: ['Instagram DM API', 'Shopify Product API', 'HubSpot']
    },

    // --- SUPPORT & EXPERIENCE SYSTEMS ---
    {
      id: 'in-app-support',
      categoryId: 'support',
      title: 'In-App AI Support Agent',
      bullets: ['RAG powered', 'Brand knowledge', 'Streaming UI', 'Always accurate'],
      description: "A live chat assistant inside your website or app powered by your brand's entire knowledge base — answers any question accurately and instantly.",
      metrics: '82% of customer queries resolved instantly with zero staff',
      integrations: ['Express framework', 'Shopify knowledge sync', 'Gemini Core API']
    },
    {
      id: 'whatsapp-support',
      categoryId: 'support',
      title: 'WhatsApp Support Bot',
      bullets: ['24/7 support', 'Order tracking', 'Returns handling', 'Instant resolution'],
      description: 'Handles all customer service queries on WhatsApp automatically — order status, returns, complaints — without a support team.',
      metrics: 'CSAT score maintained at 4.8/5.0 automatically',
      integrations: ['WhatsApp API', 'Returny', 'Shopify Fulfillment']
    },
    {
      id: 'review-alert',
      categoryId: 'support',
      title: 'Real-Time Review Alert',
      bullets: ['Instant alerts', 'Sentiment analysis', 'Auto-response', 'Multi-platform'],
      description: 'Sends an instant notification the moment a new Google or social review comes in — with sentiment analysis and a suggested response.',
      metrics: 'Under 10 minutes response turnaround to support reviews',
      integrations: ['Google Business API', 'Trustpilot API', 'Slack alerts webhook']
    },

    // --- RETAIN SYSTEMS ---
    {
      id: 'crm-followup',
      categoryId: 'retain',
      title: 'CRM + Outbound Follow Up Agent',
      bullets: ['Journey tracking', 'Auto follow-up', 'Pipeline management', 'Conversion optimisation'],
      description: 'Tracks every lead and customer in one place and sends automatic follow-ups based on where they are in their journey — no lead ever goes cold.',
      metrics: '38% increase in booked pipeline appointments within 30 days',
      integrations: ['HubSpot CRM', 'Cal.com', 'SendGrid API']
    },
    {
      id: 'loyalty-rewards',
      categoryId: 'retain',
      title: 'Loyalty & Rewards Engine',
      bullets: ['Points system', 'Personalised offers', 'Retention flows', 'Lifetime value'],
      description: 'Automatically manages points, rewards and personalised offers for repeat customers — increasing lifetime value without manual effort.',
      metrics: '+31% increase in cohort retention rate month-over-month',
      integrations: ['Shopify customers', 'Klaviyo customer flows', 'Stripe Ledger']
    },
    {
      id: 'sales-automation',
      categoryId: 'retain',
      title: 'Sales Automation Agent',
      bullets: ['Outbound automation', 'DM sequences', 'Engagement flows', 'Social selling'],
      description: 'Automates outbound DMs, follow-ups and engagement sequences on social media — sales happen without a dedicated sales team.',
      metrics: '14,000+ targeted social interactions optimized monthly',
      integrations: ['X Premium API', 'LinkedIn Sales Navigator API', 'Airtable']
    },

    // --- MANAGEMENT & ADMIN SYSTEMS ---
    {
      id: 'bookkeeping-agent',
      categoryId: 'management',
      title: 'Bookkeeping Agent',
      bullets: ['Stripe integration', 'Auto-reconciliation', 'Financial reports', 'Anomaly detection'],
      description: 'Connects to Stripe and automatically reconciles payments, generates financial reports and flags discrepancies — replacing manual bookkeeping.',
      metrics: 'Saved 28 bookkeeping labor hours per billing cycle',
      integrations: ['Stripe billing', 'QuickBooks Cloud API', 'Slack notifications']
    },
    {
      id: 'creative-engine',
      categoryId: 'management',
      title: 'Ad Creative Engine',
      bullets: ['DALL-E powered', 'Copy generation', 'Creative variations', 'Brand consistent'],
      description: 'Auto-generates image and copy variations for ads using AI — so your brand always has fresh, tested creatives without a designer.',
      metrics: 'Unlimited ad banner and copy catalog variants',
      integrations: ['Meta Ads API', 'S3 asset hosting', 'Midjourney webhook']
    },
    {
      id: 'ceo-assistant',
      categoryId: 'management',
      title: 'CEO Assistant Voice Agent',
      bullets: ['Voice activated', 'Task execution', 'Report generation', 'Vapi powered'],
      description: 'A voice-activated AI that executes tasks, pulls reports and sends messages by voice command — saving hours of admin every day.',
      metrics: 'Low-latency natural speech recognition system',
      integrations: ['Twilio cloud streams', 'OpenAI Realtime API', 'Slack']
    },
    {
      id: 'performance-reporting',
      categoryId: 'management',
      title: 'Website Performance Reporting Agent',
      bullets: ['Daily reports', 'Conversion tracking', 'Slack/WhatsApp delivery', 'Trend alerts'],
      description: 'Monitors traffic, conversions and performance daily and sends an automated summary directly to Slack or WhatsApp every morning.',
      metrics: 'Instant, real-time alert delivery at 8:00 AM daily',
      integrations: ['Shopify Analytics', 'Google Analytics GA4', 'WhatsApp Cloud API']
    }
  ];

  const filteredSystems = systems.filter((sys) => {
    const matchesCategory = selectedCategory === 'all' || sys.categoryId === selectedCategory;
    const matchesSearch = sys.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sys.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeSystem = systems.find(s => s.id === activeSystemId) || systems[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* 1. Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-sans font-extrabold tracking-[-0.03em] text-zinc-950 dark:text-white leading-[1.05]">
          22 Autonomous Systems
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
          Explore the exact functional parameters of the 22 custom agents we configure. Deployed containerized, fully client-owned, and running inside your cloud.
        </p>
      </div>

      {/* 2. Search & Category Selection Panel */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-b border-zinc-200/50 dark:border-zinc-900 pb-6">
        
        {/* Categories pills list */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              id={`cat-button-${cat.id}`}
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                // Automatically switch active system to first in the selected category
                const firstInCat = cat.id === 'all' 
                  ? systems[0] 
                  : systems.find(s => s.categoryId === cat.id);
                if (firstInCat) setActiveSystemId(firstInCat.id);
              }}
              className={`text-xs px-3.5 py-1.5 rounded-full transition-all cursor-pointer font-medium ${
                selectedCategory === cat.id
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-semibold shadow-xs'
                  : 'bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-950/50 dark:hover:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border border-zinc-200/40 dark:border-zinc-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input Box */}
        <div className="relative w-full md:w-72">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            id="systems-search-input-catalog"
            type="text"
            placeholder="Search operational catalog..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-zinc-50 dark:bg-zinc-950 text-xs rounded-xl border border-zinc-200 dark:border-zinc-900 text-zinc-800 dark:text-zinc-200 focus:outline-hidden focus:ring-1 focus:ring-sky-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* 3. Main Split View Grid (Left: Item Cards, Right: High-Fidelity Simulator) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: System Cards List */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[85vh] overflow-y-auto pr-1.5 custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {filteredSystems.map((sys) => {
              const isActive = sys.id === activeSystemId;

              return (
                <motion.div
                  layout
                  id={`sys-card-detail-${sys.id}`}
                  key={sys.id}
                  onClick={() => setActiveSystemId(sys.id)}
                  className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between h-[210px] relative group overflow-hidden ${
                    isActive
                      ? 'bg-zinc-50/50 dark:bg-[#111115] border-sky-500/80 shadow-[0_0_15px_rgba(14,165,233,0.1)] ring-1 ring-sky-500/10'
                      : 'bg-white dark:bg-zinc-900/45 hover:bg-zinc-50/50 dark:hover:bg-zinc-950/40 border-zinc-200 dark:border-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-800'
                  }`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className={`text-[8.5px] font-sans tracking-wider font-semibold px-2 py-0.5 rounded border uppercase ${
                        isActive ? 'text-sky-500 border-sky-500/20 bg-sky-500/5' : 'text-zinc-400 border-zinc-200 dark:border-zinc-800'
                      }`}>
                        {sys.categoryId.toUpperCase()} SYSTEM
                      </span>
                      <Sliders size={13} className={isActive ? 'text-sky-500' : 'text-zinc-400 group-hover:text-zinc-200 transition-colors'} />
                    </div>

                    <h4 className={`text-sm font-bold leading-snug mt-2.5 ${isActive ? 'text-sky-500' : 'text-zinc-850 dark:text-zinc-100'}`}>
                      {sys.title}
                    </h4>

                    {/* Sub-bullet pill list representing core bullets of the systems */}
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {sys.bullets.slice(0, 2).map((b, i) => (
                        <span key={i} className="text-[9px] font-sans font-medium tracking-tight text-zinc-450 dark:text-zinc-500 leading-none">
                          • {b}
                        </span>
                      ))}
                    </div>

                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-2 leading-relaxed font-sans">
                      {sys.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-zinc-100 dark:border-zinc-900/60 flex items-center justify-between text-[9px] font-sans">
                    <span className="text-zinc-450 dark:text-zinc-500 truncate max-w-[150px]">{sys.metrics}</span>
                    <span className={`flex items-center gap-1 font-bold ${isActive ? 'text-sky-500' : 'text-zinc-400 group-hover:text-zinc-100'}`}>
                      Live Demo <ArrowRight size={8} />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredSystems.length === 0 && (
            <div className="col-span-full py-16 text-center text-zinc-500 text-xs font-sans border border-dashed border-zinc-200 dark:border-zinc-900 rounded-2xl">
              No matching systems catalogued for this category.
            </div>
          )}
        </div>

        {/* Right Side: High-Visual Interactive Business Simulator */}
        <div id="simulation-specs-sandbox-right-panel" className="lg:col-span-6 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 p-6 rounded-3xl sticky top-24 space-y-6">
          
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-sans text-zinc-400 dark:text-zinc-500 uppercase flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-sky-500 animate-pulse inline-block" />
              Live Workspace Simulator
            </span>
            <span className="text-[9px] font-sans bg-sky-500/5 text-sky-500 border border-sky-500/10 px-2 py-0.5 rounded uppercase">
              100% Client-Owned
            </span>
          </div>

          <div className="space-y-1 pb-4 border-b border-zinc-250 dark:border-zinc-900">
            <h3 className="text-xl font-sans font-[800] text-zinc-900 dark:text-white flex items-center gap-2">
              {activeSystem.title}
            </h3>
            <p className="text-xs text-zinc-505 dark:text-zinc-400 leading-relaxed mt-2">
              {activeSystem.description}
            </p>
          </div>

          {/* Interactive Live Workspace Simulator depending on chosen activeSystemId */}
          <div className="bg-zinc-100 dark:bg-[#0c0c0e] rounded-2xl border border-zinc-200 dark:border-zinc-900 p-4 min-h-[300px] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-radial-gradient from-sky-500/5 to-transparent pointer-events-none" />

            <InteractiveSystemSimulator systemId={activeSystem.id} />
          </div>

          {/* Configured system keys */}
          <div className="space-y-2">
            <h5 className="text-[10px] font-sans text-zinc-400 uppercase tracking-wider">Integrations Linked</h5>
            <div className="flex flex-wrap gap-1.5">
              {activeSystem.integrations.map((tool) => (
                <span
                  key={tool}
                  className="text-[9px] font-sans px-2 py-0.5 rounded bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-850 text-sky-400"
                >
                  ✔ {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Performance Commitments */}
          <div className="space-y-2">
            <h5 className="text-[10px] font-sans text-zinc-400 uppercase tracking-wider">Estimated Launch Metric Impact</h5>
            <div className="bg-white dark:bg-zinc-900 px-4 py-3 rounded-xl border border-zinc-200/40 dark:border-zinc-900 flex items-center justify-between text-xs">
              <span className="text-zinc-505 dark:text-zinc-400">Target Audit Outcome:</span>
              <span className="text-sky-500 font-bold font-sans">{activeSystem.metrics}</span>
            </div>
          </div>

          <button
             id="systems-catalog-start-btn-scope"
             onClick={() => window.open('https://calendly.com/mavzenai/30min', '_blank')}
             className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-zinc-950 rounded-xl text-xs font-bold uppercase flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
          >
            <span>Request In-house Deployment Audit</span>
            <ArrowRight size={12} />
          </button>
        </div>

      </div>

      <SectionDivider />

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl font-display font-extrabold tracking-tighter text-zinc-900 dark:text-white">
            Questions worth asking
          </h2>
        </div>

        <FAQSection items={SYSTEMS_FAQ_ITEMS} />
      </section>

    </div>
  );
}

// ----------------------------------------------------
// HIGH-FIDELITY LIVE INTERACTIVE SIMULATOR FOR D2C WORKFLOWS
// ----------------------------------------------------
function InteractiveSystemSimulator({ systemId }: { systemId: string }) {
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(false);

  // Restart steps on system changed
  useEffect(() => {
    setStep(0);
    setTyping(false);
  }, [systemId]);

  // Handle Automatic timer loop sequences for realism
  useEffect(() => {
    if (step === 0) {
      const t = setTimeout(() => {
        setTyping(true);
        const t2 = setTimeout(() => {
          setTyping(false);
          setStep(1);
        }, 1500);
        return () => clearTimeout(t2);
      }, 1000);
      return () => clearTimeout(t);
    }
    if (step === 1) {
      const t = setTimeout(() => {
        setTyping(true);
        const t2 = setTimeout(() => {
          setTyping(false);
          setStep(2);
        }, 1800);
        return () => clearTimeout(t2);
      }, 2000);
      return () => clearTimeout(t);
    }
    if (step === 2) {
      const t = setTimeout(() => {
        setStep(3);
      }, 2500);
      return () => clearTimeout(t);
    }
  }, [step, systemId]);

  // Render WhatsApp Agent Simulator
  if (systemId === 'whatsapp-interaction') {
    return (
      <div className="flex flex-col h-full justify-between gap-4 font-sans">
        {/* iOS Phone Shell Wrapper Mockup inside sandbox */}
        <div className="bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-xl overflow-hidden shadow-md flex-1 flex flex-col max-h-[250px]">
          {/* Header */}
          <div className="bg-zinc-100 dark:bg-zinc-950 p-2 border-b border-zinc-250 dark:border-zinc-850 flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-sky-500/20 text-sky-500 flex items-center justify-center text-[10px] font-bold">
              M
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-805 dark:text-zinc-200">Mavzen Commerce Bot</p>
              <p className="text-[8px] text-zinc-400">Autonomous Assistant</p>
            </div>
          </div>

          {/* Conversation Bubble Stream */}
          <div className="p-3 flex-1 overflow-auto space-y-2 text-[10.5px]">
            <div className="text-right">
              <span className="inline-block bg-sky-500 text-zinc-950 px-3 py-1.5 rounded-lg rounded-tr-none text-left">
                Hey! Do you have the Chelsea Boots in size 10 in stock? Which shop can I view them?
              </span>
            </div>

            {step >= 1 && (
              <div>
                <span className="inline-block bg-white dark:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-800 px-3 py-1.5 rounded-lg rounded-tl-none text-zinc-800 dark:text-zinc-300">
                  Checking active warehouse inventory catalogs... Yes! We have 4 pairs of the Chelsea Boots in size 10 in our Soho studio.
                </span>
              </div>
            )}

            {step === 1 && typing && (
              <div className="text-left">
                <span className="inline-flex gap-1 items-center bg-zinc-200/50 dark:bg-zinc-800 px-2.5 py-1.5 rounded-lg">
                  <span className="h-1.5 w-1.5 bg-zinc-400 rounded-full animate-bounce" />
                  <span className="h-1.5 w-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </span>
              </div>
            )}

            {step >= 2 && (
              <div className="text-right">
                <span className="inline-block bg-sky-500 text-zinc-950 px-3 py-1.5 rounded-lg rounded-tr-none text-left">
                  Please reserve size 10 boots for me under Robert.
                </span>
              </div>
            )}

            {step >= 3 && (
              <div>
                <span className="inline-block bg-white dark:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-800 px-3 py-1.5 rounded-lg rounded-tl-none text-zinc-800 dark:text-sky-400 font-bold border-sky-500/20 shadow-xs">
                  Done, Robert! Reserved at Soho until 8 PM tonight. I also compiled a secure checkout link if you prefer instant delivery: <span className="underline text-sky-400">shopify.pay/boots10</span>
                </span>
              </div>
            )}

            {step < 3 && typing && (
              <div className="text-left">
                <span className="inline-flex gap-1 items-center bg-zinc-200/50 dark:bg-zinc-800 px-2.5 py-1.5 rounded-lg">
                  <span className="h-1.5 w-1.5 bg-sky-500 rounded-full animate-bounce" />
                  <span className="h-1.5 w-1.5 bg-sky-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 bg-sky-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] font-sans text-zinc-455 dark:text-zinc-500">
          <span>Active Loop Progress: {step}/3 Steps</span>
          <button id="ws-btn-sim-reset" onClick={() => setStep(0)} className="text-sky-500 hover:underline">Re-launch simulation</button>
        </div>
      </div>
    );
  }

  // Render Cart Recovery Agent Simulator
  if (systemId === 'cart-recovery') {
    return (
      <div className="flex flex-col h-full justify-between gap-4 font-sans">
        
        {/* Abandoned Cart Box */}
        <div className="bg-zinc-200 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 space-y-3 flex-1 flex flex-col justify-center">
          
          <div className="flex items-center justify-between border-b border-zinc-300 dark:border-zinc-800 pb-2 text-xs">
            <div>
              <span className="font-bold text-zinc-900 dark:text-white">Checkout Abandoned:</span>
              <span className="text-zinc-500 ml-1">Emma Wood</span>
            </div>
            <span className="text-[10px] font-sans text-zinc-400">Total: $140.00</span>
          </div>

          <div className="space-y-2.5 text-[11px] font-sans">
            <div className="flex justify-between items-center bg-white dark:bg-zinc-950 p-2 rounded border border-zinc-150 dark:border-zinc-850">
              <span className="text-zinc-500">Step 1: Wait delay trigger (35m)</span>
              <span className="text-sky-500 font-bold">Passed</span>
            </div>

            <div className={`flex justify-between items-center p-2 rounded border transition-all ${
              step >= 1 ? 'bg-white dark:bg-zinc-950 border-sky-400' : 'bg-transparent text-zinc-650'
            }`}>
              <span>Step 2: Dispatch WhatsApp alert</span>
              {step >= 1 ? (
                <span className="text-sky-500 font-bold">Dispatched</span>
              ) : (
                <span className="text-zinc-650">Waiting</span>
              )}
            </div>

            {step >= 1 && (
              <div className="bg-sky-500/5 border border-sky-500/10 p-2.5 rounded-lg text-[10px] font-sans leading-relaxed text-zinc-700 dark:text-zinc-300">
                <strong>Dispatched message:</strong> "Hey Emma! I noticed you checked out but left our Oversized Linen Shirt behind. Here's a 10% coupon: <strong>RECOVER10</strong> to get free shipping!"
              </div>
            )}

            {step >= 2 && (
              <div className="flex justify-between items-center bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 p-2.5 rounded-lg font-sans font-bold">
                <span>✔ Order Completed! Emma purchased boots.</span>
                <span>Revenue Recovered: +$126.00</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] font-sans text-zinc-455 dark:text-zinc-500">
          <span>Active Loop Progress: {step}/2 Steps</span>
          <button id="cart-simulation-btn-reset" onClick={() => setStep(0)} className="text-sky-500 hover:underline">Re-launch simulation</button>
        </div>
      </div>
    );
  }

  // Render CRM pipeline Simulator
  if (systemId === 'crm-followup') {
    return (
      <div className="flex flex-col h-full justify-between gap-4 font-sans">
        
        {/* Deal Kanban board slots */}
        <div className="grid grid-cols-3 gap-2 flex-1 items-stretch">
          
          {/* Column 1 */}
          <div className="bg-zinc-200/50 dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-900 rounded-lg p-2 flex flex-col gap-1.5">
            <span className="text-[8px] font-sans uppercase text-zinc-450 dark:text-zinc-500 tracking-wider">01 Leads</span>
            {step === 0 && (
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded shadow-xs text-[10px]">
                <p className="font-bold">Alex Rivera</p>
                <p className="text-[8px] text-zinc-500">Rivera Brand - Tier 1</p>
                <div className="mt-1 h-1.5 w-full bg-sky-500/20 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 w-[95%]" />
                </div>
              </div>
            )}
          </div>

          {/* Column 2 */}
          <div className="bg-zinc-200/50 dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-900 rounded-lg p-2 flex flex-col gap-1.5">
            <span className="text-[8px] font-sans uppercase text-zinc-450 dark:text-zinc-500 tracking-wider font-bold">02 Follow-up</span>
            {step === 1 && (
              <div className="bg-white dark:bg-zinc-900 border border-sky-500/30 p-2 rounded shadow-xs text-[10px] space-y-1">
                <p className="font-bold">Alex Rivera</p>
                <p className="text-[8px] text-sky-400">LinkedIn outreach sent</p>
                <div className="text-[7.5px] bg-sky-500/5 p-1 border border-sky-500/10 text-zinc-650 dark:text-zinc-400 rounded leading-tight">
                  "Congrats on the recent Shopify store growth, Alex..."
                </div>
              </div>
            )}
          </div>

          {/* Column 3 */}
          <div className="bg-zinc-200/50 dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-900 rounded-lg p-2 flex flex-col gap-1.5">
            <span className="text-[8px] font-sans uppercase text-zinc-450 dark:text-zinc-500 tracking-wider font-bold">03 Booked</span>
            {step >= 2 && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-2 rounded shadow-xs text-[10px] space-y-1">
                <p className="font-bold font-sans text-zinc-900 dark:text-white">Alex Rivera</p>
                <p className="text-[8.5px] text-emerald-500 font-sans font-bold uppercase inline-block">Cal.com Slot Booked</p>
                <p className="text-[8px] text-zinc-500">"Shopify Audit Call Scheduled"</p>
              </div>
            )}
          </div>

        </div>

        <div className="flex items-center justify-between text-[11px] font-sans text-zinc-450 dark:text-zinc-500 mt-2">
          <span>Active Pipeline: Lead moved to Booked</span>
          <button id="crm-simulation-btn-reset" onClick={() => setStep(0)} className="text-sky-500 hover:underline">Re-launch simulation</button>
        </div>
      </div>
    );
  }

  // Render Review alert Simulator
  if (systemId === 'review-alert') {
    return (
      <div className="flex flex-col h-full justify-between gap-4 font-sans justify-center">
        
        <div className="bg-zinc-200 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 space-y-3.5 flex-1 flex flex-col justify-center">
          
          {/* Incoming Yelp/Google review entry */}
          <div className="bg-white dark:bg-zinc-950 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-850 space-y-1">
            <div className="flex justify-between items-center text-[10px]">
              <span className="font-bold font-sans">Google Review: John S.</span>
              <div className="flex gap-0.5 text-amber-500">
                <Star size={10} fill="currentColor" />
                <Star size={10} fill="currentColor" />
                <Star size={10} />
                <Star size={10} />
                <Star size={10} />
              </div>
            </div>
            <p className="text-[10.5px] text-zinc-500 leading-snug">
              "The shipping arrived 3 days late. The product quality is fine, but the delivery delay was highly irritating."
            </p>
          </div>

          {/* Real time sentiment alerts */}
          {step >= 1 && (
            <div className="bg-rose-500/5 border border-rose-500/20 p-2.5 rounded-lg text-[10.5px] space-y-1 leading-snug flex items-start gap-2">
              <AlertTriangle size={14} className="text-rose-505 shrink-0 mt-0.5 animate-pulse" />
              <div>
                <span className="font-bold text-rose-500">[Slack Alert Dispatched] sentiment_low (0.18/1.0)</span>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">Alert triggered to channel #review-alerts in 12s.</p>
              </div>
            </div>
          )}

          {/* Autopilot Suggested Reply */}
          {step >= 2 && (
            <div className="bg-sky-505/5 border border-sky-500/20 p-2.5 rounded-lg text-[10.5px] space-y-1">
              <span className="font-bold text-sky-400">Suggested AI Response:</span>
              <p className="text-zinc-650 dark:text-zinc-300 italic">"Hey John, we are so sorry for the courier delay! We have compiled an $11 gift card and are messaging you order updates..."</p>
              <div className="pt-2 flex justify-end gap-1 text-[9px] font-sans">
                <span className="px-2 py-0.5 bg-sky-500 text-zinc-950 rounded font-bold">Approve Action</span>
              </div>
            </div>
          )}

        </div>

        <div className="flex items-center justify-between text-[11px] font-sans text-zinc-450 dark:text-zinc-500">
          <span>Review response pipeline latency: 15s</span>
          <button id="review-simulation-btn-reset" onClick={() => setStep(0)} className="text-sky-500 hover:underline">Re-launch simulation</button>
        </div>
      </div>
    );
  }

  // Fallback / Other Simulation templates
  return (
    <div className="flex flex-col h-full justify-between gap-4 font-sans text-center">
      
      <div className="bg-zinc-200/50 dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-900 rounded-xl p-6 flex flex-col items-center justify-center space-y-4 flex-1">
        <div className="p-3 bg-sky-500/10 text-sky-500 rounded-full w-fit">
          <Database size={18} className="animate-spin [animation-duration:8s]" />
        </div>
        <div className="space-y-1.5 max-w-sm">
          <h4 className="text-xs font-bold text-zinc-805 dark:text-zinc-200">Autonomous Operations Trigger</h4>
          <p className="text-[10.5px] text-zinc-500 dark:text-zinc-400 leading-relaxed leading-normal">
            We config this custom system container on your private cloud hosting cluster. Click any category box on the left to map details.
          </p>
        </div>

        {/* Real-time Event timeline */}
        <div className="flex items-center gap-2 text-[10px] font-sans text-sky-500">
          <Check size={11} /> <span>Cloud Credentials Configured</span>
          <span>•</span>
          <Check size={11} /> <span>Security Vault Secure</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10.5px] font-sans text-zinc-455 dark:text-zinc-500">
        <span>Staging Deployment Active</span>
        <button id="system-simulation-relaunch-btn" onClick={() => setStep(0)} className="text-sky-500 hover:underline">Reset pipeline</button>
      </div>

    </div>
  );
}
