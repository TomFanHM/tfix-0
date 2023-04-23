import { defineStyle, defineStyleConfig, cssVar } from "@chakra-ui/react";

const $startColor = cssVar("skeleton-start-color");
const $endColor = cssVar("skeleton-end-color");

const standard = defineStyle({
  _light: {
    [$startColor.variable]: "colors.light.onSurfaceVariant",
    [$endColor.variable]: "colors.transparent",
  },
  _dark: {
    [$startColor.variable]: "colors.dark.onSurfaceVariant",
    [$endColor.variable]: "colors.transparent",
  },
});

export const skeletonTheme = defineStyleConfig({
  variants: { standard },
});
