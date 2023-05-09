"use client";

import {
  Flex,
  GridItem,
  Box,
  Image,
  Text,
  Heading,
  Grid,
} from "@chakra-ui/react";
import React from "react";

type ImageBlock = {
  imageUrl: string;
  aspectRatio: string;
};

const ImageBlock: React.FC<ImageBlock> = ({ imageUrl, aspectRatio }) => {
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
        src={imageUrl}
        alt="banner"
        transition="500ms ease-in-out"
        loading="lazy"
        _groupHover={{ transform: "scale(1.1)" }}
      />
    </Box>
  );
};

type ArrayOfMaxLength4 = readonly [string, string, string, string];

type SimpleStackProps = {
  weakText: string;
  strongText: string;
  background?: string;
  onBackground?: string;
  aspectRatioList?: ArrayOfMaxLength4;
  imageUrls?: ArrayOfMaxLength4;
};

const SimpleStack: React.FC<SimpleStackProps> = ({
  weakText,
  strongText,
  background = '--chakra-colors-background',
  onBackground = '--chakra-colors-onBackground',
  aspectRatioList = ["2/3", "1/1", "2/3", "3/4"],
  imageUrls = [
    "/fallback.png",
    "/fallback.png",
    "/fallback.png",
    "/fallback.png",
  ],
}) => {

  return (
    <GridItem
      colSpan={2}
      position="relative"
      transform="translate3d(0px, 0px, 0px)"
      mt={{ base: "8", md: "16" }}
      boxShadow={`0 0 0 100vmax var(${background})`}
      clipPath="inset(0 -100vmax)"
      bg={`var(${background})`}
      color={`var(${onBackground})`}
    >
      <Flex
        flexDirection="row"
        flexWrap="wrap"
        align="center"
        py={{ base: "10", md: "20" }}
        gap="4"
      >
        <Box flex="1 1 0%" minW="20rem" textAlign="start" px="4">
          <Text as="b">{weakText}</Text>
          <Heading mt="6" size={{ base: "2xl", md: "4xl" }}>
            {strongText}
          </Heading>
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
                <ImageBlock
                  aspectRatio={aspectRatioList[0]}
                  imageUrl={imageUrls[0]}
                />
                <ImageBlock
                  aspectRatio={aspectRatioList[1]}
                  imageUrl={imageUrls[1]}
                />
              </Flex>
            </GridItem>
            <GridItem colSpan={1}>
              <Flex flexDirection="column" gap="4">
                <ImageBlock
                  aspectRatio={aspectRatioList[2]}
                  imageUrl={imageUrls[2]}
                />
                <ImageBlock
                  aspectRatio={aspectRatioList[3]}
                  imageUrl={imageUrls[3]}
                />
              </Flex>
            </GridItem>
          </Grid>
        </Box>
      </Flex>
    </GridItem>
  );
};
export default SimpleStack;
