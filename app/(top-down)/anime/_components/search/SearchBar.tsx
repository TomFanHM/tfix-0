"use client";

import React from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

type SearchBarProps = {
  query: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ query, handleChange }) => {
  return (
    <InputGroup _focus={{ outline: "none" }} size="lg">
      <Input
        border="0"
        focusBorderColor="transparent"
        placeholder="Search..."
        id="query"
        name="query"
        type="text"
        value={query}
        onChange={handleChange}
      />
      <InputLeftElement pointerEvents="none">
        <Search2Icon boxSize={4} />
      </InputLeftElement>
    </InputGroup>
  );
};

export default SearchBar;
