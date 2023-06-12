"use client";

import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Flex,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MdFilterListAlt, MdOutlineSort } from "react-icons/md";
import { Filters } from "./getQuery";
import { Genres, Studios } from "./options";
import { SortOptions } from "./sort";

type AnimeOptionsProps = {
  filters: Filters["anime"];
  handleChange: (e: React.ChangeEvent) => void;
  setFieldValue: (field: string, value: any) => void;
  sortOptions: SortOptions;
  handleSortOptions: (
    value: SortOptions["anime"] | SortOptions["product"],
    sortCategory: "anime" | "product"
  ) => void;
};

const AnimeOptions: React.FC<AnimeOptionsProps> = ({
  filters,
  handleChange,
  setFieldValue,
  sortOptions,
  handleSortOptions,
}) => {
  const [filterOpen, setFilterOpen] = useState<boolean>(false);

  //filter
  const resetFilters = () => {
    setFieldValue("anime.year", "");
    setFieldValue("anime.season", "");
    setFieldValue("anime.genre", "");
    setFieldValue("anime.studio", "");
  };

  return (
    <Flex
      w="full"
      maxW="40rem"
      mt="4"
      overflow="hidden"
      mx="auto"
      flexDirection="column"
      gap="4"
    >
      {/* Buttons */}
      <Flex justify="start" align="center" gap="4">
        <Button
          leftIcon={<Icon as={MdFilterListAlt} boxSize={6} />}
          variant="custom_outline"
          onClick={() => setFilterOpen((prev) => !prev)}
        >
          Filters
        </Button>

        {(filters.year ||
          filters.season ||
          filters.genre ||
          filters.studio) && (
          <Button
            leftIcon={<SmallCloseIcon />}
            variant="custom_outline_reverse"
            onClick={resetFilters}
          >
            Filters
          </Button>
        )}

        <Menu offset={[0, 24]}>
          {({ isOpen }) => (
            <>
              <MenuButton
                isActive={isOpen}
                variant="custom_outline"
                as={Button}
                leftIcon={<Icon as={MdOutlineSort} boxSize={6} />}
              >
                {sortOptions.anime || "Sort"}
              </MenuButton>
              <MenuList>
                <MenuGroup title="Sort by">
                  <MenuItem onClick={() => handleSortOptions(null, "anime")}>
                    Default
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleSortOptions("Latest", "anime")}
                  >
                    Latest
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleSortOptions("Popular", "anime")}
                  >
                    Popular
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleSortOptions("Broadcast", "anime")}
                  >
                    Broadcast
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </>
          )}
        </Menu>
      </Flex>
      {/* Filters */}
      {filterOpen && (
        <Flex gap="4" mt="4" flexDirection={{ base: "column", md: "row" }}>
          {/* Year */}
          <FormControl>
            <FormLabel htmlFor="anime.year">Year</FormLabel>
            <NumberInput
              id="anime.year"
              name="anime.year"
              value={filters.year}
              max={2050}
              min={2000}
              onChange={(_, num) => setFieldValue("anime.year", num)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          {/* Season */}
          <FormControl>
            <FormLabel htmlFor="anime.season">Season</FormLabel>
            <Select
              id="anime.season"
              name="anime.season"
              placeholder="Select season"
              value={filters.season}
              onChange={handleChange}
            >
              <option value={"winter"}>Winter</option>
              <option value={"spring"}>Spring</option>
              <option value={"summer"}>Summer</option>
              <option value={"fall"}>Fall</option>
            </Select>
          </FormControl>
          {/* Genre */}
          <FormControl>
            <FormLabel htmlFor="anime.genre">Genre</FormLabel>
            <Select
              id="anime.genre"
              name="anime.genre"
              placeholder="Select genre"
              value={filters.genre}
              onChange={handleChange}
              disabled={filters.studio !== ""}
            >
              {Genres.map((el, i) => (
                <option key={i} value={el}>
                  {el}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="anime.studio">Studio</FormLabel>
            <Select
              id="anime.studio"
              name="anime.studio"
              placeholder="Select studio"
              value={filters.studio}
              onChange={handleChange}
              disabled={filters.genre !== ""}
            >
              {Studios.map((el, i) => (
                <option key={i} value={el}>
                  {el}
                </option>
              ))}
            </Select>
          </FormControl>
        </Flex>
      )}
    </Flex>
  );
};
export default AnimeOptions;
