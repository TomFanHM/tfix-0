import React from "react";
import { getAnimes, getNextSeason } from "../getAnimes";
import AnimesContainer from "../AnimesContainer";
export const revalidate = 3600;

const Upcoming = async (): Promise<JSX.Element> => {
  const animes = await getAnimes(
    [{ fieldPath: "status", opStr: "==", value: "Not yet aired" }],
    100
  );

  return <AnimesContainer title="Upcoming" getAnimes={animes} />;
};
export default Upcoming;
