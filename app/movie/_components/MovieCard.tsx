"use client";

import React from "react";
import { MovieData } from "./getMovie";
import { Flex, Heading, Text, Box } from "@chakra-ui/react";
import OptimizedImage from "@/components/image/OptimizedImage";

type MovieCardProps = {
  movie: MovieData;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Box>
      <OptimizedImage
        url={`https://image.tmdb.org/t/p/original${
          movie.poster_path || movie.backdrop_path
        }`}
        alt={movie.title || "poster"}
        border_radius="20px"
        position="relative"
        w="full"
        maxW="full" //important
        sx={{ aspectRatio: "2/3" }}
        color="transparent"
        objectFit="cover"
        loading="lazy"
        cursor="pointer"
      />
      <Flex flexDirection="column" mt="4" gap="4">
        <Heading size="lg">{movie.title || "No title available"}</Heading>
        <Text mt="4" cursor="pointer" noOfLines={5}>
          {movie.overview || "No overview available"}
        </Text>
        <Text layerStyle="Medium-emphasis">
          Release date : {movie.release_date}
        </Text>
      </Flex>
    </Box>
  );
};
export default MovieCard;
