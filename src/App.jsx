import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Menu, X, Globe as GlobeIcon, ArrowRight, Check, ChevronRight, 
  Shield, Zap, BarChart3, Rocket, Lock, ChevronDown, Search,
  CreditCard, Server, Activity, ShoppingBag, Key, Utensils, 
  ScanBarcode, Printer, Receipt, Users, Clock, AlertTriangle, 
  Smartphone, MapPin, CheckCircle2, XCircle, Copy, Mail,
  Layout, Code, Palette, Kanban, UserPlus, Filter, Layers, 
  Cpu, Database, Share2, Command, Folder
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB0IzlOx2smFfr2TaBTVGM4T7oY-HIMQ7c",
  authDomain: "facsystems-7f0c9.firebaseapp.com",
  projectId: "facsystems-7f0c9",
  storageBucket: "facsystems-7f0c9.firebasestorage.app",
  messagingSenderId: "663760788312",
  appId: "1:663760788312:web:1211cadaf05058ea73e32d"
};

// Initialize Firebase (Auth removed to prevent errors)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- Assets & Data ---

const CONTACT_EMAIL = "facsystemshome@gmail.com";

const REGIONS = {
  "North America": ['US', 'CA'],
  "South America": ['AR'],
  "Europe": ['GB', 'DE', 'FR', 'IT', 'ES', 'NL', 'SE', 'CH', 'PL', 'BE', 'AT', 'PT', 'GR', 'IE', 'NO', 'DK', 'FI', 'CZ', 'HU', 'RO', 'UA', 'HR', 'BG', 'SK', 'SI', 'LU', 'IS', 'EE', 'LV', 'LT', 'MT', 'CY', 'MC'],
  "Oceania": ['AU']
};

const COUNTRIES = [
  // North America
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  // South America
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  // Oceania
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  // Europe
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺' },
  { code: 'RO', name: 'Romania', flag: '🇷🇴' },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦' },
  { code: 'HR', name: 'Croatia', flag: '🇭🇷' },
  { code: 'BG', name: 'Bulgaria', flag: '🇧🇬' },
  { code: 'SK', name: 'Slovakia', flag: '🇸🇰' },
  { code: 'SI', name: 'Slovenia', flag: '🇸🇮' },
  { code: 'LU', name: 'Luxembourg', flag: '🇱🇺' },
  { code: 'IS', name: 'Iceland', flag: '🇮🇸' },
  { code: 'EE', name: 'Estonia', flag: '🇪🇪' },
  { code: 'LV', name: 'Latvia', flag: '🇱🇻' },
  { code: 'LT', name: 'Lithuania', flag: '🇱🇹' },
  { code: 'MT', name: 'Malta', flag: '🇲🇹' },
  { code: 'CY', name: 'Cyprus', flag: '🇨🇾' },
  { code: 'MC', name: 'Monaco', flag: '🇲🇨' },
];

const getCountry = (code) => COUNTRIES.find(c => c.code === code) || { ...COUNTRIES[0], code, name: code };

const TRANSLATIONS = {
  en: {
    nav: { trayo: "Trayo", agency: "Fac Agency" },
    hero: { new: "New", agency_news: "Trayo for Mac is now available", title_start: "The Software that", title_end: "Works with you.", subtitle: "Fac Systems builds intelligent tools that adapt to your workflow. From instant file access to bespoke digital products, we design for speed and simplicity.", contact_btn: "Explore Solutions" },
    agency: { 
        title: "Fac Agency", 
        desc: "We build your digital presence. Fac Agency is our premium web development service dedicated to building high-performance websites and digital products for businesses.", 
        btn: "Join Waitlist",
        status: "Coming Soon"
    },
    globe: { label: "Operating in 35+ Regions" },
    features: { title: "One platform. Infinite possibilities.", global: "Global Infrastructure", security: "Enterprise Security", analytics: "Real-time Analytics" },
    products: {
      trayo: {
        title: "Trayo",
        subtitle: "Instant File Access",
        desc: "Trayo is a lightweight macOS menu bar app that gives you instant access to your files without cluttering your Dock or desktop. It lives quietly in the system tray, letting you open folders, preview files, and jump to what you need with a single click or keyboard shortcut. Designed to be fast, minimal, and distraction-free, Trayo keeps your workflow smooth while staying out of the way.",
        subdesc: "Available for macOS Sonoma and later. Apple Silicon native.",
        btn: "Download for Mac",
        features: ["Menu Bar Integration", "Instant Folder Preview", "One-Click File Jump", "Keyboard Shortcuts"]
      }
    }
  }
};

