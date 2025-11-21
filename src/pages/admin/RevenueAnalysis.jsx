import { TrendingUp, DollarSign, Users, CreditCard, Calendar } from 'lucide-react';

export const RevenueAnalysis = () => {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Gelir Analizi</h1>
        <p className="text-gray-600">Detaylı gelir raporlarını inceleyin</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm opacity-90">Toplam Gelir</div>
            <TrendingUp className="w-6 h-6 opacity-90" />
          </div>
          <div className="text-3xl font-black mb-2">₺124,567</div>
          <div className="text-xs opacity-90">Bu ay ↑ 15.3%</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm opacity-90">Aylık Tekrarlayan Gelir</div>
            <DollarSign className="w-6 h-6 opacity-90" />
          </div>
          <div className="text-3xl font-black mb-2">₺89,234</div>
          <div className="text-xs opacity-90">MRR (Monthly Recurring Revenue)</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm opacity-90">Ödenen Üyeler</div>
            <Users className="w-6 h-6 opacity-90" />
          </div>
          <div className="text-3xl font-black mb-2">1,247</div>
          <div className="text-xs opacity-90">Aktif abonelik</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm opacity-90">Ortalama Gelir/Kullanıcı</div>
            <CreditCard className="w-6 h-6 opacity-90" />
          </div>
          <div className="text-3xl font-black mb-2">₺71.52</div>
          <div className="text-xs opacity-90">ARPU (Average Revenue Per User)</div>
        </div>
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Gelir Trendi (Son 12 Ay)</h3>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue outline-none">
            <option>Son 12 Ay</option>
            <option>Son 6 Ay</option>
            <option>Son 3 Ay</option>
            <option>Bu Yıl</option>
          </select>
        </div>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 font-semibold">Gelir Grafiği</p>
            <p className="text-sm text-gray-400">Chart.js ile entegre edilecek</p>
          </div>
        </div>
      </div>

      {/* Revenue by Plan */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Planlara Göre Gelir</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <div className="font-semibold text-gray-900">Premium Yıllık</div>
                <div className="text-sm text-gray-600">234 abonelik</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-black text-primary-blue">₺58,432</div>
                <div className="text-xs text-gray-500">46.9%</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div>
                <div className="font-semibold text-gray-900">Premium Aylık</div>
                <div className="text-sm text-gray-600">789 abonelik</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-black text-purple-600">₺39,445</div>
                <div className="text-xs text-gray-500">31.7%</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <div className="font-semibold text-gray-900">Plus Aylık</div>
                <div className="text-sm text-gray-600">224 abonelik</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-black text-green-600">₦26,690</div>
                <div className="text-xs text-gray-500">21.4%</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Ödeme Yöntemlerine Göre</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <div className="font-semibold text-gray-900">Kredi Kartı</div>
                <div className="text-sm text-gray-600">1,089 işlem</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-black text-primary-blue">₺98,234</div>
                <div className="text-xs text-gray-500">78.8%</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div>
                <div className="font-semibold text-gray-900">Banka Transferi</div>
                <div className="text-sm text-gray-600">158 işlem</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-black text-purple-600">₺26,333</div>
                <div className="text-xs text-gray-500">21.2%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Breakdown */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Aylık Detay</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Ay</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Gelir</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Yeni Abonelik</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">İptal</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Net Büyüme</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs'].map((month, idx) => (
              <tr key={month} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-900">{month} 2024</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-gray-900">₺{(120000 + idx * 4000).toLocaleString()}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700">{45 + idx * 5}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700">{8 + idx}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-green-600">+{37 + idx * 4}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-green-600">↑ {(2.5 + idx * 0.5).toFixed(1)}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
