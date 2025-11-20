import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPartyFlagPath } from '../../utils/imagePaths';
import { PartyDetailPopup } from '../common/PartyDetailPopup';

export const ParliamentBar = ({ parliamentData = [], totalSeats = 600 }) => {
  const navigate = useNavigate();
  const [hoveredParty, setHoveredParty] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  
  if (!parliamentData || parliamentData.length === 0) return null;
  
  return (
    <div className="mb-4 hidden md:block">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">MECLİS DAĞILIMI</h3>
      <div className="flex h-24 overflow-hidden rounded-t-lg border border-gray-300 w-full">
        {parliamentData.map((party, index) => {
          // Genişlik yüzdesi = (sandalye sayısı / toplam sandalye) * 100
          const widthPercentage = (party.seats / totalSeats) * 100;
          
          // Parti bayrağı/logosu path'i
          const flagPath = getPartyFlagPath(party.shortName, index + 1);
          
          const partyData = {
            party_id: index + 1,
            party_name: party.name,
            party_short_name: party.shortName,
            party_logo: `/assets/parties/logos/${party.shortName.toLowerCase().replace(/\s+/g, '_')}.png`,
            party_color: party.color,
            seats: party.seats,
            mp_count: party.seats,
            metropolitan_count: Math.floor(Math.random() * 15) + 1, // Mock data
            district_count: Math.floor(Math.random() * 200) + 10, // Mock data
            agenda_contribution: Math.floor(Math.random() * 5000) + 100 // Mock data
          };
          
          return (
            <div
              key={`${party.shortName}-${index}`}
              className="h-full cursor-pointer transition-all hover:opacity-90 hover:brightness-110 relative"
              style={{
                width: `${widthPercentage}%`,
                backgroundColor: party.color,
                backgroundImage: `url(${flagPath})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minWidth: '20px', // Çok küçük partiler için minimum genişlik
                flexShrink: 0
              }}
              title={`${party.name} - ${party.seats} sandalye (${widthPercentage.toFixed(1)}%)`}
              onClick={() => navigate(`/party/${index + 1}`)}
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setPopupPosition({ x: rect.left, y: rect.bottom });
                setHoveredParty(partyData);
              }}
              onMouseLeave={() => {
                setHoveredParty(null);
              }}
            >
              {/* Parti kısa adı - sadece yeterince geniş alanlarda göster (yazı sığıyorsa) */}
              {widthPercentage > 5 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span 
                    className="text-white text-xs font-bold drop-shadow-lg px-1 text-center"
                    style={{
                      textShadow: '1px 1px 2px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.8)'
                    }}
                  >
                    {party.shortName}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Plaka Kodları - 1'den 81'e kadar */}
      <div className="flex flex-wrap gap-1 bg-gray-50 p-3 rounded-b-lg border border-t-0 border-gray-300">
        {Array.from({ length: 81 }, (_, i) => i + 1).map((code) => (
          <button
            key={code}
            onClick={() => navigate(`/city/${code.toString().padStart(2, '0')}`)}
            className="w-7 h-7 rounded-full bg-gray-900 hover:bg-primary-blue text-white text-xs font-bold flex items-center justify-center transition-colors shadow-sm hover:shadow-md"
            title={`${code} plaka kodlu il`}
          >
            {code}
          </button>
        ))}
      </div>
      
      {/* Parti Detay Popup */}
      {hoveredParty && (
        <PartyDetailPopup 
          party={hoveredParty}
          position={popupPosition}
          onClose={() => setHoveredParty(null)}
        />
      )}
    </div>
  );
};
