"use client";

import { ThemeColor } from "@/styles/chakra/colors";
import { MainNavItem } from "@/types";
import {
  Button,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

type HeaderMenuProps = {
  buttonText: string;
  menuGroupTitle: string;
  navItems: MainNavItem[];
  color: ThemeColor;
};

const HeaderMenu: React.FC<HeaderMenuProps> = ({
  buttonText,
  menuGroupTitle,
  navItems,
  color,
}) => {
  return (
    <Menu offset={[0, 24]}>
      <MenuButton as={Button} variant="ghost">
        {buttonText}
      </MenuButton>
      <MenuList
        borderRadius="20px"
        overflow="hidden"
        p="4"
        boxShadow="dp08"
        bg={color.surface}
        color={color.onSurface}
      >
        <MenuGroup title={menuGroupTitle}>
          {navItems.map((item, i) => (
            <Link key={i} href={item.href}> 
              <MenuItem
                borderRadius="8"
                bg={color.surface}
                color={color.onSurface}
                _hover={{ bg: color.primary, color: color.onPrimary }}
              >
                {item.title}
              </MenuItem>
            </Link>
          ))}
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};
export default HeaderMenu;
