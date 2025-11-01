"use client";
import { ConnectWallet } from "@coinbase/onchainkit/wallet";
import { Transaction } from "@coinbase/onchainkit/transaction";
import { parseEther } from "viem";
import { OWNER_ADDRESS } from "../lib/baseConfig";

export default function MintaraWallet() {
  const calls = [
    {
      to: OWNER_ADDRESS,
      value: parseEther("0.0003"),
      data: "0x",
    },
  ];

  return (
    <div className="flex flex-col items-center gap-4 bg-[#0E0E10]/80 backdrop-blur-lg p-6 rounded-xl shadow-lg">
      <ConnectWallet />
      <Transaction calls={calls} />
      <p className="text-xs text-gray-400 mt-3 text-center">
        Every token or NFT creation includes a 0.0003 ETH Base network fee sent to Mintara.
      </p>
    </div>
  );
}
