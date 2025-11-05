import { useState } from 'react';
import { X, Send, Coins, Flame } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { toast } from 'sonner';
import { ERC20_ABI } from '../utils/tokenFactory';
import type { Address } from 'viem';

interface TokenManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenAddress: string;
  tokenSymbol: string;
  action: 'mint' | 'burn' | 'transfer' | null;
}

export function TokenManagementModal({
  isOpen,
  onClose,
  tokenAddress,
  tokenSymbol,
  action,
}: TokenManagementModalProps) {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  const { writeContract, data: hash } = useWriteContract();
  const { isSuccess } = useWaitForTransactionReceipt({ hash });

  const handleAction = () => {
    if (!amount) {
      toast.error('Please enter an amount');
      return;
    }

    if (action === 'transfer' && !recipient) {
      toast.error('Please enter a recipient address');
      return;
    }

    try {
      if (action === 'mint') {
        writeContract({
          address: tokenAddress as Address,
          abi: ERC20_ABI,
          functionName: 'mint',
          args: [recipient as Address || tokenAddress as Address, BigInt(amount)],
        });
      } else if (action === 'burn') {
        writeContract({
          address: tokenAddress as Address,
          abi: ERC20_ABI,
          functionName: 'burn',
          args: [BigInt(amount)],
        });
      } else if (action === 'transfer') {
        writeContract({
          address: tokenAddress as Address,
          abi: ERC20_ABI,
          functionName: 'transfer',
          args: [recipient as Address, BigInt(amount)],
        });
      }
      toast.success(`${action} transaction initiated!`);
    } catch (error) {
      toast.error(`Failed to ${action} tokens`);
    }
  };

  if (isSuccess) {
    onClose();
    toast.success(`${action} completed successfully!`);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-mintara-surface border-mintara-border">
        <DialogHeader>
          <DialogTitle className="text-mintara-text-primary flex items-center gap-2">
            {action === 'mint' && <Coins className="w-5 h-5 text-mintara-primary" />}
            {action === 'burn' && <Flame className="w-5 h-5 text-mintara-error" />}
            {action === 'transfer' && <Send className="w-5 h-5 text-mintara-accent" />}
            {action?.charAt(0).toUpperCase()}{action?.slice(1)} {tokenSymbol}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label className="text-mintara-text-primary">Amount</Label>
            <Input
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-mintara-background border-mintara-border text-mintara-text-primary"
            />
          </div>
          {action === 'transfer' && (
            <div className="space-y-2">
              <Label className="text-mintara-text-primary">Recipient Address</Label>
              <Input
                placeholder="0x..."
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="bg-mintara-background border-mintara-border text-mintara-text-primary font-mono"
              />
            </div>
          )}
          <Button onClick={handleAction} className="w-full">
            Confirm {action}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
