import React from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';

interface DisclaimerProps {
  compact?: boolean;
}

export const Disclaimer: React.FC<DisclaimerProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start space-x-3 text-xs text-red-950 shadow-sm">
        <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Educational Skincare Notice:</strong> Information is for reference only. OCR reading may introduce minor typos. Ingredient effects depend heavily on dosage, overall formulation, and your individual skin tolerance. This is not medical advice.
        </p>
      </div>
    );
  }

  return (
    <aside
      aria-label="Medical and Educational Disclaimer"
      className="bg-red-50/90 border border-red-200 rounded-3xl p-6 sm:p-7 my-6 shadow-sm shadow-red-100"
    >
      <div className="flex items-start space-x-4">
        <div className="w-10 h-10 rounded-2xl bg-red-600 flex items-center justify-center shrink-0 text-white shadow-md shadow-red-200">
          <ShieldAlert className="w-5 h-5 text-white" />
        </div>
        <div className="space-y-2 text-xs sm:text-sm text-stone-700">
          <h4 className="font-serif font-bold text-red-950 tracking-tight text-base sm:text-lg">
            Important Educational & Dermatological Note
          </h4>
          <p className="leading-relaxed text-stone-700">
            BeautyScan is an educational label reader, <strong>not a medical diagnostic tool</strong>. An ingredient's presence alone does not indicate whether a final formula will suit your unique skin barrier.
          </p>
          <ul className="list-disc list-inside space-y-1 text-xs text-stone-600 pt-1 font-medium">
            <li>Packaging curves and reflections may introduce text OCR reading inaccuracies.</li>
            <li>Concentrations, delivery systems, and skin barrier conditions significantly alter how ingredients perform.</li>
            <li>If you experience persistent redness, rash, or irritation, discontinue use and consult a certified dermatologist.</li>
          </ul>
        </div>
      </div>
    </aside>
  );
};
