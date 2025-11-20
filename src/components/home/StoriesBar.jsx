import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const StoriesBar = ({ stories = [] }) => {
  const navigate = useNavigate();
  const [hoveredStory, setHoveredStory] = useState(null);
  
  // Mock stories data - gerçek data gelene kadar
  const mockStories = stories.length > 0 ? stories : [
    { user_id: 1, full_name: 'Kemal Kılıçdaroğlu', profile_image: 'https://i.pravatar.cc/150?img=1', story_count: 3 },
    { user_id: 2, full_name: 'Devlet Bahçeli', profile_image: 'https://i.pravatar.cc/150?img=2', story_count: 1 },
    { user_id: 3, full_name: 'Meral Akşener', profile_image: 'https://i.pravatar.cc/150?img=3', story_count: 2 },
    { user_id: 4, full_name: 'Ahmet Davutoğlu', profile_image: 'https://i.pravatar.cc/150?img=4', story_count: 4 },
    { user_id: 5, full_name: 'Ekrem İmamoğlu', profile_image: 'https://i.pravatar.cc/150?img=5', story_count: 2 },
    { user_id: 6, full_name: 'Mansur Yavaş', profile_image: 'https://i.pravatar.cc/150?img=6', story_count: 1 },
    { user_id: 7, full_name: 'Tunç Soyer', profile_image: 'https://i.pravatar.cc/150?img=7', story_count: 3 },
    { user_id: 8, full_name: 'Fatih Erbakan', profile_image: 'https://i.pravatar.cc/150?img=8', story_count: 2 },
  ];
  
  // Story border'ı - story sayısına göre segmentlere böl
  const getStoryBorder = (storyCount) => {
    if (storyCount === 1) {
      return 'border-2 border-primary-blue';
    }
    
    // Çoklu story için gradient border
    const segments = Math.min(storyCount, 8); // Max 8 segment
    const colors = Array(segments).fill('#009fd6').join(', ');
    
    return `border-[3px] border-transparent bg-gradient-to-r from-primary-blue via-blue-400 to-primary-blue bg-clip-padding`;
  };
  
  return (
    <div className="mb-4 overflow-hidden">
      {/* Desktop & Mobile */}
      <div className="flex items-center gap-3 px-2 py-3 overflow-x-auto scrollbar-hide">
        {/* Tümü Butonu */}
        <button
          onClick={() => navigate('/stories')}
          className="flex-shrink-0 flex flex-col items-center gap-1.5 group"
        >
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center hover:from-gray-300 hover:to-gray-400 transition-all shadow-md">
              <Plus className="w-8 h-8 text-gray-600 group-hover:text-gray-700" />
            </div>
          </div>
          <span className="text-[10px] font-medium text-gray-700 max-w-[64px] truncate">
            Tümü
          </span>
        </button>
        
        {/* Story Items */}
        {mockStories.map((story) => (
          <button
            key={story.user_id}
            onClick={() => navigate(`/stories/${story.user_id}`)}
            onMouseEnter={() => setHoveredStory(story.user_id)}
            onMouseLeave={() => setHoveredStory(null)}
            className="flex-shrink-0 flex flex-col items-center gap-1.5 group"
          >
            <div className="relative">
              {/* Gradient border container */}
              <div className={`w-16 h-16 rounded-full p-[2px] ${
                story.story_count > 1 
                  ? 'bg-gradient-to-tr from-primary-blue via-blue-400 to-primary-blue' 
                  : 'bg-primary-blue'
              }`}>
                {/* Inner circle - profile image */}
                <div className="w-full h-full rounded-full bg-white p-[2px]">
                  <img 
                    src={story.profile_image} 
                    alt={story.full_name}
                    className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              </div>
              
              {/* Story count badge */}
              {story.story_count > 1 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary-blue text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {story.story_count}
                </div>
              )}
              
              {/* Hover effect */}
              {hoveredStory === story.user_id && (
                <div className="absolute inset-0 rounded-full bg-primary-blue bg-opacity-10 animate-pulse"></div>
              )}
            </div>
            
            {/* Name */}
            <span className="text-[10px] font-medium text-gray-700 max-w-[64px] truncate">
              {story.full_name.split(' ')[0]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
