"use client";

import MotionContainer from "@/components/container/MotionContainer";
import { light, dark } from "@/styles/chakra/colors";
import {
  useColorModeValue,
  Flex,
  Heading,
  Button,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function PageNotFound() {
  const router = useRouter();
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
        <Heading color={color.secondary}>404 - Not Found</Heading>
        <Text>Oops! The page you are looking for does not exist.</Text>
        <Button variant="form" onClick={() => router.push("/")}>
          Go to Home
        </Button>
      </Flex>
    </MotionContainer>
  );
}
