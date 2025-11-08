import { useState } from 'react';
import { Send, Plus, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { toast } from 'sonner';
import { ERC20_ABI } from '../utils/tokenFactory';
import type { Address } from 'viem';
import { parseUnits } from 'viem';
import { base } from 'viem/chains';

interface MultisendModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenAddress: string;
  tokenSymbol: string;
  decimals?: number;
}

interface Recipient {
  id: number;
  address: string;
  amount: string;
}

export function MultisendModal({
  isOpen,
  onClose,
  tokenAddress,
  tokenSymbol,
  decimals: providedDecimals,
}: MultisendModalProps) {
  const [recipients, setRecipients] = useState<Recipient[]>([
    { id: 1, address: '', amount: '' },
  ]);
  const [isSending, setIsSending] = useState(false);
  const { address: userAddress } = useAccount();

  const decimals = providedDecimals ?? 18;
  const decimalsReady = true;

  const { writeContract, data: hash } = useWriteContract();
  const { isSuccess } = useWaitForTransactionReceipt({ hash });

  const addRecipient = () => {
    setRecipients([
      ...recipients,
      { id: Date.now(), address: '', amount: '' },
    ]);
  };

  const removeRecipient = (id: number) => {
    if (recipients.length > 1) {
      setRecipients(recipients.filter((r) => r.id !== id));
    }
  };

  const updateRecipient = (id: number, field: 'address' | 'amount', value: string) => {
    setRecipients(
      recipients.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const handleMultisend = async () => {
    if (!userAddress) {
      toast.error('Please connect your wallet');
      return;
    }

    if (!decimalsReady) {
      toast.error('Loading token decimals...', {
        description: 'Please wait and try again',
      });
      return;
    }

    const validRecipients = recipients.filter((r) => r.address && r.amount);
    
    if (validRecipients.length === 0) {
      toast.error('Please add at least one recipient with address and amount');
      return;
    }

    setIsSending(true);

    try {
      for (const recipient of validRecipients) {
        toast.info(`Sending ${recipient.amount} ${tokenSymbol} to ${recipient.address.slice(0, 6)}...${recipient.address.slice(-4)}`);
        
        const amountInWei = parseUnits(recipient.amount, decimals!);
        
        await writeContract({
          address: tokenAddress as Address,
          abi: ERC20_ABI,
          functionName: 'transfer',
          args: [recipient.address as Address, amountInWei],
          chain: base,
          account: userAddress,
          gas: BigInt(150000),
        });

        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      toast.success(`Multisend completed! Sent to ${validRecipients.length} recipients.`);
      onClose();
      setRecipients([{ id: 1, address: '', amount: '' }]);
    } catch (error: any) {
      console.error('Multisend error:', error);
      const errorMessage = error?.message || error?.toString() || '';
      
      if (errorMessage.includes('User rejected') || errorMessage.includes('User denied')) {
        toast.error('Transaction cancelled by user');
      } else if (errorMessage.includes('insufficient funds') || errorMessage.includes('gas')) {
        toast.error('Insufficient balance', {
          description: 'Check your token balance and ETH for gas fees',
        });
      } else if (errorMessage.includes('Chain mismatch')) {
        toast.error('Wrong network', {
          description: 'Please switch to Base Network in your wallet',
        });
      } else {
        toast.error('Failed to complete multisend', {
          description: errorMessage.length > 100 ? errorMessage.substring(0, 100) + '...' : errorMessage,
        });
      }
    } finally {
      setIsSending(false);
    }
  };

  if (isSuccess) {
    onClose();
  }

  const totalAmount = recipients.reduce(
    (sum, r) => sum + (Number(r.amount) || 0),
    0
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-mintara-surface border-mintara-border max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-mintara-text-primary flex items-center gap-2">
            <Send className="w-5 h-5 text-mintara-accent" />
            Multisend {tokenSymbol}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-3">
            {recipients.map((recipient, index) => (
              <div
                key={recipient.id}
                className="flex gap-2 items-start p-3 bg-mintara-background rounded-lg border border-mintara-border"
              >
                <div className="flex-1 space-y-2">
                  <div>
                    <Label className="text-xs text-mintara-text-secondary">
                      Recipient #{index + 1} Address
                    </Label>
                    <Input
                      placeholder="0x..."
                      value={recipient.address}
                      onChange={(e) =>
                        updateRecipient(recipient.id, 'address', e.target.value)
                      }
                      className="bg-mintara-surface border-mintara-border text-mintara-text-primary font-mono text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-mintara-text-secondary">
                      Amount (in {tokenSymbol})
                    </Label>
                    <Input
                      type="text"
                      placeholder={`Amount (e.g., 1000)`}
                      value={recipient.amount}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || /^\d*\.?\d*$/.test(value)) {
                          updateRecipient(recipient.id, 'amount', value);
                        }
                      }}
                      className="bg-mintara-surface border-mintara-border text-mintara-text-primary"
                    />
                  </div>
                </div>
                {recipients.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeRecipient(recipient.id)}
                    className="border-red-500/50 text-red-400 hover:bg-red-500/10 mt-6"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            onClick={addRecipient}
            className="w-full border-mintara-border text-mintara-text-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Recipient
          </Button>

          <div className="p-3 bg-mintara-primary/10 rounded-lg border border-mintara-primary/30">
            <div className="flex justify-between items-center">
              <span className="text-sm text-mintara-text-secondary">
                Total Amount:
              </span>
              <span className="text-lg font-semibold text-mintara-primary">
                {totalAmount.toLocaleString()} {tokenSymbol}
              </span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-mintara-text-secondary">
                Recipients:
              </span>
              <span className="text-sm text-mintara-accent">
                {recipients.filter((r) => r.address && r.amount).length}
              </span>
            </div>
            {decimalsReady ? (
              <p className="text-xs text-mintara-text-secondary mt-2">
                Token decimals: {decimals}. Enter token amounts directly (e.g., "1" = 1 {tokenSymbol})
              </p>
            ) : (
              <p className="text-xs text-mintara-text-secondary mt-2 animate-pulse">
                Loading decimals...
              </p>
            )}
          </div>

          <Button
            onClick={handleMultisend}
            className="w-full"
            disabled={isSending || recipients.filter((r) => r.address && r.amount).length === 0}
          >
            {isSending ? (
              <>
                <Send className="w-4 h-4 mr-2 animate-pulse" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send to All Recipients
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
