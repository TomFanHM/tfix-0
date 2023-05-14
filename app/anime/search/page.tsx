import React from "react";
import dynamic from "next/dynamic";
const SearchContainer = dynamic(
  () => import("../_components/search/SearchContainer")
);

const Search: React.FC = () => {
  return <SearchContainer />;
};
export default Search;
