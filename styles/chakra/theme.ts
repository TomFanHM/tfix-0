import { ThemeConfig, extendTheme } from "@chakra-ui/react";
import { elevation, shadows } from "./elevation";
import { skeletonTheme } from "./skeleton";
import { Button } from "./button";
import { breakpoints } from "./breakpoints";
import { styles } from "./styles";
import { dark, light } from "./colors";
import { menuTheme } from "./menu";
import { withProse } from "@nikolovlazar/chakra-ui-prose";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme(
  {
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
      Heading: {
        baseStyle: {},
      },
      Text: {
        baseStyle: {},
      },
    },
  },
  withProse()
);

export { theme };
