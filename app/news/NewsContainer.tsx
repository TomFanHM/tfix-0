"use client";

import MotionContainer from "@/components/container/MotionContainer";
import ThreeColumnGridWrapper from "@/components/container/ThreeColumnGridWrapper";
import { firestore } from "@/firebase/firebaseApp";
import { scrollToTop } from "@/functions/functions";
import { Stack, Skeleton, GridItem, Button } from "@chakra-ui/react";
import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
  where,
} from "firebase/firestore";
import React, { useCallback, useState } from "react";
import Guide from "./Guide";
import Header from "./Header";
import NewsCard from "./NewsCard";
import { ArticleSchema } from "./getNews";

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
  const [articles, setArticles] = useState<ArticleSchema[]>(getArticles);
  const [lastVisible, setLastVisible] = useState<ArticleSchema | null>(
    getArticles.length > 0 ? getArticles[getArticles.length - 1] : null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMoreNews = useCallback(async (): Promise<void> => {
    if (loading || !lastVisible) return;
    setLoading(true);
    const docRef = collection(firestore, "news");

    const q = filter
      ? query(
          docRef,
          where("category", "==", filter),
          orderBy("publishedAt", "desc"),
          startAfter(lastVisible.publishedAt),
          limit(10)
        )
      : query(
          docRef,
          orderBy("publishedAt", "desc"),
          startAfter(lastVisible.publishedAt),
          limit(10)
        );

    try {
      const querySnapshot = await getDocs(q);

      const moreNews = querySnapshot.docs
        .map((doc) => {
          const rawDocData = doc.data();
          const docData = ArticleSchema.safeParse(rawDocData);
          if (docData.success) {
            return docData.data;
          }
        })
        .flatMap((f) => (f ? [f] : [])); //remove undefined

      if (moreNews.length > 0) {
        setArticles((prevArticles) => [...prevArticles, ...moreNews]);
        setLastVisible(moreNews[moreNews.length - 1]);
      } else {
        setLastVisible(null);
      }
    } catch (error) {
      console.log("fetchMoreNews error: ", error);
    }
    setLoading(false);
  }, [loading, lastVisible, filter]);

  return (
    <MotionContainer maxW="container.xl">
      <ThreeColumnGridWrapper
        gridGap="64px 16px"
        py={{ base: "6", md: "8" }}
        my={{ base: "6", md: "8" }}
      >
        <>
          <Header title={title} />
        </>
        <>
          {articles.map((article, i) => (
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
          {lastVisible && (
            <GridItem colSpan={3}>
              <Button
                w="full"
                variant="solid"
                onClick={fetchMoreNews}
                isLoading={loading}
              >
                More
              </Button>
            </GridItem>
          )}
          {!lastVisible && (
            <GridItem colSpan={3}>
              <Button w="full" variant="solid" onClick={scrollToTop}>
                Scroll to Top
              </Button>
            </GridItem>
          )}
        </>
        <>
          <Guide />
        </>
      </ThreeColumnGridWrapper>
    </MotionContainer>
  );
};

export default NewsContainer;
