import { useState } from 'react';
import { ExternalLink, Share2, Coins, MessageCircle, X, Flame, Send, Info, RefreshCw } from 'lucide-react';
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
import { getTokenLogo, getTokenLogos, saveTokenLogo } from '../../utils/tokenLogoStorage';
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
  const [selectedToken, setSelectedToken] = useState<{ address: string; symbol: string; decimals: number } | null>(null);
  const [managementAction, setManagementAction] = useState<'mint' | 'burn' | 'transfer' | null>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoTokenAddress, setInfoTokenAddress] = useState<string>('');
  const [showMultisendModal, setShowMultisendModal] = useState(false);
  const [multisendToken, setMultisendToken] = useState<{ address: string; symbol: string; decimals: number } | null>(null);
  const [walletTokens, setWalletTokens] = useState<any[]>([]);
  const [isLoadingWallet, setIsLoadingWallet] = useState(false);

  const { data: userTokens, refetch: refetchTokens, isLoading: isLoadingTokens } = useReadContract({
    address: TOKEN_FACTORY_ADDRESS,
    abi: TOKEN_FACTORY_ABI,
    functionName: 'getUserTokens',
    args: address ? [address] : undefined,
    query: {
      enabled: false,
    },
  });

  const { data: userNFTs, refetch: refetchNFTs } = useReadContract({
    address: NFT_FACTORY_ADDRESS,
    abi: NFT_FACTORY_ABI,
    functionName: 'getUserCollections',
    args: address ? [address] : undefined,
    query: {
      enabled: false,
    },
  });

  const factoryTokens = (userTokens || []).map((token: any) => ({
    name: token.name,
    symbol: token.symbol,
    address: token.tokenAddress,
    decimals: Number(token.decimals),
    canMint: token.canMint ?? true,
    canBurn: token.canBurn ?? true,
    type: 'token',
    logoUrl: getTokenLogo(token.tokenAddress),
    tokenData: token,
  }));


  const localStorageTokens = getTokenLogos()
    .filter(token => {
      const isInFactory = factoryTokens.some(
        t => t.address.toLowerCase() === token.tokenAddress.toLowerCase()
      );
      return !isInFactory;
    })
    .map(token => ({
      name: token.tokenName,
      symbol: token.tokenSymbol,
      address: token.tokenAddress,
      decimals: 18,
      canMint: false,
      canBurn: false,
      type: 'wallet-token',
      logoUrl: token.logoUrl,
    }));


  const factoryAddresses = new Set(factoryTokens.map(t => t.address.toLowerCase()));
  
  const uniqueWalletTokens = walletTokens.filter(
    t => !factoryAddresses.has(t.address.toLowerCase())
  );

  const myTokens = [...factoryTokens, ...localStorageTokens, ...uniqueWalletTokens];
  const isLoading = isLoadingTokens || isLoadingWallet;

  const myNFTCollections = (userNFTs || []).map((nft: any) => ({
    collectionAddress: nft.collectionAddress,
    name: nft.name,
    symbol: nft.symbol,
    collectionName: nft.collectionName,
    collectionDescription: nft.collectionDescription,
  }));

  console.log('🔍 Dashboard:', {
    address,
    factory: factoryTokens.length,
    wallet: walletTokens.length,
    total: myTokens.length,
    tokens: myTokens.map(t => t.symbol),
  });

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

  const handleRefresh = async () => {
    toast.info('Refreshing...');
    setIsLoadingWallet(true);
    try {
      await Promise.all([
        refetchTokens(),
        refetchNFTs(),
        address && fetch(`https://base.blockscout.com/api?module=account&action=tokenlist&address=${address}`)
          .then(res => res.json())
          .then(async (data) => {
            if (data.status === '1' && data.result) {
              const tokens = await Promise.all(
                data.result
                  .filter((token: any) => token.type === 'ERC-20')
                  .map(async (token: any) => {
                    let logoUrl = getTokenLogo(token.contractAddress);
                    
                    if (!logoUrl) {
                      try {
                        const logoRes = await fetch(
                          `https://base.blockscout.com/api?module=token&action=getToken&contractaddress=${token.contractAddress}`
                        );
                        const logoData = await logoRes.json();
                        if (logoData.result?.icon_url) {
                          logoUrl = logoData.result.icon_url;
                          if (logoUrl) {
                            saveTokenLogo({
                              tokenAddress: token.contractAddress,
                              logoUrl: logoUrl,
                              tokenName: token.name,
                              tokenSymbol: token.symbol,
                              uploadedAt: Date.now(),
                            });
                          }
                        }
                      } catch (e) {
                        console.log(`No logo for ${token.symbol}`);
                      }
                    }
                    
                    return {
                      name: token.name,
                      symbol: token.symbol,
                      address: token.contractAddress,
                      decimals: Number(token.decimals),
                      balance: token.balance,
                      type: 'wallet-token',
                      canMint: false,
                      canBurn: false,
                      logoUrl,
                    };
                  })
              );
              setWalletTokens(tokens);
            }
          })
      ]);
      toast.success('Refreshed!');
    } finally {
      setIsLoadingWallet(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 px-6 py-16">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-4xl md:text-5xl font-semibold text-mintara-text-primary">
            Dashboard
          </h1>
          <Button
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            className="border-mintara-border text-mintara-text-primary hover:bg-mintara-surface flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>
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
          </TabsList>

          {/* My Creations Tab */}
          <TabsContent value="creations" className="space-y-6">
            {!address ? (
              <Card className="p-12 bg-mintara-surface/50 border-mintara-border text-center">
                <p className="text-mintara-text-secondary text-lg mb-4">
                  Please connect your wallet to view your tokens
                </p>
                <Button
                  onClick={() => document.querySelector<HTMLButtonElement>('[data-testid="rk-connect-button"]')?.click()}
                  className="bg-mintara-primary hover:bg-mintara-primary/80"
                >
                  Connect Wallet
                </Button>
              </Card>
            ) : isLoading ? (
              <Card className="p-12 bg-mintara-surface/50 border-mintara-border text-center">
                <div className="flex items-center justify-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-mintara-primary"></div>
                  <p className="text-mintara-text-secondary text-lg">Loading your tokens...</p>
                </div>
              </Card>
            ) : myTokens.length === 0 ? (
              <Card className="p-12 bg-mintara-surface/50 border-mintara-border text-center">
                <p className="text-mintara-text-secondary text-lg mb-4">
                  You haven't created any tokens yet
                </p>
                <Button
                  onClick={() => window.location.href = '/token-builder'}
                  className="bg-mintara-primary hover:bg-mintara-primary/80"
                >
                  Create Your First Token
                </Button>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {myTokens.map((item, index) => (
                <Card
                  key={index}
                  className="p-6 bg-mintara-surface/50 border-mintara-border backdrop-blur-sm hover:border-mintara-accent/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
                      {item.logoUrl ? (
                        <img 
                          src={item.logoUrl} 
                          alt={`${item.symbol} logo`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Coins className="w-8 h-8 text-mintara-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h3 className="text-2xl font-bold text-mintara-text-primary">
                            {item.name}
                          </h3>
                          <p className="text-lg text-mintara-text-secondary">
                            {item.symbol}
                          </p>
                        </div>
                        <span className="px-3 py-1 rounded-md text-sm font-medium bg-mintara-accent/20 text-mintara-accent">
                          token
                        </span>
                      </div>
                      <p className="text-sm text-mintara-text-secondary font-mono mt-2">
                        {item.address}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-1.5 mb-3">
                    {item.canMint && (
                      <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-400 text-[10px] font-medium">
                        Mintable
                      </span>
                    )}
                    {item.canBurn && (
                      <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 text-[10px] font-medium">
                        Burnable
                      </span>
                    )}
                  </div>
                      
                  <div className="grid grid-cols-3 gap-3 mb-3">
                        <Button
                          variant="outline"
                          size="lg"
                          disabled={!item.canMint}
                          className="border-mintara-border text-mintara-primary hover:bg-mintara-primary/10 disabled:opacity-40 disabled:cursor-not-allowed h-12"
                          onClick={() => {
                            if (item.canMint) {
                              setSelectedToken({ address: item.address, symbol: item.symbol, decimals: item.decimals });
                              setManagementAction('mint');
                            } else {
                              toast.error('Minting disabled', {
                                description: 'This token was created without minting capability',
                              });
                            }
                          }}
                        >
                          <Coins className="w-4 h-4 mr-1" />
                          Mint
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          disabled={!item.canBurn}
                          className="border-mintara-border text-red-400 hover:bg-red-400/10 disabled:opacity-40 disabled:cursor-not-allowed h-12"
                          onClick={() => {
                            if (item.canBurn) {
                              setSelectedToken({ address: item.address, symbol: item.symbol, decimals: item.decimals });
                              setManagementAction('burn');
                            } else {
                              toast.error('Burning disabled', {
                                description: 'This token was created without burning capability',
                              });
                            }
                          }}
                        >
                          <Flame className="w-4 h-4 mr-1" />
                          Burn
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          className="border-mintara-border text-mintara-accent hover:bg-mintara-accent/10 h-12"
                          onClick={() => {
                            setSelectedToken({ address: item.address, symbol: item.symbol, decimals: item.decimals });
                            setManagementAction('transfer');
                          }}
                        >
                          <Send className="w-4 h-4 mr-1" />
                          Transfer
                        </Button>
                      </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                        <Button
                          variant="outline"
                          size="lg"
                          className="border-mintara-border text-purple-400 hover:bg-purple-400/10 h-12"
                          onClick={() => {
                            setMultisendToken({ address: item.address, symbol: item.symbol, decimals: item.decimals });
                            setShowMultisendModal(true);
                          }}
                        >
                          <Send className="w-4 h-4 mr-1" />
                          Multisend
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          className="border-mintara-border text-mintara-text-primary hover:bg-mintara-surface h-12"
                          onClick={() => {
                            setInfoTokenAddress(item.address);
                            setShowInfoModal(true);
                          }}
                        >
                          <Info className="w-4 h-4 mr-1" />
                          Info
                        </Button>
                      </div>
                  
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
          decimals={selectedToken.decimals}
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
          decimals={multisendToken.decimals}
        />
      )}
    </div>
  );
}
