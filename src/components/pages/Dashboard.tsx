import { useState } from 'react';
import { ExternalLink, Share2, Coins, MessageCircle, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { toast } from 'sonner';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [chatOpen, setChatOpen] = useState(false);
  const [tokenType, setTokenType] = useState('meme');

  const myTokens = [
    {
      name: 'My Awesome Token',
      symbol: 'MAT',
      address: '0x1234...5678',
      type: 'token',
    },
    {
      name: 'Cool NFT Collection',
      symbol: 'CNC',
      address: '0xabcd...ef01',
      type: 'nft',
    },
  ];

  const tokenomicsRecommendations: Record<string, any> = {
    meme: {
      supply: '1,000,000,000',
      decimals: '9',
      liquidity: '5-10%',
      vesting: 'None',
    },
    utility: {
      supply: '100,000,000',
      decimals: '18',
      liquidity: '15-20%',
      vesting: '12-24 months',
    },
    governance: {
      supply: '10,000,000',
      decimals: '18',
      liquidity: '10-15%',
      vesting: '24-48 months',
    },
    charity: {
      supply: '500,000,000',
      decimals: '18',
      liquidity: '10%',
      vesting: '6-12 months',
    },
  };

  const handleApplyToForm = () => {
    toast.success('Tokenomics applied to form!', {
      description: 'Your settings have been updated.',
    });
  };

  return (
    <div className="min-h-screen pt-32 px-6 py-16">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-4xl md:text-5xl font-semibold text-mintara-text-primary mb-2">
          Dashboard
        </h1>
        <p className="text-xl text-mintara-text-secondary mb-12">
          My Creations & AI Assistant
        </p>

        <Tabs defaultValue="creations" className="space-y-8">
          <TabsList className="bg-mintara-surface/50 border border-mintara-border p-1">
            <TabsTrigger
              value="creations"
              className="data-[state=active]:bg-mintara-primary data-[state=active]:text-white"
            >
              My Creations
            </TabsTrigger>
            <TabsTrigger
              value="tokenomics"
              className="data-[state=active]:bg-mintara-primary data-[state=active]:text-white"
            >
              AI Tokenomics Designer
            </TabsTrigger>
            <TabsTrigger
              value="credits"
              className="data-[state=active]:bg-mintara-primary data-[state=active]:text-white"
            >
              Credits
            </TabsTrigger>
          </TabsList>

          {/* My Creations Tab */}
          <TabsContent value="creations" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {myTokens.map((item, index) => (
                <Card
                  key={index}
                  className="p-6 bg-mintara-surface/50 border-mintara-border backdrop-blur-sm hover:border-mintara-accent/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-mintara-primary/20 flex items-center justify-center">
                        <Coins className="w-6 h-6 text-mintara-accent" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-mintara-text-primary">
                          {item.name}
                        </h3>
                        <p className="text-sm text-mintara-text-secondary">
                          {item.symbol}
                        </p>
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded bg-mintara-accent/20 text-mintara-accent text-xs font-medium">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-sm text-mintara-text-secondary mb-4 font-mono">
                    {item.address}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-mintara-border text-mintara-text-primary hover:bg-mintara-surface"
                      onClick={() => window.open(`https://basescan.org/address/${item.address}`, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      BaseScan
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-mintara-border text-mintara-text-primary hover:bg-mintara-surface"
                      onClick={() => toast.info('Re-mint feature coming soon!')}
                    >
                      Re-Mint
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-mintara-border text-mintara-text-primary hover:bg-mintara-surface"
                      onClick={() => {
                        navigator.clipboard.writeText(item.address);
                        toast.success('Address copied to clipboard!');
                      }}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {myTokens.length === 0 && (
              <Card className="p-12 bg-mintara-surface/50 border-mintara-border text-center">
                <p className="text-mintara-text-secondary">
                  No creations yet. Start by creating a token or NFT!
                </p>
              </Card>
            )}
          </TabsContent>

          {/* AI Tokenomics Designer Tab */}
          <TabsContent value="tokenomics" className="space-y-6">
            <Card className="p-8 bg-mintara-surface/50 border-mintara-border backdrop-blur-sm">
              <h2 className="text-2xl font-semibold text-mintara-text-primary mb-6">
                AI Tokenomics Designer
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-mintara-text-primary font-medium">
                    Select Token Type
                  </label>
                  <Select value={tokenType} onValueChange={setTokenType}>
                    <SelectTrigger className="bg-mintara-background border-mintara-border text-mintara-text-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-mintara-surface border-mintara-border">
                      <SelectItem value="meme">Meme Token</SelectItem>
                      <SelectItem value="utility">Utility Token</SelectItem>
                      <SelectItem value="governance">Governance Token</SelectItem>
                      <SelectItem value="charity">Charity Token</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-mintara-border">
                        <th className="text-left py-3 px-4 text-mintara-text-primary font-medium">
                          Parameter
                        </th>
                        <th className="text-left py-3 px-4 text-mintara-text-primary font-medium">
                          Recommendation
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-mintara-border/50">
                        <td className="py-3 px-4 text-mintara-text-secondary">
                          Supply
                        </td>
                        <td className="py-3 px-4 text-mintara-text-primary font-mono">
                          {tokenomicsRecommendations[tokenType].supply}
                        </td>
                      </tr>
                      <tr className="border-b border-mintara-border/50">
                        <td className="py-3 px-4 text-mintara-text-secondary">
                          Decimals
                        </td>
                        <td className="py-3 px-4 text-mintara-text-primary font-mono">
                          {tokenomicsRecommendations[tokenType].decimals}
                        </td>
                      </tr>
                      <tr className="border-b border-mintara-border/50">
                        <td className="py-3 px-4 text-mintara-text-secondary">
                          Liquidity
                        </td>
                        <td className="py-3 px-4 text-mintara-text-primary">
                          {tokenomicsRecommendations[tokenType].liquidity}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-mintara-text-secondary">
                          Vesting
                        </td>
                        <td className="py-3 px-4 text-mintara-text-primary">
                          {tokenomicsRecommendations[tokenType].vesting}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <Button
                  onClick={handleApplyToForm}
                  className="w-full"
                >
                  Apply to Form
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Credits Tab */}
          <TabsContent value="credits" className="space-y-6">
            <Card className="p-12 bg-mintara-surface/50 border-mintara-border backdrop-blur-sm text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-mintara-primary/20 mb-6">
                <Coins className="w-10 h-10 text-mintara-accent" />
              </div>
              <h2 className="text-3xl font-semibold text-mintara-text-primary mb-2">
                7 Credits
              </h2>
              <p className="text-mintara-text-secondary mb-8">
                10 credits = 1 free mint
              </p>
              <div className="max-w-md mx-auto">
                <div className="h-3 bg-mintara-background rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-mintara-primary to-mintara-accent transition-all duration-500"
                    style={{ width: '70%' }}
                  ></div>
                </div>
                <p className="text-sm text-mintara-text-secondary">
                  3 more credits until your next free mint!
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* MiniChat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {chatOpen ? (
          <Card className="w-80 h-96 bg-mintara-surface border-mintara-border backdrop-blur-xl shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-mintara-border">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-mintara-accent" />
                <span className="font-semibold text-mintara-text-primary">
                  Ask Mintara AI
                </span>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="text-mintara-text-secondary hover:text-mintara-text-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="bg-mintara-background rounded-lg p-3 mb-3">
                <p className="text-sm text-mintara-text-primary">
                  Hi! I'm Mintara AI. How can I help you today?
                </p>
              </div>
            </div>
            <div className="p-4 border-t border-mintara-border">
              <input
                type="text"
                placeholder="Type your question..."
                className="w-full bg-mintara-background border border-mintara-border rounded-lg px-3 py-2 text-sm text-mintara-text-primary focus:border-mintara-accent focus:outline-none"
              />
            </div>
          </Card>
        ) : (
          <button
            onClick={() => setChatOpen(true)}
            className="w-14 h-14 rounded-full bg-mintara-primary hover:bg-mintara-primary/90 text-white shadow-[0_0_20px_rgba(0,224,198,0.3)] hover:shadow-[0_0_30px_rgba(0,224,198,0.5)] transition-all duration-200 hover:scale-110 flex items-center justify-center"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}
