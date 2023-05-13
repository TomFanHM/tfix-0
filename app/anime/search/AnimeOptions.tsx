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
import { Filters } from "./getData";
import { Genres, Studios } from "./options";

type AnimeOptionsProps = {
  filters: Filters["anime"];
  setFieldValue: (field: string, value: any) => void;
};

const AnimeOptions: React.FC<AnimeOptionsProps> = ({
  filters,
  setFieldValue,
}) => {
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [sort, setSort] = useState<string | null>(null);
  //filter
  const resetFilters = () => {
    setFieldValue("anime.year", "");
    setFieldValue("anime.season", "");
    setFieldValue("anime.genres", "");
    setFieldValue("anime.studios", "");
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
          filters.genres ||
          filters.studios) && (
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
                {sort || "Sort"}
              </MenuButton>
              <MenuList>
                <MenuGroup title="Sort by">
                  <MenuItem onClick={() => setSort(null)}>Default</MenuItem>
                  <MenuItem onClick={() => setSort("Latest")}>Latest</MenuItem>
                  <MenuItem onClick={() => setSort("Popular")}>
                    Popular
                  </MenuItem>
                  <MenuItem onClick={() => setSort("Broadcast")}>
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
          <FormControl>
            <FormLabel>Year</FormLabel>
            <NumberInput
              value={filters.year}
              max={2050}
              min={2000}
              onChange={(_, el) => setFieldValue("anime.year", el)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>Season</FormLabel>
            <Select
              placeholder="Select season"
              value={filters.season}
              onChange={(el) => setFieldValue("anime.season", el.target.value)}
            >
              <option value={"winter"}>Winter</option>
              <option value={"spring"}>Spring</option>
              <option value={"summer"}>Summer</option>
              <option value={"fall"}>Fall</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Genre</FormLabel>
            <Select
              placeholder="Select genre"
              value={filters.genres}
              onChange={(el) => setFieldValue("anime.genres", el.target.value)}
            >
              {Genres.map((el, i) => (
                <option key={i} value={el}>
                  {el}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Studio</FormLabel>
            <Select
              placeholder="Select studio"
              value={filters.studios}
              onChange={(el) => setFieldValue("anime.studios", el.target.value)}
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
