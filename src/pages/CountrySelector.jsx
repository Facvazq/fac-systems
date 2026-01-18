import React, { useState } from 'react';
import { ArrowRight, Search, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const REGIONS = {
  "North America": ['US', 'CA'],
  "South America": ['AR'],
  "Europe": ['GB', 'DE', 'FR', 'IT', 'ES', 'NL', 'SE', 'CH', 'PL', 'BE', 'AT', 'PT', 'GR', 'IE', 'NO', 'DK', 'FI', 'CZ', 'HU', 'RO', 'UA', 'HR', 'BG', 'SK', 'SI', 'LU', 'IS', 'EE', 'LV', 'LT', 'MT', 'CY', 'MC'],
  "Middle East & Africa": ['AE', 'EG', 'QA'],
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
  // Middle East
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦' },
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

const CountrySelector = ({ setCountry }) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredCountries = COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (country) => {
    setCountry(country);
    navigate('/');
  };

  const getCountry = (code) => COUNTRIES.find(c => c.code === code);

  return (
    <div className="min-h-screen bg-black pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto animate-in fade-in duration-700">
        <button onClick={() => navigate('/')} className="mb-8 flex items-center text-neutral-400 hover:text-white transition-colors group">
          <ArrowRight className="w-4 h-4 rotate-180 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </button>
        
        <h1 className="text-4xl font-bold text-white mb-4">Select Region</h1>
        <p className="text-neutral-400 mb-10 text-lg">Choose a country to view localized content and availability.</p>

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
                    <button key={c.code} onClick={() => handleSelect(c)} className="flex items-center p-4 bg-neutral-900/50 rounded-xl border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-800 transition-all text-left group">
                        <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">{c.flag}</span>
                        <span className="font-medium text-neutral-300 group-hover:text-white">{c.name}</span>
                    </button>
                ))}
            </div>
        ) : (
            <div className="space-y-16">
                {Object.entries(REGIONS).map(([region, codes]) => (
                    <div key={region}>
                        <h3 className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-6 border-b border-neutral-800 pb-2 flex items-center">
                            <Globe className="w-3 h-3 mr-2" />
                            {region}
                        </h3>
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

export default CountrySelector;