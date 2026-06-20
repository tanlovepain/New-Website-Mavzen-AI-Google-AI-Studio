import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, Check, X, Minus
} from 'lucide-react';

const USD_TO_INR = 84;

interface ComparisonFeature {
  label: string;
  mavzen: 'yes' | 'no' | 'partial';
  agency: 'yes' | 'no' | 'partial';
  saas: 'yes' | 'no' | 'partial';
  inhouse: 'yes' | 'no' | 'partial';
}

const COMPARISON_FEATURES: ComparisonFeature[] = [
  { label: 'You own the code permanently', mavzen: 'yes', agency: 'no', saas: 'no', inhouse: 'yes' },
  { label: 'Built inside your own cloud accounts', mavzen: 'yes', agency: 'no', saas: 'no', inhouse: 'yes' },
  { label: 'No ongoing platform or seat fees', mavzen: 'yes', agency: 'no', saas: 'no', inhouse: 'yes' },
  { label: 'Custom-built for your specific workflows', mavzen: 'yes', agency: 'partial', saas: 'no', inhouse: 'yes' },
  { label: 'Deployed within weeks, not months', mavzen: 'yes', agency: 'no', saas: 'yes', inhouse: 'no' },
  { label: 'No recurring retainer or subscription', mavzen: 'yes', agency: 'no', saas: 'no', inhouse: 'partial' },
  { label: 'Your team is trained to maintain it', mavzen: 'yes', agency: 'no', saas: 'no', inhouse: 'yes' },
  { label: 'Works with Shopify, Klaviyo, WhatsApp', mavzen: 'yes', agency: 'partial', saas: 'partial', inhouse: 'partial' },
  { label: 'Fixed, transparent project pricing', mavzen: 'yes', agency: 'no', saas: 'no', inhouse: 'no' },
];

function StatusIcon({ status }: { status: 'yes' | 'no' | 'partial' }) {
  if (status === 'yes') {
    return (
      <div className="flex items-center justify-center mx-auto">
        <Check size={18} className="text-[#3b82f6] stroke-[2.5]" />
      </div>
    );
  }
  if (status === 'no') {
    return (
      <div className="flex items-center justify-center mx-auto">
        <X size={18} className="text-[#ef4444] stroke-[2]" />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center mx-auto">
      <Minus size={18} className="text-[#eab308] stroke-[2.5]" />
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }
  })
};

