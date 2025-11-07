# Token Logo Görünürlüğü Rehberi

## Token Logosu DEX ve Cüzdanlarda Nasıl Görünür?

### 1. Trust Wallet Assets (EN YAYGÍN - ÜCRETSİZ)

**Adımlar:**
1. Token logonuzu 256x256 PNG formatında hazırlayın
2. GitHub'da [Trust Wallet Assets](https://github.com/trustwallet/assets) repo'suna gidin
3. Fork edin
4. Bu dosya yoluna logo ekleyin:
   ```
   blockchains/base/assets/[CONTRACT_ADDRESS]/logo.png
   ```
5. Ayrıca `info.json` ekleyin:
   ```json
   {
     "name": "Your Token Name",
     "website": "https://yourwebsite.com",
     "description": "Your token description",
     "explorer": "https://basescan.org/token/[CONTRACT_ADDRESS]",
     "type": "BEP20",
     "symbol": "SYMBOL",
     "decimals": 18,
     "status": "active",
     "id": "[CONTRACT_ADDRESS]"
   }
   ```
6. Pull Request gönderin
7. **1-2 hafta içinde** onaylanır

**Sonuç**: Trust Wallet, MetaMask, DEX'ler bu logoyu kullanır!

---

### 2. CoinGecko Listing (PROFESYONEL)

**Adımlar:**
1. [CoinGecko'ya başvur](https://www.coingecko.com/en/coins/new)
2. Token bilgilerini doldur:
   - Contract address
   - Logo (PNG, 200x200)
   - Website
   - Social media
3. Onay sürecini bekle (1-4 hafta)
4. **Kabul edilirse** tüm platformlarda otomatik görünür

**Avantajlar**:
- En güvenilir kaynak
- Tüm DEX'ler ve cüzdanlar kullanır
- Fiyat tracking

---

### 3. Uniswap/Base Token Lists (HIZLI)

**Adımlar:**
1. Token metadata JSON'u hazırla:
   ```json
   {
     "name": "Your Token",
     "address": "0x...",
     "symbol": "SYMBOL",
     "decimals": 18,
     "chainId": 8453,
     "logoURI": "https://your-logo-url.com/logo.png"
   }
   ```
2. [Base Token List](https://github.com/ethereum-lists/tokens/tree/master/tokens/base) repo'suna PR gönder
3. Uniswap interface'de görünür

---

### 4. DEX Başvuruları (PLATFORM BAZLI)

#### Aerodrome Finance (Base DEX)
- Discord: https://discord.gg/aerodrome
- Token listing için community'ye başvur

#### Uniswap
- Otomatik, sadece likidite ekle
- Token Lists kullanır

#### BaseSwap
- https://baseswap.fi/
- Community voting veya direct listing

---

## 🚀 MINTARA PLATFORMUNDA OTOMATİK ÇÖZÜM

Mintara ile token oluştururken:
1. ✅ Logo yükleyin
2. ✅ Mintara Dashboard'da otomatik görünür
3. ✅ BaseScan'de contract doğrulaması yapın

**Ancak**:
- ❌ Cüzdanlarda görünmesi için Trust Wallet Assets'e eklenmeli
- ❌ DEX'lerde görünmesi için CoinGecko veya Token Lists'e eklenmeli

---

## 📝 ÖNERİLEN SIRA

1. **Hemen**: Mintara'da token oluştur + logo yükle
2. **1. Gün**: Trust Wallet Assets'e PR gönder
3. **1. Hafta**: Token'a likidite ekle (logo yokken normal)
4. **2. Hafta**: Trust Wallet onaylanır → Logolar görünür!
5. **1. Ay**: CoinGecko listing için başvur
6. **Sonuç**: Token tüm platformlarda logo ile görünür 🎉

---

## 🔥 HIZLI ÇÖZÜM (GEÇİCİ)

Eğer HEMEN logo görünmesi gerekiyorsa:

1. **IPFS'e logo yükle** (ücretsiz, kalıcı)
2. **Token contract'ı BaseScan'de verify et**
3. **Social media'da duyur** (Twitter, Farcaster)
4. **Manual import**: Kullanıcılar token'ı manuel eklerken logo URL'i girebilir

---

## 💡 MINTARA GELECEK ÖZELLİK

**Yakında**: Otomatik Trust Wallet PR oluşturma!
- Token oluştururken 1 tık ile PR hazırlanacak
- Kullanıcı sadece GitHub'da onaylayacak
- Süreç 90% hızlanacak!

---

## ❓ SSS

**S: Neden logo otomatik görünmüyor?**
C: ERC20 standart token'lar logo tutmaz. Cüzdanlar 3rd party veritabanlarını kullanır.

**S: Trust Wallet PR göndermezsem ne olur?**
C: Token çalışır, transfer edilir. Sadece logo görünmez (varsayılan icon gösterilir).

**S: CoinGecko zorunlu mu?**
C: Hayır, ama listing'den sonra her yerde otomatik görünür.

**S: Pinata/IPFS API gerekli mi?**
C: Hayır! Mintara logoları localStorage'da saklar. IPFS opsiyonel (daha profesyonel).

---

## 🎯 ÖZETİ

| Platform | Çözüm | Süre | Maliyet |
|----------|-------|------|---------|
| Mintara Dashboard | ✅ Otomatik | Anında | Ücretsiz |
| MetaMask/Trust Wallet | Trust Wallet Assets PR | 1-2 hafta | Ücretsiz |
| Uniswap/DEX | Token Lists PR | 3-7 gün | Ücretsiz |
| Tüm Platformlar | CoinGecko Listing | 1-4 hafta | Ücretsiz* |

*CoinGecko bazen ücretli fast-track sunar ($500-1000)

---

**Mintara ile başla, sonra yaygınlaştır!** 🚀
