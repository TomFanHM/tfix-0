"use client";

import React, { useState } from "react";
import { Skeleton, Image, ImageProps } from "@chakra-ui/react";
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
  const [imageUrl, setImageUrl] = useState<string>(() =>
    url ? url : fallbackImage
  );
  const [loaded, setLoaded] = useState<boolean>(() => (url ? false : true)); //not null or empty, need to load

  const handleError = () => {
    setImageUrl(fallbackImage);
    setLoaded(true);
  };

  return (
    <Skeleton isLoaded={loaded} borderRadius={border_radius}>
      <Image
        borderRadius={border_radius}
        src={imageUrl}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={handleError}
        fallbackSrc={fallbackImage}
        {...rest}
      />
    </Skeleton>
  );
};

export default OptimizedImage;
