'use client'

import Navbar from '../components/Navbar'
import { mockUsers } from '../lib/mockData'
import { UserRole } from '../types'

export default function AnalitikPage() {
  const currentUser = {
    id: '1',
    name: mockUsers[0].name,
    username: mockUsers[0].username,
    role: UserRole.MILLETVEKILI,
  }

  // Mock analytics data
  const analytics = {
    imajSkoru: 78,
    son30GunTrend: [
      { date: new Date('2024-01-01'), destekSkoru: 65, trendSkoru: 70 },
      { date: new Date('2024-01-15'), destekSkoru: 72, trendSkoru: 75 },
      { date: new Date('2024-02-01'), destekSkoru: 78, trendSkoru: 80 },
    ],
    rakipKarsilastirma: {
      'competitor1': {
        name: 'Rakip 1',
        politPuanFarki: 150,
        takipciFarki: 2000,
        etkilesimFarki: 15,
      },
    },
    secimBolgesiNabiz: {
      bolge: 'Ankara 1. Bölge',
      destekOrani: 68,
      trend: 'up' as const,
    },
    partizanlikIsiHaritasi: {
      'Ekonomi': 85,
      'Eğitim': 70,
      'Sağlık': 60,
    },
    duyguHaritasi: {
      mutluluk: 65,
      ofke: 20,
      endise: 15,
      umut: 75,
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentUser={currentUser} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📊 Analitik Dashboard</h1>
          <p className="text-gray-600">Siyasi performans analizi ve trend takibi</p>
        </div>

        {/* İmaj Skoru */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">İmaj Skoru</h2>
          <div className="flex items-center space-x-6">
            <div className="text-5xl font-bold text-primary-600">{analytics.imajSkoru}</div>
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-primary-600 h-4 rounded-full transition-all"
                  style={{ width: `${analytics.imajSkoru}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">Son 30 günde %8 artış</p>
            </div>
          </div>
        </div>

        {/* Trend Grafiği */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Son 30 Gün Trend</h2>
          <div className="h-64 flex items-end justify-between space-x-4">
            {analytics.son30GunTrend.map((point, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-primary-600 rounded-t transition-all hover:bg-primary-700"
                  style={{ height: `${point.destekSkoru}%` }}
                  title={`${point.destekSkoru}%`}
                ></div>
                <div className="text-xs text-gray-600 mt-2">
                  {point.date.toLocaleDateString('tr-TR', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Rakip Karşılaştırma */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Rakip Karşılaştırma</h2>
            {Object.entries(analytics.rakipKarsilastirma).map(([id, data]) => (
              <div key={id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">{data.name}</span>
                  <span className="text-sm text-gray-600">vs Sen</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">PolitPuan Farkı</span>
                    <span className={`font-semibold ${data.politPuanFarki > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {data.politPuanFarki > 0 ? '+' : ''}{data.politPuanFarki}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Takipçi Farkı</span>
                    <span className={`font-semibold ${data.takipciFarki > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {data.takipciFarki > 0 ? '+' : ''}{data.takipciFarki.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Etkileşim Farkı</span>
                    <span className={`font-semibold ${data.etkilesimFarki > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {data.etkilesimFarki > 0 ? '+' : ''}{data.etkilesimFarki}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Seçim Bölgesi Nabız */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Seçim Bölgesi Nabız</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 font-medium">{analytics.secimBolgesiNabiz.bolge}</span>
                  <span className={`text-sm font-semibold ${
                    analytics.secimBolgesiNabiz.trend === 'up' ? 'text-green-600' : 
                    analytics.secimBolgesiNabiz.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {analytics.secimBolgesiNabiz.trend === 'up' ? '↑' : 
                     analytics.secimBolgesiNabiz.trend === 'down' ? '↓' : '→'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-600 h-3 rounded-full"
                    style={{ width: `${analytics.secimBolgesiNabiz.destekOrani}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Destek Oranı: {analytics.secimBolgesiNabiz.destekOrani}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partizanlık Isı Haritası */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Partizanlık Isı Haritası</h2>
          <div className="flex flex-wrap gap-3">
            {Object.entries(analytics.partizanlikIsiHaritasi).map(([topic, score]) => (
              <div
                key={topic}
                className="px-4 py-3 rounded-lg text-sm font-medium"
                style={{
                  backgroundColor: `rgba(239, 68, 68, ${score / 100})`,
                  color: score > 50 ? 'white' : 'gray',
                }}
              >
                {topic}: {score}%
              </div>
            ))}
          </div>
        </div>

        {/* Duygu Haritası */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Duygu Analizi</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl mb-2">😊</div>
              <div className="text-2xl font-bold text-green-700">{analytics.duyguHaritasi.mutluluk}%</div>
              <div className="text-xs text-green-600 mt-1">Mutluluk</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-3xl mb-2">😠</div>
              <div className="text-2xl font-bold text-red-700">{analytics.duyguHaritasi.ofke}%</div>
              <div className="text-xs text-red-600 mt-1">Öfke</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-3xl mb-2">😰</div>
              <div className="text-2xl font-bold text-yellow-700">{analytics.duyguHaritasi.endise}%</div>
              <div className="text-xs text-yellow-600 mt-1">Endişe</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl mb-2">✨</div>
              <div className="text-2xl font-bold text-blue-700">{analytics.duyguHaritasi.umut}%</div>
              <div className="text-xs text-blue-600 mt-1">Umut</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
