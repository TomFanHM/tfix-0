"use client";

import { light, dark } from "@/styles/chakra/colors";
import { CalendarIcon, CheckCircleIcon } from "@chakra-ui/icons";
import {
  HStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useColorModeValue,
  Box,
  Flex,
  VStack,
  Text,
} from "@chakra-ui/react";
import React from "react";

const SubscribeForm: React.FC = () => {
  const color = useColorModeValue(light, dark);
  return (
    <HStack mt="6" maxW="md" spacing="4">
      <FormControl id="email-address">
        <FormLabel htmlFor="email-address">Email address</FormLabel>
        <Input
          name="email"
          type="email"
          autoComplete="email"
          required
          flex="1"
          borderRadius="md"
          bg="elevation.dp02"
          px="3.5"
          py="2"
          shadow="dp02"
          placeholder="Enter your email"
          size="sm"
        />
      </FormControl>
      <Button
        type="submit"
        borderRadius="md"
        bg={color.primary}
        color={color.onPrimary}
        px="3.5"
        py="2.5"
        fontSize="sm"
        fontWeight="semibold"
        shadow="dp02"
        _hover={{ bg: color.secondary, color: color.onSecondary }}
      >
        Subscribe
      </Button>
    </HStack>
  );
};

type FeatureProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  const color = useColorModeValue(light, dark);
  return (
    <Flex direction="column" alignItems="start">
      <Box borderRadius="md" bg={color.primary} color={color.onPrimary} p="2">
        {icon}
      </Box>
      <Text mt="4" fontWeight="semibold">
        {title}
      </Text>
      <Text mt="2" lineHeight="7" layerStyle="High-emphasis">
        {description}
      </Text>
    </Flex>
  );
};

interface NewsletterSectionProps {
  title: string;
  subtitle: string;
}

const NewsletterSection: React.FC<NewsletterSectionProps> = ({
  title,
  subtitle,
}) => {
  return (
    <Box
      position="relative"
      overflow="hidden"
      py={{ base: "16", sm: "24", lg: "32" }}
    >
      <Box maxW="7xl" mx="auto" px={{ base: "6", lg: "8" }}>
        <Flex
          maxW="2xl"
          mx="auto"
          flexDirection={{ base: "column", md: "row" }}
          gridGap={{ base: "8", lg: "16" }}
          align="center"
        >
          <Box maxW="xl">
            <Text fontSize={{ base: "3xl", sm: "4xl" }} fontWeight="bold">
              {title}
            </Text>
            <Text
              mt="4"
              fontSize="lg"
              lineHeight="8"
              layerStyle="High-emphasis"
            >
              {subtitle}
            </Text>
            <SubscribeForm />
          </Box>
          <VStack
            direction="row"
            gridGap={{ base: "8", sm: "10" }}
            gridTemplateColumns={{ base: "1fr", sm: "1fr 1fr" }}
            pt={{ lg: "2" }}
            alignItems="start"
          >
            <Feature
              icon={<CalendarIcon boxSize="6" aria-hidden="true" />}
              title="Weekly articles"
              description="Get access to carefully curated articles every week, written by experts in various fields."
            />
            <Feature
              icon={<CheckCircleIcon boxSize="6" aria-hidden="true" />}
              title="No spam"
              description="We value your privacy and promise never to spam your inbox. Our newsletter is focused on valuable content only."
            />
          </VStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default NewsletterSection;
