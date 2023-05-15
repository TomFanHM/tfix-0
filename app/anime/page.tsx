import MotionContainer from "@/components/container/MotionContainer";
import React from "react";
import GridWrapper from "@/components/container/GridWrapper";
import { firestore } from "@/firebase/firebaseApp";
import { collection, limit, orderBy, query, where } from "firebase/firestore";
import { GridItem } from "@/components/chakra/LayoutComponents";
import OptimizedImage from "@/components/image/OptimizedImage";
import AnimeSection from "./_components/AnimeSection";
import Guide from "./_components/Guide";
import { getCurrentSeason, getAnimes } from "./_components/getAnimes";

export const revalidate = 86400 //3600 * 24;

const Animes = async (): Promise<JSX.Element> => {
  const year = new Date().getFullYear();
  const season = getCurrentSeason();
  const animesRef = collection(firestore, "animes");

  const [currentSeason, upComingAnime, popularAnime, adventureAnime] =
    await Promise.all([
      getAnimes(
        query(
          animesRef,
          where("year", "==", year),
          where("season", "==", season),
          orderBy("popularity", "asc"),
          limit(100)
        )
      ),
      getAnimes(
        query(
          animesRef,
          where("status", "==", "Not yet aired"),
          orderBy("popularity", "asc"),
          limit(100)
        )
      ),
      getAnimes(query(animesRef, orderBy("popularity", "asc"), limit(20))),
      getAnimes(
        query(
          animesRef,
          where("genres", "array-contains", "Adventure"),
          orderBy("popularity", "asc"),
          limit(20)
        )
      ),
    ]);

  return (
    <MotionContainer maxW="container.xl">
      <GridWrapper
        gap="64px"
        py={{ base: "6", md: "8" }}
        my={{ base: "6", md: "8" }}
      >
        <GridItem colSpan={2}>
          <OptimizedImage
            url={"/images/dummy_1600x900.png"}
            alt="banner"
            position="relative"
            color="transparent"
            border_radius="20px"
            w="full"
            maxW="full" //important
            sx={{ aspectRatio: { base: "16/9", md: "21/9" } }}
            objectFit="cover"
            loading="lazy"
          />
        </GridItem>
        <GridItem colSpan={2} w="full" maxW="full" overflow="hidden">
          <AnimeSection title="New releases" anime={currentSeason} />
        </GridItem>
        <GridItem colSpan={2} w="full" maxW="full" overflow="hidden">
          <AnimeSection title="Upcoming" anime={upComingAnime} />
        </GridItem>
        <GridItem colSpan={2} w="full" maxW="full" overflow="hidden">
          <AnimeSection title="Popular" anime={popularAnime} />
        </GridItem>
        <GridItem colSpan={2} w="full" maxW="full" overflow="hidden">
          <AnimeSection title="Adventures" anime={adventureAnime} />
        </GridItem>

        <GridItem colSpan={2}>
          <Guide />
        </GridItem>
      </GridWrapper>
    </MotionContainer>
  );
};

export default Animes;
