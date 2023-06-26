"use client";

import { Divider, Flex, Text, VStack } from "@chakra-ui/react";
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
      mx="auto"
      borderRadius="20px"
      bg="elevation.dp02"
      boxShadow="dp02"
    >
      <Text as="b" lineHeight="10">
        Guidelines
      </Text>
      <Divider />
      {rules.map((rule, i) => (
        <VStack key={i} align="start" mt="4" py="4">
          <Text>{`${i + 1}. ${rule}`}</Text>
          <Divider />
        </VStack>
      ))}
    </Flex>
  );
};
export default Guidelines;
