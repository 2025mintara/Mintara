import { Wallet, Copy, ExternalLink, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { useWallet } from './WalletContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export function WalletButton() {
  const { isConnected, address, connect, disconnect, copyAddress } = useWallet();

  if (!isConnected) {
    return (
      <Button onClick={connect} size="sm" className="gap-2 rounded-xl">
        <Wallet className="w-4 h-4" />
        Connect Wallet
      </Button>
    );
  }

  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-mintara-primary/20 border-2 border-transparent bg-gradient-to-r from-mintara-accent/20 to-mintara-primary-glow/20 hover:border-mintara-accent/50 transition-all duration-200 group">
                <div className="w-2 h-2 rounded-full bg-mintara-primary animate-pulse"></div>
                <span className="text-sm font-semibold text-mintara-text-primary group-hover:text-mintara-accent transition-colors">
                  {address}
                </span>
                <Wallet className="w-4 h-4 text-mintara-accent" />
              </button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Connected to Base Mainnet</p>
          </TooltipContent>
        </Tooltip>

        <DropdownMenuContent
          align="end"
          className="w-56 bg-mintara-surface/95 backdrop-blur-xl border-mintara-border"
        >
          <DropdownMenuItem
            onClick={copyAddress}
            className="cursor-pointer text-mintara-text-primary hover:text-mintara-accent hover:bg-mintara-accent/10"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Address
          </DropdownMenuItem>
          
          <DropdownMenuItem
            onClick={() => window.open('https://basescan.org/', '_blank')}
            className="cursor-pointer text-mintara-text-primary hover:text-mintara-accent hover:bg-mintara-accent/10"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View on BaseScan
          </DropdownMenuItem>
          
          <DropdownMenuSeparator className="bg-mintara-border" />
          
          <DropdownMenuItem
            onClick={disconnect}
            className="cursor-pointer text-mintara-text-primary hover:text-red-400 hover:bg-red-500/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
}
