import { useNavigate } from 'react-router-dom';
import { formatPolitScore } from '../../utils/formatters';

export const AgendaBar = ({ agendas = [] }) => {
  const navigate = useNavigate();
  
  if (!agendas || agendas.length === 0) return null;
  
  // İlk 20 gündem - 2 satıra böl (her satırda 10)
  const trendingAgendas = agendas.slice(0, 20);
  const firstRow = trendingAgendas.slice(0, 10);
  const secondRow = trendingAgendas.slice(10, 20);
  
  const AgendaButton = ({ agenda }) => (
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
  );
  
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-700">GÜNDEM</h3>
      </div>
      <div className="space-y-2">
        {/* İlk Satır */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {firstRow.map((agenda) => (
            <AgendaButton key={agenda.agenda_id} agenda={agenda} />
          ))}
        </div>
        
        {/* İkinci Satır */}
        {secondRow.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {secondRow.map((agenda) => (
              <AgendaButton key={agenda.agenda_id} agenda={agenda} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
