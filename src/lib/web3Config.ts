// Web3 Configuration for Base Network
import { http, createConfig } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

// Base Network Configuration
export const baseNetworkConfig = {
  chainId: base.id,
  name: 'Base',
  currency: 'ETH',
  explorerUrl: 'https://basescan.org',
  rpcUrl: 'https://mainnet.base.org',
};

// Wagmi Configuration
export const config = createConfig({
  chains: [base, baseSepolia],
  connectors: [
    injected(),
    walletConnect({
      projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'default-project-id',
    }),
  ],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});

// Network helper functions
export const isBaseNetwork = (chainId: number) => chainId === base.id;
export const switchToBase = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${base.id.toString(16)}` }],
      });
    } catch (error) {
      console.error('Failed to switch to Base network:', error);
    }
  }
};
