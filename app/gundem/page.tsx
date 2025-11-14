'use client'

import Navbar from '../components/Navbar'
import { mockAgendaTopics, mockUsers } from '../lib/mockData'
import { UserRole } from '../types'
import { formatDistanceToNow } from 'date-fns'
import { tr } from 'date-fns/locale'

export default function GundemPage() {
  const currentUser = {
    id: '3',
    name: mockUsers[2].name,
    username: mockUsers[2].username,
    role: UserRole.VATANDAS_DOGRULANMIS,
  }

  const getPriorityColor = (priority: number) => {
    if (priority >= 8) return 'bg-red-100 text-red-700 border-red-300'
    if (priority >= 5) return 'bg-yellow-100 text-yellow-700 border-yellow-300'
    return 'bg-blue-100 text-blue-700 border-blue-300'
  }

  const getPartiDestekColor = (destek: string) => {
    switch (destek) {
      case 'destekliyor': return 'text-green-700 bg-green-100'
      case 'karsı': return 'text-red-700 bg-red-100'
      default: return 'text-gray-700 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentUser={currentUser} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📰 Gündem</h1>
          <p className="text-gray-600">AI destekli gündem takibi ve analiz</p>
        </div>

        {/* Category Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 mb-6">
          <div className="flex space-x-2 overflow-x-auto">
            {['Ülke Gündemi', 'Parti Gündemi', 'Bölgesel Gündem', 'STK Gündemi', 'Vatandaş Gündemi'].map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap bg-primary-600 text-white"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Agenda Topics */}
        <div className="space-y-6">
          {mockAgendaTopics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h2 className="text-2xl font-bold text-gray-900">{topic.title}</h2>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(topic.priority)}`}>
                        Öncelik: {topic.priority}/10
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-4">{topic.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{formatDistanceToNow(topic.createdAt, { addSuffix: true, locale: tr })}</span>
                      <span>·</span>
                      <span>Trend Skoru: <strong>{topic.trendSkoru}%</strong></span>
                    </div>
                  </div>
                </div>

                {/* Parti Destekleri */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Parti Görüşleri</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(topic.partiDestekleri).map(([parti, destek]) => (
                      <div
                        key={parti}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium ${getPartiDestekColor(destek)}`}
                      >
                        {parti}: {destek === 'destekliyor' ? '✅' : destek === 'karsı' ? '❌' : '➖'}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vatandaş Görüşleri */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Vatandaş Görüşleri</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-700">{topic.vatandasGorusleri.olumlu}%</div>
                      <div className="text-xs text-green-600 mt-1">Olumlu</div>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-700">{topic.vatandasGorusleri.olumsuz}%</div>
                      <div className="text-xs text-red-600 mt-1">Olumsuz</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-700">{topic.vatandasGorusleri.notr}%</div>
                      <div className="text-xs text-gray-600 mt-1">Nötr</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t border-gray-200 pt-4 mt-4 flex items-center justify-between">
                  <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                    Kim Ne Demiş? →
                  </button>
                  <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                    Medya Ne Yazmış? →
                  </button>
                  <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                    Detaylı Analiz →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
