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

type SearchBarProps = {
  searchQuery: string;
  handleSearchQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
  category: string;
  handleCategory: (e: "Animes" | "Products") => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  category,
  handleCategory,
  searchQuery,
  handleSearchQuery,
}) => {
  return (
    <HStack
      w="full"
      maxW="40rem"
      bg="elevation.dp02"
      boxShadow="dp02"
      borderRadius="4"
      spacing={0}
      px="4"
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
              <MenuItem onClick={() => handleCategory("Animes")}>
                Animes
              </MenuItem>
              <MenuItem onClick={() => handleCategory("Products")}>
                Products
              </MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
    </HStack>
  );
};
export default SearchBar;
