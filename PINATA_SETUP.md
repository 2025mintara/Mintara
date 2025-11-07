# Pinata IPFS Kurulum Rehberi

## 🎯 Pinata API Key Ekleme

Mintara platformu artık token logolarını **Pinata IPFS** üzerinde kalıcı olarak saklıyor!

---

## ✅ ADIM 1: Replit Secrets'e API Key Ekleyin

JWT anahtarınızı aldınız. Şimdi Replit'e ekleyin:

### Replit Arayüzünden (Önerilen):
1. Sol menüden **Tools** → **Secrets** tıklayın
2. **+ New Secret** butonuna basın
3. Şu bilgileri girin:
   - **Key**: `VITE_PINATA_JWT`
   - **Value**: (JWT anahtarınızı yapıştırın)
4. **Add Secret** tıklayın

### Alternatif (Terminal):
```bash
# Replit Shell'de çalıştırın (GÜVENLİ DEĞİL - Arayüz kullanın!)
# export VITE_PINATA_JWT="your-jwt-here"
```

---

## ✅ ADIM 2: Workflow'u Yeniden Başlatın

API key'i ekledikten sonra:

1. **Replit Terminal**'de:
   ```bash
   npm run dev
   ```

2. Ya da **Replit arayüzünden**:
   - Stop workflow
   - Start workflow

---

## 🧪 TEST: Logo Upload

1. **Token Builder**'a gidin
2. **Upload Logo** sekmesinden bir logo seçin
3. Şunu görmelisiniz:
   ```
   ✅ Logo uploaded to IPFS!
   Your logo is now permanently stored.
   ```

4. Logo preview'da **"Stored on IPFS"** etiketi görünecek

---

## 🔍 IPFS URL Örneği

Başarılı upload sonrası logoUrl:
```
https://gateway.pinata.cloud/ipfs/QmXxxx...xxx
```

Bu link:
- ✅ Kalıcıdır (asla silinmez)
- ✅ Herkese açıktır
- ✅ Trust Wallet Assets PR'ında kullanılabilir
- ✅ MetaMask/DEX'lerde görünebilir

---

## ❌ Sorun Giderme

### "IPFS upload failed: 401"
- API key yanlış veya eksik
- VITE_PINATA_JWT doğru yazıldığından emin olun
- Workflow'u restart edin

### "IPFS upload failed: 403"
- API key yetkisi yok
- Pinata dashboard'da key'e "Admin" yetkisi verin

### "Using local preview instead"
- IPFS başarısız oldu ama logo yine de çalışıyor
- Base64 preview kullanılıyor (geçici)
- API key'i kontrol edip tekrar deneyin

---

## 📊 Pinata Limitler (Ücretsiz)

- **Storage**: 100 MB
- **Bandwidth**: 1 GB/ay
- **Files**: Sınırsız

Token logoları genelde 10-50 KB → **Binlerce token için yeterli!**

---

## 🚀 Sonraki Adımlar

1. ✅ API key eklendi
2. ✅ Logo IPFS'e yüklendi
3. 📝 Token oluşturduktan sonra:
   - Trust Wallet Assets'e PR gönder
   - IPFS URL'sini PR'da kullan
   - 1-2 hafta sonra logo MetaMask'te görünür!

**TOKEN_LOGO_GUIDE.md** dosyasında detaylı bilgi var! 📖
