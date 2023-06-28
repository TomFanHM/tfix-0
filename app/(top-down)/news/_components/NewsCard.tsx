"use client";

import { fromNow } from "@/functions/dateUtils";
import { Flex, GridItem, Heading, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { ArticleSchema } from "./getNews";
import OptimizedImage from "@/components/image/OptimizedImage";

type NewsCardProps = {
  id: number;
  article: ArticleSchema;
};

const NewsCard: React.FC<NewsCardProps> = ({ id, article }) => {
  const large: boolean = id % 5 === 0;
  const banner: boolean = id % 5 === 0 || id % 5 === 1;

  /* const handleOpenSource = () => {
    window.open(article.url, "_blank");
  }; */

  return (
    <GridItem colSpan={{ base: 3, md: large ? 2 : 1 }}>
      <Link href={article.url} target="_blank">
        <OptimizedImage
          url={article.imageUrl}
          alt={article.title || "news image"}
          border_radius="20px"
          position="relative"
          w="full"
          maxW="full" //important
          h={{ md: banner ? "500px" : "unset" }}
          sx={{ aspectRatio: "16/9" }}
          color="transparent"
          objectFit="cover"
          loading="lazy"
          cursor="pointer"
        />
      </Link>
      <Flex flexDirection="column" mt="4">
        <Link
          as={NextLink}
          href={`/news/${article.category.toLowerCase()}`}
          mt="4"
          textDecoration="underline"
          w="min-content"
        >
          {article.category}
        </Link>
        <Heading size="lg" mt="4">{article.title || "No title available"}</Heading>
        <Text mt="6" noOfLines={5}>
          {article.description || "No description available"}
        </Text>
        <Text layerStyle="Medium-emphasis" mt="4">
          {article.source || "Unknown"} &#8226; {fromNow(article.publishedAt)}
        </Text>
      </Flex>
    </GridItem>
  );
};

export default React.memo(NewsCard);
