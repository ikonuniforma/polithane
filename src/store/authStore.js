import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Authentication Store
 * Kullanıcı giriş/çıkış ve kimlik doğrulama durumunu yönetir
 */
export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      isAuthenticated: false,
      token: null,
      user: null,
      loading: false,
      error: null,

      // Actions
      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          // TODO: Gerçek API çağrısı yapılacak
          // const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
          
          // Mock login
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const mockUser = {
            user_id: 1,
            email: email,
            username: 'test_user',
            full_name: 'Test Kullanıcı',
            user_type: 'normal',
            verification_badge: false,
            profile_image: '/assets/default/avatar.png'
          };
          
          const mockToken = 'mock_token_' + Date.now();
          
          set({
            isAuthenticated: true,
            token: mockToken,
            user: mockUser,
            loading: false,
            error: null
          });
          
          return { success: true, user: mockUser };
        } catch (error) {
          set({
            loading: false,
            error: error.message || 'Giriş başarısız',
            isAuthenticated: false,
            token: null,
            user: null
          });
          return { success: false, error: error.message };
        }
      },

      register: async (userData) => {
        set({ loading: true, error: null });
        try {
          // TODO: Gerçek API çağrısı yapılacak
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const mockUser = {
            user_id: Date.now(),
            email: userData.email,
            username: userData.username,
            full_name: userData.full_name,
            user_type: userData.user_type || 'normal',
            verification_badge: false,
            profile_image: '/assets/default/avatar.png'
          };
          
          const mockToken = 'mock_token_' + Date.now();
          
          set({
            isAuthenticated: true,
            token: mockToken,
            user: mockUser,
            loading: false,
            error: null
          });
          
          return { success: true, user: mockUser };
        } catch (error) {
          set({
            loading: false,
            error: error.message || 'Kayıt başarısız',
            isAuthenticated: false,
            token: null,
            user: null
          });
          return { success: false, error: error.message };
        }
      },

      logout: () => {
        set({
          isAuthenticated: false,
          token: null,
          user: null,
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
      },

      // Token yenileme (gelecekte kullanılacak)
      refreshToken: async () => {
        // TODO: Token yenileme implementasyonu
        const currentToken = get().token;
        if (currentToken) {
          // Token yenileme işlemi
          return true;
        }
        return false;
      }
    }),
    {
      name: 'polithane-auth', // localStorage key
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        user: state.user
      })
    }
  )
);
