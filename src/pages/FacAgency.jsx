import React from 'react';
import {
    Check, Calendar, Share2, Smartphone,
    User, Star, ArrowRight, Layout, Play, CreditCard, Mail
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatPriceFromUsd } from '../utils/currency';

// --- Local Graphics (Self-contained) ---

const WebsiteMockGraphic = () => (
    <div className="relative w-full h-full bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden flex flex-col items-center justify-center p-8">
        {/* Phone Frame */}
        <div className="relative w-64 h-[400px] bg-black rounded-[2.5rem] border-[6px] border-neutral-800 shadow-2xl overflow-hidden flex flex-col">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-neutral-800 rounded-b-xl z-20"></div>

            {/* Screen Content */}
            <div className="flex-1 bg-neutral-900 flex flex-col pt-10 px-4 pb-4">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 bg-indigo-500 rounded-full mb-3 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20">
                        S
                    </div>
                    <h3 className="text-white font-bold text-lg">Sarah Fitness</h3>
                    <p className="text-neutral-400 text-xs">Personal Trainer & Nutritionist</p>
                    <div className="flex items-center mt-2 space-x-1">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />)}
                        <span className="text-[10px] text-neutral-500 ml-1">(48)</span>
                    </div>
                </div>

                <div className="space-y-2 w-full">
                    <div className="bg-neutral-800 p-3 rounded-xl flex items-center justify-between group hover:bg-indigo-600/20 transition-colors cursor-pointer">
                        <div className="flex items-center space-x-3">
                            <div className="bg-indigo-500/20 p-2 rounded-lg text-indigo-400"><User className="w-4 h-4" /></div>
                            <div className="text-left">
                                <div className="text-white text-xs font-bold">1:1 Training</div>
                                <div className="text-neutral-500 text-[10px]">1 Hour • $80</div>
                            </div>
                        </div>
                        <ArrowRight className="w-3 h-3 text-neutral-600" />
                    </div>
                    <div className="bg-neutral-800 p-3 rounded-xl flex items-center justify-between group hover:bg-indigo-600/20 transition-colors cursor-pointer">
                        <div className="flex items-center space-x-3">
                            <div className="bg-purple-500/20 p-2 rounded-lg text-purple-400"><Layout className="w-4 h-4" /></div>
                            <div className="text-left">
                                <div className="text-white text-xs font-bold">Consultation</div>
                                <div className="text-neutral-500 text-[10px]">30 Min • Free</div>
                            </div>
                        </div>
                        <ArrowRight className="w-3 h-3 text-neutral-600" />
                    </div>
                </div>

                <div className="mt-auto bg-indigo-600 text-white text-center py-3 rounded-xl font-bold text-xs shadow-lg shadow-indigo-500/20">
                    Book Appointment
                </div>
            </div>
        </div>
    </div>
);

const CalendarGraphic = () => (
    <div className="w-full h-full bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden relative flex items-center justify-center p-6">
        <div className="w-full max-w-sm bg-black border border-neutral-700 rounded-2xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
                <span className="text-white font-bold">Select Date</span>
                <span className="text-neutral-500 text-xs">January 2026</span>
            </div>
            <div className="grid grid-cols-7 gap-2 mb-6 text-center text-xs text-neutral-400">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={i}>{d}</div>)}
                {/* Mock dates */}
                {[...Array(31)].map((_, i) => (
                    <div key={i} className={`p-1.5 rounded-lg ${i === 14 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/50' : i === 15 || i === 16 ? 'text-neutral-600 cursor-not-allowed' : 'hover:bg-neutral-800 text-white cursor-pointer'}`}>
                        {i + 1}
                    </div>
                ))}
            </div>
            <div className="space-y-2">
                <div className="text-xs text-neutral-500 font-bold uppercase tracking-wider mb-2">Available Slots</div>
                <div className="flex gap-2 overflow-hidden">
                    <div className="bg-neutral-800 text-white px-4 py-2 rounded-lg text-xs border border-neutral-700 hover:border-indigo-500 cursor-pointer">09:00 AM</div>
                    <div className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs shadow-lg shadow-indigo-500/20">10:00 AM</div>
                    <div className="bg-neutral-800 text-white px-4 py-2 rounded-lg text-xs border border-neutral-700 hover:border-indigo-500 cursor-pointer">02:30 PM</div>
                </div>
            </div>
        </div>
    </div>
);

const SharingGraphic = () => (
    <div className="w-full h-full bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden relative flex flex-col items-center justify-center p-8">
        {/* Abstract "Link" visualization */}
        <div className="relative z-10 w-full max-w-xs">
            {/* Chat Bubble 1 */}
            <div className="bg-neutral-800 rounded-2xl rounded-tl-sm p-4 mb-4 border border-neutral-700 max-w-[80%] animate-in slide-in-from-left duration-700">
                <p className="text-neutral-400 text-xs mb-1">Send to Client</p>
                <div className="flex items-center space-x-2 bg-black rounded-lg p-2 border border-neutral-700">
                    <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">S</div>
                    <span className="text-indigo-300 text-xs truncate">fac.agency/sarah-fitness</span>
                </div>
            </div>

            {/* Chat Bubble 2 (Reply) */}
            <div className="bg-indigo-600 rounded-2xl rounded-tr-sm p-4 ml-auto max-w-[80%] text-white shadow-xl shadow-indigo-500/10 animate-in slide-in-from-right duration-700 delay-200">
                <p className="text-sm">Just booked my session for Tuesday! That was super easy.</p>
                <div className="flex items-center mt-2 justify-end space-x-1">
                    <span className="text-[10px] text-indigo-200">10:42 AM</span>
                    <Check className="w-3 h-3 text-indigo-200" />
                </div>
            </div>
        </div>

        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-500/20 blur-[60px] rounded-full"></div>
    </div>
);

