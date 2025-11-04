import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownBasename,
  WalletDropdownDisconnect,
  WalletDropdownLink,
} from '@coinbase/onchainkit/wallet';
import '@coinbase/onchainkit/styles.css';

export function WalletButton() {
  return (
    <Wallet>
      <ConnectWallet />
      <WalletDropdown>
        <WalletDropdownBasename />
        <WalletDropdownLink icon="wallet" href="https://wallet.coinbase.com">
          Wallet
        </WalletDropdownLink>
        <WalletDropdownDisconnect />
      </WalletDropdown>
    </Wallet>
  );
}
