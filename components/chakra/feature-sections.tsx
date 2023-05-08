"use client";

import { light, dark } from "@/styles/chakra/colors";
import {
  VStack,
  Flex,
  Heading,
  Icon,
  Box,
  Text,
  useColorModeValue,
  Grid,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import React from "react";

type FeatureItemProps = {
  name: string;
  description: string;
  IconComponent: IconType;
};

const FeatureItem: React.FC<FeatureItemProps> = ({
  name,
  description,
  IconComponent,
}) => {
  const color = useColorModeValue(light, dark);
  return (
    <VStack align="start" spacing={2} pl={16} position="relative">
      <Box
        position="absolute"
        left={0}
        top={0}
        borderRadius="lg"
        bg={color.primary}
        h={10}
        w={10}
      >
        <Flex
          align="center"
          justify="center"
          h="100%"
          w="100%"
          color={color.onPrimary}
        >
          <Icon as={IconComponent} fontSize="24px" />
        </Flex>
      </Box>
      <Heading as="dt" size="sm" fontWeight="semibold">
        {name}
      </Heading>
      <Text as="dd">{description}</Text>
    </VStack>
  );
};

type FeatureSectionsProps = {
  heading: string;
  description: string;
  contents: string;
  features: { name: string; description: string; icon: IconType }[];
};

const FeatureSections: React.FC<FeatureSectionsProps> = ({
  heading,
  description,
  contents,
  features,
}) => {
  const color = useColorModeValue(light, dark);
  return (
    <Box py={["6rem", "8rem"]}>
      <Box maxW="7xl" px={["6", "8"]} mx="auto">
        <VStack mx="auto" maxW="2xl" textAlign={["left", "center"]}>
          <Heading
            as="h2"
            size="sm"
            fontWeight="semibold"
            color={color.primary}
          >
            {heading}
          </Heading>
          <Heading as="p" size="2xl" fontWeight="bold" mt={2}>
            {description}
          </Heading>
          <Text mt={6} layerStyle="High-emphasis">
            {contents}
          </Text>
        </VStack>
        <Grid
          mt={["16", "20", "24"]}
          mx="auto"
          maxW="2xl"
          gap={["8", "16"]}
          templateColumns={["1fr", null, "repeat(2, 1fr)"]}
        >
          {features.map((feature, i) => (
            <FeatureItem
              key={i}
              name={feature.name}
              description={feature.description}
              IconComponent={feature.icon}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default FeatureSections;
