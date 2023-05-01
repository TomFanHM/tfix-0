import React from "react";
import { getMovies } from "./getMovie";
import { notFound } from "next/navigation";
import MovieContainer from "./MovieContainer";
export const revalidate = 3600 * 24;

const Movies = async (): Promise<JSX.Element> => {
  const movies = await getMovies();

  if (!movies || !movies.length) notFound();

  return <MovieContainer getMovies={movies} />;
};
export default Movies;
