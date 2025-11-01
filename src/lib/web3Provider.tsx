// Web3 Provider Setup with wagmi + RainbowKit
import { WagmiProvider, createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { ReactNode } from 'react';

const queryClient = new QueryClient();

// Get default wallets from RainbowKit
const { connectors } = getDefaultWallets({
  appName: 'Mintara Base',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'your-project-id',
  chains: [base],
});

// Configure wagmi for Base Mainnet
const config = createConfig({
  chains: [base],
  connectors,
  transports: {
    [base.id]: http(import.meta.env.VITE_BASE_RPC_URL || 'https://mainnet.base.org'),
  },
});

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
