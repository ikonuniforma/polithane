import { useNavigate } from 'react-router-dom';
import { Tooltip } from '../common/Tooltip';
import { getPartyFlagPath } from '../../utils/imagePaths';

export const ParliamentBar = ({ parties = [], totalSeats = 600 }) => {
  const navigate = useNavigate();
  
  if (!parties || parties.length === 0) return null;
  
  // Sadece mecliste sandalyesi olan partileri filtrele ve sırala
  const partiesWithSeats = parties
    .filter(party => party.parliament_seats > 0)
    .sort((a, b) => b.parliament_seats - a.parliament_seats);
  
  return (
    <div className="mb-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">MECLİS DAĞILIMI</h3>
      <div className="flex h-24 rounded-lg overflow-hidden border border-gray-300">
        {partiesWithSeats.map((party) => {
          const widthPercentage = (party.parliament_seats / totalSeats) * 100;
          const flagPath = party.party_flag || getPartyFlagPath(party.party_short_name, party.party_id);
          
          return (
            <Tooltip
              key={party.party_id}
              content={`${party.party_name} - ${party.parliament_seats} sandalye`}
              position="top"
            >
              <div
                className="h-full cursor-pointer transition-all hover:opacity-90 flex items-center justify-center relative overflow-hidden"
                style={{
                  width: `${widthPercentage}%`,
                  backgroundColor: party.party_color || '#gray'
                }}
                onClick={() => navigate(`/party/${party.party_id}`)}
              >
                {/* Parti Bayrağı - Arka plan olarak */}
                <div 
                  className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${flagPath})`,
                    backgroundSize: 'cover'
                  }}
                />
                
                {/* Parti Kısa Adı - Ön planda */}
                {widthPercentage > 3 && (
                  <span className="text-white text-xs font-bold px-1 truncate relative z-10 drop-shadow-lg">
                    {party.party_short_name}
                  </span>
                )}
              </div>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};
