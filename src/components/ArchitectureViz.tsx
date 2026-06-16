import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, ShoppingCart, Users, HelpCircle, Trophy, BarChart3,
  CheckCircle2, ArrowRight, Play, RefreshCw, Send, Lock, Sparkles,
  Search, ShieldCheck, Mail, Phone, Calendar, AlertCircle
} from 'lucide-react';

interface SimulatorSystem {
  id: string;
  name: string;
  tagline: string;
  category: string;
}

export default function ArchitectureViz() {
  const [activeSystemId, setActiveSystemId] = useState<string>('whatsapp_agent');
  const [simStep, setSimStep] = useState<number>(0);
  const [simActive, setSimActive] = useState<boolean>(true);
  
  // States for interactive simulations
  const [whatsappMsgs, setWhatsappMsgs] = useState<any[]>([]);
  const [whastappTyping, setWhatsappTyping] = useState<boolean>(false);
  const [recoveredRevenue, setRecoveredRevenue] = useState<number>(14240.0);
  const [recoveredCarts, setRecoveredCarts] = useState<any[]>([
    { name: 'Emma S.', item: 'Cashmere Knit', value: 390.0, time: '1h ago', status: 'Dispatched' },
    { name: 'Marcus V.', item: 'Halston Trench', value: 240.0, time: '32m ago', status: 'Delivered' },
    { name: 'Olivia R.', item: 'Silk Slip Dress', value: 189.0, time: '14m ago', status: 'Recovered' }
  ]);
  const [cartProgressStep, setCartProgressStep] = useState<number>(0);
  const [crmLogs, setCrmLogs] = useState<string[]>([]);
  const [crmStep, setCrmStep] = useState<number>(0);
  const [supportChat, setSupportChat] = useState<any[]>([]);
  const [supportStep, setSupportStep] = useState<number>(0);
  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(850);
  const [loyaltyUnlocked, setLoyaltyUnlocked] = useState<boolean>(false);
  const [analyticsGMV, setAnalyticsGMV] = useState<number>(248390.40);
  const [analyticsLogs, setAnalyticsLogs] = useState<string[]>([
    'Mavzen Engine successfully resolved shipping address mismatch.',
    'Shopify Order #9482 matched in Soho local warehouse',
    'Cart Recovery discount sent to Emma Cook',
    'Elena Rostova unlocked Diamond Loyalty Tier reward (+300 pts)'
  ]);

  const systems: SimulatorSystem[] = [
    { id: 'whatsapp_agent', name: 'WhatsApp Interaction Agent', tagline: 'Personal shopper & conversion agent', category: 'Conversational' },
    { id: 'cart_recovery', name: 'Cart Abandonment Recovery Agent', tagline: 'Smart recovery funnel with zero friction', category: 'Conversion' },
    { id: 'crm_agent', name: 'CRM & Follow Up Agent', tagline: 'Automated high-touch pipeline management', category: 'Operations' },
    { id: 'support_agent', name: 'AI Support Agent', tagline: 'Resolving tickets & modifying orders inside Shopify', category: 'Customer Experience' },
    { id: 'loyalty_engine', name: 'Loyalty & Rewards Engine', tagline: 'Dynamic tiers & early access rewards builder', category: 'Retention' },
    { id: 'revenue_analytics', name: 'Revenue Analytics Autopilot', tagline: 'Unified GTM reporting & predictive velocity', category: 'Intelligence' }
  ];

  // Helper to initialize simulation state
  const initializeSimulation = (systemId: string) => {
    switch (systemId) {
      case 'whatsapp_agent':
        setWhatsappMsgs([
          { sender: 'user', text: "Hi, I love the Noir Silk Slip Dress but I am 5'8\" - is the Medium going to be too short? Most standard midis fall weirdly on me.", time: '10:42 AM' }
        ]);
        setWhatsappTyping(false);
        setSimStep(0);
        break;
      case 'cart_recovery':
        setCartProgressStep(0);
        setSimStep(0);
        break;
      case 'crm_agent':
        setCrmLogs([
          'Lead Vance M. matched from active checkout abandonment',
          'Profile matched: High Loyalty tier candidate (Average order: $450)',
          'Sizing matched: Large. Style preference: Midnight Charcoal Slate'
        ]);
        setCrmStep(0);
        setSimStep(0);
        break;
      case 'support_agent':
        setSupportChat([
          { sender: 'user', text: "Hey! Can I change the shipping address for my Order #9832? I accidentally shipped it to my old NYC office, but I’ll be back in Santa Monica next week.", time: '2:14 PM' }
        ]);
        setSupportStep(0);
        setSimStep(0);
        break;
      case 'loyalty_engine':
        setLoyaltyPoints(850);
        setLoyaltyUnlocked(false);
        setSimStep(0);
        break;
      default:
        break;
    }
  };

  // Run the automatic looping simulations
  useEffect(() => {
    let timer: any;
    let currentStep = 0;
    
    setSimStep(0);
    initializeSimulation(activeSystemId);
    
    const runSimulationStep = () => {
      if (activeSystemId === 'whatsapp_agent') {
        if (currentStep === 0) {
          setWhatsappTyping(true);
          timer = setTimeout(() => {
            setWhatsappTyping(false);
            setWhatsappMsgs(prev => [
              ...prev,
              { sender: 'agent', text: "Hi Sarah! At 5'8\", our Noir Silk Slip Dress midi is designed with a longer draft panel. Checking our real-time Shopify spec sheets: total length from shoulder to hem is 46.5\", falling safely around 4 inches below the knee. Would you like to reserve our last Soho studio piece?", time: '10:43 AM' }
            ]);
            setSimStep(1);
            currentStep = 1;
            timer = setTimeout(runSimulationStep, 2500);
          }, 1200);
        } else if (currentStep === 1) {
          setWhatsappMsgs(prev => [
            ...prev,
            { sender: 'user', text: "Oh that is beautiful! Yes please, and do you have a direct checkout link for it?", time: '10:44 AM' }
          ]);
          setSimStep(2);
          currentStep = 2;
          timer = setTimeout(runSimulationStep, 2000);
        } else if (currentStep === 2) {
          setWhatsappTyping(true);
          timer = setTimeout(() => {
            setWhatsappTyping(false);
            setWhatsappMsgs(prev => [
              ...prev,
              { sender: 'agent', text: "Perfect. I have reserved the Medium for you. Click this secure instant checkout link to purchase (it has pre-loaded order detail with complimentary expedited delivery):", time: '10:44 AM', link: 'shopify.pay/noir-m' }
            ]);
            setSimStep(3);
            currentStep = 3;
            timer = setTimeout(runSimulationStep, 2500);
          }, 1200);
        } else if (currentStep === 3) {
          setWhatsappMsgs(prev => [
            ...prev,
            { sender: 'agent', text: "Order Confirmed: #9482\nTotal: $189.00 Status: Scheduled for Dispatch via Soho Ground.", time: '10:45 AM', isOrder: true }
          ]);
          setSimStep(4);
          currentStep = 4;
          // Reset after a delay
          timer = setTimeout(() => {
            currentStep = 0;
            setWhatsappMsgs([
              { sender: 'user', text: "Hi, I love the Noir Silk Slip Dress but I am 5'8\" - is the Medium going to be too short? Most standard midis fall weirdly on me.", time: '10:42 AM' }
            ]);
            setSimStep(0);
            timer = setTimeout(runSimulationStep, 2000);
          }, 6000);
        }
      } else if (activeSystemId === 'cart_recovery') {
        if (currentStep < 4) {
          currentStep += 1;
          setCartProgressStep(currentStep);
          setSimStep(currentStep);
          if (currentStep === 4) {
            setRecoveredRevenue(prev => prev + 189.0);
            setRecoveredCarts(prev => [
              { name: 'Olivia R.', item: 'Silk Slip Dress', value: 189.0, time: 'Just now', status: 'Recovered' },
              ...prev.filter(c => c.name !== 'Olivia R.')
            ]);
            timer = setTimeout(() => {
              currentStep = 0;
              setCartProgressStep(0);
              setSimStep(0);
              timer = setTimeout(runSimulationStep, 2000);
            }, 6000);
          } else {
            timer = setTimeout(runSimulationStep, 2000);
          }
        }
      } else if (activeSystemId === 'crm_agent') {
        if (currentStep === 0) {
          setCrmLogs(prev => [
            ...prev,
            'Auto-routing: Custom VIP Invitation drafted',
            'Selected capsule collection recommendations (Tweed Coat)',
            'Email sent via high-delivery channel'
          ]);
          setSimStep(1);
          setCrmStep(1);
          currentStep = 1;
          timer = setTimeout(runSimulationStep, 2500);
        } else if (currentStep === 1) {
          setCrmLogs(prev => [
            ...prev,
            'Delivery Status: Delivered (Opened at 09:31 AM)',
            'Vance M. clicked VIP reservation link (item: Midnight Blazer)',
            'Showroom consultation booked for Friday at 3:00 PM'
          ]);
          setSimStep(2);
          setCrmStep(2);
          currentStep = 2;
          timer = setTimeout(() => {
            currentStep = 0;
            setCrmLogs([
              'Lead Vance M. matched from active checkout abandonment',
              'Profile matched: High Loyalty tier candidate (Average order: $450)',
              'Sizing matched: Large. Style preference: Midnight Charcoal Slate'
            ]);
            setSimStep(0);
            setCrmStep(0);
            timer = setTimeout(runSimulationStep, 2000);
          }, 6000);
        }
      } else if (activeSystemId === 'support_agent') {
        if (currentStep === 0) {
          setSupportChat(prev => [
            ...prev,
            { sender: 'system', text: "Support Agent evaluating message...", isSystem: true },
            { sender: 'agent', text: "Syncing Shopify records... Located Order #9832. Status: Unfulfilled (Soho Warehouse). Correcting shipping details...", time: '2:15 PM' }
          ]);
          setSupportStep(1);
          currentStep = 1;
          timer = setTimeout(runSimulationStep, 2500);
        } else if (currentStep === 1) {
          setSupportChat(prev => [
            ...prev,
            { sender: 'system', text: "Shopify order address updated successfully", isSystem: true },
            { sender: 'agent', text: "I have successfully corrected your shipping details inside Shopify, Liam. Your order will now ship straight to 402 Ocean Ave, Santa Monica. A new shipment receipt has been sent to your email.", time: '2:15 PM' }
          ]);
          setSupportStep(2);
          currentStep = 2;
          timer = setTimeout(runSimulationStep, 2500);
        } else if (currentStep === 2) {
          setSupportChat(prev => [
            ...prev,
            { sender: 'user', text: "Oh you are an absolute lifesaver. Thank you immensely!", time: '2:16 PM' },
            { sender: 'system', text: "Conversation status: Resolved & closed.", isSystem: true }
          ]);
          setSupportStep(3);
          currentStep = 3;
          timer = setTimeout(() => {
            currentStep = 0;
            setSupportChat([
              { sender: 'user', text: "Hey! Can I change the shipping address for my Order #9832? I accidentally shipped it to my old NYC office, but I’ll be back in Santa Monica next week.", time: '2:14 PM' }
            ]);
            setSupportStep(0);
            timer = setTimeout(runSimulationStep, 2000);
          }, 6000);
        }
      } else if (activeSystemId === 'loyalty_engine') {
        if (currentStep === 0) {
          setLoyaltyPoints(1150);
          setSimStep(1);
          currentStep = 1;
          timer = setTimeout(runSimulationStep, 2500);
        } else if (currentStep === 1) {
          setLoyaltyUnlocked(true);
          setSimStep(2);
          currentStep = 2;
          timer = setTimeout(() => {
            currentStep = 0;
            setLoyaltyPoints(850);
            setLoyaltyUnlocked(false);
            setSimStep(0);
            timer = setTimeout(runSimulationStep, 2000);
          }, 6000);
        }
      }
    };
    
    timer = setTimeout(runSimulationStep, 2000);
    
    return () => clearTimeout(timer);
  }, [activeSystemId]);

  // Global heartbeat timer for live analytics simulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeSystemId === 'revenue_analytics') {
        setAnalyticsGMV(prev => parseFloat((prev + (Math.random() > 0.4 ? (Math.random() * 85 + 5) : 0)).toFixed(2)));
        if (Math.random() > 0.7) {
          const names = ['Liam T.', 'Sophia R.', 'David M.', 'Zoe C.', 'Lucas F.', 'Hannah S.'];
          const actions = [
            'dispatched review request via WhatsApp',
            'unlocked VIP Gold early entry tier',
            'opened abandoned cart checkout link',
            'placed new order ($189.00 Silk Dress)',
            'updated delivery address with Support Agent'
          ];
          const newLog = `${names[Math.floor(Math.random() * names.length)]} ${actions[Math.floor(Math.random() * actions.length)]}`;
          setAnalyticsLogs(prev => [newLog, ...prev.slice(0, 3)]);
        }
      }
    }, 2500);
    return () => clearInterval(interval);
  }, [activeSystemId]);

  return (
    <div id="d2c-os-simulator" className="bg-[#040405] border border-zinc-900 rounded-2xl p-4 md:p-8 flex flex-col gap-6 md:gap-8 justify-between relative overflow-hidden transition-all duration-300">
      
      {/* Mesh/Grid Alignment Accent */}
      <div className="absolute inset-0 grid-lens-pattern opacity-30 pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-zinc-900 pb-4 z-10 relative">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-[10px] font-sans tracking-widest text-indigo-500 uppercase font-bold">OPERATIONAL SIMULATOR</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-sans font-[800] text-white tracking-[-0.02em]">
            Mavzen D2C Growth Engine
          </h3>
          <p className="text-xs text-zinc-500 font-sans">
            Real-time simulations of custom AI agents executing cross-channel pipelines natively.
          </p>
        </div>

        <button 
          onClick={() => initializeSimulation(activeSystemId)}
          className="mt-3 sm:mt-0 inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-[11px] text-zinc-400 hover:text-white rounded-md font-sans transition-all"
        >
          <RefreshCw size={12} />
          Reset Simulation
        </button>
      </div>

      {/* Main Container Dual Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch z-10 relative">
        
        {/* Left Side: System Modules Selector List (Cols: 5) */}
        <div className="lg:col-span-5 flex flex-col gap-2.5">
          <span className="text-[10px] font-sans tracking-wider uppercase text-zinc-600 mb-1 block">SELECT COGNITIVE ENGINE</span>
          {systems.map((sys) => {
            const isActive = activeSystemId === sys.id;
            return (
              <button
                id={`sim-sys-btn-${sys.id}`}
                key={sys.id}
                onClick={() => setActiveSystemId(sys.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-4 cursor-pointer relative group ${
                  isActive
                    ? 'bg-[#0a0a0c] border-indigo-500/40 text-white shadow-[0_0_20px_rgba(99,91,255,0.04)]'
                    : 'bg-[#060608] border-zinc-900 text-zinc-400 hover:border-zinc-800 hover:text-zinc-200'
                }`}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <span className="absolute left-0 top-3 bottom-3 w-[2px] bg-indigo-500 rounded-r-md" />
                )}

                {/* Bullet Icon Matrix */}
                <div className={`p-2 rounded-lg shrink-0 ${isActive ? 'bg-indigo-500/10 text-indigo-500' : 'bg-zinc-950 text-zinc-600 group-hover:text-zinc-400'}`}>
                  {sys.id === 'whatsapp_agent' && <MessageSquare size={16} />}
                  {sys.id === 'cart_recovery' && <ShoppingCart size={16} />}
                  {sys.id === 'crm_agent' && <Users size={16} />}
                  {sys.id === 'support_agent' && <HelpCircle size={16} />}
                  {sys.id === 'loyalty_engine' && <Trophy size={16} />}
                  {sys.id === 'revenue_analytics' && <BarChart3 size={16} />}
                </div>

                {/* Labeling Text */}
                <div className="space-y-1 w-full truncate">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold leading-none tracking-tight truncate">{sys.name}</span>
                    <span className="text-[9px] font-sans text-zinc-600 border border-zinc-900 px-1 py-0.2 rounded font-medium uppercase shrink-0">{sys.category}</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-normal font-sans tracking-tight truncate">{sys.tagline}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Simulated Autopilot Interface (Cols: 7) */}
        <div className="lg:col-span-7 flex flex-col bg-[#060608] border border-zinc-900 rounded-xl overflow-hidden min-h-[460px] relative">
          
          {/* Internal Top Bar */}
          <div className="bg-[#0a0a0c] border-b border-zinc-900 px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-[10px] font-sans tracking-widest text-zinc-500 uppercase font-semibold">
                Mavzen Engine Simulator • Active
              </span>
            </div>
          </div>

          {/* ================= SIMULATION AREA 1: WHATSAPP ================= */}
          {activeSystemId === 'whatsapp_agent' && (
            <div className="flex-1 p-4 md:p-6 flex flex-col justify-between max-h-[500px] overflow-y-auto">
              {/* WhatsApp UI Framing */}
              <div className="flex flex-col gap-4 flex-1 justify-start">
                <div className="flex items-center gap-2.5 border-b border-zinc-900 pb-3">
                  <div className="w-8 h-8 rounded-full bg-[#1e293b] flex items-center justify-center font-extrabold text-white text-[11px] border border-zinc-800">
                    SM
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-white leading-none">Sarah Miller</h5>
                    <span className="text-[9px] text-[#22c55e] font-sans uppercase">Online • Product Inquiry</span>
                  </div>
                </div>

                {/* Message Threads */}
                <div className="space-y-3.5 pr-2 pt-2">
                  {whatsappMsgs.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'ml-auto items-end animate-fade-in' : 'mr-auto items-start'}`}
                    >
                      {/* Body bubble layout */}
                      <div className={`p-3 rounded-xl text-xs leading-relaxed font-sans ${
                        msg.isOrder 
                          ? 'bg-[#15803d]/10 border border-[#22c55e]/20 text-emerald-100 rounded-tl-none'
                          : msg.sender === 'user' 
                            ? 'bg-zinc-900 text-zinc-200 rounded-tr-none border border-zinc-850' 
                            : 'bg-zinc-950 text-zinc-300 rounded-tl-none border border-zinc-900'
                      }`}>
                        
                        {msg.isOrder && (
                          <div className="flex items-center gap-2 mb-1 border-b border-[#22c55e]/15 pb-1">
                            <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                            <span className="font-bold text-emerald-400">Order Placed via Mavzen Autopilot</span>
                          </div>
                        )}

                        <p className={msg.isOrder ? 'font-sans text-[11px] whitespace-pre-wrap' : ''}>{msg.text}</p>
                        
                        {msg.link && (
                          <div className="mt-2.5 p-2 bg-[#0c0c0e] rounded border border-zinc-900 flex items-center justify-between">
                            <span className="text-[10px] text-indigo-400 hover:underline font-sans select-all cursor-pointer">{msg.link}</span>
                            <span className="text-[9px] font-sans text-zinc-500 border border-zinc-900 px-1 py-0.2 rounded uppercase">expedited checkout</span>
                          </div>
                        )}
                      </div>
                      
                      <span className="text-[8px] text-zinc-650 font-sans mt-1">{msg.time}</span>
                    </div>
                  ))}

                  {/* Typing State indicator */}
                  {whastappTyping && (
                    <div className="flex items-center gap-1.5 mr-auto p-3 bg-zinc-950 text-zinc-400 rounded-xl rounded-tl-none border border-zinc-900 text-xs w-[130px]">
                      <span className="animate-bounce">●</span>
                      <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>●</span>
                      <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>●</span>
                      <span className="text-[10px] font-sans ml-1.5 opacity-80">AI typing</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ================= SIMULATION AREA 2: CART RECOVERY ================= */}
          {activeSystemId === 'cart_recovery' && (
            <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
              
              {/* Dynamic Recovery Header Cards */}
              <div className="grid grid-cols-2 gap-4 border-b border-zinc-900 pb-4 mb-4">
                <div className="bg-[#0a0a0c] p-3 rounded-lg border border-zinc-900">
                  <span className="text-[9px] font-sans text-zinc-500 block uppercase">Recovered Sales (Today)</span>
                  <p className="text-lg font-bold font-sans text-white mt-1">
                    ${recoveredRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="bg-[#0a0a0c] p-3 rounded-lg border border-zinc-900">
                  <span className="text-[9px] font-sans text-zinc-500 block uppercase">Recovery Rate</span>
                  <p className="text-lg font-bold font-sans text-indigo-400 mt-1">28.4%</p>
                </div>
              </div>

              {/* Step Sequence Showcase */}
              <div className="space-y-4">
                <h6 className="text-[11px] font-sans text-zinc-500 uppercase tracking-widest">Active Recovery: Olivia R.</h6>
                
                {/* Horizontal progress visualization */}
                <div className="relative pt-6 pb-2">
                  <div className="absolute top-8 left-2 right-2 h-[2px] bg-zinc-900 z-0" />
                  
                  {/* Status Steps */}
                  <div className="grid grid-cols-4 relative z-10 text-center">
                    {[
                      { step: 1, title: 'Abandonment', tag: 'Cart Abandoned' },
                      { step: 2, title: 'Identify User', tag: 'Customer Matched' },
                      { step: 3, title: 'Recapture Flow', tag: 'SMS Dispatched' },
                      { step: 4, title: 'Order Recovered', tag: 'Completed Payment' }
                    ].map((stepObj) => {
                      const isCompleted = cartProgressStep >= stepObj.step;
                      const isCurrent = cartProgressStep === stepObj.step - 1;
                      return (
                        <div key={stepObj.step} className="space-y-2">
                          <div className={`w-5 h-5 rounded-full mx-auto flex items-center justify-center font-sans text-[9px] font-bold ${
                            isCompleted 
                              ? 'bg-indigo-500 text-white' 
                              : isCurrent 
                                ? 'bg-zinc-800 text-indigo-400 border border-indigo-500/40 animate-pulse'
                                : 'bg-zinc-950 text-zinc-600 border border-zinc-900'
                          }`}>
                            {stepObj.step}
                          </div>
                          <div className="space-y-0.5">
                            <span className={`text-[10px] block font-bold leading-none ${isCompleted ? 'text-zinc-200' : 'text-zinc-500'}`}>{stepObj.title}</span>
                            <span className="text-[8px] font-sans text-zinc-600 block">{stepObj.tag}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Sub Panel details */}
                <div className="p-3 bg-[#0a0a0c] border border-zinc-900 rounded-lg text-xs leading-relaxed space-y-1.5 text-zinc-400">
                  {cartProgressStep === 0 && <p className="font-sans text-[10px] text-zinc-500">⏳ Waiting for checkout abandonment signals...</p>}
                  {cartProgressStep >= 1 && <p>🚨 <span className="text-white font-semibold">Cart Abandoned:</span> Olivia R. left checking a Silk Slip Dress valued at $189.00.</p>}
                  {cartProgressStep >= 2 && <p>🧠 <span className="text-indigo-400 font-semibold">Auto-Analysis:</span> Customer has 2 historical checkouts. Generated bundle containing complimentary Silk Scarf offer.</p>}
                  {cartProgressStep >= 3 && <p>📱 <span className="text-white font-semibold">SMS Sent:</span> "Hi Olivia, we held your Silk Slip Dress in stock with free priority carrier dispatch today: shopify.pay/noir-m"</p>}
                  {cartProgressStep >= 4 && <p className="text-emerald-500 font-semibold font-sans">✓ STRIPE CONFIRMED: $189.00 recovered. System metrics updated.</p>}
                </div>
              </div>

              {/* Feed ticker summary */}
              <div className="pt-4 border-t border-zinc-900 mt-4">
                <span className="text-[9px] font-sans text-zinc-500 uppercase tracking-wider block mb-2">LIVE LOG INDEX</span>
                <div className="space-y-1.5">
                  {recoveredCarts.map((item, id) => (
                    <div key={id} className="flex items-center justify-between text-[11px] font-sans bg-zinc-950/40 p-2 rounded border border-zinc-950">
                      <span className="text-zinc-300 font-bold">{item.name} • {item.item}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-zinc-500">{item.time}</span>
                        <span className={`text-[9px] font-sans uppercase px-1.5 py-0.2 rounded ${
                          item.status === 'Recovered' 
                            ? 'text-emerald-500 bg-emerald-500/5 border border-emerald-500/10 font-bold'
                            : 'text-zinc-400 bg-zinc-900'
                        }`}>{item.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= SIMULATION AREA 3: CRM PIPELINE ================= */}
          {activeSystemId === 'crm_agent' && (
            <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
              
              {/* Kanban styled vertical column board */}
              <div className="grid grid-cols-4 gap-2 border-b border-zinc-900 pb-4 mb-4">
                {[
                  { title: 'Prospect', desc: 'Pre-qualified', bg: 'Vance M.', stage: 0 },
                  { title: 'Enriched', desc: 'Metadata Apply', bg: 'VN - Size: L', stage: 1 },
                  { title: 'Auto Offer', desc: 'Proposal Sent', bg: 'Autumn Tweed', stage: 2 },
                  { title: 'VIP Fitting', desc: 'Closed Booked', bg: 'Friday 3PM', stage: 3 }
                ].map((col, idx) => {
                  const isActive = crmStep >= col.stage;
                  return (
                    <div key={idx} className="bg-[#0a0a0c] border border-zinc-900 p-2.5 rounded-lg flex flex-col justify-between h-[100px]">
                      <div>
                        <span className="text-[9px] font-sans text-zinc-500 block uppercase">{col.title}</span>
                        <span className="text-[8px] text-zinc-650 block mt-0.5">{col.desc}</span>
                      </div>
                      
                      {isActive ? (
                        <div className="mt-2 text-[10px] font-sans bg-indigo-500/5 text-white p-1 rounded border border-indigo-500/10 truncate font-semibold">
                          {col.bg}
                        </div>
                      ) : (
                        <div className="mt-2 text-[10px] font-sans text-zinc-700 bg-transparent p-1 rounded border border-transparent select-none">
                          Empty
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Dynamic Terminal Action Logs */}
              <div className="space-y-2">
                <span className="text-[9px] font-sans text-zinc-500 uppercase tracking-widest block">OPERATIONAL LOG STREAM:</span>
                
                <div className="bg-zinc-950 border border-zinc-900 rounded-lg p-3.5 h-[160px] overflow-y-auto font-sans text-[11px] text-zinc-450 space-y-1.5 scrollbar-thin">
                  {crmLogs.map((log, index) => (
                    <div key={index} className="flex items-start gap-1">
                      <span className="text-indigo-400 shrink-0 font-bold">➔</span>
                      <span className="whitespace-pre-wrap">{log}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}            {/* ================= SIMULATION AREA 4: SUPPORT DESK ================= */}
          {activeSystemId === 'support_agent' && (
            <div className="flex-1 p-4 md:p-6 flex flex-col justify-between max-h-[500px]">
              
              <div className="flex flex-col gap-4 flex-1 justify-start">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-zinc-900 flex items-center justify-center font-bold font-sans text-[10px] text-zinc-300 border border-zinc-850">
                      TKT
                    </div>
                    <div>
                      <h5 className="text-xs font-semibold text-white leading-none">Ticket #3894: Shipping Update</h5>
                      <span className="text-[9px] text-zinc-500 font-sans mt-0.5 block">Customer: Liam Sterling • Shopify VIP</span>
                    </div>
                  </div>
                  <span className={`text-[9px] font-sans uppercase px-2 py-0.5 rounded ${
                    supportStep === 3 
                      ? 'text-emerald-400 bg-emerald-500/5 border border-emerald-500/10' 
                      : 'text-indigo-400 bg-indigo-500/5 border border-indigo-500/10 font-bold'
                  }`}>
                    {supportStep === 3 ? 'SOLVED' : 'ACTIVE INTAKE'}
                  </span>
                </div>

                {/* Simulated conversations resolving address change */}
                <div className="space-y-3 pr-1 pt-2 max-h-[220px] overflow-y-auto">
                  {supportChat.map((chat, idx) => (
                    <div 
                      key={idx} 
                      className={`flex flex-col max-w-[90%] ${
                        chat.isSystem 
                          ? 'mx-auto w-full items-center mb-1' 
                          : chat.sender === 'user' 
                            ? 'ml-auto items-end' 
                            : 'mr-auto items-start'
                      }`}
                    >
                      {chat.isSystem ? (
                        <div className="bg-zinc-950 px-2 py-1 border border-zinc-900 rounded font-sans text-[9px] text-zinc-500">
                          {chat.text}
                        </div>
                      ) : (
                        <div className={`p-3 rounded-xl text-xs leading-relaxed font-sans ${
                          chat.sender === 'user' 
                            ? 'bg-zinc-900 text-zinc-200 rounded-tr-none border border-zinc-850' 
                            : 'bg-zinc-950 text-zinc-300 rounded-tl-none border border-zinc-900'
                        }`}>
                          <p>{chat.text}</p>
                        </div>
                      )}
                      
                      {!chat.isSystem && (
                        <span className="text-[8px] text-zinc-650 font-sans mt-1">{chat.time}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= SIMULATION AREA 5: LOYALTY ENGINE ================= */}
          {activeSystemId === 'loyalty_engine' && (
            <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
              
              {/* Customer Profile Status */}
              <div className="bg-[#0a0a0c] border border-zinc-900 p-4 rounded-xl flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1e1b4b] border border-indigo-750 flex items-center justify-center font-bold text-white text-xs">
                    ER
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-white">Elena Rostova</h5>
                    <span className="text-[9px] font-sans text-zinc-500 uppercase">Registered Luxury Member • LTV: $1,420</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[8px] font-sans text-zinc-500 block uppercase">CURRENT MEMBERSHIP TIER</span>
                  <span className={`text-xs font-extrabold tracking-wider ${loyaltyUnlocked ? 'text-indigo-400' : 'text-zinc-350'}`}>
                    {loyaltyUnlocked ? '♦ DIAMOND MEMBER ♦' : '✦ PLATINUM MEMBER ✦'}
                  </span>
                </div>
              </div>

              {/* Dynamic Points Incremental Bar */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-[10px] font-sans">
                  <span className="text-zinc-550">Dynamic Reward Points Portfolio</span>
                  <span className="text-white font-bold">{loyaltyPoints} / 1000 Points</span>
                </div>
                
                {/* Progress bar wrap */}
                <div className="w-full h-2.5 bg-zinc-950 border border-zinc-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 transition-all duration-800" 
                    style={{ width: `${Math.min((loyaltyPoints / 1000) * 100, 100)}%` }} 
                  />
                </div>
                
                {/* Visual labels indicating tier requirements */}
                <div className="flex justify-between items-center text-[8px] font-sans text-zinc-600">
                  <span>800 pt: VIP Preview Entry Unlocked</span>
                  <span>1000 pt: Diamond Upgrade Milestone</span>
                </div>
              </div>

              {/* Reward unlocking details */}
              <div className="p-4 bg-[#0a0a0c] border border-zinc-900 rounded-xl space-y-3">
                <span className="text-[9px] font-sans text-zinc-550 uppercase tracking-widest block">EARNED PERKS LIST</span>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-zinc-300">
                    <CheckCircle2 size={13} className="text-zinc-500" />
                    <span>Free global express cargo on orders over $150</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-300">
                    <CheckCircle2 size={13} className="text-zinc-500" />
                    <span>Private early release previews on fashion caps</span>
                  </div>
                  
                  {loyaltyUnlocked ? (
                    <div className="flex items-center gap-2 text-xs text-zinc-200 font-bold bg-indigo-500/5 border border-indigo-500/15 p-2 rounded animate-pulse">
                      <Sparkles size={13} className="text-indigo-400" />
                      <span>Diamond Perk: 15% VIP Coupon Code <code className="font-sans bg-zinc-950 px-1 py-0.5 rounded ml-1 text-white border border-zinc-900">DIAMOND15</code> generated & mailed!</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-zinc-650">
                      <Lock size={12} />
                      <span>Diamond perk: Complimentary custom monograms (150 pts away)</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ================= SIMULATION AREA 6: REVENUE ANALYTICS ================= */}
          {activeSystemId === 'revenue_analytics' && (
            <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
              
              {/* Dashboard stats layout */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                  { title: 'Total GMV', count: `$${analyticsGMV.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, label: 'Live growing' },
                  { title: 'Cohort Retention', count: '48.9%', label: '90-day window' },
                  { title: 'AI Autopilot Rate', count: '34.8%', label: 'Trigger revenue' },
                  { title: 'Sales Conversion', count: '4.92%', label: 'Traffic to paid' }
                ].map((stat, id) => (
                  <div key={id} className="bg-[#0a0a0c] border border-zinc-900 p-3 rounded-lg flex flex-col justify-between">
                    <span className="text-[9px] font-sans text-zinc-500 block uppercase leading-none">{stat.title}</span>
                    <p className={`text-sm font-extrabold font-sans text-white mt-1.5 ${stat.title === 'Total GMV' ? 'truncate text-emerald-400' : ''}`}>{stat.count}</p>
                    <span className="text-[8px] text-zinc-600 block mt-0.5">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* Graphic line chart mimicking modern metrics dashboard */}
              <div className="space-y-2 mb-6">
                <span className="text-[9px] font-sans text-zinc-500 uppercase tracking-widest block">AI AUTOPILOT CONVERSION VELOCITY</span>
                
                <div className="h-[130px] w-full bg-zinc-950 border border-zinc-900 rounded-lg p-2 flex items-end relative overflow-hidden">
                  
                  {/* Decorative faint background grid */}
                  <div className="absolute inset-0 grid-lens-pattern opacity-[0.05]" />

                  {/* SVG Spline representing conversion growth */}
                  <svg className="absolute inset-0 w-full h-full p-2 overflow-visible" viewBox="0 0 400 120" preserveAspectRatio="none">
                    <path
                      d="M0,100 Q40,90 80,75 T160,60 T240,40 T320,25 T400,10"
                      fill="none"
                      stroke="#4f46e5"
                      strokeWidth="2"
                    />
                    {/* Shadow filler area */}
                    <path
                      d="M0,100 Q40,90 80,75 T160,60 T240,40 T320,25 T400,10 L400,120 L0,120 Z"
                      fill="url(#sparkGradient)"
                      opacity="0.08"
                    />
                    <defs>
                      <linearGradient id="sparkGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4f46e5" />
                        <stop offset="100%" stopColor="transparent" strokeWidth="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  <div className="w-full flex justify-between px-1.5 font-sans text-[8px] text-zinc-650 mt-1 z-10">
                    <span>09:00 AM</span>
                    <span>12:00 PM</span>
                    <span>03:00 PM</span>
                    <span>06:00 PM</span>
                    <span>09:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Real-time ticker console */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-sans text-zinc-500 uppercase tracking-widest block">AUTOPILOT EVENT STREAM</span>
                  <span className="text-[8px] text-zinc-650 font-sans">Updates live automatically</span>
                </div>
                
                <div className="bg-zinc-950 border border-zinc-900 rounded-lg p-3 space-y-1.5 h-[100px] overflow-y-auto font-sans text-[10px] text-zinc-400">
                  {analyticsLogs.map((log, idx) => (
                    <div key={idx} className="flex items-center gap-2 truncate">
                      <span className="h-1 w-1 rounded-full bg-indigo-500" />
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
