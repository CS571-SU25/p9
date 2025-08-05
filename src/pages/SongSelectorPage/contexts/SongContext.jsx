import React, { createContext, useContext, useState, useRef, useEffect, useCallback, useMemo } from 'react';

const MusicPlayerContext = createContext();

export const useSongContext = () => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
};

export const SongContextProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [activePlaylist, setActivePlaylist] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState('none');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const audioRef = useRef(null);

  const value = {
    // States
    currentSong,
    setCurrentSong,
    isPlaying,
    setIsPlaying,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    volume,
    setVolume,
    activePlaylist,
    setActivePlaylist,
    searchQuery,
    setSearchQuery,
    isShuffled,
    setIsShuffled,
    repeatMode,
    setRepeatMode,
    isLoading,
    setIsLoading,
    error,
    setError,
    audioRef
  };

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
    </MusicPlayerContext.Provider>
  );
};