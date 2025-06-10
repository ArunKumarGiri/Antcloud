import React, { useEffect } from 'react';

interface BackgroundVideoProps {
    videoRef: React.RefObject<HTMLVideoElement | null>;
    className?: string;
    opacityClass?: string;
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ videoRef, className, opacityClass }) => {
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0; // Start in slow motion
        }
    }, [videoRef]);

    return (
        <video
            ref={videoRef}
            src="/dashboardVideo2.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className={`${className} ${opacityClass}`}
        />
    );
};

export default BackgroundVideo; 