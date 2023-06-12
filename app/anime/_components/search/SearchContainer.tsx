"use client";

import MotionContainer from "@/components/container/MotionContainer";
import { Button, Flex, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  Filters,
  generateAnimeSearchQuery,
  generateProductSearchQuery,
} from "./getQuery";
import { FormikProps, useFormik } from "formik";
import CategoryDropdown from "./CategoryDropdown";
import SearchBar from "./SearchBar";
import AnimeOptions from "./AnimeOptions";
import ProductOptions from "./ProductOptions";
import { AnimeData, getAnimes } from "../getAnimes";
import { ProductSchema, getProductsByFilter } from "../getProducts";
import { SortOptions } from "./sort";
import AnimeSearchResults from "./AnimeSearchResults";
import ProductSearchResults from "./ProductSearchResults";

type SearchQuery = {
  query: string;
} & Filters;

type SearchResults = {
  anime: AnimeData[] | null;
  product: ProductSchema[] | null;
};

const SearchContainer: React.FC = () => {
  const toast = useToast();
  const [category, setCategory] = useState<"anime" | "product">("anime");
  const [results, setResults] = useState<SearchResults>({
    anime: null,
    product: null,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [lastSearchTime, setLastSearchTime] = useState<number>(0);
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    anime: null,
    product: null,
  });

  const handleSortOptions = (
    value: SortOptions["anime"] | SortOptions["product"],
    sortCategory: "anime" | "product"
  ) => {
    setSortOptions((prev) => ({ ...prev, [sortCategory]: value }));
  };

  function searchErrorToast() {
    toast({
      title: "No results found",
      description: "Try searching for something else or change the filters.",
      variant: "solid",
      duration: 3000,
      status: "error",
      isClosable: true,
    });
  }

  const formik: FormikProps<SearchQuery> = useFormik<SearchQuery>({
    initialValues: {
      query: "",
      anime: {
        year: "",
        season: "",
        genre: "",
        studio: "",
      },
      product: {
        category: "",
        series: "",
      },
    },
    onSubmit: async (values) => {
      //return if search too fast
      const currentTime = Date.now();
      if (currentTime - lastSearchTime < 5 * 1000) {
        toast({
          title: "Please wait",
          description:
            "Don't search too fast. Please wait for 5 seconds between searches.",
          variant: "solid",
          duration: 3000,
          status: "error",
          isClosable: true,
        });
        return;
      }
      //search
      setLoading(true);
      try {
        if (category === "anime") {
          const query = generateAnimeSearchQuery(values.query, values.anime);
          const data = await getAnimes(query);
          if (data) setResults((prev) => ({ ...prev, anime: data }));
          if (!data.length) searchErrorToast();
        }
        if (category === "product") {
          const query = generateProductSearchQuery(
            values.query,
            values.product
          );
          const data = await getProductsByFilter(query);
          if (data) setResults((prev) => ({ ...prev, product: data }));
          if (!data || !data.length) searchErrorToast();
        }
      } catch (error) {
        console.log("Search error: ", error);
      }
      setLoading(false);
      setLastSearchTime(currentTime);
    },
  });

  const handleCategorySelect = (category: "anime" | "product") => {
    setCategory(category);
  };

  return (
    <MotionContainer maxW="container.xl">
      <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
        <Flex py="8" flexDirection="column" gap="4" align="center">
          <Flex
            w="full"
            maxW="40rem"
            bg="elevation.dp02"
            boxShadow="dp02"
            borderRadius="4"
            align="center"
            p="2"
          >
            <SearchBar
              query={formik.values.query}
              handleChange={formik.handleChange}
            />
            <CategoryDropdown
              category={category}
              handleCategorySelect={handleCategorySelect}
            />
          </Flex>
          {category === "anime" && (
            <AnimeOptions
              filters={formik.values.anime}
              handleChange={formik.handleChange}
              setFieldValue={formik.setFieldValue}
              sortOptions={sortOptions}
              handleSortOptions={handleSortOptions}
            />
          )}
          {category === "product" && (
            <ProductOptions
              filters={formik.values.product}
              handleChange={formik.handleChange}
              setFieldValue={formik.setFieldValue}
              sortOptions={sortOptions}
              handleSortOptions={handleSortOptions}
            />
          )}
          <Button
            type="submit"
            variant="custom_solid"
            w="full"
            maxW="40rem"
            isLoading={loading}
          >
            Apply
          </Button>
        </Flex>
      </form>

      {category === "anime" && results.anime && (
        <AnimeSearchResults data={results.anime} sort={sortOptions.anime} />
      )}

      {category === "product" && results.product && (
        <ProductSearchResults
          data={results.product}
          sort={sortOptions.product}
        />
      )}
    </MotionContainer>
  );
};

export default SearchContainer;
