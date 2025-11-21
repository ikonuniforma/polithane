# 🤖 n8n Workflow Detayları - Polithane Otomasyon

## 📊 GENEL BAKIŞ

n8n ile 3 ana workflow oluşturacağız:
1. **Twitter/X Scraper** - Her 1 saat
2. **Instagram Scraper** - Her 2 saat  
3. **RSS Feed Reader** - Her 30 dakika

---

## 🐦 WORKFLOW 1: Twitter/X Scraper

### **Amaç:** Siyasetçilerin Twitter hesaplarından otomatik tweet çekme

### **Akış Diyagramı:**
```
┌─────────────────────────────────────┐
│  1. Schedule Trigger (Every 1 hour) │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  2. Get Active Twitter Sources      │
│     GET /api/automation/sources     │
│     WHERE source_type = 'twitter'   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  3. Loop Through Each Source        │
│     (Split In Batches - 10 per run) │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  4. Twitter Scraper (Apify)         │
│     - Get last 20 tweets            │
│     - From specific username        │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  5. Filter New Tweets Only          │
│     - Compare with last_post_id     │
│     - Avoid duplicates              │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  6. Download Images/Videos          │
│     - HTTP Request for each media   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  7. Upload to Cloudflare R2         │
│     POST /api/media/upload          │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  8. Create Automated Post           │
│     POST /api/posts/automated       │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  9. Update Last Scraped Time        │
│     PUT /api/automation/sources/:id │
└─────────────────────────────────────┘
```

---

### **n8n Node Konfigürasyonları**

#### **Node 1: Schedule Trigger**
```json
{
  "name": "Schedule Trigger",
  "type": "n8n-nodes-base.scheduleTrigger",
  "parameters": {
    "rule": {
      "interval": [
        {
          "field": "hours",
          "hoursInterval": 1
        }
      ]
    }
  }
}
```

---

#### **Node 2: Get Active Sources**
```json
{
  "name": "Get Active Twitter Sources",
  "type": "n8n-nodes-base.httpRequest",
  "parameters": {
    "method": "GET",
    "url": "https://api.polithane.com/api/automation/sources",
    "qs": {
      "source_type": "twitter",
      "is_active": "true",
      "limit": "100"
    },
    "authentication": "predefinedCredentialType",
    "nodeCredentialType": "httpHeaderAuth",
    "options": {}
  }
}
```

---

#### **Node 3: Split In Batches**
```json
{
  "name": "Split Into Batches",
  "type": "n8n-nodes-base.splitInBatches",
  "parameters": {
    "batchSize": 10,
    "options": {}
  }
}
```

---

#### **Node 4: Twitter Scraper (Apify)**
```json
{
  "name": "Apify Twitter Scraper",
  "type": "n8n-nodes-base.httpRequest",
  "parameters": {
    "method": "POST",
    "url": "https://api.apify.com/v2/acts/apify~twitter-scraper/runs",
    "authentication": "predefinedCredentialType",
    "nodeCredentialType": "apifyApi",
    "sendBody": true,
    "bodyParameters": {
      "parameters": [
        {
          "name": "startUrls",
          "value": "={{ [{ url: $json.source_url }] }}"
        },
        {
          "name": "tweetsDesired",
          "value": "20"
        },
        {
          "name": "maxRequestRetries",
          "value": "3"
        }
      ]
    },
    "options": {
      "timeout": 300000
    }
  }
}
```

**Alternatif: Twitter API v2 (Ücretli)**
```json
{
  "name": "Twitter API v2",
  "type": "n8n-nodes-base.twitter",
  "credentials": "twitterOAuth2Api",
  "parameters": {
    "resource": "tweet",
    "operation": "search",
    "searchText": "from:{{ $json.source_username }}",
    "returnAll": false,
    "limit": 20,
    "additionalFields": {
      "expansions": ["attachments.media_keys"],
      "mediaFields": ["url", "type"]
    }
  }
}
```

---

