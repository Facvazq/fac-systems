import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Menu, X, Globe as GlobeIcon, ArrowRight, Check, ChevronRight, 
  Shield, Zap, BarChart3, Rocket, Lock, ChevronDown, Search,
  CreditCard, Server, Activity, ShoppingBag, Key, Utensils, 
  ScanBarcode, Printer, Receipt, Users, Clock, AlertTriangle, 
  Smartphone, MapPin, CheckCircle2, XCircle, Copy, Mail,
  Layout, Code, Palette, Kanban, UserPlus, Filter
} from 'lucide-react';

// --- Assets & Data ---

const CONTACT_EMAIL = "Facsystemshome@gmail.com";

const REGIONS = {
  "North America": ['US', 'CA'],
  "South America": ['AR'],
  "Europe": ['GB', 'DE', 'FR', 'IT', 'ES', 'NL', 'SE', 'CH', 'PL', 'BE', 'AT', 'PT', 'GR', 'IE', 'NO', 'DK', 'FI', 'CZ', 'HU', 'RO', 'UA', 'HR', 'BG', 'SK', 'SI', 'LU', 'IS', 'EE', 'LV', 'LT', 'MT', 'CY', 'MC'],
  "Oceania": ['AU']
};

const COUNTRIES = [
  // North America
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', symbol: '$', rate: 1, bundle: 25 },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD', symbol: '$', rate: 1.35, bundle: 34 },
  
  // South America
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', currency: 'ARS', symbol: '$', price: 7000, bundle: 19999, isSpecial: true },
  
  // Oceania
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD', symbol: '$', rate: 1.5, bundle: 38 },
  
  // Europe
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', symbol: '£', rate: 0.8, bundle: 20 },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', currency: 'EUR', symbol: '€', rate: 0.92, bundle: 23 },
  { code: 'FR', name: 'France', flag: '🇫🇷', currency: 'EUR', symbol: '€', rate: 0.92, bundle: 23 },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', currency: 'EUR', symbol: '€', rate: 0.92, bundle: 23 },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', currency: 'EUR', symbol: '€', rate: 0.92, bundle: 23 },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', currency: 'EUR', symbol: '€', rate: 0.92, bundle: 23 },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', currency: 'EUR', symbol: '€', rate: 0.92, bundle: 23 },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', currency: 'EUR', symbol: '€', rate: 0.92, bundle: 23 },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', currency: 'EUR', symbol: '€', rate: 0.92, bundle: 23 },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', currency: 'EUR', symbol: '€', rate: 0.92, bundle: 23 },
  { code: 'AT', name: 'Austria', flag: '🇦🇹', currency: 'EUR', symbol: '€', rate: 0.92, bundle: 23 },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', currency: 'EUR', symbol: '€', rate: 0.92, bundle: 23 },
  { code: 'GR', name: 'Greece', flag: '🇬🇷', currency: 'EUR', symbol: '€', rate: 0.92, bundle: 23 },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪', currency: 'EUR', symbol: '€', rate: 0.92, bundle: 23 },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', currency: 'EUR', symbol: '€', rate: 0.92, bundle: 23 },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', currency: 'EUR', symbol: '€', rate: 0.92, bundle: 23 },
  { code: 'FI', name: 'Finland', flag: '🇫🇮', currency: 'EUR', symbol: '€', rate: 0.92, bundle: 23 },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿', currency: 'EUR', symbol: '€', rate: 0.92, bundle: 23 },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺', currency: 'EUR', symbol: '€', rate: 0.92, bundle: 23 },
  { code: 'RO', name: 'Romania', flag: '🇷🇴', currency: 'EUR', symbol: '€', rate: 0.92, bundle: 23 },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦', currency: 'EUR', symbol: '€', rate: 0.92, bundle: 23 },
  { code: 'HR', name: 'Croatia', flag: '🇭🇷', currency: 'EUR', symbol: '€', rate: 0.92, bundle: 23 },
  { code: 'BG', name: 'Bulgaria', flag: '🇧🇬', currency: 'EUR', symbol: '€', rate: 0.92, bundle: 23 },
  { code: 'SK', name: 'Slovakia', flag: '🇸🇰', currency: 'EUR', symbol: '€', rate: 0.92, bundle: 23 },
  { code: 'SI', name: 'Slovenia', flag: '🇸🇮', currency: 'EUR', symbol: '€', rate: 0.92, bundle: 23 },
  { code: 'LU', name: 'Luxembourg', flag: '🇱🇺', currency: 'EUR', symbol: '€', rate: 0.92, bundle: 23 },
  { code: 'IS', name: 'Iceland', flag: '🇮🇸', currency: 'EUR', symbol: '€', rate: 0.92, bundle: 23 },
  { code: 'EE', name: 'Estonia', flag: '🇪🇪', currency: 'EUR', symbol: '€', rate: 0.92, bundle: 23 },
  { code: 'LV', name: 'Latvia', flag: '🇱🇻', currency: 'EUR', symbol: '€', rate: 0.92, bundle: 23 },
  { code: 'LT', name: 'Lithuania', flag: '🇱🇹', currency: 'EUR', symbol: '€', rate: 0.92, bundle: 23 },
  { code: 'MT', name: 'Malta', flag: '🇲🇹', currency: 'EUR', symbol: '€', rate: 0.92, bundle: 23 },
  { code: 'CY', name: 'Cyprus', flag: '🇨🇾', currency: 'EUR', symbol: '€', rate: 0.92, bundle: 23 },
  { code: 'MC', name: 'Monaco', flag: '🇲🇨', currency: 'EUR', symbol: '€', rate: 0.92, bundle: 23 },
];

