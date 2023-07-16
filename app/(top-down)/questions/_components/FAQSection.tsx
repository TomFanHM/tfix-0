"use client";

import { Box, Flex, Grid, Heading, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { MdOutlineQuestionMark } from "react-icons/md";
import { FAQs } from "./FAQs";

type QuestionProps = {
  question: string;
  answer: string;
};

const Question: React.FC<QuestionProps> = ({ question, answer }) => {
  return (
    <Flex align="start">
      <Box borderRadius="md" bg="var(--primary)" color="var(--onPrimary)" p="2">
        <Icon as={MdOutlineQuestionMark} boxSize="6" aria-hidden="true" />
      </Box>
      <Box ml="4">
        <Text mt="4" fontWeight="semibold">
          {question}
        </Text>
        <Text mt="6" layerStyle="High-emphasis">
          {answer}
        </Text>
      </Box>
    </Flex>
  );
};

const FAQSection: React.FC = () => {
  return (
    <Box py={{ base: "24", sm: "32", md: "40" }}>
      {/* Heading */}
      <Flex
        flexDirection="column"
        gap="6"
        mx="auto"
        px={{ base: "4", sm: "6", lg: "8" }}
        textAlign="center"
      >
        <Heading size={{ base: "2xl", md: "4xl" }} fontWeight="bold">
          Questions & Answers
        </Heading>
        <Text as="b" size="lg" layerStyle="High-emphasis">
          Explore the common questions and answers about TFIX
        </Text>
      </Flex>
      {/* Question */}
      <Grid
        mt={{ base: "10", md: "20" }}
        gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gridGap="64px 16px"
      >
        {FAQs.map((el, i) => (
          <Question key={i} question={el.question} answer={el.answer} />
        ))}
      </Grid>
      {/* SupportLink */}
      <Flex justify="center" align="center" mt={{ base: "10", md: "20" }}>
        <Box
          px="8"
          py="4"
          textAlign="center"
          bg="var(--primary)"
          color="var(--onPrimary)"
          rounded="full"
        >
          <Text as="b">Didn’t find the answer you are looking for? </Text>
          <Text as="a" layerStyle="High-emphasis">
            Submit your request
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default FAQSection;
