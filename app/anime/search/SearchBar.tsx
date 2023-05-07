"use client";

import { ChevronDownIcon, ChevronUpIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import { Filters } from "./SearchContainer";
import { AnimeData, getAnimes } from "../getAnimes";
import { OptionSchema } from "@/types/types";
import { ProductSchema } from "../[slug]/getProducts";

type SearchBarProps = {
  searchQuery: string;
  handleSearchQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
  category: "Anime" | "Product";
  handleCategory: (el: "Anime" | "Product") => void;
  filters: Filters;
  handleQuery: (el: string) => void;
  handleResults: (el: AnimeData[] | ProductSchema[]) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  category,
  handleCategory,
  searchQuery,
  handleSearchQuery,
  filters,
  handleQuery,
  handleResults,
}) => {
  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    try {
      handleQuery(searchQuery);
      //search anime
      if (category === "Anime") {
        const { year, season } = filters["anime"];
        const options: OptionSchema[] = [];
        if (season)
          options.push({
            fieldPath: "season",
            opStr: "==",
            value: season,
          });
        if (year)
          options.push({
            fieldPath: "year",
            opStr: "==",
            value: year,
          });
        if (searchQuery)
          options.push({
            fieldPath: "title_english",
            opStr: "==",
            value: searchQuery,
          });
        const results = await getAnimes(options, 10);
        if (results) handleResults(results);
      }
      //search product
      if (category === "Product") {
        const productFilters = filters["product"];
      }
    } catch (error) {
      console.log("Search error: ", error);
    }
  };

  return (
    <HStack
      w="full"
      maxW="40rem"
      bg="elevation.dp02"
      boxShadow="dp02"
      borderRadius="4"
      mx="auto"
      as="form"
      onSubmit={handleSubmit}
    >
      <InputGroup _focus={{ outline: "none" }} size="lg">
        <Input
          border="0"
          focusBorderColor="transparent"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchQuery}
        />
        <InputLeftElement pointerEvents="none">
          <Search2Icon boxSize={4} />
        </InputLeftElement>
      </InputGroup>
      <Menu offset={[0, 24]}>
        {({ isOpen }) => (
          <>
            <MenuButton
              isActive={isOpen}
              bg="transparent"
              variant="ghost"
              gap="4"
              as={Button}
              rightIcon={
                isOpen ? (
                  <ChevronUpIcon boxSize={4} />
                ) : (
                  <ChevronDownIcon boxSize={4} />
                )
              }
            >
              {category}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleCategory("Anime")}>Anime</MenuItem>
              <MenuItem onClick={() => handleCategory("Product")}>
                Product
              </MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
    </HStack>
  );
};
export default SearchBar;
