import React from "react";
import { AnimeData } from "../getAnimes";
import { Grid, GridItem, Skeleton, Stack } from "@chakra-ui/react";
import SearchCard from "./SearchCard";
import { sortAnime } from "./sort";
import { useInfiniteData } from "@/hooks/useInfiniteData";

type AnimeSearchResultsProps = {
  data: AnimeData[];
  sort: null | "Latest" | "Popular" | "Broadcast";
};

const AnimeSearchResults: React.FC<AnimeSearchResultsProps> = ({
  data,
  sort,
}) => {
  const {
    data: animeData,
    fetchData,
    hasNext,
    loading,
    error,
  } = useInfiniteData<AnimeData>([...data]);

  if (!animeData) return <></>;

  return (
    <Grid
      templateColumns="repeat(4, 1fr)"
      gap="4"
      mx="auto"
      pb={{ base: "10", md: "20" }}
    >
      {sortAnime(animeData, sort).map((el, i) => (
        <GridItem key={i} colSpan={{ base: 2, md: 1 }}>
          <SearchCard
            url={el.image}
            title={el.title_english || el.title_japanese || "Unknown"}
            href={`/anime/${el.id}`}
          />
        </GridItem>
      ))}
      <>
        {loading && (
          <GridItem colSpan={4}>
            <Stack>
              <Skeleton h="4" />
              <Skeleton h="4" />
              <Skeleton h="4" />
            </Stack>
          </GridItem>
        )}
      </>
    </Grid>
  );
};
export default React.memo(AnimeSearchResults);
