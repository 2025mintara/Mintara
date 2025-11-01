import { Suspense, lazy, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WalletProvider } from "@/components/WalletContext";
import { Toaster } from "@/components/ui/sonner";

const HomePage = lazy(() => import("@/pages/Home"));
const TokenBuilderPage = lazy(() => import("@/pages/TokenBuilder"));
const AINFTBuilderPage = lazy(() => import("@/pages/AINFTBuilder"));
const DashboardPage = lazy(() => import("@/pages/Dashboard"));
const LaunchpadPage = lazy(() => import("@/pages/Launchpad"));
const WhitepaperPage = lazy(() => import("@/pages/Whitepaper"));

function ScrollRestoration() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

function PageFallback() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="flex flex-col items-center gap-4 text-mintara-text-secondary">
        <div className="w-12 h-12 border-4 border-mintara-accent/30 border-t-mintara-accent rounded-full animate-spin" />
        <p className="text-sm tracking-wide uppercase">Loading Mintara Experience…</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <WalletProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <ScrollRestoration />
        <main className="flex-1">
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/token-builder" element={<TokenBuilderPage />} />
              <Route path="/ai-nft-builder" element={<AINFTBuilderPage />} />
              <Route path="/launchpad" element={<LaunchpadPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/whitepaper" element={<WhitepaperPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#03261B",
              color: "#E8FFF5",
              border: "1px solid #2C5E51",
            },
          }}
        />
      </div>
    </WalletProvider>
  );
}

export default App;
