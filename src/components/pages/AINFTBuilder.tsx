import { useState } from 'react';
import { Sparkles, Zap, CheckCircle2, ExternalLink, Share2, Download, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { FeeBadge } from '../FeeBadge';
import { useWallet } from '../WalletContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

interface AINFTBuilderProps {
  onNavigate: (page: string) => void;
}

export function AINFTBuilder({ onNavigate }: AINFTBuilderProps) {
  const { isConnected } = useWallet();
  const [prompt, setPrompt] = useState('');
  const [previews, setPreviews] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [nftMetadata, setNftMetadata] = useState({
    name: '',
    description: '',
    collection: '',
  });
  const [recentPrompts] = useState([
    'A futuristic cyberpunk city with neon lights',
    'Abstract digital art with vibrant colors',
    'Fantasy landscape with mountains and aurora',
  ]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setPreviews(true);
    }, 2000);
  };

  const handleMint = () => {
    setShowSuccessModal(true);
  };

  const handleRecentPromptClick = (recentPrompt: string) => {
    setPrompt(recentPrompt);
  };

  const features = [
    {
      icon: Sparkles,
      title: 'SDXL Turbo Model',
      description: 'Latest AI technology for stunning NFT generation',
    },
    {
      icon: Zap,
      title: 'Auto-Optimization',
      description: 'Automatically optimized for best results',
    },
    {
      icon: CheckCircle2,
      title: 'Base Integration',
      description: 'Seamlessly mint directly on Base Network',
    },
  ];

  return (
    <div className="min-h-screen pt-32 px-6 py-16">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-mintara-text-primary mb-4">
            Create AI-Generated NFTs
          </h1>
          <p className="text-3xl md:text-4xl text-mintara-accent mt-3">
            Mint Instantly on Base.
          </p>
          <div className="h-4"></div>
          <p className="text-xl text-mintara-text-secondary mb-6">
            Pay only 1 USDC per NFT mint.
          </p>
          <div className="flex justify-center">
            <FeeBadge fee="1 USDC" />
          </div>
        </div>

        {/* Main Generator */}
        <Card className="p-8 md:p-12 bg-mintara-surface/50 border-mintara-border backdrop-blur-sm mb-12">
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-mintara-text-primary font-medium">
                Describe Your NFT
              </label>
              <Textarea
                placeholder="e.g., A futuristic cyberpunk city with neon lights and flying cars at sunset..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="bg-mintara-background border-mintara-border text-mintara-text-primary focus:border-mintara-accent min-h-[120px]"
              />
            </div>

            {/* Recent Prompts */}
            <div className="space-y-2">
              <label className="text-sm text-mintara-text-secondary">
                Recent Prompts:
              </label>
              <div className="flex flex-wrap gap-2">
                {recentPrompts.map((recentPrompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentPromptClick(recentPrompt)}
                    className="px-3 py-1.5 text-sm bg-mintara-surface/50 border border-mintara-border text-mintara-text-primary rounded-lg hover:border-mintara-accent/50 hover:bg-mintara-surface transition-all"
                  >
                    {recentPrompt}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!prompt || isGenerating}
              size="lg"
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating NFT with AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate with AI
                </>
              )}
            </Button>

            {/* Model Info */}
            <div className="text-center text-xs text-mintara-text-secondary pt-2 border-t border-mintara-border">
              Model: SDXL Turbo v1.1 | Resolution: 512×512 | Optimization: ON
            </div>
          </div>

          {/* Loading State */}
          {isGenerating && (
            <div className="mt-12 flex flex-col items-center justify-center py-16">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-mintara-primary via-mintara-accent to-mintara-soft-lime-glow animate-spin mb-6"></div>
              <p className="text-lg text-mintara-text-primary font-medium">
                Generating NFT with AI...
              </p>
            </div>
          )}

          {/* Preview Area */}
          {previews && !isGenerating && (
            <div className="mt-12 space-y-6">
              <h3 className="text-2xl font-semibold text-mintara-text-primary">
                Your Generated NFTs
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3].map((index) => (
                  <Card
                    key={index}
                    className="p-4 bg-mintara-background border-mintara-border hover:border-mintara-accent/50 transition-all duration-300 hover:scale-105"
                  >
                    <div className="aspect-square bg-gradient-to-br from-mintara-primary/20 to-mintara-accent/20 rounded-lg mb-4 flex items-center justify-center">
                      <Sparkles className="w-12 h-12 text-mintara-accent opacity-50" />
                    </div>
                    <p className="text-sm text-mintara-text-secondary text-center">
                      NFT Preview #{index}
                    </p>
                  </Card>
                ))}
              </div>

              {/* Metadata Form */}
              <Card className="p-6 bg-mintara-background border-mintara-border">
                <h4 className="text-lg font-semibold text-mintara-text-primary mb-4">
                  NFT Metadata
                </h4>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nftName" className="text-mintara-text-primary">
                      NFT Name
                    </Label>
                    <Input
                      id="nftName"
                      placeholder="e.g., Cyber City #001"
                      value={nftMetadata.name}
                      onChange={(e) =>
                        setNftMetadata({ ...nftMetadata, name: e.target.value })
                      }
                      className="bg-mintara-background border-mintara-border text-mintara-text-primary focus:border-mintara-accent"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nftDescription" className="text-mintara-text-primary">
                      Description
                    </Label>
                    <Input
                      id="nftDescription"
                      placeholder="Describe your NFT..."
                      value={nftMetadata.description}
                      onChange={(e) =>
                        setNftMetadata({ ...nftMetadata, description: e.target.value })
                      }
                      className="bg-mintara-background border-mintara-border text-mintara-text-primary focus:border-mintara-accent"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nftCollection" className="text-mintara-text-primary">
                      Collection
                    </Label>
                    <Input
                      id="nftCollection"
                      placeholder="Collection name (optional)"
                      value={nftMetadata.collection}
                      onChange={(e) =>
                        setNftMetadata({ ...nftMetadata, collection: e.target.value })
                      }
                      className="bg-mintara-background border-mintara-border text-mintara-text-primary focus:border-mintara-accent"
                    />
                  </div>
                </div>
              </Card>

              <div className="h-6"></div>

              <Button
                onClick={handleMint}
                size="lg"
                variant="outline"
                className="w-full"
                disabled={!isConnected}
              >
                Mint Now
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
          )}
        </Card>

        {/* Features */}
        <div>
          <h2 className="text-2xl font-semibold text-mintara-text-primary mb-8 text-center">
            Powered by Advanced AI
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 bg-mintara-surface/50 border-mintara-border hover:border-mintara-accent/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-mintara-accent/20 group"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-mintara-primary/20 flex items-center justify-center group-hover:bg-mintara-primary/30 transition-colors">
                    <feature.icon className="w-7 h-7 text-mintara-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-mintara-text-primary">
                    {feature.title}
                  </h3>
                  <p className="text-mintara-text-secondary text-sm">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
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
              🎉 NFT Minted Successfully!
            </DialogTitle>
            <DialogDescription className="text-mintara-text-secondary text-center pt-2">
              Your NFT has been minted on Base Network
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
                const shareText = `Check out my AI-generated NFT on Mintara Base! 🎨`;
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
              variant="ghost"
              className="w-full gap-2"
              onClick={() => alert('Download feature coming soon!')}
            >
              <Download className="w-4 h-4" />
              Download Image
            </Button>
            <Button
              className="w-full"
              onClick={() => setShowSuccessModal(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
