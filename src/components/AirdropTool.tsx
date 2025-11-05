import { useState } from 'react';
import { Upload, Send, X, Download } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { toast } from 'sonner';
import { ERC20_ABI } from '../utils/tokenFactory';
import type { Address } from 'viem';

interface AirdropRecipient {
  address: string;
  amount: string;
}

export function AirdropTool() {
  const [selectedToken, setSelectedToken] = useState('');
  const [recipients, setRecipients] = useState<AirdropRecipient[]>([]);
  const [csvText, setCsvText] = useState('');
  const [isSending, setIsSending] = useState(false);

  const { writeContract } = useWriteContract();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      parseCsv(text);
    };
    reader.readAsText(file);
  };

  const parseCsv = (text: string) => {
    const lines = text.split('\n').filter((line) => line.trim());
    const parsed: AirdropRecipient[] = [];

    for (const line of lines) {
      const [address, amount] = line.split(',').map((s) => s.trim());
      if (address && amount) {
        parsed.push({ address, amount });
      }
    }

    setRecipients(parsed);
    toast.success(`Loaded ${parsed.length} recipients from CSV`);
  };

  const handleManualParse = () => {
    parseCsv(csvText);
  };

  const handleAirdrop = async () => {
    if (!selectedToken) {
      toast.error('Please enter token contract address');
      return;
    }

    if (recipients.length === 0) {
      toast.error('Please add recipients');
      return;
    }

    setIsSending(true);

    try {
      let successCount = 0;
      
      for (const recipient of recipients) {
        try {
          toast.info(`Sending ${recipient.amount} to ${recipient.address.slice(0, 6)}...${recipient.address.slice(-4)}`);
          
          writeContract({
            address: selectedToken as Address,
            abi: ERC20_ABI,
            functionName: 'transfer',
            args: [recipient.address as Address, BigInt(recipient.amount)],
          });

          successCount++;
          await new Promise((resolve) => setTimeout(resolve, 2000));
        } catch (error) {
          console.error(`Failed to send to ${recipient.address}:`, error);
          toast.error(`Failed to send to ${recipient.address.slice(0, 6)}...`);
        }
      }

      toast.success(`Airdrop completed! Sent to ${successCount}/${recipients.length} recipients.`);
    } catch (error) {
      console.error('Airdrop error:', error);
      toast.error('Airdrop failed');
    } finally {
      setIsSending(false);
    }
  };

  const downloadTemplate = () => {
    const template = '# CSV Format: address,amount\n0x1234567890123456789012345678901234567890,1000000000000000000\n0xabcdefabcdefabcdefabcdefabcdefabcdefabcd,2000000000000000000';
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'airdrop-template.csv';
    a.click();
  };

  const totalAmount = recipients.reduce(
    (sum, r) => sum + (Number(r.amount) || 0),
    0
  );

  return (
    <div className="space-y-6">
      <Card className="p-8 bg-mintara-surface/50 border-mintara-border">
        <h2 className="text-2xl font-semibold text-mintara-text-primary mb-6">
          Airdrop Tool
        </h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-mintara-text-primary">Token Contract Address</Label>
            <Input
              placeholder="0x..."
              value={selectedToken}
              onChange={(e) => setSelectedToken(e.target.value)}
              className="bg-mintara-background border-mintara-border text-mintara-text-primary font-mono"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-mintara-text-primary">Upload CSV or Paste Addresses</Label>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => document.getElementById('csv-upload')?.click()}
                className="border-mintara-border"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload CSV
              </Button>
              <input
                id="csv-upload"
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={downloadTemplate}
                className="border-mintara-border"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Template
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-mintara-text-primary">Or Paste CSV Data</Label>
            <Textarea
              placeholder="address,amount&#10;0x1234...,1000000000000000000&#10;0xabcd...,2000000000000000000"
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              className="bg-mintara-background border-mintara-border text-mintara-text-primary font-mono min-h-[120px]"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleManualParse}
              disabled={!csvText}
              className="border-mintara-border"
            >
              Parse CSV
            </Button>
          </div>

          {recipients.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-mintara-text-primary">
                  Recipients ({recipients.length})
                </Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setRecipients([])}
                  className="border-red-500/50 text-red-400"
                >
                  <X className="w-3 h-3 mr-1" />
                  Clear All
                </Button>
              </div>

              <div className="max-h-64 overflow-y-auto space-y-2 p-4 bg-mintara-background rounded-lg border border-mintara-border">
                {recipients.map((recipient, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm p-2 bg-mintara-surface rounded"
                  >
                    <span className="text-mintara-text-primary font-mono text-xs">
                      {recipient.address}
                    </span>
                    <span className="text-mintara-accent">
                      {recipient.amount}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-mintara-primary/10 rounded-lg border border-mintara-primary/30">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-mintara-text-secondary">
                    Total Amount:
                  </span>
                  <span className="text-lg font-semibold text-mintara-primary">
                    {totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={handleAirdrop}
            className="w-full"
            size="lg"
            disabled={isSending || !selectedToken || recipients.length === 0}
          >
            {isSending ? (
              <>
                <Send className="w-5 h-5 mr-2 animate-pulse" />
                Sending Airdrops...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Send Airdrop to {recipients.length} Recipients
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}
