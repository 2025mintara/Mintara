import { Info, ExternalLink, Copy } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { useReadContract } from 'wagmi';
import { ERC20_ABI } from '../utils/tokenFactory';
import { toast } from 'sonner';
import { getBaseScanUrl, copyToClipboard } from '../utils/socialShare';
import type { Address } from 'viem';

interface TokenInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenAddress: string;
}

export function TokenInfoModal({ isOpen, onClose, tokenAddress }: TokenInfoModalProps) {
  const { data: name } = useReadContract({
    address: tokenAddress as Address,
    abi: ERC20_ABI,
    functionName: 'name',
  });

  const { data: symbol } = useReadContract({
    address: tokenAddress as Address,
    abi: ERC20_ABI,
    functionName: 'symbol',
  });

  const { data: decimals } = useReadContract({
    address: tokenAddress as Address,
    abi: ERC20_ABI,
    functionName: 'decimals',
  });

  const { data: totalSupply } = useReadContract({
    address: tokenAddress as Address,
    abi: ERC20_ABI,
    functionName: 'totalSupply',
  });

  const handleCopy = async (text: string) => {
    try {
      await copyToClipboard(text);
      toast.success('Copied to clipboard!');
    } catch {
      toast.error('Failed to copy');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-mintara-surface border-mintara-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-mintara-text-primary flex items-center gap-2">
            <Info className="w-5 h-5 text-mintara-accent" />
            Token Information
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-3">
            <InfoRow label="Name" value={name as string || 'Loading...'} />
            <InfoRow label="Symbol" value={symbol as string || 'Loading...'} />
            <InfoRow label="Decimals" value={decimals?.toString() || 'Loading...'} />
            <InfoRow 
              label="Total Supply" 
              value={totalSupply ? (Number(totalSupply) / Math.pow(10, Number(decimals || 18))).toLocaleString() : 'Loading...'} 
            />
            <div className="pt-2 border-t border-mintara-border">
              <p className="text-sm text-mintara-text-secondary mb-2">Contract Address</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 px-3 py-2 bg-mintara-background rounded text-xs text-mintara-text-primary font-mono break-all">
                  {tokenAddress}
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(tokenAddress)}
                  className="border-mintara-border"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full border-mintara-border text-mintara-text-primary"
            onClick={() => window.open(getBaseScanUrl(tokenAddress, 'token'), '_blank')}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View on BaseScan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-mintara-text-secondary">{label}:</span>
      <span className="text-sm text-mintara-text-primary font-medium">{value}</span>
    </div>
  );
}
