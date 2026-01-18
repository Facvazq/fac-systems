import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Footer, ContactModal } from './components/Shared';
import Home from './pages/Home';
import Trayo from './pages/trayo';
import FlightIO from './pages/FlightIO';
import CountrySelector from './pages/CountrySelector';

// Placeholder for Agency if not yet created in detail
const AgencyPlaceholder = () => (
    <div className="pt-32 text-center text-white min-h-screen bg-black">
        <h1 className="text-4xl font-bold">Agency Coming Soon</h1>
    </div>
);

const App = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <Router>
      <div className="font-sans antialiased text-white bg-black selection:bg-indigo-500/30 selection:text-white min-h-screen">
        {/* Navbar appears on all pages */}
        <Navbar openContact={() => setIsContactOpen(true)} />
        
        {/* Route Definitions */}
        <Routes>
          <Route path="/" element={<Home openContact={() => setIsContactOpen(true)} />} />
          <Route path="/trayo" element={<Trayo openContact={() => setIsContactOpen(true)} />} />
          <Route path="/flightio" element={<FlightIO />} />
          <Route path="/country" element={<CountrySelector setCountry={() => {}} />} />
          <Route path="/agency" element={<AgencyPlaceholder />} />
        </Routes>

        {/* Footer appears on all pages */}
        <Footer openContact={() => setIsContactOpen(true)} />
        
        {/* Global Contact Modal */}
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </div>
    </Router>
  );
};

export default App;