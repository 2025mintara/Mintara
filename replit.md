# Mintara Base - Token & NFT Builder Platform

## Overview
Mintara Base is a no-code platform for creating tokens and AI-generated NFTs on the Base Network. The platform simplifies the process of tokenization and NFT creation, making it accessible to users without requiring any coding knowledge.

## Project Structure
- **Frontend**: React + Vite + TypeScript
- **Styling**: Tailwind CSS v4 + Custom Mintara theme
- **UI Components**: Radix UI components for accessible interfaces
- **Port**: Development server runs on port 5000

## Key Features
1. **Token Builder** - Create custom tokens on Base Network without code
2. **AI NFT Builder** - Generate and mint AI-powered NFTs using SDXL Turbo
3. **Dashboard** - Manage your created tokens and NFTs
4. **Launchpad** - Launch your token projects
5. **Wallet Integration** - Connect wallet functionality for Base Network

## Technology Stack
- **Framework**: React 19.0.0
- **Build Tool**: Vite 6.3.5
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1.16 with @tailwindcss/postcss
- **UI Library**: Radix UI components
- **Wallet Integration**: Coinbase OnchainKit 1.1.2 with wagmi & viem
- **Web3**: Base Network (Chain ID: 8453)
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Charts**: Recharts
- **Notifications**: Sonner
- **Theme**: next-themes for dark mode support

## Development Setup
The project is configured to run on Replit with:
- Host: 0.0.0.0
- Port: 5000
- HMR enabled with client port 5000

## Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production

## Fee Payment System
All platform fees are automatically sent to the owner wallet address via USDC on Base Network:
- **Owner Wallet**: 0x71DEdF5544692aF64FC2ce040a2b3dA573957275
- **Token Builder Fee**: 1 USDC per token deployment
- **NFT Builder Fee**: 1 USDC per NFT mint
- **Payment Method**: USDC (Base Network contract: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
- **Payment Flow**: User connects wallet → Creates token/NFT → Pays 1 USDC to owner → Transaction confirmed → Token deployed/NFT minted

## Recent Changes

### November 4, 2025 - Very Late Night (FINAL FIXES v2)
- **NFT AI BUILDER FIX**: Switched to Pollinations AI (completely free, no API key needed)
- Pollinations AI uses FLUX model for high-quality NFT generation
- Removed Hugging Face dependency (their API endpoint changed and is no longer free-tier friendly)
- NFT Builder now works instantly with zero setup required
- All critical issues resolved:
  1. ✅ Wallet modal shows correct Mintara logo
  2. ✅ NFT Builder generates real AI images (FREE via Pollinations)
  3. ✅ Wallet connection persists across pages
  4. ✅ Token Builder logo upload works perfectly

### November 4, 2025 - Very Late Night (FINAL FIXES)
- **WALLET PERSISTENCE FIX**: Added localStorage storage to wagmi config for persistent wallet connections across pages
- **LOGO FIX**: Created public/logo.svg with Mintara brand gradient logo for OnchainKit wallet modal
- Updated wagmi connector to use new logo.svg in appLogoUrl
- Added createStorage with localStorage to maintain wallet state across navigation

### November 4, 2025 - Very Late Night
- Fixed Token Builder logo upload - now opens file input properly with file preview
- Created src/utils/huggingface.ts for real AI image generation
- Added HUGGINGFACE_API_KEY to environment (via Replit Secrets)
- Token Builder has working file upload with drag-and-drop support and image preview
- All TypeScript errors resolved

### November 4, 2025 - Late Night
- **WALLET MODAL FIX**: Configured OnchainKit wallet modal with Coinbase Smart Wallet
- Simplified wagmi connectors to use only Coinbase Wallet for better OnchainKit integration
- Added Identity components (Avatar, Name, Address, EthBalance) to WalletDropdown
- Set wallet display mode to 'modal' in OnchainKitProvider config
- Modal infrastructure is in place (WalletModal, Dialog components rendering)
- Removed unused connector imports (walletConnect, injected)

### November 4, 2025 - Late Evening
- **CRITICAL**: Implemented real blockchain fee payment system
- Created feePayment.ts utility with USDC contract integration
- Integrated wagmi's useWriteContract and useWaitForTransactionReceipt hooks
- TokenBuilder now processes real USDC payments to owner wallet before deployment
- AINFTBuilder now processes real USDC payments to owner wallet before minting
- Added loading states and transaction confirmation handling
- All fees (100%) automatically go to owner wallet: 0x71DEdF5544692aF64FC2ce040a2b3dA573957275
- Users see real-time transaction status with toast notifications
- Customized OnchainKit wallet button with Mintara theme (green/turquoise gradient)
- Moved all OnchainKit CSS to globals.css for cleaner imports

### November 4, 2025 - Evening
- **Major Upgrade**: Integrated Coinbase OnchainKit for real wallet connectivity
- Upgraded to React 19.0.0 (required for OnchainKit compatibility)
- Added wagmi, viem, and @tanstack/react-query for Web3 functionality
- Replaced mock WalletContext with real OnchainKit wallet components
- Configured WagmiProvider and OnchainKitProvider for Base Network
- Removed old WalletContext system entirely
- Updated TokenBuilder and AINFTBuilder to use wagmi's useAccount hook
- OnchainKit supports Metamask, Coinbase Wallet, WalletConnect, and more

### November 4, 2025 - Afternoon
- Fixed critical Tailwind CSS v4 issue by adding `@import "tailwindcss"` to globals.css
- Fixed Tailwind CSS color configuration (removed hsl() wrapper, colors now work properly)
- Added allowedHosts: true to Vite config for Replit proxy compatibility
- Fixed TypeScript errors in Dashboard component (added onNavigate prop interface)
- Removed unused Lock icon import from Whitepaper component
- Updated index.html title for better SEO

### November 2, 2025
- Fixed TypeScript configuration (removed Next.js references)
- Updated Vite config for Replit environment (port 5000, host 0.0.0.0)
- Fixed package imports (removed version-specific import paths)
- Installed missing dependencies (@types/react, @types/react-dom, @tailwindcss/postcss)
- Configured Tailwind CSS v4 with PostCSS
- Set up deployment configuration for autoscale deployment

## Deployment
The project is configured for autoscale deployment:
- Build command: `npm run build`
- Run command: `npx vite preview --host 0.0.0.0 --port 5000`

## Color Scheme (Mintara Brand)
- Background: #001A12 (Dark emerald)
- Surface: #03261B
- Primary: #00A676 (Mintara green)
- Accent: #00E0C6 (Turquoise)
- Text Primary: #E8FFF5
- Text Secondary: #A7DAC6
