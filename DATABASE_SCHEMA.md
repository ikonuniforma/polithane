# 🗄️ Polithane Database Schema (Neon PostgreSQL)

## 📊 Schema Design - Optimized for 100k+ Users

### **USERS TABLE** (Ana kullanıcı tablosu)
```sql
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE,
  password_hash VARCHAR(255), -- NULL ise profil sahiplenmemiş
  full_name VARCHAR(100) NOT NULL,
  
  -- Kullanıcı Tipi
  user_type VARCHAR(20) NOT NULL, -- 'politician', 'media', 'normal', 'ex_politician'
  politician_type VARCHAR(50), -- 'mp', 'party_chair', 'provincial_chair', etc.
  
  -- Parti & Lokasyon
  party_id INT REFERENCES parties(party_id),
  city_code CHAR(2),
  district_name VARCHAR(100),
  
  -- Profil Bilgileri
  bio TEXT,
  profile_image VARCHAR(500),
  cover_image VARCHAR(500),
  verification_badge BOOLEAN DEFAULT FALSE,
  
  -- Otomasyon Sistemi
  is_automated BOOLEAN DEFAULT FALSE, -- Otomatik profil mi?
  claimed_at TIMESTAMP, -- Profil sahiplenme tarihi
  original_sources JSON, -- Twitter, Instagram, web sitesi linkleri
  
  -- İstatistikler (Cache için)
  follower_count INT DEFAULT 0,
  following_count INT DEFAULT 0,
  post_count INT DEFAULT 0,
  total_polit_score BIGINT DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP,
  
  -- Indexes
  INDEX idx_user_type (user_type),
  INDEX idx_party_id (party_id),
  INDEX idx_city_code (city_code),
  INDEX idx_is_automated (is_automated),
  INDEX idx_username (username),
  INDEX idx_created_at (created_at)
);
```

---

### **POSTS TABLE** (Ana içerik tablosu)
```sql
CREATE TABLE posts (
  post_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  
  -- İçerik
  content_type VARCHAR(20) NOT NULL, -- 'text', 'image', 'video', 'audio', 'link'
  content_text TEXT,
  media_urls JSON, -- Array of media URLs
  thumbnail_url VARCHAR(500),
  media_duration INT, -- Video/audio süresi (saniye)
  
  -- Gündem & Etiketler
  agenda_tag VARCHAR(200),
  hashtags JSON, -- Array of hashtags
  
  -- Kaynak Bilgisi (Otomasyon için KRİTİK!)
  source_type VARCHAR(20), -- 'manual', 'twitter', 'instagram', 'web', 'rss'
  source_url VARCHAR(1000), -- Orijinal paylaşım URL'si
  source_posted_at TIMESTAMP, -- Kaynakta paylaşım tarihi
  is_automated BOOLEAN DEFAULT FALSE,
  
  -- Polit Puan & Etkileşim
  polit_score BIGINT DEFAULT 0,
  view_count INT DEFAULT 0,
  like_count INT DEFAULT 0,
  dislike_count INT DEFAULT 0,
  comment_count INT DEFAULT 0,
  share_count INT DEFAULT 0,
  
  -- Öne Çıkarma
  is_featured BOOLEAN DEFAULT FALSE,
  featured_until TIMESTAMP,
  
  -- Moderasyon
  is_published BOOLEAN DEFAULT TRUE,
  is_deleted BOOLEAN DEFAULT FALSE,
  moderation_status VARCHAR(20) DEFAULT 'approved', -- 'pending', 'approved', 'rejected'
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Indexes (Performans için KRİTİK)
  INDEX idx_user_id (user_id),
  INDEX idx_polit_score (polit_score DESC),
  INDEX idx_created_at (created_at DESC),
  INDEX idx_agenda_tag (agenda_tag),
  INDEX idx_is_featured (is_featured),
  INDEX idx_source_type (source_type),
  INDEX idx_is_automated (is_automated),
  INDEX idx_user_created (user_id, created_at DESC), -- Composite
  INDEX idx_polit_created (polit_score DESC, created_at DESC) -- Composite
);
```

---

