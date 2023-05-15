import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { dark, light } from "./colors";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

const baseStyle = definePartsStyle({
  list: {
    // this will style the MenuList component
    borderRadius: "20px",
    overflow: "hidden",
    p: "4",
    boxShadow: "dp08",
    bg: light.surface,
    color: light.onSurface,
    _dark: { bg: dark.surface, color: dark.onSurface },
  },
  item: {
    // this will style the MenuItem and MenuItemOption components
    borderRadius: "8",
    bg: light.surface,
    color: light.onSurface,
    _dark: {
      bg: dark.surface,
      color: dark.onSurface,
      _hover: {
        bg: dark.primary,
        color: dark.onPrimary,
      },
    },
    _hover: {
      bg: light.primary,
      color: light.onPrimary,
    },
  },
});

export const menuTheme = defineMultiStyleConfig({ baseStyle });
