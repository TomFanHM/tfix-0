"use client";

import { light, dark } from "@/styles/chakra/colors";
import {
  Center,
  Grid,
  GridItem,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { Suspense } from "react";
import Footer from "../footer";
import Header from "../header";

type MainContainerProps = {
  children: React.ReactNode;
};

const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
  const color = useColorModeValue(light, dark);

  return (
    <Grid
      templateAreas={`"header""module""footer"`}
      gridTemplateRows={"min-content 1fr min-content"}
      gridTemplateColumns={"1fr"}
      minH="100vh"
      bg={color.background}
      color={color.onBackground}
      outlineColor={color.outline}
      sx={{
        "--chakra-colors-primary": color.primary,
        "--chakra-colors-onPrimary": color.onPrimary,
        "--chakra-colors-primaryContainer": color.primaryContainer,
        "--chakra-colors-onPrimaryContainer": color.onPrimaryContainer,
        "--chakra-colors-secondary": color.secondary,
        "--chakra-colors-onSecondary": color.onSecondary,
        "--chakra-colors-secondaryContainer": color.secondaryContainer,
        "--chakra-colors-onSecondaryContainer": color.onSecondaryContainer,
        "--chakra-colors-tertiary": color.tertiary,
        "--chakra-colors-onTertiary": color.onTertiary,
        "--chakra-colors-tertiaryContainer": color.tertiaryContainer,
        "--chakra-colors-onTertiaryContainer": color.onTertiaryContainer,
        "--chakra-colors-error": color.error,
        "--chakra-colors-errorContainer": color.errorContainer,
        "--chakra-colors-onError": color.onError,
        "--chakra-colors-onErrorContainer": color.onErrorContainer,
        "--chakra-colors-background": color.background,
        "--chakra-colors-onBackground": color.onBackground,
        "--chakra-colors-surface": color.surface,
        "--chakra-colors-onSurface": color.onSurface,
        "--chakra-colors-surfaceVariant": color.surfaceVariant,
        "--chakra-colors-onSurfaceVariant": color.onSurfaceVariant,
        "--chakra-colors-outline": color.outline,
        "--chakra-colors-inverseOnSurface": color.inverseOnSurface,
        "--chakra-colors-inverseSurface": color.inverseSurface,
        "--chakra-colors-inversePrimary": color.inversePrimary,
        "--chakra-colors-shadow": color.shadow,
        "--chakra-colors-surfaceTint": color.surfaceTint,
        "--chakra-colors-outlineVariant": color.outlineVariant,
        "--chakra-colors-scrim": color.scrim,
        "--chakra-colors-semiPrimaryContainer": color.semiPrimaryContainer,
      }}
    >
      <GridItem area="header" position="sticky" top="0" zIndex={99}>
        <Header />
      </GridItem>
      <GridItem area="module" position="relative" overflow="hidden">
        <Suspense
          fallback={
            <Center minH="calc(100vh - 4rem)">
              <Spinner color={color.primary} />
            </Center>
          }
        >
          {children}
        </Suspense>
      </GridItem>
      <GridItem area="footer">
        <Footer />
      </GridItem>
    </Grid>
  );
};

export default MainContainer;
