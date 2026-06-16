import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, MessageSquare, Shield, Cpu, ExternalLink, ArrowRight } from 'lucide-react';
import { CASE_STUDIES } from '../data';
import { CaseStudy } from '../types';

interface ClientResultsProps {
  onOpenConsult: () => void;
}

export default function ClientResults({ onOpenConsult }: ClientResultsProps) {
  const [activeIdx, setActiveIdx] = useState(6);

  const activeCase = CASE_STUDIES[activeIdx];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % CASE_STUDIES.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + CASE_STUDIES.length) % CASE_STUDIES.length);
  };

  const selectCase = (id: string) => {
    const foundIdx = CASE_STUDIES.findIndex((c) => c.id === id);
    if (foundIdx !== -1) {
      setActiveIdx(foundIdx);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Testimonial card column */}
      <div className="lg:col-span-2 flex flex-col justify-between h-full bg-linear-to-b from-white to-zinc-50 dark:from-zinc-900/60 dark:to-zinc-950 border border-zinc-200 dark:border-zinc-900 p-6 sm:p-8 rounded-2xl relative shadow-md">
        
        {/* Subtle decorative target vector behind study */}
        <div className="absolute right-6 top-6 opacity-5 dark:opacity-10 text-rose-500 pointer-events-none">
          <MessageSquare size={160} />
        </div>

        <div>
          {/* Active State Indicator */}
          <div className="flex items-center gap-2 mb-6">
            <span className="h-2 w-2 rounded-full bg-rose-600 animate-pulse" />
          </div>

          {/* Animating the Quote Content cleanly */}
          <div className="min-h-[170px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCase.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <p className="font-display text-lg sm:text-xl font-medium text-zinc-900 dark:text-zinc-100 leading-relaxed italic border-l-2 border-rose-500 pl-4">
                  "{activeCase.quote}"
                </p>
                <div className="flex items-center gap-2.5 mt-4">
                  {/* Circular letter M mini-logo */}
                  <div className="w-8 h-8 rounded-full bg-zinc-900 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs text-white border border-zinc-700/80">
                    M
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                      {activeCase.client}, Founder
                    </h5>
                    <p className="text-[10px] font-sans text-zinc-500 dark:text-zinc-500">
                      {activeCase.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Dynamic metadata parameter columns matching OperatorOS screenshots */}
        <div className="mt-8 pt-6 border-t border-zinc-200/60 dark:border-zinc-900/40">
          <div className="grid grid-cols-3 gap-2 text-center select-none">
            <div className="bg-zinc-100/50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200/30 dark:border-zinc-900/50">
              <span className="block text-[9px] font-sans text-zinc-400 dark:text-zinc-600 uppercase">Time Saved</span>
              <span className="font-sans font-semibold text-xs text-zinc-700 dark:text-zinc-300 mt-1 block">
                {activeCase.phase}
              </span>
            </div>
            <div className="bg-zinc-100/50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200/30 dark:border-zinc-900/50">
              <span className="block text-[9px] font-sans text-zinc-400 dark:text-zinc-600 uppercase">Result</span>
              <span className="font-sans font-semibold text-xs text-zinc-700 dark:text-zinc-300 mt-1 block">
                {activeCase.surface}
              </span>
            </div>
            <div className="bg-zinc-100/50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200/30 dark:border-zinc-900/50">
              <span className="block text-[9px] font-sans text-zinc-400 dark:text-zinc-600 uppercase">Ownership</span>
              <span className="font-sans font-semibold text-xs text-rose-600 dark:text-rose-450 mt-1 block">
                {activeCase.ownership}
              </span>
            </div>
          </div>

          {/* Dots Navigation indicators and direction triggers */}
          <div className="flex items-center justify-between mt-6 pt-1">
            <div className="flex gap-1.5" id="slider-dot-indicators">
              {CASE_STUDIES.map((_, idx) => (
                <button
                  id={`dot-btn-${idx}`}
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeIdx ? 'w-6 bg-rose-600' : 'w-1.5 bg-zinc-300 dark:bg-zinc-800'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                id="btn-slide-prev"
                onClick={handlePrev}
                className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 dark:text-zinc-400 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                id="btn-slide-next"
                onClick={handleNext}
                className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 dark:text-zinc-400 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Clickable list panel */}
      <div className="flex flex-col justify-between space-y-4">
        {/* Case list items */}
        <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
          <span className="text-[10px] font-sans tracking-widest text-zinc-400 dark:text-zinc-600 block mb-2 font-semibold">
            RECENT ENGAGEMENTS
          </span>
          {CASE_STUDIES.map((item, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div
                key={item.id}
                onClick={() => selectCase(item.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-200 ${
                  isActive
                    ? 'bg-zinc-100/80 dark:bg-zinc-900 border-rose-500/35 ring-1 ring-rose-500/20'
                    : 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-850'
                }`}
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className={`font-sans ${isActive ? 'text-rose-600 dark:text-rose-450 font-bold' : 'text-zinc-400 dark:text-zinc-600'}`}>
                    {item.role}
                  </span>
                  <ExternalLink size={10} className="text-zinc-400" />
                </div>
                <h4 className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 mt-1 truncate">
                  {item.title}
                </h4>
              </div>
            );
          })}
        </div>

        {/* Case Study Call to Action Card widget matching screenshot bottom-right */}
        <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900/70 p-5 rounded-2xl flex flex-col items-center text-center justify-center space-y-2 mt-auto">
          <h4 className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
            Ready to be the next case study?
          </h4>
          <button
            id="btn-results-consult"
            onClick={onOpenConsult}
            className="w-full inline-flex items-center justify-center gap-1.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 rounded-lg px-4 py-2 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all hover:scale-[1.01]"
          >
            Start the Consult
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
