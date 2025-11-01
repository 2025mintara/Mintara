import { Link } from "react-router-dom";
import { Twitter, Send, Github } from "lucide-react";

import { Logo } from "./Logo";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Token Builder", to: "/token-builder" },
  { label: "AI NFT Builder", to: "/ai-nft-builder" },
  { label: "Launchpad", to: "/launchpad" },
  { label: "Whitepaper", to: "/whitepaper" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-32">
      {/* Main Footer */}
      <div className="bg-mintara-surface/90 backdrop-blur-xl border-t border-mintara-border shadow-lg">
        <div className="max-w-[1200px] mx-auto px-10 py-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Logo Block */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Logo className="w-12 h-12" />
                <span className="font-semibold text-mintara-text-primary text-xl">
                  Mintara
                </span>
              </div>
              <p className="text-sm text-mintara-text-primary/80 leading-relaxed">
                No-code token & AI NFT builder on Base Network.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-mintara-text-primary mb-4">Quick Links</h3>
              <ul className="space-y-2.5">
                {quickLinks.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-sm text-mintara-text-primary/90 hover:text-mintara-accent transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-mintara-text-primary mb-4">
                Resources
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href="https://basescan.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-mintara-text-primary/90 hover:text-mintara-accent transition-colors"
                  >
                    BaseScan
                  </a>
                </li>
                <li>
                  <a
                    href="https://base.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-mintara-text-primary/90 hover:text-mintara-accent transition-colors"
                  >
                    Base Network
                  </a>
                </li>
                <li>
                  <Link
                    to="/whitepaper"
                    className="text-sm text-mintara-text-primary/90 hover:text-mintara-accent transition-colors"
                  >
                    Docs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="font-semibold text-mintara-text-primary mb-4">
                Connect
              </h3>
              <div className="flex items-center gap-3">
                <a
                  href="https://x.com/mintaratoken"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full border border-mintara-border flex items-center justify-center text-mintara-text-primary/90 hover:text-mintara-accent hover:border-mintara-accent hover:scale-110 hover:shadow-[inset_0_0_12px_rgba(0,224,198,0.2)] transition-all duration-250"
                  aria-label="X (Twitter)"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://t.me/mintaratoken"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full border border-mintara-border flex items-center justify-center text-mintara-text-primary/90 hover:text-mintara-accent hover:border-mintara-accent hover:scale-110 hover:shadow-[inset_0_0_12px_rgba(0,224,198,0.2)] transition-all duration-250"
                  aria-label="Telegram"
                >
                  <Send className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/2025mintara/Mintara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full border border-mintara-border flex items-center justify-center text-mintara-text-primary/90 hover:text-mintara-accent hover:border-mintara-accent hover:scale-110 hover:shadow-[inset_0_0_12px_rgba(0,224,198,0.2)] transition-all duration-250"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-mintara-surface/90 backdrop-blur-xl border-t border-mintara-border shadow-lg">
        <div className="max-w-[1200px] mx-auto px-10 py-5">
          <p className="text-xs text-mintara-text-primary/70 text-center font-medium">
            © {currentYear} Mintara – Base Network Token & AI NFT Builder
          </p>
        </div>
      </div>
    </footer>
  );
}
