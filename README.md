# Mintara Base - Fully Functional DApp

A decentralized application (DApp) for creating tokens and AI-generated NFTs on Base Network.

## Features

- ? **Token Builder**: Deploy ERC-20 tokens on Base Network
- ? **AI NFT Builder**: Generate and mint NFTs using Hugging Face AI
- ? **Launchpad**: Participate in Initial Validator Offerings (IVOs)
- ? **Dashboard**: View and manage your created tokens and NFTs
- ? **Whitepaper**: Complete project documentation
- ? **Web3 Integration**: wagmi + RainbowKit for wallet connections

## Tech Stack

- **Framework**: React + TypeScript + Vite
- **Styling**: TailwindCSS + Shadcn/UI
- **Web3**: wagmi v2 + viem + ethers.js v6 + RainbowKit
- **APIs**: Hugging Face (AI), IPFS (Pinata/Web3.Storage)
- **Routing**: react-router-dom v6
- **State**: localStorage (tokens, NFTs, IVO participations)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env` and fill in your API keys:

```bash
cp .env.example .env
```

Required environment variables:
- `VITE_BASE_RPC_URL` - Base Network RPC URL (default: https://mainnet.base.org)
- `VITE_HF_TOKEN` - Hugging Face API token (for AI NFT generation)
- `VITE_IPFS_KEY` - IPFS API key (Pinata or Web3.Storage)
- `VITE_WALLETCONNECT_PROJECT_ID` - WalletConnect project ID (optional)

### 3. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

## Project Structure

```
src/
??? components/
?   ??? pages/
?   ?   ??? Home.tsx              # Landing page
?   ?   ??? TokenBuilder.tsx      # ERC-20 token creation
?   ?   ??? AINFTBuilder.tsx      # AI NFT generation
?   ?   ??? Launchpad.tsx         # IVO listings
?   ?   ??? Dashboard.tsx         # User creations
?   ?   ??? Whitepaper.tsx        # Project documentation
?   ??? ui/                       # Shadcn/UI components
?   ??? Navbar.tsx
?   ??? Footer.tsx
?   ??? WalletButton.tsx
?   ??? WalletContext.tsx
??? lib/
?   ??? baseConfig.ts             # Base Network configuration
?   ??? hf.ts                     # Hugging Face API integration
?   ??? ipfs.ts                   # IPFS upload utilities
?   ??? contracts.ts              # ERC-20 deployment logic
?   ??? web3Provider.tsx          # wagmi + RainbowKit setup
??? App.tsx                        # Main app with routing
```

## Usage

### Creating Tokens

1. Navigate to "Token Builder"
2. Connect your wallet
3. Fill in token details (name, symbol, supply, etc.)
4. Click "Create Token"
5. Approve the transaction in your wallet
6. Token will be saved to your dashboard

### Generating NFTs

1. Navigate to "AI NFT Builder"
2. Enter a prompt describing your desired NFT
3. Click "Generate with AI" (requires Hugging Face API token)
4. Select from generated previews
5. Fill in metadata and click "Mint Now"
6. NFT will be uploaded to IPFS and saved to your dashboard

### Participating in IVOs

1. Navigate to "Launchpad"
2. Browse active Initial Validator Offerings
3. Click "Participate" on desired IVO
4. Approve the transaction
5. Participation will be saved locally

## Storage

The app uses `localStorage` for persistence:
- `mintara_tokens` - Deployed tokens
- `mintara_nfts` - Minted NFTs
- `mintara_ivo_participations` - IVO participations

## Smart Contract Deployment

**Note**: The current `contracts.ts` file contains placeholder bytecode. For production deployment:

1. Compile a real ERC-20 contract (e.g., using OpenZeppelin)
2. Update `ERC20_BYTECODE` in `src/lib/contracts.ts` with compiled bytecode
3. Or use a factory contract deployment pattern

## API Keys

### Hugging Face
1. Go to https://huggingface.co/settings/tokens
2. Create a new token
3. Add to `.env` as `VITE_HF_TOKEN`

### IPFS (Pinata)
1. Sign up at https://pinata.cloud
2. Get your API key from the dashboard
3. Add to `.env` as `VITE_IPFS_KEY`

### IPFS (Web3.Storage)
1. Sign up at https://web3.storage
2. Create an API token
3. Add to `.env` as `VITE_IPFS_KEY`
4. Set `VITE_IPFS_PROVIDER=web3storage`

## Network

The app is configured for **Base Mainnet** (Chain ID: 8453).

To switch to Base Sepolia testnet, update:
- `src/lib/baseConfig.ts` - Chain ID and RPC URL
- `src/lib/web3Provider.tsx` - Import `baseSepolia` instead of `base`

## License

See LICENSE file for details.

## Support

For issues or questions, please open a GitHub issue.
