import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';

import SongItem from './components/SongItem.jsx';
import ProgressBar from './components/ProgressBar';
import VolumeControl from './components/VolumeControl';

import { useSongContext } from './contexts/SongContext';
import { useStorage } from './contexts/StorageContext';
import Constants from './constants/Constants';


const SongSelectorPage = () => {

  // Favorites Bar
  const [favorites, setFavorites] = useStorage("favorites", []);

  // Import Song Context
  const {
      currentSong, setCurrentSong,
      isPlaying, setIsPlaying,
      currentTime, setCurrentTime,
      duration, setDuration,
      volume, setVolume,
      activePlaylist, setActivePlaylist,
      searchQuery, setSearchQuery,
      isShuffled, setIsShuffled,
      repeatMode, setRepeatMode,
      isLoading, setIsLoading,
      error, setError,
      audioRef
  } = useSongContext();
    

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = 'Music - Your Name | Song Selector';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover my curated music collection - from ambient electronic to indie rock, explore the sounds that inspire my creativity.');
    }
  }, []);

  // Playlists, Songs
  const playlists = Constants.playlists;
  const songs = Constants.songs;

  // Memoize filtered songs to prevent unnecessary recalculations
  const filteredSongs = useMemo(() => {
    return songs.filter(song => {
      const matchesPlaylist = activePlaylist === 'all' || (activePlaylist === 'favorites' && favorites.includes(song.id)) ||song.playlist.includes(activePlaylist);
      const matchesSearch = searchQuery === '' || 
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.album.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesPlaylist && matchesSearch;
    });
  }, [activePlaylist, searchQuery, favorites]);

  // Memoize shuffled songs to prevent re-shuffling on every render
  const shuffledSongs = useMemo(() => {
    if (!isShuffled) return filteredSongs;
    
    // Create a stable shuffle by using the current song as seed if it exists
    const songsToShuffle = [...filteredSongs];
    return songsToShuffle.sort(() => Math.random() - 0.5);
  }, [filteredSongs, isShuffled]);

  const playSong = useCallback(async (song) => {
    try {
      setError(null);
      setIsLoading(true);
      
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = song.audioUrl;
        
        // Wait for audio to be ready
        await new Promise((resolve, reject) => {
          audioRef.current.oncanplay = resolve;
          audioRef.current.onerror = reject;
          audioRef.current.load();
        });
        
        setCurrentSong(song);
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing song:', error);
      setError('Failed to play song');
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const nextSong = useCallback(() => {
    const currentIndex = shuffledSongs.findIndex(song => song.id === currentSong?.id);
    const nextIndex = (currentIndex + 1) % shuffledSongs.length;
    if (shuffledSongs[nextIndex]) {
      playSong(shuffledSongs[nextIndex]);
    }
  }, [shuffledSongs, currentSong, playSong]);

  const previousSong = useCallback(() => {
    const currentIndex = shuffledSongs.findIndex(song => song.id === currentSong?.id);
    const prevIndex = currentIndex === 0 ? shuffledSongs.length - 1 : currentIndex - 1;
    if (shuffledSongs[prevIndex]) {
      playSong(shuffledSongs[prevIndex]);
    }
  }, [shuffledSongs, currentSong, playSong]);

  // Audio event listeners with proper dependencies
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleError = () => {
      setError('Failed to load audio');
      setIsLoading(false);
      setIsPlaying(false);
    };
    const handleEnded = () => {
      if (repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play();
      } else if (repeatMode === 'all' || repeatMode === 'none') {
        nextSong();
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [repeatMode, nextSong]); // Now includes nextSong in dependencies

  // Update volume when volume state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = useCallback(async () => {
    if (!audioRef.current || !currentSong) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error toggling playback:', error);
      setError('Playback error');
    }
  }, [isPlaying, currentSong]);

  const seekTo = useCallback((percentage) => {
    if (audioRef.current && duration) {
      const newTime = (percentage / 100) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  }, [duration]);

  const handleVolumeChange = useCallback((newVolume) => {
    setVolume(newVolume);
  }, []);

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Hidden Audio Element */}
      <audio ref={audioRef} preload="metadata" />
      
      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg"
        >
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} />
            <span>{error}</span>
            <button onClick={() => setError(null)} className="ml-2">
              <Icon name="X" size={16} />
            </button>
          </div>
        </motion.div>
      )}
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20"></div>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-3xl animate-float"></div>
            <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-secondary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-1/4 left-1/2 w-56 h-56 bg-accent/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-headline font-bold text-foreground mb-6 tracking-tight">
              My <span className="bg-mystical-gradient bg-clip-text text-transparent">Music</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-body mb-8 max-w-3xl mx-auto">
              Discover the sounds that fuel my creativity and accompany my coding sessions. 
              From ambient electronic to indie classics.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Music Player Interface */}
      <section className="pb-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar - Playlists */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6"
              >
                <h2 className="text-xl font-headline font-bold text-foreground mb-6">Playlists</h2>
                <div className="space-y-2">
                  {playlists.map(playlist => {
                    
                    // Calculate Size
                    
                    let count = 0;
                    switch (playlist.id) {
                      case 'all':
                        count = Constants.songs.length;
                        break;
                      case 'favorites':
                        count = Constants.getFavorites(favorites).length;
                        break;
                      default:
                        count = Constants.getPlaylist(playlist.id).length;
                    }

                    return <button
                      key={playlist.id}
                      onClick={() => setActivePlaylist(playlist.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                        activePlaylist === playlist.id 
                          ? 'bg-primary text-primary-foreground shadow-mystical' 
                          : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name={playlist.icon} size={18} />
                        <span className="font-cta font-medium">{playlist.name}</span>
                      </div>
                      <span className="text-sm">{count}</span>
                    </button>
                  })}
                </div>

                {/* Search */}
                <div className="mt-8">
                  <div className="relative">
                    <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search music..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Main Content - Song List */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-headline font-bold text-foreground">
                    {playlists.find(p => p.id === activePlaylist)?.name} 
                    <span className="text-muted-foreground text-base ml-2">
                      ({filteredSongs.length} tracks)
                    </span>
                  </h2>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsShuffled(!isShuffled)}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        isShuffled ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'
                      }`}
                    >
                      <Icon name="Shuffle" size={18} />
                    </button>
                    <button
                      onClick={() => {
                        const modes = ['none', 'one', 'all'];
                        const currentIndex = modes.indexOf(repeatMode);
                        setRepeatMode(modes[(currentIndex + 1) % modes.length]);
                      }}
                      className={`p-2 rounded-lg transition-all duration-300 relative ${
                        repeatMode !== 'none' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'
                      }`}
                    >
                      <Icon name={repeatMode === 'one' ? 'Repeat1' : 'Repeat'} size={18} />
                      {repeatMode !== 'none' && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </button>
                  </div>
                </div>

                {/* Song List Header */}
                <div className="hidden md:flex items-center space-x-4 p-4 border-b border-border text-muted-foreground text-sm font-cta font-medium">
                  <div className="w-16"></div>
                  <div className="flex-1">Title</div>
                  <div className="w-16">Album</div>
                  <div className="w-16">Time</div>
                  <div className="w-8"></div>
                </div>

                {/* Songs */}
                <div className="space-y-1">
                  {filteredSongs.length > 0 ? (
                    filteredSongs.map((song, index) => (
                      <SongItem 
                        key={song.id} 
                        song={song} 
                        index={index}
                        isCurrentSong={currentSong?.id === song.id}
                        isPlaying={isPlaying}
                        isLoading={isLoading}
                        onPlay={playSong}
                        onTogglePlayPause={togglePlayPause}  // Add this line
                      />
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <Icon name="Music" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-headline font-bold text-foreground mb-2">No songs found</h3>
                      <p className="text-muted-foreground">Try adjusting your search or selecting a different playlist.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Now Playing Bar */}
      {currentSong && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center space-x-4">
              {/* Song Info */}
              <div className="flex items-center space-x-4 flex-1 min-w-0">
                <div className="relative">
                  <img 
                    src={currentSong.cover} 
                    alt={currentSong.album}
                    className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                  />
                  {isLoading && (
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="font-cta font-medium text-foreground truncate">{currentSong.title}</h3>
                  <p className="text-muted-foreground text-sm truncate">{currentSong.artist}</p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={previousSong}
                  disabled={isLoading}
                  className="p-2 hover:bg-muted rounded-lg transition-colors duration-300 disabled:opacity-50"
                >
                  <Icon name="SkipBack" size={20} className="text-foreground" />
                </button>
                
                <button
                  onClick={togglePlayPause}
                  disabled={isLoading}
                  className="p-3 bg-primary hover:bg-primary/90 rounded-full transition-colors duration-300 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Icon name={isPlaying ? 'Pause' : 'Play'} size={20} className="text-primary-foreground" />
                  )}
                </button>
                
                <button
                  onClick={nextSong}
                  disabled={isLoading}
                  className="p-2 hover:bg-muted rounded-lg transition-colors duration-300 disabled:opacity-50"
                >
                  <Icon name="SkipForward" size={20} className="text-foreground" />
                </button>
              </div>

              {/* Progress & Volume */}
              <div className="hidden md:flex items-center space-x-4 flex-1 min-w-0">
                <span className="text-sm text-muted-foreground min-w-[40px]">
                  {formatTime(currentTime)}
                </span>
                
                <ProgressBar 
                  current={currentTime} 
                  total={duration} 
                  onSeek={seekTo}
                />
                
                <span className="text-sm text-muted-foreground min-w-[40px]">
                  {formatTime(duration)}
                </span>

                <VolumeControl volume={volume} onVolumeChange={handleVolumeChange} />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Merlin Morton. All rights reserved.</p>
            <p className="text-sm mt-2">Music is the soundtrack to creativity.</p>
            <p className="text-xs mt-1 opacity-75">
              Note: The audio snippets are spotify previews, as downloading whole songs is legally unwelcome. 
            </p>
          </div>
        </div>
      </footer>

      {/* Bottom padding to account for fixed player */}
      <div className={currentSong ? 'h-20' : 'h-0'}></div>
    </div>
  );
};

export default SongSelectorPage;