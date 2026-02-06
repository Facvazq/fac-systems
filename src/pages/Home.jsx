import React from 'react';
import {
  Activity, Layers,
  ChevronRight, Plane,
  Shield, Code, ArrowRight, TrendingUp, Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatPriceFromUsd } from '../utils/currency';
import { BackgroundPaths } from '../components/ui/background-paths';
import { GlowingEffect } from '../components/ui/glowing-effect';
import { InteractiveHoverButton } from '../components/ui/interactive-hover-button';
import { RainbowButton } from '../components/ui/rainbow-button';
import { GradientButton } from '../components/ui/gradient-button';
import { AnimatedText } from '../components/ui/animated-shiny-text';
import GlobeFeatureSection from '../components/ui/globe-feature-section';
import { TestimonialsColumn } from '../components/ui/testimonials-columns';
import { motion } from 'framer-motion';

// --- Components ---

const GlassCard = ({ children, className = "", hoverEffect = true }) => (
  <div className={`
    relative overflow-hidden rounded-3xl 
    bg-neutral-900/40 backdrop-blur-xl border border-white/10 shadow-lg
    ${hoverEffect ? 'hover:shadow-xl hover:-translate-y-1 hover:bg-neutral-800/50 transition-all duration-300' : ''}
    ${className}
  `}>
    {children}
  </div>
);

const Badge = ({ children, color = "bg-neutral-800 text-white" }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
    {children}
  </span>
);

