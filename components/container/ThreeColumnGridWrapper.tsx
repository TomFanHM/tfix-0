"use client";

import { Grid, GridProps } from "@chakra-ui/react";
import React from "react";

type ThreeColumnGridWrapperProps = {
  children: React.ReactNode;
} & GridProps;

const ThreeColumnGridWrapper: React.FC<ThreeColumnGridWrapperProps> = ({
  children,
  ...props
}) => {
  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
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
export default ThreeColumnGridWrapper;
