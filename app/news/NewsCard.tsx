"use client";

import { fallbackImage } from "@/config/site";
import { fromNow } from "@/functions/dateUtils";
import { capitalizeFirstLetter } from "@/functions/functions";
import {
  Flex,
  GridItem,
  Heading,
  Text,
  Image,
  Link,
  Skeleton,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useState } from "react";
import { ArticleSchema } from "./getNews";

type NewsCardProps = {
  id: number;
  article: ArticleSchema;
};

const NewsCard: React.FC<NewsCardProps> = ({ id, article }) => {
  const large: boolean = id % 5 === 0;
  const banner: boolean = id % 5 === 0 || id % 5 === 1;

  const handleOpenSource = () => {
    window.open(article.url, "_blank");
  };

  const [imageUrl, setImageUrl] = useState<string>(
    article.imageUrl || fallbackImage
  );

  return (
    <GridItem colSpan={{ base: 3, md: large ? 2 : 1 }}>
      <Image
        position="relative"
        w="full"
        maxW="full" //important
        h={{ md: banner ? "500px" : "unset" }}
        sx={{ aspectRatio: "16/9" }}
        borderRadius="20px"
        color="transparent"
        objectFit="cover"
        src={imageUrl}
        alt="banner"
        loading="lazy"
        fallbackSrc={fallbackImage}
        onError={() => setImageUrl(fallbackImage)}
        fallback={<Skeleton />}
        onClick={handleOpenSource}
        placeholder={imageUrl}
      />

      <Flex flexDirection="column" mt="4" gap="4">
        <Link
          as={NextLink}
          href={`news/${article.category}`}
          mt="4"
          textDecoration="underline"
        >
          {capitalizeFirstLetter(article.category)}
        </Link>
        <Heading size="lg">{article.title || "No title available"}</Heading>
        <Text mt="4" onClick={handleOpenSource}>
          {article.description || "No description available"}
        </Text>
        <Text layerStyle="Medium-emphasis">
          {article.source || "Unknown"} &#8226; {fromNow(article.publishedAt)}
        </Text>
      </Flex>
    </GridItem>
  );
};

export default NewsCard;
