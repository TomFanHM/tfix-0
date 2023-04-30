"use client";

import React from "react";
import { AnimeData } from "./getAnimes";
import { Text, Flex, Tag, Box } from "@chakra-ui/react";
import OptimizedImage from "@/components/image/OptimizedImage";
import { useRouter } from "next/navigation";

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
  anime: AnimeData;
};

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
  const broadcastDayColor = getBroadcastDayColor(
    anime.broadcast_day as BroadcastDay | null
  );

  const router = useRouter();

  return (
    <Box onClick={() => router.push(`/anime/${anime.id}`)}>
      <OptimizedImage
        url={anime.image}
        alt={anime.title_english || "anime image"}
        border_radius="20px"
        w="full"
        maxW="full" //important
        sx={{ aspectRatio: "2/3" }}
        objectFit="cover"
        cursor="pointer"
        loading="lazy"
      />

      <Flex flexDirection="column" mt="4">
        <Text as="b">
          {anime.title_english || anime.title_japanese || "Unknown"}
        </Text>
        <Text as="b" layerStyle="Medium-emphasis" mt="2">
          {anime.year || "--"} &#8226; {anime.type || "--"}
        </Text>
      </Flex>
      <Tag size="md" colorScheme={broadcastDayColor} mt="2" w="min-content">
        {anime.broadcast_day || "Unknown"}
      </Tag>
    </Box>
  );
};
export default AnimeCard;
