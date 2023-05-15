"use client";

import React, { useEffect, useState } from "react";
import { Skeleton, Image as ChakraImage, ImageProps } from "@chakra-ui/react";
import { fallbackImage } from "@/config/site";

type OptimizedImageProps = {
  url: string | null;
  border_radius: string;
  alt: string;
} & ImageProps;

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  url,
  border_radius,
  alt,
  ...rest
}) => {
  const [imageUrl, setImageUrl] = useState<string>(url ? url : fallbackImage);
  const [loaded, setLoaded] = useState<boolean>(false);

  const handleError = () => {
    setImageUrl(fallbackImage);
    setLoaded(true);
  };

  useEffect(() => {
    if (!url) {
      setImageUrl(fallbackImage);
      setLoaded(true);
      return;
    }

    setImageUrl(url);

    const img = new Image();
    img.src = url;
    if (img.complete) {
      setLoaded(true);
    }
  }, [url]);

  return (
    <Skeleton isLoaded={loaded} borderRadius={border_radius}>
      <ChakraImage
        borderRadius={border_radius}
        src={imageUrl}
        alt={alt}
        onLoad={() => {
          setLoaded(true);
        }}
        onError={handleError}
        fallbackSrc={fallbackImage}
        {...rest}
      />
    </Skeleton>
  );
};

export default OptimizedImage;
