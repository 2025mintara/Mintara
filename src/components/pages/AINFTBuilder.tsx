import { useState, useEffect } from 'react';
import { Sparkles, Zap, CheckCircle2, ExternalLink, Share2, Download, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { FeeBadge } from '../FeeBadge';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { toast } from 'sonner';
import {
  OWNER_WALLET,
  USDC_CONTRACT_ADDRESS,
  USDC_ABI,
  getNFTBuilderFee,
  formatUSDC,
} from '../../utils/feePayment';
import {
  NFT_FACTORY_ADDRESS,
  NFT_FACTORY_ABI,
  ERC721_ABI,
} from '../../utils/nftFactory';
import { generateImage } from '../../utils/huggingface';
import { parseEventLogs, type Address } from 'viem';
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

export function AINFTBuilder({ onNavigate: _onNavigate }: AINFTBuilderProps) {
  const { isConnected, chain, address } = useAccount();
  const [prompt, setPrompt] = useState('');
  const [previews, setPreviews] = useState<boolean>(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'idle' | 'paying' | 'paid' | 'minting'>('idle');
  const [nftMetadata, setNftMetadata] = useState({
    name: '',
    description: '',
    collection: 'My NFT Collection',
    symbol: 'MNFT',
  });
  const [recentPrompts] = useState([
    'A futuristic cyberpunk city with neon lights',
    'Abstract digital art with vibrant colors',
    'Fantasy landscape with mountains and aurora',
  ]);

  const { writeContractAsync } = useWriteContract();
  
  const [paymentHash, setPaymentHash] = useState<`0x${string}` | undefined>();
  const [collectionHash, setCollectionHash] = useState<`0x${string}` | undefined>();
  const [mintHash, setMintHash] = useState<`0x${string}` | undefined>();
  const [createdCollectionAddress, setCreatedCollectionAddress] = useState<string>('');
  
  const { isSuccess: isPaymentConfirmed, isError: isPaymentError } = useWaitForTransactionReceipt({
    hash: paymentHash,
  });

  const { data: collectionReceipt, isSuccess: isCollectionConfirmed, isError: isCollectionError } = useWaitForTransactionReceipt({
    hash: collectionHash,
  });

  const { isSuccess: isMintConfirmed, isError: isMintError } = useWaitForTransactionReceipt({
    hash: mintHash,
  });

  useEffect(() => {
    if (isPaymentError && paymentStep === 'paying') {
      toast.error('Payment transaction failed. Please try again.');
      setIsProcessing(false);
      setPaymentStep('idle');
    }
  }, [isPaymentError, paymentStep]);

  useEffect(() => {
    if (isCollectionError && paymentStep === 'paid') {
      toast.error('Collection creation failed. Please try again.');
      setIsProcessing(false);
      setPaymentStep('idle');
    }
  }, [isCollectionError, paymentStep]);

  useEffect(() => {
    if (isMintError && paymentStep === 'minting') {
      toast.error('NFT minting failed. Please try again.');
      setIsProcessing(false);
      setPaymentStep('idle');
    }
  }, [isMintError, paymentStep]);

  useEffect(() => {
    if (isPaymentConfirmed && paymentStep === 'paying') {
      console.log('✅ Payment confirmed! Creating NFT collection...');
      setPaymentStep('paid');
      toast.success('Fee paid! Creating collection...');
      
      const createCollection = async () => {
        try {
          const hash = await writeContractAsync({
            address: NFT_FACTORY_ADDRESS,
            abi: NFT_FACTORY_ABI,
            functionName: 'createCollection',
            args: [
              nftMetadata.name,
              nftMetadata.symbol,
              nftMetadata.collection,
              nftMetadata.description,
            ],
            chainId: 8453,
          });
          
          console.log('✅ Collection creation transaction sent! Hash:', hash);
          setCollectionHash(hash);
        } catch (error: any) {
          console.error('❌ Collection creation error:', error);
          if (error?.message?.includes('User rejected')) {
            toast.error('Collection creation cancelled');
          } else {
            toast.error('Failed to create collection. Please try again.');
          }
          setIsProcessing(false);
          setPaymentStep('idle');
        }
      };
      
      createCollection().catch((error) => {
        console.error('❌ Unhandled error in createCollection:', error);
        toast.error('An unexpected error occurred while creating collection');
        setIsProcessing(false);
        setPaymentStep('idle');
      });
    }
  }, [isPaymentConfirmed, paymentStep, nftMetadata, writeContractAsync]);

  useEffect(() => {
    if (isCollectionConfirmed && collectionReceipt && paymentStep === 'paid' && !mintHash) {
      console.log('✅ Collection created! Receipt:', collectionReceipt);
      
      setPaymentStep('minting');
      
      const processCollection = async () => {
        try {
          const logs = parseEventLogs({
            abi: NFT_FACTORY_ABI,
            logs: collectionReceipt.logs,
            eventName: 'NFTCollectionCreated',
          });
          
          console.log('📝 Parsed logs:', logs);
          
          if (logs.length > 0 && logs[0].args.collectionAddress) {
            const collectionAddress = logs[0].args.collectionAddress;
            console.log('🎉 Collection Address:', collectionAddress);
            setCreatedCollectionAddress(collectionAddress);
            
            toast.success('Collection created! Now uploading metadata...');
            
            const metadata = {
              name: nftMetadata.name,
              description: nftMetadata.description,
              image: generatedImageUrl,
              attributes: [
                {
                  trait_type: 'AI Generated',
                  value: 'FLUX Model'
                },
                {
                  trait_type: 'Collection',
                  value: nftMetadata.collection
                }
              ]
            };
            
            console.log('📤 Uploading metadata to IPFS...');
            const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
            const metadataFile = new File([metadataBlob], 'metadata.json', { type: 'application/json' });
            
            const formData = new FormData();
            formData.append('file', metadataFile);
            
            const pinataMetadata = JSON.stringify({
              name: `nft-metadata-${nftMetadata.name}`,
              keyvalues: {
                type: 'nft-metadata',
                collection: nftMetadata.collection
              }
            });
            formData.append('pinataMetadata', pinataMetadata);
            
            const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${import.meta.env.VITE_PINATA_JWT || ''}`
              },
              body: formData
            });
            
            if (!response.ok) {
              throw new Error(`Metadata upload failed: ${response.status}`);
            }
            
            const data = await response.json();
            const metadataURI = `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
            console.log('✅ Metadata uploaded to IPFS:', metadataURI);
            
            toast.success('Metadata uploaded! Now minting NFT...');
            
            if (chain?.id !== 8453) {
              toast.error('Please switch to Base Network to mint NFT');
              setIsProcessing(false);
              setPaymentStep('idle');
              return;
            }
            
            if (!address) {
              toast.error('Wallet not connected');
              setIsProcessing(false);
              setPaymentStep('idle');
              return;
            }
            
            try {
              console.log('🔄 Step 1: Minting NFT to collection...');
              console.log('Collection:', collectionAddress);
              console.log('Recipient:', address);
              
              const mintTx = await writeContractAsync({
                address: collectionAddress as Address,
                abi: ERC721_ABI,
                functionName: 'mint',
                args: [address as Address],
                chainId: 8453,
              });
              
              console.log('✅ Mint transaction sent! Hash:', mintTx);
              console.log('⏳ Waiting for mint confirmation...');
              
              toast.info('NFT minting... Please wait for confirmation');
              
              setMintHash(mintTx);
            } catch (mintError: any) {
              console.error('❌ NFT mint failed:', mintError);
              console.error('Error details:', {
                message: mintError?.message,
                shortMessage: mintError?.shortMessage,
                cause: mintError?.cause,
              });
              
              if (mintError?.message?.includes('User rejected') || mintError?.message?.includes('User denied')) {
                toast.error('NFT minting cancelled by user');
              } else if (mintError?.message?.includes('chain')) {
                toast.error('Please switch to Base Network (Chain ID 8453)');
              } else {
                toast.error('Failed to mint NFT: ' + (mintError?.shortMessage || mintError?.message || 'Unknown error'));
              }
              setIsProcessing(false);
              setPaymentStep('idle');
            }
          } else {
            console.warn('⚠️ No NFTCollectionCreated event found');
            toast.error('Collection created but address not found');
            setIsProcessing(false);
            setPaymentStep('idle');
          }
        } catch (error: any) {
          console.error('❌ Process collection error:', error);
          toast.error('Failed to process collection');
          setIsProcessing(false);
          setPaymentStep('idle');
        }
      };
      
      processCollection().catch((error) => {
        console.error('❌ Unhandled error in processCollection:', error);
        toast.error('An unexpected error occurred while processing NFT');
        setIsProcessing(false);
        setPaymentStep('idle');
      });
    }
  }, [isCollectionConfirmed, collectionReceipt, paymentStep, mintHash, chain, address, writeContractAsync, generatedImageUrl, nftMetadata]);

  useEffect(() => {
    if (isMintConfirmed && paymentStep === 'minting') {
      setIsProcessing(false);
      setPaymentStep('idle');
      setShowSuccessModal(true);
      toast.success('NFT minted successfully! Check your wallet.');
    }
  }, [isMintConfirmed, paymentStep]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    setGeneratedImageUrl('');
    
    try {
      toast.info('Generating your NFT with AI...');
      const imageUrl = await generateImage(prompt);
      setGeneratedImageUrl(imageUrl);
      setPreviews(true);
      toast.success('NFT generated successfully!');
    } catch (error) {
      console.error('Image generation error:', error);
      toast.error('Failed to generate image. Please try again.');
      setPreviews(false);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleMint = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (chain?.id !== 8453) {
      toast.error('Please switch to Base Network in your wallet');
      return;
    }

    if (!nftMetadata.name || !nftMetadata.description) {
      toast.error('Please fill in NFT name and description');
      return;
    }

    if (!generatedImageUrl) {
      toast.error('Please generate an image first');
      return;
    }

    setIsProcessing(true);
    setPaymentStep('paying');

    try {
      const feeAmount = getNFTBuilderFee();
      
      toast.info(`Paying ${formatUSDC(feeAmount)} USDC fee...`);
      
      const hash = await writeContractAsync({
        address: USDC_CONTRACT_ADDRESS,
        abi: USDC_ABI,
        functionName: 'transfer',
        args: [OWNER_WALLET, feeAmount],
        chainId: 8453, // BASE NETWORK ZORUNLU
      });

      console.log('✅ Payment transaction sent! Hash:', hash);
      setPaymentHash(hash);
      
    } catch (error: any) {
      console.error('❌ Fee payment error:', error);
      if (error?.message?.includes('User rejected')) {
        toast.error('Payment cancelled');
      } else {
        toast.error('Failed to process fee payment');
      }
      setIsProcessing(false);
      setPaymentStep('idle');
    }
  };

  const handleRecentPromptClick = (recentPrompt: string) => {
    setPrompt(recentPrompt);
  };

  const features = [
    {
      icon: Sparkles,
      title: 'FLUX AI Model',
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
              Model: Pollinations AI (FLUX) | Resolution: 512×512 | Enhancement: ON
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
          {previews && !isGenerating && generatedImageUrl && (
            <div className="mt-12 space-y-6">
              <h3 className="text-2xl font-semibold text-mintara-text-primary">
                Your Generated NFT
              </h3>
              <div className="flex justify-center">
                <Card className="p-4 bg-mintara-background border-mintara-border max-w-md w-full">
                  <img 
                    src={generatedImageUrl} 
                    alt="Generated NFT" 
                    className="w-full aspect-square rounded-lg object-cover mb-4"
                  />
                  <p className="text-sm text-mintara-text-secondary text-center">
                    Generated with Pollinations AI
                  </p>
                </Card>
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
                disabled={!isConnected || isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Mint Now'
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
              <div className="text-center mt-3 px-4 py-2">
                <p className="text-sm text-mintara-text-secondary">
                  You can view your created NFTs in the Dashboard
                </p>
              </div>
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
            {createdCollectionAddress && (
              <div className="p-3 bg-mintara-background/50 border border-mintara-border rounded-lg">
                <p className="text-xs text-mintara-text-secondary mb-1">Collection Address</p>
                <div className="flex items-center gap-2">
                  <code className="text-xs text-mintara-text-primary break-all flex-1">
                    {createdCollectionAddress}
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      navigator.clipboard.writeText(createdCollectionAddress);
                      toast.success('Address copied!');
                    }}
                  >
                    📋
                  </Button>
                </div>
              </div>
            )}
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => window.open(`https://basescan.org/address/${createdCollectionAddress}`, '_blank')}
            >
              <ExternalLink className="w-4 h-4" />
              View Collection on BaseScan
            </Button>
            <Button
              variant="secondary"
              className="w-full gap-2"
              onClick={() => {
                const shareText = `Check out my AI-generated NFT on Mintara Base! 🎨\nCollection: ${createdCollectionAddress}\n\nhttps://mintara.base`;
                if (navigator.share) {
                  navigator.share({ text: shareText });
                } else {
                  navigator.clipboard.writeText(shareText);
                  toast.success('Share text copied!');
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
