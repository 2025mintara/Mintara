import { useState } from 'react';
import { ExternalLink, Share2, Coins, MessageCircle, X, Flame, Send, Info } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useAccount, useReadContract } from 'wagmi';
import { TOKEN_FACTORY_ADDRESS, TOKEN_FACTORY_ABI } from '../../utils/tokenFactory';
import { NFT_FACTORY_ADDRESS, NFT_FACTORY_ABI } from '../../utils/nftFactory';
import { shareOnTwitter, getBaseScanUrl } from '../../utils/socialShare';
import { TokenManagementModal } from '../TokenManagementModal';
import { TokenInfoModal } from '../TokenInfoModal';
import { MultisendModal } from '../MultisendModal';
import { NFTGallery } from '../NFTGallery';
import { AirdropTool } from '../AirdropTool';
import { TokenVesting } from '../TokenVesting';
import { LiquidityPoolCreator } from '../LiquidityPoolCreator';
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

export function Dashboard({ onNavigate: _onNavigate }: DashboardProps) {
  const { address } = useAccount();
  const [chatOpen, setChatOpen] = useState(false);
  const [tokenType, setTokenType] = useState('meme');
  const [selectedToken, setSelectedToken] = useState<{ address: string; symbol: string } | null>(null);
  const [managementAction, setManagementAction] = useState<'mint' | 'burn' | 'transfer' | null>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoTokenAddress, setInfoTokenAddress] = useState<string>('');
  const [showMultisendModal, setShowMultisendModal] = useState(false);
  const [multisendToken, setMultisendToken] = useState<{ address: string; symbol: string } | null>(null);

  const { data: userTokens } = useReadContract({
    address: TOKEN_FACTORY_ADDRESS,
    abi: TOKEN_FACTORY_ABI,
    functionName: 'getUserTokens',
    args: address ? [address] : undefined,
  });

  const { data: userNFTs } = useReadContract({
    address: NFT_FACTORY_ADDRESS,
    abi: NFT_FACTORY_ABI,
    functionName: 'getUserCollections',
    args: address ? [address] : undefined,
  });

  const myTokens = (userTokens || []).map((token: any) => ({
    name: token.name,
    symbol: token.symbol,
    address: token.tokenAddress,
    type: 'token',
  }));

  const myNFTCollections = (userNFTs || []).map((nft: any) => ({
    collectionAddress: nft.collectionAddress,
    name: nft.name,
    symbol: nft.symbol,
    collectionName: nft.collectionName,
    collectionDescription: nft.collectionDescription,
  }));

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
              My Tokens
            </TabsTrigger>
            <TabsTrigger
              value="nfts"
              className="data-[state=active]:bg-mintara-primary data-[state=active]:text-white"
            >
              NFT Gallery
            </TabsTrigger>
            <TabsTrigger
              value="tokenomics"
              className="data-[state=active]:bg-mintara-primary data-[state=active]:text-white"
            >
              AI Tokenomics
            </TabsTrigger>
            <TabsTrigger
              value="airdrop"
              className="data-[state=active]:bg-mintara-primary data-[state=active]:text-white"
            >
              Airdrop
            </TabsTrigger>
            <TabsTrigger
              value="vesting"
              className="data-[state=active]:bg-mintara-primary data-[state=active]:text-white"
            >
              Vesting
            </TabsTrigger>
            <TabsTrigger
              value="liquidity"
              className="data-[state=active]:bg-mintara-primary data-[state=active]:text-white"
            >
              Liquidity
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
                  
                  {item.type === 'token' && (
                    <>
                      <div className="grid grid-cols-3 gap-2 mb-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-mintara-border text-mintara-primary hover:bg-mintara-primary/10"
                          onClick={() => {
                            setSelectedToken({ address: item.address, symbol: item.symbol });
                            setManagementAction('mint');
                          }}
                        >
                          <Coins className="w-4 h-4 mr-1" />
                          Mint
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-mintara-border text-red-400 hover:bg-red-400/10"
                          onClick={() => {
                            setSelectedToken({ address: item.address, symbol: item.symbol });
                            setManagementAction('burn');
                          }}
                        >
                          <Flame className="w-4 h-4 mr-1" />
                          Burn
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-mintara-border text-mintara-accent hover:bg-mintara-accent/10"
                          onClick={() => {
                            setSelectedToken({ address: item.address, symbol: item.symbol });
                            setManagementAction('transfer');
                          }}
                        >
                          <Send className="w-4 h-4 mr-1" />
                          Transfer
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-mintara-border text-purple-400 hover:bg-purple-400/10"
                          onClick={() => {
                            setMultisendToken({ address: item.address, symbol: item.symbol });
                            setShowMultisendModal(true);
                          }}
                        >
                          <Send className="w-4 h-4 mr-1" />
                          Multisend
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-mintara-border text-mintara-text-primary hover:bg-mintara-surface"
                          onClick={() => {
                            setInfoTokenAddress(item.address);
                            setShowInfoModal(true);
                          }}
                        >
                          <Info className="w-4 h-4 mr-1" />
                          Info
                        </Button>
                      </div>
                    </>
                  )}
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-mintara-border text-mintara-text-primary hover:bg-mintara-surface"
                      onClick={() => window.open(getBaseScanUrl(item.address, item.type === 'token' ? 'token' : 'address'), '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      BaseScan
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-mintara-border text-mintara-text-primary hover:bg-mintara-surface"
                      onClick={() => shareOnTwitter(`Check out my ${item.type} ${item.name} (${item.symbol}) on Base Network!`, getBaseScanUrl(item.address))}
                    >
                      <Share2 className="w-4 h-4 mr-1" />
                      Share
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
                      Copy
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {myTokens.length === 0 && (
              <Card className="p-12 bg-mintara-surface/50 border-mintara-border text-center">
                <p className="text-mintara-text-secondary">
                  No tokens yet. Start by creating a token with Token Builder!
                </p>
              </Card>
            )}
          </TabsContent>

          {/* NFT Gallery Tab */}
          <TabsContent value="nfts" className="space-y-6">
            <NFTGallery nftCollections={myNFTCollections} />
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

          {/* Airdrop Tab */}
          <TabsContent value="airdrop" className="space-y-6">
            <AirdropTool />
          </TabsContent>

          {/* Vesting Tab */}
          <TabsContent value="vesting" className="space-y-6">
            <TokenVesting />
          </TabsContent>

          {/* Liquidity Tab */}
          <TabsContent value="liquidity" className="space-y-6">
            <LiquidityPoolCreator />
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

      {/* Token Management Modal */}
      {selectedToken && (
        <TokenManagementModal
          isOpen={!!managementAction}
          onClose={() => {
            setManagementAction(null);
            setSelectedToken(null);
          }}
          tokenAddress={selectedToken.address}
          tokenSymbol={selectedToken.symbol}
          action={managementAction}
        />
      )}

      {/* Token Info Modal */}
      <TokenInfoModal
        isOpen={showInfoModal}
        onClose={() => {
          setShowInfoModal(false);
          setInfoTokenAddress('');
        }}
        tokenAddress={infoTokenAddress}
      />

      {/* Multisend Modal */}
      {multisendToken && (
        <MultisendModal
          isOpen={showMultisendModal}
          onClose={() => {
            setShowMultisendModal(false);
            setMultisendToken(null);
          }}
          tokenAddress={multisendToken.address}
          tokenSymbol={multisendToken.symbol}
        />
      )}
    </div>
  );
}
