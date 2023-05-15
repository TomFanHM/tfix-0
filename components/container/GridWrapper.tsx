"use client";

import { Grid, GridProps } from "@chakra-ui/react";
import React from "react";

type GridWrapperProps = {
  children: React.ReactNode;
} & GridProps;

const GridWrapper: React.FC<GridWrapperProps> = ({ children, ...props }) => {
  return (
    <Grid
      gridTemplateColumns="1fr 1fr"
      gap="6"
      alignContent="center"
      w="full"
      mx="auto"
      pb={{ base: "10", md: "20" }}
      {...props}
    >
      {children}
    </Grid>
  );
};

export default GridWrapper;
