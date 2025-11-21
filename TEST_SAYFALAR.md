# 🧪 Polithane - Test Edilecek Sayfalar

## ✅ HAZIR VE TEST EDİLEBİLİR SAYFALAR

### 1. ANA SAYFA
**URL:** `http://localhost:5173/`
- ✅ Tam çalışıyor
- Hero Slider
- Meclis Dağılımı
- Stories Bar
- Gündem Bar
- Post kartları

---

### 2. AUTH SAYFALARI

#### Login (Yeni)
**URL:** `http://localhost:5173/login-new`
- ✅ Tam UI hazır
- Email + Password
- Şifremi Unuttum linki
- Sosyal login butonları
- Form validation
- **NOT:** API bağlantısı yok ama UI test edilebilir

#### Register (Yeni)
**URL:** `http://localhost:5173/register-new`
- ✅ TAM ÇALIŞIYOR!
- 3 aşamalı kayıt
- Progress bar
- Form validation
- Şifre güvenlik kontrolü
- **TEST EDİN:** Her adımı ilerletin

---

### 3. AYARLAR SAYFALARI

#### Settings Ana Sayfa
**URL:** `http://localhost:5173/settings/profile`
- ✅ TAM ÇALIŞIYOR!
- Yan menü navigation
- Profil düzenleme formu
- Fotoğraf yükleme (UI)
- Form kaydetme

**Diğer Settings Sayfaları:**
- `/settings/account` - Placeholder
- `/settings/security` - Placeholder
- `/settings/notifications` - Placeholder
- `/settings/privacy` - Placeholder
- `/settings/appearance` - Placeholder

---

### 4. ADMİN PANEL

#### ⭐ Algoritma Düzenleyici (EN ÖNEMLİ!)
**URL:** `http://localhost:5173/admin/algorithm`
- ✅ TAM ÖZELLİKLİ VE ÇALIŞIYOR!
- Kullanıcı tipi çarpanları
- Aksiyon ağırlıkları
- Zaman faktörleri
- **CANLI TEST PANELİ** - Sağ tarafta
- Real-time puan hesaplama
- Puan dağılımı gösterimi

**NASIL TEST EDİLİR:**
1. Sol tarafta çarpanları değiştirin
2. Sağ panelde test değerleri girin:
   - Görüntülenme: 1000
   - Beğeni: 50
   - Yorum: 10
   - Paylaşım: 5
   - Kullanıcı Tipi: Milletvekili
   - Doğrulanmış: Evet
   - Yaş: 12 saat
   - Trending: Evet
3. Anlık puan hesaplamasını görün!

#### Kullanıcı Yönetimi
**URL:** `http://localhost:5173/admin/users`
- ✅ TAM ÇALIŞIYOR!
- Kullanıcı listesi (mock data)
- Arama fonksiyonu
- Filtreler (Tip, Doğrulama)
- Checkbox ile çoklu seçim
- Aksiyon butonları (Doğrula, Yasakla, Sil)
- Pagination

**TEST EDİN:**
- Arama kutusuna isim yazın
- Filtreleri değiştirin
- Kullanıcıları seçin

#### Admin Dashboard
**URL:** `http://localhost:5173/admin`
- ✅ Çalışıyor (eski versiyon)
- İstatistik kartları
- Grafikler için placeholder

---

### 5. MESAJLAŞMA
**URL:** `http://localhost:5173/messages`
- ✅ Çalışıyor (daha önce düzelttik)
- Konuşma listesi
- Mesaj thread
- Mesaj gönderme

---

### 6. DİĞER SAYFALAR

#### Profile
**URL:** `http://localhost:5173/profile/1`
- ✅ Çalışıyor (eski versiyon)

#### Post Detail
**URL:** `http://localhost:5173/post/1`
- ✅ Çalışıyor (eski versiyon)

#### Party Detail
**URL:** `http://localhost:5173/party/1`
- ✅ Çalışıyor (eski versiyon)

