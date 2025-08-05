import React, { useEffect, useState, useRef, useCallback } from 'react';
import Icon from '../../../components/AppIcon';

const VolumeControl = ({ volume, onVolumeChange }) => {
    const [isDragging, setIsDragging] = useState(false);
    const volumeRef = useRef(null);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        handleVolumeSeek(e);
    };

    const handleMouseMove = useCallback((e) => {
        if (isDragging) {
            handleVolumeSeek(e);
        }
    }, [isDragging]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleVolumeSeek = (e) => {
        if (volumeRef.current) {
            const rect = volumeRef.current.getBoundingClientRect();
            const percentage = ((e.clientX - rect.left) / rect.width);
            onVolumeChange(Math.max(0, Math.min(1, percentage)));
        }
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, handleMouseMove, handleMouseUp]);

    return (
        <div className="flex items-center space-x-2">
            <Icon 
                name={volume === 0 ? 'VolumeX' : volume < 0.5 ? 'Volume1' : 'Volume2'} 
                size={16} 
                className="text-muted-foreground cursor-pointer"
                onClick={() => onVolumeChange(volume === 0 ? 0.7 : 0)}
            />
            <div
                ref={volumeRef}
                className="w-20 bg-muted/30 h-1 rounded-full overflow-hidden cursor-pointer group"
                onMouseDown={handleMouseDown}
            >
                <div 
                    className="bg-primary h-full transition-all duration-300 relative"
                    style={{ width: `${volume * 100}%` }}
                >
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
            </div>
        </div>
    );
};

export default VolumeControl;