# 🚀 Polithane - Tam Roadmap (Otomasyon + MVP)

## 📊 GENEL ÖZET

**Hedef:** 1.5 ay içinde 5,000+ otomatik profil, günlük 1,000+ içerik, 100k+ ziyaretçi kapasiteli platform

**Strateji:** 
1. Siyasetçi ve medya profillerini otomatik oluştur
2. Sosyal medya & haber sitelerinden içerikleri scrape et
3. Kaynağı belirterek otomatik post et
4. Kullanıcılar profilleri sahiplenebilir
5. 1.5 ay sonra gerçek kullanıcı deneyimi başlat

---

## 🗓️ **FAZ 1: ALTYAPI (1. Hafta - 7 gün)**

### **GÜN 1-2: Database & Backend Setup**

#### ✅ Yapılacaklar:
1. **Neon PostgreSQL Kurulumu**
   ```bash
   # Neon hesabı aç: https://neon.tech
   # Proje oluştur: polithane-prod
   # Connection string al
   ```

2. **Backend API (Vercel + Node.js)**
   ```bash
   mkdir backend
   cd backend
   npm init -y
   npm install express @neondatabase/serverless cors dotenv
   npm install -D @types/node
   ```

3. **Database Schema Uygula**
   ```bash
   # DATABASE_SCHEMA.md'deki tüm tabloları oluştur
   psql $DATABASE_URL -f schema.sql
   ```

4. **API Endpoints (İlk Versiyon)**
   ```javascript
   // backend/index.js
   import express from 'express';
   import { Pool } from '@neondatabase/serverless';
   
   const app = express();
   const pool = new Pool({ connectionString: process.env.DATABASE_URL });
   
   // Health check
   app.get('/api/health', (req, res) => {
     res.json({ status: 'ok' });
   });
   
   // Posts endpoints
   app.get('/api/posts', async (req, res) => {
     const { limit = 30, offset = 0, sort = 'polit_score' } = req.query;
     const result = await pool.query(
       'SELECT * FROM posts WHERE is_published = true ORDER BY $1 DESC LIMIT $2 OFFSET $3',
       [sort, limit, offset]
     );
     res.json(result.rows);
   });
   
   // ... diğer endpoints
   ```

---

### **GÜN 3-4: Upstash Redis + Caching**

#### ✅ Yapılacaklar:
1. **Upstash Redis Kurulumu**
   ```bash
   # Upstash hesabı aç: https://upstash.com
   # Redis database oluştur
   # REST API URL al
   ```

2. **Cache Strategy**
   ```javascript
   // backend/cache.js
   import { Redis } from '@upstash/redis';
   
   const redis = new Redis({
     url: process.env.UPSTASH_REDIS_URL,
     token: process.env.UPSTASH_REDIS_TOKEN,
   });
   
   // Cache hot posts (5 dakika)
   export async function getCachedPosts(key, fetcher) {
     const cached = await redis.get(key);
     if (cached) return cached;
     
     const data = await fetcher();
     await redis.set(key, JSON.stringify(data), { ex: 300 }); // 5 min
     return data;
   }
   
   // Cache user profiles (1 saat)
   export async function cacheUserProfile(userId, data) {
     await redis.set(`user:${userId}`, JSON.stringify(data), { ex: 3600 });
   }
   ```

3. **Neyi Cache'leyeceğiz?**
   - ✅ Trending posts (5 dakika)
   - ✅ User profiles (1 saat)
   - ✅ Party data (24 saat)
   - ✅ Homepage feed (2 dakika)
   - ✅ Agenda list (10 dakika)

---

### **GÜN 5-6: Cloudflare R2 + Media Upload**

#### ✅ Yapılacaklar:
1. **Cloudflare R2 Setup**
   ```bash
   # Cloudflare hesabı aç
   # R2 bucket oluştur: polithane-media
   # API token al
   ```

