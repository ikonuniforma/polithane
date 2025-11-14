'use client'

import Navbar from '../components/Navbar'
import { mockMediaArticles, mockUsers } from '../lib/mockData'
import { UserRole } from '../types'
import { formatDistanceToNow } from 'date-fns'
import { tr } from 'date-fns/locale'

export default function MedyaPage() {
  const currentUser = {
    id: '3',
    name: mockUsers[2].name,
    username: mockUsers[2].username,
    role: UserRole.VATANDAS_DOGRULANMIS,
  }

  const getTarafsizlikColor = (score: number) => {
    if (score >= 80) return 'text-green-700 bg-green-100'
    if (score >= 60) return 'text-yellow-700 bg-yellow-100'
    return 'text-red-700 bg-red-100'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentUser={currentUser} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📺 Medya Merkezi</h1>
          <p className="text-gray-600">Siyasi haberler, röportajlar ve canlı yayınlar</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium text-sm">
              Tümü
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-300">
              Haberler
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-300">
              Röportajlar
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-300">
              Canlı Yayınlar
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-300">
              Parti Açıklamaları
            </button>
          </div>
        </div>

        {/* Media Articles */}
        <div className="space-y-6">
          {mockMediaArticles.map((article) => (
            <div key={article.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{article.title}</h2>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                      <span className="font-medium">{article.source}</span>
                      {article.author && (
                        <>
                          <span>·</span>
                          <span>{article.author}</span>
                        </>
                      )}
                      <span>·</span>
                      <span>{formatDistanceToNow(article.publishedAt, { addSuffix: true, locale: tr })}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">{article.content}</p>

                {/* AI Analysis */}
                {article.aiAnalysis && (
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">AI Analiz</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className={`px-3 py-2 rounded-lg ${getTarafsizlikColor(article.aiAnalysis.tarafsizlikSkoru)}`}>
                        <div className="text-xs font-medium mb-1">Tarafsızlık Skoru</div>
                        <div className="text-lg font-bold">{article.aiAnalysis.tarafsizlikSkoru}%</div>
                      </div>
                      <div className="px-3 py-2 rounded-lg bg-orange-100 text-orange-700">
                        <div className="text-xs font-medium mb-1">Gerilim Puanı</div>
                        <div className="text-lg font-bold">{article.aiAnalysis.gerilimPuani}%</div>
                      </div>
                      <div className="px-3 py-2 rounded-lg bg-purple-100 text-purple-700">
                        <div className="text-xs font-medium mb-1">Partizanlık</div>
                        <div className="text-sm font-bold">{article.aiAnalysis.partizanlikEtiketi}</div>
                      </div>
                    </div>
                    {article.aiAnalysis.factCheckSkoru && (
                      <div className="mt-3 px-3 py-2 rounded-lg bg-blue-100 text-blue-700">
                        <span className="text-sm font-medium">Fact-Check Skoru: {article.aiAnalysis.factCheckSkoru}%</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {article.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
