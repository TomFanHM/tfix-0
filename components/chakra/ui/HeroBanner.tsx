"use client";

import { useScrollScale } from "@/hooks/useScrollScale";
import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import ScrollDownIndicator from "./ScrollDownIndicator";

type HeroBannerProps = {
  title: React.ReactNode;
  message: React.ReactNode;
  image: string;
  mobileImage: string;
};

const HeroBanner: React.FC<HeroBannerProps> = ({
  title,
  message,
  image,
  mobileImage,
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

  const scale = useScrollScale(1, 5000, 1.25);

  const isLargerThanMdSize = useBreakpointValue(
    { base: false, md: true },
    {
      fallback: "md",
    }
  );
  return (
    <Flex
      w="full"
      maxW="full"
      h="70vh"
      maxH="50rem"
      overflowX="hidden"
      align="center"
      justify="center"
    >
      <Box
        w="full"
        h="full"
        maxH="200vh"
        position="absolute"
        inset="0"
        overflow="hidden"
        zIndex={0}
      >
        <Box
          willChange="transform, opacity"
          position="relative"
          w="full"
          transform={`scale(${scale})`}
          opacity={2 - scale} //scale from 1 to 1.1
        >
          <Image
            src={isLargerThanMdSize ? image : mobileImage}
            w="full"
            h="full"
            objectFit="cover"
            alt="banner"
            color="transparent"
          />
        </Box>
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
          <ScrollDownIndicator />
        </Flex>
      </Container>
    </Flex>
  );
};

export default HeroBanner;
