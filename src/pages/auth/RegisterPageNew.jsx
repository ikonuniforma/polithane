import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';

export const RegisterPageNew = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    user_type: 'normal',
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
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Ad Soyad *</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Ahmet Yılmaz" className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue outline-none" required />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Adresi *</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="ornek@email.com" className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue outline-none" required />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Şifre *</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="En az 8 karakter" className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue outline-none" required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Şifre Tekrar *</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Şifrenizi tekrar girin" className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue outline-none" required />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
              
              <button onClick={handleNext} className="w-full bg-primary-blue hover:bg-blue-600 text-white font-bold py-3 rounded-lg mt-6 transition-all">
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
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Kullanıcı Adı *</label>
                  <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="@kullaniciadi" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue outline-none" required />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Hesap Tipi *</label>
                  <select name="user_type" value={formData.user_type} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue outline-none">
                    <option value="normal">Vatandaş</option>
                    <option value="party_member">Parti Üyesi</option>
                    <option value="politician">Siyasetçi</option>
                    <option value="media">Medya</option>
                  </select>
                </div>
                
                <div className="space-y-3 pt-4">
                  <label className="flex items-start gap-3">
                    <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} className="w-5 h-5 mt-0.5 text-primary-blue border-gray-300 rounded focus:ring-primary-blue" />
                    <span className="text-sm text-gray-700">
                      <Link to="/terms" className="text-primary-blue hover:underline font-semibold">Kullanım Koşulları</Link>'nı okudum ve kabul ediyorum
                    </span>
                  </label>
                  
                  <label className="flex items-start gap-3">
                    <input type="checkbox" name="agreePrivacy" checked={formData.agreePrivacy} onChange={handleChange} className="w-5 h-5 mt-0.5 text-primary-blue border-gray-300 rounded focus:ring-primary-blue" />
                    <span className="text-sm text-gray-700">
                      <Link to="/privacy" className="text-primary-blue hover:underline font-semibold">Gizlilik Politikası</Link>'nı okudum ve kabul ediyorum
                    </span>
                  </label>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setStep(1)} className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 rounded-lg transition-all">
                  Geri
                </button>
                <button type="submit" disabled={loading} className="flex-1 bg-primary-blue hover:bg-blue-600 text-white font-bold py-3 rounded-lg disabled:opacity-50 transition-all">
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
          
          {step < 3 && (
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Zaten hesabınız var mı?{' '}
                <Link to="/login-new" className="text-primary-blue hover:text-blue-600 font-bold">
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
