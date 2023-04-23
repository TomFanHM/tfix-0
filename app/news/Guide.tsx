"use client";

import { newsConfig } from "@/config/news";
import { Button, Flex, GridItem, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React from "react";

const Guide: React.FC = () => {
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

  const router = useRouter();

  return (
    <GridItem colSpan={3}>
      <Flex
        flexDirection="column"
        textAlign="start"
        wordBreak="break-word"
        as={motion.div}
        className="container"
        variants={container}
        initial="hidden"
        whileInView="visible"
        py={{ base: "10", md: "20" }}
      >
        <Heading layerStyle="Medium-emphasis" mt="4">
          What are you looking for?
        </Heading>
        <Heading whiteSpace="pre-wrap" mt="6">
          Unleash your curiosity with our extensive range of categories!
        </Heading>
        <Flex gap="4" flexDirection="row" flexWrap="wrap" mt="12">
          {newsConfig.mainNav &&
            newsConfig.mainNav.map((el, i) => (
              <Button
                key={i}
                as={motion.button}
                className="item"
                variants={item}
                onClick={() => router.push(el.href)}
              >
                {el.title}
              </Button>
            ))}
        </Flex>
      </Flex>
    </GridItem>
  );
};
export default Guide;
