import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { FloatingChat } from './components/common/FloatingChat';
import { HomePage } from './pages/HomePage';
import { PostDetailPage } from './pages/PostDetailPage';
import { ProfilePage } from './pages/ProfilePage';
import { PartyDetailPage } from './pages/PartyDetailPage';
import { AgendaDetailPage } from './pages/AgendaDetailPage';
import { CityDetailPage } from './pages/CityDetailPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { MessagesPage } from './pages/MessagesPage';
import { SearchPage } from './pages/SearchPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';

// Yeni sayfalar
import { LoginPageNew } from './pages/auth/LoginPageNew';
import { RegisterPageNew } from './pages/auth/RegisterPageNew';
import { AlgorithmSettings } from './pages/admin/AlgorithmSettings';
import { UserManagement } from './pages/admin/UserManagement';
import { SettingsLayout } from './pages/settings/SettingsLayout';
import { ProfileSettings } from './pages/settings/ProfileSettings';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:postId" element={<PostDetailPage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/party/:partyId" element={<PartyDetailPage />} />
          <Route path="/agenda/:agendaSlug" element={<AgendaDetailPage />} />
          <Route path="/city/:cityCode" element={<CityDetailPage />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login-new" element={<LoginPageNew />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register-new" element={<RegisterPageNew />} />
          
          {/* Messages */}
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/search" element={<SearchPage />} />
          
          {/* Settings Routes */}
          <Route path="/settings" element={<SettingsLayout />}>
            <Route path="profile" element={<ProfileSettings />} />
            <Route path="account" element={<div className="p-8 text-center text-gray-500">Hesap Ayarları - Yakında</div>} />
            <Route path="security" element={<div className="p-8 text-center text-gray-500">Güvenlik Ayarları - Yakında</div>} />
            <Route path="notifications" element={<div className="p-8 text-center text-gray-500">Bildirim Ayarları - Yakında</div>} />
            <Route path="privacy" element={<div className="p-8 text-center text-gray-500">Gizlilik Ayarları - Yakında</div>} />
            <Route path="appearance" element={<div className="p-8 text-center text-gray-500">Görünüm Ayarları - Yakında</div>} />
            <Route path="data" element={<div className="p-8 text-center text-gray-500">Veri İndirme - Yakında</div>} />
            <Route path="delete" element={<div className="p-8 text-center text-gray-500">Hesap Silme - Yakında</div>} />
          </Route>
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/algorithm" element={<AlgorithmSettings />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/posts" element={<div className="p-8 text-center text-gray-500">Post Moderasyonu - Yakında</div>} />
          <Route path="/admin/automation" element={<div className="p-8 text-center text-gray-500">Otomasyon Kontrol - Yakında</div>} />
          <Route path="/admin/analytics" element={<div className="p-8 text-center text-gray-500">Analitikler - Yakında</div>} />
        </Routes>
      </main>
      <Footer />
      <FloatingChat />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
