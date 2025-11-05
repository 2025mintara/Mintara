import { useState } from 'react';
import { Lock, Clock, Unlock } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';

interface VestingSchedule {
  id: string;
  tokenAddress: string;
  tokenSymbol: string;
  beneficiary: string;
  amount: string;
  startTime: number;
  cliffDuration: number;
  vestingDuration: number;
  released: string;
  status: 'active' | 'completed';
}

export function TokenVesting() {
  const [vestingSchedules, setVestingSchedules] = useState<VestingSchedule[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const [formData, setFormData] = useState({
    tokenAddress: '',
    tokenSymbol: '',
    beneficiary: '',
    amount: '',
    cliffMonths: '3',
    vestingMonths: '12',
  });

  const handleCreateVesting = () => {
    if (!formData.tokenAddress || !formData.beneficiary || !formData.amount) {
      toast.error('Please fill in all required fields');
      return;
    }

    const now = Math.floor(Date.now() / 1000);
    const cliffDuration = Number(formData.cliffMonths) * 30 * 24 * 60 * 60;
    const vestingDuration = Number(formData.vestingMonths) * 30 * 24 * 60 * 60;

    const newSchedule: VestingSchedule = {
      id: Date.now().toString(),
      tokenAddress: formData.tokenAddress,
      tokenSymbol: formData.tokenSymbol || 'TOKEN',
      beneficiary: formData.beneficiary,
      amount: formData.amount,
      startTime: now,
      cliffDuration,
      vestingDuration,
      released: '0',
      status: 'active',
    };

    setVestingSchedules([...vestingSchedules, newSchedule]);
    toast.success('Vesting schedule created!');
    setShowCreateForm(false);
    
    setFormData({
      tokenAddress: '',
      tokenSymbol: '',
      beneficiary: '',
      amount: '',
      cliffMonths: '3',
      vestingMonths: '12',
    });
  };

  const calculateVested = (schedule: VestingSchedule) => {
    const now = Math.floor(Date.now() / 1000);
    const elapsed = now - schedule.startTime;

    if (elapsed < schedule.cliffDuration) {
      return 0;
    }

    if (elapsed >= schedule.vestingDuration) {
      return Number(schedule.amount);
    }

    const vestedPercentage = elapsed / schedule.vestingDuration;
    return Number(schedule.amount) * vestedPercentage;
  };

  const handleRelease = (scheduleId: string) => {
    const schedule = vestingSchedules.find((s) => s.id === scheduleId);
    if (!schedule) return;

    const vested = calculateVested(schedule);
    const releasable = vested - Number(schedule.released);

    if (releasable <= 0) {
      toast.error('No tokens available to release yet');
      return;
    }

    toast.success(`Released ${releasable.toLocaleString()} ${schedule.tokenSymbol}!`);
    
    setVestingSchedules(
      vestingSchedules.map((s) =>
        s.id === scheduleId
          ? { ...s, released: vested.toString(), status: vested >= Number(s.amount) ? 'completed' : 'active' }
          : s
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-mintara-text-primary">
            Token Vesting
          </h2>
          <p className="text-sm text-mintara-text-secondary mt-1">
            Lock and gradually release tokens over time
          </p>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? 'Cancel' : 'Create Vesting Schedule'}
        </Button>
      </div>

      {showCreateForm && (
        <Card className="p-8 bg-mintara-surface/50 border-mintara-border">
          <h3 className="text-lg font-semibold text-mintara-text-primary mb-6">
            New Vesting Schedule
          </h3>

          <div className="space-y-4">
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

            <div className="space-y-2">
              <Label className="text-mintara-text-primary">Beneficiary Address</Label>
              <Input
                placeholder="0x..."
                value={formData.beneficiary}
                onChange={(e) => setFormData({ ...formData, beneficiary: e.target.value })}
                className="bg-mintara-background border-mintara-border text-mintara-text-primary font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-mintara-text-primary">Total Amount</Label>
              <Input
                type="number"
                placeholder="1000000"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="bg-mintara-background border-mintara-border text-mintara-text-primary"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-mintara-text-primary">Cliff Period (Months)</Label>
                <Input
                  type="number"
                  value={formData.cliffMonths}
                  onChange={(e) => setFormData({ ...formData, cliffMonths: e.target.value })}
                  className="bg-mintara-background border-mintara-border text-mintara-text-primary"
                />
                <p className="text-xs text-mintara-text-secondary">
                  Lock period before vesting starts
                </p>
              </div>
              <div className="space-y-2">
                <Label className="text-mintara-text-primary">Vesting Duration (Months)</Label>
                <Input
                  type="number"
                  value={formData.vestingMonths}
                  onChange={(e) => setFormData({ ...formData, vestingMonths: e.target.value })}
                  className="bg-mintara-background border-mintara-border text-mintara-text-primary"
                />
                <p className="text-xs text-mintara-text-secondary">
                  Total vesting period
                </p>
              </div>
            </div>

            <Button onClick={handleCreateVesting} className="w-full">
              Create Vesting Schedule
            </Button>
          </div>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {vestingSchedules.map((schedule) => {
          const vested = calculateVested(schedule);
          const releasable = vested - Number(schedule.released);
          const progress = (vested / Number(schedule.amount)) * 100;

          return (
            <Card
              key={schedule.id}
              className="p-6 bg-mintara-surface/50 border-mintara-border"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-mintara-text-primary">
                    {schedule.tokenSymbol} Vesting
                  </h3>
                  <p className="text-xs text-mintara-text-secondary font-mono mt-1">
                    {schedule.beneficiary.slice(0, 6)}...{schedule.beneficiary.slice(-4)}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    schedule.status === 'completed'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-mintara-accent/20 text-mintara-accent'
                  }`}
                >
                  {schedule.status === 'completed' ? 'Completed' : 'Active'}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-mintara-text-secondary">Total Amount:</span>
                  <span className="text-mintara-text-primary font-medium">
                    {Number(schedule.amount).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-mintara-text-secondary">Vested:</span>
                  <span className="text-mintara-accent font-medium">
                    {vested.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-mintara-text-secondary">Released:</span>
                  <span className="text-mintara-text-primary font-medium">
                    {Number(schedule.released).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-mintara-text-secondary">Available:</span>
                  <span className="text-green-400 font-medium">
                    {releasable.toLocaleString()}
                  </span>
                </div>

                <div className="pt-2">
                  <div className="h-2 bg-mintara-background rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-mintara-primary to-mintara-accent transition-all duration-500"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-mintara-text-secondary mt-1">
                    {progress.toFixed(1)}% vested
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="p-2 bg-mintara-background rounded text-center">
                    <Clock className="w-4 h-4 text-mintara-accent mx-auto mb-1" />
                    <p className="text-xs text-mintara-text-secondary">Cliff</p>
                    <p className="text-sm text-mintara-text-primary font-medium">
                      {schedule.cliffDuration / (30 * 24 * 60 * 60)} mo
                    </p>
                  </div>
                  <div className="p-2 bg-mintara-background rounded text-center">
                    <Lock className="w-4 h-4 text-mintara-primary mx-auto mb-1" />
                    <p className="text-xs text-mintara-text-secondary">Duration</p>
                    <p className="text-sm text-mintara-text-primary font-medium">
                      {schedule.vestingDuration / (30 * 24 * 60 * 60)} mo
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => handleRelease(schedule.id)}
                  className="w-full"
                  disabled={releasable <= 0}
                >
                  <Unlock className="w-4 h-4 mr-2" />
                  Release {releasable > 0 ? releasable.toLocaleString() : '0'} Tokens
                </Button>
              </div>
            </Card>
          );
        })}

        {vestingSchedules.length === 0 && !showCreateForm && (
          <Card className="p-12 bg-mintara-surface/50 border-mintara-border text-center col-span-2">
            <Lock className="w-12 h-12 text-mintara-text-secondary mx-auto mb-4" />
            <p className="text-mintara-text-secondary">
              No vesting schedules yet. Create one to lock tokens over time.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
