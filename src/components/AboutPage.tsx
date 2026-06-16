import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, Heart, Cpu, FileText, Check, ArrowRight, ShieldCheck, 
  Database, Users, Terminal, Award, HelpCircle, Code, Zap, Sliders, RefreshCw
} from 'lucide-react';

interface FounderPhilosophy {
  title: string;
  desc: string;
  icon: React.ElementType;
}

export default function AboutPage({ onOpenConsult }: { onOpenConsult: () => void }) {
  const [selectedStack, setSelectedStack] = useState<string>('postgres');
  const [selectedCRM, setSelectedCRM] = useState<string>('hubspot');
  const [activeValueTab, setActiveValueTab] = useState<number>(0);

  const philosophies: FounderPhilosophy[] = [
    {
      title: 'Business Outcomes First',
      desc: 'We don\'t automate for the sake of automation. Every system is engineered to reduce costs, improve customer experience, increase retention, or unlock operational efficiency.',
      icon: Briefcase
    },
    {
      title: 'You Own Everything',
      desc: 'Every workflow, integration, database, and automation belongs entirely to your business. No platform lock-ins. No dependency on proprietary systems.',
      icon: ShieldCheck
    },
    {
      title: 'Built To Scale With Growth',
      desc: 'As your order volume, customer conversations, and operational complexity grow, your infrastructure scales alongside your business without requiring proportional increases in headcount.',
      icon: Sliders
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* 1. Header & Intro */}
      <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-black tracking-[-0.03em] text-zinc-900 dark:text-white leading-[1.05] lg:whitespace-nowrap">
          About Mavzen AI
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          We are a principal A.I. systems architect and consulting team. We align corporate structures with agentic pipelines, build verified cloud codebases, and hand you total technical sovereignty.
        </p>
      </div>

      {/* 2. Philosophy Columns & Detailed Bio Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch pt-2">
        
        {/* Left column: Davis Bio */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[9px] font-sans text-zinc-400 uppercase tracking-widest">ABOUT THE FOUNDER</span>
            
            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
              Tanishq Girhare
            </h3>
            
            <div className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed space-y-4">
              <p>
                Tanishq works directly with D2C founders to identify operational bottlenecks, customer experience gaps, and revenue opportunities across their business.
              </p>
              <p>
                By analyzing support workflows, retention systems, reporting processes, and operational inefficiencies, Mavzen designs AI infrastructure that creates measurable business outcomes, not just more automation.
              </p>
            </div>
          </div>

          {/* Sourced Team Info Box */}
          <div className="bg-zinc-50 dark:bg-zinc-950 p-5 rounded-2xl border border-zinc-200/50 dark:border-zinc-900 space-y-2">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-rose-500" />
              <h5 className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">The Sourced Team Model</h5>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
              We leverage an elite roster of joint engineering partners. By handpicking developers who specialize in your specific backend stack, we guarantee absolute code quality and speed.
            </p>
          </div>
        </div>

        {/* Right column: Values Pills */}
        <div className="lg:col-span-7 space-y-4">
          <span className="text-[9px] font-sans text-zinc-400 uppercase tracking-widest block mb-1">OUR OPERATING PRINCIPLES</span>
          
          <div className="space-y-3">
            {philosophies.map((ph, idx) => {
              const ValueIcon = ph.icon;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveValueTab(idx)}
                  className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex gap-4 ${
                    activeValueTab === idx
                      ? 'bg-white dark:bg-zinc-900 border-rose-500 shadow-md ring-1 ring-rose-500/5'
                      : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-900/60 hover:border-zinc-300'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl shrink-0 h-10 w-10 flex items-center justify-center ${activeValueTab === idx ? 'bg-rose-500/10 text-rose-500' : 'bg-zinc-50 dark:bg-zinc-950 text-zinc-450'}`}>
                    <ValueIcon size={16} />
                  </div>
                  <div className="space-y-1">
                    <h4 className={`text-xs font-bold font-sans tracking-wide ${activeValueTab === idx ? 'text-rose-550' : 'text-zinc-805 dark:text-zinc-200'}`}>
                      {ph.title}
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-450 leading-relaxed">
                      {ph.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 3. Why Brands Choose Mavzen */}
      <section id="why-brands-choose" className="space-y-10">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Why Leading Brands Choose Mavzen
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
            We don't sell pre-packaged subscriptions. We engineer bespoke operational software directly inside your cloud architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          
          {/* Card 1: Deploy Fast */}
          <div className="bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border border-zinc-200/60 dark:border-zinc-900 p-6 rounded-3xl flex gap-5 hover:border-rose-500/30 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="p-3 bg-rose-500/10 text-rose-500 rounded-2xl h-fit shrink-0 relative z-10">
              <Zap size={22} className="stroke-[2.5]" />
            </div>
            <div className="space-y-2 relative z-10">
              <h4 className="text-sm font-sans font-[800] text-zinc-900 dark:text-white">
                Deploy Fast
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
                We ship your initial system within weeks, not quarters. No endless discovery phases, zero corporate bureaucracy. Just production-grade code running live.
              </p>
            </div>
          </div>

          {/* Card 2: Built Around Your Business */}
          <div className="bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border border-zinc-200/60 dark:border-zinc-900 p-6 rounded-3xl flex gap-5 hover:border-indigo-500/30 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-2xl h-fit shrink-0 relative z-10">
              <Sliders size={22} className="stroke-[2.5]" />
            </div>
            <div className="space-y-2 relative z-10">
              <h4 className="text-sm font-sans font-[800] text-zinc-900 dark:text-white">
                Built Around Your Business
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
                We do not squeeze you into generic software templates. We write proprietary automated workflows designed specifically around your high-leverage client touchpoints.
              </p>
            </div>
          </div>

          {/* Card 3: No Extra Headcount */}
          <div className="bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border border-zinc-200/60 dark:border-zinc-900 p-6 rounded-3xl flex gap-5 hover:border-emerald-500/30 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl h-fit shrink-0 relative z-10">
              <Users size={22} className="stroke-[2.5]" />
            </div>
            <div className="space-y-2 relative z-10">
              <h4 className="text-sm font-sans font-[800] text-zinc-900 dark:text-white">
                No Extra Headcount
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
                No need to recruit expensive specialized developers. We train your existing technical and operations team on exactly how to run and maintain the clean software we write.
              </p>
            </div>
          </div>

          {/* Card 4: Continuous Improvement */}
          <div className="bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border border-zinc-200/60 dark:border-zinc-900 p-6 rounded-3xl flex gap-5 hover:border-amber-500/30 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="p-3 bg-amber-500/10 text-amber-500 rounded-2xl h-fit shrink-0 relative z-10">
              <RefreshCw size={22} className="stroke-[2.5]" />
            </div>
            <div className="space-y-2 relative z-10">
              <h4 className="text-sm font-sans font-[800] text-zinc-900 dark:text-white">
                Continuous Improvement
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
                Your brand's system never degrades. We package active monthly optimization and conversational routing refinements with every custom system container we launch.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3.5 Team / Experts Section */}
      <section className="space-y-8 pt-4">
        <div className="text-center space-y-2">
          <span className="text-[9px] font-sans text-zinc-500 uppercase tracking-widest block">
            THE MAVZEN TEAM
          </span>
          <h3 className="font-sans text-3xl font-[800] tracking-[-0.03em] text-zinc-950 dark:text-white">
            The Minds Behind Scale
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              name: 'Tanishq Girhare',
              role: 'FOUNDER & INFRASTRUCTURE STRATEGIST',
              bio: 'Tanishq works directly with founders to identify revenue leaks, operational bottlenecks, and customer experience challenges before designing AI infrastructure tailored to business growth.',
              stack: 'Systems Handoff, API Mapping'
            },
            {
              name: 'Dylan Scott',
              role: 'CUSTOMER EXPERIENCE LEAD',
              bio: 'Dylan focuses on customer support systems, retention workflows, and conversational AI deployments that improve customer satisfaction while reducing operational workload.',
              stack: 'Meta APIs, Retention Systems, CX Operations'
            },
            {
              name: 'Pritam Chakravarthy',
              role: 'OPERATIONS SPECIALIST',
              bio: 'Pritam specializes in operational workflows, reporting systems, and backend process optimization that help brands scale without adding unnecessary complexity or overhead.',
              stack: 'Operations, Reporting Systems, Workflow Optimization'
            }
          ].map((member, i) => (
            <div key={i} className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 p-5 rounded-2xl flex flex-col justify-between h-[230px] hover:border-zinc-300 dark:hover:border-zinc-800 transition-colors">
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-sans font-bold text-zinc-900 dark:text-white">
                    {member.name}
                  </h4>
                  <p className="text-[10px] font-sans text-[#c20a26] dark:text-[#f43f5e] font-semibold uppercase mt-0.5">
                    {member.role}
                  </p>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed leading-normal line-clamp-4">
                  {member.bio}
                </p>
              </div>

              <div className="pt-2.5 border-t border-zinc-200/50 dark:border-zinc-900/60 flex items-center justify-between text-[9px] font-sans">
                <span className="text-zinc-400">Tailored Stack:</span>
                <span className="text-zinc-700 dark:text-zinc-300 font-bold">{member.stack}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