#### **Node 5: Filter New Tweets**
```json
{
  "name": "Filter New Tweets",
  "type": "n8n-nodes-base.function",
  "parameters": {
    "functionCode": "const lastPostId = $input.item.json.last_post_id;\nconst tweets = $input.item.json.tweets;\n\nconst newTweets = tweets.filter(tweet => {\n  return tweet.id > lastPostId;\n});\n\nreturn newTweets.map(tweet => ({ json: tweet }));"
  }
}
```

---

#### **Node 6: Download Images**
```json
{
  "name": "Download Media",
  "type": "n8n-nodes-base.httpRequest",
  "parameters": {
    "method": "GET",
    "url": "={{ $json.media[0].url }}",
    "responseFormat": "file",
    "options": {
      "timeout": 30000
    }
  }
}
```

---

#### **Node 7: Upload to R2**
```json
{
  "name": "Upload to Cloudflare R2",
  "type": "n8n-nodes-base.httpRequest",
  "parameters": {
    "method": "POST",
    "url": "https://api.polithane.com/api/media/upload",
    "sendBody": true,
    "bodyParameters": {
      "parameters": [
        {
          "name": "file",
          "value": "={{ $binary.data }}"
        },
        {
          "name": "folder",
          "value": "automated/twitter"
        }
      ]
    },
    "options": {
      "bodyContentType": "multipart-form-data"
    }
  }
}
```

---

#### **Node 8: Create Post**
```json
{
  "name": "Create Automated Post",
  "type": "n8n-nodes-base.httpRequest",
  "parameters": {
    "method": "POST",
    "url": "https://api.polithane.com/api/posts/automated",
    "sendBody": true,
    "bodyParameters": {
      "parameters": [
        {
          "name": "user_id",
          "value": "={{ $json.user_id }}"
        },
        {
          "name": "content_text",
          "value": "={{ $json.text }}"
        },
        {
          "name": "media_urls",
          "value": "={{ $json.uploaded_urls }}"
        },
        {
          "name": "source_type",
          "value": "twitter"
        },
        {
          "name": "source_url",
          "value": "={{ $json.tweet_url }}"
        },
        {
          "name": "source_posted_at",
          "value": "={{ $json.created_at }}"
        }
      ]
    }
  }
}
```

---

#### **Node 9: Update Last Scraped**
```json
{
  "name": "Update Last Scraped Time",
  "type": "n8n-nodes-base.httpRequest",
  "parameters": {
    "method": "PUT",
    "url": "https://api.polithane.com/api/automation/sources/{{ $json.source_id }}",
    "sendBody": true,
    "bodyParameters": {
      "parameters": [
        {
          "name": "last_scraped_at",
          "value": "={{ new Date().toISOString() }}"
        },
        {
          "name": "last_post_id",
          "value": "={{ $json.latest_tweet_id }}"
        }
      ]
    }
  }
}
```

---

## 📸 WORKFLOW 2: Instagram Scraper

### **Özellikler:**
- Her 2 saatte bir çalışır
- Sadece herkese açık profiller
- Resim + carousel postlar
- Reels/IGTV (video) destekli

### **Akış:**
```
Schedule (2 hours) 
  → Get Instagram Sources 
  → Apify Instagram Scraper 
  → Filter Public Posts 
  → Download Media 
  → Upload to R2 
  → Create Post 
  → Update Source
```

### **Apify Instagram Scraper**
```json
{
  "name": "Apify Instagram Scraper",
  "type": "n8n-nodes-base.httpRequest",
  "parameters": {
    "method": "POST",
    "url": "https://api.apify.com/v2/acts/apify~instagram-scraper/runs",
    "bodyParameters": {
      "parameters": [
        {
          "name": "username",
          "value": "={{ $json.source_username }}"
        },
        {
          "name": "resultsLimit",
          "value": "20"
        },
        {
          "name": "resultsType",
          "value": "posts"
        }
      ]
    }
  }
}
```

---

## 📰 WORKFLOW 3: RSS Feed Reader

### **Amaç:** Haber sitelerinden otomatik içerik toplama

### **Desteklenen Siteler:**
- CNN Türk Politik
- Sözcü Politika  
- Milliyet Politika
- BBC Türkçe
- T24 Politika
- Habertürk Gündem

