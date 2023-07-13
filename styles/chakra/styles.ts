import type { Styles, GlobalStyleProps } from "@chakra-ui/theme-tools";
import { dark, light } from "./colors";

export const styles: Styles = {
  global: (props: GlobalStyleProps) => ({
    body: {
      maxW: "100vw",
      overflowX: "hidden",
    },
    "*::placeholder": { opacity: 0.6 },
    "*, *::before, &::after": {
      outlineColor: props.colorMode === "light" ? light.outline : dark.outline,
      padding: 0,
      margin: 0,
      boxSizing: "border-box",
      borderWidth: "0",
      borderStyle: "solid",
      //outline: "1px solid green", //dev mode
    },
    html: {
      tabSize: "4",
      lineHeight: "1.5",
    },
    a: {
      color: "inherit",
      textDecoration: "none",
    },
    "b, strong": {
      fontWeight: "border",
    },
  }),
};
