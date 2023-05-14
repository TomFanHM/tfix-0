"use client";

import MotionContainer from "@/components/container/MotionContainer";
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Skeleton,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  Filters,
  generateAnimeSearchQuery,
  generateProductSearchQuery,
} from "./getQuery";
import { FormikProps, useFormik } from "formik";
import CategoryDropdown from "./CategoryDropdown";
import SearchBar from "./SearchBar";
import dynamic from "next/dynamic";
import { AnimeSchema, getAnimes } from "../getAnimes";
import SearchCard from "./SearchCard";
import { ProductSchema, getProductsByFilter } from "../getProducts";

const Loader = () => {
  return (
    <Stack maxW="40rem" mt="8">
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
    </Stack>
  );
};

const AnimeOptions = dynamic(() => import("./AnimeOptions"), {
  loading: () => <Loader />,
});
const ProductOptions = dynamic(() => import("./ProductOptions"), {
  loading: () => <Loader />,
});

//import AnimeOptions from "./AnimeOptions";
//import ProductOptions from "./ProductOptions";

type SearchQuery = {
  query: string;
} & Filters;

type SearchResults = {
  Anime: AnimeSchema[] | null;
  Product: ProductSchema[] | null;
};

const SearchContainer: React.FC = () => {
  const [category, setCategory] = useState<"Anime" | "Product">("Anime");
  const [results, setResults] = useState<SearchResults>({
    Anime: null,
    Product: null,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [lastSearchTime, setLastSearchTime] = useState<number>(0);

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
      const currentTime = Date.now();
      if (currentTime - lastSearchTime < 10 * 1000) {
        toast({
          title: "Please wait",
          description:
            "Don't search too fast. Please wait for 10 seconds between searches.",
          variant: "solid",
          duration: 3000,
          status: "error",
          isClosable: true,
        });
        return;
      }
      setLoading(true);

      try {
        if (category === "Anime") {
          const query = generateAnimeSearchQuery(values.query, values.anime);
          const data = await getAnimes(query);
          if (data) setResults((prev) => ({ ...prev, Anime: data }));
        }
        if (category === "Product") {
          const query = generateProductSearchQuery(
            values.query,
            values.product
          );
          const data = await getProductsByFilter(query);
          if (data) setResults((prev) => ({ ...prev, Product: data }));
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

  const toast = useToast();

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
              />
            </GridItem>
          ))}

        {category === "Product" &&
          results[category]?.map((el, i) => (
            <GridItem key={i} colSpan={{ base: 2, md: 1 }}>
              <SearchCard url={el.image} title={el.title} />
            </GridItem>
          ))}
      </Grid>
    </MotionContainer>
  );
};

export default SearchContainer;
