# Mintara Base - Token & NFT Builder Platform

## Overview
Mintara Base is a no-code platform designed to simplify the creation of tokens and AI-generated NFTs on the Base Network. It aims to make tokenization and NFT creation accessible to users without any coding knowledge. The platform includes a Token Builder, AI NFT Builder, a comprehensive Dashboard for managing creations, and a Launchpad for token projects, all integrated with wallet functionality for the Base Network.

## User Preferences
I prefer iterative development and want to be involved in key decisions. Please ask before making major architectural changes or introducing new external dependencies. I also prefer clear and concise explanations.

## System Architecture
The platform is built with React 19.0.0, Vite, and TypeScript for the frontend, utilizing Tailwind CSS 4.1.16 with a custom Mintara theme and Radix UI components for accessible interfaces. Key features include a Token Builder, AI NFT Builder (using Pollinations AI for free image generation), a Dashboard with NFT Gallery, Liquidity Pool Creator, Airdrop Tool, and Token Vesting/Locking functionalities.

Wallet integration is handled via RainbowKit (supporting multiple wallets like Rainbow, MetaMask, Coinbase, WalletConnect, Safe, Trust Wallet, Rabby, Phantom) and Coinbase OnchainKit, specifically configured for the Base Network (Chain ID: 8453). All platform fees (1 USDC per token deployment/NFT mint) are automatically routed to the owner's wallet (0x71DEdF5544692aF64FC2ce040a2b3dA573957275) in USDC on the Base Network, implemented as a two-step transaction process. Smart contracts include MintaraTokenFactory and MintaraNFTFactory, deployed on the Base Network. Token logos are uploaded to Pinata IPFS for permanent storage. The application supports dark mode via `next-themes`.

The UI adheres to a specific Mintara brand color scheme:
- Background: #001A12 (Dark emerald)
- Surface: #03261B
- Primary: #00A676 (Mintara green)
- Accent: #00E0C6 (Turquoise)
- Text Primary: #E8FFF5
- Text Secondary: #A7DAC6

## Recent Changes
### November 8, 2025 - Production-Ready Deployment Build
- **CRITICAL FIX - Token Decimals**: TokenManagementModal and MultisendModal now correctly handle token decimals from getUserTokens or via useReadContract, fixing amount calculation errors
- **Base Chain Integration**: All writeContract calls use `chain: base` from viem/chains (no more chainId)
- **NFT Minting**: Full Base chain with `account: address`, gas fallback, comprehensive error messages
- **Error Handling**: Specific messages for "Minting is disabled", "Only owner", "Insufficient payment", gas errors
- **Token Management**: All operations (Mint, Burn, Transfer, Multisend) use correct decimals for amount calculations
- **Dashboard**: All token management buttons fully functional with proper decimals from getUserTokens
- **Deployment Config**: Vite build output set to 'dist', deployment target 'autoscale', npm run preview configured
- **Production Ready**: Architect review PASSED - no blockers, ready for Vercel deployment
- **Whitepaper Updated**: New tokenomics (Airdrop 15%, Presale 15%, Dev 25%), Core Values, Roadmap
- **Clean Codebase**: 77 source files, no test files, optimized structure

### November 7, 2025 - NFT Minting System Implementation
- Payment → Collection creation → Metadata IPFS upload → NFT mint flow working
- Collection address captured from `NFTCollectionCreated` event logs
- NFT metadata (name, description, image, attributes) automatically uploaded to Pinata IPFS
- Success Modal displays collection address with copy button and BaseScan link
- NFTs appear in wallets using ERC721 metadata standard
- Token logos uploaded to Pinata IPFS with "Stored on IPFS" badge indicator
- Token Management Modal: Fully functional with Mint, Burn, Transfer, Multisend operations

## External Dependencies
- **Web3**:
    - RainbowKit (for wallet connection)
    - Coinbase OnchainKit (Base-specific features, wallet modal, identity components)
    - wagmi & viem (Web3 hooks and utilities)
    - Base Network (blockchain)
    - USDC (payment token on Base Network: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
- **AI Image Generation**: Pollinations AI (FLUX model)
- **IPFS Storage**: Pinata (for NFT and token logo storage)
- **Social**:
    - Farcaster (@farcaster/miniapp-sdk)
    - Twitter API (for sharing features)
- **UI Libraries**:
    - Radix UI
    - Lucide React (icons)
    - Recharts (charts)
    - Sonner (notifications)
    - next-themes (dark mode)
- **Forms**: React Hook Form