import React, { useState } from 'react';
import { Camera, FileText, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { ImageUploader } from '../components/ImageUploader';
import { OcrTextEditor } from '../components/OcrTextEditor';
import { SampleProduct } from '../data/sampleData';
import { createWorker } from 'tesseract.js';

interface ScanPageProps {
  onAnalyzeText: (text: string, sourceType: 'ocr' | 'manual' | 'sample') => void;
  initialText?: string;
}

export const ScanPage: React.FC<ScanPageProps> = ({ onAnalyzeText, initialText = '' }) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ingredientText, setIngredientText] = useState<string>(initialText);
  const [isProcessingOcr, setIsProcessingOcr] = useState(false);
  const [ocrProgress, setOcrProgress] = useState<number>(0);
  const [ocrStatusText, setOcrStatusText] = useState<string>('');
  const [ocrError, setOcrError] = useState<string | null>(null);

  const handleImageSelected = async (file: File) => {
    setSelectedImage(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setOcrError(null);
    setOcrProgress(0);
    setIsProcessingOcr(true);
    setOcrStatusText('Initializing OCR reader...');

    try {
      const worker = await createWorker('eng', 1, {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setOcrProgress(Math.round((m.progress || 0) * 100));
            setOcrStatusText(`Reading skincare label... ${Math.round((m.progress || 0) * 100)}%`);
          } else if (m.status === 'loading tesseract core') {
            setOcrStatusText('Loading browser OCR engine...');
          } else if (m.status === 'loading language traineddata') {
            setOcrStatusText('Loading text recognition model...');
          }
        },
      });

      const { data: { text } } = await worker.recognize(file);
      await worker.terminate();

      if (!text || text.trim().length === 0) {
        setOcrError('No text could be detected from this photo. Please make sure the ingredient list is in clear view, or paste the text directly.');
      } else {
        const formatted = text.replace(/\n+/g, ', ').replace(/\s+/g, ' ').trim();
        setIngredientText(formatted);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown OCR error';
      setOcrError(`OCR extraction encountered an issue: ${msg}. You can paste or type ingredients below.`);
    } finally {
      setIsProcessingOcr(false);
    }
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
    setOcrError(null);
    setOcrProgress(0);
    setOcrStatusText('');
  };

  const handleSampleSelected = (sample: SampleProduct) => {
    setIngredientText(sample.rawText);
    setActiveTab('paste');
  };

  const handleRunAnalysis = () => {
    const sourceType = activeTab === 'upload' && selectedImage ? 'ocr' : 'manual';
    onAnalyzeText(ingredientText, sourceType);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      {/* Page Heading */}
      <div className="text-center space-y-2">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
          Scan Beauty Product Label
        </h2>
        <p className="text-sm text-stone-600 max-w-lg mx-auto">
          Snap a photo of the ingredient list or paste it in. You can review and adjust the text before analyzing.
        </p>
      </div>

      {/* Tabs with Red Active Background for Maximum Contrast */}
      <div className="flex rounded-2xl bg-red-100/80 p-1.5 max-w-md mx-auto shadow-inner border border-red-200">
        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'upload'
              ? 'bg-red-600 text-white shadow-md shadow-red-200 scale-[1.02]'
              : 'text-stone-700 hover:text-red-700 hover:bg-white/50'
          }`}
        >
          <Camera className={`w-4 h-4 ${activeTab === 'upload' ? 'text-white' : 'text-red-600'}`} />
          <span>Upload Label</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('paste')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'paste'
              ? 'bg-red-600 text-white shadow-md shadow-red-200 scale-[1.02]'
              : 'text-stone-700 hover:text-red-700 hover:bg-white/50'
          }`}
        >
          <FileText className={`w-4 h-4 ${activeTab === 'paste' ? 'text-white' : 'text-red-600'}`} />
          <span>Paste Text</span>
        </button>
      </div>

      {/* Tab 1: Image Upload & OCR */}
      {activeTab === 'upload' && (
        <div className="space-y-6">
          <ImageUploader
            onImageSelected={handleImageSelected}
            onSampleSelected={handleSampleSelected}
            selectedPreview={imagePreview}
            onClearImage={handleClearImage}
            disabled={isProcessingOcr}
          />

          {/* OCR Processing State Bar */}
          {isProcessingOcr && (
            <div className="bg-white border border-red-200 rounded-3xl p-6 shadow-md shadow-red-100 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between text-xs font-bold text-red-900">
                <span className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin text-red-600" />
                  <span>{ocrStatusText || 'Extracting ingredients...'}</span>
                </span>
                <span>{ocrProgress}%</span>
              </div>
              <div className="w-full bg-red-100 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-red-600 h-3 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${Math.max(ocrProgress, 5)}%` }}
                />
              </div>
              <p className="text-[11px] text-stone-500 text-center font-medium">
                Reading safely on your device in the browser. Zero images uploaded to any server.
              </p>
            </div>
          )}

          {/* OCR Error Notice */}
          {ocrError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start space-x-3 text-xs text-red-900">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold">Notice regarding image recognition:</p>
                <p>{ocrError}</p>
                <button
                  onClick={() => setActiveTab('paste')}
                  className="text-red-700 font-bold underline pt-1 block hover:text-red-800"
                >
                  Switch to paste mode instead
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Manual Paste & Editable Text Box */}
      <div className="space-y-4">
        {activeTab === 'upload' && ingredientText && (
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-red-700">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            <span>Extracted Label Text (Review Below)</span>
          </div>
        )}

        <OcrTextEditor
          value={ingredientText}
          onChange={setIngredientText}
          onAnalyze={handleRunAnalysis}
          onClear={() => setIngredientText('')}
          isLoading={isProcessingOcr}
        />
      </div>
    </div>
  );
};
