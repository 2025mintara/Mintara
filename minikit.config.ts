// minikit.config.ts
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

  frame: {
    version: "next",
    imageUrl: "https://mintara.xyz/og-image.png",
    button: {
      title: "Launch Mintara Base",
      action: {
        type: "launch_frame",
        name: "Mintara Base",
        url: "https://mintara.xyz/",
        splashImageUrl: "https://mintara.xyz/og-image.png",
        splashBackgroundColor: "#001A12",
      },
    },
  },

  miniapp: {
    version: "1",
    name: "Mintara Base",
    subtitle: "Token & NFT Builder on Base",
    description:
      "Create ERC20 tokens and AI-generated NFTs on Base Network with no coding required. Built on Base Network.",
    screenshotUrls: [
      "https://mintara.xyz/hero-image.png",
      "https://mintara.xyz/screenshot-home.png",
      "https://mintara.xyz/screenshot-token.png",
      "https://mintara.xyz/screenshot-nft.png",
    ],
    iconUrl: "https://mintara.xyz/icon.png",
    splashImageUrl: "https://mintara.xyz/og-image.png",
    splashBackgroundColor: "#001A12",
    homeUrl: "https://mintara.xyz/",
    webhookUrl: "",
    primaryCategory: "defi",
    tags: [
      "base",
      "tokens",
      "nft",
      "ai",
      "defi",
      "no-code",
      "web3",
      "builder",
      "mintara",
    ],
    heroImageUrl: "https://mintara.xyz/og-image.png",
    tagline: "Create, Mint, and Build on Base",
    ogTitle: "Mintara Base - Token & NFT Builder",
    ogDescription:
      "No-code platform for creating ERC20 tokens and AI-generated NFTs on Base Network.",
    ogImageUrl: "https://mintara.xyz/og-image.png",
    noindex: false,
  },
} as const;
