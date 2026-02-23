'use client';

import React, { useState, useRef, useEffect } from 'react';

interface MDXImageProps {
  src: string;
  alt: string;
  caption?: string;
  noBorder?: boolean;
}

const MDXImage: React.FC<MDXImageProps> = ({ src, alt, caption, noBorder = false }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setImageLoading(false);
    }
  }, []);

  const spinner = imageLoading && (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-solid border-[#c02e7e] border-t-transparent"></div>
    </div>
  );

  const imageElement = (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      onLoad={() => setImageLoading(false)}
      className={`w-full rounded-lg object-cover ${
        imageLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'
      }`}
    />
  );

  return (
    <figure className="my-6">
      {noBorder ? (
        <div className="relative">
          {spinner}
          {imageElement}
        </div>
      ) : (
        <div className="border border-[#252525] bg-[#979797]/10 backdrop-blur-sm rounded-lg p-4">
          <div className="relative">
            {spinner}
            {imageElement}
          </div>
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

export default MDXImage;
