"use client";
import { Flex } from "@chakra-ui/react";
import React from "react";

type SectionCardProps = {};

const SectionCard: React.FC<SectionCardProps> = () => {
  return <Flex flexDirection={{ base: "row", row: "column" }} gap="8"></Flex>;
};
export default SectionCard;
