"use client";

import React, { useState } from "react";
import { AnimeData } from "../getAnimes";
import {
  Flex,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  HStack,
  VStack,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
} from "@chakra-ui/react";
import { MdFilterListAlt, MdOutlineSort } from "react-icons/md";
import { Filters } from "./SearchContainer";
import { SmallCloseIcon } from "@chakra-ui/icons";

type AnimeOptionsProps = {
  filters: Filters["anime"];
  onFiltersChange: (newFilters: Partial<Filters["anime"]>) => void;
};

const AnimeOptions: React.FC<AnimeOptionsProps> = ({
  filters,
  onFiltersChange,
}) => {
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [sort, setSort] = useState<string | null>(null);
  //filter

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
      <HStack justify="start" align="center" spacing="4">
        <Button
          leftIcon={<Icon as={MdFilterListAlt} />}
          variant="custom_outline"
          onClick={() => setFilterOpen((prev) => !prev)}
        >
          Filters
        </Button>

        {(filters.year || filters.season) && (
          <Button
            leftIcon={<SmallCloseIcon />}
            variant="custom_outline_reverse"
            onClick={() => onFiltersChange({ year: 0, season: "" })}
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
                leftIcon={<Icon as={MdOutlineSort} />}
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
      </HStack>
      {/* Filters */}
      {filterOpen && (
        <VStack gap="4" mt="4">
          <FormControl>
            <FormLabel>Year</FormLabel>
            <NumberInput
              value={filters.year}
              max={2050}
              min={0}
              onChange={(_, el) => onFiltersChange({ year: el })}
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
              onChange={(el) => {
                console.log(el.target.value);

                onFiltersChange({ season: el.target.value });
              }}
            >
              <option value={"winter"}>Winter</option>
              <option value={"spring"}>Spring</option>
              <option value={"summer"}>Summer</option>
              <option value={"fall"}>Fall</option>
            </Select>
          </FormControl>
        </VStack>
      )}
    </Flex>
  );
};
export default AnimeOptions;
