"use client";

import { Flex, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

type BannerTextProps = {
  line1: React.ReactNode;
  line2: React.ReactNode;
  line3: React.ReactNode;
};

const BannerText: React.FC<BannerTextProps> = ({ line1, line2, line3 }) => {
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
  return (
    <Flex
      flexDirection="column"
      align="center"
      py={{ base: "10", md: "20" }}
      textAlign="center"
      wordBreak="break-word"
      as={motion.div}
      className="container"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <Text as={motion.b} className="item" variants={item}>
        {line1}
      </Text>
      <Heading
        as={motion.h1}
        className="item"
        variants={item}
        mt="4"
        size={{ base: "2xl", md: "4xl" }}
        pb="4"
      >
        {line2}
      </Heading>
      <Text
        as={motion.b}
        className="item"
        variants={item}
        whiteSpace="pre-wrap"
        mt="2"
      >
        {line3}
      </Text>
    </Flex>
  );
};

export default BannerText;
