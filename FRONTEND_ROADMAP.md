# 🎨 Polithane Frontend - Tam Roadmap (Eksik Parçalar)

## 📊 GENEL BAKIŞ

Bu dokümanda **tüm eksik frontend component'leri** detaylı olarak hazırlanacak.

---

## 🗂️ KLASÖR YAPISI (Genişletilmiş)

```
src/
├── components/
│   ├── common/          # Mevcut (Avatar, Button, etc.)
│   ├── home/            # Mevcut (HeroSlider, etc.)
│   ├── layout/          # Mevcut (Header, Footer)
│   ├── post/            # Mevcut (PostCard, etc.)
│   │
│   ├── auth/            # ⭐ YENİ - Authentication
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   ├── ForgotPasswordForm.jsx
│   │   ├── EmailVerification.jsx
│   │   ├── SocialLoginButtons.jsx
│   │   └── AuthLayout.jsx
│   │
│   ├── profile/         # ⭐ YENİ - Profil Yönetimi
│   │   ├── ProfileHeader.jsx
│   │   ├── ProfileTabs.jsx
│   │   ├── EditProfileForm.jsx
│   │   ├── ChangePasswordForm.jsx
│   │   ├── PrivacySettings.jsx
│   │   ├── NotificationSettings.jsx
│   │   ├── SecuritySettings.jsx
│   │   ├── AccountSettings.jsx
│   │   └── DeleteAccountModal.jsx
│   │
│   ├── messages/        # ⭐ YENİ - Mesajlaşma (Tam)
│   │   ├── MessageList.jsx
│   │   ├── MessageThread.jsx
│   │   ├── MessageComposer.jsx
│   │   ├── MessageSearch.jsx
│   │   ├── GroupMessageModal.jsx
│   │   ├── MessageRequests.jsx
│   │   └── BlockedUsers.jsx
│   │
│   ├── notifications/   # ⭐ YENİ - Bildirimler
│   │   ├── NotificationCenter.jsx
│   │   ├── NotificationItem.jsx
│   │   ├── NotificationDropdown.jsx
│   │   └── NotificationSettings.jsx
│   │
│   └── admin/           # ⭐ YENİ - Admin Panel
│       ├── dashboard/
│       │   ├── DashboardStats.jsx
│       │   ├── AnalyticsCharts.jsx
│       │   ├── RecentActivity.jsx
│       │   └── QuickActions.jsx
│       │
│       ├── users/
│       │   ├── UserList.jsx
│       │   ├── UserDetail.jsx
│       │   ├── UserActions.jsx
│       │   ├── BanUserModal.jsx
│       │   └── VerifyUserModal.jsx
│       │
│       ├── posts/
│       │   ├── PostModeration.jsx
│       │   ├── FlaggedPosts.jsx
│       │   ├── PostReview.jsx
│       │   └── DeletePostModal.jsx
│       │
│       ├── algorithm/
│       │   ├── PolitScoreEditor.jsx
│       │   ├── AlgorithmTester.jsx
│       │   ├── MultiplierSettings.jsx
│       │   └── ScoreSimulator.jsx
│       │
│       ├── automation/
│       │   ├── AutomationDashboard.jsx
│       │   ├── SourceManager.jsx
│       │   ├── WorkflowControls.jsx
│       │   └── ErrorLogs.jsx
│       │
│       ├── settings/
│       │   ├── SiteSettings.jsx
│       │   ├── ThemeEditor.jsx
│       │   ├── EmailTemplates.jsx
│       │   ├── NotificationRules.jsx
│       │   └── MaintenanceMode.jsx
│       │
│       └── analytics/
│           ├── UserAnalytics.jsx
│           ├── PostAnalytics.jsx
│           ├── EngagementMetrics.jsx
│           └── ExportReports.jsx
│
├── pages/
│   ├── auth/            # ⭐ YENİ
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── ForgotPasswordPage.jsx
│   │   ├── ResetPasswordPage.jsx
│   │   └── VerifyEmailPage.jsx
│   │
│   ├── settings/        # ⭐ YENİ
│   │   ├── SettingsLayout.jsx
│   │   ├── ProfileSettings.jsx
│   │   ├── AccountSettings.jsx
│   │   ├── PrivacySettings.jsx
│   │   ├── NotificationSettings.jsx
│   │   └── SecuritySettings.jsx
│   │
│   └── admin/           # Mevcut ama genişletilecek
│       ├── AdminDashboard.jsx
│       ├── UserManagement.jsx
│       ├── PostModeration.jsx
│       ├── AlgorithmSettings.jsx
│       ├── AutomationControl.jsx
│       ├── SiteSettings.jsx
│       └── Analytics.jsx
│
├── contexts/            # ⭐ YENİ - Global State
│   ├── AuthContext.jsx
│   ├── NotificationContext.jsx
│   ├── ThemeContext.jsx
│   └── MessageContext.jsx
│
├── hooks/               # ⭐ YENİ - Custom Hooks
│   ├── useAuth.js
│   ├── useNotifications.js
│   ├── useMessages.js
│   ├── useTheme.js
│   └── useAdmin.js
│
└── utils/
    ├── api.js           # API client
    ├── auth.js          # Auth helpers
    └── permissions.js   # Role-based permissions
```

