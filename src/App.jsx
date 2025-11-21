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
import { AlgorithmSettings } from './pages/admin/AlgorithmSettings';

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
          
          {/* Messages */}
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/search" element={<SearchPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/algorithm" element={<AlgorithmSettings />} />
          
          {/* TODO: Settings routes */}
          {/* <Route path="/settings/*" element={<SettingsLayout />} /> */}
        </Routes>
      </main>
      <Footer />
      <FloatingChat />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