2. **Media Upload API**
   ```javascript
   // backend/upload.js
   import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
   
   const r2 = new S3Client({
     region: 'auto',
     endpoint: process.env.R2_ENDPOINT,
     credentials: {
       accessKeyId: process.env.R2_ACCESS_KEY_ID,
       secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
     },
   });
   
   export async function uploadToR2(file, key) {
     const command = new PutObjectCommand({
       Bucket: 'polithane-media',
       Key: key,
       Body: file,
       ContentType: file.type,
     });
     
     await r2.send(command);
     return `https://media.polithane.com/${key}`;
   }
   ```

3. **Image Processing (Sharp)**
   ```javascript
   // Otomatik resize & optimize
   import sharp from 'sharp';
   
   export async function processImage(buffer) {
     return await sharp(buffer)
       .resize(1200, 1200, { fit: 'inside' })
       .webp({ quality: 80 })
       .toBuffer();
   }
   ```

---

### **GÜN 7: Auth + JWT**

#### ✅ Yapılacaklar:
1. **Authentication System**
   ```javascript
   // backend/auth.js
   import bcrypt from 'bcrypt';
   import jwt from 'jsonwebtoken';
   
   export async function registerUser(email, password, fullName) {
     const hashedPassword = await bcrypt.hash(password, 10);
     
     const result = await pool.query(
       'INSERT INTO users (email, password_hash, full_name, user_type) VALUES ($1, $2, $3, $4) RETURNING *',
       [email, hashedPassword, fullName, 'normal']
     );
     
     return result.rows[0];
   }
   
   export async function loginUser(email, password) {
     const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
     if (!user.rows[0]) throw new Error('User not found');
     
     const valid = await bcrypt.compare(password, user.rows[0].password_hash);
     if (!valid) throw new Error('Invalid password');
     
     const token = jwt.sign(
       { userId: user.rows[0].user_id },
       process.env.JWT_SECRET,
       { expiresIn: '7d' }
     );
     
     return { user: user.rows[0], token };
   }
   ```

2. **Protected Routes**
   ```javascript
   // Middleware
   function authMiddleware(req, res, next) {
     const token = req.headers.authorization?.split(' ')[1];
     if (!token) return res.status(401).json({ error: 'Unauthorized' });
     
     try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       req.userId = decoded.userId;
       next();
     } catch (err) {
       res.status(401).json({ error: 'Invalid token' });
     }
   }
   ```

---

## 🗓️ **FAZ 2: OTOMASYON SİSTEMİ (2. Hafta - 7 gün)**

### **GÜN 8-9: n8n Setup + Twitter/X Scraper**

#### ✅ Yapılacaklar:
1. **n8n Cloud Kurulumu**
   ```bash
   # n8n.io hesabı aç
   # Workflow oluştur: "Twitter Scraper"
   ```

2. **Twitter/X Workflow (n8n)**
   ```
   [Schedule Trigger - Her 1 saat]
        ↓
   [HTTP Request - Get Active Sources]
        ↓ (Loop)
   [Twitter API / Apify Twitter Scraper]
        ↓
   [Filter - Yeni postlar]
        ↓
   [HTTP Request - Download Images]
        ↓
   [HTTP Request - Upload to R2]
        ↓
   [HTTP Request - POST /api/posts/automated]
        ↓
   [Update - Last Scraped Time]
   ```

3. **Twitter Scraper (Alternatifler)**
   - **Seçenek 1:** Twitter API v2 (Ücretli - $100/mo)
   - **Seçenek 2:** Apify Twitter Scraper ($49/mo)
   - **Seçenek 3:** Puppeteer + Proxy (Kendi sunucunuz)

4. **Automation API Endpoint**
   ```javascript
   // POST /api/posts/automated
   app.post('/api/posts/automated', async (req, res) => {
     const {
       user_id,
       content_text,
       media_urls,
       source_type,
       source_url,
       source_posted_at
     } = req.body;
     
     // Duplicate check
     const existing = await pool.query(
       'SELECT * FROM posts WHERE source_url = $1',
       [source_url]
     );
     
     if (existing.rows.length > 0) {
       return res.status(409).json({ error: 'Post already exists' });
     }
     
     // Insert post
     const result = await pool.query(
       `INSERT INTO posts 
       (user_id, content_text, media_urls, content_type, source_type, source_url, source_posted_at, is_automated)
       VALUES ($1, $2, $3, $4, $5, $6, $7, true)
       RETURNING *`,
       [user_id, content_text, media_urls, 'image', source_type, source_url, source_posted_at]
     );
     
     res.json(result.rows[0]);
   });
   ```

---

### **GÜN 10-11: Instagram + Haber Siteleri Scraper**

#### ✅ Yapılacaklar:
1. **Instagram Workflow (n8n)**
   ```
   [Schedule Trigger - Her 2 saat]
        ↓
   [Apify Instagram Scraper]
        ↓
   [Filter - Sadece herkese açık postlar]
        ↓
   [Download Images/Videos]
        ↓
   [Upload to R2]
        ↓
   [POST /api/posts/automated]
   ```

2. **Haber Siteleri RSS (n8n)**
   ```
   [RSS Feed Trigger - Haberler]
        ↓
   [Filter - Politik haberler]
        ↓
   [Extract - Yazı + Resim]
        ↓
   [Match - Hangi siyasetçi/gazeteci]
        ↓
   [POST /api/posts/automated]
   ```

3. **RSS Sources**
   - CNN Türk Politik
   - Sözcü Politika
   - Milliyet Politika
   - BBC Türkçe Türkiye
   - T24 Politika

---

### **GÜN 12-13: Profil Oluşturma + Seed Data**

#### ✅ Yapılacaklar:
1. **Siyasetçi Profil Listesi Hazırlama**
   ```javascript
   // scripts/seedPoliticians.js
   const politicians = [
     // Tüm TBMM Milletvekilleri (600 kişi)
     {
       full_name: 'Recep Tayyip Erdoğan',
       user_type: 'politician',
       politician_type: 'president',
       party_id: 1, // AK Parti
       city_code: '06', // Ankara (Cumhurbaşkanı için)
       verification_badge: true,
       is_automated: true,
       original_sources: {
         twitter: 'https://twitter.com/RTErdogan',
         instagram: 'https://instagram.com/rterdogan',
         web: 'https://tccb.gov.tr'
       }
     },
     // ... 599 tane daha
   ];
   
   // Batch insert
   for (const pol of politicians) {
     await pool.query(
       'INSERT INTO users (full_name, user_type, politician_type, party_id, city_code, verification_badge, is_automated, original_sources) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
       [pol.full_name, pol.user_type, pol.politician_type, pol.party_id, pol.city_code, pol.verification_badge, pol.is_automated, JSON.stringify(pol.original_sources)]
     );
   }
   ```

2. **Medya Profil Listesi**
   ```javascript
   const mediaPersons = [
     {
       full_name: 'Fatih Portakal',
       user_type: 'media',
       verification_badge: true,
       is_automated: true,
       original_sources: {
         twitter: 'https://twitter.com/fatihportakal',
         instagram: null,
         web: null
       }
     },
     // ... 200+ gazeteci, editör, yorumcu
   ];
   ```

3. **Automation Sources Tablosunu Doldur**
   ```javascript
   // Her profil için kaynaklarını ekle
   for (const user of allAutomatedUsers) {
     if (user.original_sources.twitter) {
       await pool.query(
         'INSERT INTO automation_sources (user_id, source_type, source_url, source_username, is_active) VALUES ($1, $2, $3, $4, true)',
         [user.user_id, 'twitter', user.original_sources.twitter, extractUsername(user.original_sources.twitter)]
       );
     }
     
     // Instagram, RSS için aynı işlem
   }
   ```

---

### **GÜN 14: Test + Bug Fix**

#### ✅ Yapılacaklar:
- ✅ n8n workflow'larını test et
- ✅ Duplicate post kontrolü
- ✅ Image download hataları
- ✅ Rate limiting
- ✅ Error handling

---

## 🗓️ **FAZ 3: FRONTEND ENTEGRASYONU (3. Hafta - 7 gün)**

### **GÜN 15-17: API Entegrasyonu**

#### ✅ Yapılacaklar:
1. **API Client**
   ```javascript
   // src/api/client.js
   import axios from 'axios';
   
   const api = axios.create({
     baseURL: process.env.VITE_API_URL || 'https://api.polithane.com',
     headers: {
       'Content-Type': 'application/json',
     },
   });
   
   // Auth interceptor
   api.interceptors.request.use((config) => {
     const token = localStorage.getItem('token');
     if (token) {
       config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
   });
   
   export default api;
   ```

2. **API Services**
   ```javascript
   // src/api/posts.js
   import api from './client';
   
   export const getPosts = async ({ limit = 30, offset = 0, category = 'all' }) => {
     const { data } = await api.get('/posts', {
       params: { limit, offset, category }
     });
     return data;
   };
   
   export const getPostDetail = async (postId) => {
     const { data } = await api.get(`/posts/${postId}`);
     return data;
   };
   
   export const likePost = async (postId) => {
     const { data } = await api.post(`/posts/${postId}/like`);
     return data;
   };
   ```

3. **React Query Setup**
   ```javascript
   // src/main.jsx
   import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
   
   const queryClient = new QueryClient({
     defaultOptions: {
       queries: {
         staleTime: 1000 * 60 * 5, // 5 dakika
         cacheTime: 1000 * 60 * 30, // 30 dakika
       },
     },
   });
   
   <QueryClientProvider client={queryClient}>
     <App />
   </QueryClientProvider>
   ```

4. **Mock Data → API Geçişi**
   ```javascript
   // ÖNCE (Mock)
   const posts = generateMockPosts(400);
   
   // SONRA (API)
   const { data: posts, isLoading } = useQuery({
     queryKey: ['posts', category],
     queryFn: () => getPosts({ category })
   });
   ```

---

### **GÜN 18-19: Auth UI + Loading States**

#### ✅ Yapılacaklar:
1. **Login/Register Pages**
2. **Protected Routes**
3. **Loading Skeletons**
4. **Error Boundaries**

---

### **GÜN 20-21: Profil Sahipleme Sistemi**

#### ✅ Yapılacaklar:
1. **"Bu Profil Sizin mi?" Banner**
   ```jsx
   // components/ClaimProfileBanner.jsx
   {user.is_automated && !user.claimed_at && (
     <div className="bg-amber-100 border border-amber-300 p-4 rounded-lg">
       <h3>Bu profil otomatik oluşturulmuştur</h3>
       <p>Bu hesap size aitse, hemen sahiplenin ve yönetimi elinize alın!</p>
       <button onClick={handleClaim}>Profili Sahiplen</button>
     </div>
   )}
   ```

2. **Claim API**
   ```javascript
   // POST /api/users/:userId/claim
   app.post('/api/users/:userId/claim', authMiddleware, async (req, res) => {
     const { userId } = req.params;
     const { verification_code } = req.body; // Email/SMS kodu
     
     // Verify code
     // ...
     
     // Update user
     await pool.query(
       'UPDATE users SET is_automated = false, claimed_at = NOW() WHERE user_id = $1',
       [userId]
     );
     
     res.json({ success: true });
   });
   ```

3. **Kaynak Gösterimi (Yasal Koruma)**
   ```jsx
   // Her otomatik postta
   {post.is_automated && (
     <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
       <Bot className="w-3 h-3" />
       <span>Otomatik paylaşım</span>
       <a href={post.source_url} target="_blank" className="text-blue-500 underline">
         Kaynak: {post.source_type}
       </a>
     </div>
   )}
   ```

---

## 🗓️ **FAZ 4: 1.5 AYLIK TOPLAMA DÖNEMİ (6 hafta)**

### **Hafta 4-10: Otomasyon Çalışsın**

#### ✅ Yapılacaklar:
1. **n8n Workflow'ları Aktif**
   - Twitter: Her 1 saat
   - Instagram: Her 2 saat
   - RSS: Her 30 dakika

2. **Monitoring**
   ```javascript
   // Dashboard: Günlük istatistikler
   - Toplanan post sayısı
   - Hata sayısı
   - Aktif kaynaklar
   - Duplicate sayısı
   ```

3. **Günlük Manuel Kontrol**
   - Hatalı içerikler var mı?
   - Copyright sorunlu içerikler var mı?
   - Kaynak linkleri çalışıyor mu?

4. **Hedef Metrikler (6 hafta sonunda)**
   - ✅ 5,000+ otomatik profil
   - ✅ 50,000+ post
   - ✅ Tüm TBMM üyeleri
   - ✅ 200+ medya mensubu
   - ✅ 300+ parti yöneticisi

---

## 🗓️ **FAZ 5: CANLI YAYINA GEÇIŞ (7. Hafta)**

### **Yapılacaklar:**
1. **Soft Launch (Beta)**
   - Davetiye sistemi (ilk 1000 kullanıcı)
   - Feedback formu
   - Bug raporlama

2. **Marketing**
   - Twitter/X'te duyuru
   - LinkedIn paylaşımı
   - Siyaset forumlarında tanıtım
   - Influencer'lara ulaşım

3. **Monitoring & Scaling**
   - Vercel Analytics
   - Neon Connection Pool artır
   - Upstash Redis plan upgrade
   - Cloudflare R2 bandwidth izle

---

## 💰 AYLIK MALİYET TAHMİNİ (100k Kullanıcı)

| Servis | Plan | Maliyet |
|--------|------|---------|
| **Neon PostgreSQL** | Scale ($19/mo) | $19 |
| **Vercel** | Pro ($20/mo) | $20 |
| **Upstash Redis** | Pro ($10/mo) | $10 |
| **n8n Cloud** | Starter ($20/mo) | $20 |
| **Cloudflare R2** | Pay-as-you-go (10 TB) | $15 |
| **Apify** (Twitter+Instagram) | Actor runs | $50 |
| **Domain** | polithane.com | $12/yıl |
| **Email** (SendGrid) | Free tier | $0 |
| **TOPLAM** | | **~$134/ay** |

---

## 🎯 KRİTİK BAŞARI METRİKLERİ

### **İlk Ay (Soft Launch)**
- ✅ 1,000 gerçek kullanıcı kaydı
- ✅ 10,000+ günlük sayfa görüntüleme
- ✅ 100+ günlük yeni post (kullanıcılardan)
- ✅ 500+ günlük etkileşim (beğeni, yorum)

### **3. Ay**
- ✅ 10,000 kayıtlı kullanıcı
- ✅ 100,000+ günlük ziyaretçi
- ✅ 50+ siyasetçi profilini sahiplendi
- ✅ 5+ medya kuruluşu ortaklığı

### **6. Ay**
- ✅ 100,000 kayıtlı kullanıcı
- ✅ 500,000+ günlük ziyaretçi
- ✅ Tüm TBMM üyelerinin %20'si aktif
- ✅ Reklam gelirleri başladı

---

## 🚨 RİSKLER VE ÇÖZÜMLER

### **1. Telif Hakkı / Yasal Sorunlar**
**Risk:** Otomatik içerik paylaşımı telif ihlali sayılabilir  
**Çözüm:**
- ✅ Her postta kaynak URL göster
- ✅ "Fair Use" kapsamında (haber, yorum)
- ✅ Profil sahipleri dilerse silebilir
- ✅ DMCA takedown prosedürü hazır
- ✅ Kullanım şartlarında açıkla

### **2. Twitter/Instagram API Kısıtlamaları**
**Risk:** API limitleri aşılabilir  
**Çözüm:**
- ✅ Apify gibi 3. parti servisler kullan
- ✅ Rate limiting uygula
- ✅ Birden fazla scraper key kullan
- ✅ Public RSS feed'lere öncelik ver

### **3. Database Performans**
**Risk:** 100k kullanıcı + 1M post yavaşlık yaratabilir  
**Çözüm:**
- ✅ Upstash Redis aggressive caching
- ✅ Neon Read Replicas kullan
- ✅ Materialized views
- ✅ CDN (Cloudflare)

### **4. Profil Sahiplenme İtirazları**
**Risk:** Yanlış kişi profil sahiplenmeye çalışabilir  
**Çözüm:**
- ✅ Email/Telefon doğrulaması
- ✅ Resmi evrak isteme (kimlik)
- ✅ Sosyal medya hesaplarından DM doğrulama
- ✅ Manuel onay süreci

---

## 📞 DESTEK VE İLETİŞİM

**Teknik Destek:**
- Email: tech@polithane.com
- Discord Community
- GitHub Issues (public repo için)

**İş Geliştirme:**
- Email: hello@polithane.com
- LinkedIn: /company/polithane

---

## ✅ CHECKLIST (Copy-Paste için)

### **Hafta 1: Altyapı**
- [ ] Neon PostgreSQL kuruldu
- [ ] Backend API çalışıyor
- [ ] Upstash Redis entegre
- [ ] Cloudflare R2 hazır
- [ ] JWT Auth çalışıyor

### **Hafta 2: Otomasyon**
- [ ] n8n Cloud kuruldu
- [ ] Twitter scraper çalışıyor
- [ ] Instagram scraper çalışıyor
- [ ] RSS feed reader çalışıyor
- [ ] 100+ profil seed edildi

### **Hafta 3: Frontend**
- [ ] API entegrasyonu tamamlandı
- [ ] Auth UI hazır
- [ ] Profil sahipleme sistemi çalışıyor
- [ ] Kaynak gösterimi eklendi
- [ ] Loading states eklendi

### **Hafta 4-10: Toplama Dönemi**
- [ ] n8n günlük çalışıyor
- [ ] 5,000+ profil oluşturuldu
- [ ] 50,000+ post toplandı
- [ ] Hata oranı %1'in altında
- [ ] Monitoring dashboard aktif

### **Hafta 11: Canlı Yayın**
- [ ] Soft launch duyurusu yapıldı
- [ ] İlk 100 kullanıcı kaydı
- [ ] Feedback toplandı
- [ ] Critical bug'lar düzeltildi
- [ ] Marketing başladı

---

**Sonraki Adım:** Backend API geliştirme ve ilk endpoint'leri oluşturmaya başlayalım mı?
