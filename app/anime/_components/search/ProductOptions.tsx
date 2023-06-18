"use client";

import React, { useState } from "react";
import {
  Flex,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { MdFilterListAlt, MdOutlineSort } from "react-icons/md";
import { Filters } from "./getQuery";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { SortOptions } from "./sort";

type ProductOptionsProps = {
  filters: Filters["product"];
  handleChange: (e: React.ChangeEvent) => void;
  setFieldValue: (field: string, value: any) => void;
  sortOptions: SortOptions;
  handleSortOptions: (
    value: SortOptions["anime"] | SortOptions["product"],
    sortCategory: "anime" | "product"
  ) => void;
};

const ProductOptions: React.FC<ProductOptionsProps> = ({
  filters,
  handleChange,
  setFieldValue,
  sortOptions,
  handleSortOptions,
}) => {
  const [filterOpen, setFilterOpen] = useState<boolean>(false);

  const resetFilters = () => {
    setFieldValue("product.category", "");
    setFieldValue("product.series", "");
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

        {(filters.category || filters.series) && (
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
                {sortOptions.product || "Sort"}
              </MenuButton>
              <MenuList>
                <MenuGroup title="Sort by">
                  <MenuItem onClick={() => handleSortOptions(null, "product")}>
                    Default
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleSortOptions("Price", "product")}
                  >
                    Price
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleSortOptions("Release Date", "product")}
                  >
                    Release Date
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
            <FormLabel htmlFor="product.category">Category</FormLabel>
            <Input
              id="product.category"
              name="product.category"
              placeholder="Nendoroid, 1/7th Scale, etc."
              value={filters.category}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="product.series">Series</FormLabel>
            <Input
              id="product.series"
              name="product.series"
              placeholder="Enter product series"
              value={filters.series}
              onChange={handleChange}
            />
          </FormControl>
        </Flex>
      )}
    </Flex>
  );
};
export default ProductOptions;
