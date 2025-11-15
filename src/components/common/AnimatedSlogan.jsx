import { useState, useEffect } from 'react';

export const AnimatedSlogan = () => {
  const fullSlogan = 'Özgür, açık, şeffaf siyaset, bağımsız medya.';
  // Virgül ve noktayı koruyarak kelimelere ayır
  const words = fullSlogan.split(/(\s+)/).filter(w => w.trim().length > 0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFull, setShowFull] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (showFull) {
      // Tüm cümleyi göster
      setDisplayText(fullSlogan);
      setIsVisible(true);
      
      // 3 saniye sonra tekrar kelime kelime başla
      const fullTimer = setTimeout(() => {
        setShowFull(false);
        setCurrentIndex(0);
        setIsVisible(false);
        setDisplayText('');
        
        // Kısa bir bekleme sonrası ilk kelimeyi göster
        setTimeout(() => {
          setDisplayText(words[0]);
          setIsVisible(true);
        }, 200);
      }, 3000);
      
      return () => clearTimeout(fullTimer);
    } else {
      // Kelime kelime animasyon
      if (currentIndex < words.length) {
        const wordTimer = setTimeout(() => {
          // Mevcut kelimeyi göster
          setDisplayText(words[currentIndex]);
          setIsVisible(true);
          
          // Kelimeyi 1.2 saniye göster, sonra fade out
          setTimeout(() => {
            setIsVisible(false);
            
            // Fade out sonrası yeni kelimeye geç
            setTimeout(() => {
              if (currentIndex < words.length - 1) {
                setCurrentIndex(currentIndex + 1);
              } else {
                // Son kelime gösterildi, tüm cümleyi göster
                setShowFull(true);
              }
            }, 300); // Fade out süresi
          }, 1200); // Her kelime 1.2 saniye gözüksün
        }, currentIndex === 0 ? 0 : 300); // İlk kelime için bekleme yok
        
        return () => clearTimeout(wordTimer);
      }
    }
  }, [currentIndex, showFull, words, fullSlogan]);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-primary-blue font-bold text-xl whitespace-nowrap">Polithane</span>
      <span className="text-gray-600 text-sm md:text-base min-h-[1.25rem] flex items-center">
        <span
          className={`transition-opacity duration-300 inline-block ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ minWidth: showFull ? 'auto' : '100px' }}
        >
          {displayText || '\u00A0'}
        </span>
      </span>
    </div>
  );
};
