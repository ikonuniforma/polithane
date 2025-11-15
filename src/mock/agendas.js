// Mock gündem verileri
import { slugify } from '../utils/formatters.js';

export const mockAgendas = [
  {
    agenda_id: 1,
    agenda_title: 'Kumpir yiyip ölen turistler',
    agenda_slug: slugify('Kumpir yiyip ölen turistler'),
    total_polit_score: 458000,
    post_count: 1250,
    is_trending: true,
    participant_count: 3400
  },
  {
    agenda_id: 2,
    agenda_title: '2026 Emekli Zam Oranı',
    agenda_slug: slugify('2026 Emekli Zam Oranı'),
    total_polit_score: 425000,
    post_count: 1150,
    is_trending: true,
    participant_count: 3200
  },
  {
    agenda_id: 3,
    agenda_title: 'Ekrem İmamoğlu iddanamesi',
    agenda_slug: slugify('Ekrem İmamoğlu iddanamesi'),
    total_polit_score: 378000,
    post_count: 980,
    is_trending: true,
    participant_count: 2800
  },
  {
    agenda_id: 4,
    agenda_title: 'Ak Parti - MHP resepsiyon tartışması',
    agenda_slug: slugify('Ak Parti - MHP resepsiyon tartışması'),
    total_polit_score: 325000,
    post_count: 890,
    is_trending: true,
    participant_count: 2100
  },
  {
    agenda_id: 5,
    agenda_title: 'Belediyelere yapılan operasyonlar',
    agenda_slug: slugify('Belediyelere yapılan operasyonlar'),
    total_polit_score: 278000,
    post_count: 750,
    is_trending: true,
    participant_count: 1900
  },
  {
    agenda_id: 6,
    agenda_title: 'Ekonomi paketi görüşmeleri',
    agenda_slug: slugify('Ekonomi paketi görüşmeleri'),
    total_polit_score: 195000,
    post_count: 520,
    is_trending: true,
    participant_count: 1450
  },
  {
    agenda_id: 7,
    agenda_title: 'Eğitim sistemi reformu',
    agenda_slug: slugify('Eğitim sistemi reformu'),
    total_polit_score: 168000,
    post_count: 480,
    is_trending: true,
    participant_count: 1200
  },
  {
    agenda_id: 8,
    agenda_title: 'Dış politika açıklamaları',
    agenda_slug: slugify('Dış politika açıklamaları'),
    total_polit_score: 142000,
    post_count: 380,
    is_trending: true,
    participant_count: 980
  },
  {
    agenda_id: 9,
    agenda_title: 'Sağlık sistemi iyileştirmeleri',
    agenda_slug: slugify('Sağlık sistemi iyileştirmeleri'),
    total_polit_score: 125000,
    post_count: 320,
    is_trending: true,
    participant_count: 850
  },
  {
    agenda_id: 10,
    agenda_title: 'Gençlik istihdam programları',
    agenda_slug: slugify('Gençlik istihdam programları'),
    total_polit_score: 98000,
    post_count: 280,
    is_trending: true,
    participant_count: 720
  }
];
