"use client";

import OptimizedImage from "@/components/image/OptimizedImage";
import { Box, Text } from "@chakra-ui/react";

import React from "react";

type SearchCardProps = {
  url: string | null;
  title: string;
};

const SearchCard: React.FC<SearchCardProps> = ({ url, title }) => {
  return (
    <Box>
      <OptimizedImage
        url={url}
        alt={title}
        border_radius="20px"
        w="full"
        maxW="full" //important
        sx={{ aspectRatio: "1/1" }}
        objectFit="cover"
        cursor="pointer"
        loading="lazy"
        mb="6"
      />
      <Text as="b" mt="4">
        {title}
      </Text>
    </Box>
  );
};
export default SearchCard;
