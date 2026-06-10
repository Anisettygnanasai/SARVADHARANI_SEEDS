export interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
  highlight: string;
  icon: string;
  isFuture?: boolean;
}

export const timeline: TimelineMilestone[] = [
  {
    year: '2024',
    title: 'Sarvadharani Seeds Founded',
    description:
      'Company established in Rayagada, Odisha with a bold mission — to bring science-backed, premium rice seeds directly to farmers. Three passionate agricultural experts join forces to change what farmers expect from a seed company.',
    highlight: 'Founded in Rayagada, Odisha — February 2024',
    icon: '🌱',
    isFuture: false,
  },
  {
    year: '2024',
    title: 'Expanded Product Portfolio',
    description:
      'MTU-1001 and MTU-1156 — our first two high-quality varieties — added to our portfolio after rigorous field evaluation across Odisha districts. Early farmer feedback confirms what our evaluations showed: these seeds deliver.',
    highlight: 'MTU-1001 & MTU-1156 distributed to market',
    icon: '🌾',
    isFuture: false,
  },
  {
    year: '2025',
    title: 'Strengthening Farmer Reach',
    description:
      'SUVARNA, DHARANI, MYTHRI, LALIT, PRATHIBA, MTU-1153, MTU-7029 added to our distribution network — covering all major soil types and growing conditions. First dealer network activated across Rayagada.',
    highlight: '9 varieties available + 50+ dealer points',
    icon: '🔬',
    isFuture: false,
  },
  {
    year: '2025–26',
    title: '500+ Farmer Partnerships',
    description:
      'Direct farmer engagement program launched — free agronomy advisory, field demonstration plots, and season-long support across partner districts. Every farmer who joins our network gets our personal commitment.',
    highlight: '500+ farmers directly partnered across Andhra Pradesh',
    icon: '🤝',
    isFuture: false,
  },
  {
    year: '2027',
    title: '5-State Expansion (Vision)',
    description:
      'Planned expansion of our distribution network to Telangana, Karnataka, Tamil Nadu, and Odisha — bringing Sarvadharani\'s proven varieties to more farmers across South India.',
    highlight: 'Target: Full South India coverage with 5,000+ farmer network',
    icon: '🗺️',
    isFuture: true,
  },
  {
    year: '2028',
    title: 'Research Station (Planned)',
    description:
      'A dedicated seed research facility planned for Guntur district — accelerating our ability to evaluate and select the best climate-resilient varieties for future farmers.',
    highlight: 'Dedicated R&D evaluation facility',
    icon: '🏭',
    isFuture: true,
  },
  {
    year: '2030',
    title: 'Vision 2030',
    description:
      'To become the #1 premium rice seed brand in Andhra Pradesh and a top-10 seed company in South India — measured not by company size, but by the prosperity of every farmer partner we serve.',
    highlight: '#1 premium rice seed brand in Andhra Pradesh',
    icon: '🚀',
    isFuture: true,
  },
];
