import React from "react";
import { notFound } from "next/navigation";
import { firestore } from "@/firebase/firebaseApp";
import { collection, query, orderBy, limit } from "firebase/firestore";
import { getMovies } from "./_components/getMovie";
import MovieContainer from "./_components/MovieContainer";
export const revalidate = 86400 //3600 * 24;

const Movies = async (): Promise<JSX.Element> => {
  const moviesRef = collection(firestore, "movies");
  const q = query(moviesRef, orderBy("release_date", "desc"), limit(30));
  const movies = await getMovies(q);

  if (!movies.length) notFound();

  return <MovieContainer moviesData={movies} />;
};
export default Movies;
