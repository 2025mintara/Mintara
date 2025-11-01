# Mintara - AI-Powered Token & NFT Builder on Base Network

![Mintara Logo](public/sphere.svg)

Mintara is a comprehensive, no-code decentralized application (dApp) for creating ERC-20 tokens and AI-generated NFTs on the Base Network. Built with React, TypeScript, and TailwindCSS, it provides a beautiful, intuitive interface for Web3 creators.

## ?? Features

### Core Features
- **?? Token Builder**: Create ERC-20 tokens without writing code
- **?? AI NFT Builder**: Generate NFTs using AI (Stable Diffusion XL)
- **?? IVO Launchpad**: Initial Validator Offering platform (Coming Soon)
- **?? Dashboard**: Manage your created tokens and NFTs
- **?? Whitepaper**: Complete MINTA token documentation

### Technical Features
- **Base Network Native**: Built specifically for Base L2
- **Web3 Integration**: wagmi + RainbowKit + ethers.js
- **AI Generation**: Hugging Face Stable Diffusion integration
- **IPFS Storage**: Pinata integration for NFT metadata
- **Beautiful UI**: Glassmorphism design with Base Network theme
- **Responsive**: Works on all devices

## ?? Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- A Web3 wallet (MetaMask, Coinbase Wallet, etc.)
- Base Network RPC access

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/2025mintara/Mintara.git
cd Mintara
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your API keys:
```env
# Base Network RPC URL (optional, uses public RPC by default)
VITE_BASE_RPC_URL=https://mainnet.base.org

# WalletConnect Project ID (get from https://cloud.walletconnect.com)
VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here

# Hugging Face API Token (get from https://huggingface.co/settings/tokens)
VITE_HF_TOKEN=your_hf_token_here

# Pinata API Keys for IPFS Storage (get from https://pinata.cloud)
VITE_PINATA_API_KEY=your_pinata_api_key_here
VITE_PINATA_SECRET_KEY=your_pinata_secret_key_here

# BaseScan API Key (optional, for contract verification)
VITE_BASESCAN_API_KEY=your_basescan_api_key_here
```

4. **Run the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The production build will be in the `build/` directory.

## ?? Project Structure

```
Mintara/
??? src/
?   ??? components/
?   ?   ??? pages/          # Main page components
?   ?   ?   ??? Home.tsx
?   ?   ?   ??? TokenBuilder.tsx
?   ?   ?   ??? AINFTBuilder.tsx
?   ?   ?   ??? Dashboard.tsx
?   ?   ?   ??? Launchpad.tsx
?   ?   ?   ??? Whitepaper.tsx
?   ?   ??? ui/             # Shadcn UI components
?   ?   ??? Navbar.tsx
?   ?   ??? Footer.tsx
?   ?   ??? Logo.tsx
?   ?   ??? WalletButton.tsx
?   ?   ??? WalletContext.tsx
?   ?   ??? FeeBadge.tsx
?   ??? lib/
?   ?   ??? web3Config.ts   # Web3/wagmi configuration
?   ?   ??? contracts.ts    # Smart contract helpers
?   ?   ??? huggingface.ts  # AI image generation
?   ?   ??? ipfs.ts         # IPFS/Pinata integration
?   ?   ??? storage.ts      # LocalStorage helpers
?   ?   ??? mockData.ts     # Mock IVO data
?   ??? App.tsx
?   ??? main.tsx
?   ??? index.css
??? public/
??? .env.example
??? package.json
??? vite.config.ts
??? tsconfig.json
??? README.md
```

## ?? Design System

### Colors
- **Primary**: `#00a676` (Base Green)
- **Accent**: `#00e0c6` (Neon Turquoise)
- **Background**: `#001a12` ? `#00a676` (Gradient)
- **Surface**: `#03261b`
- **Text Primary**: `#e8fff5`
- **Text Secondary**: `#a7dac6`

### Typography
- **Headings**: Orbitron
- **Body**: Inter Tight

### Components
- Glassmorphism cards with backdrop blur
- Neon glow effects on hover
- Smooth transitions (300ms ease-in-out)
- Rounded corners (rounded-2xl)

## ?? Technologies Used

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: TailwindCSS 4, Shadcn/UI
- **Web3**: wagmi, viem, RainbowKit, ethers.js
- **AI**: Hugging Face Inference API
- **Storage**: IPFS via Pinata
- **Animations**: Framer Motion
- **Icons**: Lucide React

## ?? Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Netlify
1. Build the project: `npm run build`
2. Deploy the `build/` directory to Netlify
3. Add environment variables in Netlify dashboard

### Manual Deployment
1. Build: `npm run build`
2. Serve the `build/` directory with any static hosting service

## ?? Security Considerations

- **Never commit `.env` files** - Use `.env.example` as template
- **Smart Contract Audits** - All deployed contracts should be audited
- **Input Validation** - All user inputs are validated before blockchain interaction
- **API Key Protection** - API keys are stored in environment variables
- **HTTPS Only** - Always use HTTPS in production

## ?? Usage Guide

### Creating a Token
1. Connect your wallet to Base Network
2. Navigate to "Token Builder"
3. Fill in token details (name, symbol, supply, etc.)
4. Upload logo (optional)
5. Click "Create Token"
6. Approve transaction in wallet
7. Wait for deployment confirmation

### Generating AI NFTs
1. Connect your wallet
2. Navigate to "AI NFT Builder"
3. Describe your NFT in the prompt field
4. Click "Generate with AI"
5. Wait for AI to generate images
6. Fill in NFT metadata
7. Click "Mint Now"
8. Approve transaction

### Viewing Your Creations
1. Navigate to "Dashboard"
2. View all your created tokens and NFTs
3. Click on items to view on BaseScan
4. Export data or share on social media

## ?? Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## ?? License

This project is licensed under the MIT License - see the LICENSE file for details.

## ?? Links

- **Website**: [https://mintara.io](https://mintara.io)
- **Twitter**: [@mintaratoken](https://x.com/mintaratoken)
- **Telegram**: [t.me/mintaratoken](https://t.me/mintaratoken)
- **GitHub**: [github.com/2025mintara/Mintara](https://github.com/2025mintara/Mintara)
- **Base Network**: [base.org](https://base.org)
- **BaseScan**: [basescan.org](https://basescan.org)

## ?? Disclaimer

This is experimental software. Use at your own risk. Always do your own research before deploying smart contracts or minting tokens/NFTs. The creators are not responsible for any financial losses.

## ?? Support

For support, email support@mintara.io or join our Telegram community.

---

**Built with ?? on Base Network**
