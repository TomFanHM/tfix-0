"use client";

import { Box } from "@chakra-ui/react";
import React from "react";

type GridLineProps = {
  children: React.ReactNode;
};

//this is a grid line component, which is used to create a grid line background

const GridLine: React.FC<GridLineProps> = ({ children }) => {
  return (
    <Box
      w="full"
      backgroundImage="linear-gradient(0deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)"
      _dark={{
        backgroundImage: "linear-gradient(0deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
      }}
      backgroundSize="100px 100px"
    >
      {children}
    </Box>
  );
};
export default GridLine;
