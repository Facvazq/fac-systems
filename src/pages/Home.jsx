import React, { useEffect, useRef } from 'react';
import { 
  Globe as GlobeIcon, Activity, Music, 
  Folder, Image, ChevronRight, Layers, Users,
  CreditCard, ShoppingBag, Zap, Shield, Server,
  Code, ArrowRight, Check, Plane, X as XIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AnimatedAgency } from '../components/Shared';
import { formatPriceFromUsd } from '../utils/currency';

const RotatingGlobe = ({ width = 400, height = 400 }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let time = 0;
    const particles = [];
    const particleCount = 200;
    const radius = Math.min(width, height) / 2.5;

    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      particles.push({
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi)
      });
    }

    const animate = () => {
      time += 0.005;
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(width / 2, height / 2);
      particles.forEach(p => {
        const rotX = p.x * Math.cos(time) - p.z * Math.sin(time);
        const rotZ = p.x * Math.sin(time) + p.z * Math.cos(time);
        const scale = 250 / (250 - rotZ); 
        if (scale > 0) {
          ctx.beginPath();
          ctx.arc(rotX, p.y, 2 * scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, (rotZ + radius) / (2 * radius))})`;
          ctx.fill();
        }
      });
      ctx.restore();
      requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [width, height]);
  return <canvas ref={canvasRef} width={width} height={height} className="max-w-full" />;
};

const FEATURES = [
  { title: "Global Reach", desc: "Used by creators in 35+ countries.", icon: <GlobeIcon className="w-6 h-6 text-white" />, colSpan: "md:col-span-7", bg: "bg-neutral-900 border-neutral-800" },
  { title: "Consumer First", desc: "Interfaces designed for humans.", icon: <Users className="w-6 h-6 text-white" />, colSpan: "md:col-span-5", bg: "bg-neutral-800 border-neutral-700" },
  { title: "Real-time Sync", desc: "Data available instantly.", icon: <Activity className="w-6 h-6 text-white" />, colSpan: "md:col-span-5", bg: "bg-indigo-900/20 border-indigo-500/30" },
  { title: "Trayo", desc: "The minimal file manager.", icon: <Layers className="w-6 h-6 text-white" />, colSpan: "md:col-span-7", bg: "bg-gradient-to-br from-blue-900/60 via-indigo-900/70 to-black border-indigo-700" }
];

const ServicesTable = ({ navigate, countryCode }) => {
  const agencyPrice = formatPriceFromUsd(10, countryCode);
  const services = [
    {
      title: "Trayo",
      subtitle: "macOS Utility",
      price: "Free",
      period: "forever",
      desc: "Instant file access from your menu bar. Clean, fast, and native.",
      features: ["Menu Bar Integration", "No Cloud Sync Required", "Instant Preview", "Drag & Drop"],
      cta: "Download",
      action: () => navigate('/trayo'),
      accent: "text-indigo-300",
      glow: "from-indigo-600/30 to-blue-600/20",
      iconWrap: "bg-indigo-500/15 text-indigo-300",
      check: "text-indigo-400",
      customIcon: <img src="/trayoicon.png" alt="Trayo" className="w-full h-full object-cover rounded-md" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
    },
    {
      title: "FlightIO",
      subtitle: "iOS App",
      price: "Free",
      period: "forever",
      desc: "Real-time flight tracking without the subscription fees.",
      features: ["Real-time Updates", "No Hidden Fees", "Offline Mode", "Clean Interface"],
      cta: "Learn More",
      action: () => navigate('/flightio'),
      accent: "text-sky-300",
      glow: "from-sky-600/25 to-cyan-500/15",
      iconWrap: "bg-sky-500/15 text-sky-300",
      check: "text-sky-400",
      isConstruction: true,
      customIcon: <img src="/logo101.png" alt="FlightIO" className="w-full h-full object-cover rounded-md" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
    },
    {
      title: "Fac Agency",
      subtitle: "Web Services",
      price: `From ${agencyPrice}`,
      period: "/month",
      desc: "Premium web development and branding for service professionals.",
      features: ["Custom Design", "Booking Systems", "SEO Optimization", "Mobile First"],
      cta: "See Plans", // Updated button text
      action: () => navigate('/agency-plans'), // Updated link
      accent: "text-rose-300",
      glow: "from-rose-600/25 to-orange-500/15",
      iconWrap: "bg-rose-500/15 text-rose-300",
      check: "text-rose-400",
      icon: <Code className="w-6 h-6" />
    }
  ];

  return (
    <div className="py-28 border-t border-neutral-900 bg-gradient-to-b from-black via-neutral-950 to-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">A Focused Ecosystem</h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">Three products, one philosophy: software that respects your time.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div key={i} className="relative flex flex-col p-8 rounded-3xl border border-neutral-800 bg-black/80 hover:border-neutral-700 transition-colors overflow-hidden">
              <div className={`absolute inset-0 opacity-60 bg-gradient-to-br ${service.glow}`} />
              <div className="absolute -top-10 -right-10 w-24 h-24 border border-white/10 rounded-full spin-slow" />
              <div className="absolute -bottom-8 left-6 w-16 h-16 border border-white/10 rounded-2xl float-slow" />
              {service.isConstruction && (
                <div className="absolute top-0 right-0 m-4 px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
                  <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-wide flex items-center">
                    <AlertTriangle className="w-3 h-3 mr-1" /> Under Construction
                  </span>
                </div>
              )}
              
              <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center mb-6 overflow-hidden ${service.iconWrap}`}>
                {service.customIcon || service.icon}
              </div>

              <h3 className="text-2xl font-bold text-white mb-1">{service.title}</h3>
              <p className={`text-sm mb-6 ${service.accent}`}>{service.subtitle}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-white">{service.price}</span>
                {service.period && <span className="text-neutral-500 text-sm ml-2">{service.period}</span>}
              </div>

              <p className="text-neutral-400 text-sm leading-relaxed mb-8 flex-grow">
                {service.desc}
              </p>

              <ul className="space-y-3 mb-8">
                {service.features.map((feat, j) => (
                  <li key={j} className="flex items-center text-sm text-neutral-300">
                    <Check className={`w-4 h-4 mr-3 ${service.check}`} />
                    {feat}
                  </li>
                ))}
              </ul>

              <button 
                onClick={service.action}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                  service.isConstruction 
                    ? 'bg-neutral-800 text-neutral-400 cursor-not-allowed border border-neutral-700' 
                    : 'bg-white text-black hover:bg-neutral-200'
                }`}
                disabled={service.isConstruction}
              >
                {service.isConstruction ? 'Coming Soon' : service.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Simple Alert Icon for the Construction Badge
const AlertTriangle = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const Home = ({ openContact, countryCode }) => {
  const navigate = useNavigate();

  return (
    <div className="pt-20 bg-black min-h-screen font-['Sora']">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-rose-500/20 rounded-full blur-[120px]" />
          <div className="absolute top-10 right-1/4 w-[520px] h-[520px] bg-indigo-600/25 rounded-full blur-[140px]" />
          <div className="absolute -bottom-40 right-0 w-[520px] h-[520px] bg-amber-400/10 rounded-full blur-[160px]" />
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:22px_22px]" />
          <div className="absolute left-16 top-32 w-24 h-24 border border-white/10 rounded-3xl float-slow" />
          <div className="absolute right-24 top-20 w-20 h-20 border border-white/10 rounded-full float-fast" />
          <div className="absolute left-1/3 bottom-16 w-12 h-12 border border-white/10 rounded-xl float-slow" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-neutral-900/80 border border-neutral-800 backdrop-blur rounded-full p-1.5 pl-3 pr-4 mb-8">
                <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">New</span>
                <span className="text-neutral-300 text-xs font-medium">Trayo for Mac is available</span>
                <ChevronRight className="w-3 h-3 text-neutral-500" />
              </div>
              <h1 className="text-5xl md:text-7xl tracking-tight text-white mb-6 font-apple-bold">
                Software that feels
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-white">effortless.</span>
              </h1>
              <p className="max-w-2xl text-lg md:text-xl text-neutral-400 mb-10 leading-relaxed">
                Fac Systems builds products that reduce friction and raise velocity, from personal utilities to polished, revenue-ready web experiences.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <button onClick={() => navigate('/trayo')} className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold text-base rounded-full hover:bg-neutral-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                  Explore Trayo
                </button>
                <button onClick={() => navigate('/agency-plans')} className="w-full sm:w-auto px-8 py-4 border border-neutral-700 text-white font-bold text-base rounded-full hover:border-neutral-500 hover:bg-white/5 transition-all">
                  See Agency Plans
                </button>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">35+</div>
                  <div className="text-xs uppercase tracking-widest text-neutral-500">Countries</div>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">99.9%</div>
                  <div className="text-xs uppercase tracking-widest text-neutral-500">Uptime</div>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">3</div>
                  <div className="text-xs uppercase tracking-widest text-neutral-500">Products</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 flex justify-center items-center relative h-[360px] md:h-[420px]">
              <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute -left-4 -top-6 w-28 h-28 rounded-full border border-white/10 spin-slow" />
              <div className="absolute -right-6 bottom-4 w-20 h-20 rounded-2xl border border-white/10 float-fast" />
              <div className="absolute right-10 top-10 px-3 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-neutral-300 float-slow">
                Live Systems
              </div>
              <RotatingGlobe width={480} height={480} />
            </div>
          </div>
        </div>
      </div>

      {/* Services Table */}
      <ServicesTable navigate={navigate} countryCode={countryCode} />

      {/* Dashboard Preview */}
      <div className="bg-black py-24 border-t border-neutral-900 relative">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl text-white mb-6 font-apple-bold">Designed for Humans. Built for Growth.</h2>
            <p className="text-lg text-neutral-400">Clarity in the interface, momentum in the workflow.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Enterprise Card */}
              <div className="rounded-3xl bg-neutral-900 border border-neutral-800 p-2 shadow-2xl ring-1 ring-white/5 hover:border-indigo-500/50 transition-all relative overflow-hidden">
                  <div className="absolute -top-8 -right-8 w-24 h-24 border border-white/10 rounded-full spin-slow" />
                  <div className="bg-black rounded-2xl overflow-hidden h-full flex flex-col p-6">
                      <div className="border-b border-neutral-800 pb-4 mb-4 flex justify-between"><span className="text-xs font-bold text-indigo-400 uppercase">Enterprise Mode</span></div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                           <div className="bg-neutral-800/50 p-4 rounded-xl border border-neutral-700"><CreditCard className="w-6 h-6 text-indigo-500 mb-2"/><div className="text-2xl font-bold text-white">$84k</div><div className="text-xs text-neutral-500">Revenue</div></div>
                           <div className="bg-neutral-800/50 p-4 rounded-xl border border-neutral-700"><Activity className="w-6 h-6 text-emerald-500 mb-2"/><div className="text-2xl font-bold text-white">99.9%</div><div className="text-xs text-neutral-500">Uptime</div></div>
                      </div>
                  </div>
              </div>
              {/* Consumer Card */}
              <div className="rounded-3xl bg-neutral-900 border border-neutral-800 p-2 shadow-2xl ring-1 ring-white/5 hover:border-pink-500/50 transition-all relative overflow-hidden">
                  <div className="absolute -bottom-8 -left-8 w-24 h-24 border border-white/10 rounded-2xl float-fast" />
                  <div className="bg-black rounded-2xl overflow-hidden h-full flex flex-col p-6">
                      <div className="border-b border-neutral-800 pb-4 mb-4 flex justify-between"><span className="text-xs font-bold text-pink-400 uppercase">Personal Mode</span></div>
                      <div className="bg-neutral-800/50 p-4 rounded-xl border border-neutral-700 mb-4 flex items-center space-x-4">
                          <Music className="w-10 h-10 text-pink-500 bg-pink-500/20 p-2 rounded-lg" />
                          <div><div className="text-white font-bold">Design Flow</div><div className="text-xs text-neutral-500">2m ago</div></div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-neutral-800/30 rounded-lg">
                           <div className="flex items-center space-x-3"><Folder className="w-4 h-4 text-blue-400"/><span className="text-sm text-white">Assets</span></div>
                           <span className="text-xs text-neutral-500">12 items</span>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-black py-28 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10 flex-col md:flex-row">
            <div>
              <h3 className="text-3xl md:text-4xl text-white font-apple-bold">Capabilities</h3>
              <p className="text-neutral-400 mt-2 max-w-2xl">Every feature is there to reduce friction and keep you moving.</p>
            </div>
            <div className="mt-6 md:mt-0 flex items-center space-x-3 text-xs uppercase tracking-widest text-neutral-500">
              <span className="w-6 h-px bg-neutral-700" />
              <span>Focus, Flow, Finish</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {FEATURES.map((feature, idx) => (
              <div key={idx} className={`${feature.colSpan} ${feature.bg} border rounded-3xl p-8 relative overflow-hidden group hover:border-neutral-600 transition-all`}>
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/10 spin-slow opacity-60" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-neutral-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Agency Teaser Banner */}
      <div className="w-full bg-neutral-950 border-y border-neutral-800 py-16 overflow-hidden relative">
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.08),transparent)] shimmer-bg" />
        <div className="absolute -top-10 left-10 w-24 h-24 border border-white/10 rounded-full spin-slow" />
        <div className="absolute -bottom-10 right-10 w-20 h-20 border border-white/10 rounded-2xl float-slow" />
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className="text-3xl mb-3 flex items-center justify-center md:justify-start text-white font-apple-bold">
              <span className="text-rose-400 mr-3">✦</span> Fac Agency
            </h3>
            <p className="text-neutral-400 max-w-lg text-lg">
              Launch faster with a brand and website built to convert.
            </p>
          </div>
          <button onClick={() => navigate('/agency')} className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-all shadow-lg">
            Try Free Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
