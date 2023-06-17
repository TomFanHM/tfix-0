import React from "react";
import { AnimeData, getAnimes } from "../getAnimes";
import { Button, Grid, GridItem, Skeleton, Stack } from "@chakra-ui/react";
import SearchCard from "./SearchCard";
import { sortAnime } from "./sort";
import { useInfiniteData } from "@/hooks/useInfiniteData";
import { scrollToTop } from "@/functions/functions";
import { SearchQuery, generateAnimeSearchQuery } from "./getQuery";
import { query, startAfter } from "firebase/firestore";

type AnimeSearchResultsProps = {
  anime: AnimeData[];
  sort: null | "Latest" | "Popular" | "Broadcast";
  formik: SearchQuery;
};

const AnimeSearchResults: React.FC<AnimeSearchResultsProps> = ({
  anime,
  sort,
  formik,
}) => {
  const { data, fetchData, hasNext, loading, error } =
    useInfiniteData<AnimeData>(anime);

  const fetchMore = async (el: AnimeData[]) => {
    let q = generateAnimeSearchQuery(formik.query, formik.anime);
    q = query(q, startAfter(el[el.length - 1].mal_id));
    const result = await getAnimes(q);
    return result;
  };

  if (!data.length) return <></>;

  return (
    <Grid
      w="full"
      templateColumns="repeat(4, 1fr)"
      gap="4"
      mx="auto"
      pb={{ base: "10", md: "20" }}
    >
      {sortAnime(data, sort).map((el, i) => (
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
      <>
        {hasNext && (
          <GridItem colSpan={4}>
            <Button
              w="full"
              variant="solid"
              isLoading={loading}
              onClick={() => fetchData(fetchMore)}
            >
              More
            </Button>
          </GridItem>
        )}
        {!hasNext && (
          <GridItem colSpan={4}>
            <Button w="full" variant="solid" onClick={scrollToTop}>
              Scroll to Top
            </Button>
          </GridItem>
        )}
      </>
    </Grid>
  );
};
export default React.memo(AnimeSearchResults);
