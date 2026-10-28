import React, { useState } from 'react';
import { CheckCircle2, HelpCircle, BookOpen, AlertCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { MatchedIngredient } from '../types/ingredient';

interface IngredientCardProps {
  item: MatchedIngredient;
  index: number;
}

export const IngredientCard: React.FC<IngredientCardProps> = ({ item, index }) => {
  const [expanded, setExpanded] = useState(false);
  const { record, inputTerm, matchType } = item;

  if (!record || matchType === 'unknown') {
    return (
      <div className="bg-white/80 border border-stone-200/80 rounded-3xl p-5 sm:p-6 transition-all shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="text-xs font-mono text-rose-300 font-bold">#{index + 1}</span>
            <h4 className="font-medium text-stone-700 text-sm sm:text-base break-words">
              {inputTerm}
            </h4>
          </div>
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-100">
            <HelpCircle className="w-3.5 h-3.5 text-rose-400" />
            <span>Not in dataset</span>
          </span>
        </div>
        <p className="mt-2 text-xs text-stone-500 leading-relaxed">
          Not yet cataloged in our curated reference library. We never guess chemical properties or create unsubstantiated beauty claims.
        </p>
      </div>
    );
  }

  // Feminine beauty palette category badges
  const categoryBadgeColors: Record<string, string> = {
    hydrator: 'bg-pink-50 text-pink-700 border-pink-200',
    antioxidant: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    soothing: 'bg-rose-50 text-rose-700 border-rose-200',
    exfoliant: 'bg-amber-50 text-amber-800 border-amber-200',
    preservative: 'bg-purple-50 text-purple-700 border-purple-200',
    emollient: 'bg-teal-50 text-teal-700 border-teal-200',
    fragrance: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
    other: 'bg-stone-50 text-stone-600 border-stone-200',
  };

  const badgeClass = categoryBadgeColors[record.category || 'other'] || categoryBadgeColors.other;

  return (
    <article className="bg-white/95 border border-rose-100 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-rose-300 transition-all">
      {/* Top Header */}
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <div className="flex items-baseline space-x-2.5">
          <span className="text-xs font-mono text-rose-300 font-bold">#{index + 1}</span>
          <h4 className="font-serif text-xl font-bold text-stone-900 tracking-tight">
            {record.canonicalName}
          </h4>
        </div>

        <div className="flex items-center space-x-2">
          {record.category && (
            <span className={`text-[11px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full border ${badgeClass}`}>
              {record.category}
            </span>
          )}
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium bg-blush-50 text-blush-800 border border-blush-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-blush-600" />
            <span>{matchType === 'exact' ? 'Exact Match' : 'Alias Matched'}</span>
          </span>
        </div>
      </div>

      {/* Alias detection note */}
      {matchType === 'alias' && inputTerm.toLowerCase() !== record.canonicalName.toLowerCase() && (
        <div className="text-xs text-rose-600/80 mb-3 italic">
          Detected from product packaging as: <span className="font-medium text-stone-800">"{inputTerm}"</span>
        </div>
      )}

      {/* Common Function */}
      <div className="mb-3">
        <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 block mb-1">
          Cosmetic Function
        </span>
        <p className="text-sm font-semibold text-rose-950 flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blush-500 inline" />
          <span>{record.commonFunction}</span>
        </p>
      </div>

      {/* Plain Language Explanation */}
      <div className="mb-4">
        <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
          What It Does For Your Skin
        </span>
        <p className="text-sm text-stone-600 leading-relaxed font-sans">
          {record.plainLanguageExplanation}
        </p>
      </div>

      {/* Sensitivity Notes */}
      <div className="bg-rose-50/50 rounded-2xl p-4 border border-rose-100/80 mb-3">
        <div className="flex items-start space-x-2.5">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div className="text-xs text-stone-600 leading-relaxed">
            <strong className="text-rose-900 font-semibold">Skin Tolerance Context: </strong>
            {record.sensitivityNotes}
          </div>
        </div>
      </div>

      {/* Expandable Source / References */}
      <div className="pt-3 border-t border-rose-50 flex items-center justify-between text-xs text-stone-400">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center space-x-1 text-blush-600 hover:text-blush-800 font-semibold transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{expanded ? 'Hide Reference' : 'Verified Science Reference'}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        <span className="text-[11px] text-stone-400 uppercase tracking-wider font-medium">
          Status: {record.reviewStatus}
        </span>
      </div>

      {expanded && (
        <div className="mt-3 p-3 bg-blush-50/80 rounded-xl text-xs text-blush-950 border border-blush-200/80 animate-fadeIn">
          <span className="font-semibold text-blush-800">Source: </span>
          {record.evidenceOrReference}
        </div>
      )}
    </article>
  );
};
