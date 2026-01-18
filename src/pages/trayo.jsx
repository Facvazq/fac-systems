import React from 'react';
import { Layers, Check, ArrowDown, Download, Mail } from 'lucide-react';
import { AppleLogo, AnimatedTrayo } from '../components/Shared';

const Trayo = () => {
  const handleDownload = () => {
    // Trigger the download
    const link = document.createElement('a');
    link.href = '/TrayoInstaller.dmg'; // Ensure this file exists in your public folder
    link.download = 'TrayoInstaller.dmg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSupport = () => {
      window.location.href = "mailto:facsystemshome@gmail.com";
  };

  return (
    <div className="bg-black text-white min-h-screen pt-20">
       {/* Sub-navbar for Trayo Product */}
       <div className="sticky top-20 z-40 bg-neutral-900/80 backdrop-blur-md border-b border-neutral-800">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
               <span className="font-bold text-lg tracking-tight text-white">Trayo</span>
               <div className="flex space-x-6 text-xs font-medium">
                   <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})} className="text-white hover:text-indigo-400 transition-colors">Overview</button>
                   <button onClick={handleSupport} className="text-neutral-400 hover:text-white transition-colors">Support</button>
                   <button onClick={handleDownload} className="bg-white text-black px-3 py-1 rounded-full hover:bg-neutral-200 transition-colors font-bold">Download</button>
               </div>
           </div>
       </div>

       {/* Hero Section */}
       <div className="max-w-7xl mx-auto px-4 py-24 flex flex-col items-center text-center">
            <div className="w-20 h-20 text-indigo-500 bg-indigo-600/10 rounded-3xl flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(79,70,229,0.3)] animate-in zoom-in duration-700">
                <Layers className="w-10 h-10" />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-neutral-500">
                Trayo
            </h1>
            <p className="text-2xl text-indigo-400 font-medium mb-4">Instant access. Zero clutter.</p>
            <p className="text-lg text-neutral-400 max-w-2xl leading-relaxed mb-10">
                The lightweight macOS menu bar app that keeps your workflow flowing. 
                Open files, preview folders, and navigate your system without ever leaving your active window.
            </p>

            <div className="flex gap-4">
                 <button 
                    onClick={handleDownload} 
                    className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 transform duration-200 flex items-center shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                 >
                    <AppleLogo className="w-5 h-5 mr-2" />
                    Download for Mac
                 </button>
            </div>
            <p className="mt-4 text-xs text-neutral-600 font-mono uppercase tracking-widest">
                 macOS 14+ • Apple Silicon Native
             </p>
       </div>

       {/* Visual Showcase */}
       <div className="max-w-6xl mx-auto px-4 mb-32">
           <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-1000"></div>
                <div className="relative bg-black rounded-3xl border border-neutral-800 shadow-2xl overflow-hidden aspect-video flex items-center justify-center">
                    <AnimatedTrayo />
                </div>
           </div>
       </div>

       {/* Feature Grid (Overview Information) */}
       <div className="bg-neutral-900/30 border-t border-neutral-800 py-24">
           <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[
                   { title: "Menu Bar Native", desc: "Lives quietly in your menu bar. Always one click away, never in your way." },
                   { title: "Instant Preview", desc: "Hover to peek into folders. Find the right file without opening Finder." },
                   { title: "Privacy First", desc: "No cloud syncing, no data collection. Your files stay on your Mac." },
                   { title: "Keyboard Centric", desc: "Navigate your entire file system using smart shortcuts." },
                   { title: "Distraction Free", desc: "Minimal UI designed to keep you focused on your work." },
                   { title: "Blazing Fast", desc: "Written in native code for zero latency performance." }
               ].map((feat, i) => (
                   <div key={i} className="p-6 rounded-2xl bg-black border border-neutral-800 hover:border-indigo-500/50 transition-colors group">
                       <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                            <Check className="w-5 h-5 text-indigo-500" />
                       </div>
                       <h3 className="text-xl font-bold text-white mb-2">{feat.title}</h3>
                       <p className="text-neutral-400 leading-relaxed">{feat.desc}</p>
                   </div>
               ))}
           </div>
       </div>
    </div>
  );
};

export default Trayo;