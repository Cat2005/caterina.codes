'use client';

import React, { useState, useRef, useEffect } from 'react';

interface MDXVideoProps {
  src: string;
  caption?: string;
  type?: 'youtube' | 'local';
  noBorder?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
}

const MDXVideo: React.FC<MDXVideoProps> = ({ src, caption, type = 'local', noBorder = false, autoPlay = false, loop = false }) => {
  const [videoLoading, setVideoLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isYouTube = type === 'youtube' || src.includes('youtube.com') || src.includes('youtu.be');

  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 3) {
      setVideoLoading(false);
    }
  }, []);

  const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const spinner = videoLoading && !isYouTube && (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-solid border-[#c02e7e] border-t-transparent"></div>
    </div>
  );

  const videoContent = isYouTube ? (
    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
      <iframe
        src={getYouTubeEmbedUrl(src)}
        className="absolute top-0 left-0 w-full h-full rounded-lg"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  ) : (
    <div className="relative">
      {spinner}
      <video
        ref={videoRef}
        playsInline
        controls={!autoPlay}
        autoPlay={autoPlay}
        muted={autoPlay}
        loop={loop || autoPlay}
        onLoadedData={() => setVideoLoading(false)}
        className={`w-full rounded-lg ${
          videoLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'
        }`}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );

  return (
    <figure className="my-6">
      {noBorder ? (
        videoContent
      ) : (
        <div className="border border-[#252525] bg-[#979797]/10 backdrop-blur-sm rounded-lg p-4">
          {videoContent}
        </div>
      )}
      {caption && (
        <figcaption className="font-avantGardeMedium text-xs text-[#777777] text-center mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default MDXVideo;
