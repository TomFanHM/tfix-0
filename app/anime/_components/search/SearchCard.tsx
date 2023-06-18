"use client";

import OptimizedImage from "@/components/image/OptimizedImage";
import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

import React from "react";

type SearchCardProps = {
  url: string | null;
  title: string;
  href?: string;
  source?: string;
};

const SearchCard: React.FC<SearchCardProps> = ({
  url,
  title,
  href = undefined,
  source = undefined,
}) => {
  const router = useRouter();
  const handleClick = () => {
    if (href) router.push(href);
    if (source) window.open(source, "_blank");
  };

  return (
    <Box pb="4">
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
        onClick={handleClick}
      />
      <Text as="b" mt="4">
        {title}
      </Text>
    </Box>
  );
};

export default React.memo(SearchCard);
