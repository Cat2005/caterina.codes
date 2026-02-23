import React from 'react';

interface MDXImageProps {
  src: string;
  alt: string;
  caption?: string;
  noBorder?: boolean;
}

const MDXImage: React.FC<MDXImageProps> = ({ src, alt, caption, noBorder = false }) => {
  return (
    <figure className="my-6">
      {noBorder ? (
        <img
          src={src}
          alt={alt}
          className="w-full rounded-lg object-cover"
        />
      ) : (
        <div className="border border-[#252525] bg-[#979797]/10 backdrop-blur-sm rounded-lg p-4">
          <img
            src={src}
            alt={alt}
            className="w-full rounded-lg object-cover"
          />
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
