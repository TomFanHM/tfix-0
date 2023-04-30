"use client";

import { Flex, GridItem, Heading } from "@chakra-ui/react";
import React from "react";

const Guide: React.FC = () => {
  return (
    <GridItem colSpan={2}>
      <Flex
        flexDirection="column"
        textAlign="start"
        wordBreak="break-word"
        className="container"
        py={{ base: "10", md: "20" }}
      >
        <Heading layerStyle="Medium-emphasis" mt="4">
          What are you looking for?
        </Heading>
        <Heading whiteSpace="pre-wrap" mt="6">
          Unleash your curiosity with our extensive range of categories!
        </Heading>
        <Flex gap="4" flexDirection="row" flexWrap="wrap" mt="12"></Flex>
      </Flex>
    </GridItem>
  );
};
export default Guide;