// --- Main Component ---

const FacAgency = ({ openContact, countryCode }) => {
    const navigate = useNavigate();
    const agencyPrice = formatPriceFromUsd(10, countryCode);

    const handleDemo = () => {
        navigate('/livedemo');
    };

    return (
        <div className="bg-black text-white min-h-screen pt-20">

            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 py-24 flex flex-col items-center text-center relative z-10">
                    <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1 mb-8">
                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
                        <span className="text-xs font-bold text-indigo-300 uppercase tracking-wide">Agency Coming Soon</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter leading-tight">
                        We build your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                            digital presence.
                        </span>
                    </h1>

                    <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed mb-10">
                        FAC Agency is a marketing and web services agency specialized in service-based professionals.
                        We design high-converting websites that make it easy for your clients to discover, trust, and book instantly.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleDemo}
                            className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center justify-center"
                        >
                            <Play className="w-4 h-4 mr-2 fill-current" />
                            Try our live Demo today
                        </button>
                        <button
                            onClick={openContact}
                            className="px-8 py-4 bg-neutral-900 border border-neutral-700 text-white font-bold rounded-full hover:bg-neutral-800 transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
                        >
                            <Mail className="w-4 h-4 mr-2" />
                            Contact Sales
                        </button>
                    </div>
                    <div className="mt-4 text-xs uppercase tracking-widest text-neutral-500">
                        Starting at {agencyPrice}/month
                    </div>

                    <div className="mt-12 flex flex-wrap justify-center gap-4 text-xs text-neutral-500 font-mono uppercase tracking-widest">
                        <span>Personal Trainers</span> • <span>Consultants</span> • <span>Barbers</span> • <span>Coaches</span>
                    </div>
                </div>
            </div>

            {/* Feature 1: Custom Websites */}
            <div className="bg-neutral-900/30 border-y border-neutral-900 py-32">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
                    <div className="w-full md:w-1/2">
                        <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6">
                            <Layout className="w-6 h-6 text-indigo-400" />
                        </div>
                        <h2 className="text-4xl font-bold mb-6">Custom Service Websites</h2>
                        <p className="text-lg text-neutral-400 leading-relaxed mb-6">
                            We create clean, modern, and mobile-friendly websites designed specifically for services.
                            Every site is tailored to your brand and your clients.
                        </p>
                        <ul className="space-y-3">
                            {["Mobile-first design", "Brand customization", "High-performance loading"].map((item, i) => (
                                <li key={i} className="flex items-center text-neutral-300">
                                    <Check className="w-4 h-4 text-indigo-500 mr-3" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-full md:w-1/2">
                        <WebsiteMockGraphic />
                    </div>
                </div>
            </div>

            {/* Feature 2: Booking System */}
            <div className="py-32">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row-reverse items-center gap-16">
                    <div className="w-full md:w-1/2">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
                            <Calendar className="w-6 h-6 text-purple-400" />
                        </div>
                        <h2 className="text-4xl font-bold mb-6">Online Booking & Calendar</h2>
                        <p className="text-lg text-neutral-400 leading-relaxed mb-6">
                            Your website includes an integrated booking system with a calendar, so clients can schedule appointments 24/7 without the back-and-forth messages.
                        </p>
                        <ul className="space-y-3">
                            {["Automated confirmations", "Sync with Google/Apple Calendar", "24/7 Availability"].map((item, i) => (
                                <li key={i} className="flex items-center text-neutral-300">
                                    <Check className="w-4 h-4 text-purple-500 mr-3" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-full md:w-1/2">
                        <CalendarGraphic />
                    </div>
                </div>
            </div>

            {/* Feature 3: Simple Sharing */}
            <div className="bg-neutral-900/30 border-y border-neutral-900 py-32">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
                    <div className="w-full md:w-1/2">
                        <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center mb-6">
                            <Share2 className="w-6 h-6 text-pink-400" />
                        </div>
                        <h2 className="text-4xl font-bold mb-6">Simple Sharing</h2>
                        <p className="text-lg text-neutral-400 leading-relaxed mb-6">
                            One link. That’s it. Share your website on WhatsApp, Instagram, Google, or anywhere — and start receiving bookings instantly.
                        </p>
                        <ul className="space-y-3">
                            {["Social media ready", "Short, professional links", "No app download required"].map((item, i) => (
                                <li key={i} className="flex items-center text-neutral-300">
                                    <Check className="w-4 h-4 text-pink-500 mr-3" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-full md:w-1/2">
                        <SharingGraphic />
                    </div>
                </div>
            </div>

            {/* CTA Footer */}
            <div className="py-24 text-center px-4">
                <h2 className="text-3xl font-bold mb-8">Ready to modernize your service business?</h2>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={handleDemo}
                        className="px-10 py-5 bg-white text-black font-bold text-lg rounded-full hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 shadow-2xl"
                    >
                        Get Started
                    </button>
                </div>
            </div>

        </div>
    );
};

export default FacAgency;
