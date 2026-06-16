import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, HelpCircle, ArrowRight, Zap, Target, Users, Code, RefreshCw, BarChart3, TrendingUp, Check, X
} from 'lucide-react';

interface ComparisonRow {
  aspect: string;
  traditional: { title: string; desc: string; bad: boolean };
  mavzen: { title: string; desc: string; good: boolean };
}

export default function WhyMavzenPage({ onOpenConsult }: { onOpenConsult: () => void }) {
  // ROI Calculator states
  const [dailyOrders, setDailyOrders] = useState<number>(150);
  const [hourlyRate, setHourlyRate] = useState<number>(25);

  const calculateROI = () => {
    const supportTicketsPerDay = dailyOrders * 0.15; // 15% ticket rate
    const monthlyTickets = supportTicketsPerDay * 30;
    const hoursSavedPerMonth = (monthlyTickets * 8) / 60; // 8 mins per ticket saved
    const manualCostSaved = Math.round(hoursSavedPerMonth * hourlyRate);
    
    // Abandoned carts (typically 70% of total checkouts, so dailyOrders is 30% of total carts, abandoned is 70/30 of daily orders)
    const abandonedCartsPerMonth = dailyOrders * (70 / 30) * 30;
    const cartRecoveryRate = 0.08; // 8% recovery with WhatsApp/Email AI
    const avgOrderValue = 85; // $85 average order value
    const revenueRecovered = Math.round(abandonedCartsPerMonth * cartRecoveryRate * avgOrderValue);
    
    const scaleFactor = Math.min(1.5, Math.max(0.5, dailyOrders / 150));
    const softwareSubscriptionFeesSaved = Math.round(1850 * scaleFactor);
    const totalImpact = manualCostSaved + revenueRecovered + softwareSubscriptionFeesSaved;

    return {
      tickets: Math.round(monthlyTickets),
      hoursSaved: Math.round(hoursSavedPerMonth),
      manualSaved: manualCostSaved,
      recoveredCartRevenue: revenueRecovered,
      saasSaved: softwareSubscriptionFeesSaved,
      totalImpact: totalImpact,
    };
  };

  const stats = calculateROI();

  const comparisonData: ComparisonRow[] = [
    {
      aspect: "Sovereignty & Code Ownership",
      traditional: { 
        title: "Traditional Agencies (SaaS lock-in)", 
        desc: "Build rules inside proprietary agency platforms. If you stop paying their expensive retainer or SaaS subscription, your systems immediately stop working.", 
        bad: true 
      },
      mavzen: { 
        title: "Mavzen Sovereign Operating System", 
        desc: "We write production-grade Express/TypeScript software and deploy standard container images in your own cloud accounts (AWS/GCP). You own 100% of the code forever. Zero ongoing seat fees.", 
        good: true 
      }
    },
    {
      aspect: "Data Movement & Coordination",
      traditional: { 
        title: "Disconnected Automation & Zapier", 
        desc: "Dozens of brittle, fragile Zaps trying to map Shopify events to Klaviyo. Frequent API schema breaks, silent task failures, and expensive transaction volume billing.", 
        bad: true 
      },
      mavzen: { 
        title: "Unified Operating Infrastructure", 
        desc: "A cohesive, host-locked data layer where events flow directly between your Shopify orders, CRM pipelines, and automated WhatsApp responders without third-party middleware limits.", 
        good: true 
      }
    },
    {
      aspect: "Operations Coverage",
      traditional: { 
        title: "Manual Headcount & 9-to-5 Staff", 
        desc: "Customer service departments and recovery coordinators typing replies manually. High error rates, customer friction during weekends, and hours of response lag.", 
        bad: true 
      },
      mavzen: { 
        title: "Sub-Second Autopilot Engine", 
        desc: "AI systems reply to inquiries, send abandoned card discount alerts, and reconcile invoices in under 800 milliseconds. 100% accurate, running 24/7/365 with perfect deterministic guardrails.", 
        good: true 
      }
    },
    {
      aspect: "Organizational Scalability",
      traditional: { 
        title: "Hiring Internal Developers & Onboarding", 
        desc: "Months spent sourcing, interviewing, and training software staff. High salary overhead, equity demands, benefits packages, and product knowledge churn risks.", 
        bad: true 
      },
      mavzen: { 
        title: "Specialized On-Demand Team", 
        desc: "One structured upfront scope. We assign the top 1% of backend developers explicitly matched to your stack, ship your fully-tested system in weeks, and train your current staff to maintain it.", 
        good: true 
      }
    },
    {
      aspect: "Investment & Billing Architecture",
      traditional: { 
        title: "Hourly Retainers & Vague Billing", 
        desc: "Vague 'consulting hours' bills with no direct link to actual business performance. Software development pipelines that drag on for quarters without launching.", 
        bad: true 
      },
      mavzen: { 
        title: "One-Time Fixed Capital Expenditure", 
        desc: "A clear, capped budget. We align directly on business-level deliverables (e.g. WhatsApp Cart recovery running at a tested milestone cost) with a guaranteed launch date.", 
        good: true 
      }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      
      {/* 1. Header Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-extrabold tracking-[-0.03em] text-zinc-950 dark:text-white leading-[1.05]">
          AI Operating System <br />
          <span className="text-sky-500">Built for Modern D2C Brands</span>
        </h2>
        <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          Mavzen builds custom AI infrastructure that automates critical operations, reduces costs, and increases efficiency.
        </p>
      </div>

      {/* 2. Key Paradigm Shifts (Comparison Bento Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Traditional Agency vs Mavzen OS */}
        <div className="bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-900 p-6 rounded-2xl flex flex-col justify-between space-y-6 relative group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="space-y-4 relative z-10">
            <div className="p-3 bg-sky-500/10 text-sky-500 rounded-xl w-fit">
              <Zap size={20} />
            </div>
            <h3 className="text-lg font-sans font-[800] text-zinc-900 dark:text-white">
              Traditional Agency vs. Mavzen Infrastructure
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Agencies lease you generic subscriptions on proprietary software, billing you indefinitely for minor revisions. Mavzen writes custom-tailored system containers that are deployed directly into your own AWS or GCP environment. You hold the keys, license-free, forever.
            </p>
          </div>
          <div className="border-t border-zinc-200/60 dark:border-zinc-900/80 pt-4 flex items-center justify-between text-[11px] font-sans text-sky-500 relative z-10 font-bold">
            <span>Sovereign Code Custody</span>
            <span>➔</span>
          </div>
        </div>

        {/* Card 2: Manual Operations vs Autopilot OS */}
        <div className="bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-900 p-6 rounded-2xl flex flex-col justify-between space-y-6 relative group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="space-y-4 relative z-10">
            <div className="p-3 bg-sky-500/10 text-sky-500 rounded-xl w-fit">
              <Target size={20} />
            </div>
            <h3 className="text-lg font-sans font-[800] text-zinc-900 dark:text-white">
              Manual Labors vs. Autopilot Infrastructure
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Stop forcing staff to copy metrics, answer standard shipping alerts, and dispatch invoices manually. Our platform unifies WhatsApp dialogs, CRM states, and invoice creation into automated systems executing in under 800ms.
            </p>
          </div>
          <div className="border-t border-zinc-200/60 dark:border-zinc-900/80 pt-4 flex items-center justify-between text-[11px] font-sans text-sky-500 relative z-10 font-bold">
            <span>Deterministic Workflow Speeds</span>
            <span>➔</span>
          </div>
        </div>

        {/* Card 3: Fragmented Software vs Coherent OS */}
        <div className="bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-900 p-6 rounded-2xl flex flex-col justify-between space-y-6 relative group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="space-y-4 relative z-10">
            <div className="p-3 bg-sky-500/10 text-sky-500 rounded-xl w-fit">
              <RefreshCw size={20} />
            </div>
            <h3 className="text-lg font-sans font-[800] text-zinc-900 dark:text-white">
              Brittle Middleware vs. Unified OS Channels
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              When software relies on 15 nested Zapier actions, your brand faces continuous pipeline breakages. Mavzen constructs highly integrated data pipelines, ensuring your customer records, order receipts, and WhatsApp interactions communicate natively.
            </p>
          </div>
          <div className="border-t border-zinc-200/60 dark:border-zinc-900/80 pt-4 flex items-center justify-between text-[11px] font-sans text-sky-500 relative z-10 font-bold">
            <span>Unified Execution Pipelines</span>
            <span>➔</span>
          </div>
        </div>

      </div>

      {/* 3. Deep-Dive Comparison (Paradigm Shift Cards) */}
      <div className="space-y-12">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <h3 className="text-2xl sm:text-4xl font-sans font-[800] tracking-[-0.02em] text-zinc-950 dark:text-white">
            How We Differ From Legacy Options
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-450 leading-relaxed font-sans max-w-md mx-auto">
            A granular comparison of traditional agency workflows and pre-packaged subscriptions against our private sovereign operating systems.
          </p>
        </div>

        <div className="space-y-6 max-w-5xl mx-auto">
          {comparisonData.map((row, idx) => (
            <div
              key={idx}
              className="bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md border border-zinc-200/60 dark:border-zinc-900/60 p-6 rounded-3xl relative overflow-hidden transition-all duration-300 hover:border-zinc-350 dark:hover:border-zinc-800 space-y-4 shadow-sm"
            >
              {/* Header Dimension Title */}
              <div className="flex items-center gap-3 border-b border-zinc-150 dark:border-zinc-900/60 pb-3">
                <div className="h-6 w-6 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-500 text-[10px] sm:text-[11px] font-sans font-bold">
                  0{idx + 1}
                </div>
                <h4 className="text-sm font-sans font-[800] text-zinc-800 dark:text-zinc-100 tracking-tight">
                  {row.aspect}
                </h4>
              </div>

              {/* Side-by-Side Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                {/* Legacy Column */}
                <div className="bg-zinc-50/50 dark:bg-zinc-900/20 p-5 rounded-2xl border border-zinc-150/60 dark:border-zinc-900/30 flex flex-col justify-between space-y-3 relative group">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <X size={14} className="text-rose-500 shrink-0 stroke-[2.5]" />
                      <span className="text-[11px] font-sans text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                        Legacy Traditional Approach
                      </span>
                    </div>
                    <p className="text-xs font-sans font-bold text-zinc-900 dark:text-white leading-tight">
                      {row.traditional.title}
                    </p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-450 leading-relaxed font-sans">
                      {row.traditional.desc}
                    </p>
                  </div>
                </div>

                {/* Mavzen OS Column */}
                <div className="bg-sky-500/5 dark:bg-sky-950/10 p-5 rounded-2xl border border-sky-500/20 dark:border-sky-500/10 flex flex-col justify-between space-y-3 relative overflow-hidden ring-1 ring-sky-500/5">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 blur-[50px] pointer-events-none" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Check size={14} className="text-emerald-500 shrink-0 stroke-[3]" />
                      <span className="text-[11px] font-sans text-sky-500 dark:text-sky-400 font-bold uppercase tracking-wider">
                        Mavzen Operating System
                      </span>
                    </div>
                    <p className="text-xs font-sans font-bold text-sky-600 dark:text-white leading-tight">
                      {row.mavzen.title}
                    </p>
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-355 leading-relaxed font-sans">
                      {row.mavzen.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Interactive ROI Metric Impact Sandbox */}
      <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900/80 p-6 sm:p-10 rounded-3xl relative overflow-hidden">
        <div className="absolute inset-0 grid-lens-pattern opacity-[0.04] pointer-events-none" />
        <div className="absolute top-[-200px] left-[-200px] w-96 h-96 rounded-full bg-sky-500/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left panel: sliders */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-[9px] font-sans px-2.5 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-md tracking-wider uppercase inline-block">
                ROI PROJECTION CALIBRATION
              </span>
              <h3 className="text-2xl sm:text-3xl font-sans font-[800] text-zinc-950 dark:text-white leading-tight">
                Simulate Your Infrastructure ROI
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Adjust your brand's operational metrics to review estimated monthly manual cost savings and recovered checkout revenue.
              </p>
            </div>

            {/* Slider 1: Daily Orders */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-sans text-zinc-400 uppercase">Average Daily Orders</span>
                <span className="text-xs font-semibold px-2 py-0.5 bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 rounded border border-zinc-200 dark:border-zinc-800">
                  {dailyOrders} orders/day
                </span>
              </div>
              <input 
                id="slider-roi-orders"
                type="range" 
                min="20" 
                max="1000" 
                value={dailyOrders} 
                onChange={(e) => setDailyOrders(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer h-1 bg-zinc-200 dark:bg-zinc-900 rounded-lg"
              />
            </div>

            {/* Slider 2: Labor Hourly Rate */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-sans text-zinc-400 uppercase">CS / Tech Labor Rate</span>
                <span className="text-xs font-semibold px-2 py-0.5 bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 rounded border border-zinc-200 dark:border-zinc-800">
                  ${hourlyRate}/hour
                </span>
              </div>
              <input 
                id="slider-roi-labor"
                type="range" 
                min="15" 
                max="60" 
                value={hourlyRate} 
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer h-1 bg-zinc-200 dark:bg-zinc-900 rounded-lg"
              />
            </div>

            <div className="p-4 bg-zinc-100/45 dark:bg-[#121215] border border-zinc-200/50 dark:border-zinc-900 rounded-xl text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Our simulation assumes a standard average order value of <strong>$85</strong>, a <strong>15%</strong> support ticketing rate (CS tickets), and a target recurring SaaS license subscription baseline software fee.
            </div>
          </div>

          {/* Right panel: projection output */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900/80 p-6 rounded-2xl flex flex-col justify-between space-y-6">
            <h4 className="text-xs font-sans text-zinc-400 border-b border-zinc-200 dark:border-zinc-900 pb-3 uppercase flex justify-between items-center">
              <span>PROJECTED MONTHLY VALUE LIFT</span>
              <span className="inline-flex h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="space-y-1">
                <span className="text-[10px] font-sans text-zinc-400 dark:text-zinc-500 block uppercase">CS Labor Cost Saved</span>
                <span className="text-xl sm:text-2xl font-sans font-[800] text-zinc-950 dark:text-white block">
                  ${stats.manualSaved.toLocaleString()}
                </span>
                <span className="text-[10px] font-sans text-zinc-450 dark:text-zinc-500 mt-1 block">
                  {stats.hoursSaved} hrs support work cut
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-sans text-zinc-400 dark:text-zinc-500 block uppercase">Cart Revenue Saved</span>
                <span className="text-xl sm:text-2xl font-sans font-[800] text-zinc-950 dark:text-white block">
                  ${stats.recoveredCartRevenue.toLocaleString()}
                </span>
                <span className="text-[10px] font-sans text-zinc-450 dark:text-zinc-500 mt-1 block">
                  8% recovered via WhatsApp
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-sans text-zinc-400 dark:text-zinc-500 block uppercase">SaaS License Leak Saved</span>
                <span className="text-xl sm:text-2xl font-sans font-[800] text-zinc-950 dark:text-white block">
                  ${stats.saasSaved.toLocaleString()}
                </span>
                <span className="text-[10px] font-sans text-zinc-450 dark:text-zinc-500 mt-1 block">
                  Eliminated redundant SaaS
                </span>
              </div>

            </div>

            {/* Total impact layout */}
            <div className="bg-sky-500/5 dark:bg-sky-500/5 border border-sky-500/10 p-5 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-sans text-sky-500 font-bold block uppercase tracking-wider">Estimated Monthly Profit Gain</span>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Total operational optimization across customer touchpoints.</p>
              </div>
              <div className="text-3xl sm:text-4xl font-sans font-[900] text-sky-500 self-start sm:self-center">
                ${stats.totalImpact.toLocaleString()}
                <span className="text-xs font-sans font-medium text-sky-400/80 ml-1">/mo</span>
              </div>
            </div>

            {/* Bottom consult button */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-zinc-200 dark:border-zinc-900 pt-4">
              <span className="text-[10px] font-sans text-zinc-400">Values are modular and scale based on audit specifications.</span>
              <button 
                id="btn-why-roi-consult"
                onClick={onOpenConsult}
                className="w-full sm:w-auto px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-zinc-950 font-bold rounded-lg text-xs uppercase flex items-center justify-center gap-1.5 transition-all text-center self-stretch"
              >
                <span>Deploy This System</span>
                <ArrowRight size={12} />
              </button>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
