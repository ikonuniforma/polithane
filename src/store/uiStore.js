import { create } from 'zustand';

/**
 * UI Store
 * Modal, notification, loading gibi UI durumlarını yönetir
 */
export const useUIStore = create((set, get) => ({
  // Modals
  modals: {
    login: false,
    register: false,
    postCreate: false,
    postDelete: false,
    profileEdit: false,
    settings: false,
    politScoreDetail: false
  },

  // Loading states
  loading: {
    global: false,
    posts: false,
    comments: false,
    users: false
  },

  // Notification state
  notifications: [],
  unreadNotificationCount: 0,

  // Sidebar state
  sidebarOpen: false,

  // Theme (gelecekte dark mode için)
  theme: 'light',

  // Actions - Modals
  openModal: (modalName) => {
    set((state) => ({
      modals: {
        ...state.modals,
        [modalName]: true
      }
    }));
  },

  closeModal: (modalName) => {
    set((state) => ({
      modals: {
        ...state.modals,
        [modalName]: false
      }
    }));
  },

  closeAllModals: () => {
    set({
      modals: {
        login: false,
        register: false,
        postCreate: false,
        postDelete: false,
        profileEdit: false,
        settings: false,
        politScoreDetail: false
      }
    });
  },

  // Actions - Loading
  setLoading: (key, value) => {
    set((state) => ({
      loading: {
        ...state.loading,
        [key]: value
      }
    }));
  },

  setGlobalLoading: (value) => {
    set((state) => ({
      loading: {
        ...state.loading,
        global: value
      }
    }));
  },

  // Actions - Notifications
  addNotification: (notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification,
      read: false,
      createdAt: new Date()
    };
    
    set((state) => ({
      notifications: [newNotification, ...state.notifications].slice(0, 50), // Son 50 bildirim
      unreadNotificationCount: state.unreadNotificationCount + 1
    }));
  },

  markNotificationAsRead: (notificationId) => {
    set((state) => {
      const updatedNotifications = state.notifications.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      );
      const unreadCount = updatedNotifications.filter(n => !n.read).length;
      
      return {
        notifications: updatedNotifications,
        unreadNotificationCount: unreadCount
      };
    });
  },

  markAllNotificationsAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map(n => ({ ...n, read: true })),
      unreadNotificationCount: 0
    }));
  },

  removeNotification: (notificationId) => {
    set((state) => {
      const notification = state.notifications.find(n => n.id === notificationId);
      const unreadCount = notification && !notification.read
        ? state.unreadNotificationCount - 1
        : state.unreadNotificationCount;
      
      return {
        notifications: state.notifications.filter(n => n.id !== notificationId),
        unreadNotificationCount: Math.max(0, unreadCount)
      };
    });
  },

  // Actions - Sidebar
  toggleSidebar: () => {
    set((state) => ({
      sidebarOpen: !state.sidebarOpen
    }));
  },

  setSidebarOpen: (open) => {
    set({ sidebarOpen: open });
  },

  // Actions - Theme
  setTheme: (theme) => {
    set({ theme });
    // Gelecekte localStorage'a kaydedilebilir
  },

  toggleTheme: () => {
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light'
    }));
  }
}));
