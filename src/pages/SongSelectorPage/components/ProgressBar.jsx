import React, { useEffect, useState, useRef, useCallback } from 'react';

const ProgressBar = ({ current, total, onSeek }) => {
    const [isDragging, setIsDragging] = useState(false);
    const progressRef = useRef(null);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        handleSeek(e);
    };

    const handleMouseMove = useCallback((e) => {
        if (isDragging) {
            handleSeek(e);
        }
    }, [isDragging]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleSeek = (e) => {
        if (progressRef.current) {
            const rect = progressRef.current.getBoundingClientRect();
            const percentage = ((e.clientX - rect.left) / rect.width) * 100;
            onSeek(Math.max(0, Math.min(100, percentage)));
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

    const percentage = total > 0 ? (current / total) * 100 : 0;

    return (
        <div
            ref={progressRef}
            className="flex-1 bg-muted/30 h-2 rounded-full overflow-hidden cursor-pointer group"
            onMouseDown={handleMouseDown}>
            <div 
                        className="bg-primary h-full transition-all duration-300 relative"
                        style={{ width: `${percentage}%` }}>
                        <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
        </div>
    );
};

export default ProgressBar;