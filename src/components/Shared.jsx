import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronDown, Search, Layers, Folder, 
  Code, Mail, Check, Copy, Zap, MoreHorizontal, FileText,
  Plane // Added Plane icon for FlightIO
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const CONTACT_EMAIL = "facsystemshome@gmail.com";

const REGIONS = {
  "North America": ['US', 'CA'],
  "South America": ['AR'],
  "Europe": ['GB', 'DE', 'FR', 'IT', 'ES'],
  "Middle East": ['AE', 'EG', 'QA'],
  "Oceania": ['AU']
};

const COUNTRIES = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'AE', name: 'UAE', flag: '🇦🇪' },
];

export const Navbar = ({ openContact }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentCountry, setCurrentCountry] = useState(COUNTRIES[0]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const rotateCountry = () => {
    const idx = COUNTRIES.findIndex(c => c.code === currentCountry.code);
    setCurrentCountry(COUNTRIES[(idx + 1) % COUNTRIES.length]);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled || isMenuOpen ? 'bg-black/90 backdrop-blur-xl border-b border-neutral-800' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex items-center space-x-8">
            <button onClick={() => navigate('/')} className="flex items-center space-x-3 group">
              <div className="relative w-10 h-10 flex items-center justify-center">
                 <div className="absolute inset-0 bg-indigo-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity blur-lg"></div>
                 <span className="text-2xl font-bold text-white tracking-tighter z-10">Fac.</span>
              </div>
              <span className="font-bold text-lg tracking-wide text-neutral-200 group-hover:text-white transition-colors">Systems</span>
            </button>
            
            <div className="hidden lg:flex items-center space-x-1">
              <button 
                onClick={() => navigate('/trayo')} 
                className={`px-4 py-2 text-sm font-medium transition-colors rounded-full hover:bg-neutral-800/50 ${location.pathname === '/trayo' ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
              >
                Trayo
              </button>
              <button 
                onClick={() => navigate('/flightio')} 
                className={`px-4 py-2 text-sm font-medium transition-colors rounded-full hover:bg-neutral-800/50 ${location.pathname === '/flightio' ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
              >
                FlightIO
              </button>
              <button className="ml-2 flex items-center space-x-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider hover:bg-indigo-500/20 transition-colors">
                <span>Agency</span>
              </button>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <button 
              onClick={rotateCountry}
              className="flex items-center space-x-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors px-3 py-2 rounded-full hover:bg-neutral-800"
            >
              <span className="text-lg">{currentCountry.flag}</span>
              <span className="font-bold">{currentCountry.code}</span>
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
             <button onClick={() => { navigate('/trayo'); setIsMenuOpen(false); }} className="text-left font-medium p-2 text-neutral-300 hover:bg-neutral-800 rounded-lg">Trayo</button>
             <button onClick={() => { navigate('/flightio'); setIsMenuOpen(false); }} className="text-left font-medium p-2 text-neutral-300 hover:bg-neutral-800 rounded-lg">FlightIO</button>
             <button className="text-left font-medium p-2 text-indigo-400 hover:bg-neutral-800 rounded-lg">Agency</button>
            <div className="h-px bg-neutral-800 my-2"></div>
            <button onClick={openContact} className="text-center font-medium p-3 bg-white text-black rounded-lg">Contact Sales</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export const Footer = ({ openContact }) => {
  const navigate = useNavigate();
  return (
    <footer className="bg-black text-white py-16 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tighter">Fac.</span>
          </div>
          <p className="text-neutral-500 text-sm leading-relaxed">
            Empowering digital enterprises with intelligent software.
          </p>
          <p className="text-neutral-600 text-xs">© 2026 Fac Systems Software Inc.</p>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-neutral-500">Products</h4>
          <ul className="space-y-3 text-sm text-neutral-400">
            <li><button onClick={() => navigate('/trayo')} className="hover:text-white transition-colors text-left">Trayo</button></li>
            <li><button onClick={() => navigate('/flightio')} className="hover:text-white transition-colors text-left">FlightIO</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-neutral-500">Support</h4>
          <ul className="space-y-3 text-sm text-neutral-400">
            <li><button onClick={openContact} className="hover:text-white transition-colors text-left">Contact Us</button></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export const ContactModal = ({ isOpen, onClose }) => {
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

export const AppleLogo = ({ className }) => (
  <svg viewBox="0 0 384 512" fill="currentColor" className={className}>
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z"/>
  </svg>
);

export const AnimatedTrayo = () => (
    <div className="w-full h-full bg-neutral-900 rounded-xl p-6 flex flex-col items-center justify-center border border-neutral-800 relative overflow-hidden">
        {/* MacOS Menu Bar Mock */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3/4 max-w-sm h-8 bg-neutral-800/80 rounded-lg flex items-center justify-end px-3 space-x-3 border border-neutral-700 backdrop-blur-sm z-10">
            <div className="text-white text-[10px]">9:41 AM</div>
            <Search className="w-3 h-3 text-white" />
            <div className="w-4 h-4 bg-indigo-500 rounded-sm flex items-center justify-center animate-pulse">
                <Layers className="w-3 h-3 text-white" />
            </div>
        </div>
        
        {/* Trayo Dropdown Mock */}
        <div className="mt-16 w-64 bg-neutral-800/90 backdrop-blur-md rounded-xl border border-neutral-700 shadow-2xl p-2 animate-in slide-in-from-top-4 duration-700 z-0">
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

export const TrayoFeatureGraphic = () => (
    <div className="w-full h-full bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 to-transparent"></div>
        <div className="p-6 relative z-10 h-full flex flex-col justify-center">
            {/* Command Bar Card */}
            <div className="bg-black/80 backdrop-blur-md border border-neutral-700 rounded-xl p-4 mb-4 shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
                <div className="flex items-center space-x-3 mb-3 border-b border-neutral-800 pb-3">
                    <Command className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-mono text-neutral-400">Spotlight Search</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <FileText className="w-8 h-8 text-blue-400 bg-blue-500/10 p-1.5 rounded-lg" />
                        <div>
                            <div className="text-sm font-bold text-white">Q4_Report.pdf</div>
                            <div className="text-[10px] text-neutral-500">/Documents/Work</div>
                        </div>
                    </div>
                    <div className="text-[10px] bg-neutral-800 px-2 py-1 rounded text-neutral-400">Enter</div>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-neutral-800/50 p-3 rounded-lg border border-neutral-700 flex flex-col items-center justify-center hover:bg-neutral-800 transition-colors">
                    <Zap className="w-5 h-5 text-yellow-400 mb-2" />
                    <span className="text-[10px] text-white">Quick Drop</span>
                </div>
                <div className="bg-neutral-800/50 p-3 rounded-lg border border-neutral-700 flex flex-col items-center justify-center hover:bg-neutral-800 transition-colors">
                    <MoreHorizontal className="w-5 h-5 text-purple-400 mb-2" />
                    <span className="text-[10px] text-white">Actions</span>
                </div>
            </div>
        </div>
    </div>
);

export const AnimatedAgency = () => (
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
        </div>
        <div className="mt-auto p-2">
            <div className="w-full h-1 bg-indigo-500/20 rounded-full overflow-hidden">
                <div className="w-full h-full bg-indigo-500 animate-pulse origin-left transform scale-x-75"></div>
            </div>
            <div className="text-right text-indigo-500 mt-1">Compiling...</div>
        </div>
    </div>
);