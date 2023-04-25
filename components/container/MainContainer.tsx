"use client";

import { footerDisabledRoute, headerDisabledRoute } from "@/config/site";
import { light, dark } from "@/styles/chakra/colors";
import {
  Center,
  Grid,
  GridItem,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import React, { Suspense } from "react";
import Footer from "../footer";
import Header from "../header";

type MainContainerProps = {
  children: React.ReactNode;
};

function getRouterName(pathname: string): string {
  const pathParts = pathname.split("/");
  return pathParts.length > 1 ? pathParts[1] : "";
}

const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
  const pathName = usePathname();
  const color = useColorModeValue(light, dark);

  const headerDisabled = headerDisabledRoute.includes(getRouterName(pathName));
  const footerDisabled = footerDisabledRoute.includes(getRouterName(pathName));

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
      <GridItem
        area="header"
        position="sticky"
        top="0"
        zIndex={99}
        display={headerDisabled ? "none" : "unset"}
      >
        <Header />
      </GridItem>
      <GridItem area="module" position="relative">
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
      <GridItem area="footer" display={footerDisabled ? "none" : "unset"}>
        <Footer />
      </GridItem>
    </Grid>
  );
};

export default MainContainer;
