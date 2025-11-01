// Mock Data for IVO Launchpad and other features

export interface IVOProject {
  id: string;
  name: string;
  symbol: string;
  description: string;
  goal: number;
  raised: number;
  progress: number;
  participants: number;
  endDate: number;
  verified: boolean;
  category: 'DeFi' | 'NFT' | 'Gaming' | 'AI' | 'Infrastructure';
  tokenPrice: number;
  minInvestment: number;
  maxInvestment: number;
  network: 'Base' | 'Base Sepolia';
  website?: string;
  twitter?: string;
  telegram?: string;
}

export const ivoProjects: IVOProject[] = [
  {
    id: '1',
    name: 'BaseSwap Protocol',
    symbol: 'BSP',
    description: 'Next-generation AMM DEX built on Base Network with concentrated liquidity',
    goal: 500000,
    raised: 387500,
    progress: 77.5,
    participants: 1247,
    endDate: Date.now() + 15 * 24 * 60 * 60 * 1000, // 15 days from now
    verified: true,
    category: 'DeFi',
    tokenPrice: 0.15,
    minInvestment: 100,
    maxInvestment: 10000,
    network: 'Base',
    website: 'https://baseswap.example',
    twitter: 'https://x.com/baseswap',
    telegram: 'https://t.me/baseswap',
  },
  {
    id: '2',
    name: 'Base AI Agents',
    symbol: 'BAI',
    description: 'Decentralized AI agent marketplace powered by Base Network',
    goal: 750000,
    raised: 525000,
    progress: 70,
    participants: 892,
    endDate: Date.now() + 8 * 24 * 60 * 60 * 1000, // 8 days from now
    verified: true,
    category: 'AI',
    tokenPrice: 0.25,
    minInvestment: 50,
    maxInvestment: 5000,
    network: 'Base',
    website: 'https://baseai.example',
    twitter: 'https://x.com/baseai',
  },
  {
    id: '3',
    name: 'Meta Legends',
    symbol: 'MLG',
    description: 'Play-to-earn RPG game with NFT collectibles on Base',
    goal: 300000,
    raised: 165000,
    progress: 55,
    participants: 2134,
    endDate: Date.now() + 22 * 24 * 60 * 60 * 1000, // 22 days from now
    verified: false,
    category: 'Gaming',
    tokenPrice: 0.08,
    minInvestment: 25,
    maxInvestment: 2500,
    network: 'Base',
    telegram: 'https://t.me/metalegends',
  },
  {
    id: '4',
    name: 'BaseNFT Marketplace',
    symbol: 'BNFT',
    description: 'Premier NFT marketplace with AI-powered discovery on Base',
    goal: 450000,
    raised: 283500,
    progress: 63,
    participants: 678,
    endDate: Date.now() + 12 * 24 * 60 * 60 * 1000, // 12 days from now
    verified: true,
    category: 'NFT',
    tokenPrice: 0.20,
    minInvestment: 100,
    maxInvestment: 8000,
    network: 'Base',
    website: 'https://basenft.example',
    twitter: 'https://x.com/basenft',
  },
];

// Helper functions
export const getActiveIVOs = (): IVOProject[] => {
  return ivoProjects.filter(project => project.endDate > Date.now());
};

export const getIVOById = (id: string): IVOProject | undefined => {
  return ivoProjects.find(project => project.id === id);
};

export const getIVOsByCategory = (category: string): IVOProject[] => {
  return ivoProjects.filter(project => project.category === category);
};

export const formatTimeRemaining = (endDate: number): string => {
  const now = Date.now();
  const diff = endDate - now;
  
  if (diff <= 0) return 'Ended';
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (days > 0) {
    return `${days}d ${hours}h`;
  }
  return `${hours}h`;
};

export const formatUSD = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
