# Mintara Base - Deployment Guide

## 🚀 Vercel Deployment

### Prerequisites
1. GitHub account
2. Vercel account (free tier works)
3. Pinata account for IPFS storage
4. Base Network wallet with USDC

### Environment Variables

Create these environment variables in Vercel dashboard:

```bash
VITE_PINATA_JWT=your_pinata_jwt_token_here
DEPLOYER_PRIVATE_KEY=your_wallet_private_key_here
HUGGINGFACE_API_KEY=your_huggingface_key_here (optional, for AI images)
```

#### Getting Environment Variables:

**VITE_PINATA_JWT:**
1. Go to https://app.pinata.cloud
2. Sign up/Login
3. Navigate to API Keys section
4. Create new JWT key
5. Copy the JWT token

**DEPLOYER_PRIVATE_KEY:**
- Your wallet private key (KEEP THIS SECRET!)
- Never commit this to GitHub
- Only use in Vercel environment variables

**HUGGINGFACE_API_KEY:**
- Optional, used for AI image generation fallback
- Get from https://huggingface.co/settings/tokens

### Step-by-Step Deployment

#### 1. Push to GitHub

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Mintara Base"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/mintara-base.git

# Push to GitHub
git push -u origin main
```

#### 2. Deploy to Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

5. Add Environment Variables:
   - Click "Environment Variables"
   - Add `VITE_PINATA_JWT`
   - Add `DEPLOYER_PRIVATE_KEY`
   - Add `HUGGINGFACE_API_KEY` (optional)

6. Click "Deploy"

#### 3. Update Farcaster Frame URLs

After deployment, get your Vercel URL (e.g., `https://mintara-base.vercel.app`)

Update `index.html` with your actual domain:

```html
<meta name="fc:frame:button:1:target" content="https://YOUR-DOMAIN.vercel.app/token-builder" />
<meta name="fc:frame:button:2:target" content="https://YOUR-DOMAIN.vercel.app/ai-nft-builder" />
<meta name="fc:frame:button:3:target" content="https://YOUR-DOMAIN.vercel.app/dashboard" />
```

Commit and push the change - Vercel will auto-deploy.

### 4. Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

---

## 🎯 Farcaster Integration

### Share Your Frame

Once deployed, your app is Farcaster Frame compatible!

1. Share your Vercel URL in Farcaster
2. The Frame will show preview with 3 buttons:
   - Create Token
   - Create NFT
   - Dashboard

### Testing Frame

Use Farcaster's Frame Validator:
https://warpcast.com/~/developers/frames

---

## 📊 Production Checklist

- [ ] All environment variables set in Vercel
- [ ] Build succeeds without errors
- [ ] Wallet connection works on production
- [ ] Token creation works (test with small amount)
- [ ] NFT creation works (test with 1 USDC)
- [ ] Dashboard loads correctly
- [ ] Farcaster Frame buttons link to correct pages
- [ ] IPFS uploads working (via Pinata)

---

## 🔒 Security Notes

**NEVER** commit these files to GitHub:
- `.env`
- `.env.local`
- Any file containing private keys

All secrets should ONLY be in Vercel environment variables!

---

## 🐛 Troubleshooting

### Build Fails
```bash
# Test build locally first
npm run build
```

### Environment Variables Not Working
- Make sure they start with `VITE_` prefix (for client-side)
- Redeploy after adding new variables

### Wallet Connection Issues
- Check that Base Network is supported
- Verify RPC endpoints are accessible

### IPFS Upload Fails
- Verify VITE_PINATA_JWT is correct
- Check Pinata account limits

---

## 📱 Platform Support

- ✅ Desktop browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ Farcaster Frame compatible
- ✅ Responsive design

---

## 🔗 Important Links

- **GitHub Repository:** [Your Repo URL]
- **Live App:** [Your Vercel URL]
- **Token Factory Contract:** 0x8384442FA9384F6276Cf175F8EB48c737ee204a6
- **NFT Factory Contract:** 0x56ba49A2a1fcd316B92355B1ccc12638cC1EefA8
- **Base Network:** https://base.org
- **BaseScan:** https://basescan.org

---

## 💰 Owner Fee Wallet

All platform fees (1 USDC per deployment) are sent to:
**0x71DEdF5544692aF64FC2ce040a2b3dA573957275**

---

Made with ❤️ on Base Network 🔵
