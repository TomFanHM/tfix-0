"use client";

import MotionContainer from "@/components/container/MotionContainer";
import { Button, Flex, Grid, GridItem, useToast } from "@chakra-ui/react";
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
import SearchCard from "./SearchCard";
import { ProductSchema, getProductsByFilter } from "../getProducts";

type SearchQuery = {
  query: string;
} & Filters;

type SearchResults = {
  Anime: AnimeData[] | null;
  Product: ProductSchema[] | null;
};

type SortOptions = {
  Anime: null | "Latest" | "Popular" | "Broadcast";
  Product: null | "Price" | "Release Date";
};

const SearchContainer: React.FC = () => {
  const toast = useToast();
  const [category, setCategory] = useState<"Anime" | "Product">("Anime");
  const [results, setResults] = useState<SearchResults>({
    Anime: null,
    Product: null,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [lastSearchTime, setLastSearchTime] = useState<number>(0);
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    Anime: null,
    Product: null,
  });

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
        if (category === "Anime") {
          const query = generateAnimeSearchQuery(values.query, values.anime);
          const data = await getAnimes(query);
          if (data) setResults((prev) => ({ ...prev, Anime: data }));
          if (!data.length) searchErrorToast();
        }
        if (category === "Product") {
          const query = generateProductSearchQuery(
            values.query,
            values.product
          );
          const data = await getProductsByFilter(query);
          if (data) setResults((prev) => ({ ...prev, Product: data }));
          if (!data || !data.length) searchErrorToast();
        }
      } catch (error) {
        console.log("Search error: ", error);
      }
      setLoading(false);
      setLastSearchTime(currentTime);
    },
  });

  const handleCategorySelect = (category: "Anime" | "Product") => {
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
          {category === "Anime" && (
            <AnimeOptions
              filters={formik.values.anime}
              handleChange={formik.handleChange}
              setFieldValue={formik.setFieldValue}
            />
          )}
          {category === "Product" && (
            <ProductOptions
              filters={formik.values.product}
              handleChange={formik.handleChange}
              setFieldValue={formik.setFieldValue}
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
      <Grid
        templateColumns="repeat(4, 1fr)"
        gap="4"
        mx="auto"
        pb={{ base: "10", md: "20" }}
      >
        {category === "Anime" &&
          results[category]?.map((el, i) => (
            <GridItem key={i} colSpan={{ base: 2, md: 1 }}>
              <SearchCard
                url={el.image}
                title={el.title_english || el.title_japanese || ""}
                href={`/anime/${el.id}`}
              />
            </GridItem>
          ))}

        {category === "Product" &&
          results[category]?.map((el, i) => (
            <GridItem key={i} colSpan={{ base: 2, md: 1 }}>
              <SearchCard url={el.image} title={el.title} source={el.link} />
            </GridItem>
          ))}
      </Grid>
    </MotionContainer>
  );
};

export default SearchContainer;
