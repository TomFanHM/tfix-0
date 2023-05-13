"use client";

import { Flex, GridItem, Box, Image, Grid } from "@chakra-ui/react";
import React from "react";

type PhotographProps = {
  image: string;
  aspectRatio: string;
};

const Photograph: React.FC<PhotographProps> = ({ image, aspectRatio }) => {
  return (
    <Box
      position="relative"
      borderRadius="20px"
      overflow="hidden"
      w="full"
      sx={{ aspectRatio: aspectRatio }}
      data-group
    >
      <Image
        position="absolute"
        inset="0"
        w="full"
        h="full"
        color="transparent"
        objectFit="cover"
        src={image}
        alt="banner"
        transition="500ms ease-in-out"
        loading="lazy"
        _groupHover={{ transform: "scale(1.1)" }}
      />
    </Box>
  );
};

type image = {
  url: string;
  aspectRatio: string;
};

type CallToActionProps = {
  children: React.ReactNode;
  background: string;
  color: string;
  images: [image, image, image, image];
};

const CallToAction: React.FC<CallToActionProps> = ({
  background,
  color,
  images,
  children,
}) => {
  return (
    <Box
      position="relative"
      transform="translate3d(0px, 0px, 0px)"
      mt={{ base: "8", md: "16" }}
      boxShadow={`0 0 0 100vmax ${background}`}
      clipPath="inset(0 -100vmax)"
      bg={background}
      color={color}
    >
      <Flex
        flexDirection="row"
        flexWrap="wrap"
        align="center"
        py={{ base: "10", md: "20" }}
        gap="4"
      >
        <Box flex="1 1 0%" minW="20rem" textAlign="start" px="4">
          {children}
        </Box>
        <Box flex="1 1 0%" minW="20rem">
          <Grid
            gridTemplateColumns="1fr 1fr"
            alignItems="center"
            justifyContent="center"
            gap="4"
          >
            <GridItem colSpan={1}>
              <Flex flexDirection="column" gap="4">
                <Photograph
                  aspectRatio={images[0].aspectRatio}
                  image={images[0].url}
                />
                <Photograph
                  aspectRatio={images[1].aspectRatio}
                  image={images[1].url}
                />
              </Flex>
            </GridItem>
            <GridItem colSpan={1}>
              <Flex flexDirection="column" gap="4">
                <Photograph
                  aspectRatio={images[2].aspectRatio}
                  image={images[2].url}
                />
                <Photograph
                  aspectRatio={images[3].aspectRatio}
                  image={images[3].url}
                />
              </Flex>
            </GridItem>
          </Grid>
        </Box>
      </Flex>
    </Box>
  );
};

export default CallToAction;
