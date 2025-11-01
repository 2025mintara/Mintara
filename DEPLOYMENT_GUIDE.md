# ?? Mintara - Deployment Guide

## Quick Start (3 Steps)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your API keys
nano .env  # or use your preferred editor
```

Required API Keys (all optional for local development):
- **WalletConnect Project ID**: Get from https://cloud.walletconnect.com
- **Hugging Face Token**: Get from https://huggingface.co/settings/tokens
- **Pinata API Keys**: Get from https://pinata.cloud

### 3. Run Development Server
```bash
npm run dev
```

Visit http://localhost:3000 ??

---

## Production Deployment

### Option 1: Vercel (Recommended - 2 minutes)

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Deploy on Vercel**
- Go to https://vercel.com
- Click "New Project"
- Import your GitHub repository
- Add environment variables in Settings
- Click "Deploy"

**Done!** Your app is live at `your-project.vercel.app`

### Option 2: Netlify (Alternative)

1. **Build the project**
```bash
npm run build
```

2. **Deploy to Netlify**
- Drag & drop the `build/` folder to https://app.netlify.com/drop
- Or use Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

### Option 3: Manual (Any Static Host)

1. **Build**
```bash
npm run build
```

2. **Upload**
- Upload contents of `build/` directory to your web host
- Configure your web server to serve `index.html` for all routes (SPA)

Example nginx configuration:
```nginx
server {
    listen 80;
    server_name mintara.io;
    root /var/www/mintara/build;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## Environment Variables for Production

Add these to your hosting platform's environment settings:

```env
# Required for Wallet Connection
VITE_WALLETCONNECT_PROJECT_ID=your_project_id

# Optional - Uses mock data if not provided
VITE_HF_TOKEN=your_huggingface_token
VITE_PINATA_API_KEY=your_pinata_key
VITE_PINATA_SECRET_KEY=your_pinata_secret

# Optional - Uses public RPC if not provided
VITE_BASE_RPC_URL=https://mainnet.base.org
```

---

## Post-Deployment Checklist

- [ ] Test wallet connection on production
- [ ] Verify all pages load correctly
- [ ] Check mobile responsiveness
- [ ] Test token builder form
- [ ] Verify AI NFT generation (if API keys added)
- [ ] Confirm social links work
- [ ] Test BaseScan integration
- [ ] Set up custom domain (optional)
- [ ] Configure SSL certificate
- [ ] Set up analytics (optional)

---

## Troubleshooting

### Build Fails
```bash
# Clear everything and reinstall
rm -rf node_modules package-lock.json build/
npm install
npm run build
```

### Environment Variables Not Working
- Ensure all env vars start with `VITE_`
- Restart dev server after changing `.env`
- In Vercel/Netlify, add vars in dashboard settings

### Wallet Connection Issues
- Add Base Network to MetaMask manually if needed:
  - Network Name: Base
  - RPC URL: https://mainnet.base.org
  - Chain ID: 8453
  - Currency Symbol: ETH
  - Block Explorer: https://basescan.org

---

## Performance Optimization

### Enable Gzip Compression
Most hosts enable this by default. Verify:
```bash
curl -H "Accept-Encoding: gzip" -I https://your-domain.com
```

### CDN Configuration
For better global performance:
- Vercel: Automatic edge network
- Netlify: Automatic CDN
- Manual: Use Cloudflare or similar

### Caching Headers
Configure your server to cache static assets:
```
Cache-Control: public, max-age=31536000, immutable
```

---

## Monitoring & Analytics

### Google Analytics (Optional)
Add to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

### Error Tracking (Optional)
Consider integrating:
- Sentry (https://sentry.io)
- LogRocket (https://logrocket.com)

---

## Security Best Practices

1. **Never commit `.env` files**
2. **Use HTTPS in production** (required for Web3)
3. **Keep dependencies updated**
```bash
npm audit
npm update
```
4. **Implement rate limiting** (if using own backend)
5. **Monitor smart contract interactions**

---

## Scaling Considerations

### High Traffic
- Vercel/Netlify: Auto-scaling included
- Manual: Use load balancer + multiple instances

### Database Needs
Currently uses localStorage. For production at scale:
- Consider Supabase (https://supabase.com)
- Or Firebase (https://firebase.google.com)

### API Rate Limits
- Hugging Face: Free tier has limits
- Pinata: Free tier: 1GB storage
- Consider paid plans for production

---

## Support & Resources

- **Documentation**: See README.md
- **Issues**: GitHub Issues
- **Community**: Telegram @mintaratoken
- **Base Network**: https://base.org
- **BaseScan**: https://basescan.org

---

## License

MIT License - See LICENSE file

---

**Ready to Deploy? Let's Go! ??**

```bash
npm run build && echo "? Ready for deployment!"
```