export default function WhyMavzenPage({ onOpenConsult }: { onOpenConsult: () => void }) {
  // Currency
  const [currency, setCurrency] = useState<'USD' | 'INR'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mavzen-currency');
      return (saved === 'INR' ? 'INR' : 'USD');
    }
    return 'USD';
  });

  useEffect(() => {
    localStorage.setItem('mavzen-currency', currency);
  }, [currency]);

  const fmt = (usdValue: number) => {
    if (currency === 'INR') {
      const inr = Math.round(usdValue * USD_TO_INR);
      return '₹' + inr.toLocaleString('en-IN');
    }
    return '$' + usdValue.toLocaleString();
  };

  // Calculator - Operational Impact Estimator
  const [monthlyOrders, setMonthlyOrders] = useState<number>(1500);
  const [questionsPerDay, setQuestionsPerDay] = useState<number>(50);
  const [avgOrderValue, setAvgOrderValue] = useState<number>(85);
  const [supportTeamSize, setSupportTeamSize] = useState<number>(3);
  const [founderHoursWeekly, setFounderHoursWeekly] = useState<number>(15);

  const calculateImpact = () => {
    // Support Hours Saved
    // Assume 5 minutes per question, automation handles 70%
    const questionsPerMonth = questionsPerDay * 30;
    const automatedQuestions = questionsPerMonth * 0.7;
    const supportHoursSaved = Math.round((automatedQuestions * 5) / 60);

    // Founder Time Recovered
    // Operations automation recovers 40% of founder's operational time
    const founderHoursMonthly = founderHoursWeekly * 4;
    const founderTimeRecovered = Math.round(founderHoursMonthly * 0.4);

    // Potential Cart Recovery
    // 5% of orders abandon, 15% recoverable via follow-up
    const abandonedCarts = monthlyOrders * 0.05;
    const recoveredCarts = abandonedCarts * 0.15;
    const cartRecoveryRevenue = Math.round(recoveredCarts * avgOrderValue);

    // Hiring Delayed
    // Each support person handles ~500 questions/month
    const questionsHandledPerSupport = 500;
    const supportCapacityNeeded = Math.ceil(questionsPerMonth / questionsHandledPerSupport);
    const currentCapacity = supportTeamSize;
    const additionalCapacityNeeded = Math.max(0, supportCapacityNeeded - currentCapacity);
    const hiringDelayed = additionalCapacityNeeded > 0.5 ? 1 : 0;

    return {
      supportHoursSaved,
      founderTimeRecovered,
      cartRecoveryRevenue,
      hiringDelayed,
      totalHoursRecovered: supportHoursSaved + founderTimeRecovered,
    };
  };

  const impact = calculateImpact();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28 pb-20">

      {/* ── HERO ── */}
      <motion.div
        className="text-center space-y-6 max-w-4xl mx-auto pt-8"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      >
        <motion.h1
          variants={fadeUp}
          custom={0}
          className="text-5xl sm:text-6xl md:text-7xl font-sans font-extrabold tracking-[-0.04em] text-zinc-950 dark:text-white leading-[1.02]"
        >
          Not another agency.<br />
          <span className="text-zinc-400 dark:text-zinc-500">Not another platform.</span>
        </motion.h1>
        <motion.p
          variants={fadeUp}
          custom={0.1}
          className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto"
        >
          Most D2C brands scale by adding more tools and more people. We take a different approach — Mavzen builds custom AI infrastructure that automates what slows you down, so your team can focus on growth.
        </motion.p>
      </motion.div>

      {/* ── COMPARISON TABLE ── */}
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold tracking-[-0.03em] text-zinc-950 dark:text-white">
            Compare your options
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
            See exactly how Mavzen compares to traditional agencies, SaaS platforms, and building in-house.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-900 shadow-sm">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800">
                <th className="text-left text-xs font-sans text-zinc-400 uppercase tracking-wider px-6 py-5 w-[35%] bg-white dark:bg-zinc-950">
                  Feature
                </th>
                {/* Mavzen — highlighted */}
                <th className="text-center px-5 py-6 bg-[#0B1221] w-[20%]">
                  <div className="space-y-1.5">
                    <div className="w-6 h-6 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-2">
                       <div className="w-3 h-3 bg-[#3b82f6] rounded-full opacity-80 mix-blend-screen blur-[1px]"></div>
                    </div>
                    <div className="text-[#3b82f6] font-bold text-[15px]">Mavzen AI</div>
                    <div className="text-[11px] text-zinc-400 font-medium tracking-wide">AI Systems Architect-led</div>
                  </div>
                </th>
                <th className="text-center px-5 py-6 bg-zinc-950 w-[18%]">
                  <div className="space-y-1.5">
                    <div className="w-6 h-6 mx-auto flex items-center justify-center mb-2">
                       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-500"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
                    </div>
                    <div className="text-zinc-200 font-bold text-[15px]">Typical Agency</div>
                    <div className="text-[11px] text-zinc-500 font-medium tracking-wide">Generic dev shop</div>
                  </div>
                </th>
                <th className="text-center px-5 py-6 bg-zinc-950 w-[17%]">
                  <div className="space-y-1.5">
                    <div className="w-6 h-6 mx-auto flex items-center justify-center mb-2">
                       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-500"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                    </div>
                    <div className="text-zinc-200 font-bold text-[15px]">SaaS Platform</div>
                    <div className="text-[11px] text-zinc-500 font-medium tracking-wide">Off-the-shelf tools</div>
                  </div>
                </th>
                <th className="text-center px-5 py-6 bg-zinc-950 w-[10%]">
                  <div className="space-y-1.5">
                    <div className="w-6 h-6 mx-auto flex items-center justify-center mb-2">
                       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-500"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    </div>
                    <div className="text-zinc-200 font-bold text-[14px] leading-tight">DIY / In-House</div>
                    <div className="text-[10px] text-zinc-500 font-medium tracking-wide leading-tight">Build it yourself</div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_FEATURES.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b border-zinc-900/60 last:border-0 bg-transparent hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors"
                >
                  <td className="px-6 py-5 text-[14px] font-medium text-zinc-700 dark:text-zinc-300 font-sans leading-relaxed">
                    {row.label}
                  </td>
                  {/* Mavzen highlighted */}
                  <td className="px-5 py-5 text-center bg-[#0B1221]">
                    <StatusIcon status={row.mavzen} />
                  </td>
                  <td className="px-5 py-5 text-center bg-zinc-950">
                    <StatusIcon status={row.agency} />
                  </td>
                  <td className="px-5 py-5 text-center bg-zinc-950">
                    <StatusIcon status={row.saas} />
                  </td>
                  <td className="px-5 py-5 text-center bg-zinc-950">
                    <StatusIcon status={row.inhouse} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* ── OPERATIONAL IMPACT ESTIMATOR ── */}
      <motion.div
        className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900/80 p-8 sm:p-12 rounded-3xl relative overflow-hidden"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute inset-0 grid-lens-pattern opacity-[0.04] pointer-events-none" />
        <div className="absolute top-[-200px] left-[-200px] w-96 h-96 rounded-full bg-rose-500/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-sans font-extrabold tracking-[-0.03em] text-zinc-950 dark:text-white">
                What Could Your Team Stop Spending Time On?
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-lg">
                Estimate how much time, effort, and operational workload could be removed from your business each month.
              </p>
            </div>

            {/* Currency Toggle */}
            <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-1 shrink-0 self-start sm:self-auto">
              {(['USD', 'INR'] as const).map((cur) => (
                <button
                  key={cur}
                  onClick={() => setCurrency(cur)}
                  className={`currency-pill px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all ${
                    currency === cur
                      ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
                  }`}
                >
                  {cur === 'USD' ? '$ USD' : '₹ INR'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Inputs */}
            <div className="lg:col-span-5 space-y-7">

              {/* Input 1: Monthly Orders */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Monthly Orders
                  </label>
                  <span className="text-sm font-bold px-3 py-1 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-lg border border-zinc-200 dark:border-zinc-800">
                    {monthlyOrders.toLocaleString()}
                  </span>
                </div>
                <input
                  id="input-monthly-orders"
                  type="range"
                  min="100"
                  max="50000"
                  step="100"
                  value={monthlyOrders}
                  onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                  className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2"
                  style={{ accentColor: '#c20a26' }}
                />
                <div className="flex justify-between text-[11px] text-zinc-400">
                  <span>100</span>
                  <span>50,000</span>
                </div>
              </div>

              {/* Input 2: Customer Questions Per Day */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Customer Questions Per Day
                  </label>
                  <span className="text-sm font-bold px-3 py-1 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-lg border border-zinc-200 dark:border-zinc-800">
                    {questionsPerDay}
                  </span>
                </div>
                <input
                  id="input-questions-per-day"
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={questionsPerDay}
                  onChange={(e) => setQuestionsPerDay(Number(e.target.value))}
                  className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2"
                  style={{ accentColor: '#c20a26' }}
                />
                <div className="flex justify-between text-[11px] text-zinc-400">
                  <span>10</span>
                  <span>1,000</span>
                </div>
              </div>

              {/* Input 3: Average Order Value */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Average Order Value
                  </label>
                  <span className="text-sm font-bold px-3 py-1 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-lg border border-zinc-200 dark:border-zinc-800">
                    {fmt(avgOrderValue)}
                  </span>
                </div>
                <input
                  id="input-avg-order-value"
                  type="range"
                  min="20"
                  max="500"
                  step="5"
                  value={avgOrderValue}
                  onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                  className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2"
                  style={{ accentColor: '#c20a26' }}
                />
                <div className="flex justify-between text-[11px] text-zinc-400">
                  <span>{fmt(20)}</span>
                  <span>{fmt(500)}</span>
                </div>
              </div>

              {/* Input 4: Support Team Size */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Support Team Size
                  </label>
                  <span className="text-sm font-bold px-3 py-1 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-lg border border-zinc-200 dark:border-zinc-800">
                    {supportTeamSize} {supportTeamSize === 1 ? 'person' : 'people'}
                  </span>
                </div>
                <input
                  id="input-support-team-size"
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={supportTeamSize}
                  onChange={(e) => setSupportTeamSize(Number(e.target.value))}
                  className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2"
                  style={{ accentColor: '#c20a26' }}
                />
                <div className="flex justify-between text-[11px] text-zinc-400">
                  <span>1</span>
                  <span>30</span>
                </div>
              </div>

              {/* Input 5: Founder Hours Weekly */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Founder Hours On Operations Weekly
                  </label>
                  <span className="text-sm font-bold px-3 py-1 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-lg border border-zinc-200 dark:border-zinc-800">
                    {founderHoursWeekly} hrs
                  </span>
                </div>
                <input
                  id="input-founder-hours"
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={founderHoursWeekly}
                  onChange={(e) => setFounderHoursWeekly(Number(e.target.value))}
                  className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2"
                  style={{ accentColor: '#c20a26' }}
                />
                <div className="flex justify-between text-[11px] text-zinc-400">
                  <span>1 hr</span>
                  <span>50 hrs</span>
                </div>
              </div>

            </div>

            {/* Right: Output Cards */}
            <div className="lg:col-span-7 space-y-5">

              {/* Output Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Support Hours Saved */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl space-y-3"
                >
                  <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
                    Support Hours Saved
                  </p>
                  <div className="text-3xl font-extrabold text-zinc-900 dark:text-white">
                    {impact.supportHoursSaved} <span className="text-lg font-medium text-zinc-400">hrs/month</span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Less time spent answering repetitive customer questions.
                  </p>
                </motion.div>

                {/* Founder Time Recovered */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl space-y-3"
                >
                  <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
                    Founder Time Recovered
                  </p>
                  <div className="text-3xl font-extrabold text-zinc-900 dark:text-white">
                    {impact.founderTimeRecovered} <span className="text-lg font-medium text-zinc-400">hrs/month</span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Time redirected toward growth instead of operations.
                  </p>
                </motion.div>

                {/* Potential Cart Recovery */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl space-y-3"
                >
                  <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
                    Potential Cart Recovery
                  </p>
                  <div className="text-3xl font-extrabold text-zinc-900 dark:text-white">
                    {fmt(impact.cartRecoveryRevenue)} <span className="text-lg font-medium text-zinc-400">/mo</span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Estimated revenue recovered from customers who almost purchased.
                  </p>
                </motion.div>

                {/* Hiring Delayed */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl space-y-3"
                >
                  <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
                    Hiring Delayed
                  </p>
                  <div className="text-3xl font-extrabold text-zinc-900 dark:text-white">
                    {impact.hiringDelayed} {impact.hiringDelayed === 1 ? 'Support Hire' : 'Support Hires'}
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Additional workload absorbed without immediately increasing headcount.
                  </p>
                </motion.div>
              </div>

              {/* Summary Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="bg-zinc-950 dark:bg-zinc-950 border border-zinc-900 p-8 rounded-2xl space-y-6"
              >
                <div>
                  <p className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-2">
                    Monthly Operational Impact
                  </p>
                  <div className="flex flex-wrap gap-6">
                    <div>
                      <p className="text-2xl font-extrabold text-white">
                        {impact.totalHoursRecovered} <span className="text-base font-medium text-zinc-400">hrs recovered</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl font-extrabold text-white">
                        {impact.founderTimeRecovered} <span className="text-base font-medium text-zinc-400">hrs founder time</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl font-extrabold text-white">
                        {fmt(impact.cartRecoveryRevenue)} <span className="text-base font-medium text-zinc-400">recovered</span>
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  id="btn-why-impact-consult"
                  onClick={() => window.open('https://calendly.com/mavzenai/30min', '_blank')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-bold uppercase tracking-wider transition-all active:scale-[0.98]"
                >
                  <span>Get Started</span>
                  <ArrowRight size={14} />
                </button>
              </motion.div>

            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
