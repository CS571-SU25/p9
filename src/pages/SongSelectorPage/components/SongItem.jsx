import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

import { useStorage } from '../contexts/StorageContext';

const SongItem = React.memo(({ song, index, isCurrentSong, isPlaying, isLoading, onPlay, onTogglePlayPause }) => {

  const [favorites, setFavorites] = useStorage("favorites", []);

  const toggleFav = (e) => {
    e.stopPropagation();
    if (favorites.includes(song.id)) {
      setFavorites(favorites.filter(id => id !== song.id));
    } else {
      setFavorites([...favorites, song.id]);
    }
  };

  return <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    viewport={{ once: true }}
    className={`group flex items-center space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-all duration-300 cursor-pointer ${isCurrentSong ? 'bg-primary/10 border border-primary/30' : ''}`}
    onClick={() => (isCurrentSong) ? onTogglePlayPause() : onPlay(song)}
  >
    <div className="relative flex-shrink-0">
      <img 
        src={song.cover} 
        alt={song.album}
        className="w-12 h-12 rounded-lg object-cover"
      />
      <div className={`absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center transition-opacity duration-300 ${
        isCurrentSong && isLoading 
          ? 'opacity-100' 
          : isCurrentSong && isPlaying 
            ? 'opacity-100' 
            : 'opacity-0 group-hover:opacity-100'
      }`}>
        {isCurrentSong && isLoading ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <Icon 
            name={isCurrentSong && isPlaying ? 'Pause' : 'Play'} 
            size={16} 
            className="text-white" 
          />
        )}
      </div>
    </div>
    
    <div className="flex-1 min-w-0">
      <h3 className={`font-cta font-medium truncate ${isCurrentSong ? 'text-primary' : 'text-foreground'}`}>
        {song.title}
      </h3>
      <p className="text-muted-foreground text-sm truncate">{song.artist}</p>
    </div>
    
    <div className="hidden md:block text-muted-foreground text-sm">
      {song.album}
    </div>
    
    <div className="text-muted-foreground text-sm">
      {song.duration}
    </div>
    
    <button onClick={toggleFav} className={`${!favorites.includes(song.id) && "opacity-0"} group-hover:opacity-100 transition-opacity duration-300 p-2 hover:bg-muted rounded-lg`}>
      <Icon name="Heart" size={16} color={favorites.includes(song.id) ? "red" : undefined} className="text-muted-foreground" />
    </button>
  </motion.div>
});

export default SongItem;