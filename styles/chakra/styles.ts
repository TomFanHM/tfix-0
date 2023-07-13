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
    ":root": {
      "--primary": props.colorMode === "light" ? light.primary : dark.primary,
      "--onPrimary":
        props.colorMode === "light" ? light.onPrimary : dark.onPrimary,
      "--primaryContainer":
        props.colorMode === "light"
          ? light.primaryContainer
          : dark.primaryContainer,
      "--onPrimaryContainer":
        props.colorMode === "light"
          ? light.onPrimaryContainer
          : dark.onPrimaryContainer,
      "--secondary":
        props.colorMode === "light" ? light.secondary : dark.secondary,
      "--onSecondary":
        props.colorMode === "light" ? light.onSecondary : dark.onSecondary,
      "--secondaryContainer":
        props.colorMode === "light"
          ? light.secondaryContainer
          : dark.secondaryContainer,
      "--onSecondaryContainer":
        props.colorMode === "light"
          ? light.onSecondaryContainer
          : dark.onSecondaryContainer,
      "--tertiary":
        props.colorMode === "light" ? light.tertiary : dark.tertiary,
      "--onTertiary":
        props.colorMode === "light" ? light.onTertiary : dark.onTertiary,
      "--tertiaryContainer":
        props.colorMode === "light"
          ? light.tertiaryContainer
          : dark.tertiaryContainer,
      "--onTertiaryContainer":
        props.colorMode === "light"
          ? light.onTertiaryContainer
          : dark.onTertiaryContainer,
      "--error": props.colorMode === "light" ? light.error : dark.error,
      "--errorContainer":
        props.colorMode === "light"
          ? light.errorContainer
          : dark.errorContainer,
      "--onError": props.colorMode === "light" ? light.onError : dark.onError,
      "--onErrorContainer":
        props.colorMode === "light"
          ? light.onErrorContainer
          : dark.onErrorContainer,
      "--background":
        props.colorMode === "light" ? light.background : dark.background,
      "--onBackground":
        props.colorMode === "light" ? light.onBackground : dark.onBackground,
      "--surface": props.colorMode === "light" ? light.surface : dark.surface,
      "--onSurface":
        props.colorMode === "light" ? light.onSurface : dark.onSurface,
      "--surfaceVariant":
        props.colorMode === "light"
          ? light.surfaceVariant
          : dark.surfaceVariant,
      "--onSurfaceVariant":
        props.colorMode === "light"
          ? light.onSurfaceVariant
          : dark.onSurfaceVariant,
      "--outline": props.colorMode === "light" ? light.outline : dark.outline,
      "--inverseOnSurface":
        props.colorMode === "light"
          ? light.inverseOnSurface
          : dark.inverseOnSurface,
      "--inverseSurface":
        props.colorMode === "light"
          ? light.inverseSurface
          : dark.inverseSurface,
      "--inversePrimary":
        props.colorMode === "light"
          ? light.inversePrimary
          : dark.inversePrimary,
      "--shadow": props.colorMode === "light" ? light.shadow : dark.shadow,
      "--surfaceTint":
        props.colorMode === "light" ? light.surfaceTint : dark.surfaceTint,
      "--outlineVariant":
        props.colorMode === "light"
          ? light.outlineVariant
          : dark.outlineVariant,
      "--scrim": props.colorMode === "light" ? light.scrim : dark.scrim,
      "--semiPrimaryContainer":
        props.colorMode === "light"
          ? light.semiPrimaryContainer
          : dark.semiPrimaryContainer,
    },
  }),
};
