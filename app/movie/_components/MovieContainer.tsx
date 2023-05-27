"use client";

import React, { useCallback, useState } from "react";
import { MovieData, getMovies } from "./getMovie";
import {
  Button,
  Grid,
  GridItem,
  Heading,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import MovieCard from "./MovieCard";
import MotionContainer from "@/components/container/MotionContainer";
import { firestore } from "@/firebase/firebaseApp";
import {
  collection,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { scrollToTop } from "@/functions/functions";

type MovieContainerProps = {
  moviesData: MovieData[];
};

const MovieContainer: React.FC<MovieContainerProps> = ({ moviesData }) => {
  const [movies, setMovies] = useState<MovieData[]>(moviesData);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastVisible, setLastVisible] = useState<MovieData | null>(
    moviesData.length > 0 ? moviesData[moviesData.length - 1] : null
  );

  const fetchMoreMovies = useCallback(async (): Promise<void> => {
    if (loading || !lastVisible) return;
    setLoading(true);
    const moviesRef = collection(firestore, "movies");
    const q = query(
      moviesRef,
      orderBy("release_date", "desc"),
      startAfter(lastVisible.release_date),
      limit(9) //3 col span
    );
    try {
      const moreMovies = await getMovies(q);
      if (moreMovies.length > 0) {
        setMovies((prev) => [...prev, ...moreMovies]);
        setLastVisible(moreMovies[moreMovies.length - 1]);
      } else {
        setLastVisible(null);
      }
    } catch (error) {
      console.log("fetchMoreMovies", error);
    }
    setLoading(false);
  }, [lastVisible, loading]);

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
        <GridItem colSpan={3}>
          <Heading size={{ base: "2xl", md: "4xl" }} fontWeight="extrabold">
            Movie
          </Heading>
        </GridItem>
        <>
          {movies.map((movie, i) => (
            <GridItem key={i} colSpan={{ base: 3, md: 1 }}>
              <MovieCard movie={movie} />
            </GridItem>
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
                onClick={fetchMoreMovies}
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
      </Grid>
    </MotionContainer>
  );
};
export default MovieContainer;
