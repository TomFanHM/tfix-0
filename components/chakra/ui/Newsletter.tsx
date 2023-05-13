"use client";

import { CalendarIcon, CheckCircleIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Flex,
  Text,
  Grid,
  GridItem,
  Heading,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const SubscribeForm: React.FC = () => {
  return (
    <VStack mt="6" spacing="4">
      <FormControl id="email-address">
        <Input
          name="email"
          type="email"
          borderRadius="md"
          px="3.5"
          py="2"
          bg="elevation.dp02"
          shadow="dp02"
          placeholder="Enter your email"
          size="lg"
        />
      </FormControl>
      <Button type="submit" variant="custom_solid" w="full">
        Subscribe
      </Button>
    </VStack>
  );
};

type FeatureProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <Flex direction="column" alignItems="start">
      <Box
        borderRadius="md"
        bg="var(--chakra-colors-primary)"
        color="var(--chakra-colors-onPrimary)"
        p="2"
      >
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

const NewsletterSection: React.FC = () => {
  return (
    <Box
      w="full"
      position="relative"
      overflow="hidden"
      py={{ base: "16", md: "24" }}
      mx="auto"
    >
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        gridGap={{ base: "8", md: "16" }}
        align="center"
      >
        <Box>
          <Heading size={{ base: "2xl", md: "4xl" }} fontWeight="bold">
            Subscribe to our newsletter
          </Heading>
          <Text mt="4" size="lg" layerStyle="High-emphasis">
            Don&apos;t miss out on the latest news, updates, and exclusive
            content! Subscribe to our newsletter by entering your email address
            below:
          </Text>
          <SubscribeForm />
        </Box>
        <Grid
          gridGap={{ base: "8", md: "10" }}
          gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
          alignItems="start"
        >
          <GridItem colSpan={1}>
            <Feature
              icon={<CalendarIcon boxSize="6" aria-hidden="true" />}
              title="Weekly articles"
              description="Get access to carefully curated articles every week, written by experts in various fields."
            />
          </GridItem>
          <GridItem colSpan={1}>
            <Feature
              icon={<CheckCircleIcon boxSize="6" aria-hidden="true" />}
              title="No spam"
              description="We value your privacy and promise never to spam your inbox. Our newsletter is focused on valuable content only."
            />
          </GridItem>
        </Grid>
      </Flex>
    </Box>
  );
};

export default NewsletterSection;
