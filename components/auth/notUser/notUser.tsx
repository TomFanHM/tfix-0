"use client";

import { AuthModalState, authModalState } from "@/atoms/authModalAom";
import { Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";
import Image from "next/image";

const NotUser: React.FC = () => {
  const setAuthModalState = useSetRecoilState<AuthModalState>(authModalState);
  return (
    <Flex
      minH="calc(100vh - 4rem)"
      flexDirection="column"
      align="center"
      justify="center"
      gap="4"
      maxW="20rem"
      mx="auto"
    >
      <Image
        src="/cute_chicken.png"
        alt="banner"
        width={250}
        height={250}
        quality={85}
        title="error image"
        style={{ margin: "0 auto" }}
      />
      <Heading pointerEvents="none" color="var(--chakra-colors-secondary)">
        TFIX.
      </Heading>
      <Button
        variant="form"
        onClick={() => setAuthModalState({ open: true, view: "login" })}
      >
        Login
      </Button>
      <Button
        variant="form"
        onClick={() => setAuthModalState({ open: true, view: "signup" })}
      >
        Sign up
      </Button>
    </Flex>
  );
};
export default NotUser;
