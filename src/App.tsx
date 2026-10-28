import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ScanPage } from './pages/ScanPage';
import { ResultsPage } from './pages/ResultsPage';
import { ScanResult } from './types/ingredient';
import { matchIngredientsList } from './utils/matchIngredients';
import { SampleProduct } from './data/sampleData';

export function App() {
  const [currentView, setCurrentView] = useState<'home' | 'scan' | 'results'>('home');
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [currentText, setCurrentText] = useState<string>('');

  const handleAnalyzeText = (text: string, sourceType: 'ocr' | 'manual' | 'sample') => {
    setCurrentText(text);
    const { tokens, matched } = matchIngredientsList(text);
    const result: ScanResult = {
      rawText: text,
      tokens,
      matched,
      timestamp: new Date().toISOString(),
      sourceType,
    };
    setScanResult(result);
    setCurrentView('results');
  };

  const handleSelectSample = (sample: SampleProduct) => {
    setCurrentText(sample.rawText);
    handleAnalyzeText(sample.rawText, 'sample');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      <Navbar currentView={currentView} onNavigate={setCurrentView} />

      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage
            onStartScan={() => setCurrentView('scan')}
            onSelectSample={handleSelectSample}
          />
        )}

        {currentView === 'scan' && (
          <ScanPage
            onAnalyzeText={handleAnalyzeText}
            initialText={currentText}
          />
        )}

        {currentView === 'results' && scanResult && (
          <ResultsPage
            scanResult={scanResult}
            onRescan={() => {
              setCurrentText('');
              setScanResult(null);
              setCurrentView('scan');
            }}
            onEditInput={() => {
              setCurrentView('scan');
            }}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;

