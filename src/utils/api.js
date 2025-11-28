// API Service - Backend bağlantısı
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function for fetch requests
async function apiFetch(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Bir hata oluştu');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// ============================================
// DATA ADAPTERS - Backend -> Frontend format
// ============================================

// Backend'den gelen post verisini frontend formatına dönüştür
function adaptPost(post) {
  return {
    post_id: post.id,
    user_id: post.user_id,
    content_type: post.content_type || 'text',
    content_text: post.content,
    media_url: post.media_urls?.[0] || null,
    thumbnail_url: post.thumbnail_url,
    media_duration: post.media_duration,
    agenda_tag: post.category,
    polit_score: parseInt(post.polit_score) || 0,
    view_count: parseInt(post.view_count) || 0,
    like_count: parseInt(post.like_count) || 0,
    dislike_count: 0,
    comment_count: parseInt(post.comment_count) || 0,
    is_featured: post.is_trending || false,
    created_at: post.created_at,
    user: post.username ? {
      user_id: post.user_id,
      username: post.username,
      full_name: post.full_name,
      avatar_url: post.user_avatar,
      is_verified: post.is_verified,
      party_id: post.party_id,
      party: post.party_name ? {
        party_id: post.party_id,
        party_name: post.party_name,
        party_short_name: post.party_name,
        party_logo: post.party_logo,
        party_color: post.party_color,
      } : null
    } : null
  };
}

// Backend'den gelen party verisini frontend formatına dönüştür
function adaptParty(party) {
  return {
    party_id: party.id,
    party_name: party.name,
    party_short_name: party.short_name,
    party_logo: party.logo_url,
    party_flag: party.flag_url,
    parliament_seats: party.parliament_seats || 0,
    foundation_date: party.founded_date,
    party_color: party.color,
    is_active: party.is_active,
    mp_count: party.mp_count || 0,
  };
}

// ============================================
// POSTS API
// ============================================

export const postsAPI = {
  // Get all posts with filters
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const result = await apiFetch(`/posts?${queryString}`);
    return result.data.map(adaptPost);
  },

  // Get single post by ID
  getById: async (postId) => {
    const result = await apiFetch(`/posts/${postId}`);
    return result.data;
  },

  // Create new post
  create: async (postData) => {
    const result = await apiFetch('/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
    return result.data;
  },

  // Update post
  update: async (postId, postData) => {
    const result = await apiFetch(`/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify(postData),
    });
    return result.data;
  },

  // Delete post
  delete: async (postId) => {
    const result = await apiFetch(`/posts/${postId}`, {
      method: 'DELETE',
    });
    return result.data;
  },

  // Like/Unlike post
  toggleLike: async (postId) => {
    const result = await apiFetch(`/posts/${postId}/like`, {
      method: 'POST',
    });
    return result.data;
  },
};

// ============================================
// PARTIES API
// ============================================

export const partiesAPI = {
  // Get all parties
  getAll: async () => {
    const result = await apiFetch('/parties');
    return result.data.map(adaptParty);
  },

  // Get single party by ID
  getById: async (partyId) => {
    const result = await apiFetch(`/parties/${partyId}`);
    return result.data;
  },

  // Get party posts
  getPosts: async (partyId, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const result = await apiFetch(`/parties/${partyId}/posts?${queryString}`);
    return result.data;
  },

  // Follow/Unfollow party
  toggleFollow: async (partyId) => {
    const result = await apiFetch(`/parties/${partyId}/follow`, {
      method: 'POST',
    });
    return result.data;
  },
};

// ============================================
// USERS API
// ============================================

export const usersAPI = {
  // Get user by ID
  getById: async (userId) => {
    const result = await apiFetch(`/users/${userId}`);
    return result.data;
  },

  // Get user by username
  getByUsername: async (username) => {
    const result = await apiFetch(`/users/username/${username}`);
    return result.data;
  },

  // Get user posts
  getPosts: async (userId, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const result = await apiFetch(`/users/${userId}/posts?${queryString}`);
    return result.data;
  },

  // Follow/Unfollow user
  toggleFollow: async (userId) => {
    const result = await apiFetch(`/users/${userId}/follow`, {
      method: 'POST',
    });
    return result.data;
  },

  // Update profile
  updateProfile: async (userId, userData) => {
    const result = await apiFetch(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
    return result.data;
  },
};

// ============================================
// COMMENTS API
// ============================================

export const commentsAPI = {
  // Get comments for a post
  getByPostId: async (postId) => {
    const result = await apiFetch(`/posts/${postId}/comments`);
    return result.data;
  },

  // Create comment
  create: async (commentData) => {
    const result = await apiFetch('/comments', {
      method: 'POST',
      body: JSON.stringify(commentData),
    });
    return result.data;
  },

  // Delete comment
  delete: async (commentId) => {
    const result = await apiFetch(`/comments/${commentId}`, {
      method: 'DELETE',
    });
    return result.data;
  },
};

// ============================================
// AGENDAS API
// ============================================

export const agendasAPI = {
  // Get all agendas
  getAll: async () => {
    const result = await apiFetch('/agendas');
    return result.data;
  },

  // Get single agenda by ID
  getById: async (agendaId) => {
    const result = await apiFetch(`/agendas/${agendaId}`);
    return result.data;
  },

  // Get agenda posts
  getPosts: async (agendaId, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const result = await apiFetch(`/agendas/${agendaId}/posts?${queryString}`);
    return result.data;
  },
};

// ============================================
// SEARCH API
// ============================================

export const searchAPI = {
  // Search everything
  search: async (query, params = {}) => {
    const queryString = new URLSearchParams({ q: query, ...params }).toString();
    const result = await apiFetch(`/search?${queryString}`);
    return result.data;
  },

  // Search posts
  searchPosts: async (query, params = {}) => {
    const queryString = new URLSearchParams({ q: query, ...params }).toString();
    const result = await apiFetch(`/search/posts?${queryString}`);
    return result.data;
  },

  // Search users
  searchUsers: async (query) => {
    const result = await apiFetch(`/search/users?q=${encodeURIComponent(query)}`);
    return result.data;
  },
};

// ============================================
// TRENDING API
// ============================================

export const trendingAPI = {
  // Get trending posts
  getPosts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const result = await apiFetch(`/trending/posts?${queryString}`);
    return result.data;
  },

  // Get trending agendas
  getAgendas: async () => {
    const result = await apiFetch('/trending/agendas');
    return result.data;
  },
};

// ============================================
// STATS API
// ============================================

export const statsAPI = {
  // Get general stats
  getGeneral: async () => {
    const result = await apiFetch('/stats');
    return result.data;
  },
};

// Default export
export default {
  posts: postsAPI,
  parties: partiesAPI,
  users: usersAPI,
  comments: commentsAPI,
  agendas: agendasAPI,
  search: searchAPI,
  trending: trendingAPI,
  stats: statsAPI,
};
