# Zustand Store Dokümantasyonu

Bu dokümantasyon, POLITHANE projesine eklenen Zustand state management sistemini açıklar.

## 📦 Eklenen Store'lar

### 1. Auth Store (`src/store/authStore.js`)

Kullanıcı kimlik doğrulama ve oturum yönetimi için kullanılır.

#### Özellikler:
- ✅ Login/Logout işlemleri
- ✅ Kayıt işlemleri
- ✅ Kullanıcı bilgilerini güncelleme
- ✅ Token yönetimi
- ✅ LocalStorage'a otomatik kayıt (persist)
- ✅ Hata yönetimi

#### Kullanım:

```javascript
import { useAuthStore } from '../store/authStore';

function MyComponent() {
  const { 
    isAuthenticated, 
    user, 
    login, 
    logout, 
    loading, 
    error 
  } = useAuthStore();
  
  const handleLogin = async () => {
    const result = await login(email, password);
    if (result.success) {
      // Başarılı giriş
    }
  };
}
```

#### State:
- `isAuthenticated`: boolean - Kullanıcı giriş yapmış mı?
- `user`: object - Kullanıcı bilgileri
- `token`: string - Auth token
- `loading`: boolean - İşlem devam ediyor mu?
- `error`: string - Hata mesajı

#### Actions:
- `login(email, password)`: Giriş yap
- `register(userData)`: Kayıt ol
- `logout()`: Çıkış yap
- `updateUser(userData)`: Kullanıcı bilgilerini güncelle
- `clearError()`: Hata mesajını temizle

---

### 2. UI Store (`src/store/uiStore.js`)

Modal, bildirim ve UI durumlarını yönetir.

#### Özellikler:
- ✅ Modal yönetimi (açma/kapama)
- ✅ Loading state'leri
- ✅ Bildirim yönetimi
- ✅ Sidebar durumu
- ✅ Tema yönetimi (gelecekte dark mode için)

#### Kullanım:

```javascript
import { useUIStore } from '../store/uiStore';

function MyComponent() {
  const { 
    modals, 
    openModal, 
    closeModal,
    addNotification,
    unreadNotificationCount 
  } = useUIStore();
  
  const handleOpenModal = () => {
    openModal('postCreate');
  };
  
  const handleAddNotification = () => {
    addNotification({
      type: 'like',
      message: 'Postunuz beğenildi',
      userId: 123
    });
  };
}
```

#### State:
- `modals`: object - Açık modal'lar
- `loading`: object - Loading durumları
- `notifications`: array - Bildirimler
- `unreadNotificationCount`: number - Okunmamış bildirim sayısı
- `sidebarOpen`: boolean - Sidebar açık mı?
- `theme`: string - Tema ('light' veya 'dark')

#### Actions:
- `openModal(modalName)`: Modal aç
- `closeModal(modalName)`: Modal kapat
- `closeAllModals()`: Tüm modal'ları kapat
- `setLoading(key, value)`: Loading durumunu ayarla
- `addNotification(notification)`: Bildirim ekle
- `markNotificationAsRead(id)`: Bildirimi okundu işaretle
- `toggleSidebar()`: Sidebar'ı aç/kapat

---

### 3. Posts Store (`src/store/postsStore.js`)

Post'ları ve etkileşimleri yönetir.

#### Özellikler:
- ✅ Post listesi yönetimi
- ✅ Beğeni/beğenmeme işlemleri
- ✅ Kaydetme/kaydetmeme işlemleri
- ✅ Post filtreleme ve sıralama
- ✅ Post oluşturma/silme
- ✅ Kategori bazlı filtreleme

#### Kullanım:

```javascript
import { usePostsStore } from '../store/postsStore';

function MyComponent() {
  const { 
    posts, 
    loadPosts, 
    toggleLike, 
    isLiked,
    getFilteredPosts,
    setFilter 
  } = usePostsStore();
  
  useEffect(() => {
    loadPosts(400);
  }, []);
  
  const handleLike = (postId) => {
    toggleLike(postId);
  };
  
  const filteredPosts = getFilteredPosts();
}
```

#### State:
- `posts`: array - Tüm post'lar
- `currentPost`: object - Şu anki post (detay sayfası için)
- `likedPosts`: Set - Beğenilen post ID'leri
- `savedPosts`: Set - Kaydedilen post ID'leri
- `filters`: object - Filtre ayarları
- `loading`: boolean - Yükleniyor mu?
- `error`: string - Hata mesajı

