"use client";

import MotionContainer from "@/components/container/MotionContainer";
import { Flex, Heading, Button, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";

export default function PageNotFound() {
  return (
    <MotionContainer>
      <Flex
        minH="calc(100vh - 4rem)"
        flexDirection="column"
        align="start"
        justify="center"
        gap="1rem"
        maxW="20rem"
        mx="auto"
      >
        <Heading color="var(--chakra-colors-secondary)">
          404 - Not Found
        </Heading>
        <Text>Oops! The page you are looking for does not exist.</Text>
        <Link as={NextLink} w="full" href="/">
          <Button variant="form">Go to Home</Button>
        </Link>
      </Flex>
    </MotionContainer>
  );
}
