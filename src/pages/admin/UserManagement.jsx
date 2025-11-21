import { useState, useEffect } from 'react';
import { Search, Filter, Ban, CheckCircle, Trash2, Eye, Edit } from 'lucide-react';
import { mockUsers } from '../../mock/users';

export const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    user_type: 'all',
    verification: 'all',
    status: 'all',
  });
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    // TODO: Fetch from API
    setUsers(mockUsers);
  }, []);

  const filteredUsers = users.filter(user => {
    // Search filter
    if (searchQuery && !user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !user.username?.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Type filter
    if (filters.user_type !== 'all' && user.user_type !== filters.user_type) {
      return false;
    }
    
    // Verification filter
    if (filters.verification === 'verified' && !user.verification_badge) {
      return false;
    }
    if (filters.verification === 'unverified' && user.verification_badge) {
      return false;
    }
    
    return true;
  });

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(u => u.user_id));
    }
  };

  const handleBanUser = (userId) => {
    if (confirm('Kullanıcıyı yasaklamak istediğinize emin misiniz?')) {
      // TODO: API call
      console.log('Ban user:', userId);
    }
  };

  const handleVerifyUser = (userId) => {
    if (confirm('Kullanıcıyı doğrulamak istediğinize emin misiniz?')) {
      // TODO: API call
      console.log('Verify user:', userId);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Kullanıcı Yönetimi</h1>
          <p className="text-gray-600">{filteredUsers.length} kullanıcı bulundu</p>
        </div>
        
        {selectedUsers.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-700">{selectedUsers.length} seçili</span>
            <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors">
              Toplu Sil
            </button>
          </div>
        )}
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Kullanıcı ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue outline-none"
            />
          </div>
          
          <select
            value={filters.user_type}
            onChange={(e) => setFilters(prev => ({ ...prev, user_type: e.target.value }))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue outline-none"
          >
            <option value="all">Tüm Tipler</option>
            <option value="normal">Vatandaş</option>
            <option value="politician">Siyasetçi</option>
            <option value="media">Medya</option>
            <option value="party_member">Parti Üyesi</option>
          </select>
          
          <select
            value={filters.verification}
            onChange={(e) => setFilters(prev => ({ ...prev, verification: e.target.value }))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue outline-none"
          >
            <option value="all">Tüm Doğrulamalar</option>
            <option value="verified">Doğrulanmış</option>
            <option value="unverified">Doğrulanmamış</option>
          </select>
          
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filtrele
          </button>
        </div>
      </div>
      
      {/* User Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-primary-blue border-gray-300 rounded focus:ring-primary-blue"
                  />
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Kullanıcı</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Tip</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Parti</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Şehir</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Durum</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Aksiyon</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.slice(0, 50).map(user => (
                <tr key={user.user_id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.user_id)}
                      onChange={() => handleSelectUser(user.user_id)}
                      className="w-4 h-4 text-primary-blue border-gray-300 rounded focus:ring-primary-blue"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.profile_image}
                        alt={user.full_name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold text-gray-900 flex items-center gap-2">
                          {user.full_name}
                          {user.verification_badge && (
                            <CheckCircle className="w-4 h-4 text-primary-blue" />
                          )}
                        </div>
                        <div className="text-sm text-gray-500">@{user.username || user.user_id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                      {user.user_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.party?.party_short_name || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.city_code || '-'}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      Aktif
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleVerifyUser(user.user_id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
                        title="Doğrula"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Görüntüle"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded transition-colors"
                        title="Düzenle"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleBanUser(user.user_id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Yasakla"
                      >
                        <Ban className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t flex items-center justify-between">
          <div className="text-sm text-gray-600">
            1-50 arası gösteriliyor (Toplam: {filteredUsers.length})
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-semibold transition-colors">
              Önceki
            </button>
            <button className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600 text-sm font-semibold transition-colors">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-semibold transition-colors">
              2
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-semibold transition-colors">
              Sonraki
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
