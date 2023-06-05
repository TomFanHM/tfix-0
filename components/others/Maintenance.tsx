"use client";

import { Flex, Heading, Button, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import MotionContainer from "../container/MotionContainer";
import Image from "next/image";

const Maintenance: React.FC = () => {
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
          src="/images/maintenance.png"
          alt="404 image"
          width={250}
          height={250}
          quality={85}
          title="404 image"
          style={{ margin: "0 auto" }}
        />
        <Heading color="var(--chakra-colors-secondary)">
          Page Under Maintenance
        </Heading>
        <Text>
          Please check back later for updates on when this page will be
          available again.
        </Text>
        <Link as={NextLink} w="full" href="/">
          <Button variant="form">Go to Home</Button>
        </Link>
      </Flex>
    </MotionContainer>
  );
};
export default Maintenance;
