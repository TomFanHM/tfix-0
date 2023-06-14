"use client";

import React from "react";
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
import { useInfiniteData } from "@/hooks/useInfiniteData";

const fetchMoreMovies = async (el: MovieData[]) => {
  const docRef = collection(firestore, "movies");
  //generate query
  let q = query(
    docRef,
    orderBy("id", "desc"),
    startAfter(el[el.length - 1].id),
    limit(9)
  );
  //get more news
  const moreMovies = await getMovies(q);

  return moreMovies;
};

type MovieContainerProps = {
  moviesData: MovieData[];
};

const MovieContainer: React.FC<MovieContainerProps> = ({ moviesData }) => {
  const { data, fetchData, hasNext, loading, error } =
    useInfiniteData<MovieData>(moviesData);

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
          {data.map((movie, i) => (
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
          {hasNext && (
            <GridItem colSpan={3}>
              <Button
                w="full"
                variant="solid"
                onClick={() => fetchData(fetchMoreMovies)}
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
      </Grid>
    </MotionContainer>
  );
};
export default MovieContainer;
