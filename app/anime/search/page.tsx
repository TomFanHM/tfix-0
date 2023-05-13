"use client";

import MotionContainer from "@/components/container/MotionContainer";
import { Box, Flex, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";
import { FormikProps, useFormik } from "formik";
import CategoryDropdown from "./CategoryDropdown";
import SearchBar from "./SearchBar";
import dynamic from "next/dynamic";
import { Filters } from "./getData";

const Loader = () => {
  return (
    <Stack maxW="40rem" mx="auto">
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
  category: "Anime" | "Product";
} & Filters;

const Search: React.FC = () => {
  const formik: FormikProps<SearchQuery> = useFormik<SearchQuery>({
    initialValues: {
      query: "",
      category: "Anime",
      anime: {
        year: "",
        season: "",
        genres: "",
        studios: "",
      },
      product: {
        category: "",
        series: "",
      },
    },
    onSubmit: (values) => {},
  });

  const handleCategorySelect = (category: "Anime" | "Product") => {
    formik.setFieldValue("category", category);
  };

  return (
    <>
      <MotionContainer maxW="container.xl">
        <Flex py="8" minH="100vh" w="full" flexDirection="column" gap="4">
          <Box>
            {/* SearchBar */}
            <Flex
              w="full"
              maxW="40rem"
              bg="elevation.dp02"
              boxShadow="dp02"
              borderRadius="4"
              mx="auto"
              align="center"
              p="2"
            >
              <SearchBar
                query={formik.values.query}
                handleChange={formik.handleChange}
              />
              <CategoryDropdown
                category={formik.values.category}
                handleCategorySelect={handleCategorySelect}
              />
            </Flex>
            {formik.values.category === "Anime" && (
              <AnimeOptions
                filters={formik.values.anime}
                setFieldValue={formik.setFieldValue}
              />
            )}
            {formik.values.category === "Product" && (
              <ProductOptions
                filters={formik.values.product}
                setFieldValue={formik.setFieldValue}
              />
            )}
          </Box>
        </Flex>
      </MotionContainer>
    </>
  );
};
export default Search;