---

## 📝 COMPONENT'LER (Öncelik Sırasına Göre)

### **GRUP 1: AUTH (En Öncelikli)**
1. LoginForm.jsx
2. RegisterForm.jsx
3. ForgotPasswordForm.jsx
4. EmailVerification.jsx

### **GRUP 2: PROFILE SETTINGS**
5. EditProfileForm.jsx
6. ChangePasswordForm.jsx
7. PrivacySettings.jsx
8. NotificationSettings.jsx

### **GRUP 3: MESSAGES**
9. MessageList.jsx (gelişmiş)
10. MessageThread.jsx (gelişmiş)
11. MessageComposer.jsx
12. GroupMessageModal.jsx

### **GRUP 4: NOTIFICATIONS**
13. NotificationCenter.jsx
14. NotificationDropdown.jsx

### **GRUP 5: ADMIN DASHBOARD**
15. AdminDashboard.jsx (tam)
16. UserManagement.jsx
17. PostModeration.jsx
18. PolitScoreEditor.jsx (ÇOK ÖNEMLİ!)

### **GRUP 6: SITE SETTINGS**
19. ThemeEditor.jsx
20. EmailTemplates.jsx
21. SiteSettings.jsx

---

## 🎯 TASARIM PRENSİPLERİ

### **1. Mevcut Tasarım Dilini Koruyalım**
- Primary Blue: #009FD6
- Tailwind CSS
- Lucide React icons
- Modern, clean, minimal

### **2. Responsive**
- Mobil-first
- Tablet optimizasyonu
- Desktop geniş layout

### **3. Accessibility**
- ARIA labels
- Keyboard navigation
- Screen reader support

---

## 🚀 GELİŞTİRME SIRA PLANI

### **HAFTA 1: Auth + Profile**
- Gün 1-2: Login + Register
- Gün 3-4: Profile Settings
- Gün 5: Forgot Password + Email Verification

### **HAFTA 2: Messages + Notifications**
- Gün 1-3: Message System (full)
- Gün 4-5: Notification System

### **HAFTA 3-4: Admin Panel**
- Gün 1-2: Dashboard
- Gün 3-4: User Management
- Gün 5-6: Post Moderation
- Gün 7-8: Polit Score Editor (en kritik!)

### **HAFTA 5: Settings & Customization**
- Gün 1-2: Theme Editor
- Gün 3-4: Site Settings
- Gün 5: Email Templates

---

**Şimdi component'leri tek tek oluşturmaya başlayacağım!**
