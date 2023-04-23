"use client";

import React from "react";
import MotionContainer from "@/components/container/MotionContainer";
import { Grid, GridItem, Heading } from "@chakra-ui/react";
import { AnimeSchema } from "./getAnimes";
import AnimeCard from "./AnimeCard";

type AnimesContainerProps = {
  title: string;
  getAnimes: AnimeSchema[];
};

const AnimesContainer: React.FC<AnimesContainerProps> = ({
  title,
  getAnimes,
}) => {
  return (
    <MotionContainer maxW="container.xl">
      <Grid
        templateColumns="repeat(4, 1fr)"
        alignContent="center"
        w="full"
        mx="auto"
        pb={{ base: "10", sm: "15", md: "20" }}
        gridGap="64px 16px"
        py={{ base: "6", md: "8" }}
        my={{ base: "6", md: "8" }}
      >
        <GridItem colSpan={4}>
          <Heading size={{ base: "xl", md: "2xl" }} fontWeight="extrabold">
            {title}
          </Heading>
        </GridItem>
        {getAnimes.map((anime, i) => (
          <AnimeCard anime={anime} key={i} />
        ))}
      </Grid>
    </MotionContainer>
  );
};
export default AnimesContainer;
