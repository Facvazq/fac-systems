import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Footer, ContactModal } from './components/Shared';
import Home from './pages/Home';
import Trayo from './pages/trayo';

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
          {/* You can add an /agency route here later if needed */}
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