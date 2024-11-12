import React, { useState, useEffect } from "react";
import placeholderImage from "../../assets/placeholder.png";

type ImageWithFallbackProps = {
  src: string;
  alt: string;
  className?: string;
  style?: object;
  fallbackSrc?: string;
};

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className,
  style,
  fallbackSrc = placeholderImage,
}) => {
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  const handleError = () => {
    setImageSrc(fallbackSrc);
  };

  return (
    <img
      className={className}
      style={style}
      src={imageSrc}
      alt={alt}
      onError={handleError}
    />
  );
};
