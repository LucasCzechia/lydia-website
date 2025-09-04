import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Music } from 'lucide-react';
import useSWR from 'swr';

// Data fetcher for Lanyard status
const fetcher = (url) => fetch(url).then((res) => res.json());

// Discord status component
const LanyardPresence = ({ discordUserId }) => {
  const { data, error } = useSWR(
    discordUserId ? `https://api.lanyard.rest/v1/users/${discordUserId}` : null,
    fetcher,
    { refreshInterval: 10000 }
  );
  
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted || !discordUserId) return null;

  const isLoading = !data && !error;
  
  if (isLoading) {
    return (
      <div className="mt-1 flex items-center space-x-1.5">
        <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></span>
        <span className="text-xs text-gray-500">Loading status...</span>
      </div>
    );
  }

  if (error || !data || !data.success) {
    return (
      <div className="mt-1 flex items-center space-x-1.5">
        <span className="w-2 h-2 rounded-full bg-gray-400"></span>
        <span className="text-xs text-gray-500">Status unavailable</span>
      </div>
    );
  }

  const { discord_status, activities, spotify } = data.data;

  // Status color mapping
  const statusColorMap = {
    online: 'bg-green-500',
    idle: 'bg-yellow-500',
    dnd: 'bg-red-500',
    offline: 'bg-gray-400',
  };
  const statusColor = statusColorMap[discord_status] || 'bg-gray-400';

  // Get custom status if set
  const customStatus = activities.find(a => a.type === 4);
  let statusText = discord_status.charAt(0).toUpperCase() + discord_status.slice(1);
  
  if (customStatus?.state) {
    statusText = customStatus.state;
  }

  return (
    <div className="mt-1">
      {/* Basic status display */}
      <div className="flex items-center space-x-1.5">
        <span className={`w-2 h-2 rounded-full ${statusColor}`}></span>
        <span className="text-xs text-gray-500 truncate max-w-[150px]">{statusText}</span>
      </div>

      {/* Spotify status */}
      {spotify && (
        <div className="mt-1 flex items-center space-x-2 p-1.5 rounded bg-gray-100 dark:bg-gray-800/30">
          <div className="flex-shrink-0">
            <Image
              src={spotify.album_art_url}
              alt={`Album art for ${spotify.album}`}
              width={24}
              height={24}
              className="rounded"
              unoptimized
            />
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center text-xs text-green-600 dark:text-green-400">
              <Music className="w-3 h-3 mr-1 text-green-600 dark:text-green-400" />
              Spotify
            </div>
            <p className="text-xs font-medium text-gray-800 dark:text-gray-200 truncate">
              {spotify.song}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanyardPresence;
