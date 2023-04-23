import React from "react";
import { getAnimes, getCurrentSeason } from "../getAnimes";
import AnimesContainer from "../AnimesContainer";

export const revalidate = 3600;

const NewReleases = async (): Promise<JSX.Element> => {
  const year = new Date().getFullYear();
  const season = getCurrentSeason();

  const animes = await getAnimes(
    [
      { fieldPath: "year", opStr: "==", value: year },
      { fieldPath: "season", opStr: "==", value: season },
    ],
    100
  );

  return <AnimesContainer title="New Releases" getAnimes={animes} />;
};
export default NewReleases;
