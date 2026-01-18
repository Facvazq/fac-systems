import React, { useState } from 'react';
import { Plane, Bell, Shield, Smartphone } from 'lucide-react';
import { AppleLogo } from '../components/Shared';

// Custom Graphic for FlightIO - Simulating an iOS Live Activity/App Interface
const FlightAppGraphic = () => (
  <div className="w-full h-full bg-neutral-900 rounded-3xl border border-neutral-800 relative overflow-hidden flex flex-col items-center justify-center p-8">
    {/* Background Map Effect */}
    <div className="absolute inset-0 opacity-20">
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-indigo-500 rounded-full blur-3xl"></div>
      {/* Grid lines for map feel */}
      <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    </div>

    {/* Phone / App Card */}
    <div className="relative z-10 w-full max-w-sm bg-black/60 backdrop-blur-xl border border-neutral-700/50 rounded-[2.5rem] shadow-2xl overflow-hidden p-6">
       {/* Dynamic Island Area */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-28 bg-black rounded-b-2xl"></div>

       {/* Flight Card Header */}
       <div className="mt-4 flex justify-between items-center mb-8">
          <div className="flex flex-col">
             <span className="text-3xl font-bold text-white">LHR</span>
             <span className="text-[10px] text-neutral-400 font-mono">LONDON</span>
          </div>
          
          <div className="flex-1 px-4 flex flex-col items-center relative">
             <div className="w-full h-0.5 bg-neutral-700 rounded-full relative">
                <div className="absolute top-1/2 left-2/3 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full border-2 border-black shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
             </div>
             <Plane className="w-4 h-4 text-white rotate-90 mt-[-9px]" />
             <span className="text-[10px] text-green-400 mt-2 font-bold bg-green-900/20 px-2 py-0.5 rounded-full">ON TIME</span>
          </div>

          <div className="flex flex-col items-end">
             <span className="text-3xl font-bold text-white">JFK</span>
             <span className="text-[10px] text-neutral-400 font-mono">NEW YORK</span>
          </div>
       </div>

       {/* Info Grid */}
       <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-neutral-800/50 p-3 rounded-2xl border border-neutral-700">
             <div className="text-[10px] text-neutral-400 uppercase tracking-wider mb-1">Boarding</div>
             <div className="text-lg font-bold text-white">14:20</div>
          </div>
          <div className="bg-neutral-800/50 p-3 rounded-2xl border border-neutral-700">
             <div className="text-[10px] text-neutral-400 uppercase tracking-wider mb-1">Gate</div>
             <div className="text-lg font-bold text-white">A12</div>
          </div>
       </div>

       {/* Aircraft Info */}
       <div className="flex items-center space-x-3 p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
             <Plane className="w-4 h-4 text-white" />
          </div>
          <div>
             <div className="text-xs font-bold text-white">British Airways</div>
             <div className="text-[10px] text-indigo-300">Boeing 777-300ER • BA 117</div>
          </div>
       </div>
    </div>
  </div>
);

const FlightIO = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-black text-white min-h-screen pt-20">
       {/* Sub-navbar */}
       <div className="sticky top-20 z-40 bg-neutral-900/80 backdrop-blur-md border-b border-neutral-800">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
               <span className="font-bold text-lg tracking-tight text-white flex items-center gap-2">
                  <Plane className="w-4 h-4 text-blue-500" /> FlightIO
               </span>
               <div className="flex space-x-6 text-xs font-medium items-center">
                   <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})} className="text-white hover:text-blue-400 transition-colors">Features</button>
                   <div className="bg-white/10 px-3 py-1 rounded-full text-neutral-300 flex items-center gap-1 cursor-default">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Coming Soon
                   </div>
               </div>
           </div>
       </div>

       {/* Hero Section */}
       <div className="max-w-7xl mx-auto px-4 py-24 flex flex-col items-center text-center relative z-10">
            {/* FlightIO Logo */}
            <div className="w-24 h-24 mb-8 shadow-[0_0_40px_rgba(59,130,246,0.3)] animate-in zoom-in duration-700 rounded-3xl overflow-hidden bg-neutral-900 flex items-center justify-center border border-neutral-800">
                {!imgError ? (
                    <img 
                        src="/logo101.png" 
                        alt="FlightIO App Icon" 
                        className="w-full h-full object-cover"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <Plane className="w-12 h-12 text-blue-500" />
                )}
            </div>

            <div className="inline-flex items-center space-x-2 bg-blue-900/20 border border-blue-800/30 rounded-full px-3 py-1 mb-6">
                <span className="text-xs font-bold text-blue-400">iOS Native</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                Flight<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">IO</span>
            </h1>
            
            <p className="text-xl text-neutral-400 leading-relaxed mb-8 max-w-xl mx-auto">
                FlightIO is a simple and powerful iOS app designed to help you keep track of your flights—without subscriptions or hidden fees.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    <AppleLogo className="w-5 h-5 mb-1" />
                    <div className="flex flex-col items-start leading-none">
                        <span className="text-[8px] font-medium uppercase tracking-wider">Coming soon to</span>
                        <span className="text-sm font-bold">App Store</span>
                    </div>
                </button>
            </div>
       </div>

       {/* Graphic Section */}
       <div className="max-w-6xl mx-auto px-4 mb-32 relative z-10">
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-1000"></div>
                <div className="relative bg-black rounded-3xl border border-neutral-800 shadow-2xl overflow-hidden aspect-video md:aspect-[21/9] flex items-center justify-center">
                    <FlightAppGraphic />
                </div>
            </div>
       </div>

       {/* Details Section */}
       <div className="bg-neutral-900/30 border-t border-neutral-800 py-32">
           <div className="max-w-7xl mx-auto px-4">
               <div className="text-center max-w-3xl mx-auto mb-20">
                   <h2 className="text-3xl font-bold mb-6">Built for the modern traveler</h2>
                   <p className="text-neutral-400 text-lg leading-relaxed">
                       Add your flights manually by entering your departure and arrival airports, airline, aircraft code, and key details, then let FlightIO keep everything organized in one place.
                   </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   {[
                       { 
                           icon: <Bell className="w-6 h-6 text-blue-400" />,
                           title: "Real-time Updates", 
                           desc: "Stay informed with instant alerts on delays, gate changes, and flight status."
                       },
                       { 
                           icon: <Shield className="w-6 h-6 text-green-400" />,
                           title: "100% Free", 
                           desc: "Inspired by apps like Flighty but built to be completely free. No subscriptions."
                       },
                       { 
                           icon: <Smartphone className="w-6 h-6 text-purple-400" />,
                           title: "Clear Interface", 
                           desc: "Giving travelers full control and visibility over their journeys, from takeoff to landing."
                       }
                   ].map((feat, i) => (
                       <div key={i} className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl hover:border-neutral-700 transition-colors group">
                           <div className="w-12 h-12 bg-neutral-800 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-neutral-800/80">
                               {feat.icon}
                           </div>
                           <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                           <p className="text-neutral-400 leading-relaxed">
                               {feat.desc}
                           </p>
                       </div>
                   ))}
               </div>
           </div>
       </div>
    </div>
  );
};

export default FlightIO;