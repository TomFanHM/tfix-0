"use client";

import { Box, Grid, GridItem, Image } from "@chakra-ui/react";
import React from "react";

type SectionCardProps = {
  image: string;
  reverse?: boolean;
  children?: React.ReactNode;
};

const SectionCard: React.FC<SectionCardProps> = ({
  image,
  reverse = false,
  children,
}) => {
  return (
    <Grid
      w="full"
      templateColumns="repeat(2, 1fr)"
      gap="8"
      py={{ base: "10", md: "20" }}
      wordBreak="break-word"
    >
      <GridItem
        colSpan={{ base: 2, md: 1 }}
        order={{ base: 2, md: reverse ? 2 : 1 }}
        display="flex"
        alignItems="center"
        justifyContent="start"
      >
        <Box>{children}</Box>
      </GridItem>
      <GridItem
        colSpan={{ base: 2, md: 1 }}
        order={{ base: 1, md: reverse ? 1 : 2 }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          src={image}
          w="full"
          maxW="100%"
          aspectRatio={4 / 3}
          maxH="500px"
          objectFit="cover"
          alt="an image"
          color="transparent"
          borderRadius="20px"
        />
      </GridItem>
    </Grid>
  );
};
export default SectionCard;
