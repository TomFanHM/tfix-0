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
import { useRouter } from "next/navigation";
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
  const router = useRouter();

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
            <MenuItem
              key={i}
              borderRadius="8"
              bg={color.surface}
              color={color.onSurface}
              _hover={{ bg: color.primary, color: color.onPrimary }}
              onClick={() => router.push(item.href)}
            >
              {item.title}
            </MenuItem>
          ))}
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};
export default HeaderMenu;
