import React from 'react';
import { Check, Star, Zap, Layout, Palette, Moon } from 'lucide-react';
import { formatPriceFromUsd } from '../utils/currency';

const AgencyPlans = ({ openContact, countryCode }) => {
  const agencyPrice = formatPriceFromUsd(10, countryCode);
  return (
    <div className="bg-black text-white min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
           <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1 mb-6">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">Fac Agency</span>
           </div>
           <h1 className="text-5xl font-bold mb-6 tracking-tight">Simple, transparent pricing</h1>
           <p className="text-xl text-neutral-400">
             Start for free, upgrade for power.
           </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Free Plan */}
            <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 flex flex-col relative group hover:border-neutral-700 transition-all">
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">Starter</h3>
                    <div className="text-4xl font-bold text-white">Free<span className="text-sm font-normal text-neutral-500 ml-2">/forever</span></div>
                    <p className="text-sm text-neutral-500 mt-4">Perfect for getting started.</p>
                </div>
                
                <div className="w-full h-px bg-neutral-800 mb-8"></div>

                <ul className="space-y-4 mb-8 flex-1">
                    <li className="flex items-center text-neutral-300 text-sm">
                        <Check className="w-5 h-5 text-neutral-500 mr-3 shrink-0" /> Standard Web Profile
                    </li>
                    <li className="flex items-center text-neutral-300 text-sm">
                        <Check className="w-5 h-5 text-neutral-500 mr-3 shrink-0" /> Basic Booking System
                    </li>
                    <li className="flex items-center text-neutral-300 text-sm">
                        <Check className="w-5 h-5 text-neutral-500 mr-3 shrink-0" /> Fac Branding
                    </li>
                    <li className="flex items-center text-neutral-300 text-sm">
                        <Check className="w-5 h-5 text-neutral-500 mr-3 shrink-0" /> Standard Support
                    </li>
                </ul>

                <button 
                    onClick={openContact}
                    className="w-full py-4 rounded-xl border border-neutral-700 hover:bg-neutral-800 transition-colors font-bold text-sm"
                >
                    Get Started
                </button>
            </div>

            {/* Fac Agency One */}
            <div className="p-1 rounded-3xl bg-gradient-to-b from-indigo-500 to-purple-600 relative shadow-2xl shadow-indigo-900/20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-indigo-400">
                    Recommended
                </div>
                <div className="bg-black rounded-[1.3rem] p-7 h-full flex flex-col">
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">Fac Agency One</h3>
                        <div className="text-4xl font-bold text-white">{agencyPrice}<span className="text-sm font-normal text-neutral-500 ml-2">/month</span></div>
                        <p className="text-sm text-neutral-400 mt-4">For professionals who need more.</p>
                    </div>

                    <div className="w-full h-px bg-neutral-800 mb-8"></div>

                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-center text-white text-sm font-medium">
                            <div className="bg-indigo-500/20 p-1 rounded mr-3 text-indigo-400"><Zap className="w-3 h-3" /></div>
                            Unlimited Services
                        </li>
                        <li className="flex items-center text-white text-sm font-medium">
                            <div className="bg-purple-500/20 p-1 rounded mr-3 text-purple-400"><Moon className="w-3 h-3" /></div>
                            Dark Mode for your Page
                        </li>
                        <li className="flex items-center text-white text-sm font-medium">
                            <div className="bg-pink-500/20 p-1 rounded mr-3 text-pink-400"><Palette className="w-3 h-3" /></div>
                            Further Profile Customization
                        </li>
                         <li className="flex items-center text-white text-sm font-medium">
                            <div className="bg-blue-500/20 p-1 rounded mr-3 text-blue-400"><Star className="w-3 h-3" /></div>
                            Priority Support
                        </li>
                    </ul>

                    <button 
                        onClick={openContact}
                        className="w-full py-4 rounded-xl bg-white text-black hover:bg-neutral-200 transition-colors font-bold text-sm flex items-center justify-center"
                    >
                        Contact Sales
                    </button>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default AgencyPlans;
