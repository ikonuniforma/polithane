# 🎨 Polithane - Tüm Component Listesi ve Detayları

## 📊 HAZIR COMPONENT'LER (Mevcut)

### ✅ Common Components
- Avatar.jsx
- Badge.jsx
- Button.jsx
- Card.jsx
- Modal.jsx
- Input.jsx
- Tooltip.jsx
- BlockUserModal.jsx
- FollowButton.jsx
- FollowListModal.jsx
- FollowRequestsModal.jsx
- FloatingChat.jsx
- HorizontalScroll.jsx
- AnimatedSlogan.jsx

### ✅ Home Components
- HeroSlider.jsx
- ParliamentBar.jsx
- StoriesBar.jsx
- AgendaBar.jsx

### ✅ Post Components
- PostCard.jsx
- PostCardHorizontal.jsx

### ✅ Popup/Modal Components
- CityDetailPopup.jsx
- PartyDetailPopup.jsx
- PolitScoreDetailModal.jsx

### ✅ Layout
- Header.jsx
- Footer.jsx

### ✅ Media
- MediaSidebar.jsx

---

## 🆕 YENİ OLUŞTURULACAK COMPONENT'LER

### 📂 1. AUTH COMPONENTS (src/components/auth/)

#### ✅ Hazırlandı:
- AuthContext.jsx (Context)
- LoginPageNew.jsx (Tam sayfa)

#### 🔨 Yapılacak:
- [ ] RegisterPageNew.jsx
- [ ] ForgotPasswordPage.jsx
- [ ] ResetPasswordPage.jsx
- [ ] EmailVerificationPage.jsx
- [ ] SocialLoginButtons.jsx
- [ ] AuthLayout.jsx

---

### 📂 2. PROFILE COMPONENTS (src/components/profile/)

#### 🔨 Yapılacak:
- [ ] ProfileHeader.jsx - Profil üst banner
- [ ] ProfileTabs.jsx - Tab navigation
- [ ] EditProfileForm.jsx - Profil düzenleme formu
- [ ] ChangePasswordForm.jsx - Şifre değiştirme
- [ ] PrivacySettings.jsx - Gizlilik ayarları
- [ ] NotificationPreferences.jsx - Bildirim tercihleri
- [ ] SecuritySettings.jsx - Güvenlik ayarları
- [ ] AccountSettings.jsx - Hesap ayarları
- [ ] DeleteAccountModal.jsx - Hesap silme modalı
- [ ] ProfileStats.jsx - İstatistikler widget
- [ ] UserBadges.jsx - Kullanıcı rozetleri
- [ ] SocialLinks.jsx - Sosyal medya linkleri

---

### 📂 3. SETTINGS PAGES (src/pages/settings/)

#### 🔨 Yapılacak:
- [ ] SettingsLayout.jsx - Settings wrapper
- [ ] GeneralSettings.jsx - Genel ayarlar
- [ ] ProfileSettings.jsx - Profil düzenleme sayfası
- [ ] AccountSettings.jsx - Hesap ayarları sayfası
- [ ] PrivacySettings.jsx - Gizlilik sayfası
- [ ] NotificationSettings.jsx - Bildirim ayarları
- [ ] SecuritySettings.jsx - Güvenlik sayfası
- [ ] ConnectedAccounts.jsx - Bağlı hesaplar
- [ ] DataExport.jsx - Veri dışa aktarma

---

### 📂 4. MESSAGES COMPONENTS (Gelişmiş) (src/components/messages/)

#### ✅ Mevcut (Basit):
- FloatingChat.jsx

#### 🔨 Yapılacak (Tam Özellikli):
- [ ] MessageInbox.jsx - Tam inbox sayfası
- [ ] MessageList.jsx - Konuşma listesi
- [ ] MessageThread.jsx - Mesaj thread'i
- [ ] MessageComposer.jsx - Mesaj oluşturucu
- [ ] MessageSearch.jsx - Mesaj arama
- [ ] MessageFilters.jsx - Filtreleme
- [ ] GroupMessageModal.jsx - Grup mesajı
- [ ] MessageRequests.jsx - Mesaj istekleri
- [ ] BlockedUsersPage.jsx - Engellenen kullanıcılar
- [ ] MessageSettings.jsx - Mesaj ayarları
- [ ] AttachmentPreview.jsx - Ek önizleme
- [ ] EmojiPicker.jsx - Emoji seçici

