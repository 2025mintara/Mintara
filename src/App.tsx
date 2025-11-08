import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Home } from '@/components/pages/Home';
import { TokenBuilder } from '@/components/pages/TokenBuilder';
import { AINFTBuilder } from '@/components/pages/AINFTBuilder';
import { Dashboard } from '@/components/pages/Dashboard';
import { Whitepaper } from '@/components/pages/Whitepaper';
import { Launchpad } from '@/components/pages/Launchpad';
import { Toaster } from '@/components/ui/sonner';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { base } from 'wagmi/chains';
import { getDefaultConfig, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { FarcasterProvider } from '@/contexts/FarcasterContext';
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

const wagmiConfig = getDefaultConfig({
  appName: 'Mintara Base',
  projectId: '3fbb6bba6f1de962d911bb5b5c9dba88',
  chains: [base],
  ssr: false,
});

function App() {
  const getPageFromPath = () => {
    const path = window.location.pathname;
    if (path === '/token-builder') return 'token-builder';
    if (path === '/ai-nft-builder') return 'ai-nft-builder';
    if (path === '/dashboard') return 'dashboard';
    if (path === '/whitepaper') return 'whitepaper';
    if (path === '/launchpad') return 'launchpad';
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState(getPageFromPath());

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.history.pushState({}, '', page === 'home' ? '/' : `/${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromPath());
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    // Add page transition animation
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.3s ease-in-out';
      document.body.style.opacity = '1';
    }, 10);
  }, [currentPage]);

  return (
    <FarcasterProvider>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            theme={lightTheme({
              accentColor: '#00A676',
              accentColorForeground: 'white',
              borderRadius: 'medium',
              fontStack: 'system',
            })}
            initialChain={base}
          >
            <OnchainKitProvider
              apiKey={import.meta.env.VITE_ONCHAINKIT_API_KEY}
              chain={base}
              config={{
                appearance: {
                  name: 'Mintara Base',
                  logo: `${window.location.origin}/logo.svg`,
                  mode: 'auto',
                  theme: 'default',
                },
                wallet: {
                  display: 'modal',
              },
            }}
          >
            <div className="min-h-screen">
              <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
              
              <main>
                {currentPage === 'home' && <Home onNavigate={handleNavigate} />}
                {currentPage === 'token-builder' && <TokenBuilder onNavigate={handleNavigate} />}
                {currentPage === 'ai-nft-builder' && <AINFTBuilder onNavigate={handleNavigate} />}
                {currentPage === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
                {currentPage === 'whitepaper' && <Whitepaper />}
                {currentPage === 'launchpad' && <Launchpad onNavigate={handleNavigate} />}
              </main>

              <Footer onNavigate={handleNavigate} />
              <Toaster
                position="bottom-right"
                toastOptions={{
                  style: {
                    background: '#03261B',
                    color: '#E8FFF5',
                    border: '1px solid #2C5E51',
                  },
                }}
              />
            </div>
          </OnchainKitProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </FarcasterProvider>
  );
}

export default App;
