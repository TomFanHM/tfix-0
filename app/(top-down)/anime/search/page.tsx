import React from "react";
import SearchContainer from "../_components/search/SearchContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anime Search - Find Your Favorite Anime and Merchandise",
  description:
    "Search for your favorite anime and anime products on our website. We provide a comprehensive database of anime series, movies, and merchandise. Browse our catalog and find the perfect item to add to your collection.",
};

const Search: React.FC = () => {
  return <SearchContainer />;
};
export default Search;
