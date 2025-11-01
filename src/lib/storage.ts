// Local Storage Helper Functions for Dashboard Data
export interface UserToken {
  id: string;
  name: string;
  symbol: string;
  address: string;
  totalSupply: string;
  decimals: number;
  description?: string;
  logoUrl?: string;
  network: 'Base' | 'Base Sepolia';
  createdAt: number;
  txHash: string;
}

export interface UserNFT {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  tokenId: string;
  contractAddress: string;
  network: 'Base' | 'Base Sepolia';
  createdAt: number;
  metadata: {
    ipfsUri: string;
    attributes?: Array<{
      trait_type: string;
      value: string | number;
    }>;
  };
}

const STORAGE_KEYS = {
  TOKENS: 'mintara_user_tokens',
  NFTS: 'mintara_user_nfts',
  CREDITS: 'mintara_user_credits',
  RECENT_PROMPTS: 'mintara_recent_prompts',
};

// Token Management
export const saveToken = (token: UserToken): void => {
  const tokens = getUserTokens();
  tokens.unshift(token);
  localStorage.setItem(STORAGE_KEYS.TOKENS, JSON.stringify(tokens));
};

export const getUserTokens = (): UserToken[] => {
  const data = localStorage.getItem(STORAGE_KEYS.TOKENS);
  return data ? JSON.parse(data) : [];
};

export const deleteToken = (tokenId: string): void => {
  const tokens = getUserTokens().filter(t => t.id !== tokenId);
  localStorage.setItem(STORAGE_KEYS.TOKENS, JSON.stringify(tokens));
};

// NFT Management
export const saveNFT = (nft: UserNFT): void => {
  const nfts = getUserNFTs();
  nfts.unshift(nft);
  localStorage.setItem(STORAGE_KEYS.NFTS, JSON.stringify(nfts));
};

export const getUserNFTs = (): UserNFT[] => {
  const data = localStorage.getItem(STORAGE_KEYS.NFTS);
  return data ? JSON.parse(data) : [];
};

export const deleteNFT = (nftId: string): void => {
  const nfts = getUserNFTs().filter(n => n.id !== nftId);
  localStorage.setItem(STORAGE_KEYS.NFTS, JSON.stringify(nfts));
};

// Credits Management
export const getUserCredits = (): number => {
  const data = localStorage.getItem(STORAGE_KEYS.CREDITS);
  return data ? parseInt(data, 10) : 0;
};

export const addCredits = (amount: number): void => {
  const current = getUserCredits();
  localStorage.setItem(STORAGE_KEYS.CREDITS, (current + amount).toString());
};

export const useCredit = (): boolean => {
  const current = getUserCredits();
  if (current > 0) {
    localStorage.setItem(STORAGE_KEYS.CREDITS, (current - 1).toString());
    return true;
  }
  return false;
};

// Recent Prompts Management
export const getRecentPrompts = (): string[] => {
  const data = localStorage.getItem(STORAGE_KEYS.RECENT_PROMPTS);
  return data ? JSON.parse(data) : [];
};

export const addRecentPrompt = (prompt: string): void => {
  const prompts = getRecentPrompts();
  if (!prompts.includes(prompt)) {
    prompts.unshift(prompt);
    // Keep only last 10 prompts
    const limited = prompts.slice(0, 10);
    localStorage.setItem(STORAGE_KEYS.RECENT_PROMPTS, JSON.stringify(limited));
  }
};

// Clear all user data
export const clearAllData = (): void => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};

// Export/Import data
export const exportUserData = (): string => {
  const data = {
    tokens: getUserTokens(),
    nfts: getUserNFTs(),
    credits: getUserCredits(),
    recentPrompts: getRecentPrompts(),
  };
  return JSON.stringify(data, null, 2);
};

export const importUserData = (jsonData: string): boolean => {
  try {
    const data = JSON.parse(jsonData);
    if (data.tokens) localStorage.setItem(STORAGE_KEYS.TOKENS, JSON.stringify(data.tokens));
    if (data.nfts) localStorage.setItem(STORAGE_KEYS.NFTS, JSON.stringify(data.nfts));
    if (data.credits) localStorage.setItem(STORAGE_KEYS.CREDITS, data.credits.toString());
    if (data.recentPrompts) localStorage.setItem(STORAGE_KEYS.RECENT_PROMPTS, JSON.stringify(data.recentPrompts));
    return true;
  } catch (error) {
    console.error('Failed to import user data:', error);
    return false;
  }
};
