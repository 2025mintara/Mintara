import { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X } from 'lucide-react';
import { WalletButton } from './WalletButton';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Token Builder', id: 'token-builder' },
    { label: 'AI NFT Builder', id: 'ai-nft-builder' },
    { label: 'Dashboard', id: 'dashboard' },
    { label: 'Whitepaper', id: 'whitepaper' },
    { label: 'Launchpad', id: 'launchpad' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-mintara-surface/90 backdrop-blur-xl border-b border-mintara-border shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Logo />
            <span className="text-xl font-semibold text-mintara-text-primary">
              Mintara
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 font-semibold ${
                  currentPage === item.id
                    ? 'text-mintara-accent bg-mintara-accent/10'
                    : 'text-mintara-text-primary hover:text-mintara-accent hover:bg-mintara-surface/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Connect Wallet Button */}
          <div className="hidden md:block">
            <WalletButton />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-mintara-text-primary hover:text-mintara-accent transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-mintara-surface/95 backdrop-blur-xl border-t border-mintara-border">
          <div className="max-w-[1200px] mx-auto px-6 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-semibold ${
                  currentPage === item.id
                    ? 'text-mintara-accent bg-mintara-accent/10'
                    : 'text-mintara-text-primary hover:text-mintara-accent hover:bg-mintara-surface/50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="mt-4">
              <WalletButton />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
