import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Rocket, TrendingUp, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface LaunchpadProps {
  onNavigate: (page: string) => void;
}

export function Launchpad({ onNavigate }: LaunchpadProps) {
  return (
    <div className="min-h-screen pt-32 px-6 py-16">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold text-mintara-text-primary mb-4">
            Launchpad
          </h1>
          <p className="text-xl text-mintara-text-secondary">
            Launch your token with liquidity and community support
          </p>
        </div>

        {/* Main Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* DEX Listing */}
          <Card className="p-8 md:p-12 bg-mintara-surface/50 border-mintara-border backdrop-blur-sm hover:border-mintara-accent/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-mintara-primary/20 flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-mintara-accent" />
              </div>
              <h2 className="text-2xl font-semibold text-mintara-text-primary">
                List on DEX
              </h2>
            </div>

            <p className="text-mintara-text-secondary mb-8">
              Deploy your token with instant liquidity on leading Base Network decentralized exchanges.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-mintara-accent"></div>
                <span className="text-mintara-text-primary">BaseSwap Integration</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-mintara-accent"></div>
                <span className="text-mintara-text-primary">Uniswap V3 Support</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-mintara-accent"></div>
                <span className="text-mintara-text-primary">Automated Liquidity Pools</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-mintara-accent"></div>
                <span className="text-mintara-text-primary">Price Chart Analytics</span>
              </div>
            </div>

            <Button
              className="w-full"
              onClick={() => {
                toast.info('Connecting to DEX listing service...');
                setTimeout(() => {
                  window.open('https://base.org', '_blank');
                }, 500);
              }}
            >
              List Your Token
            </Button>
          </Card>

          {/* Mintara Launchpad */}
          <Card className="relative p-8 md:p-12 bg-gradient-to-br from-mintara-surface/80 to-mintara-primary/10 border-mintara-border backdrop-blur-sm overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-mintara-accent/10 rounded-full blur-3xl"></div>
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-xl bg-mintara-accent/20 flex items-center justify-center">
                  <Rocket className="w-7 h-7 text-mintara-accent" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-mintara-text-primary">
                    Mintara Launchpad
                  </h2>
                  <span className="inline-block mt-1 px-3 py-1 rounded-full bg-mintara-warning/20 text-mintara-warning text-xs font-medium">
                    Coming Soon
                  </span>
                </div>
              </div>

              <p className="text-mintara-text-secondary mb-8">
                Our native launchpad will provide comprehensive token launch services with
                community building, marketing support, and guaranteed liquidity.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-mintara-soft-lime-glow"></div>
                  <span className="text-mintara-text-primary">Presale Management</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-mintara-soft-lime-glow"></div>
                  <span className="text-mintara-text-primary">Whitelist & KYC Tools</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-mintara-soft-lime-glow"></div>
                  <span className="text-mintara-text-primary">Marketing Support</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-mintara-soft-lime-glow"></div>
                  <span className="text-mintara-text-primary">Community Governance</span>
                </div>
              </div>

              <Button
                disabled
                variant="ghost"
                className="w-full cursor-not-allowed opacity-50"
              >
                <Clock className="w-4 h-4 mr-2" />
                Coming Q2 2025
              </Button>
            </div>
          </Card>
        </div>

        {/* Features Section */}
        <Card className="p-8 md:p-12 bg-mintara-surface/50 border-mintara-border backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-mintara-text-primary mb-8 text-center">
            Why Launch with Mintara?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Base Network Native',
                description: 'Built specifically for Base ecosystem with optimized gas fees and seamless integration.',
              },
              {
                title: 'Instant Liquidity',
                description: 'Deploy with liquidity pools automatically created and managed on leading DEXs.',
              },
              {
                title: 'Comprehensive Tools',
                description: 'From token creation to launch and beyond, all tools you need in one platform.',
              },
            ].map((feature, index) => (
              <div key={index} className="text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-mintara-primary/20 flex items-center justify-center mx-auto">
                  <div className="w-3 h-3 rounded-full bg-mintara-accent"></div>
                </div>
                <h3 className="text-lg font-semibold text-mintara-text-primary">
                  {feature.title}
                </h3>
                <p className="text-mintara-text-secondary text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <Card className="p-12 bg-gradient-to-br from-mintara-surface/80 to-mintara-primary/10 border-mintara-border backdrop-blur-sm">
            <h2 className="text-3xl font-semibold text-mintara-text-primary mb-4">
              Ready to Launch Your Project?
            </h2>
            <p className="text-mintara-text-secondary mb-8 max-w-2xl mx-auto">
              Join the Base ecosystem and bring your token to market with Mintara's
              comprehensive launch solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => onNavigate('token-builder')}
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate('whitepaper')}
              >
                Learn More
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
