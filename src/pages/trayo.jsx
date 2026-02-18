import React, { useState } from 'react';
import { Layers, Check, Search, Folder, FileText, Zap, MoreHorizontal, Command } from 'lucide-react';
import { AppleLogo } from '../components/Shared';

// --- Local Components (Self-contained to prevent layout/import bugs) ---

const AnimatedTrayo = () => (
    <div className="w-full h-full bg-neutral-900 rounded-xl p-6 flex flex-col items-center justify-center border border-neutral-800 relative overflow-hidden">
        {/* Menu Bar Mock */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3/4 max-w-sm h-8 bg-neutral-800/80 rounded-lg flex items-center justify-end px-3 space-x-3 border border-neutral-700 backdrop-blur-sm z-10">
            <div className="text-white text-[10px]">9:41 AM</div>
            <Search className="w-3 h-3 text-white" />
            <div className="w-4 h-4 bg-indigo-500 rounded-sm flex items-center justify-center animate-pulse">
                <Layers className="w-3 h-3 text-white" />
            </div>
        </div>

        {/* Dropdown Mock */}
        <div className="mt-16 w-64 bg-neutral-800/90 backdrop-blur-md rounded-xl border border-neutral-700 shadow-2xl p-2 animate-in slide-in-from-top-4 duration-700 z-0">
            <div className="px-3 py-2 border-b border-neutral-700 flex justify-between items-center">
                <span className="text-xs font-bold text-white">Trayo</span>
                <span className="text-[10px] text-neutral-400">⌘ + ⇧ + Space</span>
            </div>
            <div className="p-1 space-y-1 mt-1">
                {[
                    { name: 'Downloads', time: '2m ago', color: 'text-blue-400' },
                    { name: 'Documents', time: '1h ago', color: 'text-purple-400' }
                ].map((item, i) => (
                    <div key={i} className="flex items-center p-2 hover:bg-indigo-600/20 rounded cursor-pointer group">
                        <Folder className={`w-4 h-4 ${item.color} mr-3`} />
                        <div>
                            <div className="text-xs text-white group-hover:text-indigo-200">{item.name}</div>
                            <div className="text-[10px] text-neutral-500">{item.time}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const TrayoFeatureGraphic = () => (
    <div className="w-full h-full bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 to-transparent pointer-events-none"></div>
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

// --- Main Page Component ---

const Trayo = ({ openContact }) => {
    const [imgError, setImgError] = useState(false);

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
        openContact();
    };

    return (
        <div className="bg-black text-white min-h-screen pt-20">
            {/* Sub-navbar for Trayo Product */}
            <div className="sticky top-20 z-30 bg-neutral-900/80 backdrop-blur-md border-b border-neutral-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
                    <span className="font-bold text-lg tracking-tight text-white">Trayo</span>
                    <div className="flex space-x-6 text-xs font-medium">
                        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-white hover:text-indigo-400 transition-colors">Overview</button>
                        <button onClick={handleSupport} className="text-neutral-400 hover:text-white transition-colors">Support</button>
                        <button onClick={handleDownload} className="bg-white text-black px-3 py-1 rounded-full hover:bg-neutral-200 transition-colors font-bold">Download</button>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 py-24 flex flex-col items-center text-center relative z-10">
                {/* Trayo Icon */}
                <div className="w-24 h-24 mb-8 shadow-[0_0_40px_rgba(79,70,229,0.3)] animate-in zoom-in duration-700 rounded-3xl overflow-hidden bg-neutral-900 flex items-center justify-center border border-neutral-800">
                    {!imgError ? (
                        <img
                            src="/trayoicon.png"
                            alt="Trayo"
                            className="w-full h-full object-cover"
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <Layers className="w-12 h-12 text-indigo-500" />
                    )}
                </div>

                <h1 className="text-6xl md:text-8xl font-bold mb-6 pb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-neutral-500">
                    Trayo
                </h1>
                <p className="text-2xl text-indigo-400 font-medium mb-4">Instant access. Zero clutter.</p>
                <p className="text-lg text-neutral-400 max-w-2xl leading-relaxed mb-10">
                    The lightweight macOS menu bar app that keeps your workflow flowing.
                    Open files, preview folders, and navigate your system without ever leaving your active window.
                </p>

                <div className="flex gap-4 mb-8">
                    <button
                        onClick={handleDownload}
                        className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 transform duration-200 flex items-center shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    >
                        <AppleLogo className="w-5 h-5 mr-2" />
                        Download for Mac
                    </button>
                </div>

                <div className="flex flex-col items-center gap-3">
                    <p className="text-xs text-neutral-400 font-medium">
                        Latest update 1.0.2 • Updated Jan 17 2026
                    </p>
                    <p className="text-xs text-neutral-600 font-mono uppercase tracking-widest">
                        macOS 14+ • Apple Silicon Native
                    </p>
                </div>
            </div>

            {/* Visual Showcase */}
            <div className="max-w-6xl mx-auto px-4 mb-32 relative z-10">
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-1000"></div>
                    <div className="relative bg-black rounded-3xl border border-neutral-800 shadow-2xl overflow-hidden aspect-video flex items-center justify-center">
                        <AnimatedTrayo />
                    </div>
                </div>
            </div>

            {/* Feature Grid */}
            <div className="bg-neutral-900/30 border-t border-neutral-800 py-24 relative z-10">
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

                    {/* Feature Graphic Card */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 p-1 rounded-2xl bg-gradient-to-r from-neutral-800 to-black border border-neutral-800">
                        <div className="h-64 rounded-xl overflow-hidden bg-black">
                            <TrayoFeatureGraphic />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Trayo;