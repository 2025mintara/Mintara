import { useState } from 'react';
import { Droplet, Plus, ExternalLink } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';

export function LiquidityPoolCreator() {
  const [formData, setFormData] = useState({
    tokenAddress: '',
    tokenSymbol: '',
    tokenAmount: '',
    ethAmount: '',
    minLiquidity: '',
  });

  const [pools, setPools] = useState<any[]>([]);

  const handleCreatePool = () => {
    if (!formData.tokenAddress || !formData.tokenAmount || !formData.ethAmount) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newPool = {
      id: Date.now().toString(),
      tokenAddress: formData.tokenAddress,
      tokenSymbol: formData.tokenSymbol || 'TOKEN',
      tokenAmount: formData.tokenAmount,
      ethAmount: formData.ethAmount,
      createdAt: new Date().toISOString(),
      dex: 'Aerodrome',
    };

    setPools([...pools, newPool]);
    toast.success('Liquidity pool creation initiated!');
    
    setFormData({
      tokenAddress: '',
      tokenSymbol: '',
      tokenAmount: '',
      ethAmount: '',
      minLiquidity: '',
    });
  };

  const estimatedPrice = formData.tokenAmount && formData.ethAmount
    ? (Number(formData.ethAmount) / Number(formData.tokenAmount)).toFixed(8)
    : '0';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-mintara-text-primary">
          Liquidity Pool Creator
        </h2>
        <p className="text-sm text-mintara-text-secondary mt-1">
          Add liquidity to make your token tradeable on DEXs
        </p>
      </div>

      <Card className="p-8 bg-mintara-surface/50 border-mintara-border">
        <h3 className="text-lg font-semibold text-mintara-text-primary mb-6">
          Create New Pool
        </h3>

        <div className="space-y-6">
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-sm text-blue-300">
              ℹ️ <strong>Supported DEXs on Base:</strong> Aerodrome, Uniswap V3, BaseSwap
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-mintara-text-primary">Token Contract Address</Label>
              <Input
                placeholder="0x..."
                value={formData.tokenAddress}
                onChange={(e) => setFormData({ ...formData, tokenAddress: e.target.value })}
                className="bg-mintara-background border-mintara-border text-mintara-text-primary font-mono"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-mintara-text-primary">Token Symbol</Label>
              <Input
                placeholder="TOKEN"
                value={formData.tokenSymbol}
                onChange={(e) => setFormData({ ...formData, tokenSymbol: e.target.value })}
                className="bg-mintara-background border-mintara-border text-mintara-text-primary"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-mintara-text-primary">Token Amount</Label>
              <Input
                type="number"
                placeholder="1000000"
                value={formData.tokenAmount}
                onChange={(e) => setFormData({ ...formData, tokenAmount: e.target.value })}
                className="bg-mintara-background border-mintara-border text-mintara-text-primary"
              />
              <p className="text-xs text-mintara-text-secondary">
                Amount of {formData.tokenSymbol || 'tokens'} to add to pool
              </p>
            </div>

            <div className="flex items-center justify-center">
              <Plus className="w-5 h-5 text-mintara-accent" />
            </div>

            <div className="space-y-2">
              <Label className="text-mintara-text-primary">ETH Amount</Label>
              <Input
                type="number"
                placeholder="0.1"
                step="0.001"
                value={formData.ethAmount}
                onChange={(e) => setFormData({ ...formData, ethAmount: e.target.value })}
                className="bg-mintara-background border-mintara-border text-mintara-text-primary"
              />
              <p className="text-xs text-mintara-text-secondary">
                Amount of ETH to pair with tokens
              </p>
            </div>
          </div>

          {formData.tokenAmount && formData.ethAmount && (
            <div className="p-4 bg-mintara-primary/10 rounded-lg border border-mintara-primary/30">
              <div className="flex items-center justify-between">
                <span className="text-sm text-mintara-text-secondary">
                  Estimated Price:
                </span>
                <span className="text-lg font-semibold text-mintara-primary">
                  {estimatedPrice} ETH per {formData.tokenSymbol || 'TOKEN'}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-mintara-text-secondary">
                  Pool Share:
                </span>
                <span className="text-sm text-mintara-accent">
                  100% (New Pool)
                </span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label className="text-mintara-text-primary">Minimum Liquidity (Optional)</Label>
            <Input
              type="number"
              placeholder="1000"
              value={formData.minLiquidity}
              onChange={(e) => setFormData({ ...formData, minLiquidity: e.target.value })}
              className="bg-mintara-background border-mintara-border text-mintara-text-primary"
            />
            <p className="text-xs text-mintara-text-secondary">
              Minimum LP tokens to receive
            </p>
          </div>

          <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-xs text-yellow-300">
              ⚠️ <strong>Important:</strong> Make sure you have approved the token spending for the DEX router contract before creating the pool.
            </p>
          </div>

          <Button onClick={handleCreatePool} className="w-full" size="lg">
            <Droplet className="w-5 h-5 mr-2" />
            Create Liquidity Pool
          </Button>
        </div>
      </Card>

      {pools.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-mintara-text-primary mb-4">
            Your Liquidity Pools
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {pools.map((pool) => (
              <Card
                key={pool.id}
                className="p-6 bg-mintara-surface/50 border-mintara-border"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-mintara-text-primary">
                      {pool.tokenSymbol}/ETH
                    </h4>
                    <p className="text-xs text-mintara-text-secondary mt-1">
                      {pool.dex}
                    </p>
                  </div>
                  <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs">
                    Active
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-mintara-text-secondary">Token Amount:</span>
                    <span className="text-mintara-text-primary">
                      {Number(pool.tokenAmount).toLocaleString()} {pool.tokenSymbol}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-mintara-text-secondary">ETH Amount:</span>
                    <span className="text-mintara-text-primary">
                      {pool.ethAmount} ETH
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-mintara-text-secondary">Your Share:</span>
                    <span className="text-mintara-accent">100%</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-mintara-border"
                    onClick={() => window.open('https://aerodrome.finance', '_blank')}
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    View on Aerodrome
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-mintara-border"
                  >
                    Manage
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
