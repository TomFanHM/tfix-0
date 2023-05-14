"use client";

import { newsConfig } from "@/config/news";
import { Button, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const Guide: React.FC = () => {
  return (
    <Flex
      flexDirection="column"
      textAlign="start"
      wordBreak="break-word"
      className="container"
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
            <Link href={el.href} key={i}>
              <Button className="item">{el.title}</Button>
            </Link>
          ))}
      </Flex>
    </Flex>
  );
};
export default Guide;
