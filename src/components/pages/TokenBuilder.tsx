import { useState } from 'react';
import { HelpCircle, Coins, Flame, Send, Info, Upload, Link2, CheckCircle2, ExternalLink, Share2, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { FeeBadge } from '../FeeBadge';
import { useWallet } from '../WalletContext';
import { useAccount, useWalletClient } from 'wagmi';
import { ethers } from 'ethers';
import { deployERC20Token, type TokenDeploymentParams } from '../../lib/contracts';
import { DEPLOYMENT_FEE, BASE_CONFIG } from '../../lib/baseConfig';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface TokenBuilderProps {
  onNavigate: (page: string) => void;
}

export function TokenBuilder({ onNavigate }: TokenBuilderProps) {
  const { isConnected } = useWallet();
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentResult, setDeploymentResult] = useState<{ address: string; txHash: string } | null>(null);
  const [uploadMethod, setUploadMethod] = useState<'upload' | 'url'>('upload');
  const [logoUrl, setLogoUrl] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    decimals: '18',
    supply: '',
    description: '',
    payWith: 'ETH',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected || !address || !walletClient) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!formData.name || !formData.symbol || !formData.supply) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setIsDeploying(true);
      
      // Convert wallet client to ethers signer
      const provider = new ethers.BrowserProvider(walletClient as any);
      const signer = await provider.getSigner();

      const params: TokenDeploymentParams = {
        name: formData.name,
        symbol: formData.symbol.toUpperCase(),
        decimals: parseInt(formData.decimals) || 18,
        totalSupply: formData.supply,
        description: formData.description,
        logoUrl: logoUrl || undefined,
      };

      const result = await deployERC20Token(provider, signer, params);
      
      setDeploymentResult(result);
      
      // Save to localStorage for dashboard
      const tokenData = {
        name: formData.name,
        symbol: formData.symbol.toUpperCase(),
        address: result.address,
        txHash: result.txHash,
        network: 'Base',
        decimals: params.decimals,
        totalSupply: formData.supply,
        createdAt: new Date().toISOString(),
        type: 'token',
      };

      const existingTokens = JSON.parse(localStorage.getItem('mintara_tokens') || '[]');
      existingTokens.push(tokenData);
      localStorage.setItem('mintara_tokens', JSON.stringify(existingTokens));

      setShowSuccessModal(true);
      toast.success('Token deployed successfully!');
    } catch (error) {
      console.error('Deployment error:', error);
      toast.error(error instanceof Error ? error.message : 'Token deployment failed');
    } finally {
      setIsDeploying(false);
    }
  };

  const handleAskAI = () => {
    // AI suggestion simulation
    setFormData({
      ...formData,
      name: 'Base Meme Token',
      symbol: 'BMT',
      supply: '1000000000',
    });
  };

  const tools = [
    { icon: Coins, label: 'Mint', color: 'mintara-primary' },
    { icon: Flame, label: 'Burn', color: 'mintara-error' },
    { icon: Send, label: 'Multisend', color: 'mintara-accent' },
    { icon: Info, label: 'Info', color: 'mintara-warning' },
  ];

  return (
    <div className="min-h-screen pt-32 px-6 py-16">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-mintara-text-primary mb-4">
            Create Your Token on Base
          </h1>
          <p className="text-3xl md:text-4xl text-mintara-accent mt-3">
            No Code Needed.
          </p>
          <div className="h-4"></div>
          <p className="text-mintara-text-secondary mb-4">
            Flat Fee — 1 USDC per token
          </p>
          <div className="flex justify-center gap-3">
            <FeeBadge />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="icon"
                    size="icon"
                    type="button"
                    onClick={handleAskAI}
                  >
                    <Sparkles className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-mintara-surface border-mintara-border text-mintara-text-primary">
                  <p>Let Mintara AI suggest name, symbol, supply</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Main Form */}
        <Card className="p-8 md:p-12 bg-mintara-surface/50 border-mintara-border backdrop-blur-sm mb-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-mintara-text-primary">
                  Token Name
                </Label>
                <Input
                  id="name"
                  placeholder="e.g., My Awesome Token"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="bg-mintara-background border-mintara-border text-mintara-text-primary focus:border-mintara-accent"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="symbol" className="text-mintara-text-primary">
                  Symbol
                </Label>
                <Input
                  id="symbol"
                  placeholder="e.g., MAT"
                  value={formData.symbol}
                  onChange={(e) =>
                    setFormData({ ...formData, symbol: e.target.value })
                  }
                  className="bg-mintara-background border-mintara-border text-mintara-text-primary focus:border-mintara-accent"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="decimals" className="text-mintara-text-primary">
                    Decimals
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="w-4 h-4 text-mintara-text-secondary cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-mintara-surface border-mintara-border text-mintara-text-primary">
                        <p>Meme tokens typically use 9 decimals.</p>
                        <p>1B supply is commonly used.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="decimals"
                  type="number"
                  value={formData.decimals}
                  onChange={(e) =>
                    setFormData({ ...formData, decimals: e.target.value })
                  }
                  className="bg-mintara-background border-mintara-border text-mintara-text-primary focus:border-mintara-accent"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="supply" className="text-mintara-text-primary">
                  Total Supply
                </Label>
                <Input
                  id="supply"
                  placeholder="e.g., 1000000000"
                  value={formData.supply}
                  onChange={(e) =>
                    setFormData({ ...formData, supply: e.target.value })
                  }
                  className="bg-mintara-background border-mintara-border text-mintara-text-primary focus:border-mintara-accent"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-mintara-text-primary">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Tell us about your token..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="bg-mintara-background border-mintara-border text-mintara-text-primary focus:border-mintara-accent min-h-[120px]"
              />
            </div>

            {/* Upload Logo Section */}
            <div className="space-y-3">
              <Label className="text-mintara-text-primary">
                Upload Logo (Optional)
              </Label>
              <Tabs value={uploadMethod} onValueChange={(v) => setUploadMethod(v as 'upload' | 'url')}>
                <TabsList className="grid w-full grid-cols-2 bg-mintara-surface/50 border border-mintara-border">
                  <TabsTrigger value="upload">Upload</TabsTrigger>
                  <TabsTrigger value="url">Use URL</TabsTrigger>
                </TabsList>
                <TabsContent value="upload" className="mt-4">
                  <div className="border-2 border-dashed border-mintara-border rounded-lg p-8 text-center hover:border-mintara-accent/50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-mintara-accent mx-auto mb-3" />
                    <p className="text-sm text-mintara-text-primary mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-mintara-text-secondary">
                      PNG or SVG • 512×512px recommended
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="url" className="mt-4">
                  <Input
                    placeholder="https://example.com/logo.png"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    className="bg-mintara-background border-mintara-border text-mintara-text-primary focus:border-mintara-accent"
                  />
                </TabsContent>
              </Tabs>
              {(uploadMethod === 'url' && logoUrl) && (
                <div className="mt-3 p-3 bg-mintara-surface/30 border border-mintara-border rounded-lg">
                  <p className="text-xs text-mintara-text-secondary mb-2">Preview:</p>
                  <div className="w-16 h-16 bg-mintara-background border border-mintara-border rounded-lg flex items-center justify-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-mintara-primary/20 to-mintara-accent/20 rounded-full"></div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="payWith" className="text-mintara-text-primary">
                Pay With
              </Label>
              <Select
                value={formData.payWith}
                onValueChange={(value) =>
                  setFormData({ ...formData, payWith: value })
                }
              >
                <SelectTrigger className="bg-mintara-background border-mintara-border text-mintara-text-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-mintara-surface border-mintara-border">
                  <SelectItem value="ETH">ETH</SelectItem>
                  <SelectItem value="USDC">USDC</SelectItem>
                  <SelectItem value="MINTA">MINTA</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-mintara-text-secondary mt-2">
                Estimated Fee: ~0.00042 ETH (~$0.95)
              </p>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={!isConnected || isDeploying}
              >
                {isDeploying ? (
                  <>
                    <Loader2 className=\"w-4 h-4 mr-2 animate-spin\" />
                    Deploying Token...
                  </>
                ) : (
                  'Create Token'
                )}
              </Button>
              {!isConnected && (
                <div className="flex items-center gap-2 mt-3 px-4 py-2 rounded-lg bg-mintara-warning/10 border border-mintara-warning/30">
                  <AlertCircle className="w-4 h-4 text-mintara-warning flex-shrink-0" />
                  <p className="text-sm text-mintara-warning">
                    Connect your wallet to continue.
                  </p>
                </div>
              )}
            </div>
          </form>
        </Card>

        {/* Tool Cards */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-mintara-text-primary mb-6">
            Token Management Tools
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tools.map((tool, index) => (
              <Card
                key={index}
                className="p-6 bg-mintara-surface/50 border-mintara-border hover:border-mintara-accent/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-mintara-accent/20 cursor-pointer group"
                onClick={() => alert(`${tool.label} feature coming soon!`)}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-${tool.color}/20 flex items-center justify-center group-hover:bg-${tool.color}/30 transition-colors`}>
                    <tool.icon className={`w-6 h-6 text-${tool.color}`} />
                  </div>
                  <span className="text-mintara-text-primary font-medium">
                    {tool.label}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Batch Deploy Section */}
        <Card className="p-8 bg-mintara-surface/50 border-mintara-border backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-mintara-text-primary">
              Batch Deploy Mode
            </h2>
            <span className="px-3 py-1 rounded-full bg-mintara-warning/20 text-mintara-warning text-sm font-medium">
              Pro
            </span>
          </div>
          <p className="text-mintara-text-secondary mb-6">
            Deploy multiple tokens at once with our batch creation tool.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-mintara-border">
                  <th className="text-left py-3 px-4 text-mintara-text-primary font-medium">
                    Token Name
                  </th>
                  <th className="text-left py-3 px-4 text-mintara-text-primary font-medium">
                    Symbol
                  </th>
                  <th className="text-left py-3 px-4 text-mintara-text-primary font-medium">
                    Supply
                  </th>
                  <th className="text-left py-3 px-4 text-mintara-text-primary font-medium">
                    Fee
                  </th>
                  <th className="text-left py-3 px-4 text-mintara-text-primary font-medium">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-mintara-border/50">
                  <td className="py-3 px-4 text-mintara-text-secondary">—</td>
                  <td className="py-3 px-4 text-mintara-text-secondary">—</td>
                  <td className="py-3 px-4 text-mintara-text-secondary">—</td>
                  <td className="py-3 px-4 text-mintara-text-secondary">—</td>
                  <td className="py-3 px-4 text-mintara-text-secondary">—</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Button
            variant="outline"
            className="mt-4 border-mintara-accent text-mintara-accent hover:bg-mintara-accent/10"
            onClick={() => alert('Batch deploy feature coming soon!')}
          >
            Add Row
          </Button>
        </Card>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="bg-mintara-surface border-mintara-border max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-mintara-primary/20 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-mintara-accent" />
              </div>
            </div>
            <DialogTitle className="text-mintara-text-primary text-center text-2xl">
              ✅ Token Created Successfully!
            </DialogTitle>
            <DialogDescription className="text-mintara-text-secondary text-center pt-2">
              Your token has been deployed to Base Network
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 pt-4">
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => window.open('https://basescan.org', '_blank')}
            >
              <ExternalLink className="w-4 h-4" />
              View on BaseScan
            </Button>
            <Button
              variant="secondary"
              className="w-full gap-2"
              onClick={() => {
                const shareText = `I just created a token on Mintara Base! 🚀`;
                if (navigator.share) {
                  navigator.share({ text: shareText });
                } else {
                  navigator.clipboard.writeText(shareText);
                  alert('Link copied to clipboard!');
                }
              }}
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            <Button
              className="w-full"
              onClick={() => {
                setShowSuccessModal(false);
                onNavigate('dashboard');
              }}
            >
              Go to Dashboard
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
