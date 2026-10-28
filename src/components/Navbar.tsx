import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Info, X, Heart } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'scan' | 'results';
  onNavigate: (view: 'home' | 'scan' | 'results') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [showInfoModal, setShowInfoModal] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FFF8FA]/95 backdrop-blur-md border-b border-red-100 transition-all shadow-sm shadow-red-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo / Brand */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2.5 text-left group transition-transform active:scale-[0.98]"
          >
            <div className="w-10 h-10 rounded-2xl bg-red-600 flex items-center justify-center text-white shadow-md shadow-red-200 group-hover:bg-red-700 transition-all">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-serif text-2xl font-bold tracking-tight text-stone-900">
                  BeautyScan
                </span>
                <Heart className="w-3.5 h-3.5 text-red-500 fill-red-400 inline" />
              </div>
              <span className="hidden sm:inline-block text-[11px] text-red-700 font-sans tracking-wider uppercase font-bold">
                Clean Beauty Decoder
              </span>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-1 sm:space-x-3">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3.5 py-1.5 rounded-full text-sm transition-colors ${
                currentView === 'home'
                  ? 'bg-red-100 text-red-900 font-bold'
                  : 'text-stone-700 hover:text-red-700 hover:bg-red-50 font-medium'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('scan')}
              className="px-4 py-1.5 rounded-full text-sm font-bold transition-all shadow-md active:scale-95 bg-red-600 hover:bg-red-700 text-white shadow-red-200"
            >
              Scan Ingredients
            </button>
            <button
              onClick={() => setShowInfoModal(true)}
              aria-label="About BeautyScan & Privacy"
              className="p-2 text-stone-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
            >
              <Info className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </header>

      {/* Info & Privacy Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#FFF9FA] border border-red-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setShowInfoModal(false)}
              className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-red-600 rounded-lg transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-red-600 flex items-center justify-center text-white shadow-md shadow-red-200">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                About BeautyScan
              </h3>
            </div>

            <div className="space-y-3.5 text-sm text-stone-600 leading-relaxed">
              <p>
                <strong>BeautyScan</strong> is your chic, educational skincare companion. It decodes intimidating INCI ingredient lists so you always know what you're pampering your skin with.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 space-y-1.5 text-red-950">
                <p className="font-bold text-xs uppercase tracking-wider text-red-700 flex items-center space-x-1">
                  <span>100% In-Browser Privacy</span>
                </p>
                <p className="text-xs text-stone-700">
                  Photos and text stay strictly on your device. We use browser WebAssembly (Tesseract.js) to read labels offline and locally.
                </p>
              </div>
              <p>
                We provide balanced, peer-reviewed cosmetic science—no toxic fear-mongering or arbitrary ratings.
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowInfoModal(false)}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-red-200"
              >
                Got It, Beautiful!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
