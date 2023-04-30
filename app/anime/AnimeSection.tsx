"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimeData } from "./getAnimes";
import {
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  IconButton,
  Progress,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import AnimeCard from "./AnimeCard";

type AnimeSectionProps = {
  title: string;
  anime: AnimeData[];
};

const AnimeSection: React.FC<AnimeSectionProps> = ({ title, anime }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const scrollBy = useCallback((offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  }, []);

  const calculateScrollProgress = useCallback(() => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const scrollWidth =
        scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      const progress = (scrollLeft / scrollWidth) * 100;
      setProgress(progress);
    }
  }, []);

  useEffect(() => {
    const section = scrollRef.current;
    if (!section) return;

    section.addEventListener("scroll", calculateScrollProgress);

    return () => {
      section.removeEventListener("scroll", calculateScrollProgress);
    };
  }, [calculateScrollProgress]);

  return (
    <GridItem colSpan={2} w="full" maxW="full" overflow="hidden">
      <Flex justify="space-between" py="4" align="center">
        <Heading>{title}</Heading>
        <HStack spacing="4">
          <Progress colorScheme="green" w="5rem" size="sm" value={progress} />
          <IconButton
            aria-label="prev"
            variant="custom_solid"
            icon={<ChevronLeftIcon />}
            onClick={() => scrollBy(-500)}
          />
          <IconButton
            aria-label="next"
            variant="custom_solid"
            icon={<ChevronRightIcon />}
            onClick={() => scrollBy(500)}
          />
        </HStack>
      </Flex>

      <Grid
        ref={scrollRef}
        gap="4"
        gridAutoFlow="column"
        overflowX="scroll"
        position="relative"
        //overscrollBehavior="contain"
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
            scrollbarWidth: "none",
          },
        }}
      >
        {anime.map((item, i) => (
          <GridItem key={i} w="10rem" minW="10rem">
            <AnimeCard anime={item} />
          </GridItem>
        ))}
      </Grid>
    </GridItem>
  );
};

export default AnimeSection;
