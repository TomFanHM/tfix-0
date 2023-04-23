import "@fontsource/roboto/400.css";
import "@fontsource/open-sans/400.css";

import { ThemeConfig, extendTheme } from "@chakra-ui/react";
import type { Styles, GlobalStyleProps } from "@chakra-ui/theme-tools";
import { dark, light } from "./colors";
import { elevation, shadows } from "./elevation";
import { skeletonTheme } from "./skeleton";
import { Button } from "./button";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const breakpoints = {
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
};

const styles: Styles = {
  global: (props: GlobalStyleProps) => ({
    body: {
      color:
        props.colorMode === "light" ? light.onBackground : dark.onBackground,
      bg: props.colorMode === "light" ? light.background : dark.background,
      maxW: "100vw",
      overflowX: "hidden",
    },
    "*::placeholder": { opacity: 0.6 },
    "*, *::before, &::after": {
      outlineColor: props.colorMode === "light" ? light.outline : dark.outline,
      padding: 0,
      margin: 0,
      boxSizing: "border-box",
      //outline: "1px solid green", //dev mode
    },
    a: {
      color: "inherit",
      textDecoration: "none",
    },
  }),
};

const theme = extendTheme({
  config,
  colors: {
    light,
    dark,
    elevation,
  },
  fonts: {
    heading: `'Roboto', sans-serif`,
    body: `'Open Sans', sans-serif`,
  },
  layerStyles: {
    "High-emphasis": {
      opacity: 0.87,
    },
    "Medium-emphasis": {
      opacity: 0.6,
    },
    Disabled: {
      opacity: 0.38,
    },
  },
  styles,
  shadows,
  breakpoints,
  components: {
    Skeleton: skeletonTheme,
    Button: Button,
  },
});

export { breakpoints, theme };
