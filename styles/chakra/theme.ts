import "@fontsource/roboto/400.css";
import "@fontsource/open-sans/400.css";

import { ThemeConfig, extendTheme } from "@chakra-ui/react";
import { elevation, shadows } from "./elevation";
import { skeletonTheme } from "./skeleton";
import { Button } from "./button";
import { breakpoints } from "./breakpoints";
import { styles } from "./styles";
import { dark, light } from "./colors";
import { menuTheme } from "./menu";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  breakpoints,
  styles,
  shadows,
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
  components: {
    Skeleton: skeletonTheme,
    Button: Button,
    Menu: menuTheme,
  },
});

export { theme };
