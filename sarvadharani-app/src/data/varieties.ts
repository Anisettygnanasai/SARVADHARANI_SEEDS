export interface RiceVariety {
  id: string;
  name: string;
  tagline: string;
  duration: string;
  segment: string;
  yieldPotential: string;
  grainType: string;
  diseaseResistance: string;
  suitableRegions: string[];
  keyBenefits: string[];
  description: string;
  longDescription: string;
  color: string;
  accentColor: string;
  image: string;
  category: 'inbred' | 'hybrid' | 'special';
  isFlagship: boolean;
  stats: {
    yield: number;
    diseaseResistance: number;
    maturity: number;
    quality: number;
  };
  performanceMetrics: {
    label: string;
    value: string;
    detail: string;
  }[];
  farmerBenefits: string[];
  advantages: string[];
  cultivationSteps: {
    step: number;
    title: string;
    description: string;
  }[];
  faq: { question: string; answer: string }[];
  badge?: string;
  available: boolean;
}

export const varieties: RiceVariety[] = [
  {
    id: 'mtu-1001',
    name: 'MTU-1001',
    tagline: 'High Yielding & Reliable',
    segment: 'O.P',
    category: 'inbred',
    isFlagship: true,
    duration: '130-135 Days',
    yieldPotential: '6.5–8.0 t/ha',
    grainType: 'Medium Slender',
    diseaseResistance: 'BLB, Blast',
    suitableRegions: ['Rayagada', 'Odisha', 'Andhra Pradesh'],
    keyBenefits: [
      'Consistent 6.5–8.0 t/ha yield across varied soils',
      'Superior milling quality',
      'Disease-resistant package reduces input costs',
      'Strong market demand'
    ],
    description: 'MTU-1001 sets the standard for high-yield performance, offering consistent, disease-resistant, and milling-grade quality.',
    longDescription: 'MTU-1001 is a flagship O.P variety bred specifically for robust growth. It delivers outstanding yield consistency across varied soil types and is highly regarded for its superior milling quality. With built-in disease resistance, farmers save on crop protection costs.',
    color: '#C8981E',
    accentColor: '#FAF0C3',
    image: '/images/variety-mtu-1001-v2.png',
    stats: { yield: 88, diseaseResistance: 86, maturity: 74, quality: 90 },
    performanceMetrics: [
      { label: 'Yield Range', value: '6.5–8.0 t/ha', detail: 'Consistent across soil types' },
      { label: 'Segment', value: 'O.P', detail: 'Open Pollinated' },
    ],
    advantages: [
      'Consistent yield in moderate stress conditions',
      'Superior milling quality',
      'Disease-resistant package',
    ],
    cultivationSteps: [
      { step: 1, title: 'Nursery Preparation', description: 'Maintain 2.5 cm water depth. Seedlings ready in 20–25 days.' },
      { step: 2, title: 'Land Preparation', description: '2–3 ploughings with puddling.' },
    ],
    farmerBenefits: [
      'Premium market price',
      'Reduced pesticide cost',
    ],
    faq: [
      { question: 'When is the best time to sow MTU-1001?', answer: 'It performs best when sown in June–July for Kharif season.' }
    ],
    badge: 'Best Seller',
    available: true,
  },
  {
    id: 'mtu-1156',
    name: 'MTU-1156',
    tagline: 'Early Maturing O.P Variety',
    segment: 'O.P',
    category: 'inbred',
    isFlagship: false,
    duration: '115-120 Days',
    yieldPotential: '6.0–7.5 t/ha',
    grainType: 'Medium Bold',
    diseaseResistance: 'Blast, Brown Spot',
    suitableRegions: ['Rayagada', 'Odisha', 'Telangana'],
    keyBenefits: [
      'Short 115-120 day cycle enables faster crop turnover',
      'Lower water footprint',
      'Strong blast resistance'
    ],
    description: 'MTU-1156 delivers maximum yield in minimum time, adaptable across varied growing conditions.',
    longDescription: 'MTU-1156 is the dependable short-duration O.P variety. Ideal for farmers with limited water availability, its short cycle allows for multiple crops per year.',
    color: '#6B4C2A',
    accentColor: '#E8D5C2',
    image: '/images/variety-mtu-1156-v2.png',
    stats: { yield: 82, diseaseResistance: 88, maturity: 84, quality: 80 },
    performanceMetrics: [
      { label: 'Duration', value: '115-120 days', detail: 'Short duration variety' },
      { label: 'Segment', value: 'O.P', detail: 'Open Pollinated' },
    ],
    advantages: [
      'Short cycle enables faster crop turnover',
      'Lower water footprint',
    ],
    cultivationSteps: [
      { step: 1, title: 'Seed Treatment', description: 'Soak seeds 12 hrs. Drain.' },
      { step: 2, title: 'Direct Seeding', description: 'Sow in lines at 100 kg/ha seed rate.' },
    ],
    farmerBenefits: [
      'Grow multiple crops per year',
      'Lower input costs',
    ],
    faq: [
      { question: 'Is MTU-1156 suited for rainfed farming?', answer: 'Yes, its lower water requirement makes it well-suited for rainfed conditions.' }
    ],
    available: true,
  },
  {
    id: 'mtu-1153',
    name: 'MTU-1153',
    tagline: 'High Performance Short Duration',
    segment: 'O.P',
    category: 'inbred',
    isFlagship: false,
    duration: '115-120 Days',
    yieldPotential: '6.2–7.8 t/ha',
    grainType: 'Medium Slender',
    diseaseResistance: 'BLB, Blast',
    suitableRegions: ['Rayagada', 'Odisha', 'Andhra Pradesh'],
    keyBenefits: [
      'Short 115-120 day cycle',
      'Strong tillering capacity',
      'High market demand'
    ],
    description: 'MTU-1153 is engineered for consistent profitability with a short duration cycle.',
    longDescription: 'MTU-1153 combines a short 115-120 day duration with strong disease resistance and high yield potential, making it an economically impactful variety.',
    color: '#3D6B4F',
    accentColor: '#D5E9DC',
    image: '/images/variety-mtu-1153-v2.png',
    stats: { yield: 85, diseaseResistance: 85, maturity: 85, quality: 85 },
    performanceMetrics: [
      { label: 'Duration', value: '115-120 days', detail: 'Short duration variety' },
      { label: 'Segment', value: 'O.P', detail: 'Open Pollinated' },
    ],
    advantages: [
      'Short cycle',
      'High market demand',
    ],
    cultivationSteps: [
      { step: 1, title: 'Nursery', description: 'Prepare wet nursery.' },
      { step: 2, title: 'Transplanting', description: 'Transplant 21 day seedlings.' },
    ],
    farmerBenefits: [
      'Faster returns on investment',
      'Reduced water usage',
    ],
    faq: [
      { question: 'What is the optimal spacing?', answer: '20x15 cm is recommended for optimal tillering.' }
    ],
    available: true,
  },
  {
    id: 'mtu-7029',
    name: 'MTU-7029',
    tagline: 'The Farmer\'s Legacy Seed',
    segment: 'O.P',
    category: 'inbred',
    isFlagship: false,
    duration: '145-150 Days',
    yieldPotential: '7.0–8.5 t/ha',
    grainType: 'Medium Bold',
    diseaseResistance: 'BLB, Sheath Blight',
    suitableRegions: ['Rayagada', 'Odisha', 'Coastal Regions'],
    keyBenefits: [
      'Top yield ceiling',
      'Robust plant architecture',
      'Widely accepted by rice mills'
    ],
    description: 'MTU-7029 is a long-duration variety known for its massive yield potential and robust growth.',
    longDescription: 'MTU-7029 requires 145-150 days to mature, but rewards the farmer with exceptional yields. It is suited for areas with assured irrigation and commands great respect from traditional farmers.',
    color: '#C8981E',
    accentColor: '#FDF8E7',
    image: '/images/variety-mtu-7029-v2.png',
    stats: { yield: 92, diseaseResistance: 84, maturity: 60, quality: 88 },
    performanceMetrics: [
      { label: 'Duration', value: '145-150 days', detail: 'Long duration variety' },
      { label: 'Segment', value: 'O.P', detail: 'Open Pollinated' },
    ],
    advantages: [
      'Massive yield potential',
      'High straw yield',
    ],
    cultivationSteps: [
      { step: 1, title: 'Nursery', description: 'Sow early to account for long duration.' },
      { step: 2, title: 'Nutrient Management', description: 'Requires steady nutrient supply throughout its long cycle.' },
    ],
    farmerBenefits: [
      'Maximum total yield',
      'Excellent fodder value',
    ],
    faq: [
      { question: 'Is MTU-7029 suitable for Rabi?', answer: 'Due to its long duration, it is best suited for Kharif with assured irrigation.' }
    ],
    available: true,
  },
  {
    id: 'suvarna',
    name: 'SUVARNA',
    tagline: 'Premium Quality Harvest',
    segment: 'RES',
    category: 'hybrid',
    isFlagship: true,
    duration: '145-150 Days',
    yieldPotential: '7.5–9.0 t/ha',
    grainType: 'Fine Slender',
    diseaseResistance: 'Blast, False Smut',
    suitableRegions: ['Rayagada', 'Odisha', 'Andhra Pradesh'],
    keyBenefits: [
      'Premium grain quality',
      'High yield potential under RES segment',
      'Strong export potential'
    ],
    description: 'SUVARNA delivers premium eating quality and remarkable yields over a 145-150 day cycle.',
    longDescription: 'SUVARNA is a premium RES segment variety prized for its fine grains and attractive appearance post-milling. It commands a market premium owing to its excellent cooking quality.',
    color: '#3D6B4F',
    accentColor: '#D5E9DC',
    image: '/images/variety-suvarna-v2.png',
    stats: { yield: 90, diseaseResistance: 82, maturity: 60, quality: 95 },
    performanceMetrics: [
      { label: 'Duration', value: '145-150 days', detail: 'Long duration variety' },
      { label: 'Segment', value: 'RES', detail: 'Research Variety' },
    ],
    advantages: [
      'Fine slender grain',
      'High market price premium',
    ],
    cultivationSteps: [
      { step: 1, title: 'Seed Selection', description: 'Treat seeds properly for early vigor.' },
      { step: 2, title: 'Harvest', description: 'Harvest at 85-90% maturity for best grain quality.' },
    ],
    farmerBenefits: [
      'High wholesale market price',
      'Consistent quality',
    ],
    faq: [
      { question: 'What makes SUVARNA premium?', answer: 'Its fine slender grain and cooking profile command higher prices.' }
    ],
    badge: 'Premium Grade',
    available: true,
  },
  {
    id: 'dharani',
    name: 'DHARANI',
    tagline: 'Steady Yields. Reliable Growth.',
    segment: 'RES',
    category: 'hybrid',
    isFlagship: false,
    duration: '140-145 Days',
    yieldPotential: '7.0–8.5 t/ha',
    grainType: 'Medium Slender',
    diseaseResistance: 'BLB, Blast',
    suitableRegions: ['Rayagada', 'Odisha', 'Telangana'],
    keyBenefits: [
      'Dependable yield across seasons',
      'Strong blast resistance package',
      'Ideal for varied soil types'
    ],
    description: 'DHARANI delivers nature\'s abundance — consistent yield over a 140-145 day cycle.',
    longDescription: 'DHARANI is a dependable RES variety. With a 140-145 day duration, it offers strong yields and resilience across varied conditions, making it an ideal choice for progressive farmers.',
    color: '#6B4C2A',
    accentColor: '#E8D5C2',
    image: '/images/variety-dharani-v2.png',
    stats: { yield: 85, diseaseResistance: 88, maturity: 65, quality: 85 },
    performanceMetrics: [
      { label: 'Duration', value: '140-145 days', detail: 'Medium-Long duration' },
      { label: 'Segment', value: 'RES', detail: 'Research Variety' },
    ],
    advantages: [
      'Dependable yield',
      'Strong disease resistance',
    ],
    cultivationSteps: [
      { step: 1, title: 'Land Preparation', description: 'Deep ploughing followed by puddling.' },
      { step: 2, title: 'Water Management', description: 'Maintain standing water up to panicle initiation.' },
    ],
    farmerBenefits: [
      'Stable yield across variable weather',
      'Preferred by millers',
    ],
    faq: [
      { question: 'Is DHARANI suited for heavy soils?', answer: 'Yes, it performs exceptionally well in heavy alluvial soils.' }
    ],
    available: true,
  },
  {
    id: 'mythri',
    name: 'MYTHRI',
    tagline: 'Fast Growth. High Return.',
    segment: 'RES',
    category: 'hybrid',
    isFlagship: false,
    duration: '120-125 Days',
    yieldPotential: '6.5–8.0 t/ha',
    grainType: 'Long Slender',
    diseaseResistance: 'Brown Spot, Blast',
    suitableRegions: ['Rayagada', 'Odisha', 'Andhra Pradesh'],
    keyBenefits: [
      'Short 120-125 day cycle',
      'Long slender grain attracts higher prices',
      'Good straw yield'
    ],
    description: 'MYTHRI brings together premium long-grain quality and a short 120-125 day cycle.',
    longDescription: 'MYTHRI is engineered for farmers who prioritize fast turnaround without compromising on grain quality. Its long slender grains and 120-125 day duration make it highly profitable.',
    color: '#C8981E',
    accentColor: '#FDF8E7',
    image: '/images/variety-mythri-v2.png',
    stats: { yield: 86, diseaseResistance: 85, maturity: 82, quality: 90 },
    performanceMetrics: [
      { label: 'Duration', value: '120-125 days', detail: 'Short duration' },
      { label: 'Segment', value: 'RES', detail: 'Research Variety' },
    ],
    advantages: [
      'Short duration',
      'Premium grain type',
    ],
    cultivationSteps: [
      { step: 1, title: 'Transplanting', description: 'Transplant 20-25 day seedlings.' },
      { step: 2, title: 'Harvest', description: 'Benefits from 1-day sun drying before threshing.' },
    ],
    farmerBenefits: [
      'Higher farmgate prices',
      'Faster crop turnover',
    ],
    faq: [
      { question: 'What is the grain type of MYTHRI?', answer: 'It produces long slender grains highly valued in the market.' }
    ],
    available: true,
  },
  {
    id: 'lalit',
    name: 'LALIT',
    tagline: 'Fine Grain. Premium Taste.',
    segment: 'RES',
    category: 'hybrid',
    isFlagship: false,
    duration: '120-125 Days',
    yieldPotential: '6.0–7.8 t/ha',
    grainType: 'Fine Long Slender',
    diseaseResistance: 'Blast, Sheath Blight',
    suitableRegions: ['Rayagada', 'Odisha', 'Telangana'],
    keyBenefits: [
      'Fine long-slender grain',
      'Aromatic profile',
      '120-125 day duration'
    ],
    description: 'LALIT brings together premium long-grain quality and exceptional resilience in a short cycle.',
    longDescription: 'LALIT is prized for its fine, long slender grains and aromatic profile. Completing its cycle in 120-125 days, it delivers premium eating quality and maximum value for the progressive farmer.',
    color: '#3D6B4F',
    accentColor: '#D5E9DC',
    image: '/images/variety-lalit-v2.png',
    stats: { yield: 82, diseaseResistance: 84, maturity: 82, quality: 95 },
    performanceMetrics: [
      { label: 'Duration', value: '120-125 days', detail: 'Short duration' },
      { label: 'Segment', value: 'RES', detail: 'Research Variety' },
    ],
    advantages: [
      'Fine long-slender grain',
      'Aromatic profile',
    ],
    cultivationSteps: [
      { step: 1, title: 'Nursery Preparation', description: 'Prepare wet nursery. Seed rate: 25 kg/ha.' },
      { step: 2, title: 'Pest Monitoring', description: 'Scout weekly from 21 DAT.' },
    ],
    farmerBenefits: [
      '10-15% price premium',
      'High demand in export markets',
    ],
    faq: [
      { question: 'Does LALIT have aroma?', answer: 'Yes, it has a subtle, pleasant aroma.' }
    ],
    badge: 'Export Quality',
    available: true,
  },
  {
    id: 'prathiba',
    name: 'PRATHIBA',
    tagline: 'The High-Performer',
    segment: 'RES',
    category: 'hybrid',
    isFlagship: true,
    duration: '110-115 Days',
    yieldPotential: '6.5–8.2 t/ha',
    grainType: 'Medium Slender',
    diseaseResistance: 'BLB, Blast, Brown Spot',
    suitableRegions: ['Rayagada', 'Odisha', 'Andhra Pradesh'],
    keyBenefits: [
      'Ultra-short 110-115 day cycle',
      'High yield potential for its duration',
      'Disease-resistant package'
    ],
    description: 'PRATHIBA is a breakthrough ultra-short duration variety delivering exceptional yields in just 110-115 days.',
    longDescription: 'PRATHIBA is Sarvadharani\'s ultra-fast RES variety. Maturing in just 110-115 days, it allows farmers unparalleled flexibility in cropping cycles while maintaining impressive yields and disease resistance.',
    color: '#C8981E',
    accentColor: '#FAF0C3',
    image: '/images/variety-prathiba-v2.png',
    stats: { yield: 86, diseaseResistance: 88, maturity: 95, quality: 88 },
    performanceMetrics: [
      { label: 'Duration', value: '110-115 days', detail: 'Ultra-short duration' },
      { label: 'Segment', value: 'RES', detail: 'Research Variety' },
    ],
    advantages: [
      'Ultra-short cycle',
      'Consistent yield',
    ],
    cultivationSteps: [
      { step: 1, title: 'Transplanting', description: 'Transplant 18-20 day seedlings due to short cycle.' },
      { step: 2, title: 'Fertilizer', description: 'Apply basal and top dress earlier than standard varieties.' },
    ],
    farmerBenefits: [
      'Fastest return on investment',
      'Avoid late-season weather risks',
    ],
    faq: [
      { question: 'Is PRATHIBA good for a third crop?', answer: 'Yes, its 110-115 day cycle makes it perfect for multi-cropping.' }
    ],
    badge: 'Fastest Maturity',
    available: true,
  }
];
