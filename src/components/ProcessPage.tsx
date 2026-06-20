import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, ArrowRight, Calendar, Target, Award, Sparkles, Shield, RefreshCw, BarChart, ChevronRight
} from 'lucide-react';
import FAQSection from './FAQSection';

interface TimelineStep {
  id: string;
  week: string;
  title: string;
  target: string;
  deliverables: string[];
  metrics: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  color: string;
  bgGlow: string;
}

const PROCESS_FAQ_ITEMS = [
  {
    id: 'process-faq-1',
    question: 'How do we get started?',
    answer: 'We begin with a discovery session to understand your customer journey, operational workflows, and growth objectives. From there, we identify the highest-impact opportunities and design a custom implementation roadmap.'
  },
  {
    id: 'process-faq-2',
    question: 'How long does implementation take?',
    answer: 'Most systems are deployed within 2–6 weeks depending on complexity, integrations, and business requirements.'
  },
  {
    id: 'process-faq-3',
    question: 'Do I need technical knowledge to use the systems?',
    answer: 'No. We build the infrastructure and ensure your team can operate it without needing engineering expertise.'
  },
  {
    id: 'process-faq-4',
    question: 'Will this replace my existing tools?',
    answer: 'Not necessarily. We integrate with the tools you already use whenever possible and only recommend changes when they create meaningful business value.'
  },
  {
    id: 'process-faq-5',
    question: 'What happens after deployment?',
    answer: 'We provide onboarding, testing, optimization, and ongoing support to ensure your systems continue performing as your business grows.'
  },
  {
    id: 'process-faq-6',
    question: 'How do you identify what should be automated?',
    answer: 'We analyze your workflows, customer interactions, and operational bottlenecks to determine where automation can generate the highest ROI.'
  },
  {
    id: 'process-faq-7',
    question: 'Is this suitable for smaller brands?',
    answer: 'Yes. Whether you\'re an emerging brand or an established enterprise, we design solutions around your current stage and growth goals.'
  },
  {
    id: 'process-faq-8',
    question: 'How do you measure success?',
    answer: 'Success is measured through operational efficiency, response times, customer satisfaction, retention, and the reduction of manual workload.'
  }
];