const FEATURES = [
  {
    key: "global",
    title: "Global Infrastructure",
    desc: "Deploy instantly across 35+ regions with Fac Systems Cloud.",
    icon: <GlobeIcon className="w-6 h-6 text-white" />,
    colSpan: "col-span-12 md:col-span-8",
    bg: "bg-neutral-900 border border-neutral-800"
  },
  {
    key: "security",
    title: "Enterprise Security",
    desc: "Bank-grade encryption for all data streams.",
    icon: <Lock className="w-6 h-6 text-white" />,
    colSpan: "col-span-12 md:col-span-4",
    bg: "bg-neutral-800 border border-neutral-700"
  },
  {
    key: "analytics",
    title: "Real-time Analytics",
    desc: "Monitor performance with millisecond precision.",
    icon: <BarChart3 className="w-6 h-6 text-white" />,
    colSpan: "col-span-12 md:col-span-4",
    bg: "bg-indigo-900/20 border border-indigo-500/30"
  },
  {
    key: "trayo_feat",
    title: "Trayo",
    desc: "The minimal file manager for macOS.",
    icon: <Layers className="w-6 h-6 text-white" />,
    colSpan: "col-span-12 md:col-span-8",
    bg: "bg-gradient-to-r from-blue-900 to-indigo-900 border border-indigo-700",
    isTrayo: true
  }
];

// --- Custom Icons ---

const AppleLogo = ({ className }) => (
  <svg viewBox="0 0 384 512" fill="currentColor" className={className}>
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z"/>
  </svg>
);

// --- Animations & Graphics ---

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
      ctx.fillStyle = 'rgba(0,0,0,0)'; 
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.translate(width / 2, height / 2);

      particles.forEach(p => {
        const rotX = p.x * Math.cos(time) - p.z * Math.sin(time);
        const rotZ = p.x * Math.sin(time) + p.z * Math.cos(time);
        
        const scale = 250 / (250 - rotZ); 
        const alpha = (rotZ + radius) / (2 * radius); 

        if (scale > 0) {
          ctx.beginPath();
          const size = 2 * scale;
          ctx.arc(rotX, p.y, size, 0, Math.PI * 2);
          const brightness = Math.max(0.1, alpha);
          
          if (Math.random() > 0.98) {
             ctx.fillStyle = `rgba(99, 102, 241, ${brightness})`; 
          } else {
             ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
          }
          ctx.fill();
        }
      });
      
      const gradient = ctx.createRadialGradient(0, 0, radius * 0.5, 0, 0, radius * 1.2);
      gradient.addColorStop(0, 'rgba(79, 70, 229, 0.1)'); 
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, radius * 1.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [width, height]);

  return <canvas ref={canvasRef} width={width} height={height} className="max-w-full" />;
};

