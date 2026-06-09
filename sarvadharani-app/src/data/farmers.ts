export interface FarmerStory {
  id: string;
  name: string;
  village: string;
  state: string;
  variety: string;
  yieldBefore: string;
  yieldAfter: string;
  improvement: string;
  quote: string;
  income: string;
  acres: string;
  avatar: string;
}

export const farmers: FarmerStory[] = [
  {
    id: '1',
    name: 'Ramu Naidu',
    village: 'Rayagada',
    state: 'Odisha',
    variety: 'MTU-1001',
    yieldBefore: '4.2 T/Acre',
    yieldAfter: '7.8 T/Acre',
    improvement: '+85%',
    quote:
      'MTU-1001 transformed my farm income completely. The yield improvement was beyond what I had imagined, and disease management costs dropped significantly.',
    income: '₹3.2L/Season',
    acres: '8 Acres',
    avatar: 'RP',
  },
  {
    id: '2',
    name: 'Lakshmi Devi',
    village: 'Kalyan Singpur',
    state: 'Odisha',
    variety: 'MTU-1156',
    yieldBefore: '3.8 T/Acre',
    yieldAfter: '6.9 T/Acre',
    improvement: '+81%',
    quote:
      'As a woman farmer, I was skeptical at first. But MTU-1156\'s results spoke for themselves. I now mentor other women farmers in my village to switch varieties.',
    income: '₹2.8L/Season',
    acres: '5 Acres',
    avatar: 'LD',
  },
  {
    id: '3',
    name: 'Suresh Reddy',
    village: 'Gunupur',
    state: 'Odisha',
    variety: 'SUVARNA',
    yieldBefore: '3.5 T/Acre',
    yieldAfter: '6.2 T/Acre',
    improvement: '+77%',
    quote:
      'SUVARNA fetches premium price in the market because of grain quality. Mandi traders specifically ask for my rice now. It changed my financial standing completely.',
    income: '₹2.9L/Season',
    acres: '6 Acres',
    avatar: 'SR',
  },
  {
    id: '4',
    name: 'Murali Krishna',
    village: 'Bissam Cuttack',
    state: 'Odisha',
    variety: 'DHARANI',
    yieldBefore: '4.5 T/Acre',
    yieldAfter: '8.1 T/Acre',
    improvement: '+80%',
    quote:
      'I was producing average yields for 15 years before DHARANI. Now I produce enough to fund my children\'s education and save for land expansion. Life-changing.',
    income: '₹4.1L/Season',
    acres: '12 Acres',
    avatar: 'MK',
  },
  {
    id: '5',
    name: 'Parvathi Amma',
    village: 'Padmapur',
    state: 'Odisha',
    variety: 'MYTHRI',
    yieldBefore: '3.2 T/Acre',
    yieldAfter: '5.8 T/Acre',
    improvement: '+81%',
    quote:
      'MYTHRI\'s grain quality got me direct contracts with an exporter. No more uncertainty about selling price. Sarvadharani Seeds are a true farmer\'s partner.',
    income: '₹2.2L/Season',
    acres: '4 Acres',
    avatar: 'PA',
  },
  {
    id: '6',
    name: 'Venkat Rao',
    village: 'Muniguda',
    state: 'Odisha',
    variety: 'MTU-1153',
    yieldBefore: '5.0 T/Acre',
    yieldAfter: '8.9 T/Acre',
    improvement: '+78%',
    quote:
      'The technical support from Sarvadharani field team was outstanding. They visited my farm, helped me optimize irrigation and nutrition. The yield results were extraordinary.',
    income: '₹5.2L/Season',
    acres: '15 Acres',
    avatar: 'VR',
  },
  {
    id: '7',
    name: 'Satyanarayana',
    village: 'Chandrapur',
    state: 'Odisha',
    variety: 'PRATHIBA',
    yieldBefore: '4.8 T/Acre',
    yieldAfter: '8.5 T/Acre',
    improvement: '+77%',
    quote:
      'PRATHIBA is the best decision I made in 20 years of farming. The disease resistance alone saved me ₹15,000/acre in fungicide cost. Net profit tripled.',
    income: '₹3.8L/Season',
    acres: '10 Acres',
    avatar: 'SN',
  },
  {
    id: '8',
    name: 'Bhavani Singh',
    village: 'Gudari',
    state: 'Odisha',
    variety: 'LALIT',
    yieldBefore: '3.6 T/Acre',
    yieldAfter: '6.5 T/Acre',
    improvement: '+80%',
    quote:
      'LALIT helped me tap into the premium grain market. My income per acre is now higher than what my father earned from the whole farm. Sarvadharani changed our family story.',
    income: '₹2.6L/Season',
    acres: '5 Acres',
    avatar: 'BS',
  },
];
