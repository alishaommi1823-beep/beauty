import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-red-100 bg-[#FFF5F7] mt-auto py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center justify-center sm:justify-start space-x-2 text-stone-700 mb-4 sm:mb-0">
          <div className="w-6 h-6 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-sm shadow-red-200">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-serif font-bold text-stone-900">BeautyScan</span>
          <span className="text-red-300">·</span>
          <span className="text-xs text-red-700 font-bold flex items-center space-x-1">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-red-600 fill-red-500 inline" />
            <span>for your skincare journey</span>
          </span>
        </div>
        
        <p className="text-xs text-stone-500 max-w-md mx-auto sm:mx-0 font-medium">
          Educational cosmetic label reader. Not intended as medical or dermatological advice. All product trademarks belong to their respective owners.
        </p>
      </div>
    </footer>
  );
};
