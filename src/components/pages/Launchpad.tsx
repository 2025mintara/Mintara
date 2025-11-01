import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Rocket, TrendingUp, Clock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAccount } from 'wagmi';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';

interface LaunchpadProps {
  onNavigate: (page: string) => void;
}

interface IVO {
  id: string;
  name: string;
  symbol: string;
  goal: string;
  current: string;
  participants: number;
  verified: boolean;
  endDate: string;
  description: string;
  tokenPrice: string;
}

export function Launchpad({ onNavigate }: LaunchpadProps) {
  const { address } = useAccount();
  const [ivos, setIvos] = useState<IVO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [participating, setParticipating] = useState<string | null>(null);

  useEffect(() => {
    // Load IVOs from mock data or API
    const mockIVOs: IVO[] = [
      {
        id: '1',
        name: 'Base Launch Protocol',
        symbol: 'BLP',
        goal: '500000',
        current: '325000',
        participants: 1247,
        verified: true,
        endDate: '2025-03-15',
        description: 'A revolutionary protocol for launching tokens on Base Network',
        tokenPrice: '0.05',
      },
      {
        id: '2',
        name: 'Decentralized AI Platform',
        symbol: 'DAIP',
        goal: '1000000',
        current: '780000',
        participants: 2156,
        verified: true,
        endDate: '2025-04-01',
        description: 'AI-powered decentralized computing platform',
        tokenPrice: '0.10',
      },
      {
        id: '3',
        name: 'Community Governance Token',
        symbol: 'CGT',
        goal: '250000',
        current: '89000',
        participants: 534,
        verified: false,
        endDate: '2025-03-20',
        description: 'Community-driven governance token for Base ecosystem',
        tokenPrice: '0.02',
      },
    ];

    setTimeout(() => {
      setIvos(mockIVOs);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleParticipate = async (ivo: IVO) => {
    if (!address) {
      toast.error('Please connect your wallet first');
      return;
    }

    try {
      setParticipating(ivo.id);
      
      // Simulate participation transaction
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Save participation to localStorage
      const participation = {
        ivoId: ivo.id,
        ivoName: ivo.name,
        symbol: ivo.symbol,
        walletAddress: address,
        participatedAt: new Date().toISOString(),
        amount: '100', // Default participation amount
      };

      const existing = JSON.parse(localStorage.getItem('mintara_ivo_participations') || '[]');
      existing.push(participation);
      localStorage.setItem('mintara_ivo_participations', JSON.stringify(existing));

      toast.success(`Successfully participated in ${ivo.name}!`);
    } catch (error) {
      console.error('Participation error:', error);
      toast.error('Failed to participate. Please try again.');
    } finally {
      setParticipating(null);
    }
  };

  const getProgressPercentage = (current: string, goal: string) => {
    const currentNum = parseFloat(current);
    const goalNum = parseFloat(goal);
    return Math.min((currentNum / goalNum) * 100, 100);
  };

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

        {/* IVO Launchpad Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-mintara-text-primary mb-4">
              Active Initial Validator Offerings (IVO)
            </h2>
            <p className="text-mintara-text-secondary max-w-2xl mx-auto">
              Participate in upcoming token launches and support innovative projects on Base Network
            </p>
          </div>

          {isLoading ? (
            <Card className="p-12 bg-mintara-surface/50 border-mintara-border text-center">
              <Loader2 className="w-8 h-8 text-mintara-accent animate-spin mx-auto mb-4" />
              <p className="text-mintara-text-secondary">Loading active IVOs...</p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {ivos.map((ivo) => {
                const progress = getProgressPercentage(ivo.current, ivo.goal);
                const remainingDays = Math.ceil(
                  (new Date(ivo.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                );

                return (
                  <Card
                    key={ivo.id}
                    className="p-6 bg-mintara-surface/50 border-mintara-border backdrop-blur-sm hover:border-mintara-accent/50 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-mintara-text-primary">
                            {ivo.name}
                          </h3>
                          {ivo.verified && (
                            <Badge className="bg-mintara-accent/20 text-mintara-accent border-mintara-accent/30">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-mintara-text-secondary mb-1">
                          {ivo.symbol} ? {ivo.tokenPrice} USDC per token
                        </p>
                        <p className="text-xs text-mintara-text-secondary line-clamp-2">
                          {ivo.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-mintara-text-secondary">Progress</span>
                        <span className="text-mintara-text-primary font-medium">
                          {progress.toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <div className="flex justify-between text-xs text-mintara-text-secondary">
                        <span>
                          {parseFloat(ivo.current).toLocaleString()} / {parseFloat(ivo.goal).toLocaleString()} USDC
                        </span>
                        <span>{ivo.participants} participants</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4 text-xs text-mintara-text-secondary">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {remainingDays > 0 ? `${remainingDays} days left` : 'Ended'}
                      </span>
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => handleParticipate(ivo)}
                      disabled={participating === ivo.id || !address || remainingDays <= 0}
                    >
                      {participating === ivo.id ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : remainingDays <= 0 ? (
                        'Ended'
                      ) : (
                        'Participate'
                      )}
                    </Button>
                  </Card>
                );
              })}
            </div>
          )}

          {!isLoading && ivos.length === 0 && (
            <Card className="p-12 bg-mintara-surface/50 border-mintara-border text-center">
              <Rocket className="w-12 h-12 text-mintara-accent mx-auto mb-4 opacity-50" />
              <p className="text-mintara-text-secondary mb-2">
                No active IVOs at the moment
              </p>
              <p className="text-sm text-mintara-text-secondary">
                Check back soon for new opportunities!
              </p>
            </Card>
          )}
        </div>

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