---

### 📂 5. NOTIFICATION COMPONENTS (src/components/notifications/)

#### ✅ Hazırlandı:
- NotificationContext.jsx (Context)

#### 🔨 Yapılacak:
- [ ] NotificationCenter.jsx - Bildirim merkezi
- [ ] NotificationDropdown.jsx - Header dropdown
- [ ] NotificationItem.jsx - Tek bildirim
- [ ] NotificationSettings.jsx - Bildirim ayarları
- [ ] NotificationFilters.jsx - Filtreleme
- [ ] NotificationPreferences.jsx - Tercihler

---

### 📂 6. ADMIN COMPONENTS (src/components/admin/)

#### 🏠 Dashboard
- [ ] AdminDashboard.jsx - Ana dashboard
- [ ] DashboardStats.jsx - İstatistik kartları
- [ ] AnalyticsChart.jsx - Grafikler (Chart.js)
- [ ] RecentActivity.jsx - Son aktiviteler
- [ ] QuickActions.jsx - Hızlı aksiyonlar
- [ ] SystemHealth.jsx - Sistem durumu

#### 👥 User Management
- [ ] UserManagement.jsx - Kullanıcı yönetimi ana sayfa
- [ ] UserList.jsx - Kullanıcı listesi
- [ ] UserDetail.jsx - Kullanıcı detay
- [ ] UserFilters.jsx - Filtreleme
- [ ] UserActions.jsx - Aksiyon butonları
- [ ] BanUserModal.jsx - Kullanıcı yasaklama
- [ ] VerifyUserModal.jsx - Kullanıcı doğrulama
- [ ] UserRoleEditor.jsx - Rol düzenleme
- [ ] BulkActions.jsx - Toplu işlemler

#### 📝 Post Moderation
- [ ] PostModeration.jsx - Post moderasyon ana sayfa
- [ ] FlaggedPosts.jsx - Şikayet edilen postlar
- [ ] PostReview.jsx - Post inceleme
- [ ] DeletePostModal.jsx - Post silme
- [ ] PostFilters.jsx - Filtreleme
- [ ] BulkModeration.jsx - Toplu moderasyon
- [ ] AutomatedPosts.jsx - Otomatik postlar

#### 💯 Algorithm Settings
- [ ] PolitScoreEditor.jsx - Polit Puan algoritması düzenleyici ⭐⭐⭐
- [ ] AlgorithmTester.jsx - Algoritma test edici
- [ ] MultiplierSettings.jsx - Çarpan ayarları
- [ ] ScoreSimulator.jsx - Puan simulatörü
- [ ] UserTypeWeights.jsx - Kullanıcı tipi ağırlıkları
- [ ] ActionWeights.jsx - Aksiyon ağırlıkları
- [ ] FormulaBuilder.jsx - Formül oluşturucu
- [ ] AlgorithmHistory.jsx - Algoritma değişiklik geçmişi

#### 🤖 Automation Control
- [ ] AutomationDashboard.jsx - Otomasyon ana sayfa
- [ ] SourceManager.jsx - Kaynak yönetimi
- [ ] WorkflowControls.jsx - n8n workflow kontrolleri
- [ ] ErrorLogs.jsx - Hata logları
- [ ] ScrapingStats.jsx - Scraping istatistikleri
- [ ] SourceAdd.jsx - Yeni kaynak ekleme
- [ ] AutomationScheduler.jsx - Zamanlama

#### ⚙️ Site Settings
- [ ] SiteSettings.jsx - Site ayarları ana sayfa
- [ ] GeneralSettings.jsx - Genel ayarlar
- [ ] ThemeEditor.jsx - Tema düzenleyici ⭐⭐
- [ ] ColorPicker.jsx - Renk seçici
- [ ] FontSettings.jsx - Font ayarları
- [ ] LayoutSettings.jsx - Layout ayarları
- [ ] LogoUpload.jsx - Logo yükleme
- [ ] FaviconUpload.jsx - Favicon yükleme

#### 📧 Email & Notifications
- [ ] EmailTemplates.jsx - Email şablonları ⭐
- [ ] EmailEditor.jsx - Email düzenleyici
- [ ] NotificationRules.jsx - Bildirim kuralları
- [ ] EmailSettings.jsx - Email ayarları (SMTP)
- [ ] PushNotificationSettings.jsx - Push ayarları

