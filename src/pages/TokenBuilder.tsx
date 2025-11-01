import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  CheckCircle2,
  Coins,
  ExternalLink,
  Flame,
  HelpCircle,
  Info,
  Link2,
  Send,
  Share2,
  Sparkles,
  Upload,
} from "lucide-react";

import { FeeBadge } from "@/components/FeeBadge";
import { useWallet } from "@/components/WalletContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const tools = [
  { icon: Coins, label: "Mint", colorClass: "bg-mintara-primary/20", iconClass: "text-mintara-primary" },
  { icon: Flame, label: "Burn", colorClass: "bg-mintara-error/20", iconClass: "text-mintara-error" },
  { icon: Send, label: "Multisend", colorClass: "bg-mintara-accent/20", iconClass: "text-mintara-accent" },
  { icon: Info, label: "Info", colorClass: "bg-mintara-warning/20", iconClass: "text-mintara-warning" },
];

export default function TokenBuilderPage() {
  const navigate = useNavigate();
  const { isConnected } = useWallet();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<"upload" | "url">("upload");
  const [logoUrl, setLogoUrl] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    decimals: "9",
    supply: "",
    description: "",
    payWith: "ETH",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowSuccessModal(true);
  };

  const handleAskAI = () => {
    setFormData((prev) => ({
      ...prev,
      name: "Base Meme Token",
      symbol: "BMT",
      supply: "1000000000",
    }));
  };

  return (
    <div className="min-h-screen pt-32 px-6 py-16">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-mintara-text-primary mb-4">Create Your Token on Base</h1>
          <p className="text-3xl md:text-4xl text-mintara-accent mt-3">No Code Needed.</p>
          <div className="h-4" />
          <p className="text-mintara-text-secondary mb-4">Flat Fee ? 1 USDC per token</p>
          <div className="flex justify-center gap-3">
            <FeeBadge />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="icon" size="icon" type="button" onClick={handleAskAI}>
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
                  onChange={(event) => setFormData({ ...formData, name: event.target.value })}
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
                  onChange={(event) => setFormData({ ...formData, symbol: event.target.value })}
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
                  onChange={(event) => setFormData({ ...formData, decimals: event.target.value })}
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
                  onChange={(event) => setFormData({ ...formData, supply: event.target.value })}
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
                onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                className="bg-mintara-background border-mintara-border text-mintara-text-primary focus:border-mintara-accent min-h-[120px]"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-mintara-text-primary">Upload Logo (Optional)</Label>
              <Tabs value={uploadMethod} onValueChange={(value) => setUploadMethod(value as "upload" | "url")}>
                <TabsList className="grid w-full grid-cols-2 bg-mintara-surface/50 border border-mintara-border">
                  <TabsTrigger value="upload">Upload</TabsTrigger>
                  <TabsTrigger value="url">Use URL</TabsTrigger>
                </TabsList>
                <TabsContent value="upload" className="mt-4">
                  <label className="border-2 border-dashed border-mintara-border rounded-lg p-8 text-center hover:border-mintara-accent/50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-mintara-accent mx-auto mb-3" />
                    <p className="text-sm text-mintara-text-primary mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-mintara-text-secondary">PNG or SVG ? 512?512px recommended</p>
                    <input type="file" accept="image/png,image/svg+xml" className="hidden" />
                  </label>
                </TabsContent>
                <TabsContent value="url" className="mt-4">
                  <Input
                    placeholder="https://example.com/logo.png"
                    value={logoUrl}
                    onChange={(event) => setLogoUrl(event.target.value)}
                    className="bg-mintara-background border-mintara-border text-mintara-text-primary focus:border-mintara-accent"
                  />
                </TabsContent>
              </Tabs>
              {uploadMethod === "url" && logoUrl && (
                <div className="mt-3 p-3 bg-mintara-surface/30 border border-mintara-border rounded-lg">
                  <p className="text-xs text-mintara-text-secondary mb-2">Preview:</p>
                  <div className="w-16 h-16 bg-mintara-background border border-mintara-border rounded-lg flex items-center justify-center">
                    <img src={logoUrl} alt="Token logo" className="w-12 h-12 object-cover rounded-full" />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="payWith" className="text-mintara-text-primary">
                Pay With
              </Label>
              <Select value={formData.payWith} onValueChange={(value) => setFormData({ ...formData, payWith: value })}>
                <SelectTrigger className="bg-mintara-background border-mintara-border text-mintara-text-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-mintara-surface border-mintara-border">
                  <SelectItem value="ETH">ETH</SelectItem>
                  <SelectItem value="USDC">USDC</SelectItem>
                  <SelectItem value="MINTA">MINTA</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-mintara-text-secondary mt-2">Estimated Fee: ~0.00042 ETH (~$0.95)</p>
            </div>

            <div className="pt-4">
              <Button type="submit" size="lg" className="w-full" disabled={!isConnected}>
                Create Token
              </Button>
              {!isConnected && (
                <div className="flex items-center gap-2 mt-3 px-4 py-2 rounded-lg bg-mintara-warning/10 border border-mintara-warning/30">
                  <AlertCircle className="w-4 h-4 text-mintara-warning flex-shrink-0" />
                  <p className="text-sm text-mintara-warning">Connect your wallet to continue.</p>
                </div>
              )}
            </div>
          </form>
        </Card>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-mintara-text-primary mb-6">Token Management Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tools.map((tool) => (
              <Card
                key={tool.label}
                className="p-6 bg-mintara-surface/50 border-mintara-border hover:border-mintara-accent/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-mintara-accent/20 cursor-pointer group"
                onClick={() => window.alert(`${tool.label} feature coming soon!`)}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${tool.colorClass}`}>
                    <tool.icon className={`w-6 h-6 ${tool.iconClass}`} />
                  </div>
                  <span className="text-mintara-text-primary font-medium">{tool.label}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Card className="p-8 bg-mintara-surface/50 border-mintara-border backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-mintara-text-primary">Batch Deploy Mode</h2>
            <span className="px-3 py-1 rounded-full bg-mintara-warning/20 text-mintara-warning text-sm font-medium">Pro</span>
          </div>
          <p className="text-mintara-text-secondary mb-6">Deploy multiple tokens at once with our batch creation tool.</p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-mintara-border">
                  <th className="text-left py-3 px-4 text-mintara-text-primary font-medium">Token Name</th>
                  <th className="text-left py-3 px-4 text-mintara-text-primary font-medium">Symbol</th>
                  <th className="text-left py-3 px-4 text-mintara-text-primary font-medium">Supply</th>
                  <th className="text-left py-3 px-4 text-mintara-text-primary font-medium">Fee</th>
                  <th className="text-left py-3 px-4 text-mintara-text-primary font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-mintara-border/50">
                  <td className="py-3 px-4 text-mintara-text-secondary">?</td>
                  <td className="py-3 px-4 text-mintara-text-secondary">?</td>
                  <td className="py-3 px-4 text-mintara-text-secondary">?</td>
                  <td className="py-3 px-4 text-mintara-text-secondary">?</td>
                  <td className="py-3 px-4 text-mintara-text-secondary">?</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Button
            variant="outline"
            className="mt-4 border-mintara-accent text-mintara-accent hover:bg-mintara-accent/10"
            onClick={() => window.alert("Batch deploy feature coming soon!")}
          >
            Add Row
          </Button>
        </Card>
      </div>

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="bg-mintara-surface border-mintara-border max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-mintara-primary/20 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-mintara-accent" />
              </div>
            </div>
            <DialogTitle className="text-mintara-text-primary text-center text-2xl">? Token Created Successfully!</DialogTitle>
            <DialogDescription className="text-mintara-text-secondary text-center pt-2">
              Your token has been deployed to Base Network
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 pt-4">
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => window.open("https://basescan.org", "_blank")}
            >
              <ExternalLink className="w-4 h-4" />
              View on BaseScan
            </Button>
            <Button
              variant="secondary"
              className="w-full gap-2"
              onClick={() => {
                const shareText = `I just created a token on Mintara Base! ??`;
                if (navigator.share) {
                  navigator.share({ text: shareText });
                } else {
                  navigator.clipboard.writeText(shareText);
                  window.alert("Link copied to clipboard!");
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
                navigate("/dashboard");
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
