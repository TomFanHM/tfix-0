import { ComponentStyleConfig, StyleFunctionProps } from "@chakra-ui/react";
import { light, dark } from "./colors";
import { roboto } from "./fonts";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    fontFamily: roboto.style.fontFamily,
    transition: "250ms ease-in-out",
    cursor: "pointer",
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
    icon: (props: StyleFunctionProps) => ({
      bg: "transparent",
      _hover: {
        bg: props.colorMode === "light" ? light.secondary : dark.secondary,
        color:
          props.colorMode === "light" ? light.onSecondary : dark.onSecondary,
      },
    }),
    //
    custom_solid: (props: StyleFunctionProps) => ({
      borderRadius: "20px",
      bg: props.colorMode === "light" ? light.primary : dark.primary,
      color: props.colorMode === "light" ? light.onPrimary : dark.onPrimary,
      _hover: {
        bg: props.colorMode === "light" ? light.secondary : dark.secondary,
        color:
          props.colorMode === "light" ? light.onSecondary : dark.onSecondary,
      },
    }),
    custom_outline: (props: StyleFunctionProps) => ({
      borderRadius: "20px",
      border: "1px solid",
      borderColor: props.colorMode === "light" ? light.primary : dark.primary,
      bg: "transparent",
      color: props.colorMode === "light" ? light.primary : dark.primary,
      _hover: {
        bg: props.colorMode === "light" ? light.secondary : dark.secondary,
        color:
          props.colorMode === "light" ? light.onSecondary : dark.onSecondary,
        borderColor:
          props.colorMode === "light" ? light.onSecondary : dark.onSecondary,
      },
    }),
    custom_outline_reverse: (props: StyleFunctionProps) => ({
      borderRadius: "20px",
      border: "1px solid",
      borderColor: props.colorMode === "light" ? light.error : dark.error,
      bg: "transparent",
      color: props.colorMode === "light" ? light.error : dark.error,
      _hover: {
        bg: props.colorMode === "light" ? light.tertiary : dark.tertiary,
        color: props.colorMode === "light" ? light.onTertiary : dark.onTertiary,
        borderColor:
          props.colorMode === "light" ? light.onTertiary : dark.onTertiary,
      },
    }),
  },
};
