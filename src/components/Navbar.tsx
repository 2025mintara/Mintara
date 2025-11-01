import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { Logo } from "./Logo";
import { WalletButton } from "./WalletButton";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Token Builder", to: "/token-builder" },
  { label: "AI NFT Builder", to: "/ai-nft-builder" },
  { label: "Launchpad", to: "/launchpad" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "Whitepaper", to: "/whitepaper" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-mintara-surface/90 backdrop-blur-xl border-b border-mintara-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Logo />
            <span className="text-xl font-semibold text-mintara-text-primary">Mintara</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition-all duration-200 font-semibold ${
                    isActive
                      ? "text-mintara-accent bg-mintara-accent/10"
                      : "text-mintara-text-primary hover:text-mintara-accent hover:bg-mintara-surface/50"
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </NavLink>
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
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-semibold ${
                    isActive
                      ? "text-mintara-accent bg-mintara-accent/10"
                      : "text-mintara-text-primary hover:text-mintara-accent hover:bg-mintara-surface/50"
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </NavLink>
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
