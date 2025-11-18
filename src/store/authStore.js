import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockUsers } from '../mock/users';

// Auth store - Zustand ile state management
export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          // Mock login - gerçekte API çağrısı yapılacak
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock: Email'e göre kullanıcı bul
          const foundUser = mockUsers.find(u => u.email === email);
          
          if (!foundUser) {
            set({ 
              isLoading: false, 
              error: 'E-posta veya şifre hatalı',
              isAuthenticated: false,
              user: null
            });
            return { success: false, error: 'E-posta veya şifre hatalı' };
          }

          // Mock: Şifre kontrolü (gerçekte backend'de yapılacak)
          // Şimdilik herhangi bir şifre kabul ediyoruz
          if (!password || password.length < 3) {
            set({ 
              isLoading: false, 
              error: 'Şifre en az 3 karakter olmalıdır',
              isAuthenticated: false,
              user: null
            });
            return { success: false, error: 'Şifre en az 3 karakter olmalıdır' };
          }

          // Başarılı giriş
          set({
            user: foundUser,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });

          return { success: true, user: foundUser };
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error.message || 'Giriş yapılırken bir hata oluştu',
            isAuthenticated: false,
            user: null
          });
          return { success: false, error: error.message || 'Giriş yapılırken bir hata oluştu' };
        }
      },

      register: async (formData) => {
        set({ isLoading: true, error: null });
        
        try {
          // Mock register - gerçekte API çağrısı yapılacak
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Validasyon
          if (!formData.email || !formData.password || !formData.full_name) {
            set({ 
              isLoading: false, 
              error: 'Lütfen tüm alanları doldurun',
              isAuthenticated: false,
              user: null
            });
            return { success: false, error: 'Lütfen tüm alanları doldurun' };
          }

          if (formData.password.length < 6) {
            set({ 
              isLoading: false, 
              error: 'Şifre en az 6 karakter olmalıdır',
              isAuthenticated: false,
              user: null
            });
            return { success: false, error: 'Şifre en az 6 karakter olmalıdır' };
          }

          // Email kontrolü
          const existingUser = mockUsers.find(u => u.email === formData.email);
          if (existingUser) {
            set({ 
              isLoading: false, 
              error: 'Bu e-posta adresi zaten kullanılıyor',
              isAuthenticated: false,
              user: null
            });
            return { success: false, error: 'Bu e-posta adresi zaten kullanılıyor' };
          }

          // Yeni kullanıcı oluştur
          const newUser = {
            user_id: mockUsers.length + 1,
            username: formData.email.split('@')[0],
            email: formData.email,
            full_name: formData.full_name,
            profile_image: null,
            bio: formData.bio || 'Yeni kullanıcı',
            user_type: formData.user_type || 'normal',
            politician_type: formData.politician_type || null,
            party_id: formData.party_id || null,
            city_code: formData.city_code || null,
            verification_badge: false,
            polit_score: 0,
            follower_count: 0,
            following_count: 0,
            post_count: 0,
            created_at: new Date().toISOString()
          };

          // Başarılı kayıt
          set({
            user: newUser,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });

          return { success: true, user: newUser };
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error.message || 'Kayıt olurken bir hata oluştu',
            isAuthenticated: false,
            user: null
          });
          return { success: false, error: error.message || 'Kayıt olurken bir hata oluştu' };
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null
        });
      },

      updateUser: (userData) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData }
          });
        }
      },

      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'polithane-auth', // localStorage key
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }), // Sadece user ve isAuthenticated persist edilecek
    }
  )
);
