import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Bot, ArrowRight, Play, Square, Settings, Database, Sliders, CheckSquare, PhoneCall, ShieldCheck, Cpu } from 'lucide-react';

export default function SystemsSection() {
  // 1. Core Knowledge state
  const [chatQuestion, setChatQuestion] = useState('What\'s our return policy?');
  const [chatAnswer, setChatAnswer] = useState('We offer a 30-day hassle-free window with prepaid return labels.');
  const [isTyping, setIsTyping] = useState(false);

  const handleQuestionSelect = (q: string, a: string) => {
    setIsTyping(true);
    setChatQuestion(q);
    setChatAnswer('');
    setTimeout(() => {
      setChatAnswer(a);
      setIsTyping(false);
    }, 400);
  };

  // 2. Workflow checklist
  const [checklist, setChecklist] = useState([
    { id: 'c1', text: 'Identify checkout abandonment', checked: true },
    { id: 'c2', text: 'Calibrate discount based on value', checked: false },
    { id: 'c3', text: 'Dispatch personalized SMS draft', checked: false },
    { id: 'c4', text: 'Verify payment was recovered', checked: false, isNew: true }
  ]);

  const toggleCheck = (id: string) => {
    setChecklist(
      checklist.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  // 3. Routing Engine logic
  const [selectedRoute, setSelectedRoute] = useState<'high_value' | 'unhappy' | 'sizing' | 'return_req'>('high_value');

  const getRuleForRoute = () => {
    switch (selectedRoute) {
      case 'unhappy':
        return 'IF Customer Sentiment is Unsatisfied THEN Escalate to Head of Growth';
      case 'sizing':
        return 'IF Sizing Query is Unsure THEN Dynamic Shopify spec sheet auto-sent';
      case 'return_req':
        return 'IF Returns requested > 30 days THEN Flag for manager approval override';
      case 'high_value':
      default:
        return 'IF Checkout Value exceeds $500 THEN Route to VIP Specialist concierge';
    }
  };

  const getActionForRoute = () => {
    switch (selectedRoute) {
      case 'unhappy':
        return 'escalate';
      case 'sizing':
        return 'reply';
      case 'return_req':
        return 'alert';
      case 'high_value':
      default:
        return 'route';
    }
  };

  // 4. Voice wave simulator State
  const [isCallActive, setIsCallActive] = useState(true);
  const [callTimer, setCallTimer] = useState('02:34');
  const [barHeights, setBarHeights] = useState<number[]>([]);

  // Generate random heights for the voice bar wave
  useEffect(() => {
    const barsCount = 28;
    const initialBars = Array.from({ length: barsCount }, () => Math.floor(Math.random() * 40) + 10);
    setBarHeights(initialBars);

    if (!isCallActive) return;

    const timer = setInterval(() => {
      setBarHeights(Array.from({ length: barsCount }, () => Math.floor(Math.random() * 70) + 15));
      // increment timer seconds slightly for live visual output
      setCallTimer((prev) => {
        const [m, s] = prev.split(':').map(Number);
        const nextSeconds = s + 1;
        if (nextSeconds >= 60) {
          return `0${m + 1}:00`;
        }
        return `0${m}:${nextSeconds < 10 ? '0' : ''}${nextSeconds}`;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isCallActive]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* 1. Knowledge Systems Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900/60 p-5 rounded-2xl flex flex-col justify-between group h-full hover:border-zinc-300 dark:hover:border-rose-950/40 hover:shadow-lg dark:hover:shadow-rose-950/20 transition-all duration-300">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-sans tracking-wider text-rose-500 font-semibold px-2 py-0.5 bg-rose-500/5 rounded border border-rose-500/10">
              OPERATIONS BRAIN
            </span>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-sans">
              Bespoke brand specs
            </span>
          </div>
          <h3 className="text-lg font-display font-semibold mt-3 text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
            <Database size={17} className="text-zinc-400 dark:text-rose-500 shrink-0" />
            Knowledge Systems
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
            Your brand holds massive knowledge — product specifications, sizing grids, and shipping specs. We link them into one intelligent layer.
          </p>

          {/* Interactive Chat Block Mockup */}
          <div className="mt-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl p-3 border border-zinc-100 dark:border-zinc-900 text-xs space-y-3">
            <div className="text-right">
              <span className="inline-block bg-zinc-200 dark:bg-zinc-900 px-3 py-1.5 rounded-lg rounded-tr-none text-zinc-800 dark:text-zinc-300 text-[11px]">
                {chatQuestion}
              </span>
            </div>
            <div>
              <div className="flex gap-2 items-start">
                <span className="w-5 h-5 rounded-full bg-rose-600 flex items-center justify-center text-white shrink-0 text-[10px] font-bold">
                  M
                </span>
                <div className="bg-rose-500/5 dark:bg-zinc-900 px-3 py-1.5 rounded-lg rounded-tl-none text-zinc-700 dark:text-zinc-300 text-[11px] border border-rose-100 dark:border-zinc-800 flex-1 min-h-[30px]">
                  {isTyping ? (
                    <span className="flex gap-1 items-center h-4">
                      <span className="w-1 h-1 rounded-full bg-zinc-400 animate-bounce" />
                      <span className="w-1 h-1 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1 h-1 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.4s]" />
                    </span>
                  ) : (
                    <span>{chatAnswer || 'Connecting to Brand Brain...'}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Suggested Chat prompts to demonstrate real-time interactions! */}
        <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-900">
          <div className="text-[10px] font-sans text-zinc-400 dark:text-zinc-600 mb-2">TRY SIMULATING QUERIES:</div>
          <div className="space-y-1.5">
            {[
              { q: 'What\'s our return policy?', a: 'We offer a 30-day hassle-free window with prepaid return labels.' },
              { q: 'Do you ship internationally?', a: 'Yes, we ship globally! Delivery takes 3-7 business days depending on location.' },
              { q: 'Is the cashmere coat hand wash?', a: 'We recommend dry clean only or professional storage to keep luxury fibers intact.' }
            ].map((p, idx) => (
              <button
                id={`rag-sample-${idx}`}
                key={idx}
                type="button"
                onClick={() => handleQuestionSelect(p.q, p.a)}
                className={`w-full text-left bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-950 dark:hover:bg-zinc-900 border border-zinc-100 dark:border-zinc-900 text-[11px] px-2.5 py-1.5 rounded-md flex items-center justify-between text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-all ${
                  chatQuestion === p.q ? 'ring-1 ring-rose-500 border-transparent text-rose-600 dark:text-rose-400 font-medium' : ''
                }`}
              >
                <span className="truncate">{p.q}</span>
                <ArrowRight size={10} className="shrink-0 text-zinc-400" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Workflow Automation Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900/60 p-5 rounded-2xl flex flex-col justify-between group h-full hover:border-zinc-300 dark:hover:border-rose-950/40 hover:shadow-lg dark:hover:shadow-rose-950/20 transition-all duration-300">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-sans tracking-wider text-rose-500 font-semibold px-2 py-0.5 bg-rose-500/5 rounded border border-rose-500/10">
              AUTOMATIONS
            </span>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-sans">
              Shopify + Klaviyo
            </span>
          </div>
          <h3 className="text-lg font-display font-semibold mt-3 text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
            <CheckSquare size={17} className="text-zinc-400 dark:text-rose-500 shrink-0" />
            Workflow Automation
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
            The follow-ups, recovery notifications, and inventory drop messages your team coordinates manually. Now fully automated to your specifications.
          </p>

          {/* Interactive Checklist Mockup */}
          <div className="mt-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl p-3.5 border border-zinc-100 dark:border-zinc-900 space-y-2 max-h-[190px] overflow-y-auto">
            {checklist.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-800 transition-all duration-200 cursor-pointer text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                    item.checked 
                      ? 'bg-rose-600 border-rose-600 text-white shadow' 
                      : 'border-zinc-300 dark:border-zinc-700 bg-transparent'
                  }`}>
                    {item.checked && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </span>
                  <span className={`${item.checked ? 'line-through text-zinc-400 dark:text-zinc-600' : 'text-zinc-700 dark:text-zinc-300'}`}>
                    {item.text}
                  </span>
                </div>
                {item.isNew && (
                  <span className="text-[8px] font-sans px-1.5 py-0.5 bg-rose-500 text-white font-bold rounded-sm animate-pulse">
                    NEW
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick simulation controls to custom loop tasks */}
        <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-900 flex justify-between items-center text-xs text-zinc-400">
          <span>Click checkboxes to check logic execution</span>
          <button
            id="btn-add-simulated-task"
            type="button"
            onClick={() => {
              const extraTasks = [
                'Update customer purchase history',
                'Notify warehouse fulfillment',
                'Generate custom invoice PDF',
                'Draft recovery email proposal'
              ];
              const randomText = extraTasks[Math.floor(Math.random() * extraTasks.length)];
              setChecklist([...checklist, { id: `c-${Date.now()}`, text: randomText, checked: false, isNew: true }]);
            }}
            className="text-rose-500 font-sans hover:underline font-semibold focus:outline-none"
          >
            + Inject Action
          </button>
        </div>
      </div>      {/* 3. Decision Logic Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900/60 p-5 rounded-2xl flex flex-col justify-between group h-full hover:border-zinc-300 dark:hover:border-rose-950/40 hover:shadow-lg dark:hover:shadow-rose-950/20 transition-all duration-300 md:col-span-2 lg:col-span-1">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-sans tracking-wider text-rose-500 font-semibold px-2 py-0.5 bg-rose-500/5 rounded border border-rose-500/10">
              ROUTING
            </span>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-sans">
              Business Rules
            </span>
          </div>
          <h3 className="text-lg font-display font-semibold mt-3 text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
            <Sliders size={17} className="text-zinc-400 dark:text-rose-500 shrink-0" />
            Decision Logic
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
            Inquiries that should route to VIP assistance sit in queues. Dissatisfied customer tickets get buried. Custom decision routing fixes this instantly.
          </p>

          {/* Interactive Routing Flow Mockup */}
          <div className="mt-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl p-3 border border-zinc-100 dark:border-zinc-900 space-y-3 text-[11px]">
            <div className="flex justify-between gap-1 items-center font-sans text-[9px] text-zinc-400 pb-1.5 border-b border-zinc-100 dark:border-zinc-900">
              <span>CUSTOMER TRIGGER</span>
              <span>LOGIC EVALUATOR</span>
              <span>OUTCOMES</span>
            </div>

            {/* Simulated Nodes & Actions */}
            <div className="grid grid-cols-3 gap-2 items-center">
              {/* Ingest side buttons */}
              <div className="space-y-1">
                {([
                  { id: 'high_value', label: 'High Value' },
                  { id: 'unhappy', label: 'Unhappy Client' },
                  { id: 'sizing', label: 'Sizing Query' },
                  { id: 'return_req', label: 'Return Request' }
                ] as const).map((source) => (
                  <button
                    id={`ingest-source-${source.id}`}
                    key={source.id}
                    onClick={() => setSelectedRoute(source.id)}
                    className={`w-full py-1 text-center font-sans rounded cursor-pointer transition-all border text-[9px] ${
                      selectedRoute === source.id
                        ? 'bg-rose-500 text-white border-rose-500 shadow-sm font-semibold'
                        : 'bg-white dark:bg-zinc-900 border-zinc-200/50 dark:border-zinc-800/80 text-zinc-400 dark:text-zinc-500 hover:text-zinc-700'
                    }`}
                  >
                    • {source.label}
                  </button>
                ))}
              </div>

              {/* Central logical block */}
              <div className="bg-zinc-100 dark:bg-zinc-900/60 border border-rose-500/10 p-2 rounded text-center text-[9px] font-sans font-medium relative overflow-hidden flex flex-col justify-center min-h-[75px] h-full shadow-inner ring-1 ring-rose-500/5">
                <span className="text-rose-500 font-bold dark:text-rose-400 block mb-1">EVALUATING:</span>
                <span className="text-zinc-650 dark:text-zinc-400 leading-tight font-sans">
                  {getRuleForRoute()}
                </span>
                {/* Active light effect */}
                <div className="absolute inset-0 bg-radial-gradient from-rose-500/10 to-transparent animate-pulse pointer-events-none" />
              </div>

              {/* Actions feedback block */}
              <div className="space-y-1 text-right">
                {[
                  { id: 'route', text: 'VIP Specialist' },
                  { id: 'escalate', text: 'Growth Head Alert' },
                  { id: 'reply', text: 'Auto Spec PDF' },
                  { id: 'alert', text: 'Flag to Manager' }
                ].map((act) => {
                  const isActive = getActionForRoute() === act.id;
                  return (
                    <div
                      key={act.id}
                      className={`py-1 pr-1.5 font-sans text-[9px] rounded border transition-all ${
                        isActive
                          ? 'bg-emerald-550/10 dark:bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold scale-[1.02]'
                          : 'opacity-40 border-transparent text-zinc-500'
                      }`}
                    >
                      • {act.text}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom telemetry line */}
            <div className="flex justify-between items-center text-[8px] font-sans text-zinc-400 dark:text-zinc-600 border-t border-zinc-100 dark:border-zinc-900/40 pt-1.5 mt-1">
              <span>Deterministic logic</span>
              <span>99.9% accurate</span>
              <span className="text-emerald-500 text-[10px]">✔ ACTIVE OK</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-900 text-xs text-zinc-400">
          Click a customer trigger to review the logical formula.
        </div>
      </div>

      {/* 4. Voice Agents Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900/60 p-5 rounded-2xl flex flex-col justify-between group h-full hover:border-zinc-300 dark:hover:border-rose-950/40 hover:shadow-lg dark:hover:shadow-rose-950/20 transition-all duration-300">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-sans tracking-wider text-rose-500 font-semibold px-2 py-0.5 bg-rose-500/5 rounded border border-rose-500/10">
              VOICE ASSISTANT
            </span>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-sans">
              Inbound & Outbound
            </span>
          </div>
          <h3 className="text-lg font-display font-semibold mt-3 text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
            <PhoneCall size={17} className="text-zinc-400 dark:text-rose-500 shrink-0" />
            Voice Agents
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
            Inbound qualification, outbound VIP follow-ups, and booking confirmations. Running continuously inside infrastructure you completely own.
          </p>

          {/* PULSING AUDIO WAVE VISUALIZER */}
          <div className="mt-4 bg-zinc-950 rounded-xl p-3 border border-zinc-900 space-y-4">
            <div className="flex items-center justify-between text-[9px] font-sans">
              <span className="flex items-center gap-1 text-zinc-400">
                <span className={`h-1.5 w-1.5 rounded-full ${isCallActive ? 'bg-rose-500 animate-ping' : 'bg-transparent'}`} />
                <span className="text-zinc-400 font-bold">{isCallActive ? 'Voice call active' : 'Voice engine ready'}</span>
              </span>
              <span className="text-zinc-500 font-bold">{callTimer}</span>
            </div>

            {/* Pulsing Audio Bar Graphic */}
            <div className="h-16 flex items-center justify-center gap-0.5 px-2">
              {barHeights.map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="flex-1 min-w-[2px] bg-rose-600 hover:bg-rose-450 rounded-sm transition-all duration-300"
                />
              ))}
            </div>

            {/* Quick Play & Action Button */}
            <div className="flex items-center justify-between border-t border-zinc-900 pt-2 text-[10px]">
              <span className="text-zinc-550 font-sans">Vesper Voice Engine</span>
              <button
                id="btn-voice-toggle"
                type="button"
                onClick={() => setIsCallActive(!isCallActive)}
                className={`py-1 px-2 rounded-sm font-sans flex items-center gap-1 ${
                  isCallActive
                    ? 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
                    : 'bg-rose-650 hover:bg-rose-600 text-white'
                }`}
              >
                {isCallActive ? (
                  <>
                    <Square size={10} fill="currentColor" /> Mute Agent
                  </>
                ) : (
                  <>
                    <Play size={10} fill="currentColor" /> Boot Agent
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-900 text-xs text-zinc-400">
          Click the boot button to toggle the live audio wave simulation.
        </div>
      </div>

      {/* 5. Integrations & Connectors Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900/60 p-5 rounded-2xl flex flex-col justify-between group h-full hover:border-zinc-300 dark:hover:border-rose-950/40 hover:shadow-lg dark:hover:shadow-rose-950/20 transition-all duration-300 md:col-span-2 lg:col-span-2">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-sans tracking-wider text-rose-500 font-semibold px-2 py-0.5 bg-rose-500/5 rounded border border-rose-500/10">
              INTEGRATIONS
            </span>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-sans">
              Sovereign Ecosystem
            </span>
          </div>
          <h3 className="text-lg font-display font-semibold mt-3 text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
            <Cpu size={17} className="text-zinc-400 dark:text-rose-500 shrink-0" />
            Seamless Stack Connections
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
            We directly connect your primary operational tools together — Shopify, Klaviyo, WhatsApp, Stripe, Gorgias, QuickBooks, Slack, and HubSpot. We write custom secure authorization schemas and host them within your own private environment.
          </p>

          {/* App Icons Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3 mt-5">
            {[
              { name: 'Shopify', color: 'border-emerald-500/20 hover:border-emerald-500', logo: '🛍️' },
              { name: 'Klaviyo', color: 'border-green-500/20 hover:border-green-500', logo: '✉️' },
              { name: 'WhatsApp', color: 'border-teal-500/20 hover:border-teal-500', logo: '💬' },
              { name: 'Stripe', color: 'border-indigo-500/20 hover:border-indigo-500', logo: '💳' },
              { name: 'Gorgias', color: 'border-blue-500/20 hover:border-blue-500', logo: '🎧' },
              { name: 'QuickBooks', color: 'border-green-600/20 hover:border-green-600', logo: '📊' },
              { name: 'Slack', color: 'border-yellow-500/20 hover:border-yellow-500', logo: '👥' },
              { name: 'HubSpot', color: 'border-orange-500/20 hover:border-orange-500', logo: '🔥' }
            ].map((app, idx) => (
              <div
                key={idx}
                className={`bg-zinc-50 dark:bg-zinc-950 border ${app.color} py-3 rounded-xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 shadow-xs cursor-pointer`}
              >
                <span className="text-xl">{app.logo}</span>
                <span className="text-[9px] font-sans text-zinc-500 dark:text-zinc-400 mt-2 text-center truncate w-full px-1">
                  {app.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-900 text-xs text-zinc-400 flex items-center justify-between">
          <span>Secure, private integration. We write customized authentication wrappers.</span>
          <span className="text-emerald-500 font-sans text-[10px] font-semibold">✔ SECURE INTEGRATED</span>
        </div>
      </div>
    </div>
  );
}