const AnimatedTrayo = () => (
    <div className="w-full h-full bg-neutral-900 rounded-xl p-6 flex flex-col items-center justify-center border border-neutral-800 relative overflow-hidden">
        {/* MacOS Menu Bar Mock */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-neutral-800/80 rounded-lg flex items-center justify-end px-3 space-x-3 border border-neutral-700 backdrop-blur-sm">
            <div className="text-white text-[10px]">9:41 AM</div>
            <Search className="w-3 h-3 text-white" />
            <div className="w-4 h-4 bg-indigo-500 rounded-sm flex items-center justify-center animate-pulse">
                <Layers className="w-3 h-3 text-white" />
            </div>
        </div>
        
        {/* Trayo Dropdown Mock */}
        <div className="mt-16 w-64 bg-neutral-800/90 backdrop-blur-md rounded-xl border border-neutral-700 shadow-2xl p-2 animate-in slide-in-from-top-4 duration-700">
            <div className="px-3 py-2 border-b border-neutral-700 flex justify-between items-center">
                <span className="text-xs font-bold text-white">Trayo</span>
                <span className="text-[10px] text-neutral-400">⌘ + ⇧ + Space</span>
            </div>
            <div className="p-1 space-y-1 mt-1">
                <div className="flex items-center p-2 hover:bg-indigo-600/20 rounded cursor-pointer group">
                    <Folder className="w-4 h-4 text-blue-400 mr-3" />
                    <div>
                        <div className="text-xs text-white group-hover:text-indigo-200">Downloads</div>
                        <div className="text-[10px] text-neutral-500">2 mins ago</div>
                    </div>
                </div>
                <div className="flex items-center p-2 hover:bg-indigo-600/20 rounded cursor-pointer group">
                    <Folder className="w-4 h-4 text-blue-400 mr-3" />
                    <div>
                        <div className="text-xs text-white group-hover:text-indigo-200">Documents</div>
                        <div className="text-[10px] text-neutral-500">Yesterday</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const AnimatedAgency = () => (
    <div className="w-full h-full bg-neutral-950 rounded-xl p-2 border border-neutral-800 flex flex-col font-mono text-[10px]">
        <div className="flex gap-1.5 mb-2 p-2 border-b border-neutral-800">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
        </div>
        <div className="p-2 text-indigo-400">
            <div>&lt;html&gt;</div>
            <div className="pl-2">&lt;body&gt;</div>
            <div className="pl-4 text-white">&lt;h1&gt;Building Your Future&lt;/h1&gt;</div>
            <div className="pl-4 text-neutral-500">&lt;!-- Fac Agency Magic --&gt;</div>
            <div className="pl-2">&lt;/body&gt;</div>
            <div>&lt;/html&gt;</div>
        </div>
        <div className="mt-auto p-2">
            <div className="w-full h-1 bg-indigo-500/20 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-indigo-500 animate-[width_2s_ease-in-out_infinite]"></div>
            </div>
            <div className="text-right text-indigo-500 mt-1">Compiling...</div>
        </div>
    </div>
);

const ContactModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 max-w-md w-full relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>
        <div className="text-center">
          <div className="w-16 h-16 bg-indigo-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-indigo-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Contact Sales</h2>
          <p className="text-neutral-400 mb-8">Reach out to our team directly. We typically respond within 24 hours.</p>
          
          <div className="flex items-center justify-between bg-black border border-neutral-800 rounded-xl p-4 mb-6 group hover:border-neutral-600 transition-colors">
            <span className="text-white font-mono text-sm break-all">{CONTACT_EMAIL}</span>
            <button onClick={handleCopy} className="ml-4 p-2 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors">
              {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
          
          <button onClick={() => window.location.href = `mailto:${CONTACT_EMAIL}`} className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors">
            Open Email Client
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Components ---

const Navbar = ({ navigate, currentCountry, t, openContact }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-neutral-800' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex items-center space-x-8">
            <button onClick={() => navigate('home')} className="flex items-center space-x-3 group">
              <div className="relative w-10 h-10 flex items-center justify-center">
                 <div className="absolute inset-0 bg-indigo-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity blur-lg"></div>
                 <span className="text-2xl font-bold text-white tracking-tighter z-10">Fac.</span>
              </div>
              <span className="font-bold text-lg tracking-wide text-neutral-200 group-hover:text-white transition-colors">Systems</span>
            </button>
            
            <div className="hidden lg:flex items-center space-x-1">
              <button onClick={() => navigate('trayo')} className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors rounded-full hover:bg-neutral-800/50">{t.nav.trayo}</button>
              <button onClick={() => navigate('agency')} className="ml-2 flex items-center space-x-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider hover:bg-indigo-500/20 transition-colors">
                <span>{t.nav.agency}</span>
              </button>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <button 
              onClick={() => navigate('country')}
              className="flex items-center space-x-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors px-3 py-2 rounded-full hover:bg-neutral-800"
            >
              <span className="text-lg">{currentCountry.flag}</span>
              <span className="font-bold">{currentCountry.name}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            <button 
              onClick={openContact}
              className="text-sm font-medium bg-white text-black px-5 py-2.5 rounded-full hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              Contact Sales
            </button>
          </div>

          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-white">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-neutral-900 border-b border-neutral-800 p-4 shadow-2xl animate-in slide-in-from-top-5 duration-200">
          <div className="flex flex-col space-y-4">
             <button onClick={() => { navigate('trayo'); setIsMenuOpen(false); }} className="text-left font-medium p-2 text-neutral-300 hover:bg-neutral-800 rounded-lg">{t.nav.trayo}</button>
             <button onClick={() => { navigate('agency'); setIsMenuOpen(false); }} className="text-left font-medium p-2 text-neutral-300 hover:bg-neutral-800 rounded-lg">{t.nav.agency}</button>
            <div className="h-px bg-neutral-800 my-2"></div>
            <button onClick={() => { navigate('country'); setIsMenuOpen(false); }} className="flex items-center space-x-3 p-2 text-neutral-300 hover:bg-neutral-800 rounded-lg">
              <span className="text-xl">{currentCountry.flag}</span>
              <span className="font-medium">Change Country ({currentCountry.code})</span>
            </button>
            <button onClick={openContact} className="text-center font-medium p-3 bg-white text-black rounded-lg">Contact Sales</button>
          </div>
        </div>
      )}
    </nav>
  );
};