export default function ProcessPage({ onOpenConsult }: { onOpenConsult: () => void }) {
  const [activeStepId, setActiveStepId] = useState<string>('week1');

  const steps: TimelineStep[] = [
    {
      id: 'week1',
      week: 'Week 1',
      title: 'Audit & Strategy',
      target: 'Deep-dive alignment and system architecture design tailored directly to your commerce flow.',
      deliverables: [
        'Complete systems flow mapping & friction analysis',
        'Tool alignment and live data integration inventory',
        'High-contrast operational blueprint layout'
      ],
      metrics: '',
      icon: Target,
      color: 'text-rose-500',
      bgGlow: 'from-rose-500/10 to-transparent'
    },
    {
      id: 'week2',
      week: 'Week 2',
      title: 'System Design',
      target: 'Interactive design structuring and custom rules database configurations validation.',
      deliverables: [
        'Customer-facing message mockups and rules layouts',
        'Active systems connection maps and API triggers schema',
        'Failsafe logic logic-gate fallback pathways diagram'
      ],
      metrics: '',
      icon: Calendar,
      color: 'text-indigo-500',
      bgGlow: 'from-indigo-500/10 to-transparent'
    },
    {
      id: 'week3-4',
      week: 'Weeks 3–4',
      title: 'Build & Integration',
      target: 'Production-grade development, secure container packaging, and rigorous end-to-end sandbox testing.',
      deliverables: [
        'Proprietary server-side codebase built explicitly for your brand',
        'Safe, encrypted third-party credentials integration',
        'Simulated user staging logs verification and speed testing'
      ],
      metrics: '',
      icon: Sparkles,
      color: 'text-emerald-500',
      bgGlow: 'from-emerald-500/10 to-transparent'
    },
    {
      id: 'week5',
      week: 'Week 5',
      title: 'Launch',
      target: 'Active production deployment of your custom AI systems directly inside your cloud environment.',
      deliverables: [
        'Deployed system containers configured inside your AWS/GCP accounts',
        'Live system-performance dashboards & error alerts monitor',
        'Full team handoff and walkthrough training sessions'
      ],
      metrics: '',
      icon: Award,
      color: 'text-sky-500',
      bgGlow: 'from-sky-500/10 to-transparent'
    },
    {
      id: 'week6',
      week: 'Week 6+',
      title: 'Optimisation',
      target: 'Continuous post-launch calibrations, prompt optimizations, and database scaling updates.',
      deliverables: [
        'Ongoing performance tracking and conversion rate optimization',
        'Dynamic conversational routing updates and model upgrades',
        'Monthly efficiency metrics and lifetime value growth reviews'
      ],
      metrics: '',
      icon: RefreshCw,
      color: 'text-amber-500',
      bgGlow: 'from-amber-500/10 to-transparent'
    }
  ];

  const activeStep = steps.find(s => s.id === activeStepId) || steps[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* 1. Header Section */}
      <motion.div 
        className="text-center space-y-6 max-w-4xl mx-auto pt-8 sm:pt-12"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.h1 
          variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16,1,0.3,1] } } }}
          className="text-5xl sm:text-6xl md:text-7xl font-sans font-extrabold tracking-[-0.04em] text-zinc-950 dark:text-white leading-[1.02]"
        >
          How We Work
        </motion.h1>
        <motion.p 
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16,1,0.3,1] } } }}
          className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto"
        >
          We don't do endless strategy slides. We build production-ready software directly inside your cloud accounts in weeks with a founder-friendly, structured path.
        </motion.p>
      </motion.div>

      {/* 2. Interactive Premium Timeline Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 items-stretch">
        
        {/* Left Hand: Vertical Progress Timeline buttons */}
        <div className="lg:col-span-5 flex flex-col gap-3 max-h-[80vh] overflow-y-auto pr-2">
          {steps.map((step, idx) => {
            const isActive = step.id === activeStepId;
            const IconComponent = step.icon;
            
            return (
              <button
                id={`timeline-step-btn-${step.id}`}
                key={step.id}
                onClick={() => setActiveStepId(step.id)}
                className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden flex items-center justify-between gap-4 ${
                  isActive
                    ? 'bg-zinc-50 dark:bg-zinc-950/80 border-rose-500 shadow-lg shadow-rose-500/5 ring-1 ring-rose-500/20'
                    : 'bg-white dark:bg-zinc-900/50 border-zinc-200/80 dark:border-zinc-900/80 hover:border-zinc-300 dark:hover:border-zinc-800'
                }`}
              >
                {/* Active glow gradient */}
                {isActive && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${step.bgGlow} opacity-30 pointer-events-none`} />
                )}

                <div className="flex items-center gap-4 relative z-10 w-full truncate">
                  {/* Step visual indicator ball */}
                  <div className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 border ${
                    isActive 
                      ? 'bg-rose-500 border-rose-500 text-white' 
                      : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-900 text-zinc-400'
                  }`}>
                    <IconComponent size={20} />
                  </div>

                  <div className="truncate space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-sans font-bold uppercase tracking-wider ${isActive ? 'text-rose-500' : 'text-zinc-400'}`}>
                        {step.week}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                      <span className="text-[10px] font-sans text-zinc-500 dark:text-zinc-400 truncate">
                        {step.metrics}
                      </span>
                    </div>
                    <h3 className="text-sm font-sans font-[800] text-zinc-900 dark:text-zinc-100 truncate">
                      {step.title}
                    </h3>
                  </div>
                </div>

                <div className={`p-1.5 rounded-lg shrink-0 transition-transform ${isActive ? 'bg-rose-500/10 text-rose-500 translate-x-1' : 'text-zinc-300 dark:text-zinc-700'}`}>
                  <ChevronRight size={16} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Hand: Structured modern card detail board */}
        <div className="lg:col-span-7 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-900/80 p-6 md:p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden h-[540px]">
          <div className="absolute inset-0 grid-lens-pattern opacity-[0.04] pointer-events-none" />
          <div className="absolute top-[-100px] right-[-100px] w-80 h-80 rounded-full bg-rose-500/5 blur-[100px] pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="space-y-6 flex-1 flex flex-col justify-between relative z-10"
            >
              <div className="space-y-5">
                {/* Header */}
                <div className="flex justify-between items-start border-b border-zinc-200 dark:border-zinc-900 pb-4">
                  <div className="space-y-1">
                    <span className="text-[9px] font-sans font-bold tracking-wider uppercase text-rose-500">
                      MILESTONE FOCUS
                    </span>
                    <h3 className="text-xl sm:text-2xl font-sans font-[800] text-zinc-950 dark:text-white leading-tight">
                      {activeStep.title} ({activeStep.week})
                    </h3>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-sans bg-rose-500/10 border border-rose-500/20 rounded-md text-rose-500">
                    {activeStep.metrics}
                  </span>
                </div>

                {/* Target description */}
                <div className="space-y-2">
                  <span className="text-[10px] font-sans text-zinc-400 uppercase tracking-wider block">Target Outcomes</span>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium">
                    {activeStep.target}
                  </p>
                </div>

                {/* Core deliverables bullet cards list */}
                <div className="space-y-3 pt-2">
                  <span className="text-[10px] font-sans text-zinc-400 uppercase tracking-wider block">Tangible Deliverables Transferred</span>
                  <div className="grid grid-cols-1 gap-2.5">
                    {activeStep.deliverables.map((dl, idx) => (
                      <div key={idx} className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-900 p-3.5 rounded-xl flex items-center gap-3">
                        <div className="h-5 w-5 rounded-full bg-rose-500/15 border border-rose-500/20 flex items-center justify-center text-rose-500 shrink-0">
                          <Check size={11} className="stroke-[3]" />
                        </div>
                        <span className="text-xs font-sans text-zinc-750 dark:text-zinc-300 leading-tight">
                          {dl}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons at card bottom */}
              <div className="pt-6 border-t border-zinc-200/50 dark:border-zinc-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[10px] font-sans text-zinc-450 dark:text-zinc-500">
                  Ready to map out custom timelines for your stack?
                </span>
                <button
                  id={`process-blueprint-btn-${activeStep.id}`}
                  onClick={() => window.open('https://calendly.com/mavzenai/30min', '_blank')}
                  className="w-full sm:w-auto px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <span>Start the Consult</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* 3. FAQ Section */}
      <motion.section 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-4xl sm:text-5xl font-sans font-extrabold tracking-[-0.03em] text-zinc-900 dark:text-white">
            Frequently asked questions
          </h2>
        </div>

        <FAQSection items={PROCESS_FAQ_ITEMS} />
      </motion.section>

    </div>
  );
}
