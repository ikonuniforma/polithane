import { create } from 'zustand';
import { mockPosts, generateMockPosts } from '../mock/posts';
import { mockUsers } from '../mock/users';
import { mockParties } from '../mock/parties';

/**
 * Posts Store
 * Post'ları ve etkileşimleri yönetir
 */
export const usePostsStore = create((set, get) => ({
  // State
  posts: [],
  currentPost: null,
  likedPosts: new Set(),
  savedPosts: new Set(),
  filters: {
    category: 'all', // all, mps, organization, citizens, experience, media
    agenda: null,
    party: null,
    sortBy: 'polit_score' // polit_score, date, likes, comments
  },
  loading: false,
  error: null,

  // Actions - Posts
  loadPosts: async (count = 400) => {
    set({ loading: true, error: null });
    try {
      // TODO: Gerçek API çağrısı yapılacak
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const allPosts = generateMockPosts(count, mockUsers, mockParties);
      
      set({
        posts: allPosts,
        loading: false,
        error: null
      });
      
      return allPosts;
    } catch (error) {
      set({
        loading: false,
        error: error.message || 'Postlar yüklenemedi',
        posts: []
      });
      return [];
    }
  },

  getPostById: (postId) => {
    const posts = get().posts;
    return posts.find(p => p.post_id === parseInt(postId)) || null;
  },

  setCurrentPost: (post) => {
    set({ currentPost: post });
  },

  // Actions - Likes
  toggleLike: (postId) => {
    const likedPosts = get().likedPosts;
    const posts = get().posts;
    const currentPost = get().currentPost;
    
    const isLiked = likedPosts.has(postId);
    const newLikedPosts = new Set(likedPosts);
    
    if (isLiked) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    
    // Post'ları güncelle
    const updatedPosts = posts.map(post => {
      if (post.post_id === postId) {
        return {
          ...post,
          like_count: isLiked ? post.like_count - 1 : post.like_count + 1,
          is_liked: !isLiked
        };
      }
      return post;
    });
    
    // Current post'u güncelle
    let updatedCurrentPost = currentPost;
    if (currentPost && currentPost.post_id === postId) {
      updatedCurrentPost = {
        ...currentPost,
        like_count: isLiked ? currentPost.like_count - 1 : currentPost.like_count + 1,
        is_liked: !isLiked
      };
    }
    
    set({
      likedPosts: newLikedPosts,
      posts: updatedPosts,
      currentPost: updatedCurrentPost
    });
    
    // TODO: API çağrısı yapılacak
    return !isLiked;
  },

  isLiked: (postId) => {
    return get().likedPosts.has(postId);
  },

  // Actions - Save/Bookmark
  toggleSave: (postId) => {
    const savedPosts = get().savedPosts;
    const isSaved = savedPosts.has(postId);
    const newSavedPosts = new Set(savedPosts);
    
    if (isSaved) {
      newSavedPosts.delete(postId);
    } else {
      newSavedPosts.add(postId);
    }
    
    set({ savedPosts: newSavedPosts });
    
    // TODO: API çağrısı yapılacak
    return !isSaved;
  },

  isSaved: (postId) => {
    return get().savedPosts.has(postId);
  },

  // Actions - Filters
  setFilter: (filterKey, filterValue) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [filterKey]: filterValue
      }
    }));
  },

  clearFilters: () => {
    set({
      filters: {
        category: 'all',
        agenda: null,
        party: null,
        sortBy: 'polit_score'
      }
    });
  },

  // Filtered posts
  getFilteredPosts: () => {
    const { posts, filters } = get();
    let filtered = [...posts];
    
    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(post => {
        const userType = post.user?.user_type;
        const politicianType = post.user?.politician_type;
        
        switch (filters.category) {
          case 'mps':
            return userType === 'politician' && politicianType === 'mp';
          case 'organization':
            return userType === 'party_member';
          case 'citizens':
            return userType === 'normal';
          case 'experience':
            return userType === 'ex_politician';
          case 'media':
            return userType === 'media';
          default:
            return true;
        }
      });
    }
    
    // Agenda filter
    if (filters.agenda) {
      filtered = filtered.filter(post => post.agenda_tag === filters.agenda);
    }
    
    // Party filter
    if (filters.party) {
      filtered = filtered.filter(post => post.user?.party_id === filters.party);
    }
    
    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'polit_score':
          return (b.polit_score || 0) - (a.polit_score || 0);
        case 'date':
          return new Date(b.created_at) - new Date(a.created_at);
        case 'likes':
          return b.like_count - a.like_count;
        case 'comments':
          return b.comment_count - a.comment_count;
        default:
          return 0;
      }
    });
    
    return filtered;
  },

  // Actions - Create Post
  createPost: async (postData) => {
    set({ loading: true, error: null });
    try {
      // TODO: Gerçek API çağrısı yapılacak
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newPost = {
        post_id: Date.now(),
        ...postData,
        created_at: new Date().toISOString(),
        like_count: 0,
        comment_count: 0,
        view_count: 0,
        polit_score: 0,
        is_liked: false,
        is_saved: false
      };
      
      set((state) => ({
        posts: [newPost, ...state.posts],
        loading: false,
        error: null
      }));
      
      return { success: true, post: newPost };
    } catch (error) {
      set({
        loading: false,
        error: error.message || 'Post oluşturulamadı'
      });
      return { success: false, error: error.message };
    }
  },

  // Actions - Delete Post
  deletePost: async (postId) => {
    set({ loading: true, error: null });
    try {
      // TODO: Gerçek API çağrısı yapılacak
      await new Promise(resolve => setTimeout(resolve, 300));
      
      set((state) => ({
        posts: state.posts.filter(p => p.post_id !== postId),
        currentPost: state.currentPost?.post_id === postId ? null : state.currentPost,
        loading: false,
        error: null
      }));
      
      return { success: true };
    } catch (error) {
      set({
        loading: false,
        error: error.message || 'Post silinemedi'
      });
      return { success: false, error: error.message };
    }
  }
}));
