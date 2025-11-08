# 🚀 GitHub & Vercel Deployment - Quick Guide

## Step 1: Push to GitHub

```bash
# Initialize git (if not already initialized)
git init

# Add all files
git add .

# Commit with message
git commit -m "Mintara Base - Production Ready"

# Create GitHub repository first at https://github.com/new

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/mintara-base.git

# Push to GitHub
git push -u origin main
```

**If you get an error about 'main' branch:**
```bash
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy to Vercel

### Option A: One-Click Deploy (Easiest)

1. Go to your GitHub repository
2. Click on `README.md`
3. Click the "Deploy with Vercel" button
4. Follow Vercel's setup wizard

### Option B: Manual Import

1. Go to https://vercel.com
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select your `mintara-base` repository
5. Configure:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

---

## Step 3: Add Environment Variables in Vercel

Click **"Environment Variables"** and add:

| Name | Value | Where to Get |
|------|-------|--------------|
| `VITE_PINATA_JWT` | `your_pinata_jwt_token` | https://app.pinata.cloud → API Keys |
| `DEPLOYER_PRIVATE_KEY` | `your_wallet_private_key` | MetaMask → Account Details → Export Private Key |
| `HUGGINGFACE_API_KEY` | `your_hf_token` (optional) | https://huggingface.co/settings/tokens |

**⚠️ CRITICAL:** 
- Never share your private key
- Never commit `.env` to GitHub
- Only add secrets in Vercel dashboard

---

## Step 4: Deploy!

Click **"Deploy"** button. 

Vercel will:
- Install dependencies
- Build your app (~40 seconds)
- Deploy to production URL

---

## Step 5: Update Farcaster Frame URLs (After First Deploy)

1. Copy your Vercel URL (e.g., `mintara-base-abc123.vercel.app`)
2. Edit `index.html` and replace `your-domain.vercel.app` with your actual URL:

```html
<meta name="fc:frame:button:1:target" content="https://YOUR-VERCEL-URL/token-builder" />
<meta name="fc:frame:button:2:target" content="https://YOUR-VERCEL-URL/ai-nft-builder" />
<meta name="fc:frame:button:3:target" content="https://YOUR-VERCEL-URL/dashboard" />
```

3. Commit and push:
```bash
git add index.html
git commit -m "Update Farcaster Frame URLs"
git push
```

Vercel will auto-deploy the update!

---

## Step 6: Test Your Deployment

### Test Checklist:
- [ ] Visit your Vercel URL
- [ ] Connect wallet (MetaMask/Rainbow/Coinbase)
- [ ] Create a test token (costs 1 USDC on Base)
- [ ] View Dashboard
- [ ] Share Vercel URL on Warpcast to test Farcaster Frame

---

## Troubleshooting

### Build Fails
```bash
# Test locally first
npm run build

# If successful locally but fails on Vercel:
# - Check environment variables are set
# - Verify node version (should be 20+)
```

### Environment Variables Not Working
- Make sure they start with `VITE_` for client-side variables
- Redeploy after adding new variables

### Farcaster Frame Not Showing
- Verify `public/.well-known/farcaster.json` exists
- Check Frame Validator: https://warpcast.com/~/developers/frames
- Make sure URLs in `index.html` point to your Vercel domain

---

## Custom Domain (Optional)

1. In Vercel dashboard → Settings → Domains
2. Add your custom domain (e.g., `mintara.xyz`)
3. Update DNS settings at your domain registrar
4. Wait for SSL certificate (automatic)

---

## Continuous Deployment

Every time you push to GitHub, Vercel will automatically:
1. Build your app
2. Run tests
3. Deploy if successful

```bash
# Make changes
git add .
git commit -m "Add new feature"
git push

# Vercel deploys automatically!
```

---

## Important Files

- ✅ `.env` → Ignored by git (never commit!)
- ✅ `.gitignore` → Configured correctly
- ✅ `vercel.json` → Deployment config
- ✅ `public/.well-known/farcaster.json` → Farcaster config
- ✅ `DEPLOYMENT.md` → Full deployment guide

---

## Support

**Contract Addresses (Base Network):**
- Token Factory: `0x8384442FA9384F6276Cf175F8EB48c737ee204a6`
- NFT Factory: `0x56ba49A2a1fcd316B92355B1ccc12638cC1EefA8`
- Owner Wallet: `0x71DEdF5544692aF64FC2ce040a2b3dA573957275`

**Network:**
- Chain ID: 8453 (Base Mainnet)
- RPC: https://mainnet.base.org
- Explorer: https://basescan.org

---

## Security Reminders

🔒 **NEVER** commit these to GitHub:
- Private keys
- API keys
- `.env` files

✅ **ALWAYS** store secrets in:
- Vercel Environment Variables
- `.env.local` (gitignored)

---

Made with ❤️ on Base Network 🔵