const ProductPage = ({ t, productKey, icon, graphic, accentColor = "indigo", openContact, isAgency, isCiro, onDownload }) => {
  let content = {};
  if (isAgency) content = t.agency;
  else if (isCiro) content = t.ciro;
  else content = t.products[productKey];
  
  const accentClass = {
      indigo: "text-indigo-500 bg-indigo-600/20",
      orange: "text-orange-500 bg-orange-600/20",
      emerald: "text-emerald-500 bg-emerald-600/20",
      pink: "text-pink-500 bg-pink-600/20"
  }[accentColor];

  const statusLabel = isAgency ? t.agency.status : isCiro ? t.ciro.status : null;

  return (
    <div className="pt-24 min-h-screen bg-black text-white">
       <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 animate-in slide-in-from-left duration-700">
             <div className={`w-16 h-16 ${accentClass} rounded-2xl flex items-center justify-center mb-6`}>
                {icon}
             </div>
             <h4 className={`font-bold uppercase tracking-widest text-sm mb-2 opacity-80 ${accentColor === 'orange' ? 'text-orange-500' : accentColor === 'emerald' ? 'text-emerald-500' : accentColor === 'pink' ? 'text-pink-500' : 'text-indigo-500'}`}>
                {content.subtitle || "Enterprise Software"}
             </h4>
             <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">{content.title}</h1>
             
             {statusLabel && (
                 <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-8 ${accentColor === 'pink' ? 'bg-pink-500/20 text-pink-400' : 'bg-indigo-500/20 text-indigo-400'}`}>
                     {statusLabel}
                 </div>
             )}

             <p className="text-xl text-neutral-400 leading-relaxed mb-6">
                {content.desc}
             </p>
             {content.subdesc && (
                <p className="text-md text-neutral-500 leading-relaxed mb-8 italic">
                    {content.subdesc}
                </p>
             )}
             
             {content.features && (
                 <ul className="space-y-4 mb-8">
                     {content.features.map((detail, idx) => (
                         <li key={idx} className="flex items-start">
                             <div className={`mt-1 mr-3 min-w-[20px] h-5 rounded-full flex items-center justify-center ${accentColor === 'orange' ? 'bg-orange-500/20 text-orange-500' : accentColor === 'emerald' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-indigo-500/20 text-indigo-500'}`}>
                                 <Check className="w-3 h-3" />
                             </div>
                             <span className="text-neutral-300">{detail}</span>
                         </li>
                     ))}
                 </ul>
             )}

             <div className="flex gap-4">
                 {productKey === 'trayo' ? (
                     <button onClick={onDownload} className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-colors hover:scale-105 active:scale-95 transform duration-200 flex items-center">
                        <AppleLogo className="w-5 h-5 mr-2" />
                        {content.btn || "Download"}
                     </button>
                 ) : (
                     <button onClick={openContact} className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-colors hover:scale-105 active:scale-95 transform duration-200">
                        {content.btn || "Book a Demo"}
                     </button>
                 )}
             </div>
          </div>
          
          <div className="w-full lg:w-1/2 animate-in slide-in-from-right duration-700 delay-200">
             <div className="relative group">
                <div className={`absolute -inset-4 bg-gradient-to-r ${accentColor === 'orange' ? 'from-orange-500/20 to-red-500/20' : accentColor === 'emerald' ? 'from-emerald-500/20 to-teal-500/20' : accentColor === 'pink' ? 'from-pink-500/20 to-purple-500/20' : 'from-indigo-500/20 to-purple-500/20'} rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-1000`}></div>
                <div className="relative bg-black rounded-3xl border border-neutral-800 shadow-2xl overflow-hidden aspect-video md:aspect-square lg:aspect-[4/3] flex items-center justify-center">
                    {graphic}
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

