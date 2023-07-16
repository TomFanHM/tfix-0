"use client";

import { Grid, GridItem } from "@chakra-ui/react";
import Footer from "../footer";
import Header from "../header";
import { AnimatePresence } from "framer-motion";

type MainContainerProps = {
  children: React.ReactNode;
};

const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
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