#### Actions:
- `loadPosts(count)`: Post'ları yükle
- `getPostById(postId)`: ID'ye göre post bul
- `toggleLike(postId)`: Beğeni durumunu değiştir
- `isLiked(postId)`: Post beğenilmiş mi?
- `toggleSave(postId)`: Kaydetme durumunu değiştir
- `isSaved(postId)`: Post kaydedilmiş mi?
- `setFilter(key, value)`: Filtre ayarla
- `getFilteredPosts()`: Filtrelenmiş post'ları getir
- `createPost(postData)`: Yeni post oluştur
- `deletePost(postId)`: Post sil

#### Filtreler:
- `category`: 'all' | 'mps' | 'organization' | 'citizens' | 'experience' | 'media'
- `agenda`: string | null
- `party`: number | null
- `sortBy`: 'polit_score' | 'date' | 'likes' | 'comments'

---

## 🔄 Güncellenen Bileşenler

### Header Component
- ✅ Auth store entegrasyonu
- ✅ UI store entegrasyonu (bildirim sayısı)
- ✅ Kullanıcı bilgilerini store'dan alıyor

### LoginPage
- ✅ Auth store kullanıyor
- ✅ Hata yönetimi iyileştirildi
- ✅ Loading state'i store'dan geliyor

### RegisterPage
- ✅ Auth store entegrasyonu
- ✅ Kayıt işlemi store üzerinden yapılıyor

### HomePage
- ✅ Posts store entegrasyonu
- ✅ Post'lar store'dan yükleniyor

---

## 📝 Kullanım Örnekleri

### Örnek 1: Login İşlemi

```javascript
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-hot-toast';

function LoginForm() {
  const { login, loading, error } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    
    if (result.success) {
      toast.success('Giriş başarılı!');
    } else {
      toast.error(result.error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? 'Yükleniyor...' : 'Giriş Yap'}
      </button>
    </form>
  );
}
```

### Örnek 2: Post Beğenme

```javascript
import { usePostsStore } from '../store/postsStore';
import { Heart } from 'lucide-react';

function PostCard({ post }) {
  const { toggleLike, isLiked } = usePostsStore();
  const liked = isLiked(post.post_id);
  
  return (
    <div>
      <button onClick={() => toggleLike(post.post_id)}>
        <Heart className={liked ? 'text-red-500 fill-red-500' : ''} />
        {post.like_count}
      </button>
    </div>
  );
}
```

### Örnek 3: Modal Yönetimi

```javascript
import { useUIStore } from '../store/uiStore';
import { Modal } from '../components/common/Modal';

function MyComponent() {
  const { modals, openModal, closeModal } = useUIStore();
  
  return (
    <>
      <button onClick={() => openModal('postCreate')}>
        Yeni Post Oluştur
      </button>
      
      <Modal
        isOpen={modals.postCreate}
        onClose={() => closeModal('postCreate')}
      >
        {/* Modal içeriği */}
      </Modal>
    </>
  );
}
```

### Örnek 4: Bildirim Ekleme

```javascript
import { useUIStore } from '../store/uiStore';

function PostActions({ post }) {
  const { addNotification } = useUIStore();
  
  const handleLike = () => {
    // Like işlemi
    addNotification({
      type: 'like',
      message: `${post.user.full_name} postunuzu beğendi`,
      postId: post.post_id,
      userId: post.user.user_id
    });
  };
  
  return <button onClick={handleLike}>Beğen</button>;
}
```

---

## 🚀 Gelecek Geliştirmeler

### Planlanan Store'lar:
1. **Messages Store** - Mesajlaşma yönetimi
2. **Users Store** - Kullanıcı listesi ve takip işlemleri
3. **Parties Store** - Parti bilgileri ve yönetimi
4. **Agendas Store** - Gündem yönetimi

### İyileştirmeler:
- [ ] API entegrasyonu (şu an mock data kullanılıyor)
- [ ] Real-time bildirimler (WebSocket)
- [ ] Optimistic updates
- [ ] Cache yönetimi
- [ ] Error boundary entegrasyonu

---

## 📚 Referanslar

- [Zustand Dokümantasyonu](https://docs.pmnd.rs/zustand)
- [Zustand Middleware](https://docs.pmnd.rs/zustand/integrations/persisting-store-data)

---

## ✅ Test Edilmiş Özellikler

- ✅ Build başarılı
- ✅ Store'lar çalışıyor
- ✅ Bileşenler güncellendi
- ✅ Type safety (gelecekte TypeScript eklenebilir)

---

**Son Güncelleme:** 2025-01-15
**Versiyon:** 1.0.0
