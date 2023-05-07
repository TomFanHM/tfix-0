"use client";

import OptimizedImage from "@/components/image/OptimizedImage";
import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

type SearchCardProps = {
  url: string | null;
  title: string;
  link: string;
};

const SearchCard: React.FC<SearchCardProps> = ({ url, title, link }) => {
  return (
    <Link href={link}>
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
        <Text as="b">{title}</Text>
      </Box>
    </Link>
  );
};
export default SearchCard;
