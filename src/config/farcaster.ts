export const minikitConfig = {
  accountAssociation: {
    header: "eyJmaWQiOjEzOTY0NjIsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHg3MUI4RkU1NGI5ZGI5ODE0RjY1QzBDOWNBRDNkYzQwZTg4M0E2NUU3In0",
    payload: "eyJkb21haW4iOiJtaW50YXJhLnh5eiJ9",
    signature: "ZYezOFmles+Y29PLQgrNhnoj/FzVIAzbKD+Edw0X8LZT5hl/chrTcuu9QHmF3XD5wNTryErkCJLGZaw8yr5jdxw="
  },
  miniapp: {
    version: "1",
    name: "Mintara Base",
    subtitle: "Token & NFT Builder on Base",
    description: "Create ERC20 tokens and AI-generated NFTs on Base Network with no coding required. 1 USDC per deployment.",
    screenshotUrls: [
      "https://mintara.xyz/hero-image.png",
      "https://mintara.xyz/screenshot-home.png",
      "https://mintara.xyz/screenshot-token.png",
      "https://mintara.xyz/screenshot-nft.png"
    ],
    iconUrl: "https://mintara.xyz/icon.png",
    splashImageUrl: "https://mintara.xyz/splash.png",
    splashBackgroundColor: "#001A12",
    homeUrl: "https://mintara.xyz",
    webhookUrl: "",
    primaryCategory: "defi",
    tags: ["base", "tokens", "nft", "ai", "defi", "no-code", "web3"],
    heroImageUrl: "https://mintara.xyz/hero-image.png",
    tagline: "Your all-in-one token and NFT creation suite on Base Network",
    ogTitle: "Mintara Base - Token & NFT Builder on Base Network",
    ogDescription: "Create ERC20 tokens and AI-generated NFTs on Base Network with no coding required. Deploy in seconds with just 1 USDC.",
    ogImageUrl: "https://mintara.xyz/og-image.png",
    noindex: false
  },
  baseBuilder: {
    ownerAddress: "0x71DEdF5544692aF64FC2ce040a2b3dA573957275"
  }
} as const;

export const PLATFORM_CONFIG = {
  name: "Mintara Base",
  ownerWallet: "0x71DEdF5544692aF64FC2ce040a2b3dA573957275",
  tokenFactory: "0x8384442FA9384F6276Cf175F8EB48c737ee204a6",
  nftFactory: "0x56ba49A2a1fcd316B92355B1ccc12638cC1EefA8",
  usdcAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  chainId: 8453,
  chain: "base",
  feeAmount: "1", // 1 USDC
} as const;
