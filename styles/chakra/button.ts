import "@fontsource/roboto/400.css";

import { ComponentStyleConfig, StyleFunctionProps } from "@chakra-ui/react";
import { light, dark } from "./colors";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    fontFamily: `'Roboto', sans-serif`,
    transition: "250ms ease-in-out",
  },
  variants: {
    //
    form: (props: StyleFunctionProps) => ({
      w: "full",
      borderRadius: "20px",
      border: "1px solid",
      borderColor:
        props.colorMode === "light" ? light.onSurface : dark.onSurface,
      position: "relative",
      overflow: "hidden",
      zIndex: 1,
      color: props.colorMode === "light" ? light.onSurface : dark.onSurface,
      _before: {
        content: '""',
        position: "absolute",
        inset: 0,
        bg: props.colorMode === "light" ? light.secondary : dark.secondary,
        transform: "scaleX(0)",
        transformOrigin: "left",
        zIndex: -1,
        transition: "250ms ease-in-out",
      },
      _hover: {
        color:
          props.colorMode === "light" ? light.onSecondary : dark.onSecondary,
        _before: {
          transform: "scaleX(1)",
        },
      },
    }),
    //
    icon: {
      bg: "transparent",
      _hover: {
        bg: "var(--chakra-colors-secondary)",
        color: "var(--chakra-colors-onSecondary)",
      },
    },
    //
    custom_solid: {
      borderRadius: "20px",
      bg: "var(--chakra-colors-primary)",
      color: "var(--chakra-colors-onPrimary)",
      _hover: {
        bg: "var(--chakra-colors-secondary)",
        color: "var(--chakra-colors-onSecondary)",
      },
    },
    custom_outline: {
      borderRadius: "20px",
      border: "1px solid",
      borderColor: "var(--chakra-colors-primary)",
      bg: "transparent",
      color: "var(--chakra-colors-primary)",
      _hover: {
        bg: "var(--chakra-colors-secondary)",
        color: "var(--chakra-colors-onSecondary)",
        borderColor: "var(--chakra-colors-onSecondary)",
      },
    },
    custom_outline_reverse: {
      borderRadius: "20px",
      border: "1px solid",
      borderColor: "var(--chakra-colors-error)",
      bg: "transparent",
      color: "var(--chakra-colors-error)",
      _hover: {
        bg: "var(--chakra-colors-tertiary)",
        color: "var(--chakra-colors-onTertiary)",
        borderColor: "var(--chakra-colors-onTertiary)",
      },
    },
  },
};
