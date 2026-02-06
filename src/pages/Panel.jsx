import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check,
  Calendar,
  ListChecks,
  Layout,
  Layers,
  Monitor,
  Star,
  Store,
  Touchpad,
  Zap
} from 'lucide-react';

// --- Local Graphics ---

const PanelMock = () => (
  <div className="w-full h-full bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden relative">
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-rose-900/10 pointer-events-none" />
    <div className="absolute top-6 left-6 text-[10px] uppercase tracking-widest text-neutral-400">Panel OS</div>
    <div className="absolute top-6 right-6 text-[10px] uppercase tracking-widest text-neutral-500">Always On</div>

    <div className="p-8 pt-16 grid grid-cols-2 gap-4">
      <div className="rounded-xl border border-neutral-800 bg-black/60 p-4">
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <span>Did I feed the dog?</span>
          <span className="text-emerald-400">Yes</span>
        </div>
        <div className="mt-3 text-3xl font-bold text-white">6:42 PM</div>
        <div className="mt-1 text-[10px] uppercase tracking-widest text-neutral-500">Dinner Time</div>
      </div>
      <div className="rounded-xl border border-neutral-800 bg-black/60 p-4">
        <div className="text-xs text-neutral-400 mb-3">Today</div>
        <div className="text-white text-sm font-semibold">Client Check-in</div>
        <div className="text-[10px] text-neutral-500 mt-1">3:30 PM • Studio</div>
        <div className="mt-3 text-[10px] text-indigo-400 uppercase tracking-widest">Calendar</div>
      </div>
      <div className="rounded-xl border border-neutral-800 bg-black/60 p-4 col-span-2">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-neutral-400">Checklist</span>
          <span className="text-[10px] text-neutral-500">2/4 done</span>
        </div>
        <div className="grid grid-cols-2 gap-3 text-[11px] text-neutral-300">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
            <span>Open shop</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
            <span>Inventory</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-700"></div>
            <span>Send invoices</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-700"></div>
            <span>Close out</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TemplateGrid = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
    {[
      { title: 'Daily Routine', desc: 'Morning checklist + focus timer' },
      { title: 'Mini Dashboard', desc: 'KPIs, sales, and alerts' },
      { title: 'Family Hub', desc: 'Calendar + reminders + chores' },
      { title: 'Studio Board', desc: 'Bookings + to-dos + notes' },
      { title: 'Feedback Wall', desc: 'Ratings and live comments' },
      { title: 'Custom Tool', desc: 'Built by the community' }
    ].map((item) => (
      <div key={item.title} className="p-4 rounded-xl border border-neutral-800 bg-black/60 hover:border-neutral-700 transition-colors">
        <div className="text-white font-semibold">{item.title}</div>
        <div className="text-xs text-neutral-500 mt-2">{item.desc}</div>
      </div>
    ))}
  </div>
);

// --- Main Page ---