### **PARTIES TABLE** (Partiler)
```sql
CREATE TABLE parties (
  party_id SERIAL PRIMARY KEY,
  party_name VARCHAR(100) NOT NULL,
  party_short_name VARCHAR(50) NOT NULL,
  party_logo VARCHAR(500),
  party_flag VARCHAR(500),
  party_color VARCHAR(7),
  
  -- Meclis Bilgileri
  seats INT DEFAULT 0,
  mp_count INT DEFAULT 0,
  metropolitan_mayor_count INT DEFAULT 0,
  district_mayor_count INT DEFAULT 0,
  
  -- İstatistikler
  total_posts INT DEFAULT 0,
  total_polit_score BIGINT DEFAULT 0,
  agenda_contribution INT DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### **LIKES TABLE** (Beğeniler)
```sql
CREATE TABLE likes (
  like_id SERIAL PRIMARY KEY,
  post_id INT NOT NULL REFERENCES posts(post_id) ON DELETE CASCADE,
  user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE KEY unique_like (post_id, user_id),
  INDEX idx_post_id (post_id),
  INDEX idx_user_id (user_id)
);
```

---

### **COMMENTS TABLE** (Yorumlar)
```sql
CREATE TABLE comments (
  comment_id SERIAL PRIMARY KEY,
  post_id INT NOT NULL REFERENCES posts(post_id) ON DELETE CASCADE,
  user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  parent_comment_id INT REFERENCES comments(comment_id), -- Yanıt için
  
  comment_text TEXT NOT NULL,
  like_count INT DEFAULT 0,
  reply_count INT DEFAULT 0,
  
  is_deleted BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_post_id (post_id),
  INDEX idx_user_id (user_id),
  INDEX idx_created_at (created_at DESC),
  INDEX idx_parent_comment_id (parent_comment_id)
);
```

---

### **FOLLOWS TABLE** (Takip Sistemi)
```sql
CREATE TABLE follows (
  follow_id SERIAL PRIMARY KEY,
  follower_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  following_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  
  status VARCHAR(20) DEFAULT 'accepted', -- 'pending', 'accepted', 'blocked'
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE KEY unique_follow (follower_id, following_id),
  INDEX idx_follower_id (follower_id),
  INDEX idx_following_id (following_id),
  
  -- Kendini takip edemez
  CHECK (follower_id != following_id)
);
```

---

### **AGENDAS TABLE** (Gündemler)
```sql
CREATE TABLE agendas (
  agenda_id SERIAL PRIMARY KEY,
  agenda_title VARCHAR(200) NOT NULL,
  agenda_slug VARCHAR(200) UNIQUE NOT NULL,
  agenda_description TEXT,
  
  post_count INT DEFAULT 0,
  total_polit_score BIGINT DEFAULT 0,
  
  is_trending BOOLEAN DEFAULT FALSE,
  trend_rank INT,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_trend_rank (trend_rank),
  INDEX idx_is_trending (is_trending),
  INDEX idx_total_polit_score (total_polit_score DESC)
);
```

---

### **POLIT_SCORE_LOGS TABLE** (Polit Puan Geçmişi - Şeffaflık için)
```sql
CREATE TABLE polit_score_logs (
  log_id SERIAL PRIMARY KEY,
  post_id INT NOT NULL REFERENCES posts(post_id) ON DELETE CASCADE,
  
  action_type VARCHAR(20) NOT NULL, -- 'view', 'like', 'comment', 'share'
  action_user_id INT REFERENCES users(user_id) ON DELETE SET NULL,
  
  score_earned INT NOT NULL, -- Bu aksiyondan kazanılan puan
  user_type VARCHAR(20), -- Aksiyon yapan kullanıcı tipi
  multiplier DECIMAL(5,2), -- Kullanılan çarpan
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_post_id (post_id),
  INDEX idx_created_at (created_at DESC)
);
```

---

### **NOTIFICATIONS TABLE** (Bildirimler)
```sql
CREATE TABLE notifications (
  notification_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  
  type VARCHAR(50) NOT NULL, -- 'like', 'comment', 'follow', 'mention', 'milestone'
  title VARCHAR(200) NOT NULL,
  message TEXT,
  
  related_user_id INT REFERENCES users(user_id) ON DELETE SET NULL,
  related_post_id INT REFERENCES posts(post_id) ON DELETE SET NULL,
  related_comment_id INT REFERENCES comments(comment_id) ON DELETE SET NULL,
  
  is_read BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_user_id (user_id),
  INDEX idx_is_read (is_read),
  INDEX idx_created_at (created_at DESC)
);
```

---

### **AUTOMATION_SOURCES TABLE** (Otomasyon Kaynakları)
```sql
CREATE TABLE automation_sources (
  source_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  
  source_type VARCHAR(20) NOT NULL, -- 'twitter', 'instagram', 'rss', 'web'
  source_url VARCHAR(1000) NOT NULL,
  source_username VARCHAR(100),
  
  is_active BOOLEAN DEFAULT TRUE,
  last_scraped_at TIMESTAMP,
  last_post_id VARCHAR(200), -- Son çekilen post ID (duplicate önleme)
  
  scrape_interval_minutes INT DEFAULT 60, -- Kaç dakikada bir?
  total_posts_fetched INT DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_user_id (user_id),
  INDEX idx_is_active (is_active),
  INDEX idx_source_type (source_type)
);
```

---

### **MESSAGES TABLE** (Mesajlaşma)
```sql
CREATE TABLE messages (
  message_id SERIAL PRIMARY KEY,
  conversation_id INT NOT NULL,
  sender_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  receiver_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  
  message_text TEXT NOT NULL,
  
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP,
  
  is_deleted BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_conversation_id (conversation_id),
  INDEX idx_sender_id (sender_id),
  INDEX idx_receiver_id (receiver_id),
  INDEX idx_created_at (created_at DESC)
);
```

---

### **ADMIN_LOGS TABLE** (Admin İşlem Logları)
```sql
CREATE TABLE admin_logs (
  log_id SERIAL PRIMARY KEY,
  admin_user_id INT NOT NULL REFERENCES users(user_id),
  
  action_type VARCHAR(50) NOT NULL, -- 'ban_user', 'delete_post', 'verify_user', etc.
  target_type VARCHAR(50), -- 'user', 'post', 'comment'
  target_id INT,
  
  details JSON, -- Ek detaylar
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_admin_user_id (admin_user_id),
  INDEX idx_created_at (created_at DESC)
);
```

---

## 🚀 Performans Optimizasyonları

### **1. Materialized Views (Cache için)**
```sql
-- Trend olan postlar (her saat güncellenir)
CREATE MATERIALIZED VIEW trending_posts AS
SELECT 
  post_id,
  user_id,
  polit_score,
  created_at,
  -- Son 24 saatteki puan artışı
  (polit_score / EXTRACT(EPOCH FROM (NOW() - created_at)) * 3600) as trend_score
