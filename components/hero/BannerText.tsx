"use client";

import { Flex, GridItem, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

type BannerTextProps = {
  topText?: string;
  middleText?: string;
  bottomText?: string;
};

const BannerText: React.FC<BannerTextProps> = ({
  topText = "",
  middleText = "",
  bottomText = "",
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

  return (
    <GridItem colSpan={2} mx="10">
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
        whileInView="visible"
      >
        <Text as={motion.b} className="item" variants={item}>
          {topText}
        </Text>
        <Heading
          as={motion.h1}
          className="item"
          variants={item}
          mt="4"
          size={{ base: "2xl", md: "4xl" }}
        >
          {middleText}
        </Heading>
        <Text
          as={motion.b}
          className="item"
          variants={item}
          whiteSpace="pre-wrap"
          mt="6"
        >
          {bottomText}
        </Text>
      </Flex>
    </GridItem>
  );
};
export default BannerText;
