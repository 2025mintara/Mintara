const ROOT_URL = typeof window !== 'undefined' 
  ? window.location.origin 
  : 'https://your-domain.vercel.app';

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
      `${ROOT_URL}/hero-image.png`,
      `${ROOT_URL}/screenshot-home.png`,
      `${ROOT_URL}/screenshot-token.png`,
      `${ROOT_URL}/screenshot-nft.png`
    ],
    iconUrl: `${ROOT_URL}/icon.png`,
    splashImageUrl: `${ROOT_URL}/splash.png`,
    splashBackgroundColor: "#001A12",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "defi",
    tags: ["base", "tokens", "nft", "ai", "defi", "no-code", "web3"],
    heroImageUrl: `${ROOT_URL}/og-image.png`,
    tagline: "Create, Mint, and Build on Base",
    ogTitle: "Mintara Base - Token & NFT Builder",
    ogDescription: "No-code platform for creating ERC20 tokens and AI-generated NFTs on Base Network",
    ogImageUrl: `${ROOT_URL}/og-image.png`,
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