const CountrySelector = ({ setCountry, navigate }) => {
  const [search, setSearch] = useState('');
  const allCountriesFlat = COUNTRIES;
  const filteredCountries = allCountriesFlat.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (country) => {
      setCountry(country);
      navigate('home');
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate('home')} className="mb-8 flex items-center text-neutral-400 hover:text-white transition-colors group">
          <ArrowRight className="w-4 h-4 rotate-180 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </button>
        <h1 className="text-4xl font-bold text-white mb-10">Select Region</h1>
        <div className="relative mb-12 group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-white transition-colors" />
          <input 
            type="text" 
            placeholder="Search country..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none shadow-xl transition-all"
          />
        </div>
        {search ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredCountries.map(c => (
                    <button key={c.code} onClick={() => handleSelect(c)} className="flex items-center p-4 bg-neutral-900/50 rounded-xl border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-800 transition-all text-left">
                        <span className="text-2xl mr-3">{c.flag}</span>
                        <span className="font-medium text-neutral-300">{c.name}</span>
                    </button>
                ))}
            </div>
        ) : (
            <div className="space-y-12">
                {Object.entries(REGIONS).map(([region, codes]) => (
                    <div key={region} className="animate-in fade-in duration-700">
                        <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4 border-b border-neutral-800 pb-2">{region}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {codes.map(code => {
                                const country = getCountry(code);
                                if (!country) return null;
                                return (
                                    <button key={code} onClick={() => handleSelect(country)} className="flex items-center p-4 bg-neutral-900/30 rounded-xl border border-neutral-800 hover:border-indigo-500/50 hover:bg-neutral-800 transition-all text-left group">
                                        <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">{country.flag}</span>
                                        <span className="font-medium text-neutral-300 group-hover:text-white">{country.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

const DashboardPreview = ({ t }) => {
  return (
    <div className="bg-black py-24 border-t border-neutral-900 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Complete visibility. Total control.
          </h2>
          <p className="text-xl text-neutral-400">
            From restaurant tables to gated community access points. Fac Systems unifies your physical and digital operations.
          </p>
        </div>

        <div className="rounded-3xl bg-neutral-900 border border-neutral-800 p-2 shadow-2xl overflow-hidden ring-1 ring-white/10">
          <div className="bg-black rounded-2xl overflow-hidden">
             <div className="border-b border-neutral-800 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                   <div className="flex space-x-1.5"><div className="w-3 h-3 rounded-full bg-red-500/50"></div><div className="w-3 h-3 rounded-full bg-yellow-500/50"></div><div className="w-3 h-3 rounded-full bg-green-500/50"></div></div>
                   <div className="h-6 w-px bg-neutral-800 mx-2"></div>
                   <div className="flex items-center space-x-2 px-3 py-1 bg-neutral-900 rounded-md border border-neutral-800"><Shield className="w-3 h-3 text-green-500" /><span className="text-xs text-neutral-400">fac-secure-v2.1</span></div>
                </div>
             </div>

             <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1 md:col-span-2 space-y-6">
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800">
                         <CreditCard className="w-16 h-16 text-indigo-500 mb-4 opacity-50" />
                         <p className="text-sm text-neutral-400 font-medium mb-1">POS Revenue</p>
                         <h3 className="text-3xl font-bold text-white">$84,291.00</h3>
                      </div>
                      <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800">
                         <Server className="w-16 h-16 text-emerald-500 mb-4 opacity-50" />
                         <p className="text-sm text-neutral-400 font-medium mb-1">Active Terminals</p>
                         <h3 className="text-3xl font-bold text-white">142</h3>
                      </div>
                   </div>
                </div>
                <div className="rounded-2xl bg-indigo-900/10 border border-indigo-500/20 p-6">
                   <h4 className="text-sm font-bold text-indigo-200 mb-6 flex items-center"><Zap className="w-4 h-4 mr-2 text-indigo-400" /> System Status</h4>
                   <div className="space-y-6">
                      {[{ label: "POS Latency", val: "12%", color: "bg-indigo-500" }, { label: "Gate Response", val: "24%", color: "bg-indigo-400" }, { label: "Active Users", val: "84%", color: "bg-indigo-300" }].map((s, i) => (
                          <div key={i}>
                             <div className="flex justify-between text-xs text-indigo-300 mb-2"><span>{s.label}</span><span>{s.val}</span></div>
                             <div className="w-full h-1.5 bg-indigo-900/50 rounded-full overflow-hidden"><div className={`h-full ${s.color} w-[${s.val.replace('%','')}%] rounded-full`}></div></div>
                          </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LandingPage = ({ navigate, t, openContact }) => (
  <div className="pt-20 bg-black min-h-screen">
    {/* Hero Section */}
    <div className="relative overflow-hidden">
      {/* Dark Mode Background Effects */}
      <div className="absolute top-0 right-1/4 -mt-20 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[100px] pointer-events-none animate-pulse duration-[5000ms]"></div>
      <div className="absolute bottom-0 left-1/4 -mb-20 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 relative z-10 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 text-center md:text-left mb-12 md:mb-0">
          <div className="inline-flex items-center space-x-2 bg-neutral-900/80 border border-neutral-800 backdrop-blur rounded-full p-1.5 pl-3 pr-4 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="bg-pink-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">{t.hero.new}</span>
            <span className="text-neutral-300 text-xs font-medium">{t.hero.agency_news}</span>
            <ChevronRight className="w-3 h-3 text-neutral-500" />
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-7xl font-bold tracking-tighter text-white mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            {t.hero.title_start} <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-400 to-white animate-gradient-x">
              {t.hero.title_end}
            </span>
          </h1>
          
          <p className="max-w-2xl text-xl text-neutral-400 mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            {t.hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <button onClick={() => navigate('trayo')} className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold text-lg rounded-full hover:bg-neutral-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:scale-105">
              {t.hero.contact_btn}
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center relative h-[400px] md:h-[500px]">
           <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>
           <RotatingGlobe width={500} height={500} />
           <div className="absolute bottom-10 right-0 md:right-10 bg-black/80 backdrop-blur border border-neutral-800 p-4 rounded-xl shadow-2xl animate-in slide-in-from-right duration-1000 delay-500">
              <div className="flex items-center space-x-3 mb-2">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                 <span className="text-xs font-bold text-white uppercase tracking-wider">System Status</span>
              </div>
              <p className="text-white font-bold text-lg">{t.globe.label}</p>
              <p className="text-neutral-500 text-xs mt-1">Latency: 12ms • Uptime: 99.999%</p>
           </div>
        </div>
      </div>
    </div>

    {/* Bento Grid Features (Restored & Expanded) */}
    <div id="features-grid" className="bg-black py-32 relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center">{t.features.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {FEATURES.map((feature, idx) => (
            <div key={idx} className={`${feature.colSpan} ${feature.bg} rounded-3xl p-8 relative overflow-hidden group hover:border-neutral-600 transition-all duration-300`}>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className={`text-lg leading-relaxed ${feature.isTrayo ? 'text-indigo-200' : 'text-neutral-400'}`}>
                  {feature.desc}
                </p>
                {feature.isTrayo && (
                   <div className="mt-8 inline-block bg-white text-black text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider">Enterprise Ready</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Agency Teaser Banner */}
    <div className="w-full bg-neutral-900 border-y border-neutral-800 py-16 overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10">
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h3 className="text-3xl font-bold mb-3 flex items-center justify-center md:justify-start text-white">
            <span className="text-indigo-500 mr-3">✦</span> {t.agency.title}
          </h3>
          <p className="text-neutral-400 max-w-lg text-lg">
            {t.agency.desc}
          </p>
        </div>
        <button onClick={() => navigate('agency')} className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition-all shadow-lg hover:shadow-indigo-500/25">
          {t.agency.btn}
        </button>
      </div>
    </div>
  </div>
);

// --- Main App Component ---

const App = () => {
  const [page, setPage] = useState('home');
  const [country, setCountry] = useState(COUNTRIES[0]); // Default US
  const [isContactOpen, setIsContactOpen] = useState(false);

  // --- Geolocation Logic ---
  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    const regionCode = navigator.language.split('-')[1];
    let detectedCountry = null;
    
    if (regionCode) detectedCountry = COUNTRIES.find(c => c.code === regionCode);
    if (!detectedCountry && browserLang) detectedCountry = COUNTRIES.find(c => c.lang === browserLang);
    if (detectedCountry) setCountry(detectedCountry);
  }, []);

  const t = useMemo(() => TRANSLATIONS['en'], []); 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const toggleContact = () => setIsContactOpen(!isContactOpen);

  const handleDownload = () => {
      const link = document.createElement('a');
      link.href = '/TrayoInstaller.dmg';
      link.download = 'TrayoInstaller.dmg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  const renderPage = () => {
    switch(page) {
      case 'home':
        return (
          <>
            <Navbar navigate={setPage} currentCountry={country} t={t} openContact={toggleContact} />
            <LandingPage navigate={setPage} t={t} openContact={toggleContact} />
            <footer className="bg-black text-white py-16 border-t border-neutral-900">
              <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold tracking-tighter">Fac.</span>
                  </div>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    Empowering digital enterprises.
                  </p>
                  <p className="text-neutral-600 text-xs">© 2026 Fac Systems Software Inc.</p>
                </div>
                <div>
                  <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-neutral-500">Products</h4>
                  <ul className="space-y-3 text-sm text-neutral-400">
                    <li><button onClick={() => setPage('trayo')} className="hover:text-white transition-colors text-left">{t.products.trayo.title}</button></li>
                  </ul>
                </div>
              </div>
            </footer>
          </>
        );
      case 'country':
        return <CountrySelector setCountry={setCountry} navigate={setPage} />;
      case 'trayo':
        return (
            <>
                <Navbar navigate={setPage} currentCountry={country} t={t} openContact={toggleContact} />
                <ProductPage 
                    t={t} productKey="trayo" icon={<Layers className="w-8 h-8" />} graphic={
                        <div className="w-full h-full bg-neutral-900 flex flex-col items-center justify-center p-8"><AnimatedTrayo /></div>
                    } accentColor="indigo" openContact={toggleContact} onDownload={handleDownload}
                />
            </>
        );
      case 'agency':
        return (
            <>
                <Navbar navigate={setPage} currentCountry={country} t={t} openContact={toggleContact} />
                <ProductPage 
                    t={t} isAgency icon={<Code className="w-8 h-8" />} graphic={
                        <div className="w-full h-full bg-neutral-900 flex flex-col items-center justify-center p-8"><AnimatedAgency /></div>
                    } accentColor="indigo" openContact={toggleContact}
                />
            </>
        );
      default:
        return <LandingPage navigate={setPage} t={t} openContact={toggleContact} />;
    }
  };

  return (
    <div className="font-sans antialiased text-white bg-black selection:bg-indigo-500/30 selection:text-white min-h-screen">
      {renderPage()}
      <ContactModal isOpen={isContactOpen} onClose={toggleContact} />
    </div>
  );
};

export default App;