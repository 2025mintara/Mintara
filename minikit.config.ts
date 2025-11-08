export const minikitConfig = {
  accountAssociation: {
    header:
      "eyJmaWQiOjEzOTY0NjIsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHg3MUI4RkU1NGI5ZGI5ODE0RjY1QzBDOWNBRDNkYzQwZTg4M0E2NUU3In0",
    payload: "eyJkb21haW4iOiJtaW50YXJhLnh5eiJ9",
    signature:
      "ZYezOFmles+Y29PLQgrNhnoj/FzVIAzbKD+Edw0X8LZT5hl/chrTcuu9QHmF3XD5wNTryErkCJLGZaw8yr5jdxw=",
  },

  baseBuilder: {
    ownerAddress: "0x71DEdF5544692aF64FC2ce040a2b3dA573957275",
  },

  miniapp: {
    version: "1",
    name: "Mintara Base",
    subtitle: "Token & NFT Builder on Base",
    description:
      "No-code platform for creating ERC20 tokens and AI-generated NFTs on Base Network with 1 USDC per deployment.",
    homeUrl: "https://mintara.xyz",
    iconUrl: "https://mintara.xyz/icon.png",
    splashImageUrl: "https://mintara.xyz/og-image.png",
    splashBackgroundColor: "#001A12",
    screenshotUrls: [
      "https://mintara.xyz/hero-image.png",
      "https://mintara.xyz/screenshot-home.png",
      "https://mintara.xyz/screenshot-token.png",
      "https://mintara.xyz/screenshot-nft.png",
    ],
    primaryCategory: "defi",
    tags: ["base", "tokens", "nft", "ai", "defi", "no-code", "web3", "builder"],
    heroImageUrl: "https://mintara.xyz/og-image.png",
    tagline: "Create, Mint, and Build on Base",
    ogTitle: "Mintara Base - Token & NFT Builder",
    ogDescription:
      "No-code platform for creating ERC20 tokens and AI-generated NFTs on Base Network.",
    ogImageUrl: "https://mintara.xyz/og-image.png",
    noindex: false,
  },
} as const;
