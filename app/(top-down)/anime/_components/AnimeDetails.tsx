"use client";

import React from "react";
import {
  AspectRatio,
  Button,
  Grid,
  GridItem,
  HStack,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import OptimizedImage from "@/components/image/OptimizedImage";
import Products from "./Products";
import { ProductSchema } from "./getProducts";
import { useRouter } from "next/navigation";
import { AnimeSchema } from "./getAnimes";

type AnimeDetailsProps = {
  anime: AnimeSchema;
  productsData: ProductSchema[] | null;
};

const AnimeDetails: React.FC<AnimeDetailsProps> = ({ anime, productsData }) => {
  const router = useRouter();
  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      alignContent="center"
      w="full"
      mx="auto"
      gridGap="64px 16px"
      py={{ base: "6", md: "8" }}
      my={{ base: "6", md: "8" }}
    >
      <GridItem colSpan={{ base: 3, md: 2 }}>
        <Heading mb="6">
          {anime.title_english || anime.title_japanese || "Unknown"}
        </Heading>
        <AspectRatio w="full" maxW="full" ratio={16 / 9}>
          <iframe
            title={anime.title_english || anime.title_japanese || "Unknown"}
            src={anime.trailer_embed_url || ""}
            allowFullScreen
          />
        </AspectRatio>
        <HStack
          spacing="4"
          mt="6"
          align="start"
          position="relative"
          maxW="full"
          overflow="hidden"
        >
          <OptimizedImage
            url={anime.image}
            alt={anime.title_english || "anime image"}
            border_radius="20px"
            maxW={{ base: "10rem", md: "15rem" }} //important
            sx={{ aspectRatio: "2/3" }}
            objectFit="cover"
            cursor="pointer"
            loading="lazy"
          />
          <VStack align="start" wordBreak="break-word">
            <Text as="b">Japanese title :</Text>
            <Text layerStyle="Medium-emphasis">
              {anime.title_japanese || "Unknown"}
            </Text>
            <Text as="b">Type :</Text>
            <Text layerStyle="Medium-emphasis">{anime.type || "Unknown"}</Text>
            <Text as="b">Status :</Text>
            <Text layerStyle="Medium-emphasis">{anime.status}</Text>
            <Text as="b">Episodes :</Text>
            <Text layerStyle="Medium-emphasis">
              {anime.episodes || "Unknown"}
            </Text>
            <Text as="b">Season :</Text>
            <Text layerStyle="Medium-emphasis">
              {anime.year || "--"} &#8226; {anime.season || "--"}
            </Text>
            <Text as="b">Source :</Text>
            <Text layerStyle="Medium-emphasis">
              {anime.source || "Unknown"}
            </Text>
            <Text as="b">Genres :</Text>
            <HStack wrap="wrap" align="start">
              {anime.genres.length
                ? anime.genres.map((el, i) => (
                    <Text layerStyle="Medium-emphasis" key={i}>
                      {el}
                    </Text>
                  ))
                : "Unknown"}
            </HStack>
            <Text as="b">Background :</Text>
            <Text layerStyle="Medium-emphasis">
              {anime.background || "No background available"}
            </Text>
          </VStack>
        </HStack>
        <VStack spacing="4" align="start" mt="8">
          <Text as="b">Synopsis :</Text>
          <Text layerStyle="Medium-emphasis">
            {anime.synopsis || "No synopsis available"}
          </Text>
        </VStack>
        <Button
          mt="6"
          w="full"
          variant="solid"
          onClick={() => router.push("/anime")}
        >
          Back
        </Button>
      </GridItem>
      <GridItem colSpan={{ base: 3, md: 1 }}>
        {/* products */}
        <Heading mb="6">Products</Heading>
        <Products productsData={productsData} />
      </GridItem>
    </Grid>
  );
};
export default AnimeDetails;
