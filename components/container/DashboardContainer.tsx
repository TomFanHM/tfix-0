"use client";

import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";

type DashboardContainerProps = {
  children: React.ReactNode;
};

const DashboardContainer: React.FC<DashboardContainerProps> = ({
  children,
}) => {
  return (
    <Grid gridTemplateColumns="min-content 1fr" w="full" minH="100vh">
      <GridItem>{children && children[0 as keyof typeof children]}</GridItem>
      <GridItem>{children && children[1 as keyof typeof children]}</GridItem>
    </Grid>
  );
};

export default DashboardContainer;
