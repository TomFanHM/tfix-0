"use client";

import MotionContainer from "@/components/container/MotionContainer";
import { firestore } from "@/firebase/firebaseApp";
import { scrollToTop } from "@/functions/functions";
import {
  Grid,
  Stack,
  Skeleton,
  GridItem,
  Button,
  Heading,
} from "@chakra-ui/react";
import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  where,
} from "firebase/firestore";
import React from "react";
import Guide from "./Guide";
import NewsCard from "./NewsCard";
import { ArticleSchema, getNews } from "./getNews";
import { useInfiniteData } from "@/hooks/useInfiniteData";

type NewsContainerProps = {
  title: string;
  getArticles: ArticleSchema[];
  filter?: string;
};

const NewsContainer: React.FC<NewsContainerProps> = ({
  title,
  getArticles,
  filter = undefined,
}) => {
  const fetchMoreNews = async (el: ArticleSchema[]) => {
    const docRef = collection(firestore, "news");
    //generate query
    let q = query(
      docRef,
      orderBy("publishedAt", "desc"),
      startAfter(el[el.length - 1].publishedAt),
      limit(10)
    );

    if (filter) q = query(q, where("category", "==", filter));
    //get more news
    const moreNews = await getNews(q);

    return moreNews;
  };

  const { data, fetchData, hasNext, loading, error } =
    useInfiniteData<ArticleSchema>([...getArticles]);

  return (
    <MotionContainer maxW="container.xl">
      <Grid
        templateColumns="repeat(3, 1fr)"
        alignContent="center"
        w="full"
        mx="auto"
        gridGap="64px 16px"
        py={{ base: "6", md: "8" }}
        my={{ base: "6", md: "8" }}
      >
        <>
          <GridItem colSpan={3}>
            <Heading size={{ base: "2xl", md: "4xl" }} fontWeight="extrabold">
              {title}
            </Heading>
          </GridItem>
        </>
        <>
          {data.map((article, i) => (
            <NewsCard key={i} id={i} article={article} />
          ))}
        </>
        <>
          {loading && (
            <GridItem colSpan={3}>
              <Stack>
                <Skeleton h="4" />
                <Skeleton h="4" />
                <Skeleton h="4" />
              </Stack>
            </GridItem>
          )}
        </>
        <>
          {hasNext && (
            <GridItem colSpan={3}>
              <Button
                w="full"
                variant="solid"
                onClick={() => fetchData(fetchMoreNews)}
                isLoading={loading}
              >
                More
              </Button>
            </GridItem>
          )}
          {!hasNext && (
            <GridItem colSpan={3}>
              <Button w="full" variant="solid" onClick={scrollToTop}>
                Scroll to Top
              </Button>
            </GridItem>
          )}
        </>
        <>
          <GridItem colSpan={3}>
            <Guide />
          </GridItem>
        </>
      </Grid>
    </MotionContainer>
  );
};

export default NewsContainer;
