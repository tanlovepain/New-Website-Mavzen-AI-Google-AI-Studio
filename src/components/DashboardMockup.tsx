import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Home, Grid, Sparkles, Database, CheckCircle, Settings, Folder, Activity, ArrowUpRight } from 'lucide-react';

export default function DashboardMockup() {
  const [timeline, setTimeline] = useState<'1D' | '1W' | '1M'>('1W');
  const [activeTab, setActiveTab] = useState<string>('grid');

  // Realistic data depending on selected timeline
  const getTimelineData = () => {
    switch (timeline) {
      case '1D':
        return {
          agents: '7',
          calls: '340',
          avgResponse: '0.9s',
          success: '99%',
          bars: [25, 45, 60, 30, 80, 95, 70, 50, 40, 85, 90, 65],
          peak: '412', avg: '185', low: '30'
        };
      case '1M':
        return {
          agents: '9',
          calls: '42.9K',
          avgResponse: '1.4s',
          success: '97.2%',
          bars: [85, 75, 90, 65, 80, 95, 70, 85, 90, 65, 80, 99],
          peak: '12,482', avg: '5,841', low: '1,930'
        };
      case '1W':
      default:
        return {
          agents: '7',
          calls: '1.2K',
          avgResponse: '1.2s',
          success: '98%',
          bars: [30, 40, 35, 50, 45, 60, 55, 70, 65, 85, 80, 98],
          peak: '2,847', avg: '1,432', low: '892'
        };
    }
  };

  const data = getTimelineData();

  return (
    <div className="w-full rounded-2xl border border-zinc-200/80 bg-zinc-50/90 dark:border-[#e11d48]/25 dark:bg-[#0c0c0e]/95 p-2 sm:p-4 shadow-[0_0_50px_rgba(244,63,94,0.08)] dark:shadow-[0_0_60px_rgba(244,63,94,0.24)] relative group overflow-hidden transition-all duration-500 backdrop-blur-xl">
      {/* Background glow shadow mimicking custom OperatorOS styled borders */}
      <div className="absolute inset-0 bg-radial-gradient from-rose-500/5 to-transparent pointer-events-none" />

      {/* Top macOS Style Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-900/80 mb-4 px-2">
        <div className="flex items-center gap-2" id="mockup-window-controls">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-sm shadow-[#ff5f56]/20" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm shadow-[#ffbd2e]/20" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f] shadow-sm shadow-[#27c93f]/20" />
        </div>
        <div className="text-xs font-sans font-bold tracking-tight text-zinc-500 dark:text-zinc-400">
          Operations Dashboard
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/5 border border-emerald-500/10">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-sans font-bold text-emerald-500">LIVE ENGINE</span>
        </div>
      </div>

      <div className="flex h-[380px] sm:h-[460px] gap-2 sm:gap-4 overflow-hidden">
        {/* Left Vertical Navigation Menu from screenshots */}
        <div className="flex flex-col gap-2.5 bg-zinc-100/90 dark:bg-[#121215]/85 p-1.5 sm:p-2 rounded-xl h-full shrink-0 border border-zinc-200/60 dark:border-zinc-900/80">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'grid', icon: Grid, label: 'Grid' },
            { id: 'spark', icon: Sparkles, label: 'Agents' },
            { id: 'db', icon: Database, label: 'Sources' },
            { id: 'check', icon: CheckCircle, label: 'Quality' },
            { id: 'settings', icon: Settings, label: 'Config' }
          ].map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                id={`sidebar-tab-${item.id}`}
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`p-2.5 rounded-lg transition-all relative group/item duration-200 ${
                  isActive 
                    ? 'bg-rose-500/10 dark:bg-rose-550/10 text-rose-600 dark:text-rose-500 border border-rose-500/20' 
                    : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-[#151518] hover:text-zinc-800 dark:hover:text-zinc-250 border border-transparent'
                }`}
                title={item.label}
              >
                <IconComponent size={16} />
                <span className="absolute left-12 bg-zinc-950 text-white text-[10px] py-1 px-2.5 rounded-md opacity-0 group-hover/item:opacity-100 transition-opacity whitespace-nowrap z-30 font-sans font-semibold hidden sm:inline">
                  {item.label}
                </span>
                {isActive && (
                  <span className="absolute left-0 top-1/4 bottom-1/4 w-0.5 bg-rose-600 dark:bg-rose-500 rounded-sm" />
                )}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1">
          {/* Top Row Stat Widgets */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {[
              { label: 'ACTIVE AGENTS', value: data.agents, trend: '+2 this week' },
              { label: 'CALLS TODAY', value: data.calls, trend: '99.8% precision' },
              { label: 'AVG RESPONSE', value: data.avgResponse, trend: 'Cached embed layer' },
              { label: 'SUCCESS RATE', value: data.success, trend: 'SLA threshold' }
            ].map((stat, i) => (
              <div 
                key={i} 
                className="bg-white/80 dark:bg-[#111113]/90 border border-zinc-200/60 dark:border-zinc-900/80 p-3 rounded-xl hover:border-rose-500/10 dark:hover:border-rose-500/20 transition-all duration-300 shadow-xs"
              >
                <div className="text-[9px] font-sans font-bold tracking-wider text-zinc-400 dark:text-zinc-550">
                  {stat.label}
                </div>
                <div className="text-xl sm:text-2xl font-sans font-[800] mt-1 tracking-tight text-zinc-900 dark:text-white leading-none">
                  {stat.value}
                </div>
                <div className="text-[9px] font-sans text-zinc-500 dark:text-zinc-500 mt-1">
                  {stat.trend}
                </div>
              </div>
            ))}
          </div>

          {/* Activity Graph and Recent Activity Widget Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {/* Chart Area */}
            <div className="lg:col-span-2 bg-white/85 dark:bg-[#111113]/90 border border-zinc-200/60 dark:border-zinc-900/80 p-3.5 rounded-xl flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-xs font-sans font-[800] tracking-tight text-zinc-900 dark:text-white">Activity Timeline</h4>
                  <div className="flex gap-x-3 gap-y-0.5 flex-wrap text-[9px] font-sans text-zinc-400 dark:text-zinc-550 mt-1">
                    <span>Peak: {data.peak}</span>
                    <span>•</span>
                    <span>Avg: {data.avg}</span>
                    <span>•</span>
                    <span>Low: {data.low}</span>
                  </div>
                </div>
                {/* Timeline Filters */}
                <div className="flex bg-zinc-100 dark:bg-zinc-950 p-0.5 rounded-lg border border-zinc-200/50 dark:border-zinc-900">
                  {(['1D', '1W', '1M'] as const).map((t) => (
                    <button
                      id={`timeline-toggle-${t}`}
                      key={t}
                      onClick={() => setTimeline(t)}
                      className={`px-2 py-1 text-[9px] font-sans font-bold rounded-md transition-all ${
                        timeline === t
                          ? 'bg-white dark:bg-[#18181b] text-zinc-950 dark:text-white shadow-xs border border-zinc-200/20 dark:border-zinc-800'
                          : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Bar chart mimicking the custom OperatorOS dashboard screenshot */}
              <div className="flex-1 min-h-[110px] sm:min-h-[140px] flex items-end gap-1 px-1 mt-2">
                {data.bars.map((height, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 0.6, delay: idx * 0.02 }}
                      className="w-full rounded-xs bg-linear-to-t from-rose-500/5 via-rose-550/50 to-rose-500/80 dark:from-zinc-900 dark:via-zinc-800/80 dark:to-zinc-700/80 hover:from-rose-500 hover:to-rose-450 transition-colors"
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[8px] font-sans text-zinc-400 dark:text-zinc-600 mt-2 border-t border-zinc-100 dark:border-zinc-900/40 pt-1 px-0.5">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>24:00</span>
              </div>
            </div>

            {/* Recent Activity List right next to graph */}
            <div className="bg-white/85 dark:bg-[#111113]/90 border border-zinc-200/60 dark:border-zinc-900/80 p-3.5 rounded-xl flex flex-col justify-between">
              <h4 className="text-xs font-sans font-[800] tracking-tight text-zinc-900 dark:text-white pb-2 border-b border-zinc-100 dark:border-zinc-900/80">
                Recent Activity
              </h4>
              <ul className="space-y-3 mt-3 flex-1 text-[11px] font-sans">
                {[
                  { text: 'New lead from contact form', time: '2m ago' },
                  { text: 'Voice agent completed 12 calls', time: '5m ago' },
                  { text: 'Document uploaded: Q4 Report', time: '12m ago' },
                  { text: 'Task resolved: Support #847', time: '18m ago' }
                ].map((act, idx) => (
                  <li key={idx} className="flex items-start justify-between gap-2 text-zinc-600 dark:text-zinc-400">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80 shrink-0" />
                      <span className="line-clamp-1 font-medium">{act.text}</span>
                    </div>
                    <span className="text-[9px] font-sans text-zinc-400/80 shrink-0">{act.time}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 pt-2 border-t border-zinc-100 dark:border-zinc-900/80 text-center">
                <span className="text-[10px] font-sans font-bold text-rose-500 hover:text-rose-405 hover:underline cursor-pointer flex items-center justify-center gap-1.5">
                  View diagnostic console <ArrowUpRight size={10} />
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Grid: Glow Agent curves and Knowledge Base sizes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2">
            {/* Agent Executions visualizer */}
            <div className="bg-white/85 dark:bg-[#111113]/90 border border-zinc-200/60 dark:border-zinc-900/80 p-3.5 rounded-xl relative overflow-hidden flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-sans font-[800] tracking-tight text-zinc-900 dark:text-white">Agent Executions</h4>
                  <p className="text-[9px] font-sans text-zinc-400 dark:text-zinc-550 mt-0.5">Shorthand local container logs</p>
                </div>
                <span className="text-[9px] font-sans font-bold bg-zinc-100 dark:bg-zinc-950 text-zinc-500 hover:text-zinc-600 px-2 py-0.5 border border-zinc-200/50 dark:border-zinc-900 rounded">
                  Last 7 days
                </span>
              </div>

              {/* Glowing trend curve using inline vector paths */}
              <div className="h-28 mt-4 relative">
                <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                  <path
                    d="M 0 95 Q 60 70 120 45 T 240 15 T 300 10 L 300 100 L 0 100 Z"
                    fill="url(#trendGradient)"
                    className="opacity-25 dark:opacity-15"
                  />
                  <path
                    d="M 0 95 Q 60 70 120 45 T 240 15 T 300 10"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="drop-shadow-[0_2px_8px_rgba(244,63,94,0.3)]"
                  />
                  <defs>
                    <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f43f5e" />
                      <stop offset="100%" stopColor="#09090b" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* Simulated markers */}
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 animate-ping" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-600" />
              </div>
            </div>

            {/* Knowledge base storage breakdown folders */}
            <div className="bg-white/85 dark:bg-[#111113]/90 border border-zinc-200/60 dark:border-zinc-900/80 p-3.5 rounded-xl flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900/80 pb-1.5">
                <div>
                  <h4 className="text-xs font-sans font-[800] tracking-tight text-zinc-900 dark:text-white">Knowledge Base</h4>
                  <p className="text-[9px] font-sans text-zinc-400 dark:text-zinc-550 mt-0.5">Encrypted document index</p>
                </div>
                <span className="text-[10px] font-sans font-bold text-rose-500 bg-rose-500/5 px-2 py-0.5 rounded border border-rose-500/10">
                  32.4 GB
                </span>
              </div>

              <div className="space-y-1.5 mt-2.5">
                {[
                  { name: 'conversations', records: '12.4K records', size: '8.2 GB' },
                  { name: 'documents', records: '3.8K records', size: '14.1 GB' },
                  { name: 'embeddings', records: '45.2K records', size: '7.8 GB' },
                  { name: 'call_logs', records: '8.1K records', size: '2.3 GB' }
                ].map((folder, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-950 p-2 rounded-lg border border-zinc-100/50 dark:border-zinc-900/40 hover:border-rose-500/10 dark:hover:border-rose-500/20 transition-all cursor-pointer group/folder"
                  >
                    <div className="flex items-center gap-2">
                      <Folder size={12.5} className="text-zinc-400 group-hover/folder:text-rose-500 transition-colors" />
                      <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 font-sans">
                        {folder.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-400 dark:text-zinc-650">
                      <span>{folder.records}</span>
                      <span>•</span>
                      <span className="font-bold text-zinc-600 dark:text-zinc-400">{folder.size}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
