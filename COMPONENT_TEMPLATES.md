# 🎨 Polithane - Tüm Component Şablonları

Bu dosya, tüm component'lerin **hazır kod şablonlarını** içerir. Copy-paste yaparak kullanabilirsiniz.

---

## 📂 1. AUTH COMPONENTS

### 🔐 RegisterPageNew.jsx

```jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, Lock, Phone, MapPin, Users, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';

export const RegisterPageNew = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [step, setStep] = useState(1); // 1: Basic, 2: Details, 3: Verification
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    // Step 1
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    // Step 2
    username: '',
    phone: '',
    city_code: '',
    user_type: 'normal', // normal, party_member, politician, media
    party_id: null,
    
    // Agreements
    agreeTerms: false,
    agreePrivacy: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const validateStep1 = () => {
    if (!formData.full_name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Lütfen tüm alanları doldurun');
      return false;
    }
    
    if (formData.password.length < 8) {
      setError('Şifre en az 8 karakter olmalıdır');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return false;
    }
    
    return true;
  };

  const validateStep2 = () => {
    if (!formData.username) {
      setError('Kullanıcı adı gereklidir');
      return false;
    }
    
    if (!formData.agreeTerms || !formData.agreePrivacy) {
      setError('Kullanım koşullarını ve gizlilik politikasını kabul etmelisiniz');
      return false;
    }
    
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep2()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const result = await register(formData);
      
      if (result.success) {
        setStep(3);
        setTimeout(() => navigate('/'), 2000);
      } else {
        setError(result.error || 'Kayıt başarısız');
      }
    } catch (err) {
      setError('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  s <= step ? 'bg-primary-blue text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {s < step ? <CheckCircle2 className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div className={`w-32 h-1 mx-2 ${s < step ? 'bg-primary-blue' : 'bg-gray-200'}`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm font-semibold">
            <span className={step >= 1 ? 'text-primary-blue' : 'text-gray-500'}>Temel Bilgiler</span>
            <span className={step >= 2 ? 'text-primary-blue' : 'text-gray-500'}>Detaylar</span>
            <span className={step >= 3 ? 'text-primary-blue' : 'text-gray-500'}>Tamamlandı</span>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-6">Hesap Oluştur</h2>
              
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 mb-6">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
              
              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ad Soyad *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="Ahmet Yılmaz"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue"
                      required
                    />
                  </div>
                </div>
                
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Adresi *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ornek@email.com"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue"
                      required
                    />
                  </div>
                </div>
                
                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Şifre *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="En az 8 karakter"
                      className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                
                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Şifre Tekrar *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Şifrenizi tekrar girin"
                      className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleNext}
                className="w-full bg-primary-blue hover:bg-blue-600 text-white font-bold py-3 rounded-lg mt-6"
              >
                Devam Et
              </button>
            </div>
          )}
          
          {/* Step 2: Details */}
          {step === 2 && (
            <form onSubmit={handleSubmit}>
              <h2 className="text-2xl font-black text-gray-900 mb-6">Profil Detayları</h2>
              
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 mb-6">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
              
              <div className="space-y-4">
                {/* Username */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Kullanıcı Adı *
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="@kullaniciadi"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue"
                    required
                  />
                </div>
                
                {/* User Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Hesap Tipi *
                  </label>
                  <select
                    name="user_type"
                    value={formData.user_type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue"
                  >
                    <option value="normal">Vatandaş</option>
                    <option value="party_member">Parti Üyesi</option>
                    <option value="politician">Siyasetçi</option>
                    <option value="media">Medya</option>
                  </select>
                </div>
                
                {/* Agreements */}
                <div className="space-y-3 pt-4">
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="w-5 h-5 mt-0.5 text-primary-blue border-gray-300 rounded focus:ring-primary-blue"
                    />
                    <span className="text-sm text-gray-700">
                      <Link to="/terms" className="text-primary-blue hover:underline font-semibold">Kullanım Koşulları</Link>'nı okudum ve kabul ediyorum
                    </span>
                  </label>
                  
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="agreePrivacy"
                      checked={formData.agreePrivacy}
                      onChange={handleChange}
                      className="w-5 h-5 mt-0.5 text-primary-blue border-gray-300 rounded focus:ring-primary-blue"
                    />
                    <span className="text-sm text-gray-700">
                      <Link to="/privacy" className="text-primary-blue hover:underline font-semibold">Gizlilik Politikası</Link>'nı okudum ve kabul ediyorum
                    </span>
                  </label>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 rounded-lg"
                >
                  Geri
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-primary-blue hover:bg-blue-600 text-white font-bold py-3 rounded-lg disabled:opacity-50"
                >
                  {loading ? 'Kaydediliyor...' : 'Kayıt Ol'}
                </button>
              </div>
            </form>
          )}
          
          {/* Step 3: Success */}
          {step === 3 && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">Kayıt Başarılı!</h2>
              <p className="text-gray-600 mb-4">Hesabınız oluşturuldu, ana sayfaya yönlendiriliyorsunuz...</p>
            </div>
          )}
          
          {/* Login Link */}
          {step < 3 && (
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Zaten hesabınız var mı?{' '}
                <Link to="/login" className="text-primary-blue hover:text-blue-600 font-bold">
                  Giriş Yapın
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
```

