export interface SampleProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  rawText: string;
}

export const SAMPLE_PRODUCTS: SampleProduct[] = [
  {
    id: 'sample-calming-serum',
    name: 'Barrier Defense Calming Serum',
    category: 'Serum',
    description: 'A soothing barrier support serum containing Niacinamide, Centella, and Panthenol.',
    rawText: 'Aqua, Glycerin, Niacinamide, Butylene Glycol, Centella Asiatica Extract, Panthenol, Sodium Hyaluronate, Allantoin, Ceramide NP, Squalane, Xanthan Gum, Ethylhexylglycerin, Phenoxyethanol, Disodium EDTA.'
  },
  {
    id: 'sample-glow-toner',
    name: 'Gentle Clarifying Daily Toner',
    category: 'Exfoliating Toner',
    description: 'A mild exfoliating formula featuring Salicylic Acid and botanical antioxidants.',
    rawText: 'Aqua, Butylene Glycol, Glycerin, Salicylic Acid, Camellia Sinensis Leaf Extract, Panthenol, Allantoin, Sodium Hydroxide, Phenoxyethanol, Ethylhexylglycerin.'
  },
  {
    id: 'sample-sunscreen',
    name: 'Mineral Daily Shield SPF 50',
    category: 'Sunscreen',
    description: 'Physical mineral sunscreen formulation with Zinc Oxide and nourishing plant oils.',
    rawText: 'Zinc Oxide, Titanium Dioxide, Aqua, Dimethicone, Squalane, Glycerin, Simmondsia Chinensis Seed Oil, Tocopherol, Xanthan Gum, Phenoxyethanol.'
  }
];

