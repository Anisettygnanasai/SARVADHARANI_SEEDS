// Sarvadharani Seeds Design Token System

export const colors = {
  ivory: '#FDFAF4',
  riceWhite: '#F9F6EE',
  paddyGold: {
    50: '#FDF8E7',
    100: '#FAF0C3',
    200: '#F5E08A',
    300: '#EFD050',
    400: '#E8BE24',
    500: '#C8981E',
    600: '#A37818',
    700: '#7D5C12',
    800: '#5C420D',
    900: '#3D2C08',
    DEFAULT: '#C8981E',
  },
  naturalGreen: {
    50: '#EDF5F0',
    100: '#D5E9DC',
    200: '#A8D2B8',
    300: '#79BA93',
    400: '#52A370',
    500: '#3D6B4F',
    600: '#2E5340',
    700: '#213D30',
    DEFAULT: '#3D6B4F',
  },
  earthBrown: {
    50: '#F5EDE4',
    100: '#E8D5C2',
    200: '#D0AB87',
    300: '#B8814D',
    400: '#8F6035',
    500: '#6B4C2A',
    DEFAULT: '#6B4C2A',
  },
  deepForest: '#1A3526',
  warmGray: '#8A8070',
} as const;

export const fonts = {
  cormorant: 'var(--font-cormorant)',
  jakarta: 'var(--font-jakarta)',
  inter: 'var(--font-inter)',
} as const;

export const easings = {
  spring: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  smooth: [0.4, 0, 0.2, 1] as [number, number, number, number],
  expo: [0.16, 1, 0.3, 1] as [number, number, number, number],
  snappy: [0.77, 0, 0.18, 1] as [number, number, number, number],
} as const;

export const durations = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.8,
  xslow: 1.2,
} as const;

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const spacing = {
  sectionPaddingY: { base: '7rem', lg: '10rem' },
  containerPaddingX: { base: '2rem', md: '4rem', xl: '6rem' },
  maxWidth: '1440px',
} as const;
