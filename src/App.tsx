import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, Sun, Moon, Globe, Shield, Lock, Eye, Instagram, Twitter, Linkedin
} from 'lucide-react';

import Logo from './components/Logo';
import ConsultModal from './components/ConsultModal';
import CTABottom from './components/CTABottom';
import DashboardMockup from './components/DashboardMockup';
import SystemsSection from './components/SystemsSection';
import ClientResults from './components/ClientResults';
import ArchitectureViz from './components/ArchitectureViz';
import SystemsPage from './components/SystemsPage';
import WhyMavzenPage from './components/WhyMavzenPage';
import ProcessPage from './components/ProcessPage';
import AboutPage from './components/AboutPage';
import { METRICS } from './data';

type ThemeMode = 'light' | 'dark';
const ThemeContext = React.createContext<{ theme: ThemeMode; toggleTheme: () => void }>({
  theme: 'dark',
  toggleTheme: () => {},
});

const SectionDivider = () => (
  <div className="relative w-full h-[1px] bg-zinc-200/40 dark:bg-white/[0.03] my-10 sm:my-16 pointer-events-none flex items-center justify-center">
    <div className="absolute w-2 h-2 rotate-45 border border-zinc-300 dark:border-white/10 bg-zinc-100 dark:bg-[#09090b]" />
  </div>
);


