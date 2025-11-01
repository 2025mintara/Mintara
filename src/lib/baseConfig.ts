// Base Network Configuration
export const BASE_CONFIG = {
  chainId: 8453, // Base Mainnet
  chainName: 'Base',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [import.meta.env.VITE_BASE_RPC_URL || 'https://mainnet.base.org'],
    },
    public: {
      http: [import.meta.env.VITE_BASE_RPC_URL || 'https://mainnet.base.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'BaseScan',
      url: 'https://basescan.org',
    },
  },
};

export const DEPLOYMENT_FEE = {
  ETH: '0.0005', // 0.0005 ETH equivalent
  USDC: '1', // 1 USDC
};

export const TOKEN_DEFAULTS = {
  decimals: 18,
  supply: '1000000000', // 1 billion
};
