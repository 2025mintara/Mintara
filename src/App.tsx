import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './components/pages/Home';
import { TokenBuilder } from './components/pages/TokenBuilder';
import { AINFTBuilder } from './components/pages/AINFTBuilder';
import { Dashboard } from './components/pages/Dashboard';
import { Whitepaper } from './components/pages/Whitepaper';
import { Launchpad } from './components/pages/Launchpad';
import { Toaster } from './components/ui/sonner';
import { WalletProvider } from './components/WalletContext';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // Add page transition animation
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.3s ease-in-out';
      document.body.style.opacity = '1';
    }, 10);
  }, [currentPage]);

  return (
    <WalletProvider>
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
    </WalletProvider>
  );
}

export default App;
