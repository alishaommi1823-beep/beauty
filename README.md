# BeautyScan — Cosmetic Ingredient Scanner

BeautyScan is a responsive, privacy-conscious web application designed to help consumers read, decode, and understand cosmetic product ingredient labels in plain, objective language.

---

## 🌿 Core Features

- **In-Browser OCR:** Extract ingredient lists directly from product label photos using `Tesseract.js` (WebAssembly). Zero photos or personal data are ever uploaded to an external server.
- **Editable OCR Review:** Directly inspect and correct any optical recognition typos before analysis.
- **Manual Input Fallback:** Fast paste-and-decode workflow for ingredients copied from online retailers or brand websites.
- **Curated Scientific Dataset:** Ingredients are matched against verified Cosmetic Ingredient Review (CIR) monographs and peer-reviewed dermatology literature.
- **Objective & Transparent:** No fear-mongering "toxicity" scores. Unrecognized items are clearly noted as uncataloged rather than fabricating explanations.
- **Prominent Disclaimers:** Visible educational notes informing users of the distinction between educational ingredient data and personal clinical care.

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended; v26+ supported)
- npm (v9+)

### Installation
Clone or navigate to the project directory and install dependencies:

```bash
cd beauty-scan
npm install
```

### Development Server
Start the local Vite development server:

```bash
npm run dev
```

Open your browser at the local URL displayed (typically `http://localhost:5173`).

### Production Build
To create a production-optimized static bundle:

```bash
npm run build
```

To preview the built production bundle locally:

```bash
npm run preview
```

---

## 📂 Project Architecture

```text
beauty-scan/
├── public/
│   └── leaf.svg                   # Brand icon
├── src/
│   ├── components/                # Reusable UI components
│   │   ├── Disclaimer.tsx         # Educational and safety disclaimer
│   │   ├── Footer.tsx             # Standard footer
│   │   ├── ImageUploader.tsx      # Drag & drop photo upload and validation
│   │   ├── IngredientCard.tsx     # Card with role, function, and sensitivity notes
│   │   ├── Navbar.tsx             # Header and info/privacy modal
│   │   └── OcrTextEditor.tsx      # Extracted text editor and analyze trigger
│   ├── data/
│   │   ├── ingredients.json       # Curated ingredient dataset
│   │   └── sampleData.ts          # Sample formulations for testing
│   ├── pages/
│   │   ├── HomePage.tsx           # Hero section and value propositions
│   │   ├── ResultsPage.tsx        # Structured breakdown of detected ingredients
│   │   └── ScanPage.tsx           # Photo OCR and paste workflow
│   ├── types/
│   │   └── ingredient.ts          # TypeScript schemas
│   ├── utils/
│   │   ├── matchIngredients.ts    # Alias and canonical matching engine
│   │   └── normalizeIngredients.ts# Tokenizer and string sanitizer
│   ├── App.tsx                    # View routing and state container
│   ├── index.css                  # Tailwind styles and color definitions
│   └── main.tsx                   # React 18 DOM mount point
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## ⚠️ Important Educational Notice

BeautyScan is an educational label reading tool, **not a medical diagnosis or safety certification**. Ingredient effects vary depending on formulation, individual allergies, and skin barrier health. If experiencing skin irritation, consult a board-certified dermatologist.

