import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, Footer, ContactModal } from './components/Shared';
import Home from './pages/Home';
import Trayo from './pages/trayo';
import FlightIO from './pages/FlightIO';
import CountrySelector from './pages/CountrySelector';
import FacAgency from './pages/FacAgency';
import LiveDemoPage from './pages/livedemopage';

const Layout = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const location = useLocation();
  const isLiveDemo = location.pathname === '/livedemo';

  return (
    <div className="font-sans antialiased text-white bg-black selection:bg-indigo-500/30 selection:text-white min-h-screen flex flex-col">
      {/* Navbar appears on all pages except Live Demo */}
      {!isLiveDemo && <Navbar openContact={() => setIsContactOpen(true)} />}
      
      {/* Route Definitions - Wrapped in main for flex-grow */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home openContact={() => setIsContactOpen(true)} />} />
          <Route path="/trayo" element={<Trayo />} />
          <Route path="/flightio" element={<FlightIO />} />
          <Route path="/country" element={<CountrySelector setCountry={() => {}} />} />
          <Route path="/agency" element={<FacAgency openContact={() => setIsContactOpen(true)} />} />
          <Route path="/livedemo" element={<LiveDemoPage />} />
        </Routes>
      </main>

      {/* Footer appears on all pages */}
      <Footer openContact={() => setIsContactOpen(true)} />
      
      {/* Global Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;