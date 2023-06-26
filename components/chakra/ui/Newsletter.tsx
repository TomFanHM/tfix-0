"use client";

import { CalendarIcon, CheckCircleIcon } from "@chakra-ui/icons";
import {
  FormControl,
  Input,
  Button,
  Box,
  Flex,
  Text,
  Grid,
  GridItem,
  Heading,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";

const SubscribeForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    //
    setEmail("");
    toast({
      title: "Thank you for subscribing to our website.",
      variant: "solid",
      status: "success",
      isClosable: true,
    });
  };

  return (
    <VStack mt="6" spacing="4" as="form" onSubmit={handleSubmit}>
      <FormControl id="email-address" isRequired>
        <Input
          name="email"
          type="email"
          borderRadius="md"
          px="4"
          py="4"
          bg="elevation.dp02"
          shadow="dp02"
          placeholder="Enter your email"
          size="lg"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
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
      <Text mt="6" layerStyle="High-emphasis">
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
          <Text mt="6" size="lg" layerStyle="High-emphasis">
            Don&apos;t miss out on the latest news, updates, and exclusive
            content! Subscribe to our newsletter by entering your email address
            below:
          </Text>
          <SubscribeForm />
        </Box>
        <Grid
          gridGap={{ base: "4", md: "8" }}
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
