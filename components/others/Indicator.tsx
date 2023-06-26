"use client";

import { Flex, Box } from "@chakra-ui/react";
import React from "react";

const Indicator: React.FC = () => {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <Flex
      position="fixed"
      p="4"
      bottom="0"
      left="0"
      zIndex={50}
      justify="center"
      align="center"
    >
      <Box display={{ base: "block", sm: "none" }}>base</Box>
      <Box display={{ base: "none", sm: "block", md: "none" }}>sm</Box>
      <Box display={{ base: "none", md: "block", lg: "none" }}>md</Box>
      <Box display={{ base: "none", lg: "block", xl: "none" }}>lg</Box>
      <Box display={{ base: "none", xl: "block", "2xl": "none" }}>xl</Box>
      <Box display={{ base: "none", "2xl": "block" }}>2xl</Box>
    </Flex>
  );
};
export default Indicator;