#### 📊 Analytics & Reports
- [ ] AnalyticsDashboard.jsx - Analitik dashboard
- [ ] UserAnalytics.jsx - Kullanıcı analitiği
- [ ] PostAnalytics.jsx - Post analitiği
- [ ] EngagementMetrics.jsx - Etkileşim metrikleri
- [ ] RevenueAnalytics.jsx - Gelir analitiği
- [ ] ExportReports.jsx - Rapor dışa aktarma
- [ ] CustomReports.jsx - Özel raporlar

#### 🏷️ Content Management
- [ ] AgendaManagement.jsx - Gündem yönetimi
- [ ] PartyManagement.jsx - Parti yönetimi
- [ ] CityManagement.jsx - Şehir yönetimi
- [ ] CategoryManagement.jsx - Kategori yönetimi

#### 🛡️ Security & Logs
- [ ] SecurityLogs.jsx - Güvenlik logları
- [ ] LoginAttempts.jsx - Giriş denemeleri
- [ ] IPBanList.jsx - IP ban listesi
- [ ] AdminLogs.jsx - Admin işlem logları

#### 🔧 Advanced Settings
- [ ] MaintenanceMode.jsx - Bakım modu
- [ ] BackupRestore.jsx - Yedekleme & geri yükleme
- [ ] DatabaseOptimization.jsx - Database optimizasyonu
- [ ] CacheManagement.jsx - Cache yönetimi
- [ ] APISettings.jsx - API ayarları

---

### 📂 7. SHARED/COMMON COMPONENTS (Ek)

#### 🔨 Yapılacak:
- [ ] LoadingSkeleton.jsx - Loading skeleton
- [ ] ErrorBoundary.jsx - Error handling
- [ ] ConfirmDialog.jsx - Onay dialogu
- [ ] SuccessToast.jsx - Başarı toast
- [ ] ErrorToast.jsx - Hata toast
- [ ] Pagination.jsx - Sayfalama
- [ ] SearchBar.jsx - Arama çubuğu
- [ ] FilterPanel.jsx - Filtre paneli
- [ ] SortDropdown.jsx - Sıralama dropdown
- [ ] DateRangePicker.jsx - Tarih seçici
- [ ] FileUpload.jsx - Dosya yükleme
- [ ] ImageCropper.jsx - Resim kırpma
- [ ] RichTextEditor.jsx - Zengin metin editörü
- [ ] MarkdownEditor.jsx - Markdown editör
- [ ] CodeEditor.jsx - Kod editörü (Algorithm için)
- [ ] DataTable.jsx - Veri tablosu
- [ ] Charts.jsx - Grafik component'leri

---

## 🎯 ÖNCELİK SIRASI (Geliştirme için)

### 🔥 PHASE 1: Kritik (Hemen)
1. ✅ AuthContext
2. ✅ NotificationContext  
3. ✅ ThemeContext
4. ✅ LoginPageNew
5. RegisterPageNew
6. EditProfileForm
7. ProfileSettings

### 🔥 PHASE 2: Çok Önemli
8. AdminDashboard
9. UserManagement
10. PostModeration
11. **PolitScoreEditor** ⭐⭐⭐
12. MessageInbox (tam)
13. NotificationCenter

### 🔥 PHASE 3: Önemli
14. ThemeEditor
15. EmailTemplates
16. AutomationDashboard
17. AnalyticsDashboard
18. SiteSettings

### 🔥 PHASE 4: Ek Özellikler
19. AlgorithmTester
20. ScoreSimulator
21. CustomReports
22. BackupRestore

---

## 📝 COMPONENT DETAYLARI

### ⭐⭐⭐ PolitScoreEditor.jsx (En Kritik!)

**Özellikler:**
- Görsel algoritma editörü
- Drag & drop formül oluşturucu
- Real-time önizleme
- Test data ile simülasyon
- Versiyon kontrolü
- Roll-back özelliği

**Ayarlanacaklar:**
```javascript
// Kullanıcı Tipi Çarpanları
{
  normal: 1,
  party_member: 5,
  opponent_party_member: 10,
  politician_provincial: 15,
  politician_mp: 50,
  politician_party_chair: 100
}

// Aksiyon Çarpanları
{
  view: 1,
  like: 5,
  comment: 10,
  share: 50
}

// Zaman Faktörü
{
  fresh_post_bonus: 1.5, // İlk 24 saat
  decay_rate: 0.1 // Günlük azalma
}

// Gündem Bonusu
{
  trending_multiplier: 2.0
}
```

