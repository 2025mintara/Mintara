"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Wallet } from "@coinbase/onchainkit/wallet";
import { Transaction } from "@coinbase/onchainkit/transaction";
import { Buy } from "@coinbase/onchainkit/buy";
import { FundCard } from "@coinbase/onchainkit/fund";
import { Token } from "@coinbase/onchainkit/token";

export default function Home() {
  // Mintara için fee yönlendirmesi
  const OWNER_ADDRESS = "0x59B16A1c411536241390484C4Da404b365336b45";

  // USDC örneği
  const usdcToken: Token = {
    name: "USDC",
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    symbol: "USDC",
    decimals: 6,
    chainId: 8453, // Base Mainnet
    image: "/usdc.svg",
  };

  // Fee işlemi için transaction örneği
  const calls = [
    {
      to: OWNER_ADDRESS,
      value: "10000000000000000", // 0.01 ETH örnek ücret (gerektiğinde güncellenebilir)
    },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.headerWrapper}>
        <Wallet />
      </header>

      <div className={styles.content}>
        <Image
          priority
          src="/sphere.svg"
          alt="Sphere"
          width={200}
          height={200}
        />
        <h1 className={styles.title}>Mintara Base Integration</h1>

        <p>
          Get started by editing <code>app/page.tsx</code>  
          <br />Integrated with <strong>Base Network</strong> for token and NFT creation.
        </p>

        <h2 className={styles.componentsTitle}>Explore Components</h2>

        <ul className={styles.components}>
          {[
            {
              name: "Transaction",
              url: "https://docs.base.org/onchainkit/transaction/transaction",
            },
            {
              name: "Swap",
              url: "https://docs.base.org/onchainkit/swap/swap",
            },
            {
              name: "Checkout",
              url: "https://docs.base.org/onchainkit/checkout/checkout",
            },
            {
              name: "Wallet",
              url: "https://docs.base.org/onchainkit/wallet/wallet",
            },
            {
              name: "Identity",
              url: "https://docs.base.org/onchainkit/identity/identity",
            },
          ].map((component) => (
            <li key={component.name}>
              <a target="_blank" rel="noreferrer" href={component.url}>
                {component.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Fee yönlendirme (otomatik işlemler) */}
        <Transaction calls={calls} />

        {/* Token alım örneği */}
        <Buy toToken={usdcToken} />

        {/* Kullanıcının Base hesabını doldurması için fonlama kartı */}
        <FundCard
          assetSymbol="ETH"
          country="TR"
          currency="USD"
          presetAmountInputs={["5", "10", "20"]}
        />
      </div>
    </div>
  );
}