const Panel = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-black text-white min-h-screen pt-20">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-indigo-600/15 rounded-full blur-[120px]" />
          <div className="absolute top-10 right-1/4 w-[520px] h-[520px] bg-rose-600/15 rounded-full blur-[140px]" />
          <div className="absolute -bottom-40 right-0 w-[520px] h-[520px] bg-amber-400/10 rounded-full blur-[160px]" />
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:22px_22px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-24 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-neutral-900/80 border border-neutral-800 backdrop-blur rounded-full p-1.5 pl-3 pr-4 mb-8">
              <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Panel</span>
              <span className="text-neutral-300 text-xs font-medium">The smart display that adapts to your life</span>
            </div>
            <h1 className="text-5xl md:text-7xl tracking-tight text-white mb-6 font-apple-bold">
              Panel
            </h1>
            <p className="text-xl text-neutral-300 font-medium mb-3">The smart display that adapts to your life.</p>
            <p className="text-lg text-neutral-400 max-w-2xl leading-relaxed mb-10">
              Panel is a simple, always-on touch display designed for your wall, desk, or counter. It’s not just a digital frame —
              it’s a platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => navigate('/panel-config')}
                className="w-full sm:w-auto px-8 py-4 border border-neutral-700 text-white font-bold text-base rounded-full hover:border-neutral-500 hover:bg-white/5 transition-all hover:scale-[1.02]"
              >
                See Templates
              </button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              <div className="text-left">
                <div className="text-2xl font-bold text-white">Always-on</div>
                <div className="text-xs uppercase tracking-widest text-neutral-500">Display</div>
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-white">Touch-first</div>
                <div className="text-xs uppercase tracking-widest text-neutral-500">Interaction</div>
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-white">No apps</div>
                <div className="text-xs uppercase tracking-widest text-neutral-500">No clutter</div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-rose-500/20 to-amber-500/20 rounded-3xl blur-2xl opacity-60" />
              <div className="relative aspect-[4/3] rounded-3xl border border-neutral-800 shadow-2xl overflow-hidden">
                <PanelMock />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* One Screen. Endless Uses */}
      <div className="bg-neutral-900/30 border-y border-neutral-900 py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <h2 className="text-4xl font-bold mb-4">One screen. Endless uses.</h2>
            <p className="text-neutral-400 leading-relaxed mb-6">
              Panel lets you choose what your screen does. Download interactive templates made by creators and developers worldwide.
              From home routines to business dashboards, Panel becomes whatever you need it to be.
            </p>
            <ul className="space-y-3 text-neutral-300">
              {[
                '“Did I feed the dog?”',
                'Calendars and reminders',
                'Checklists and daily routines',
                'Mini dashboards and monitors',
                'Customer feedback and ratings',
                'Custom tools designed by the community'
              ].map((item) => (
                <li key={item} className="flex items-center">
                  <Check className="w-4 h-4 text-indigo-500 mr-3" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <TemplateGrid />
          </div>
        </div>
      </div>

      {/* Built to stay simple */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: 'Always-on display', icon: Monitor },
            { title: 'Touch-first interaction', icon: Touchpad },
            { title: 'No distractions', icon: Zap },
            { title: 'No apps to manage', icon: Layers }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="p-8 rounded-3xl bg-black border border-neutral-800 hover:border-neutral-700 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-neutral-400">
                  Panel runs a custom system designed for one thing only: showing what matters.
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Marketplace */}
      <div className="bg-neutral-900/30 border-y border-neutral-900 py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1 mb-6">
              <Store className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wide">Marketplace</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">A marketplace, not just a product</h2>
            <p className="text-neutral-400 leading-relaxed mb-6">
              Panel includes access to a growing marketplace of templates. Creators, designers, and developers can build and share
              templates for everyone to use. At launch, publishing is free, and the platform is open to experimentation and creativity.
            </p>
            <div className="text-neutral-300 text-sm uppercase tracking-widest">Panel grows with its community.</div>
          </div>
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            {[
              { label: 'Creators', icon: Star },
              { label: 'Developers', icon: Layout },
              { label: 'Teams', icon: Calendar },
              { label: 'Shops', icon: ListChecks }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="p-6 rounded-2xl bg-black border border-neutral-800">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div className="text-white font-semibold">{item.label}</div>
                  <div className="text-xs text-neutral-500 mt-1">Build and share templates</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Affordable by design */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'No subscriptions at launch', desc: 'One-time device purchase. Free templates to get started.' },
            { title: 'Affordable hardware', desc: 'Built to be accessible for homes and businesses.' },
            { title: 'Open by design', desc: 'Creators can publish and iterate without gatekeeping.' }
          ].map((item) => (
            <div key={item.title} className="p-8 rounded-3xl bg-black border border-neutral-800 hover:border-neutral-700 transition-colors">
              <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-neutral-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Environments */}
      <div className="bg-neutral-900/30 border-y border-neutral-900 py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">For homes. For businesses. For everyone.</h2>
          <p className="text-neutral-400 max-w-3xl mx-auto mb-10">
            Panel fits naturally in homes, offices, studios, shops, restaurants, waiting rooms, and public spaces.
            If you can imagine information living on a screen, Panel can display it.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Homes & apartments', 'Offices & studios', 'Shops & restaurants', 'Waiting rooms'].map((item) => (
              <div key={item} className="p-4 rounded-xl border border-neutral-800 bg-black/60 text-sm text-neutral-300">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Development note */}
      <div className="py-24 text-center px-4">
        <h2 className="text-3xl font-bold mb-4">This is just the beginning</h2>
        <p className="text-neutral-400 max-w-2xl mx-auto">
          Panel is currently in development. The first version focuses on simplicity, reliability, and a strong foundation for creators.
          More features, templates, and tools will come — guided by real usage, not hype.
        </p>
      </div>
    </div>
  );
};

export default Panel;
