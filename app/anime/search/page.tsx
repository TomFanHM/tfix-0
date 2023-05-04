"use client";

import MotionContainer from "@/components/container/MotionContainer";
import { Stack, SimpleGrid, Text, Box, Flex, Grid } from "@chakra-ui/react";
import React, { useState } from "react";
import SearchBar from "./SearchBar";

const Search: React.FC = () => {
  const [category, setCategory] = useState("Animes");
  const handleCategory = (e: "Animes" | "Products") => {
    setCategory(e);
  };
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const [results, setResults] = useState([
    { title: "hi", description: "hello" },
  ]);
  const [searchSection, setSearchSection] = useState("");

  return (
    <MotionContainer maxW="container.xl">
      <Flex
        py="64px"
        w="full"
        flexDirection="column"
        justify="center"
        align="center"
      >
        <SearchBar
          category={category}
          searchQuery={searchQuery}
          handleCategory={handleCategory}
          handleSearchQuery={handleSearchQuery}
        />
      </Flex>
      <Grid
        templateColumns="repeat(12, 1fr)"
        gap="5" //1.25rem
        alignContent="center"
        w="full"
        mx="auto"
        pb={{ base: "10", md: "20" }}
      ></Grid>

      <Stack spacing={3}>
        {/* Render search results */}
        <SimpleGrid columns={3} spacing={10}>
          {results.map((result, index) => (
            <Box key={index} borderWidth="1px" borderRadius="lg" p={5}>
              <Text fontWeight="bold">{result.title}</Text>
              <Text>{result.description}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Stack>
    </MotionContainer>
  );
};
export default Search;
