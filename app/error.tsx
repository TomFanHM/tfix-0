"use client"; // Error components must be Client components

import MotionContainer from "@/components/container/MotionContainer";
import { light, dark } from "@/styles/chakra/colors";
import {
  Flex,
  Heading,
  Button,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";

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

  const color = useColorModeValue(light, dark);

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
        <Heading color={color.secondary}>Error</Heading>
        <Text>Something went wrong!</Text>
        <Button variant="form" onClick={() => reset()}>
          Try again
        </Button>
      </Flex>
    </MotionContainer>
  );
}
