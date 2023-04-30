import MotionContainer from "@/components/container/MotionContainer";
import React from "react";
import { getAnimes, getCurrentSeason } from "./getAnimes";
import AnimeSection from "./AnimeSection";
import GridWrapper from "@/components/container/GridWrapper";
import Bannner from "./Bannner";
import Guide from "./Guide";

export const revalidate = 3600 * 24;

const Animes = async (): Promise<JSX.Element> => {
  const year = new Date().getFullYear();
  const season = getCurrentSeason();

  const [currentSeason, upComingAnime, popularAnime, adventureAnime] =
    await Promise.all([
      getAnimes(
        [
          { fieldPath: "year", opStr: "==", value: year },
          { fieldPath: "season", opStr: "==", value: season },
        ],
        100
      ),
      getAnimes(
        [{ fieldPath: "status", opStr: "==", value: "Not yet aired" }],
        100
      ),
      getAnimes([], 20),
      getAnimes(
        [{ fieldPath: "genres", opStr: "array-contains", value: "Adventure" }],
        20
      ),
    ]);

  return (
    <MotionContainer maxW="container.xl">
      <GridWrapper
        gap="64px"
        py={{ base: "6", md: "8" }}
        my={{ base: "6", md: "8" }}
      >
        <Bannner />
        <AnimeSection title="New releases" anime={currentSeason} />
        <AnimeSection title="Upcoming" anime={upComingAnime} />
        <AnimeSection title="Popluar" anime={popularAnime} />
        <AnimeSection title="Adventures" anime={adventureAnime} />
        <Guide />
      </GridWrapper>
    </MotionContainer>
  );
};

export default Animes;
