"use client";

import React, { useState } from "react";
import { MovieData } from "./getMovie";
import ThreeColumnGridWrapper from "@/components/container/ThreeColumnGridWrapper";
import { GridItem, Heading, Skeleton, Stack } from "@chakra-ui/react";
import MovieCard from "./MovieCard";
import MotionContainer from "@/components/container/MotionContainer";

type MovieContainerProps = {
  getMovies: MovieData[];
};

const MovieContainer: React.FC<MovieContainerProps> = ({ getMovies }) => {
  const [movies, setMovies] = useState<MovieData[]>(getMovies);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastVisible, setLastVisible] = useState<MovieData | null>(
    getMovies.length > 0 ? getMovies[getMovies.length - 1] : null
  );
  return (
    <MotionContainer maxW="container.xl">
      <ThreeColumnGridWrapper
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
            <MovieCard key={i} movie={movie} />
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
      </ThreeColumnGridWrapper>
    </MotionContainer>
  );
};
export default MovieContainer;
