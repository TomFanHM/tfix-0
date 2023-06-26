"use client";

import React from "react";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

type CategoryDropdownProps = {
  category: "anime" | "product";
  handleCategorySelect: (category: "anime" | "product") => void;
};

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  category,
  handleCategorySelect,
}) => {
  return (
    <Menu offset={[0, 24]}>
      {({ isOpen }) => (
        <>
          <MenuButton
            isActive={isOpen}
            variant="ghost"
            gap="4"
            as={Button}
            rightIcon={
              isOpen ? (
                <ChevronUpIcon boxSize={6} />
              ) : (
                <ChevronDownIcon boxSize={6} />
              )
            }
          >
            {category === "anime" ? "Anime" : "Product"}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleCategorySelect("anime")}>
              Anime
            </MenuItem>
            <MenuItem onClick={() => handleCategorySelect("product")}>
              Product
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default CategoryDropdown;