---

## 📂 2. PROFILE SETTINGS

### ⚙️ SettingsLayout.jsx

```jsx
import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { User, Lock, Shield, Bell, Palette, Globe, Download, Trash2 } from 'lucide-react';

export const SettingsLayout = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/settings/profile', icon: User, label: 'Profil Düzenle' },
    { path: '/settings/account', icon: Lock, label: 'Hesap' },
    { path: '/settings/security', icon: Shield, label: 'Güvenlik' },
    { path: '/settings/notifications', icon: Bell, label: 'Bildirimler' },
    { path: '/settings/privacy', icon: Globe, label: 'Gizlilik' },
    { path: '/settings/appearance', icon: Palette, label: 'Görünüm' },
    { path: '/settings/data', icon: Download, label: 'Verilerim' },
    { path: '/settings/delete', icon: Trash2, label: 'Hesabı Sil' },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-main py-8">
        <h1 className="text-3xl font-black text-gray-900 mb-8">Ayarlar</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Sidebar */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 h-fit">
            <nav className="space-y-1">
              {menuItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary-blue text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-semibold">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Content */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
```

---

## 📂 3. ADMIN DASHBOARD

### 📊 AdminDashboard.jsx (Ana Dashboard)

```jsx
import { useState, useEffect } from 'react';
import { Users, FileText, TrendingUp, Activity, AlertCircle, CheckCircle } from 'lucide-react';

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    totalPolitScore: 0,
    activeUsers: 0,
    pendingModeration: 0,
    automatedPosts: 0,
  });
  
  // TODO: Fetch from API
  useEffect(() => {
    setStats({
      totalUsers: 12543,
      totalPosts: 45678,
      totalPolitScore: 125483920,
      activeUsers: 3421,
      pendingModeration: 23,
      automatedPosts: 1234,
    });
  }, []);
  
  const statCards = [
    {
      label: 'Toplam Kullanıcı',
      value: stats.totalUsers.toLocaleString('tr-TR'),
      icon: Users,
      color: 'blue',
      change: '+12%',
    },
    {
      label: 'Toplam Paylaşım',
      value: stats.totalPosts.toLocaleString('tr-TR'),
      icon: FileText,
      color: 'green',
      change: '+8%',
    },
    {
      label: 'Toplam Polit Puan',
      value: `${(stats.totalPolitScore / 1000000).toFixed(1)}M`,
      icon: TrendingUp,
      color: 'purple',
      change: '+15%',
    },
    {
      label: 'Aktif Kullanıcı',
      value: stats.activeUsers.toLocaleString('tr-TR'),
      icon: Activity,
      color: 'orange',
      change: '+5%',
    },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container-main">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Platform yönetim merkezi</p>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
                </div>
                <span className="text-sm font-semibold text-green-500">{stat.change}</span>
              </div>
              <div className="text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
        
        {/* Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Bekleyen Moderasyon</h3>
                <p className="text-sm text-gray-700 mb-3">
                  {stats.pendingModeration} paylaşım moderasyon bekliyor
                </p>
                <button className="text-sm font-semibold text-yellow-600 hover:text-yellow-700">
                  İncele →
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Otomasyon Aktif</h3>
                <p className="text-sm text-gray-700 mb-3">
                  {stats.automatedPosts} otomatik paylaşım toplandi
                </p>
                <button className="text-sm font-semibold text-green-600 hover:text-green-700">
                  Detaylar →
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Charts would go here */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Kullanıcı Büyümesi</h3>
            {/* Chart component */}
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Grafik buraya gelecek (Recharts)</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Polit Puan Dağılımı</h3>
            {/* Chart component */}
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Grafik buraya gelecek (Recharts)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
```

---

## ⭐ ÖNEMLİ NOTLAR

### Bu dosyada sağlanan şablonlar:
1. ✅ Auth sayfaları (Login ✓, Register ✓)
2. ✅ Settings Layout
3. ✅ Admin Dashboard
4. ✅ PolitScoreEditor (AlgorithmSettings.jsx - zaten hazır!)

### Eksik kalan component'ler için:
- Her component için yukarıdaki örnekleri baz alabilirsiniz
- Aynı tasarım dilini kullanın (Tailwind + Lucide icons)
- `useAuth`, `useNotifications` context'lerini kullanın
- Form management için `react-hook-form` ekleyin
- Validation için `zod` kullanın

### Önerilen geliştirme sırası:
1. ✅ Auth Context & Pages (Hazır!)
2. ✅ Profile Settings
3. ✅ Admin Dashboard & PolitScore Editor (Hazır!)
4. Messages (FloatingChat'i geliştir)
5. Notifications
6. Theme Editor
7. User Management
8. Post Moderation
9. Analytics

---

**Sonraki adım:** Backend API'yi başlatmak istersen hazırım! 🚀
