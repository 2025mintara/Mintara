import { Sparkles, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { WalletButton } from "@/components/WalletButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "No Code",
    description: "Launch without writing a single line.",
  },
  {
    icon: Shield,
    title: "Low Fees (1 USDC)",
    description: "Flat pricing on Base.",
  },
  {
    icon: Sparkles,
    title: "AI NFT Builder",
    description: "Generate, preview, and mint in seconds.",
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-mintara-primary/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-80 h-80 bg-mintara-accent/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative max-w-[1200px] mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-semibold text-mintara-text-primary mb-6 leading-tight">
            Create, Mint, and Build
            <br />
            <span className="bg-gradient-to-r from-mintara-primary via-mintara-accent to-mintara-soft-lime-glow bg-clip-text text-transparent">
              on Base.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-mintara-text-secondary mb-12 max-w-2xl mx-auto">
            Your all-in-one token and NFT creation suite.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={() => navigate("/token-builder")} size="lg">
              Launch Token Builder
            </Button>
            <Button onClick={() => navigate("/ai-nft-builder")} variant="outline" size="lg">
              Explore AI NFT Builder
            </Button>
          </div>

          <div className="mt-6 flex justify-center">
            <div className="scale-125">
              <WalletButton />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-mintara-text-primary mb-16">
            Why Choose Mintara
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="relative p-8 bg-mintara-surface/50 border-mintara-border hover:border-mintara-accent/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-mintara-accent/20 group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-mintara-accent/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-mintara-primary/20 flex items-center justify-center mb-6 group-hover:bg-mintara-primary/30 transition-colors">
                    <feature.icon className="w-7 h-7 text-mintara-accent" />
                  </div>

                  <h3 className="text-xl font-semibold text-mintara-text-primary mb-3">{feature.title}</h3>

                  <p className="text-mintara-text-secondary">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <Card className="relative p-12 md:p-16 bg-gradient-to-br from-mintara-surface/80 to-mintara-primary/10 border-mintara-border overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-mintara-accent/10 rounded-full blur-3xl" />

            <div className="relative text-center">
              <h2 className="text-3xl md:text-5xl font-semibold text-mintara-text-primary mb-6">
                Ready to Start Building?
              </h2>
              <p className="text-xl text-mintara-text-secondary mb-8 max-w-2xl mx-auto">
                Join the future of Web3 creation on Base Network.
              </p>
              <Button onClick={() => navigate("/token-builder")} size="lg">
                Get Started Now
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