### **Akış:**
```
Schedule (30 min) 
  → RSS Feed Trigger (Multiple feeds) 
  → Extract Article Content 
  → Match with Politician/Journalist 
  → Download Featured Image 
  → Upload to R2 
  → Create Post (with source link)
```

### **RSS Feed URLs**
```javascript
const rssFeeds = [
  {
    name: 'CNN Türk Politik',
    url: 'https://www.cnnturk.com/feed/rss/politika/news',
    category: 'news'
  },
  {
    name: 'Sözcü Politika',
    url: 'https://www.sozcu.com.tr/kategori/gundem/feed/',
    category: 'news'
  },
  {
    name: 'Milliyet Politika',
    url: 'https://www.milliyet.com.tr/rss/rssnew/siyasetRss.xml',
    category: 'news'
  },
  {
    name: 'BBC Türkçe',
    url: 'https://www.bbc.com/turkce/index.xml',
    category: 'news'
  },
  {
    name: 'T24 Politika',
    url: 'https://t24.com.tr/rss',
    category: 'news'
  }
];
```

### **n8n RSS Feed Node**
```json
{
  "name": "RSS Feed Trigger",
  "type": "n8n-nodes-base.rssFeedTrigger",
  "parameters": {
    "url": "={{ $json.feed_url }}",
    "pollTimes": {
      "item": [
        {
          "mode": "everyMinute",
          "minute": 30
        }
      ]
    }
  }
}
```

### **Article Content Extraction**
```json
{
  "name": "Extract Article Content",
  "type": "n8n-nodes-base.httpRequest",
  "parameters": {
    "method": "GET",
    "url": "={{ $json.link }}",
    "responseFormat": "string",
    "options": {
      "fullResponse": false
    }
  }
}
```

### **Match with User (Function Node)**
```javascript
// Haberde geçen isimleri bul ve eşleştir
const content = $json.content;
const title = $json.title;

// Tüm siyasetçi isimlerini al (API'den)
const politicians = await fetch('https://api.polithane.com/api/users?type=politician&limit=1000')
  .then(r => r.json());

// İsim eşleştirmesi
let matchedUser = null;
for (const pol of politicians) {
  if (content.includes(pol.full_name) || title.includes(pol.full_name)) {
    matchedUser = pol;
    break;
  }
}

// Eşleşme yoksa "Medya" kullanıcısına ata
if (!matchedUser) {
  matchedUser = { user_id: 1 }; // Generic "Polithane Medya" hesabı
}

return {
  json: {
    ...item.json,
    matched_user_id: matchedUser.user_id
  }
};
```

---

## 🔄 ERROR HANDLING & RETRY

### **Her Workflow'da Eklenecek:**

#### **1. Error Catcher Node**
```json
{
  "name": "Error Handler",
  "type": "n8n-nodes-base.errorTrigger",
  "parameters": {},
  "onError": "continueRegularOutput"
}
```

#### **2. Log Error to Database**
```json
{
  "name": "Log Error",
  "type": "n8n-nodes-base.httpRequest",
  "parameters": {
    "method": "POST",
    "url": "https://api.polithane.com/api/automation/errors",
    "bodyParameters": {
      "parameters": [
        {
          "name": "workflow_name",
          "value": "={{ $json.workflow.name }}"
        },
        {
          "name": "error_message",
          "value": "={{ $json.error.message }}"
        },
        {
          "name": "source_id",
          "value": "={{ $json.source_id }}"
        }
      ]
    }
  }
}
```

#### **3. Retry Logic (Function Node)**
```javascript
const maxRetries = 3;
const retryCount = $json.retry_count || 0;

if (retryCount < maxRetries) {
  // Retry after delay
  await new Promise(resolve => setTimeout(resolve, 5000 * (retryCount + 1)));
  
  return {
    json: {
      ...$json,
      retry_count: retryCount + 1
    }
  };
} else {
  // Max retries reached, skip
  return {
    json: {
      ...$json,
      skipped: true,
      error: 'Max retries reached'
    }
  };
}
```

