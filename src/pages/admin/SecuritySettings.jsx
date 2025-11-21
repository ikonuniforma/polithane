import { Shield, Lock, Eye, AlertTriangle, CheckCircle, Key } from 'lucide-react';

export const SecuritySettings = () => {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Güvenlik Ayarları</h1>
        <p className="text-gray-600">Platform güvenliğini yönetin ve izleyin</p>
      </div>

      {/* Security Score */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-8 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black mb-2">Güvenlik Skoru</h2>
            <p className="text-green-100 mb-4">Platformunuz güvenli durumda</p>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">Tüm güvenlik kontrolleri aktif</span>
            </div>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mb-2">
              <div className="text-6xl font-black">95</div>
            </div>
            <div className="text-sm opacity-90">/ 100</div>
          </div>
        </div>
      </div>

      {/* Security Features */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Lock className="w-6 h-6 text-primary-blue" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">SSL/TLS Sertifikası</h3>
                <p className="text-sm text-gray-600">HTTPS şifreleme</p>
              </div>
            </div>
            <span className="text-green-600 font-semibold text-sm">Aktif</span>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Sertifika Türü:</span>
              <span className="text-sm font-semibold text-gray-900">Let's Encrypt</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Geçerlilik:</span>
              <span className="text-sm font-semibold text-gray-900">15 Mayıs 2024</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">DDoS Koruması</h3>
                <p className="text-sm text-gray-600">Cloudflare Pro</p>
              </div>
            </div>
            <span className="text-green-600 font-semibold text-sm">Aktif</span>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Engellenen Saldırı:</span>
              <span className="text-sm font-semibold text-gray-900">247 (Bu Ay)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Koruma Seviyesi:</span>
              <span className="text-sm font-semibold text-primary-blue">Yüksek</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Key className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">API Güvenliği</h3>
                <p className="text-sm text-gray-600">Rate limiting & JWT</p>
              </div>
            </div>
            <span className="text-green-600 font-semibold text-sm">Aktif</span>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Rate Limit:</span>
              <span className="text-sm font-semibold text-gray-900">100 req/min</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Token Süresi:</span>
              <span className="text-sm font-semibold text-gray-900">24 saat</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Güvenlik Duvarı</h3>
                <p className="text-sm text-gray-600">WAF (Web Application Firewall)</p>
              </div>
            </div>
            <span className="text-green-600 font-semibold text-sm">Aktif</span>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Engellenen IP:</span>
              <span className="text-sm font-semibold text-gray-900">1,423</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Kara Liste:</span>
              <span className="text-sm font-semibold text-gray-900">89 IP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security Logs */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Son Güvenlik Olayları</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-semibold text-gray-900 text-sm">Başarısız Giriş Denemesi</div>
                <div className="text-xs text-gray-600">IP: 192.168.1.45 - 15 kez yanlış şifre</div>
              </div>
              <span className="text-xs text-gray-500">5 dk önce</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
              <Eye className="w-5 h-5 text-yellow-600 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-semibold text-gray-900 text-sm">Şüpheli API İsteği</div>
                <div className="text-xs text-gray-600">Rate limit aşımı tespit edildi</div>
              </div>
              <span className="text-xs text-gray-500">12 dk önce</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-semibold text-gray-900 text-sm">DDoS Saldırısı Engellendi</div>
                <div className="text-xs text-gray-600">1,247 zararlı istek filtrelendi</div>
              </div>
              <span className="text-xs text-gray-500">1 saat önce</span>
            </div>
          </div>
        </div>
      </div>

      {/* Password Policy */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Şifre Politikası</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-700">Minimum 8 karakter</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-700">Büyük ve küçük harf zorunlu</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-700">En az 1 rakam</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-700">Özel karakter zorunlu</span>
          </div>
        </div>
      </div>
    </div>
  );
};