const getCountry = (code) => COUNTRIES.find(c => c.code === code) || { ...COUNTRIES[0], code, name: code };

const TRANSLATIONS = {
  en: {
    nav: { facstore: "FacStore OS", fackitchen: "FacKitchen", facaccess: "FacAccess", ciro: "Ciro", pricing: "Pricing", agency: "Fac Agency" },
    hero: { new: "New", agency_news: "Ciro CRM is coming soon", title_start: "Software that", title_end: "means business.", subtitle: "The unified operating system for enterprise. Manage restaurant POS, retail inventory, and secure entry systems in one ecosystem.", contact_btn: "Explore Solutions" },
    agency: { 
        title: "Fac Agency", 
        desc: "We build your digital presence. Fac Agency is our premium web development service dedicated to building high-performance websites and digital products for businesses.", 
        btn: "Join Waitlist",
        status: "Coming Soon"
    },
    ciro: {
        title: "Ciro CRM",
        subtitle: "The All-Free CRM",
        desc: "Manage customer relationships without the cost. Ciro is our brand new, completely free Customer Relationship Management tool designed to help you track leads, manage pipeline, and close deals faster.",
        status: "Coming Soon!"
    },
    pricing: { title: "Simple, transparent pricing", subtitle: "Choose the software that fits your business needs.", month: "/month", popular: "Most Popular", bundle_title: "Fac Systems One", bundle_desc: "The complete ecosystem. All 3 software suites in one powerful package." },
    globe: { label: "Operating in 35+ Regions" },
    features: { title: "Built for scale. Designed for speed.", global: "Global Infrastructure", security: "Enterprise Security", analytics: "Real-time Analytics" },
    products: {
      facstore: {
        title: "FacStore OS",
        subtitle: "Retail Management & POS",
        desc: "FacStore OS transforms how you run your retail business. From single-location bodegas to multi-chain supermarkets, our platform synchronizes inventory, sales, and employee performance in real-time. Experience a checkout process that is 40% faster than industry standards.",
        subdesc: "Includes support for barcode scanning, receipt printing, and cash drawer management.",
        features: ["Live Inventory Sync", "Staff Performance Tracking", "Offline-First Architecture", "Multi-Store Management"]
      },
      fackitchen: {
        title: "FacKitchen",
        subtitle: "Restaurant & Café POS",
        desc: "Chaos in the kitchen is a thing of the past. FacKitchen integrates your Front of House POS directly with Kitchen Display Systems (KDS), ensuring orders are routed instantly and accurately. Manage table turnover, split checks effortlessly, and track ingredient usage down to the gram.",
        subdesc: "Optimized for touchscreens and bump bars in high-heat environments.",
        features: ["Instant Order Routing", "Ingredient-Level Inventory", "Table & Reservation Map", "Split Check & Tips"]
      },
      facaccess: {
        title: "FacAccess",
        subtitle: "Secure Entry Control",
        desc: "Security meets convenience. FacAccess provides a robust on-premise solution for gated communities and corporate facilities. Generate QR guest passes, view live entry logs, and control gates securely. Our system integrates directly with physical barriers and biometric scanners.",
        subdesc: "Local-first processing ensures zero latency and continued operation without internet.",
        features: ["QR Guest Passes", "License Plate Recognition", "Biometric Integration", "Local-First Security Logs"]
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
    key: "ciro_feat",
    title: "Ciro CRM",
    desc: "Our upcoming 100% Free CRM for growth.",
    icon: <Users className="w-6 h-6 text-white" />,
    colSpan: "col-span-12 md:col-span-8",
    bg: "bg-gradient-to-r from-pink-900 to-rose-900 border border-pink-700",
    isCiro: true
  }
];

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

const AnimatedReceipt = () => (
  <div className="w-48 bg-white text-black p-4 rounded shadow-xl mx-auto font-mono text-[10px] transform transition-all duration-1000 hover:scale-105">
    <div className="text-center mb-4">
      <div className="font-bold text-lg">FacStore</div>
      <div className="text-neutral-400">Transaction #8492</div>
    </div>
    <div className="space-y-2 border-b border-dashed border-neutral-300 pb-4 mb-4">
      <div className="flex justify-between"><span>Milk (1gal)</span><span>$4.50</span></div>
      <div className="flex justify-between"><span>Eggs (12ct)</span><span>$3.20</span></div>
      <div className="flex justify-between"><span>Bread</span><span>$2.80</span></div>
    </div>
    <div className="flex justify-between font-bold text-sm">
      <span>TOTAL</span>
      <span>$10.50</span>
    </div>
    <div className="mt-6 text-center text-neutral-400">Thank you for shopping!</div>
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent h-4 w-full animate-[scan_2s_linear_infinite]"></div>
  </div>
);

const AnimatedKitchen = () => {
  const [tickets, setTickets] = useState([1, 2, 3]);
  useEffect(() => {
    const interval = setInterval(() => {
      setTickets(prev => {
        const next = [...prev];
        next.shift();
        next.push(prev[prev.length - 1] + 1);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex space-x-2 overflow-hidden px-4">
      {tickets.map(t => (
        <div key={t} className="min-w-[120px] bg-neutral-800 border-t-4 border-orange-500 p-2 rounded animate-in slide-in-from-right duration-500">
          <div className="text-orange-500 font-bold text-xs mb-1">ORDER #{t + 40}</div>
          <div className="text-white text-[10px] space-y-1">
            <div className="flex items-center"><CheckCircle2 className="w-3 h-3 mr-1 text-green-500"/> Burger</div>
            <div className="flex items-center"><Clock className="w-3 h-3 mr-1 text-yellow-500"/> Fries</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const AnimatedGate = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => setOpen(p => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-32 bg-neutral-900 rounded-lg flex items-center justify-center overflow-hidden border border-neutral-800">
      <div className="absolute bottom-0 w-full h-1 bg-neutral-700"></div>
      <div className={`absolute bottom-4 left-10 w-2 h-16 bg-neutral-600 rounded-t origin-bottom transition-all duration-1000 ${open ? 'rotate-[-45deg]' : 'rotate-0'}`}></div>
      <div className={`absolute bottom-4 left-12 w-48 h-2 bg-red-500 origin-left transition-all duration-1000 ${open ? 'rotate-[-45deg]' : 'rotate-0'}`}>
         <div className="w-full h-full flex justify-between px-2">
            <div className="w-4 h-full bg-white/50"></div>
            <div className="w-4 h-full bg-white/50"></div>
            <div className="w-4 h-full bg-white/50"></div>
         </div>
      </div>
      <div className={`absolute top-4 right-4 px-2 py-1 rounded text-[10px] font-bold ${open ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
        {open ? 'ACCESS GRANTED' : 'LOCKED'}
      </div>
    </div>
  );
};

const AnimatedCiro = () => (
    <div className="w-full h-full bg-neutral-900 rounded-xl p-4 flex gap-4 overflow-hidden border border-neutral-800">
        {[
            { title: "LEADS", color: "bg-pink-500", items: 2 },
            { title: "CONTACTED", color: "bg-purple-500", items: 1 },
            { title: "WON", color: "bg-green-500", items: 3 }
        ].map((col, i) => (
            <div key={i} className="flex-1 bg-neutral-800/50 rounded-lg p-2 flex flex-col gap-2">
                <div className={`text-[10px] font-bold ${col.color.replace('bg-', 'text-')} mb-1 uppercase`}>{col.title}</div>
                {Array.from({length: col.items}).map((_, j) => (
                    <div key={j} className="bg-neutral-700 p-2 rounded shadow-sm hover:scale-105 transition-transform cursor-pointer">
                        <div className="w-8 h-2 bg-neutral-600 rounded mb-1"></div>
                        <div className="w-full h-1.5 bg-neutral-600/50 rounded"></div>
                    </div>
                ))}
            </div>
        ))}
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

const PayPalSubscriptionButton = () => {
  const buttonRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadPaypalScript = () => {
        if (window.paypal) {
            renderButton();
            return;
        }

        if (document.getElementById('paypal-sdk')) {
            const script = document.getElementById('paypal-sdk');
            script.addEventListener('load', renderButton);
            return;
        }

        const script = document.createElement('script');
        script.id = 'paypal-sdk';
        script.src = "https://www.paypal.com/sdk/js?client-id=AcXwg9bZo6LLx44x5jmu61ij_UjbVwlVK5JIRQq71HDCmI9EXbRB9eHMIUMZ4z14x2-wcACEeVohUori&vault=true&intent=subscription";
        script.setAttribute('data-sdk-integration-source', 'button-factory');
        script.async = true;
        script.onload = renderButton;
        script.onerror = () => { if(isMounted) setError("Failed to load PayPal SDK"); };
        document.body.appendChild(script);
    };

    const renderButton = () => {
        if (!isMounted || !buttonRef.current || !window.paypal) return;
        
        if (buttonRef.current.innerHTML !== "") return;

        try {
            window.paypal.Buttons({
                style: {
                    shape: 'rect',
                    color: 'gold',
                    layout: 'vertical',
                    label: 'subscribe'
                },
                createSubscription: function(data, actions) {
                    return actions.subscription.create({
                        plan_id: 'P-5CV08645A2990653BNFO5QRI'
                    });
                },
                onApprove: function(data, actions) {
                    alert('Subscription successful! Subscription ID: ' + data.subscriptionID);
                },
                onError: function (err) {
                    console.error("PayPal Button Error:", err);
                    if(isMounted) setError("PayPal Error");
                }
            }).render(buttonRef.current).catch(err => {
                console.error("PayPal Render Error:", err);
                if(isMounted) setError("Failed to render PayPal button");
            });
        } catch (err) {
            console.error("PayPal Initialization Error:", err);
            if(isMounted) setError("Failed to initialize PayPal");
        }
    };

    loadPaypalScript();

    return () => {
        isMounted = false;
        if (buttonRef.current) {
            buttonRef.current.innerHTML = ""; 
        }
        const script = document.getElementById('paypal-sdk');
        if (script) {
            script.removeEventListener('load', renderButton);
        }
    };
  }, []);

  if (error) {
      return <div className="text-red-500 text-xs mt-2">Payment system unavailable. Please contact sales.</div>;
  }

  return <div ref={buttonRef} className="w-full mt-4 min-h-[40px] relative z-0"></div>;
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
              <button onClick={() => navigate('facstore')} className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors rounded-full hover:bg-neutral-800/50">{t.nav.facstore}</button>
              <button onClick={() => navigate('fackitchen')} className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors rounded-full hover:bg-neutral-800/50">{t.nav.fackitchen}</button>
              <button onClick={() => navigate('facaccess')} className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors rounded-full hover:bg-neutral-800/50">{t.nav.facaccess}</button>
              <button onClick={() => navigate('ciro')} className="px-4 py-2 text-sm font-medium text-pink-400 hover:text-pink-300 transition-colors rounded-full hover:bg-neutral-800/50">{t.nav.ciro}</button>
              <button onClick={() => navigate('pricing')} className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors rounded-full hover:bg-neutral-800/50">{t.nav.pricing}</button>
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
             <button onClick={() => { navigate('facstore'); setIsMenuOpen(false); }} className="text-left font-medium p-2 text-neutral-300 hover:bg-neutral-800 rounded-lg">{t.nav.facstore}</button>
             <button onClick={() => { navigate('fackitchen'); setIsMenuOpen(false); }} className="text-left font-medium p-2 text-neutral-300 hover:bg-neutral-800 rounded-lg">{t.nav.fackitchen}</button>
             <button onClick={() => { navigate('facaccess'); setIsMenuOpen(false); }} className="text-left font-medium p-2 text-neutral-300 hover:bg-neutral-800 rounded-lg">{t.nav.facaccess}</button>
             <button onClick={() => { navigate('ciro'); setIsMenuOpen(false); }} className="text-left font-medium p-2 text-pink-400 hover:bg-neutral-800 rounded-lg">{t.nav.ciro}</button>
             <button onClick={() => { navigate('agency'); setIsMenuOpen(false); }} className="text-left font-medium p-2 text-indigo-400 hover:bg-neutral-800 rounded-lg">{t.nav.agency}</button>
             <button onClick={() => { navigate('pricing'); setIsMenuOpen(false); }} className="text-left font-medium p-2 text-neutral-300 hover:bg-neutral-800 rounded-lg">{t.nav.pricing}</button>
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

const SolutionsPage = ({ t, navigate }) => {
  const solutions = [
    { 
      id: 'facstore', 
      title: t.products.facstore.title, 
      desc: t.products.facstore.desc, 
      icon: <ShoppingBag className="w-10 h-10 text-indigo-500" />,
      color: "border-indigo-500/30 hover:border-indigo-500"
    },
    { 
      id: 'fackitchen', 
      title: t.products.fackitchen.title, 
      desc: t.products.fackitchen.desc, 
      icon: <Utensils className="w-10 h-10 text-orange-500" />,
      color: "border-orange-500/30 hover:border-orange-500"
    },
    { 
      id: 'facaccess', 
      title: t.products.facaccess.title, 
      desc: t.products.facaccess.desc, 
      icon: <Key className="w-10 h-10 text-emerald-500" />,
      color: "border-emerald-500/30 hover:border-emerald-500"
    },
    { 
      id: 'ciro', 
      title: t.ciro.title, 
      desc: t.ciro.desc, 
      icon: <Users className="w-10 h-10 text-pink-500" />,
      color: "border-pink-500/30 hover:border-pink-500"
    },
    { 
      id: 'agency', 
      title: t.agency.title, 
      desc: t.agency.desc, 
      icon: <Code className="w-10 h-10 text-indigo-400" />,
      color: "border-indigo-400/30 hover:border-indigo-400"
    }
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-black text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-20">
                <h1 className="text-5xl font-bold mb-6">Our Ecosystem</h1>
                <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                    A suite of powerful tools designed to run every aspect of your business.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {solutions.map((item) => (
                    <button 
                        key={item.id} 
                        onClick={() => navigate(item.id)}
                        className={`text-left bg-neutral-900/50 border ${item.color} rounded-2xl p-8 transition-all hover:scale-[1.02] hover:bg-neutral-900 group`}
                    >
                        <div className="mb-6 bg-neutral-950 w-16 h-16 rounded-xl flex items-center justify-center border border-neutral-800 group-hover:border-neutral-700">
                            {item.icon}
                        </div>
                        <h3 className="text-2xl font-bold mb-3 flex items-center text-white">
                            {item.title}
                            <ArrowRight className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                        </h3>
                        <p className="text-neutral-400 leading-relaxed text-sm">
                            {item.desc}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    </div>
  );
};

const ProductPage = ({ t, productKey, icon, graphic, accentColor = "indigo", openContact, isAgency, isCiro }) => {
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
                 <button onClick={openContact} className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-colors hover:scale-105 active:scale-95 transform duration-200">
                    {content.btn || "Book a Demo"}
                 </button>
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

const PricingPage = ({ t, currentCountry, openContact }) => {
  let price = 10;
  let bundlePrice = 25;
  let currency = 'USD';
  let symbol = '$';

  const countryConfig = COUNTRIES.find(c => c.code === currentCountry.code);
  
  if (countryConfig) {
      currency = countryConfig.currency;
      symbol = countryConfig.symbol;
      
      if (countryConfig.isSpecial) {
          price = countryConfig.price;
          bundlePrice = countryConfig.bundle;
      } else {
          price = Math.round(10 * countryConfig.rate);
          if(countryConfig.bundle) {
             bundlePrice = countryConfig.bundle; 
          } else {
             bundlePrice = Math.round(25 * countryConfig.rate);
          }
      }
  }

  const formatPrice = (val) => val.toLocaleString();

  const plans = [
    { title: "FacStore OS", icon: <ShoppingBag className="w-6 h-6"/>, color: "indigo" },
    { title: "FacKitchen", icon: <Utensils className="w-6 h-6"/>, color: "orange" },
    { title: "FacAccess", icon: <Key className="w-6 h-6"/>, color: "emerald" },
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-black text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-6">{t.pricing.title}</h1>
                <p className="text-xl text-neutral-400">{t.pricing.subtitle}</p>
                <div className="mt-4 inline-block px-4 py-2 bg-neutral-900 rounded-full border border-neutral-800 text-lg text-white flex items-center justify-center">
                    Pricing for <span className="mx-2 text-2xl">{currentCountry.flag}</span> <span className="font-bold">{currentCountry.name}</span> <span className="ml-2 text-neutral-400">({currency})</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {plans.map((plan, i) => (
                    <div key={i} className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 flex flex-col hover:border-neutral-700 transition-colors">
                        <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center ${plan.color === 'indigo' ? 'bg-indigo-900/50 text-indigo-400' : plan.color === 'orange' ? 'bg-orange-900/50 text-orange-400' : 'bg-emerald-900/50 text-emerald-400'}`}>
                            {plan.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                        <div className="text-3xl font-bold mb-1 flex items-end">
                            {symbol}{formatPrice(price)}
                            <span className="text-sm font-normal text-neutral-500 ml-1 mb-1">{currency}{t.pricing.month}</span>
                        </div>
                        <p className="text-sm text-neutral-400 mb-8">Full license for single suite.</p>
                        <ul className="space-y-3 mb-8 flex-1">
                            <li className="flex items-center text-sm text-neutral-300"><Check className="w-4 h-4 mr-2 text-neutral-500"/> Unlimited Users</li>
                            <li className="flex items-center text-sm text-neutral-300"><Check className="w-4 h-4 mr-2 text-neutral-500"/> 24/7 Support</li>
                            <li className="flex items-center text-sm text-neutral-300"><Check className="w-4 h-4 mr-2 text-neutral-500"/> Analytics</li>
                        </ul>
                        {/* Conditionally render PayPal button for FacStore OS */}
                        {plan.title === "FacStore OS" ? (
                            <PayPalSubscriptionButton />
                        ) : (
                            <button onClick={openContact} className="w-full py-3 rounded-lg border border-neutral-700 hover:bg-neutral-800 transition-colors font-medium">Contact Sales</button>
                        )}
                    </div>
                ))}

                <div className="bg-white text-black rounded-2xl p-1 relative flex flex-col transform md:scale-105 shadow-2xl">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg border border-neutral-800">
                        {t.pricing.popular}
                    </div>
                    <div className="bg-neutral-100 rounded-xl p-6 flex-1 flex flex-col">
                        <div className="w-12 h-12 rounded-xl mb-6 flex items-center justify-center bg-black text-white">
                            <Zap className="w-6 h-6"/>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{t.pricing.bundle_title}</h3>
                        <div className="text-4xl font-bold mb-1 flex items-end">
                            {symbol}{formatPrice(bundlePrice)}
                            <span className="text-sm font-normal text-neutral-500 ml-1 mb-1">{currency}{t.pricing.month}</span>
                        </div>
                        <p className="text-sm text-neutral-600 mb-8">{t.pricing.bundle_desc}</p>
                        
                        <div className="space-y-3 mb-8 flex-1">
                            <div className="flex items-center space-x-2 p-2 bg-white rounded border border-neutral-200">
                                <ShoppingBag className="w-4 h-4 text-indigo-600"/> <span className="text-sm font-bold">FacStore OS</span>
                            </div>
                            <div className="flex items-center space-x-2 p-2 bg-white rounded border border-neutral-200">
                                <Utensils className="w-4 h-4 text-orange-600"/> <span className="text-sm font-bold">FacKitchen</span>
                            </div>
                            <div className="flex items-center space-x-2 p-2 bg-white rounded border border-neutral-200">
                                <Key className="w-4 h-4 text-emerald-600"/> <span className="text-sm font-bold">FacAccess</span>
                            </div>
                        </div>
                        <button onClick={openContact} className="w-full py-4 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors font-bold shadow-lg">
                            Get the Bundle
                        </button>
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
            <button onClick={() => navigate('solutions')} className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold text-lg rounded-full hover:bg-neutral-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:scale-105">
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

    {/* Dashboard Preview Section (Restored) */}
    <DashboardPreview t={t} />

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
                <p className={`text-lg leading-relaxed ${feature.isCiro ? 'text-pink-200' : 'text-neutral-400'}`}>
                  {feature.desc}
                </p>
                {feature.isCiro && (
                   <div className="mt-8 inline-block bg-white text-black text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider">Coming Soon</div>
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
                    <li><button onClick={() => setPage('facstore')} className="hover:text-white transition-colors text-left">{t.nav.facstore}</button></li>
                    <li><button onClick={() => setPage('fackitchen')} className="hover:text-white transition-colors text-left">{t.nav.fackitchen}</button></li>
                    <li><button onClick={() => setPage('facaccess')} className="hover:text-white transition-colors text-left">{t.nav.facaccess}</button></li>
                    <li><button onClick={() => setPage('ciro')} className="hover:text-white transition-colors text-left">{t.nav.ciro}</button></li>
                  </ul>
                </div>
              </div>
            </footer>
          </>
        );
      case 'pricing':
        return (
            <>
                <Navbar navigate={setPage} currentCountry={country} t={t} openContact={toggleContact} />
                <PricingPage t={t} currentCountry={country} openContact={toggleContact} />
            </>
        );
      case 'country':
        return <CountrySelector setCountry={setCountry} navigate={setPage} />;
      case 'facstore':
        return (
            <>
                <Navbar navigate={setPage} currentCountry={country} t={t} openContact={toggleContact} />
                <ProductPage 
                    t={t} productKey="facstore" icon={<ShoppingBag className="w-8 h-8" />} graphic={
                        <div className="w-full h-full bg-neutral-900 flex flex-col items-center justify-center p-8">
                            <div className="relative">
                                <AnimatedReceipt />
                                <div className="absolute -bottom-4 -right-4 bg-green-500 text-black text-xs font-bold px-2 py-1 rounded shadow-lg animate-bounce">Paid</div>
                            </div>
                        </div>
                    } accentColor="indigo" openContact={toggleContact}
                />
            </>
        );
      case 'fackitchen':
        return (
            <>
                <Navbar navigate={setPage} currentCountry={country} t={t} openContact={toggleContact} />
                <ProductPage 
                    t={t} productKey="fackitchen" icon={<Utensils className="w-8 h-8" />} graphic={
                        <div className="w-full h-full bg-neutral-900 flex flex-col items-center justify-center p-8">
                            <div className="w-full max-w-md">
                                <div className="flex justify-between text-neutral-500 text-xs mb-2 font-mono"><span>KDS-01</span><span>LIVE</span></div>
                                <AnimatedKitchen />
                            </div>
                        </div>
                    } accentColor="orange" openContact={toggleContact}
                />
            </>
        );
      case 'facaccess':
        return (
            <>
                <Navbar navigate={setPage} currentCountry={country} t={t} openContact={toggleContact} />
                <ProductPage 
                    t={t} productKey="facaccess" icon={<Key className="w-8 h-8" />} graphic={
                        <div className="w-full h-full bg-neutral-900 flex flex-col items-center justify-center p-8">
                            <div className="w-full max-w-sm"><AnimatedGate /></div>
                        </div>
                    } accentColor="emerald" openContact={toggleContact}
                />
            </>
        );
      case 'ciro':
        return (
            <>
                <Navbar navigate={setPage} currentCountry={country} t={t} openContact={toggleContact} />
                <ProductPage 
                    t={t} isCiro icon={<Users className="w-8 h-8" />} graphic={
                        <div className="w-full h-full bg-neutral-900 flex flex-col items-center justify-center p-8"><AnimatedCiro /></div>
                    } accentColor="pink" openContact={toggleContact}
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
      case 'solutions':
        return (
            <>
                <Navbar navigate={setPage} currentCountry={country} t={t} openContact={toggleContact} />
                <SolutionsPage t={t} navigate={setPage} />
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