**Formül Editörü:**
```
Polit Puan = 
  (Görüntülenme × user_multiplier × 1) + 
  (Beğeni × user_multiplier × 5) + 
  (Yorum × user_multiplier × 10) + 
  (Paylaşım × user_multiplier × 50) +
  (Zaman Bonusu) +
  (Gündem Bonusu)
```

---

### ⭐⭐ ThemeEditor.jsx

**Özellikler:**
- Live preview
- Color picker
- Font selector
- Layout options
- CSS export
- Import/Export tema

**Düzenlenecekler:**
```javascript
{
  colors: {
    primary: '#009FD6',
    secondary: '#10b981',
    accent: '#f59e0b',
    danger: '#ef4444',
    success: '#22c55e',
    warning: '#f59e0b',
    info: '#3b82f6'
  },
  typography: {
    fontFamily: 'Inter',
    headingFont: 'Inter',
    bodyFont: 'Inter',
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px'
    }
  },
  spacing: {
    unit: 4, // 4px base unit
    containerWidth: '1280px'
  },
  borderRadius: {
    small: '0.375rem',
    medium: '0.75rem',
    large: '1rem'
  },
  shadows: {
    small: '0 1px 2px rgba(0,0,0,0.05)',
    medium: '0 4px 6px rgba(0,0,0,0.1)',
    large: '0 10px 15px rgba(0,0,0,0.15)'
  }
}
```

---

### ⭐ EmailTemplates.jsx

**Şablonlar:**
1. Hoş Geldiniz Email
2. Email Doğrulama
3. Şifre Sıfırlama
4. Yeni Bildirim
5. Haftalık Özet
6. Profil Sahiplenme Daveti
7. Admin Uyarıları

**Editör Özellikleri:**
- WYSIWYG editor
- Variable sistemi ({{user.name}})
- Preview mode
- Test email gönderme
- Versiyonlama

---

## 📦 GEREKLİ PACKAGE'LER

```json
{
  "dependencies": {
    // Mevcut
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.9.6",
    "lucide-react": "^0.553.0",
    
    // Eklenecek
    "@tanstack/react-query": "^5.0.0",    // API state management
    "react-hook-form": "^7.50.0",         // Form management
    "zod": "^3.22.0",                     // Validation
    "react-dropzone": "^14.2.0",          // File upload
    "react-hot-toast": "^2.4.1",          // Notifications (zaten var)
    "recharts": "^2.10.0",                // Charts
    "react-quill": "^2.0.0",              // Rich text editor
    "react-color": "^2.19.3",             // Color picker
    "date-fns": "^3.0.0",                 // Date formatting (zaten var)
    "clsx": "^2.1.0",                     // Class names (zaten var)
    "react-beautiful-dnd": "^13.1.1",     // Drag & drop
    "framer-motion": "^11.0.0",           // Animations
    "react-modal": "^3.16.1",             // Modals
    "react-select": "^5.8.0",             // Advanced select
    "react-table": "^7.8.0"               // Data tables
  }
}
```

---

## 📐 DESIGN SYSTEM

### Renk Paleti
```css
--primary-blue: #009FD6;
--primary-blue-hover: #0089BA;
--primary-green: #10b981;
--accent-mustard: #f59e0b;
--primary-red: #ef4444;
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-300: #d1d5db;
--gray-400: #9ca3af;
--gray-500: #6b7280;
--gray-600: #4b5563;
--gray-700: #374151;
--gray-800: #1f2937;
--gray-900: #111827;
```

### Spacing Scale
```css
--spacing-1: 0.25rem;  /* 4px */
--spacing-2: 0.5rem;   /* 8px */
--spacing-3: 0.75rem;  /* 12px */
--spacing-4: 1rem;     /* 16px */
--spacing-5: 1.25rem;  /* 20px */
--spacing-6: 1.5rem;   /* 24px */
--spacing-8: 2rem;     /* 32px */
--spacing-10: 2.5rem;  /* 40px */
--spacing-12: 3rem;    /* 48px */
```

### Typography Scale
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

---

**SONRAKİ ADIM:** Component'leri tek tek oluşturmaya başlayacağım!