FROM posts
WHERE created_at >= NOW() - INTERVAL '7 days'
  AND is_published = TRUE
  AND is_deleted = FALSE
ORDER BY trend_score DESC
LIMIT 100;

CREATE UNIQUE INDEX ON trending_posts (post_id);
```

---

### **2. Partitioning (Büyük tablolar için)**
```sql
-- Posts tablosunu aylık bölümlere ayır (1M+ post için)
CREATE TABLE posts_2025_01 PARTITION OF posts
FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

CREATE TABLE posts_2025_02 PARTITION OF posts
FOR VALUES FROM ('2025-02-01') TO ('2025-03-01');
-- ...ve devamı
```

---

### **3. Connection Pooling**
```javascript
// Neon PostgreSQL bağlantısı (backend)
import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  max: 20, // 100k kullanıcı için
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

---

## 📊 Tahmini Veri Büyüklüğü (6 ay)

| Tablo | Kayıt Sayısı | Boyut |
|-------|--------------|-------|
| users | 100,000 | ~50 MB |
| posts | 1,000,000 | ~2 GB |
| likes | 10,000,000 | ~500 MB |
| comments | 500,000 | ~200 MB |
| follows | 500,000 | ~25 MB |
| notifications | 2,000,000 | ~500 MB |
| polit_score_logs | 20,000,000 | ~2 GB |
| **TOPLAM** | | **~5.3 GB** |

**Neon PostgreSQL Free Tier:** 3 GB (Upgrade gerekir)  
**Öneri:** Neon Scale Plan ($19/mo) - 10 GB storage

---

## 🔐 Güvenlik Önlemleri

### **Row Level Security (RLS)**
```sql
-- Kullanıcılar sadece kendi profillerini düzenleyebilir
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY user_update_policy ON users
FOR UPDATE USING (auth.uid() = user_id);

-- Silinen postlar gösterilmez
CREATE POLICY show_published_posts ON posts
FOR SELECT USING (is_published = TRUE AND is_deleted = FALSE);
```

---

## 🛠️ Migration Scripts

### **Initial Setup**
```bash
# 1. Schema oluştur
psql $DATABASE_URL -f schema.sql

# 2. Seed data (partiler, iller)
psql $DATABASE_URL -f seed_parties.sql
psql $DATABASE_URL -f seed_cities.sql

# 3. Indexes oluştur
psql $DATABASE_URL -f create_indexes.sql

# 4. Functions & Triggers
psql $DATABASE_URL -f functions.sql
```

---

**Sonraki Adım:** Backend API geliştirme ve Neon'a bağlantı kurulumu
