"use client";

import MotionContainer from "@/components/container/MotionContainer";
import { Flex, Heading, Button, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import Image from "next/image";

export default function PageNotFound() {
  return (
    <MotionContainer>
      <Flex
        minH="calc(100vh - 4rem)"
        flexDirection="column"
        align="start"
        justify="center"
        gap="4"
        maxW="20rem"
        mx="auto"
      >
        <Image
          src="/not_found.png"
          alt="404 image"
          width={250}
          height={250}
          quality={85}
          title="404 image"
          style={{ margin: "0 auto" }}
          priority
        />
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
