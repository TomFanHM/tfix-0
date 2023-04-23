"use client";

import React, { useState } from "react";
import { AnimeSchema } from "./getAnimes";
import { GridItem, Text, Image, Skeleton, Flex, Tag } from "@chakra-ui/react";
import { fallbackImage } from "@/config/site";

const broadcastDayColors = {
  Mondays: "blue",
  Tuesdays: "green",
  Wednesdays: "yellow",
  Thursdays: "orange",
  Fridays: "red",
  Saturdays: "purple",
  Sundays: "pink",
} as const;

type BroadcastDay =
  | "Mondays"
  | "Tuesdays"
  | "Wednesdays"
  | "Thursdays"
  | "Fridays"
  | "Saturdays"
  | "Sundays";

const getBroadcastDayColor = (broadcastDay: BroadcastDay | null): string => {
  return broadcastDay && broadcastDayColors[broadcastDay]
    ? broadcastDayColors[broadcastDay]
    : "gray";
};

type AnimeCardProps = {
  anime: AnimeSchema;
};

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
  const [imageUrl, setImageUrl] = useState<string>(
    anime.image || fallbackImage
  );

  const broadcastDayColor = getBroadcastDayColor(
    anime.broadcast_day as BroadcastDay | null
  );

  return (
    <GridItem colSpan={{ base: 4, md: 2, lg: 1 }}>
      <Image
        sx={{ aspectRatio: "2/3" }}
        position="relative"
        w="full"
        maxW="full"
        color="transparent"
        objectFit="cover"
        src={imageUrl}
        alt="anime image"
        loading="lazy"
        fallbackSrc={fallbackImage}
        onError={() => setImageUrl(fallbackImage)}
        fallback={<Skeleton />}
      />
      <Flex flexDirection="column" mt="4">
        <Text as="b">
          {anime.title_english || anime.title_japanese || "Unknown"}
        </Text>
        <Text as="b" layerStyle="Medium-emphasis" mt="2">
          {anime.year || "--"} &#8226; {anime.type || "--"}
        </Text>
      </Flex>
      <Tag size="md" colorScheme={broadcastDayColor} mt="2">
        {anime.broadcast_day || "Not available"}
      </Tag>
    </GridItem>
  );
};
export default AnimeCard;
