"use client";

import { useScrollScale } from "@/hooks/useScrollScale";
import { Flex, Heading, Text, Box, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

type HeroBannerProps = {
  title: string;
  message: string;
  children?: React.ReactNode;
};

const HeroBanner: React.FC<HeroBannerProps> = ({
  title,
  message,
  children,
}) => {
  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const scale = useScrollScale(1, 10000, 1.1);

  return (
    <Box
      position="relative"
      w="full"
      maxW="full"
      h="70vh"
      minH="40rem"
      maxH="50rem"
      overflow="hidden"
    >
      <Box w="full" h="full" position="absolute" inset="0" overflow="hidden">
        {/* Canvas */}
      </Box>
      <Container
        maxW="container.lg"
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <Flex
          flexDirection="column"
          justify="center"
          align="center"
          gap="6"
          textAlign="center"
          //motion
          as={motion.div}
          className="container"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <Heading
            as={motion.h1}
            className="item"
            variants={item}
            size={{ base: "2xl", md: "4xl" }}
          >
            {title}
          </Heading>
          <Text as={motion.b} className="item" variants={item}>
            {message}
          </Text>
          {children && children}
        </Flex>
      </Container>
    </Box>
  );
};
export default HeroBanner;
