"use client";

import { Search2Icon } from "@chakra-ui/icons";
import {
  Flex,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";

const Guide: React.FC = () => {
  const router = useRouter();
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
          Explore endless anime options with our advanced search feature.
        </Heading>
        <InputGroup size="lg" _focus={{ outline: "none" }} mt="12" maxW="40rem">
          <InputLeftElement pointerEvents="none">
            <Search2Icon boxSize={4} />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search..."
            isReadOnly
            bg="elevation.dp02"
            boxShadow="dp02"
            onClick={() => router.push("/anime/search")}
          />
        </InputGroup>
      </Flex>
    </GridItem>
  );
};

export default Guide;
