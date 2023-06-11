"use client";

import { Box, BoxProps } from "@chakra-ui/react";
import * as React from "react";
import NextImage from "next/image";

type BlurHashImageProps = {
  src: string;
  alt: string;
  blurHash: string;
} & BoxProps;

export const BlurHashImage: React.FC<BlurHashImageProps> = ({
  src,
  alt,
  blurHash,
  ...rest
}) => {
  return (
    <Box position="relative" {...rest}>
      <NextImage
        objectFit="cover"
        layout="fill"
        src={src}
        alt={alt}
        placeholder="blur"
        blurDataURL={blurHash}
      />
    </Box>
  );
};
