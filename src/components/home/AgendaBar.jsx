import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatNumber, formatPolitScore } from '../../utils/formatters';

export const AgendaBar = ({ agendas = [] }) => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  if (!agendas || agendas.length === 0) return null;
  
  const trendingAgendas = agendas.slice(0, 10);
  
  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    checkScroll();
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        scrollElement.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [trendingAgendas]);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };
  
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-700">GÜNDEM</h3>
      </div>
      <div className="relative">
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1.5 shadow-lg hover:bg-gray-100 transition-colors"
            aria-label="Sol"
          >
            <ChevronLeft className="w-4 h-4 text-gray-700" />
          </button>
        )}
        
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide scroll-smooth px-8"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {trendingAgendas.map((agenda) => (
            <button
              key={agenda.agenda_id}
              onClick={() => navigate(`/agenda/${agenda.agenda_slug}`)}
              className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 hover:border-primary-blue hover:bg-primary-blue hover:text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex-shrink-0"
            >
              <span className="text-sm font-medium whitespace-nowrap text-left">
                {agenda.agenda_title}
              </span>
              <span className="text-xs bg-gray-100 hover:bg-white hover:text-primary-blue px-2 py-0.5 rounded-full font-semibold transition-colors flex-shrink-0">
                {formatPolitScore(agenda.total_polit_score)}
              </span>
            </button>
          ))}
        </div>

        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1.5 shadow-lg hover:bg-gray-100 transition-colors"
            aria-label="Sağ"
          >
            <ChevronRight className="w-4 h-4 text-gray-700" />
          </button>
        )}
      </div>
    </div>
  );
};
