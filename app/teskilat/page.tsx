'use client'

import Navbar from '../components/Navbar'
import { mockOrganizations, mockUsers } from '../lib/mockData'
import { UserRole } from '../types'

export default function TeskilatPage() {
  const currentUser = {
    id: '3',
    name: mockUsers[2].name,
    username: mockUsers[2].username,
    role: UserRole.VATANDAS_DOGRULANMIS,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentUser={currentUser} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🗺️ Teşkilat Haritası</h1>
          <p className="text-gray-600">Türkiye geneli parti teşkilat yapılanması</p>
        </div>

        {/* Map Placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div className="h-96 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center relative">
            <div className="text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">İnteraktif Türkiye Haritası</h3>
              <p className="text-gray-600">Harita modülü yakında eklenecek</p>
              <p className="text-sm text-gray-500 mt-2">Mapbox GL JS entegrasyonu ile</p>
            </div>
          </div>
        </div>

        {/* Organization Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-3xl font-bold text-primary-600">81</div>
            <div className="text-sm text-gray-600 mt-1">İl</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-3xl font-bold text-green-600">973</div>
            <div className="text-sm text-gray-600 mt-1">İlçe</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-3xl font-bold text-orange-600">12.5K</div>
            <div className="text-sm text-gray-600 mt-1">Teşkilat Üyesi</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-3xl font-bold text-purple-600">4</div>
            <div className="text-sm text-gray-600 mt-1">Aktif Parti</div>
          </div>
        </div>

        {/* Organization List */}
        <div className="space-y-6">
          {mockOrganizations.map((org) => (
            <div key={org.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{org.name}</h2>
                    <p className="text-gray-600 capitalize">{org.type} Seviyesi</p>
                  </div>
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                    {org.location.il}
                  </span>
                </div>

                {/* Parti Gücü */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Parti Gücü Dağılımı</h3>
                  <div className="space-y-2">
                    {Object.entries(org.partiGucu).map(([parti, guc]) => (
                      <div key={parti}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{parti}</span>
                          <span className="text-sm text-gray-600">{guc}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full transition-all"
                            style={{ width: `${guc}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gündem Isı Haritası */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Gündem Isı Haritası</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(org.gundemIsiHaritasi).map(([topic, heat]) => (
                      <div
                        key={topic}
                        className="px-3 py-1.5 rounded-lg text-sm"
                        style={{
                          backgroundColor: `rgba(59, 130, 246, ${heat / 100})`,
                          color: heat > 50 ? 'white' : 'gray',
                        }}
                      >
                        {topic}: {heat}%
                      </div>
                    ))}
                  </div>
                </div>

                {/* Yöneticiler */}
                {org.yoneticiler && (
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Yöneticiler</h3>
                    <div className="flex flex-wrap gap-2">
                      {org.yoneticiler.ilBaskani && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">
                          İl Başkanı: {org.yoneticiler.ilBaskani}
                        </span>
                      )}
                      {org.yoneticiler.vekiller && org.yoneticiler.vekiller.length > 0 && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm">
                          Vekiller: {org.yoneticiler.vekiller.length}
                        </span>
                      )}
                    </div>
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
