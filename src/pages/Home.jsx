import React, { useEffect, useRef } from 'react';
import { 
  Globe as GlobeIcon, Check, Shield, Zap, BarChart3, 
  CreditCard, Server, Activity, ShoppingBag, Music, 
  Folder, Image, ChevronRight, Layers, Users 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RotatingGlobe = ({ width = 400, height = 400 }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let time = 0;
    const particles = [];
    const particleCount = 200;
    const radius = Math.min(width, height) / 2.5;

    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      particles.push({
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi)
      });
    }

    const animate = () => {
      time += 0.005;
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(width / 2, height / 2);
      particles.forEach(p => {
        const rotX = p.x * Math.cos(time) - p.z * Math.sin(time);
        const rotZ = p.x * Math.sin(time) + p.z * Math.cos(time);
        const scale = 250 / (250 - rotZ); 
        if (scale > 0) {
          ctx.beginPath();
          ctx.arc(rotX, p.y, 2 * scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, (rotZ + radius) / (2 * radius))})`;
          ctx.fill();
        }
      });
      ctx.restore();
      requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [width, height]);
  return <canvas ref={canvasRef} width={width} height={height} className="max-w-full" />;
};

const FEATURES = [
  { title: "Global Reach", desc: "Used by creators in 35+ countries.", icon: <GlobeIcon className="w-6 h-6 text-white" />, colSpan: "md:col-span-8", bg: "bg-neutral-900 border-neutral-800" },
  { title: "Consumer First", desc: "Interfaces designed for humans.", icon: <Users className="w-6 h-6 text-white" />, colSpan: "md:col-span-4", bg: "bg-neutral-800 border-neutral-700" },
  { title: "Real-time Sync", desc: "Data available instantly.", icon: <Activity className="w-6 h-6 text-white" />, colSpan: "md:col-span-4", bg: "bg-indigo-900/20 border-indigo-500/30" },
  { title: "Trayo", desc: "The minimal file manager.", icon: <Layers className="w-6 h-6 text-white" />, colSpan: "md:col-span-8", bg: "bg-gradient-to-r from-blue-900 to-indigo-900 border-indigo-700", isTrayo: true }
];

const Home = ({ openContact }) => {
  const navigate = useNavigate();

  return (
    <div className="pt-20 bg-black min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 right-1/4 -mt-20 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 relative z-10 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-center md:text-left mb-12 md:mb-0">
            <div className="inline-flex items-center space-x-2 bg-neutral-900/80 border border-neutral-800 backdrop-blur rounded-full p-1.5 pl-3 pr-4 mb-8">
              <span className="bg-pink-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">New</span>
              <span className="text-neutral-300 text-xs font-medium">Trayo for Mac is available</span>
              <ChevronRight className="w-3 h-3 text-neutral-500" />
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-7xl font-bold tracking-tighter text-white mb-8">
              The Software that <br className="hidden md:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-400 to-white">Works with you.</span>
            </h1>
            <p className="max-w-2xl text-xl text-neutral-400 mb-12 leading-relaxed">
              Powerful tools for everyone. From personal productivity to enterprise management, Fac Systems builds software that adapts to your life and work.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <button onClick={() => navigate('/trayo')} className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold text-lg rounded-full hover:bg-neutral-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:scale-105">
                Explore Trayo
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center relative h-[400px] md:h-[500px]">
             <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>
             <RotatingGlobe width={500} height={500} />
          </div>
        </div>
      </div>

      {/* Dashboard Preview */}
      <div className="bg-black py-24 border-t border-neutral-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Designed for You. Built for Business.</h2>
            <p className="text-xl text-neutral-400">Fac Systems unifies your digital life.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Enterprise Card */}
              <div className="rounded-3xl bg-neutral-900 border border-neutral-800 p-2 shadow-2xl ring-1 ring-white/5 hover:border-indigo-500/50 transition-all">
                  <div className="bg-black rounded-2xl overflow-hidden h-full flex flex-col p-6">
                      <div className="border-b border-neutral-800 pb-4 mb-4 flex justify-between"><span className="text-xs font-bold text-indigo-400 uppercase">Enterprise Mode</span></div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                           <div className="bg-neutral-800/50 p-4 rounded-xl border border-neutral-700"><CreditCard className="w-6 h-6 text-indigo-500 mb-2"/><div className="text-2xl font-bold text-white">$84k</div><div className="text-xs text-neutral-500">Revenue</div></div>
                           <div className="bg-neutral-800/50 p-4 rounded-xl border border-neutral-700"><Activity className="w-6 h-6 text-emerald-500 mb-2"/><div className="text-2xl font-bold text-white">99.9%</div><div className="text-xs text-neutral-500">Uptime</div></div>
                      </div>
                  </div>
              </div>
              {/* Consumer Card */}
              <div className="rounded-3xl bg-neutral-900 border border-neutral-800 p-2 shadow-2xl ring-1 ring-white/5 hover:border-pink-500/50 transition-all">
                  <div className="bg-black rounded-2xl overflow-hidden h-full flex flex-col p-6">
                      <div className="border-b border-neutral-800 pb-4 mb-4 flex justify-between"><span className="text-xs font-bold text-pink-400 uppercase">Personal Mode</span></div>
                      <div className="bg-neutral-800/50 p-4 rounded-xl border border-neutral-700 mb-4 flex items-center space-x-4">
                          <Music className="w-10 h-10 text-pink-500 bg-pink-500/20 p-2 rounded-lg" />
                          <div><div className="text-white font-bold">Design Flow</div><div className="text-xs text-neutral-500">2m ago</div></div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-neutral-800/30 rounded-lg">
                           <div className="flex items-center space-x-3"><Folder className="w-4 h-4 text-blue-400"/><span className="text-sm text-white">Assets</span></div>
                           <span className="text-xs text-neutral-500">12 items</span>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-black py-32 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {FEATURES.map((feature, idx) => (
              <div key={idx} className={`${feature.colSpan} ${feature.bg} border rounded-3xl p-8 relative overflow-hidden group hover:border-neutral-600 transition-all`}>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-neutral-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;