#### City Detail
**URL:** `http://localhost:5173/city/06`
- ✅ Çalışıyor (eski versiyon)

---

## 🧪 TEST SENARYOLARI

### Senaryo 1: Kayıt Ol
1. `/register-new` adresine git
2. **Adım 1:** Tüm bilgileri doldur
   - Ad Soyad: Test Kullanıcı
   - Email: test@test.com
   - Şifre: test1234 (en az 8 karakter)
   - Şifre Tekrar: test1234
3. "Devam Et" butonuna tıkla
4. **Adım 2:** Detayları doldur
   - Kullanıcı Adı: testuser
   - Hesap Tipi: Vatandaş
   - ✅ Kullanım Koşulları
   - ✅ Gizlilik Politikası
5. "Kayıt Ol" butonuna tıkla
6. **Adım 3:** Başarılı mesajını gör
7. Ana sayfaya yönlendirildiğini gör

---

### Senaryo 2: Algoritma Test Et
1. `/admin/algorithm` adresine git
2. Sol panelde **Kullanıcı Tipi Çarpanları** bölümünde:
   - `politician_mp` değerini 100'e çıkar
3. Sağ panelde test değerleri:
   - Görüntülenme: 1000
   - Beğeni: 100
   - Yorum: 20
   - Paylaşım: 10
   - Kullanıcı Tipi: politician_mp
   - ✅ Doğrulanmış
   - Yaş: 6 saat (taze post)
   - ✅ Trending
4. **SONUÇ:** Çok yüksek puan göreceksiniz! (Örn: 200,000+ P.)
5. Alt panelde puan dağılımını inceleyin

---

### Senaryo 3: Kullanıcı Ara ve Filtrele
1. `/admin/users` adresine git
2. Arama kutusuna "Recep" yaz
3. Filtrelerde "Siyasetçi" seç
4. "Doğrulanmış" filtrele
5. İlk kullanıcının yanındaki checkbox'ı işaretle
6. "Doğrula" butonuna tıkla (Confirm penceresi açılır)

---

### Senaryo 4: Profil Düzenle
1. `/settings/profile` adresine git
2. Ad Soyad değiştir
3. Biyografi yaz
4. Şehir seç
5. "Kaydet" butonuna tıkla
6. Yeşil başarı mesajını gör

---

## ⚠️ BİLİNMESİ GEREKENLER

### Çalışan Özellikler:
- ✅ Tüm sayfalar açılıyor
- ✅ Form validasyonları çalışıyor
- ✅ Puan hesaplama algoritması gerçek zamanlı
- ✅ Context'ler entegre (Auth, Notification, Theme)
- ✅ Mock data ile dolu

### Çalışmayan Özellikler (Backend Gerekli):
- ❌ Gerçek kayıt/giriş (API yok)
- ❌ Database kaydetme
- ❌ Dosya yükleme
- ❌ Real-time mesajlaşma

---

## 🚀 HEMEN TEST EDİN!

1. Terminal'de:
```bash
npm run dev
```

2. Tarayıcıda test edilecek sayfalar:
- ✅ `http://localhost:5173/register-new` - 3 aşamalı kayıt
- ⭐ `http://localhost:5173/admin/algorithm` - Algoritma editörü
- ✅ `http://localhost:5173/admin/users` - Kullanıcı yönetimi
- ✅ `http://localhost:5173/settings/profile` - Profil ayarları
- ✅ `http://localhost:5173/messages` - Mesajlaşma

---

## 📝 EKSIK PLACEHOLDER SAYFALAR

Bunlar sadece "Yakında" mesajı gösterir:
- `/settings/account`
- `/settings/security`
- `/settings/notifications`
- `/settings/privacy`
- `/settings/appearance`
- `/admin/posts`
- `/admin/automation`
- `/admin/analytics`

Bu sayfaları da isterseniz hazırlayabilirim!

---

**ŞİMDİ HER ŞEY TIKLANABİLİR VE AÇILIR! 🎉**
