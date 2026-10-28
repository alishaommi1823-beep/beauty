import React, { useState, useMemo } from 'react';
import { ArrowLeft, CheckCircle2, HelpCircle, Copy, Check, Filter } from 'lucide-react';
import { ScanResult } from '../types/ingredient';
import { IngredientCard } from '../components/IngredientCard';
import { Disclaimer } from '../components/Disclaimer';

interface ResultsPageProps {
  scanResult: ScanResult;
  onRescan: () => void;
  onEditInput: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({
  scanResult,
  onRescan,
  onEditInput,
}) => {
  const [copied, setCopied] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const recognized = useMemo(() => {
    return scanResult.matched.filter((m) => m.matchType !== 'unknown');
  }, [scanResult]);

  const unknown = useMemo(() => {
    return scanResult.matched.filter((m) => m.matchType === 'unknown');
  }, [scanResult]);

  const availableCategories = useMemo(() => {
    const cats = new Set<string>();
    recognized.forEach((r) => {
      if (r.record?.category) cats.add(r.record.category);
    });
    return Array.from(cats);
  }, [recognized]);

  const filteredRecognized = useMemo(() => {
    if (selectedCategory === 'all') return recognized;
    return recognized.filter((r) => r.record?.category === selectedCategory);
  }, [recognized, selectedCategory]);

  const handleCopySummary = () => {
    const summaryLines = [
      `BeautyScan Ingredient Summary (${new Date(scanResult.timestamp).toLocaleDateString()})`,
      `Total Ingredients: ${scanResult.tokens.length}`,
      `Recognized: ${recognized.length} | Unknown/Unverified: ${unknown.length}`,
      '',
      '--- RECOGNIZED INGREDIENTS ---',
      ...recognized.map(
        (r, i) => `${i + 1}. ${r.record?.canonicalName} (${r.record?.commonFunction}): ${r.record?.plainLanguageExplanation}`
      ),
      '',
      unknown.length > 0 ? '--- UNMATCHED / REQUIRES MANUAL REVIEW ---' : '',
      ...unknown.map((u, i) => `${i + 1}. ${u.inputTerm}`),
      '',
      'Note: Educational reference only. Not medical advice.'
    ].filter(Boolean).join('\n');

    navigator.clipboard.writeText(summaryLines);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Top Navigation & Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={onRescan}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-2xl bg-white border border-red-200 text-xs font-bold text-red-900 hover:bg-red-50 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Scan Another</span>
          </button>
          <button
            onClick={onEditInput}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-2xl bg-white border border-red-200 text-xs font-bold text-red-900 hover:bg-red-50 transition-colors shadow-sm"
          >
            <span>Edit Extracted Text</span>
          </button>
        </div>

        <button
          onClick={handleCopySummary}
          className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md shadow-red-200 active:scale-95"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-white stroke-[3]" /> : <Copy className="w-3.5 h-3.5 text-white" />}
          <span>{copied ? 'Summary Copied!' : 'Copy Beauty Breakdown'}</span>
        </button>
      </div>

      {/* Overview Stats Header */}
      <div className="bg-white border border-red-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <div className="text-xs uppercase tracking-wider text-red-700 font-bold mb-1">
            Ingredient Breakdown
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Formula Analysis Results
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#FFFDFE] rounded-2xl p-5 border border-red-100">
            <span className="text-xs font-bold text-stone-500 block mb-1">Total Detected Items</span>
            <span className="font-serif text-3xl font-bold text-stone-900">{scanResult.tokens.length}</span>
          </div>

          <div className="bg-red-50/80 rounded-2xl p-5 border border-red-200">
            <span className="text-xs font-bold text-red-800 block mb-1">Recognized Ingredients</span>
            <div className="flex items-baseline space-x-1.5">
              <span className="font-serif text-3xl font-bold text-red-900">{recognized.length}</span>
              <span className="text-xs text-red-700 font-semibold">verified entries</span>
            </div>
          </div>

          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200">
            <span className="text-xs font-bold text-stone-700 block mb-1">Uncataloged / Needs Review</span>
            <div className="flex items-baseline space-x-1.5">
              <span className="font-serif text-3xl font-bold text-stone-900">{unknown.length}</span>
              <span className="text-xs text-stone-500 font-semibold">not in dataset</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visible Disclaimer Near Results */}
      <Disclaimer />

      {/* Category Filter */}
      {availableCategories.length > 0 && (
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-4 h-4 text-red-600 shrink-0 ml-1" />
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-sm ${
              selectedCategory === 'all'
                ? 'bg-red-600 text-white shadow-red-200'
                : 'bg-white border border-red-200 text-stone-700 hover:bg-red-50'
            }`}
          >
            All Categories ({recognized.length})
          </button>
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize whitespace-nowrap transition-all shadow-sm ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white shadow-red-200'
                  : 'bg-white border border-red-200 text-stone-700 hover:bg-red-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Recognized Ingredients List */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-red-600" />
          <h3 className="font-serif text-xl font-bold text-stone-900">
            Recognized Ingredients ({filteredRecognized.length})
          </h3>
        </div>

        {filteredRecognized.length === 0 ? (
          <div className="bg-white border border-red-100 rounded-3xl p-6 text-center text-sm text-stone-500">
            No ingredients found in this specific category filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredRecognized.map((item, idx) => (
              <IngredientCard key={`${item.inputTerm}-${idx}`} item={item} index={idx} />
            ))}
          </div>
        )}
      </section>

      {/* Unknown / Needs Review Ingredients Section */}
      {unknown.length > 0 && (
        <section className="space-y-4 pt-6 border-t border-red-100">
          <div className="flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-red-600" />
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Uncataloged or Needs Review ({unknown.length})
            </h3>
          </div>

          <div className="bg-red-50/60 border border-red-200 rounded-3xl p-5 text-xs text-stone-700 leading-relaxed space-y-2">
            <p>
              These items could not be matched against our reviewed local database. This can happen if an ingredient name is obscured on packaging, has an OCR typo, or is a proprietary trade name.
            </p>
            <p className="font-bold text-red-950">
              We never fabricate cosmetic information. You can return to the edit screen to fix any spelling typos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {unknown.map((item, idx) => (
              <div
                key={`unknown-${idx}`}
                className="bg-white border border-red-100 rounded-2xl p-4 flex items-center justify-between text-xs shadow-sm"
              >
                <span className="font-semibold text-stone-800 break-words max-w-[80%]">
                  {item.inputTerm}
                </span>
                <span className="text-[11px] text-red-600 font-bold uppercase tracking-wider">
                  Unmatched
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
