import React, { useMemo } from 'react';
import { ArrowRight, Trash2, Sparkles } from 'lucide-react';
import { normalizeIngredients } from '../utils/normalizeIngredients';

interface OcrTextEditorProps {
  value: string;
  onChange: (newValue: string) => void;
  onAnalyze: () => void;
  onClear: () => void;
  isLoading?: boolean;
}

export const OcrTextEditor: React.FC<OcrTextEditorProps> = ({
  value,
  onChange,
  onAnalyze,
  onClear,
  isLoading = false,
}) => {
  const estimatedTokens = useMemo(() => {
    return normalizeIngredients(value);
  }, [value]);

  const isEmpty = !value.trim();

  return (
    <div className="bg-white border border-red-100 rounded-3xl p-6 sm:p-7 shadow-sm shadow-red-50/50 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-serif text-xl font-bold text-stone-900">
            Review & Edit Ingredients
          </h3>
          <p className="text-xs text-stone-500">
            Easily correct any tiny OCR spelling slips before decoding.
          </p>
        </div>

        {!isEmpty && (
          <button
            onClick={onClear}
            disabled={isLoading}
            className="flex items-center space-x-1 text-xs text-stone-400 hover:text-red-600 transition-colors disabled:opacity-50 font-medium"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        )}
      </div>

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={isLoading}
          rows={6}
          placeholder="Paste cosmetic ingredients here, separated by commas (e.g. Aqua, Glycerin, Niacinamide, Panthenol, Ceramide NP...)"
          className="w-full rounded-2xl border border-red-200 p-4 text-sm text-stone-800 placeholder-stone-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200 resize-y transition-all font-sans leading-relaxed bg-[#FFFDFE]"
          aria-label="Cosmetic ingredient text"
        />
      </div>

      {/* Footer stats & Action CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
        <div className="flex items-center space-x-2 text-xs text-stone-600 font-medium">
          <Sparkles className="w-4 h-4 text-red-600" />
          <span>
            {isEmpty
              ? 'Ready for your ingredient list...'
              : `Found ~${estimatedTokens.length} ingredient items`}
          </span>
        </div>

        <button
          onClick={onAnalyze}
          disabled={isEmpty || isLoading}
          className="inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-200 hover:shadow-xl hover:shadow-red-300 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
        >
          <span>Decode My Ingredients</span>
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
};
