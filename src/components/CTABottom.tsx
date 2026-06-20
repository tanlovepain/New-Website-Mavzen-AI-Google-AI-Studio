import React from 'react';
import { motion } from 'motion/react';
import { Layers, Shield, Users, ChevronRight } from 'lucide-react';

interface CTABottomProps {
  page: 'home' | 'systems' | 'why-mavzen' | 'process';
}

const CTA_COPY = {
  home: {
    heading: 'Build The Systems Your Brand Will Rely On Tomorrow',
    subheading: 'From customer support and retention to reporting and operations, we design the systems that help brands scale without adding unnecessary complexity.',
  },
  systems: {
    heading: 'Ready To See What These Systems Look Like In Your Brand?',
    subheading: "We'll walk through your current workflows, identify the biggest opportunities, and show where the highest impact comes from first.",
  },
  'why-mavzen': {
    heading: 'See The Difference For Yourself',
    subheading: 'Explore how founder-led brands reduce operational friction and create more consistent execution with the right systems in place.',
  },
  process: {
    heading: 'Start With A Strategic Review',
    subheading: 'A focused conversation to understand where time is being lost, where opportunities exist, and what should be built first.',
  },
};

export default function CTABottom({ page }: CTABottomProps) {
  const copy = CTA_COPY[page];

  const handleCalendlyClick = () => {
    window.open('https://calendly.com/mavzenai/30min', '_blank');
  };

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-zinc-950 border-t border-zinc-900/50">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 grid-lens-pattern opacity-[0.15] pointer-events-none z-0" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-bold tracking-tight text-white leading-tight">
            {copy.heading}
          </h2>

          <p className="text-[17px] sm:text-[19px] text-zinc-400 font-sans max-w-2xl mx-auto leading-relaxed">
            {copy.subheading}
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleCalendlyClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-zinc-100 text-zinc-950 font-semibold rounded-xl px-8 py-3.5 text-[15px] tracking-wide transition-all duration-200"
            >
              Start the Consult
              <ChevronRight size={16} strokeWidth={2.5} className="ml-1" />
            </button>
            <button
              onClick={handleCalendlyClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent hover:bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold rounded-xl px-8 py-3.5 text-[15px] tracking-wide transition-all duration-200"
            >
              Book a Call
              <ChevronRight size={16} strokeWidth={2.5} className="ml-1" />
            </button>
          </div>

          <div className="pt-16 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
            <div className="flex items-center gap-2.5 text-zinc-400 text-sm font-medium font-sans">
              <Layers size={18} className="text-[#c20a26] stroke-[2]" />
              <span>Architecture first</span>
            </div>
            <div className="flex items-center gap-2.5 text-zinc-400 text-sm font-medium font-sans">
              <Shield size={18} className="text-[#c20a26] stroke-[2]" />
              <span>100% client-owned</span>
            </div>
            <div className="flex items-center gap-2.5 text-zinc-400 text-sm font-medium font-sans">
              <Users size={18} className="text-[#c20a26] stroke-[2]" />
              <span>Sourced team per project</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
