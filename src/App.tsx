import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
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

// Navigation wrapper component
function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (page: string) => {
    const routes: Record<string, string> = {
      'home': '/',
      'token-builder': '/token-builder',
      'ai-nft-builder': '/ai-nft-builder',
      'dashboard': '/dashboard',
      'whitepaper': '/whitepaper',
      'launchpad': '/launchpad',
    };
    
    const path = routes[page] || '/';
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // Add page transition animation
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.3s ease-in-out';
      document.body.style.opacity = '1';
    }, 10);
  }, [location.pathname]);

  // Get current page name from pathname
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    // Convert /token-builder to token-builder, etc.
    return path.slice(1);
  };

  return (
    <div className="min-h-screen">
      <Navbar currentPage={getCurrentPage()} onNavigate={handleNavigate} />
      
      <main>
        <Routes>
          <Route path="/" element={<Home onNavigate={handleNavigate} />} />
          <Route path="/token-builder" element={<TokenBuilder onNavigate={handleNavigate} />} />
          <Route path="/ai-nft-builder" element={<AINFTBuilder onNavigate={handleNavigate} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/whitepaper" element={<Whitepaper />} />
          <Route path="/launchpad" element={<Launchpad onNavigate={handleNavigate} />} />
        </Routes>
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
  );
}

function App() {
  return (
    <BrowserRouter>
      <WalletProvider>
        <AppContent />
      </WalletProvider>
    </BrowserRouter>
  );
}

export default App;
