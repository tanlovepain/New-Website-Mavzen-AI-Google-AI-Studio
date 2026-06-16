import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, Check, Globe, Sun, Moon, Briefcase, Sparkles, Database, Sliders, Shield, Lock, Eye, Instagram, Twitter, Linkedin
} from 'lucide-react';

import Logo from './components/Logo';
import ConsultModal from './components/ConsultModal';

type ThemeMode = 'light' | 'dark';
const ThemeContext = React.createContext<{ theme: ThemeMode; toggleTheme: () => void }>({
  theme: 'dark',
  toggleTheme: () => {},
});
import DashboardMockup from './components/DashboardMockup';
import SystemsSection from './components/SystemsSection';
import ClientResults from './components/ClientResults';
import ArchitectureViz from './components/ArchitectureViz';
import SystemsPage from './components/SystemsPage';
import WhyMavzenPage from './components/WhyMavzenPage';
import ProcessPage from './components/ProcessPage';
import AboutPage from './components/AboutPage';
import { METRICS } from './data';

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
        className="fixed top-0 left-0 h-[3px] bg-[#c20a26] z-50 transition-all duration-150 ease-out"
        style={{
          width: `${scrollProgress}%`,
          boxShadow: scrollProgress > 0 ? '0 0 12px rgba(194, 10, 38, 0.4)' : 'none'
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
              onClick={() => setIsConsultOpen(true)}
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

            {/* Premium Theme Switcher Sliding Toggle */}
            <button
              id="header-btn-theme-toggle"
              onClick={toggleTheme}
              className="relative inline-flex items-center justify-between w-16 h-8 px-1 rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900/60 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300"
              title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {/* Sliding Background Indicator */}
              <div
                className={`absolute top-1 bottom-1 w-6 bg-white dark:bg-zinc-800 rounded-full shadow-sm transition-all duration-300 ease-out ${
                  theme === 'dark' ? 'left-1' : 'left-9'
                }`}
              />
              
              {/* Icons Container */}
              <div className="relative w-full h-full flex items-center justify-between px-2 z-10">
                {/* Sun Icon (Light Mode) */}
                <div className="w-5 h-5 flex items-center justify-center">
                  <Sun
                    size={18}
                    className={`transition-all duration-300 ${
                      theme === 'light'
                        ? 'text-amber-500 opacity-100 scale-110'
                        : 'text-zinc-400 opacity-40 scale-100'
                    }`}
                  />
                </div>
                
                {/* Moon Icon (Dark Mode) */}
                <div className="w-5 h-5 flex items-center justify-center">
                  <Moon
                    size={18}
                    className={`transition-all duration-300 ${
                      theme === 'dark'
                        ? 'text-blue-400 opacity-100 scale-110'
                        : 'text-zinc-500 opacity-40 scale-100'
                    }`}
                  />
                </div>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Subtle metallic gray glow orbs to prevent unrequested red/purple gradients */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-250px] left-1/3 w-[500px] h-[500px] rounded-full bg-zinc-800/10 dark:bg-zinc-900/5 blur-[130px]" />
        <div className="absolute top-[-150px] right-1/3 w-[400px] h-[400px] rounded-full bg-zinc-800/5 dark:bg-zinc-900/3 blur-[120px]" />
      </div>

      {/* 2. MAIN APP CONTENT CONTAINER */}
      <main className="relative z-10 pt-28 sm:pt-32 pb-20">

        {currentPage === 'systems' && (
          <SystemsPage onOpenConsult={() => setIsConsultOpen(true)} />
        )}

        {currentPage === 'why-mavzen' && (
          <WhyMavzenPage onOpenConsult={() => setIsConsultOpen(true)} />
        )}

        {currentPage === 'process' && (
          <ProcessPage onOpenConsult={() => setIsConsultOpen(true)} />
        )}

        {currentPage === 'about' && (
          <AboutPage onOpenConsult={() => setIsConsultOpen(true)} />
        )}

        {currentPage === 'home' && (
          <>
            {/* ================= HERO SECTION ================= */}
            <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 pb-12 sm:pb-24 pt-4 relative">
          
          {/* Header pill-badge matching screenshots exactly */}
          <div className="inline-flex items-center justify-center z-10 relative">
            <button
              id="hero-badge-consult"
              onClick={() => setIsConsultOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200/50 dark:border-zinc-900/80 bg-zinc-50/50 dark:bg-zinc-950/40 hover:bg-zinc-100 hover:dark:bg-zinc-900/30 text-[11px] font-sans font-medium text-zinc-650 dark:text-zinc-350 tracking-tight transition-all duration-300"
            >
              <Globe size={11.5} className="text-zinc-400 dark:text-zinc-500" />
              <span>A.I. Systems Consulting</span>
              <span className="text-[9px] text-zinc-400 dark:text-zinc-600 ml-0.5">➔</span>
            </button>
          </div>

          {/* Master Display Heading reverting to original Sentence Case Outfit typography */}
          <div className="max-w-4xl mx-auto space-y-4 z-10 relative">
            <h1 className="font-sans text-4xl sm:text-[4.25rem] md:text-[4.75rem] lg:text-[5.25rem] font-extrabold tracking-[-0.035em] text-zinc-950 dark:text-white leading-[1.02] select-none">
              AI Infrastructure That Makes <br />
              <span className="text-[#c20a26]">D2C Brands More Profitable</span>
            </h1>
          </div>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-500 dark:text-zinc-400 font-sans font-medium tracking-tight leading-relaxed z-10 relative">
            Automate support, retention, and operations to increase revenue, reduce costs, and scale without adding headcount.
          </p>

          {/* Action Call-to-action Triggers exactly as OperatorOS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 z-10 relative">
            <button
              id="hero-btn-consult-main"
              onClick={() => setIsConsultOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-[#c20a26] hover:bg-[#a50920] text-white font-semibold rounded-md px-7 py-3 text-xs tracking-wider uppercase transition-all duration-200 active:scale-98"
            >
              Start the Consult
              <span className="text-xs">➔</span>
            </button>
            <button
              id="hero-btn-see-build"
              onClick={() => scrollToSection('features')}
              className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold rounded-md px-7 py-3 text-xs tracking-wider uppercase transition-all duration-200"
            >
              See What We Build
            </button>
          </div>
        </section>

        {/* ================= DASHBOARD MOCKUP ANCHOR ================= */}
        <section id="dashboard" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
          <DashboardMockup />
        </section>

        {/* ================= INTERACTIVE ARCHITECTURE VISUALIZATION ================= */}
        <section id="architecture-viz-showcase" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
          <div className="text-center space-y-3 mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-[800] tracking-[-0.03em] text-zinc-950 dark:text-white">
              Vesper D2C Operating System
            </h2>
            <p className="max-w-xl mx-auto text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Simulate live AI automation controlling a luxury fashion brand in real time. Choose an engine below to start the pipeline sequence.
            </p>
          </div>
          <ArchitectureViz />
        </section>

        {/* ================= INTEGRATIONS MULTI-ROW MARQUEE ================= */}
        <section id="integrations" className="border-y border-zinc-200/50 dark:border-zinc-900/60 bg-zinc-50/45 dark:bg-zinc-950/20 py-16 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
            <h2 className="text-3xl sm:text-4xl font-sans font-[800] mt-3 text-zinc-900 dark:text-white tracking-[-0.02em]">
              The Connectors We Build For You
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-lg mx-auto leading-relaxed">
              Ecommerce checkouts, customer email flows, WhatsApp responders, and CRM statuses. Your entire marketing and GTM stack synced natively with absolute custody.
            </p>
          </div>

          <div className="space-y-5 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-24 before:bg-linear-to-r before:from-zinc-50/45 dark:before:from-[#040405] before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-24 after:bg-linear-to-l after:from-zinc-50/45 dark:after:from-[#040405] after:to-transparent after:z-10">
            {/* Row 1: Forward Marquee */}
            <div className="flex w-full select-none overflow-hidden h-fit">
              <div className="flex gap-4 items-center animate-marquee-forward whitespace-nowrap">
                {[
                  { name: 'Shopify', icon: '🛍️', desc: 'Orders & inventory' },
                  { name: 'Klaviyo', icon: '✉️', desc: 'Customer flows' },
                  { name: 'WhatsApp', icon: '💬', desc: 'Direct engagement' },
                  { name: 'Stripe', icon: '💳', desc: 'Payment capturing' },
                  { name: 'Gorgias', icon: '🎧', desc: 'Support sync' },
                  { name: 'QuickBooks', icon: '📊', desc: 'Auto reconciliation' },
                  { name: 'HubSpot', icon: '🔥', desc: 'Deal pipelines' }
                ].concat([
                  { name: 'Shopify', icon: '🛍️', desc: 'Orders & inventory' },
                  { name: 'Klaviyo', icon: '✉️', desc: 'Customer flows' },
                  { name: 'WhatsApp', icon: '💬', desc: 'Direct engagement' },
                  { name: 'Stripe', icon: '💳', desc: 'Payment capturing' },
                  { name: 'Gorgias', icon: '🎧', desc: 'Support sync' },
                  { name: 'QuickBooks', icon: '📊', desc: 'Auto reconciliation' },
                  { name: 'HubSpot', icon: '🔥', desc: 'Deal pipelines' }
                ]).map((tool, idx) => (
                  <div
                    key={`row1-${tool.name}-${idx}`}
                    className="inline-flex items-center gap-3.5 px-5 py-3.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900/80 rounded-2xl hover:border-zinc-300 dark:hover:border-zinc-800 transition-all duration-300 shadow-xs cursor-pointer hover:-translate-y-0.5"
                  >
                    <span className="text-xl shrink-0">{tool.icon}</span>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 font-sans leading-none">
                        {tool.name}
                      </span>
                      <span className="text-[9px] font-sans text-zinc-400 dark:text-zinc-500 mt-1 uppercase tracking-wider leading-none">
                        {tool.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: Backward Marquee */}
            <div className="flex w-full select-none overflow-hidden h-fit">
              <div className="flex gap-4 items-center animate-marquee-backward whitespace-nowrap">
                {[
                  { name: 'TikTok Ads', icon: '🎵', desc: 'Lead generation' },
                  { name: 'Meta Shop', icon: '👥', desc: 'Social commerce' },
                  { name: 'Google Sheets', icon: '📈', desc: 'Data archiving' },
                  { name: 'Gmail', icon: '📧', desc: 'VIP correspondence' },
                  { name: 'Notion', icon: '📝', desc: 'Wiki & repository' },
                  { name: 'ShipStation', icon: '📦', desc: 'Shipping logistics' },
                  { name: 'Recharge', icon: '🔄', desc: 'Subscription flows' }
                ].concat([
                  { name: 'TikTok Ads', icon: '🎵', desc: 'Lead generation' },
                  { name: 'Meta Shop', icon: '👥', desc: 'Social commerce' },
                  { name: 'Google Sheets', icon: '📈', desc: 'Data archiving' },
                  { name: 'Gmail', icon: '📧', desc: 'VIP correspondence' },
                  { name: 'Notion', icon: '📝', desc: 'Wiki & repository' },
                  { name: 'ShipStation', icon: '📦', desc: 'Shipping logistics' },
                  { name: 'Recharge', icon: '🔄', desc: 'Subscription flows' }
                ]).map((tool, idx) => (
                  <div
                    key={`row2-${tool.name}-${idx}`}
                    className="inline-flex items-center gap-3.5 px-5 py-3.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900/80 rounded-2xl hover:border-zinc-300 dark:hover:border-zinc-800 transition-all duration-300 shadow-xs cursor-pointer hover:-translate-y-0.5"
                  >
                    <span className="text-xl shrink-0">{tool.icon}</span>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 font-sans leading-none">
                        {tool.name}
                      </span>
                      <span className="text-[9px] font-sans text-zinc-400 dark:text-zinc-500 mt-1 uppercase tracking-wider leading-none">
                        {tool.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= THE FIVE SYSTEMS SECTION ================= */}
        <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center space-y-3 mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-[800] tracking-[-0.03em] text-zinc-950 dark:text-white lg:whitespace-nowrap">
              Five systems. One operating layer.
            </h2>
            <p className="max-w-xl mx-auto text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              The systems we ship compose your go-to-market and internal operations. Custom-built, deployed in your secure cloud environment, fully owned by you from day one.
            </p>
          </div>

          <SystemsSection />
        </section>

        {/* ================= BY THE NUMBERS ACCENTS ================= */}
        <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-[800] tracking-[-0.03em] text-zinc-950 dark:text-white lg:whitespace-nowrap">
              Built for results, not promises
            </h2>
            <p className="max-w-lg mx-auto text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Every metric is a commitment. Every number is something we deliver on, project after project.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {METRICS.map((metric) => (
              <div
                key={metric.id}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900/60 p-6 sm:p-8 rounded-2xl hover:border-zinc-300 dark:hover:border-zinc-800 transition-all duration-350"
              >
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className={`w-2 h-2 rounded-full ${metric.accentColor === 'red' ? 'bg-rose-500' : 'bg-indigo-500'}`} />
                  <span className="text-[10px] font-sans uppercase tracking-wider">{metric.label}</span>
                </div>
                <div className="text-4xl sm:text-5xl font-display font-bold mt-4 tracking-tight">
                  {metric.value}
                  <span className={`text-lg font-sans font-normal ml-0.5 ${metric.accentColor === 'red' ? 'text-rose-500' : 'text-indigo-400'}`}>
                    {metric.suffix}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-3 leading-relaxed">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= CLIENT RESULTS SLIDERS ================= */}
        <section id="results" className="bg-zinc-50/50 dark:bg-zinc-950/20 border-y border-[#e4e4e7]/40 dark:border-[#18181b]/50 py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-[800] tracking-[-0.03em] text-zinc-950 dark:text-white lg:whitespace-nowrap">
                Results Brands Are Getting
              </h2>
              <p className="max-w-xl mx-auto text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                Actual outcomes from D2C brands improving operations, saving founder time, and building smoother, more consistent execution systems.
              </p>
            </div>

            <ClientResults onOpenConsult={() => setIsConsultOpen(true)} />
          </div>
        </section>

        {/* ================= TRUST BENTO GRID ================= */}
        <section id="trust" className="bg-zinc-50/50 dark:bg-zinc-950/20 border-y border-zinc-200/50 dark:border-zinc-900/60 py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-[800] tracking-[-0.03em] text-zinc-950 dark:text-white lg:whitespace-nowrap">
                Built to be handed off
              </h2>
              <p className="max-w-xl mx-auto text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                We build in your environment. You own the code, the data, and every account.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Shield, title: 'Client-Owned Infrastructure', desc: 'Every system runs in your accounts. We build it, you own it. No vendor lock-in, ever.' },
                { icon: Lock, title: 'Data Sovereignty', desc: 'Your data never leaves your infrastructure. Full control over storage, access, and processing.' },
                { icon: Eye, title: 'Production-Grade Reliability', desc: '99%+ uptime, real monitoring, and incident response. Not demos. Real deployments.' }
              ].map((tr, idx) => {
                const IconComp = tr.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900 p-6 sm:p-8 rounded-2xl flex flex-col justify-between h-56 hover:border-zinc-300 dark:hover:border-zinc-850 hover:shadow-xs transition-colors duration-250"
                  >
                    <div className="p-2.5 bg-rose-550/5 text-rose-500 rounded-lg w-10 h-10 flex items-center justify-center">
                      <IconComp size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                        {tr.title}
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2 leading-relaxed">
                        {tr.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>


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
