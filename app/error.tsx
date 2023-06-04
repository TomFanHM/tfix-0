"use client"; // Error components must be Client components

import MotionContainer from "@/components/container/MotionContainer";
import { Flex, Heading, Button, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

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
          src="/images/error.png"
          alt="error image"
          width={250}
          height={250}
          quality={85}
          title="error image"
          style={{ margin: "0 auto" }}
        />
        <Heading color="var(--chakra-colors-secondary)">Error</Heading>
        <Text>Something went wrong! Please try again later.</Text>
        <Button variant="form" onClick={() => reset()}>
          Try again
        </Button>
      </Flex>
    </MotionContainer>
  );
}
