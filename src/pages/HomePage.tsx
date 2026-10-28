import React from 'react';
import { Camera, ArrowRight, ShieldCheck, Cpu, Heart, Sparkles, Check } from 'lucide-react';
import { SAMPLE_PRODUCTS, SampleProduct } from '../data/sampleData';

interface HomePageProps {
  onStartScan: () => void;
  onSelectSample: (sample: SampleProduct) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onStartScan, onSelectSample }) => {
  return (
    <div className="space-y-16 py-8 sm:py-12">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto px-4 space-y-6">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-red-100 border border-red-200 text-red-900 text-xs font-bold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-red-600" />
          <span>Clean Skincare & Beauty Decoder</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-stone-900 leading-[1.15]">
          Understand what touches your <span className="text-red-600">radiant skin</span>.
        </h1>

        <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto font-sans">
          Snap a photo of any skincare or cosmetic bottle label, or paste ingredients directly. BeautyScan decodes what every component does in clear everyday language—so you pamper your skin with confidence.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onStartScan}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-base shadow-xl shadow-red-200 hover:shadow-2xl hover:shadow-red-300 transition-all active:scale-[0.98]"
          >
            <Camera className="w-5 h-5 text-white" />
            <span>Scan Beauty Label Now</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Trust Badges */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-stone-600 font-semibold">
          <span className="flex items-center space-x-1.5">
            <Check className="w-4 h-4 text-red-600 stroke-[3]" />
            <span>100% In-Browser Privacy</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <Check className="w-4 h-4 text-red-600 stroke-[3]" />
            <span>Peer-Reviewed Science</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <Check className="w-4 h-4 text-red-600 stroke-[3]" />
            <span>No Account Needed</span>
          </span>
        </div>
      </section>

      {/* Feature Pillars with High-Contrast Red Icon Backgrounds */}
      <section className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-red-100 rounded-3xl p-7 shadow-sm hover:shadow-md hover:border-red-300 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center text-white mb-4 shadow-md shadow-red-200">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
            Smart Browser OCR
          </h3>
          <p className="text-sm text-stone-600 leading-relaxed">
            Extracts small print right on your phone or computer. Zero packaging photos leave your device or enter the cloud.
          </p>
        </div>

        <div className="bg-white border border-red-100 rounded-3xl p-7 shadow-sm hover:shadow-md hover:border-red-300 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center text-white mb-4 shadow-md shadow-red-200">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
            Curated Beauty Science
          </h3>
          <p className="text-sm text-stone-600 leading-relaxed">
            Validated against independent CIR safety monographs. If an ingredient is unverified, we let you know transparently without guessing.
          </p>
        </div>

        <div className="bg-white border border-red-100 rounded-3xl p-7 shadow-sm hover:shadow-md hover:border-red-300 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center text-white mb-4 shadow-md shadow-red-200">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
            Zero Fear-Mongering
          </h3>
          <p className="text-sm text-stone-600 leading-relaxed">
            No exaggerated "toxic hazard" scores. Clear, balanced notes on barrier hydration, soothing benefits, and individual sensitivity.
          </p>
        </div>
      </section>

      {/* Try with Sample Products */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-br from-red-50/90 via-[#FFF8FA] to-pink-50/90 border border-red-200 rounded-3xl p-6 sm:p-9 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-red-700 mb-1 inline-block">
              Instant Skincare Demo
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-1">
              Test BeautyScan in 1 Click
            </h3>
            <p className="text-sm text-stone-600">
              Pick one of these beloved skincare formulations to see how BeautyScan breaks down its ingredients:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SAMPLE_PRODUCTS.map((prod) => (
              <button
                key={prod.id}
                onClick={() => onSelectSample(prod)}
                className="bg-white rounded-2xl p-5 border border-red-100 text-left shadow-sm hover:shadow-md hover:border-red-400 transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200 mb-2 inline-block">
                    {prod.category}
                  </span>
                  <h4 className="font-serif text-base font-bold text-stone-900 group-hover:text-red-700 transition-colors mb-1.5">
                    {prod.name}
                  </h4>
                  <p className="text-xs text-stone-500 leading-relaxed mb-4">
                    {prod.description}
                  </p>
                </div>
                <div className="text-xs font-bold text-red-600 flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>Analyze formulation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
