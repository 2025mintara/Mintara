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
- **Framework**: React 18.3.1
- **Build Tool**: Vite 6.3.5
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1.16 with @tailwindcss/postcss
- **UI Library**: Radix UI components
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

## Recent Changes

### November 4, 2025
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
