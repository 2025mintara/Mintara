export const minikitConfig = {
  frame: {
    version: "next",
    name: "Mintara Base",
    iconUrl: "https://mintara.xyz/icon.png",
    homeUrl: "https://mintara.xyz",
    imageUrl: "https://mintara.xyz/og-image.png",
    buttonTitle: "Launch Mintara",
    splashImageUrl: "https://mintara.xyz/splash.png",
    splashBackgroundColor: "#001A12",
    description: "No-code platform for creating tokens and AI-generated NFTs on Base Network",
    tags: ["defi", "nft", "token", "base", "web3"],
    requiredChains: ["eip155:8453"],
    requiredCapabilities: ["actions.signIn", "wallet.getEthereumProvider"],
  },
  baseBuilder: {
    ownerAddress: "0x71DEdF5544692aF64FC2ce040a2b3dA573957275",
  },
  accountAssociation: {
    header: "",
    payload: "",
    signature: "",
  },
};
