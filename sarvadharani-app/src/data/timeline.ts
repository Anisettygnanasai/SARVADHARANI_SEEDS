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
    title: 'Company Established',
    description:
      'Focused on providing quality rice seed solutions to farming communities.',
    highlight: 'Founded in Rayagada, Odisha',
    icon: '🌾',
    isFuture: false,
  },
  {
    year: '2026',
    title: 'Growth & Farmer Reach',
    description:
      'Strengthening farmer partnerships and expanding agricultural support across regions.',
    highlight: '500+ Partner Farmers',
    icon: '🤝',
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