export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved;
      // Default to dark theme to match original screenshot utama!
      return 'dark';
    }
    return 'dark';
  });

  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState<'home' | 'systems' | 'why-mavzen' | 'process' | 'about'>('home');

  const socialLinks = [
    { href: 'https://www.instagram.com/mavzen.ai', label: 'Instagram', icon: Instagram },
    { href: 'https://www.x.com/Tann7229', label: 'X', icon: Twitter },
    { href: 'https://www.linkedin.com/in/tanishq-girhare-1a18a6284', label: 'LinkedIn', icon: Linkedin },
  ] as const;

  // Synchronize tailwind light/dark class
  const navigateTo = (pageId: 'home' | 'systems' | 'why-mavzen' | 'process' | 'about', anchorId?: string) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (anchorId) {
      setTimeout(() => {
        const element = document.getElementById(anchorId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.add('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Scroll listener for header effects and progress tracking
  useEffect(() => {
    const handleScroll = () => {
      // Header scroll state
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Calculate scroll progress
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollTop = window.scrollY;
      const progress = windowHeight > 0 ? (scrollTop / windowHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const scrollToSection = (id: string) => {
    if (currentPage !== 'home') {
      navigateTo('home', id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="min-h-screen bg-white text-zinc-900 dark:bg-black dark:text-zinc-100 selection:bg-zinc-250 dark:selection:bg-zinc-900 overflow-x-hidden transition-colors duration-400 relative">
      
      {/* Scroll Progress Bar - Top Edge */}
      <div
        className="fixed top-0 left-0 h-[1px] bg-[#c20a26] z-50 transition-all duration-150 ease-out"
        style={{
          width: `${scrollProgress}%`
        }}
      />
      
      {/* Grid Pattern and Center Subdivision Axis Line replicating OperatorOS */}
      <div className="absolute inset-0 grid-lens-pattern opacity-40 dark:opacity-55 pointer-events-none z-0" />
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-zinc-200/40 dark:bg-zinc-900/35 pointer-events-none z-0" />

      {/* 1. Header/Navigation Bar */}
      <header
        id="app-header"
        className={`fixed top-0 left-0 right-0 z-45 transition-all duration-300 ${
          scrolled 
            ? 'py-3.5 bg-white/85 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200/50 dark:border-zinc-900/40 shadow-xs' 
            : 'py-5 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="cursor-pointer" onClick={() => navigateTo('home')}>
            <Logo showText={true} size={30} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[11px] font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            {[
              { id: 'home', label: 'Home' },
              { id: 'systems', label: 'Systems' },
              { id: 'why-mavzen', label: 'Why Mavzen' },
              { id: 'process', label: 'Process' },
              { id: 'about', label: 'About' }
            ].map((link) => (
              <button
                id={`nav-link-${link.id}`}
                key={link.id}
                onClick={() => navigateTo(link.id as any)}
                className={`transition-all cursor-pointer hover:text-zinc-900 dark:hover:text-white pb-0.5 border-b-2 ${
                  currentPage === link.id 
                    ? 'text-zinc-900 dark:text-white font-semibold border-zinc-900 dark:border-white' 
                    : 'text-zinc-500 dark:text-zinc-400 border-transparent'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Header Action Buttons Panel */}
          <div className="flex items-center gap-2.5">
            {/* Start the Consult Button (White fill on both light and dark theme) */}
            <button
              id="header-btn-consult"
              onClick={() => window.open('https://calendly.com/mavzenai/30min', '_blank')}
              className="hidden sm:inline-flex items-center justify-center text-[11px] tracking-wide font-semibold px-4.5 py-2 rounded-md bg-zinc-900 hover:bg-zinc-800 dark:bg-white text-white dark:text-zinc-950 dark:hover:bg-zinc-100 transition-all duration-200"
            >
              Start the Consult
            </button>

            {/* Access Catalog Button (Deep Crimson Background matching screenshot operator red) */}
            <button
              id="header-btn-access"
              onClick={() => navigateTo('systems')}
              className="inline-flex items-center justify-center text-[11px] tracking-wide font-semibold px-4.5 py-2 rounded-md bg-[#c20a26] hover:bg-[#a50920] text-white transition-all duration-200"
            >
              Access Catalog
            </button>

          </div>
        </div>
      </header>

      {/* Glowing orbs and red gradient from top */}
      {(currentPage === 'home' || currentPage === 'systems') && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[800px] pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-250px] left-1/3 w-[500px] h-[500px] rounded-full bg-zinc-800/10 dark:bg-zinc-900/5 blur-[130px]" />
          <div className="absolute top-[-150px] right-1/3 w-[400px] h-[400px] rounded-full bg-zinc-800/5 dark:bg-zinc-900/3 blur-[120px]" />
          {/* Subtle red gradient coming from the top for 3D look */}
          <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-[#c20a26]/10 dark:bg-[#c20a26]/10 blur-[140px] pointer-events-none" />
        </div>
      )}

      {/* Grid Pattern and Center Subdivision Axis Line replicating OperatorOS */}
      <div className="absolute inset-0 grid-lens-pattern opacity-40 dark:opacity-55 pointer-events-none z-0" />
      {(currentPage === 'home' || currentPage === 'systems') && (
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-zinc-200/40 dark:bg-white/[0.03] pointer-events-none z-0" />
      )}

      {/* 2. MAIN APP CONTENT CONTAINER */}
      <main className="relative z-10 pt-24 sm:pt-28 pb-20">

        {currentPage === 'systems' && (
          <>
            <SystemsPage onOpenConsult={() => setIsConsultOpen(true)} />
            <CTABottom page="systems" />
          </>
        )}

        {currentPage === 'why-mavzen' && (
          <>
            <WhyMavzenPage onOpenConsult={() => setIsConsultOpen(true)} />
            <CTABottom page="why-mavzen" />
          </>
        )}

        {currentPage === 'process' && (
          <>
            <ProcessPage onOpenConsult={() => setIsConsultOpen(true)} />
            <CTABottom page="process" />
          </>
        )}

        {currentPage === 'about' && (
          <AboutPage onOpenConsult={() => setIsConsultOpen(true)} />
        )}

        {currentPage === 'home' && (
          <>
            <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-8 sm:pb-12 pt-4 relative z-10 min-h-[550px] flex flex-col justify-center">
          <motion.div
            className="flex flex-col items-center justify-center w-full"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {/* Badge */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16,1,0.3,1] } } }}
              className="inline-flex items-center justify-center mb-8"
            >
              <button
                id="hero-badge-consult"
                onClick={() => window.open('https://calendly.com/mavzenai/30min', '_blank')}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200/50 dark:border-zinc-700/50 bg-zinc-50/50 dark:bg-[#111111] hover:bg-zinc-100 hover:dark:bg-[#1a1a1a] text-[12px] font-sans font-medium text-zinc-600 dark:text-zinc-300 tracking-tight transition-all duration-300 shadow-sm"
              >
                <Globe size={12} className="text-zinc-400 dark:text-zinc-500" />
                <span>A.I. Systems Consulting</span>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 ml-0.5">›</span>
              </button>
            </motion.div>

            {/* Heading */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16,1,0.3,1] } } }}
              className="max-w-5xl mx-auto mb-7 w-full px-4"
            >
              <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold tracking-tight text-zinc-950 dark:text-white leading-[1.05] select-none text-center mx-auto">
                We Design, Build, and Deploy
                <br />
                <span className="text-[#c20a26]">AI Systems You Own</span>
              </h1>
            </motion.div>

            {/* Subheading */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16,1,0.3,1] } } }}
              className="flex flex-col items-center gap-3 mb-12"
            >
              <h3 className="text-lg sm:text-[20px] font-medium text-zinc-800 dark:text-zinc-200">
                A.I. Systems Consulting & Build
              </h3>
              <p className="max-w-2xl mx-auto text-[15px] sm:text-[16px] text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed text-center px-4">
                We architect your AI system, ship it inside your environment, and hand you the keys.
                <br className="hidden sm:block" />
                One multi-phase engagement.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16,1,0.3,1] } } }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                id="hero-btn-consult-main"
                onClick={() => window.open('https://calendly.com/mavzenai/30min', '_blank')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#c20a26] hover:bg-[#a50920] text-white font-semibold rounded-lg px-7 py-3 text-[15px] tracking-wide transition-all duration-200 active:scale-98 shadow-lg shadow-rose-900/20"
              >
                Start the Consult
                <ArrowRight size={16} strokeWidth={2.5} className="ml-0.5" />
              </button>
              <button
                id="hero-btn-see-build"
                onClick={() => scrollToSection('features')}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent dark:bg-[#111111] hover:bg-zinc-100 dark:hover:bg-[#1a1a1a] border border-zinc-200 dark:border-[#222222] text-zinc-700 dark:text-zinc-200 font-semibold rounded-lg px-7 py-3 text-[15px] tracking-wide transition-all duration-200"
              >
                See What We Build
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* ================= DASHBOARD MOCKUP ANCHOR ================= */}
        <section id="dashboard" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <DashboardMockup />
          </motion.div>
        </section>

        <SectionDivider />

        {/* ================= INTERACTIVE ARCHITECTURE VISUALIZATION ================= */}
        <section id="architecture-viz-showcase" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold tracking-[-0.03em] text-zinc-950 dark:text-white">
              Vesper D2C Operating System
            </h2>
            <p className="max-w-xl mx-auto text-sm text-zinc-500 dark:text-zinc-400">
              Simulate live AI automation controlling a luxury fashion brand in real time.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <ArchitectureViz />
          </motion.div>
        </section>

        <SectionDivider />

        {/* ================= INTEGRATIONS — OperatorOS Style ================= */}
        <section id="integrations" className="py-10 sm:py-16 overflow-hidden relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-16 max-w-3xl"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-extrabold tracking-[-0.04em] text-zinc-950 dark:text-white leading-[1.06]">
                Works with the tools
                <br />
                <span className="text-zinc-400 dark:text-zinc-500">you already use.</span>
              </h2>
              <p className="mt-5 text-base sm:text-lg text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed">
                CRMs, email, messaging, support, and ecommerce — your existing stack wired into one coherent system.
              </p>
            </motion.div>

            {/* Integration grid */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            >
              {[
                { name: 'Shopify', emoji: '🛍️', color: 'bg-emerald-500/10 dark:bg-emerald-500/10', border: 'border-emerald-500/20', cat: 'Ecommerce' },
                { name: 'Klaviyo', emoji: '✉️', color: 'bg-yellow-500/10 dark:bg-yellow-500/10', border: 'border-yellow-500/20', cat: 'Email' },
                { name: 'WhatsApp', emoji: '💬', color: 'bg-green-500/10 dark:bg-green-500/10', border: 'border-green-500/20', cat: 'Messaging' },
                { name: 'Stripe', emoji: '💳', color: 'bg-indigo-500/10 dark:bg-indigo-500/10', border: 'border-indigo-500/20', cat: 'Payments' },
                { name: 'Gorgias', emoji: '🎧', color: 'bg-blue-500/10 dark:bg-blue-500/10', border: 'border-blue-500/20', cat: 'Support' },
                { name: 'HubSpot', emoji: '🔥', color: 'bg-orange-500/10 dark:bg-orange-500/10', border: 'border-orange-500/20', cat: 'CRM' },
                { name: 'Meta Ads', emoji: '👥', color: 'bg-blue-600/10 dark:bg-blue-600/10', border: 'border-blue-600/20', cat: 'Ads' },
                { name: 'TikTok', emoji: '🎵', color: 'bg-pink-500/10 dark:bg-pink-500/10', border: 'border-pink-500/20', cat: 'Ads' },
                { name: 'Google Ads', emoji: '📈', color: 'bg-red-500/10 dark:bg-red-500/10', border: 'border-red-500/20', cat: 'Ads' },
                { name: 'Notion', emoji: '📝', color: 'bg-zinc-500/10 dark:bg-zinc-500/10', border: 'border-zinc-500/20', cat: 'Productivity' },
                { name: 'ShipStation', emoji: '📦', color: 'bg-cyan-500/10 dark:bg-cyan-500/10', border: 'border-cyan-500/20', cat: 'Logistics' },
                { name: 'Recharge', emoji: '🔄', color: 'bg-violet-500/10 dark:bg-violet-500/10', border: 'border-violet-500/20', cat: 'Subscriptions' },
                { name: 'QuickBooks', emoji: '📊', color: 'bg-teal-500/10 dark:bg-teal-500/10', border: 'border-teal-500/20', cat: 'Finance' },
                { name: 'Gmail', emoji: '📧', color: 'bg-red-400/10 dark:bg-red-400/10', border: 'border-red-400/20', cat: 'Email' },
                { name: 'Slack', emoji: '⚡', color: 'bg-purple-500/10 dark:bg-purple-500/10', border: 'border-purple-500/20', cat: 'Comms' },
              ].map((tool, idx) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: idx * 0.03 }}
                  className={`group flex flex-col items-center gap-3 p-5 rounded-2xl border ${tool.border} ${tool.color} hover:scale-105 transition-all duration-200 cursor-default`}
                >
                  <span className="text-3xl">{tool.emoji}</span>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 leading-none">{tool.name}</p>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-500 mt-1 uppercase tracking-wide">{tool.cat}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Subtle bottom note */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 text-xs text-zinc-400 dark:text-zinc-600"
            >
              + many more integrations built to your specific stack during onboarding
            </motion.p>
          </div>
        </section>

        <SectionDivider />

        {/* ================= THE FIVE SYSTEMS SECTION ================= */}
        <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 relative z-10">
          <motion.div
            className="text-center space-y-4 mb-14 sm:mb-20"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-extrabold tracking-[-0.04em] text-zinc-950 dark:text-white">
              Five systems. One operating layer.
            </h2>
            <p className="max-w-xl mx-auto text-sm sm:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
              The systems we ship compose your go-to-market and internal operations. Custom-built, deployed in your secure cloud environment, fully owned by you from day one.
            </p>
          </motion.div>

          <SystemsSection />
        </section>

        <SectionDivider />

        {/* ================= BY THE NUMBERS ACCENTS ================= */}
        <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 relative z-10">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-extrabold tracking-[-0.04em] text-zinc-950 dark:text-white">
              Built for results, not promises
            </h2>
            <p className="max-w-lg mx-auto text-sm text-zinc-500 dark:text-zinc-400">
              Every metric is a commitment. Every number is something we deliver on, project after project.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {METRICS.map((metric, i) => (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900/60 p-7 sm:p-9 rounded-2xl hover:border-zinc-300 dark:hover:border-zinc-800 hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className={`w-2 h-2 rounded-full ${metric.accentColor === 'red' ? 'bg-rose-500' : 'bg-indigo-500'}`} />
                  <span className="text-[11px] font-sans uppercase tracking-widest">{metric.label}</span>
                </div>
                <div className="text-5xl sm:text-6xl font-display font-extrabold mt-5 tracking-tight">
                  {metric.value}
                  <span className={`text-xl font-sans font-normal ml-1 ${metric.accentColor === 'red' ? 'text-rose-500' : 'text-indigo-400'}`}>
                    {metric.suffix}
                  </span>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4 leading-relaxed">
                  {metric.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* ================= CLIENT RESULTS ================= */}
        <section id="results" className="py-10 sm:py-16 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center space-y-4 mb-16"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-extrabold tracking-[-0.04em] text-zinc-950 dark:text-white">
                Results Brands Are Getting
              </h2>
              <p className="max-w-xl mx-auto text-sm text-zinc-500 dark:text-zinc-400">
                Actual outcomes from D2C brands improving operations, saving founder time, and building smoother, more consistent execution systems.
              </p>
            </motion.div>

            <ClientResults onOpenConsult={() => setIsConsultOpen(true)} />
          </div>
        </section>

        <SectionDivider />

        {/* ================= TRUST BENTO GRID ================= */}
        <section id="trust" className="py-10 sm:py-16 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center space-y-4 mb-16"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-extrabold tracking-[-0.04em] text-zinc-950 dark:text-white">
                Built to be handed off
              </h2>
              <p className="max-w-xl mx-auto text-sm text-zinc-500 dark:text-zinc-400">
                We build in your environment. You own the code, the data, and every account.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Shield, title: 'Client-Owned Infrastructure', desc: 'Every system runs in your accounts. We build it, you own it. No vendor lock-in, ever.' },
                { icon: Lock, title: 'Data Sovereignty', desc: 'Your data never leaves your infrastructure. Full control over storage, access, and processing.' },
                { icon: Eye, title: 'Production-Grade Reliability', desc: '99%+ uptime, real monitoring, and incident response. Not demos. Real deployments.' }
              ].map((tr, idx) => {
                const IconComp = tr.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
                    className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900 p-8 sm:p-10 rounded-2xl flex flex-col justify-between gap-8 hover:border-zinc-300 dark:hover:border-zinc-800 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="p-3 bg-rose-500/8 text-rose-500 rounded-xl w-12 h-12 flex items-center justify-center">
                      <IconComp size={20} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-base font-bold text-zinc-800 dark:text-zinc-100">
                        {tr.title}
                      </h4>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {tr.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <CTABottom page="home" />
          </>
        )}

      </main>

      {/* ================= FOOTER LINKS & COPYRIGHTS ================= */}
      <footer className="border-t border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 py-12 sm:py-16 relative z-10 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-12">
          
          {/* Logo & Description */}
          <div className="space-y-4">
            <Logo showText={true} size={30} />
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm">
              AI infrastructure for modern D2C brands. We design systems that automate operations, improve customer experience, and help brands scale efficiently.
            </p>
            <div className="pt-2">
              <div className="flex items-center gap-3">
                {socialLinks.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <IconComponent size={16} />
                      <span className="sr-only">{item.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="space-y-4">
            <h5 className="font-semibold text-zinc-800 dark:text-zinc-100 tracking-wider text-xs">NAVIGATION</h5>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', action: () => navigateTo('home') },
                { label: 'Systems', action: () => navigateTo('systems') },
                { label: 'Why Mavzen', action: () => navigateTo('why-mavzen') },
                { label: 'Process', action: () => navigateTo('process') },
                { label: 'About', action: () => navigateTo('about') }
              ].map((item) => (
                <li key={item.label}>
                  <button 
                    onClick={item.action}
                    className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer text-left text-xs"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Systems Column */}
          <div className="space-y-4">
            <h5 className="font-semibold text-zinc-800 dark:text-zinc-100 tracking-wider text-xs">SYSTEMS</h5>
            <ul className="space-y-2.5">
              {[
                'Customer Support Systems',
                'Retention Systems',
                'CRM Follow-Up Systems',
                'Cart Recovery Systems',
                'Operations Systems',
                'Reporting Systems'
              ].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => navigateTo('systems')}
                    className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer text-left text-xs"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-4">
            <h5 className="font-semibold text-zinc-800 dark:text-zinc-100 tracking-wider text-xs">COMPANY</h5>
            <ul className="space-y-2.5">
              {[
                { label: 'About Mavzen', action: () => navigateTo('about') },
                { label: 'How We Work', action: () => navigateTo('process') },
                { label: 'Why Mavzen', action: () => navigateTo('why-mavzen') },
                { label: 'FAQ', action: () => scrollToSection('faq') },
                { label: 'Contact', action: () => setIsConsultOpen(true) }
              ].map((item) => (
                <li key={item.label}>
                  <button 
                    onClick={item.action}
                    className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer text-left text-xs"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div className="space-y-4">
            <h5 className="font-semibold text-zinc-800 dark:text-zinc-100 tracking-wider text-xs">RESOURCES</h5>
            <ul className="space-y-2.5">
              {[
                'Systems Overview',
                'AI Infrastructure Guide',
                'Support Automation',
                'Retention Automation',
                'Operations Automation'
              ].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => navigateTo('systems')}
                    className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer text-left text-xs"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom copyright line elements */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-zinc-200/50 dark:border-zinc-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-400 dark:text-zinc-650 text-[11px]">
          <span>© 2026 Mavzen AI. All rights reserved.</span>
          <div className="flex gap-4 flex-wrap justify-center sm:justify-end">
            <a href="#privacy" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Terms of Service</a>
            <a href="mailto:mavzenai@gmail.com" className="hover:text-zinc-900 dark:hover:text-white transition-colors">mavzenai@gmail.com</a>
          </div>
        </div>
      </footer>

      {/* Floating consult scheduler dialog modal */}
      <ConsultModal isOpen={isConsultOpen} onClose={() => setIsConsultOpen(false)} />

      </div>
    </ThemeContext.Provider>
  );
}
