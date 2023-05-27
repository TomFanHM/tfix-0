"use client";

import { useScrollScale } from "@/hooks/useScrollScale";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

type HeroBannerProps = {
  title: React.ReactNode;
  message: React.ReactNode;
  image: string;
};

const HeroBanner: React.FC<HeroBannerProps> = ({ title, message, image }) => {
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

  const scale = useScrollScale(1, 1000, 1.1);
  return (
    <Flex
      position="relative"
      w="full"
      maxW="full"
      h="70vh"
      maxH="50rem"
      overflowX="hidden"
      align="center"
      justify="center"
    >
      <Box w="full" h="full" position="absolute" inset="0" overflow="hidden">
        {/* <Image /> */}
      </Box>
      <Container maxW="container.lg" zIndex={1}>
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
        </Flex>
      </Container>
    </Flex>
  );
};

export default HeroBanner;
