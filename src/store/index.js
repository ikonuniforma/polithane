/**
 * Store Index
 * Tüm store'ları tek yerden export eder
 */

export { useAuthStore } from './authStore';
export { useUIStore } from './uiStore';
export { usePostsStore } from './postsStore';

// Store'ları birleştiren helper hook (isteğe bağlı)
export const useStores = () => {
  const auth = useAuthStore();
  const ui = useUIStore();
  const posts = usePostsStore();
  
  return {
    auth,
    ui,
    posts
  };
};
