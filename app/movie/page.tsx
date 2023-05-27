import React from "react";
import { firestore } from "@/firebase/firebaseApp";
import { collection, query, orderBy, limit } from "firebase/firestore";
import { getMovies } from "./_components/getMovie";
import MovieContainer from "./_components/MovieContainer";
export const revalidate = 86400; //3600 * 24;

async function getData() {
  const moviesRef = collection(firestore, "movies");
  const q = query(moviesRef, orderBy("release_date", "desc"), limit(30));
  const data = await getMovies(q);

  if (!data.length) {
    throw new Error("Failed to fetch data");
  }

  return data;
}

const Movies = async (): Promise<JSX.Element> => {
  const movies = await getData();

  return <MovieContainer moviesData={movies} />;
};
export default Movies;
