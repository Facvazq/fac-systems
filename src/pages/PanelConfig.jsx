import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OPTIONS = [
  {
    id: 'mini',
    title: 'Panel Mini',
    desc: '8.3-inch display',
    detail: 'Compact, subtle, ideal for desks, kitchens, small walls',
    sizeClass: 'w-40 h-56 md:w-44 md:h-64'
  },
  {
    id: 'standard',
    title: 'Panel Standard',
    desc: '11-inch display',
    detail: 'Larger, easier to read, ideal for walls, offices, and businesses',
    sizeClass: 'w-48 h-64 md:w-56 md:h-72'
  }
];

const PanelConfig = () => {
  const [selected, setSelected] = useState('standard');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-neutral-900 pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-sm uppercase tracking-[0.3em] text-neutral-400">Panel</div>
          <h1 className="text-5xl md:text-6xl font-semibold font-apple-bold mt-3">Panel</h1>
          <p className="text-lg text-neutral-500 mt-4">Choose the Panel that fits your space.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Preview */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-10 flex items-center justify-center min-h-[360px]">
            <div className="flex items-end gap-6">
              <div className="flex flex-col items-center">
                <div className={`rounded-2xl border border-neutral-300 bg-white shadow-sm ${OPTIONS[0].sizeClass} ${
                  selected === 'mini' ? 'ring-2 ring-neutral-900' : ''
                }`} />
                <span className="text-xs text-neutral-400 mt-3">Mini</span>
              </div>
              <div className="flex flex-col items-center">
                <div className={`rounded-2xl border border-neutral-300 bg-white shadow-sm ${OPTIONS[1].sizeClass} ${
                  selected === 'standard' ? 'ring-2 ring-neutral-900' : ''
                }`} />
                <span className="text-xs text-neutral-400 mt-3">Standard</span>
              </div>
            </div>
          </div>

          {/* Selector */}
          <div className="space-y-6">
            {OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelected(opt.id)}
                className={`w-full text-left border rounded-2xl p-6 transition-colors ${
                  selected === opt.id
                    ? 'border-neutral-900 bg-neutral-50'
                    : 'border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl font-semibold">{opt.title}</div>
                    <div className="text-sm text-neutral-500 mt-1">{opt.desc}</div>
                  </div>
                  <div className={`w-3 h-3 rounded-full border ${
                    selected === opt.id ? 'bg-neutral-900 border-neutral-900' : 'border-neutral-400'
                  }`} />
                </div>
                <div className="text-sm text-neutral-500 mt-4">{opt.detail}</div>
              </button>
            ))}

            <div className="pt-2 text-sm text-neutral-400">
              More configuration options may be available in the future.
            </div>

            <button
              onClick={() => navigate('/panel-config')}
              className="w-full py-3 rounded-full border border-neutral-900 text-neutral-900 font-semibold hover:bg-neutral-900 hover:text-white transition-colors"
            >
              Configure Device
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelConfig;
