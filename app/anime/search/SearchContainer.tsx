"use client";

import MotionContainer from "@/components/container/MotionContainer";
import { Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import AnimeOptions from "./AnimeOptions";
import ProductOptions from "./ProductOptions";
import { z } from "zod";
import { AnimeData } from "../getAnimes";
import { ProductSchema } from "../[slug]/getProducts";
import SearchCard from "./SearchCard";

export const Filters = z.object({
  anime: z.object({
    year: z.number().optional(),
    season: z.string().optional(),
  }),
  product: z.object({
    category: z.string().optional(),
  }),
});

export type Filters = z.infer<typeof Filters>;

const SearchContainer: React.FC = () => {
  const [category, setCategory] = useState<"Anime" | "Product">("Anime");
  const handleCategory = (e: "Anime" | "Product") => {
    setCategory(e);
  };
  const [searchQuery, setSearchQuery] = useState<string>("");
  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const [filters, setFilters] = useState<Filters>({
    anime: {
      year: 0,
      season: undefined,
    },
    product: {
      category: undefined,
    },
  });

  const handleFiltersChange = (
    select: "anime" | "product",
    newFilters: Partial<Filters["anime"]> | Partial<Filters["product"]>
  ) => {
    setFilters((prevState) => ({
      ...prevState,
      [select]: {
        ...prevState[select],
        ...newFilters,
      },
    }));
  };

  const [query, setQuery] = useState<string>("");
  const handleQuery = (el: string) => {
    setQuery(el);
  };

  const [results, setResults] = useState<{
    anime: AnimeData[] | null;
    product: ProductSchema[] | null;
  }>({ anime: null, product: null });
  //
  const handleResults = (el: AnimeData[] | ProductSchema[]) => {
    if (category === "Anime")
      setResults((prev) => ({ ...prev, anime: [...(el as AnimeData[])] }));

    if (category === "Product")
      setResults((prev) => ({
        ...prev,
        product: [...(el as ProductSchema[])],
      }));
  };

  return (
    <MotionContainer maxW="container.xl">
      <Flex py="8" minH="100vh" w="full" flexDirection="column" gap="4">
        {/* SearchBar */}
        <SearchBar
          category={category}
          searchQuery={searchQuery}
          handleCategory={handleCategory}
          handleSearchQuery={handleSearchQuery}
          filters={filters}
          handleQuery={handleQuery}
          handleResults={handleResults}
        />
        {/* Heading */}
        {query && (
          <Heading mt="8" mx="auto">
            {query}
          </Heading>
        )}
        {category === "Anime" && (
          <AnimeOptions
            filters={filters.anime}
            onFiltersChange={(newFilters) =>
              handleFiltersChange("anime", newFilters)
            }
          />
        )}
        {category === "Product" && (
          <ProductOptions
            filters={filters.product}
            onFiltersChange={(newFilters) =>
              handleFiltersChange("product", newFilters)
            }
          />
        )}
        <Grid
          templateColumns="repeat(12, 1fr)"
          gap="64px"
          py={{ base: "6", md: "8" }}
          my={{ base: "6", md: "8" }}
        >
          {category === "Anime" &&
            results["anime"] &&
            results["anime"].map((item, i) => (
              <GridItem key={i} colSpan={{ base: 6, sm: 4, md: 3 }}>
                <SearchCard
                  url={item.image}
                  title={item.title_english || item.title_japanese || "Unknown"}
                  link={`/anime/${item.id}`}
                />
              </GridItem>
            ))}
        </Grid>
      </Flex>
    </MotionContainer>
  );
};
export default SearchContainer;
