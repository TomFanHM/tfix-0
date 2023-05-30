"use client";

//here's error of chakra ui's avatar, I created this component to solve this problem

import { Box, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";

type CustomAvatarProps = {
  size: string;
  src: string;
  name: string;
};

const CustomAvatar: React.FC<CustomAvatarProps> = ({ size, src, name }) => {
  const [error, setError] = useState<boolean>(false);
  const letters = name.substring(0, 1).toUpperCase();

  const handleError = () => {
    setError(true);
  };

  return (
    <Box
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="full"
      overflow="hidden"
      bg="#000"
      w={size}
      h={size}
    >
      {!error && (
        <Image
          src={src}
          alt={name}
          onError={handleError}
          w="full"
          h="full"
          objectFit="cover"
          loading="lazy"
        />
      )}
      {error && <Text color="#fff">{letters}</Text>}
    </Box>
  );
};
export default CustomAvatar;