const testimonials = [
  {
    text: "This platform revolutionized our operations. The cloud-based tools keep us productive, even remotely.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Briana Patton",
    role: "Operations Manager",
  },
  {
    text: "Implementing this was smooth and quick. The customizable interface made team training effortless.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Bilal Ahmed",
    role: "IT Manager",
  },
  {
    text: "The support team is exceptional, guiding us through setup and providing ongoing assistance.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Saman Malik",
    role: "Customer Support Lead",
  },
  {
    text: "Seamless integration enhanced our business operations. Highly recommend for its intuitive interface.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Omar Raza",
    role: "CEO",
  },
  {
    text: "Robust features and quick support have transformed our workflow, making us significantly more efficient.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Zainab Hussain",
    role: "Project Manager",
  },
  {
    text: "Smooth implementation exceeded expectations. It streamlined processes, improving overall performance.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Aliza Khan",
    role: "Business Analyst",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);

const Home = ({ openContact, countryCode }) => {
  const navigate = useNavigate();
  const agencyPrice = formatPriceFromUsd(10, countryCode);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/20 selection:text-white overflow-x-hidden relative">

      {/* Background Paths Animation */}
      <BackgroundPaths />

      {/* Hero Section: Split Layout */}
      <section className="relative px-6 pt-32 pb-20 lg:pt-48 lg:pb-32 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center z-10">

        {/* Left: Content & Form */}
        <div className="flex flex-col items-start space-y-8 animate-fade-up">
          <div className="inline-flex items-center space-x-2 bg-neutral-900/60 backdrop-blur-md border border-neutral-800 rounded-full py-1.5 px-4 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-cta animate-pulse bg-yellow-500"></span>
            <span className="text-sm font-medium text-neutral-400">v3.0 is now live</span>
          </div>

          <div className="text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            Software that <br />
            <AnimatedText
              text="feels effortless."
              textClassName="text-5xl lg:text-7xl font-bold p-0 text-left"
              className="justify-start py-0 block"
            />
          </div>

          <p className="text-xl text-neutral-400 max-w-lg leading-relaxed">
            Fac Systems builds premium digital infrastructure for creators and service professionals. Frictionless, beautiful, and secure.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md items-center">
            <RainbowButton onClick={() => navigate('/agency-plans')} className="h-12 w-48 text-base shadow-lg shadow-yellow-500/20">
              Start Building
            </RainbowButton>
            <button onClick={() => navigate('/trayo')} className="px-6 py-2 text-neutral-400 hover:text-white font-medium transition-colors">
              Explore Trayo
            </button>
          </div>
        </div>

        {/* Right: Visual / Dashboard Mockup */}
        <div className="relative animate-fade-up [animation-delay:200ms]">
          <div className="relative z-10">
            <GlassCard className="p-6 md:p-8 !bg-black/60 border-neutral-800">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-lg font-bold text-white">Live Dashboard</h3>
                  <p className="text-sm text-neutral-500">Real-time performance metrics</p>
                </div>
                <Activity className="w-5 h-5 text-yellow-500" />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-neutral-900/50 p-4 rounded-2xl border border-neutral-800">
                  <div className="text-neutral-500 text-xs font-semibold uppercase mb-1">Revenue</div>
                  <div className="text-2xl font-bold text-white">$124.5k</div>
                  <div className="text-green-500 text-xs flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" /> +12.5%
                  </div>
                </div>
                <div className="bg-neutral-900/50 p-4 rounded-2xl border border-neutral-800">
                  <div className="text-neutral-500 text-xs font-semibold uppercase mb-1">Active Users</div>
                  <div className="text-2xl font-bold text-white">8,402</div>
                  <div className="text-neutral-400 text-xs flex items-center mt-1">
                    <Users className="w-3 h-3 mr-1" /> Just now
                  </div>
                </div>
              </div>

              {/* Chart Mockup */}
              <div className="h-32 flex items-end gap-2 justify-between px-2 opacity-80">
                {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                  <div key={i} className="w-full bg-neutral-800 rounded-t-sm hover:bg-yellow-500 transition-colors duration-300 relative group" style={{ height: `${h}%` }}>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="px-6 py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <Badge>Ecosystem</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-6 mb-4">Everything in its place.</h2>
            <p className="text-neutral-400">
              A suite of tools designed to work together or stand alone. Choose what fits your workflow.
            </p>
          </div>

          <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">

            {/* Large Featured Card: Fac Agency */}
            <li className="list-none md:col-span-6 md:row-span-2 xl:col-span-4 xl:row-span-2 min-h-[14rem]">
              <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-neutral-800 p-2 md:rounded-[1.5rem] md:p-3">
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-neutral-900/50 border-neutral-800 p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6 group cursor-pointer" onClick={() => navigate('/agency-plans')}>
                  <div className="relative flex flex-1 flex-col justify-between gap-3">
                    <div className="space-y-3">
                      <div className="bg-rose-500/10 text-rose-500 w-fit p-2 rounded-lg"><Code className="w-6 h-6" /></div>
                      <h3 className="pt-0.5 text-xl font-semibold text-white md:text-3xl">Fac Agency</h3>
                      <h2 className="text-neutral-400">Premium web development. From {agencyPrice}/mo.</h2>
                    </div>
                    <div className="mt-4 flex items-center text-rose-400 font-medium group-hover:translate-x-1 transition-transform">
                      See Plans <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              </div>
            </li>

            {/* Medium Card: Trayo */}
            <li className="list-none md:col-span-6 md:row-span-1 xl:col-span-4 xl:row-span-1 min-h-[14rem]">
              <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-neutral-800 p-2 md:rounded-[1.5rem] md:p-3">
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-neutral-900/50 border-neutral-800 p-6 shadow-sm group cursor-pointer" onClick={() => navigate('/trayo')}>
                  <div className="relative flex flex-1 flex-col justify-between gap-3">
                    <div className="bg-indigo-500/10 text-indigo-500 w-fit p-2 rounded-lg"><Layers className="w-5 h-5" /></div>
                    <h3 className="text-xl font-semibold text-white">Trayo</h3>
                    <p className="text-neutral-400 text-sm">Minimal macOS file manager.</p>
                  </div>
                  <img src="/trayoicon.png" className="w-12 h-12 rounded-lg absolute bottom-4 right-4" alt="Trayo" />
                </div>
              </div>
            </li>

            {/* Medium Card: FlightIO */}
            <li className="list-none md:col-span-6 md:row-span-1 xl:col-span-4 xl:row-span-1 min-h-[14rem]">
              <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-neutral-800 p-2 md:rounded-[1.5rem] md:p-3">
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-neutral-900/50 border-neutral-800 p-6 shadow-sm">
                  <div className="absolute top-4 right-4"><span className="text-[10px] bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded border border-yellow-500/20 uppercase font-bold">Soon</span></div>
                  <div className="relative flex flex-1 flex-col justify-between gap-3">
                    <div className="bg-sky-500/10 text-sky-500 w-fit p-2 rounded-lg"><Plane className="w-5 h-5" /></div>
                    <h3 className="text-xl font-semibold text-white">FlightIO</h3>
                    <p className="text-neutral-400 text-sm">Real-time flight tracking.</p>
                  </div>
                </div>
              </div>
            </li>

            {/* Wide Card: Stats */}
            <li className="list-none md:col-span-12 md:row-span-1 xl:col-span-8 xl:row-span-1 min-h-[14rem]">
              <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-neutral-800 p-2 md:rounded-[1.5rem] md:p-3">
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
                <div className="relative flex h-full flex-row items-center justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-neutral-900/50 border-neutral-800 p-8 shadow-sm">
                  <div className="flex gap-12">
                    <div>
                      <div className="text-4xl font-bold text-white font-mono">35+</div>
                      <div className="text-xs uppercase tracking-widest text-neutral-500 mt-1">Countries</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-white font-mono">99.9%</div>
                      <div className="text-xs uppercase tracking-widest text-neutral-500 mt-1">Uptime</div>
                    </div>
                  </div>
                  <Shield className="w-16 h-16 text-neutral-800" />
                </div>
              </div>
            </li>

          </ul>
        </div>
      </section>

      {/* Globe Feature Section */}
      <GlobeFeatureSection />

      {/* Testimonials Section */}
      <section className="py-32 relative z-10 w-full overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <Badge>Community</Badge>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-6 mb-4">What our users say</h2>
            <p className="text-neutral-400">See what our customers have to say about us.</p>
          </motion.div>

          <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[600px] overflow-hidden">
            <TestimonialsColumn testimonials={firstColumn} duration={25} />
            <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={30} />
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-20 text-center relative z-10">
        <h2 className="text-3xl font-bold text-white mb-6">Ready to upgrade your workflow?</h2>
        <div className="flex justify-center gap-4">
          <GradientButton onClick={() => navigate('/agency')}>
            Get Started
          </GradientButton>
        </div>
      </section>

    </div>
  );
};

export default Home;
