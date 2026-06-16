import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data';
import type { FAQItem } from '../types';

interface FAQSectionProps {
  items?: FAQItem[];
}

export default function FAQSection({ items = FAQ_ITEMS }: FAQSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-3.5">
      {items.map((item) => {
        const isExpanded = expandedId === item.id;
        return (
          <div
            key={item.id}
            className="border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 rounded-xl overflow-hidden transition-all duration-300"
          >
            <button
              id={`faq-btn-${item.id}`}
              onClick={() => toggleExpand(item.id)}
              className="w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/40 cursor-pointer"
            >
              <span className="font-display font-medium text-sm sm:text-base text-zinc-900 dark:text-zinc-100 pr-4">
                {item.question}
              </span>
              <span className={`text-zinc-400 dark:text-zinc-650 transition-transform duration-300 shrink-0 ${
                isExpanded ? 'rotate-180 text-rose-500' : ''
              }`}>
                <ChevronDown size={18} />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <div className="p-4 pt-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100/60 dark:border-zinc-900/30">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
