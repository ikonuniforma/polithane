# Polithane Assets Klasör Yapısı

Bu klasör yapısı resim dosyalarınızı organize etmek için hazırlanmıştır.

## 📁 Klasör Yapısı

```
assets/
├── profiles/                    # Kullanıcı profil resimleri
│   ├── politicians/            # Siyasetçi profil resimleri
│   │   ├── party_chairs/      # Parti Genel Başkanları
│   │   ├── mps/               # Milletvekilleri
│   │   ├── provincial_chairs/ # İl Başkanları
│   │   ├── district_chairs/   # İlçe Başkanları
│   │   ├── myk_members/       # MYK Üyeleri
│   │   ├── vice_chairs/       # Genel Başkan Yardımcıları
│   │   └── others/            # Diğer siyasetçiler
│   ├── citizens/              # Vatandaş profil resimleri
│   ├── media/                 # Medya çalışanları profil resimleri
│   ├── party_members/         # Parti üyeleri profil resimleri
│   └── ex_politicians/        # Eski siyasetçiler profil resimleri
│
├── parties/                    # Parti görselleri
│   ├── logos/                 # Parti logoları (PNG, SVG)
│   └── flags/                 # Parti bayrakları (PNG, JPG)
│
├── posts/                      # Paylaşım içerikleri
│   ├── images/                # Paylaşım resimleri
│   ├── videos/                # Paylaşım videoları
│   ├── thumbnails/            # Video thumbnail'ları
│   └── audio/                 # Ses dosyaları
│
├── hero/                       # Ana sayfa hero slider resimleri
├── agendas/                    # Gündem görselleri
└── default/                    # Varsayılan görseller
    ├── avatar.png             # Varsayılan profil resmi
    └── hero.jpg               # Varsayılan hero resmi
```

## 📝 Kullanım Örnekleri

### Profil Resimleri

**Siyasetçi (Milletvekili):**
```
/profiles/politicians/mps/kemal_kilicdaroglu.jpg
/profiles/politicians/mps/recep_tayyip_erdogan.jpg
```

**Parti Genel Başkanı:**
```
/profiles/politicians/party_chairs/kemal_kilicdaroglu.jpg
/profiles/politicians/party_chairs/recep_tayyip_erdogan.jpg
```

**İl Başkanı:**
```
/profiles/politicians/provincial_chairs/istanbul_il_baskani.jpg
/profiles/politicians/provincial_chairs/ankara_il_baskani.jpg
```

**Vatandaş:**
```
/profiles/citizens/user_123.jpg
/profiles/citizens/user_456.jpg
```

**Medya:**
```
/profiles/media/ayse_demir.jpg
/profiles/media/mehmet_yilmaz.jpg
```

### Parti Görselleri

**Parti Logosu:**
```
/parties/logos/akparti.png
/parties/logos/chp.png
/parties/logos/mhp.png
```

**Parti Bayrağı:**
```
/parties/flags/akparti_flag.png
/parties/flags/chp_flag.png
/parties/flags/mhp_flag.png
```

### Paylaşım İçerikleri

**Resim:**
```
/posts/images/post_123.jpg
/posts/images/post_456.png
```

**Video:**
```
/posts/videos/post_789.mp4
/posts/thumbnails/post_789_thumb.jpg
```

**Ses:**
```
/posts/audio/post_101.mp3
```

### Hero Slider
```
/hero/hero_1.jpg
/hero/hero_2.jpg
/hero/hero_3.jpg
```

## 🎯 Dosya İsimlendirme Kuralları

1. **Küçük harf kullanın**
2. **Boşluk yerine alt çizgi (_) kullanın**
3. **Türkçe karakterleri İngilizce karşılıklarıyla değiştirin**
   - ç → c
   - ğ → g
   - ı → i
   - ö → o
   - ş → s
   - ü → u
4. **Dosya uzantıları:**
   - Resimler: `.jpg`, `.jpeg`, `.png`, `.webp`
   - Videolar: `.mp4`, `.webm`
   - Sesler: `.mp3`, `.wav`

## 📐 Önerilen Boyutlar

- **Profil Resimleri:** 400x400px (kare)
- **Parti Logoları:** 200x200px (kare)
- **Parti Bayrakları:** 800x400px (2:1 oran)
- **Post Resimleri:** 1200x800px (3:2 oran)
- **Video Thumbnail:** 800x450px (16:9 oran)
- **Hero Slider:** 1920x400px (4.8:1 oran)

## ✅ Kontrol Listesi

Resim yüklerken:
- [ ] Dosya adı küçük harf ve alt çizgi kullanıyor mu?
- [ ] Doğru klasöre yüklendi mi?
- [ ] Dosya boyutu optimize edildi mi?
- [ ] Dosya formatı uygun mu? (JPG, PNG, WebP)
