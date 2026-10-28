import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, AlertCircle, X, Sparkles, Heart } from 'lucide-react';
import { SAMPLE_PRODUCTS, SampleProduct } from '../data/sampleData';

interface ImageUploaderProps {
  onImageSelected: (file: File) => void;
  onSampleSelected: (sample: SampleProduct) => void;
  selectedPreview: string | null;
  onClearImage: () => void;
  disabled?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelected,
  onSampleSelected,
  selectedPreview,
  onClearImage,
  disabled = false,
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setErrorMessage(null);
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/jpg'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(jpg|jpeg|png|webp)$/i)) {
      setErrorMessage('Please select a JPG, PNG, or WEBP image of the ingredient list.');
      return;
    }

    // 10 MB limit
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('Image size is too large (max 10MB). Please choose a smaller photo.');
      return;
    }

    onImageSelected(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (disabled) return;
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Box or Preview */}
      {selectedPreview ? (
        <div className="relative bg-white border border-red-200 rounded-3xl p-5 shadow-sm text-center">
          <button
            onClick={onClearImage}
            disabled={disabled}
            className="absolute top-4 right-4 p-2.5 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors disabled:opacity-50 shadow-md"
            aria-label="Remove image"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <div className="max-h-72 overflow-hidden rounded-2xl flex items-center justify-center bg-red-50/40 mb-3 border border-red-100">
            <img
              src={selectedPreview}
              alt="Ingredient label preview"
              className="max-h-72 w-auto object-contain rounded-xl"
            />
          </div>
          <p className="text-xs text-red-600 font-semibold">
            Label captured! Review and edit the extracted text below before analyzing.
          </p>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !disabled && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
            dragOver
              ? 'border-red-500 bg-red-50/70 scale-[1.01] shadow-lg shadow-red-100'
              : 'border-red-200 hover:border-red-400 bg-white hover:bg-red-50/30 hover:shadow-md hover:shadow-red-50'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
          />

          {/* Red Background with High-Contrast White Icon */}
          <div className="w-16 h-16 mx-auto mb-4 rounded-3xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-200">
            <UploadCloud className="w-8 h-8 text-white" />
          </div>

          <h3 className="font-serif text-xl font-bold text-stone-900 mb-1.5">
            Upload or snap your product packaging
          </h3>
          <p className="text-sm text-stone-600 max-w-sm mx-auto mb-4">
            Drag & drop your skincare or makeup label photo here, or browse from your phone gallery.
          </p>

          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-red-100 text-red-800 text-xs font-bold border border-red-200">
            <ImageIcon className="w-3.5 h-3.5 text-red-600" />
            <span>JPG, PNG, WEBP (up to 10MB)</span>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center space-x-2.5 text-xs text-red-800 font-medium">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Skincare photography tips */}
      <div className="bg-red-50/60 border border-red-200/80 rounded-2xl p-4 text-xs text-stone-700">
        <strong className="text-red-900 font-bold flex items-center space-x-1 mb-0.5">
          <Heart className="w-3 h-3 text-red-600 fill-red-400 inline" />
          <span>Skincare label photo tip:</span>
        </strong>
        Ensure natural soft lighting, avoid reflection glare on glossy bottles, and flatten flexible tubes for the sharpest text detection.
      </div>

      {/* Quick Sample Selector */}
      <div className="pt-2">
        <div className="flex items-center space-x-2 mb-3">
          <Sparkles className="w-4 h-4 text-red-600" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-red-700">
            Or try with a popular beauty formula
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SAMPLE_PRODUCTS.map((prod) => (
            <button
              key={prod.id}
              type="button"
              onClick={() => onSampleSelected(prod)}
              disabled={disabled}
              className="text-left p-3.5 rounded-2xl border border-red-100 bg-white hover:border-red-400 hover:bg-red-50/40 transition-all text-xs group shadow-sm hover:shadow"
            >
              <div className="font-bold text-stone-900 group-hover:text-red-700 mb-0.5 truncate">
                {prod.name}
              </div>
              <div className="text-[11px] text-red-600/90 line-clamp-1 font-semibold">
                {prod.category}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
