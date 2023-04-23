"use client";

import { GridItem } from "@chakra-ui/react";
import React from "react";

const GridSpacer: React.FC = () => {
  return <GridItem py={{ base: "10", md: "20" }} colSpan={2}></GridItem>;
};
export default GridSpacer;
