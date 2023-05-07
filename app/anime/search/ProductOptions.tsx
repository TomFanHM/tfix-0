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
} from "@chakra-ui/react";
import { MdFilterListAlt, MdOutlineSort } from "react-icons/md";
import { Filters } from "./SearchContainer";

type ProductOptionsProps = {
  filters: Filters["product"];
  onFiltersChange: (newFilters: Partial<Filters["product"]>) => void;
};

const ProductOptions: React.FC<ProductOptionsProps> = ({
  filters,
  onFiltersChange,
}) => {
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [sort, setSort] = useState<string | null>(null);

  return (
    <>
      {/* Option */}
      <Flex
        mt="4"
        w="full"
        maxW="40rem"
        overflow="hidden"
        justify="start"
        gap="4"
        mx="auto"
      >
        <Button
          leftIcon={<Icon as={MdFilterListAlt} />}
          variant="custom_outline"
          onClick={() => setFilterOpen((prev) => !prev)}
        >
          Filters
        </Button>

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
                <MenuItem>ddd</MenuItem>
                <MenuItem>Broadcast</MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
      </Flex>
      {/* Filters */}
      {filterOpen && (
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          gap="4"
          mt="4"
          w="full"
          maxW="40rem"
          overflow="hidden"
          mx="auto"
        ></Flex>
      )}
    </>
  );
};
export default ProductOptions;
