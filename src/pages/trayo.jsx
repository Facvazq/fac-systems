import React from 'react';
import { Layers, Check, Folder, Search } from 'lucide-react';
import { AppleLogo, AnimatedTrayo } from '../components/Shared';

const Trayo = ({ openContact }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/TrayoInstaller.dmg';
    link.download = 'TrayoInstaller.dmg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-24 min-h-screen bg-black text-white">
       <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 animate-in slide-in-from-left duration-700">
             <div className="w-16 h-16 text-indigo-500 bg-indigo-600/20 rounded-2xl flex items-center justify-center mb-6">
                <Layers className="w-8 h-8" />
             </div>
             <h4 className="font-bold uppercase tracking-widest text-sm mb-2 opacity-80 text-indigo-500">
                Instant File Access
             </h4>
             <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500">
                Trayo
             </h1>
             
             <p className="text-xl text-neutral-400 leading-relaxed mb-6">
                Trayo is a lightweight macOS menu bar app that gives you instant access to your files without cluttering your Dock or desktop. It lives quietly in the system tray, letting you open folders, preview files, and jump to what you need with a single click.
             </p>
             <p className="text-md text-neutral-500 leading-relaxed mb-8 italic">
                Available for macOS Sonoma and later. Apple Silicon native.
             </p>
             
             <ul className="space-y-4 mb-8">
                 {[
                    "Menu Bar Integration: Always there, never in the way.",
                    "Instant Previews: Peek into files without opening them.",
                    "Smart Shortcuts: Navigate your system at the speed of thought.",
                    "Privacy First: No cloud syncing, your data stays on your Mac."
                 ].map((detail, idx) => (
                     <li key={idx} className="flex items-start">
                         <div className="mt-1 mr-3 min-w-[20px] h-5 rounded-full flex items-center justify-center bg-indigo-500/20 text-indigo-500">
                             <Check className="w-3 h-3" />
                         </div>
                         <span className="text-neutral-300">{detail}</span>
                     </li>
                 ))}
             </ul>

             <div className="flex gap-4">
                 <button onClick={handleDownload} className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-colors hover:scale-105 active:scale-95 transform duration-200 flex items-center">
                    <AppleLogo className="w-5 h-5 mr-2" />
                    Download for Mac
                 </button>
             </div>
          </div>
          
          <div className="w-full lg:w-1/2 animate-in slide-in-from-right duration-700 delay-200">
             <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-1000"></div>
                <div className="relative bg-black rounded-3xl border border-neutral-800 shadow-2xl overflow-hidden aspect-video md:aspect-square lg:aspect-[4/3] flex items-center justify-center">
                    <AnimatedTrayo />
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default Trayo;