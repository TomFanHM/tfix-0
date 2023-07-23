import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

const baseStyle = definePartsStyle({
  list: {
    // this will style the MenuList component
    borderRadius: "20px",
    overflow: "hidden",
    p: "4",
    boxShadow: "dp08",
    bg: "var(--surface)",
    color: "var(--onSurface)",
  },
  item: {
    // this will style the MenuItem and MenuItemOption components
    borderRadius: "8",
    bg: "var(--surface)",
    color: "var(--onSurface)",
    _hover: {
      bg: "var(--primary)",
      color: "var(--onPrimary)",
    },
  },
});

export const menuTheme = defineMultiStyleConfig({ baseStyle });
