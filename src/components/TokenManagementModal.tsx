import { useState, useEffect } from 'react';
import { Send, Coins, Flame } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { toast } from 'sonner';
import { ERC20_ABI } from '../utils/tokenFactory';
import { parseUnits } from 'viem';
import type { Address } from 'viem';
import { base } from 'viem/chains';

interface TokenManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenAddress: string;
  tokenSymbol: string;
  action: 'mint' | 'burn' | 'transfer' | null;
  decimals?: number;
}

export function TokenManagementModal({
  isOpen,
  onClose,
  tokenAddress,
  tokenSymbol,
  action,
  decimals: providedDecimals,
}: TokenManagementModalProps) {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const { address: userAddress } = useAccount();

  const decimals = providedDecimals ?? 18;
  const decimalsReady = true;

  const { writeContract, data: hash } = useWriteContract();
  const { isSuccess, isError } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isSuccess) {
      toast.success(`${action} completed successfully!`);
      onClose();
      setAmount('');
      setRecipient('');
    }
  }, [isSuccess, action, onClose]);

  useEffect(() => {
    if (isError) {
      toast.error(`${action} transaction failed`);
    }
  }, [isError, action]);

  const handleAction = async () => {
    if (!amount) {
      toast.error('Please enter an amount');
      return;
    }

    if (action === 'transfer' && !recipient) {
      toast.error('Please enter a recipient address');
      return;
    }

    if ((action === 'mint') && !recipient) {
      toast.error('Please enter a recipient address for minting');
      return;
    }

    if (!decimalsReady) {
      toast.error('Loading token decimals...', {
        description: 'Please wait a moment and try again',
      });
      return;
    }

    try {
      if (!userAddress) {
        toast.error('Please connect your wallet');
        return;
      }

      const amountInWei = parseUnits(amount, decimals!);

      if (action === 'mint') {
        await writeContract({
          address: tokenAddress as Address,
          abi: ERC20_ABI,
          functionName: 'mint',
          args: [recipient as Address, amountInWei],
          chain: base,
          account: userAddress,
          gas: BigInt(200000),
        });
      } else if (action === 'burn') {
        await writeContract({
          address: tokenAddress as Address,
          abi: ERC20_ABI,
          functionName: 'burn',
          args: [amountInWei],
          chain: base,
          account: userAddress,
          gas: BigInt(200000),
        });
      } else if (action === 'transfer') {
        await writeContract({
          address: tokenAddress as Address,
          abi: ERC20_ABI,
          functionName: 'transfer',
          args: [recipient as Address, amountInWei],
          chain: base,
          account: userAddress,
          gas: BigInt(200000),
        });
      }
      toast.info(`${action} transaction sent! Waiting for confirmation...`);
    } catch (error: any) {
      console.error(`${action} error:`, error);
      const errorMessage = error?.message || error?.toString() || '';
      
      if (errorMessage.includes('User rejected') || errorMessage.includes('User denied')) {
        toast.error('Transaction cancelled by user');
      } else if (errorMessage.includes('insufficient funds') || errorMessage.includes('gas')) {
        toast.error('Insufficient balance for gas fees', {
          description: 'Make sure you have enough ETH on Base Network for gas',
        });
      } else if (errorMessage.includes('Chain mismatch')) {
        toast.error('Wrong network', {
          description: 'Please switch to Base Network in your wallet',
        });
      } else if (errorMessage.includes('Minting is disabled') || errorMessage.includes('not mintable')) {
        toast.error('Token minting is disabled', {
          description: 'This token was created without minting capabilities',
        });
      } else if (errorMessage.includes('Burning is disabled') || errorMessage.includes('not burnable')) {
        toast.error('Token burning is disabled', {
          description: 'This token was created without burning capabilities',
        });
      } else {
        toast.error(`Failed to ${action} tokens`, {
          description: errorMessage.length > 100 ? errorMessage.substring(0, 100) + '...' : errorMessage,
        });
      }
    }
  };

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
            <Label className="text-mintara-text-primary">
              Amount (in {tokenSymbol} tokens)
            </Label>
            <Input
              type="text"
              placeholder={`Enter amount (e.g., 1000 for 1000 ${tokenSymbol})`}
              value={amount}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^\d*\.?\d*$/.test(value)) {
                  setAmount(value);
                }
              }}
              className="bg-mintara-background border-mintara-border text-mintara-text-primary"
            />
            {decimalsReady ? (
              <p className="text-xs text-mintara-text-secondary">
                Token has {decimals} decimals. Enter the amount you want (e.g., "1" = 1 {tokenSymbol})
              </p>
            ) : (
              <p className="text-xs text-mintara-text-secondary animate-pulse">
                Loading token decimals...
              </p>
            )}
          </div>
          {(action === 'transfer' || action === 'mint') && (
            <div className="space-y-2">
              <Label className="text-mintara-text-primary">
                {action === 'mint' ? 'Recipient Address (for minting)' : 'Recipient Address'}
              </Label>
              <Input
                placeholder="0x..."
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="bg-mintara-background border-mintara-border text-mintara-text-primary font-mono"
              />
            </div>
          )}
          <Button 
            onClick={handleAction} 
            className="w-full"
          >
            Confirm {action}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
