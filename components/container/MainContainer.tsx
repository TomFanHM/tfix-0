"use client";

import { Grid, GridItem, useColorModeValue } from "@chakra-ui/react";
import Footer from "../footer";
import Header from "../header";
import { AnimatePresence } from "framer-motion";
import { light, dark } from "@/styles/chakra/colors";

type MainContainerProps = {
  children: React.ReactNode;
};

const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
  const color = useColorModeValue(light, dark);
  return (
    <>
      <Grid
        templateAreas={`"header""module""footer"`}
        gridTemplateRows={"min-content 1fr min-content"}
        gridTemplateColumns={"1fr"}
        minH="100vh"
        bg="var(--background)"
        color="var(--onBackground)"
        outlineColor="var(--outline)"
        sx={{
          "--primary": color.primary,
          "--onPrimary": color.onPrimary,
          "--primaryContainer": color.primaryContainer,
          "--onPrimaryContainer": color.onPrimaryContainer,
          "--secondary": color.secondary,
          "--onSecondary": color.onSecondary,
          "--secondaryContainer": color.secondaryContainer,
          "--onSecondaryContainer": color.onSecondaryContainer,
          "--tertiary": color.tertiary,
          "--onTertiary": color.onTertiary,
          "--tertiaryContainer": color.tertiaryContainer,
          "--onTertiaryContainer": color.onTertiaryContainer,
          "--error": color.error,
          "--errorContainer": color.errorContainer,
          "--onError": color.onError,
          "--onErrorContainer": color.onErrorContainer,
          "--background": color.background,
          "--onBackground": color.onBackground,
          "--surface": color.surface,
          "--onSurface": color.onSurface,
          "--surfaceVariant": color.surfaceVariant,
          "--onSurfaceVariant": color.onSurfaceVariant,
          "--outline": color.outline,
          "--inverseOnSurface": color.inverseOnSurface,
          "--inverseSurface": color.inverseSurface,
          "--inversePrimary": color.inversePrimary,
          "--shadow": color.shadow,
          "--surfaceTint": color.surfaceTint,
          "--outlineVariant": color.outlineVariant,
          "--scrim": color.scrim,
          "--semiPrimaryContainer": color.semiPrimaryContainer,
        }}
      >
        <GridItem
          area="header"
          position="sticky"
          top="0"
          zIndex={99}
          as="header"
          maxH="4rem"
        >
          <Header />
        </GridItem>
        <GridItem
          area="module"
          position="relative"
          minH="calc(100vh - 4rem)"
          overflow="hidden"
        >
          <AnimatePresence mode="wait">{children}</AnimatePresence>
        </GridItem>
        <GridItem area="footer">
          <Footer />
        </GridItem>
      </Grid>
    </>
  );
};

export default MainContainer;
