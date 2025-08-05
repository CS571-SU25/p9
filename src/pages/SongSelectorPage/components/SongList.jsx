import { useSongContext } from '../contexts/SongContext';
import { motion } from 'framer-motion';

const SongList = (props) => {    

    // Import Song Context
    const {
        currentSong,
        isPlaying,
        activePlaylist,
        isShuffled, setIsShuffled,
        repeatMode, setRepeatMode,
        isLoading
    } = useSongContext();
    
    return  <div className="lg:col-span-3">
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
                    <div className="w-12"></div>
                    <div className="flex-1">Title</div>
                    <div className="w-48">Album</div>
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
}

export default SongList;