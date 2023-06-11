"use client";

import { Button, Flex, Heading, Link, Text } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import NextLink from "next/link";

const UnauthorizedUser: React.FC = () => {
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
        src="/lock.png"
        alt="banner"
        width={250}
        height={250}
        quality={85}
        title="error image"
        style={{ margin: "0 auto" }}
      />
      <Heading color="var(--chakra-colors-secondary)">
        Unauthorized Access
      </Heading>
      <Text>
        Sorry, you do not have permission to access this page. Please contact
        the administrator if you believe this is a mistake.
      </Text>
      <Link as={NextLink} w="full" href="/">
        <Button variant="form">Go to Home</Button>
      </Link>
    </Flex>
  );
};
export default UnauthorizedUser;
