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
