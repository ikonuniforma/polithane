// Demo için özel filtreler - Canlıda kullanılmayacak

/**
 * Demo modu: Her satırda en fazla 1 metin veya ses içerik olsun
 * Çünkü bunlar yanyana çok gelince kötü görünüyor
 * 
 * @param {Array} posts - Post listesi
 * @param {boolean} isDemoMode - Demo modu aktif mi? (default: true)
 * @returns {Array} Filtrelenmiş post listesi
 */
export const filterConsecutiveTextAudio = (posts, isDemoMode = true) => {
  if (!isDemoMode) return posts; // Canlıda filtreleme yok
  
  const filtered = [];
  let lastWasTextOrAudio = false;
  
  for (const post of posts) {
    const isTextOrAudio = post.content_type === 'text' || post.content_type === 'audio';
    
    if (isTextOrAudio && lastWasTextOrAudio) {
      // Ardışık metin/ses - atla
      continue;
    }
    
    filtered.push(post);
    lastWasTextOrAudio = isTextOrAudio;
  }
  
  return filtered;
};

/**
 * Grid için özel filtre - 2'li gridde her satırda max 1 metin/ses
 * 
 * @param {Array} posts - Post listesi  
 * @param {number} columns - Grid sütun sayısı (default: 2)
 * @param {boolean} isDemoMode - Demo modu aktif mi?
 * @returns {Array} Filtrelenmiş post listesi
 */
export const filterGridTextAudio = (posts, columns = 2, isDemoMode = true) => {
  if (!isDemoMode) return posts;
  
  const filtered = [];
  
  for (let i = 0; i < posts.length; i += columns) {
    const row = posts.slice(i, i + columns);
    
    // Bu satırdaki metin/ses sayısını kontrol et
    const textAudioInRow = row.filter(p => 
      p.content_type === 'text' || p.content_type === 'audio'
    );
    
    if (textAudioInRow.length <= 1) {
      // Max 1 metin/ses var, tüm satırı ekle
      filtered.push(...row);
    } else {
      // 2+ metin/ses var, sadece ilk metin/ses'i tut, diğerlerini görsel içeriklerle değiştir
      let textAudioAdded = false;
      
      for (const post of row) {
        const isTextOrAudio = post.content_type === 'text' || post.content_type === 'audio';
        
        if (isTextOrAudio && !textAudioAdded) {
          filtered.push(post);
          textAudioAdded = true;
        } else if (!isTextOrAudio) {
          filtered.push(post);
        }
        // İkinci ve sonraki metin/ses'leri atla
      }
    }
  }
  
  return filtered;
};
