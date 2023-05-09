import type { Styles, GlobalStyleProps } from "@chakra-ui/theme-tools";
import { dark, light } from "./colors";

export const styles: Styles = {
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
    ":root": {
      "--chakra-colors-primary":
        props.colorMode === "light" ? light.primary : dark.primary,
      "--chakra-colors-onPrimary":
        props.colorMode === "light" ? light.onPrimary : dark.onPrimary,
      "--chakra-colors-primaryContainer":
        props.colorMode === "light"
          ? light.primaryContainer
          : dark.primaryContainer,
      "--chakra-colors-onPrimaryContainer":
        props.colorMode === "light"
          ? light.onPrimaryContainer
          : dark.onPrimaryContainer,
      "--chakra-colors-secondary":
        props.colorMode === "light" ? light.secondary : dark.secondary,
      "--chakra-colors-onSecondary":
        props.colorMode === "light" ? light.onSecondary : dark.onSecondary,
      "--chakra-colors-secondaryContainer":
        props.colorMode === "light"
          ? light.secondaryContainer
          : dark.secondaryContainer,
      "--chakra-colors-onSecondaryContainer":
        props.colorMode === "light"
          ? light.onSecondaryContainer
          : dark.onSecondaryContainer,
      "--chakra-colors-tertiary":
        props.colorMode === "light" ? light.tertiary : dark.tertiary,
      "--chakra-colors-onTertiary":
        props.colorMode === "light" ? light.onTertiary : dark.onTertiary,
      "--chakra-colors-tertiaryContainer":
        props.colorMode === "light"
          ? light.tertiaryContainer
          : dark.tertiaryContainer,
      "--chakra-colors-onTertiaryContainer":
        props.colorMode === "light"
          ? light.onTertiaryContainer
          : dark.onTertiaryContainer,
      "--chakra-colors-error":
        props.colorMode === "light" ? light.error : dark.error,
      "--chakra-colors-errorContainer":
        props.colorMode === "light"
          ? light.errorContainer
          : dark.errorContainer,
      "--chakra-colors-onError":
        props.colorMode === "light" ? light.onError : dark.onError,
      "--chakra-colors-onErrorContainer":
        props.colorMode === "light"
          ? light.onErrorContainer
          : dark.onErrorContainer,
      "--chakra-colors-background":
        props.colorMode === "light" ? light.background : dark.background,
      "--chakra-colors-onBackground":
        props.colorMode === "light" ? light.onBackground : dark.onBackground,
      "--chakra-colors-surface":
        props.colorMode === "light" ? light.surface : dark.surface,
      "--chakra-colors-onSurface":
        props.colorMode === "light" ? light.onSurface : dark.onSurface,
      "--chakra-colors-surfaceVariant":
        props.colorMode === "light"
          ? light.surfaceVariant
          : dark.surfaceVariant,
      "--chakra-colors-onSurfaceVariant":
        props.colorMode === "light"
          ? light.onSurfaceVariant
          : dark.onSurfaceVariant,
      "--chakra-colors-outline":
        props.colorMode === "light" ? light.outline : dark.outline,
      "--chakra-colors-inverseOnSurface":
        props.colorMode === "light"
          ? light.inverseOnSurface
          : dark.inverseOnSurface,
      "--chakra-colors-inverseSurface":
        props.colorMode === "light"
          ? light.inverseSurface
          : dark.inverseSurface,
      "--chakra-colors-inversePrimary":
        props.colorMode === "light"
          ? light.inversePrimary
          : dark.inversePrimary,
      "--chakra-colors-shadow":
        props.colorMode === "light" ? light.shadow : dark.shadow,
      "--chakra-colors-surfaceTint":
        props.colorMode === "light" ? light.surfaceTint : dark.surfaceTint,
      "--chakra-colors-outlineVariant":
        props.colorMode === "light"
          ? light.outlineVariant
          : dark.outlineVariant,
      "--chakra-colors-scrim":
        props.colorMode === "light" ? light.scrim : dark.scrim,
      "--chakra-colors-semiPrimaryContainer":
        props.colorMode === "light"
          ? light.semiPrimaryContainer
          : dark.semiPrimaryContainer,
    },
  }),
};
