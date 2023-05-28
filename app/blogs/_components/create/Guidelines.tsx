"use client";

import { Divider, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";

const rules = [
  "Promote meaningful conversations",
  "Fact-check before sharing",
  "Discourage sensationalism",
  "Adhere to website-specific rules",
  "Embrace diverse perspectives",
];

const Guidelines: React.FC = () => {
  return (
    <Flex
      w="full"
      flexDirection="column"
      p="4"
      gap="4"
      mx="auto"
      borderRadius="20px"
      bg="elevation.dp02"
      boxShadow="dp02"
    >
      <Heading>Guidelines</Heading>
      <Divider />
      {rules.map((rule, i) => (
        <VStack key={i} align="start">
          <Text as="b">{`${i + 1}. ${rule}`}</Text>
          <Divider />
        </VStack>
      ))}
    </Flex>
  );
};
export default Guidelines;