---

## 📊 MONITORING & ANALYTICS

### **Dashboard Endpoint (Backend)**
```javascript
// GET /api/automation/stats
app.get('/api/automation/stats', async (req, res) => {
  const stats = await pool.query(`
    SELECT 
      source_type,
      COUNT(*) as total_sources,
      SUM(total_posts_fetched) as total_posts,
      AVG(EXTRACT(EPOCH FROM (NOW() - last_scraped_at)) / 60) as avg_delay_minutes
    FROM automation_sources
    WHERE is_active = true
    GROUP BY source_type
  `);
  
  res.json(stats.rows);
});
```

### **n8n Execution History**
```json
{
  "name": "Log Execution Stats",
  "type": "n8n-nodes-base.httpRequest",
  "parameters": {
    "method": "POST",
    "url": "https://api.polithane.com/api/automation/executions",
    "bodyParameters": {
      "parameters": [
        {
          "name": "workflow_name",
          "value": "={{ $workflow.name }}"
        },
        {
          "name": "execution_id",
          "value": "={{ $execution.id }}"
        },
        {
          "name": "status",
          "value": "={{ $execution.status }}"
        },
        {
          "name": "duration_ms",
          "value": "={{ $execution.duration }}"
        },
        {
          "name": "items_processed",
          "value": "={{ $items.length }}"
        }
      ]
    }
  }
}
```

---

## 🚀 RATE LIMITING & OPTIMIZATION

### **Apify Rate Limits:**
- Free tier: 5,000 credits/mo (~100 scrapes)
- Starter: 49$/mo - 100,000 credits
- Scale: 499$/mo - 1M credits

### **Optimizasyon Stratejileri:**

1. **Batch Processing:**
   - 10 kaynak/execution
   - Her execution sonunda 5 saniye bekle

2. **Smart Scheduling:**
   - Popüler hesaplar: 1 saat
   - Az aktif hesaplar: 6 saat
   - Gece saatleri: Daha sık (trafik az)

3. **Duplicate Prevention:**
   ```javascript
   // Her post'tan önce kontrol
   const existing = await pool.query(
     'SELECT post_id FROM posts WHERE source_url = $1',
     [source_url]
   );
   
   if (existing.rows.length > 0) {
     // Skip
     return null;
   }
   ```

---

## 📧 NOTIFICATION SYSTEM

### **Critical Errors → Email**
```json
{
  "name": "Send Error Email",
  "type": "n8n-nodes-base.emailSend",
  "parameters": {
    "fromEmail": "bot@polithane.com",
    "toEmail": "tech@polithane.com",
    "subject": "🚨 n8n Workflow Error: {{ $json.workflow_name }}",
    "text": "Error Details:\n\nWorkflow: {{ $json.workflow_name }}\nError: {{ $json.error_message }}\nSource: {{ $json.source_url }}\n\nTime: {{ $now }}"
  }
}
```

### **Daily Summary → Slack**
```json
{
  "name": "Send Daily Summary",
  "type": "n8n-nodes-base.slack",
  "parameters": {
    "resource": "message",
    "operation": "post",
    "channel": "#polithane-automation",
    "text": "📊 Daily Automation Summary\n\n✅ Posts Created: {{ $json.total_posts }}\n❌ Errors: {{ $json.total_errors }}\n⏱️ Avg Execution Time: {{ $json.avg_time }}s"
  }
}
```

---

## ✅ CHECKLIST: n8n Setup

- [ ] n8n Cloud hesabı açıldı
- [ ] Apify hesabı ve API key alındı
- [ ] Twitter Scraper workflow oluşturuldu
- [ ] Instagram Scraper workflow oluşturuldu
- [ ] RSS Feed workflow oluşturuldu
- [ ] Error handling eklendi
- [ ] Monitoring dashboard hazır
- [ ] Email notifications aktif
- [ ] Test run başarılı (10 kaynak)
- [ ] Production'a alındı (tüm kaynaklar)

---

**Sonraki Adım:** Backend API endpoint'lerini oluşturalım mı?
