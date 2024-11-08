import React, { useState, useEffect } from "react";
import placeholderImage from "../../../assets/placeholder.png";

type ImageWithFallbackProps = {
  src: string;
  alt: string;
  fallbackSrc?: string;
};

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackSrc = placeholderImage,
}) => {
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  const handleError = () => {
    setImageSrc(fallbackSrc);
  };

  return <img src={imageSrc} alt={alt} onError={handleError} />;
};
