import { useState } from 'react';
import { Search, Bell, MessageCircle, User, LogIn, LogOut } from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';
import { AnimatedSlogan } from '../common/AnimatedSlogan';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'react-hot-toast';

export const Header = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [notificationCount] = useState(5);
  const [unreadMessages] = useState(3);
  
  const handleLogout = () => {
    logout();
    toast.success('Çıkış yapıldı');
    navigate('/');
  };
  
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 h-[60px]">
      <div className="container-main h-full flex items-center justify-between">
        {/* Logo ve Slogan */}
        <div 
          className="cursor-pointer flex items-center"
          onClick={() => navigate('/')}
        >
          <AnimatedSlogan />
        </div>
        
        {/* Sağ Aksiyonlar */}
        <div className="flex items-center gap-4">
          {/* Arama */}
          <button
            onClick={() => navigate('/search')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Search className="w-5 h-5 text-gray-600" />
          </button>
          
          {isAuthenticated && user ? (
            <>
              {/* Bildirimler */}
              <button 
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => navigate('/notifications')}
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {notificationCount > 0 && (
                  <Badge 
                    variant="danger" 
                    size="small"
                    className="absolute -top-1 -right-1"
                  >
                    {notificationCount}
                  </Badge>
                )}
              </button>
              
              {/* Mesajlar */}
              <button 
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => navigate('/messages')}
              >
                <MessageCircle className="w-5 h-5 text-gray-600" />
                {unreadMessages > 0 && (
                  <Badge 
                    variant="danger" 
                    size="small"
                    className="absolute -top-1 -right-1"
                  >
                    {unreadMessages}
                  </Badge>
                )}
              </button>
              
              {/* Kullanıcı Avatar - Dropdown */}
              <div className="relative group">
                <button onClick={() => navigate(`/profile/${user.user_id}`)}>
                  <Avatar 
                    src={user.profile_image || `https://i.pravatar.cc/150?img=${user.user_id}`} 
                    size="36px" 
                    verified={user.verification_badge}
                  />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-2">
                    <div className="px-3 py-2 border-b border-gray-100">
                      <div className="font-semibold text-sm">{user.full_name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Çıkış Yap
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-2 px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-[#0088bb] transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span>Giriş Yap</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
