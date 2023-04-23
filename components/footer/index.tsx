"use client";

import { light, dark } from "@/styles/chakra/colors";
import {
  Box,
  Container,
  Divider,
  Flex,
  HStack,
  Icon,
  Link,
  useColorModeValue,
  VStack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BsInstagram, BsFacebook, BsYoutube } from "react-icons/bs";
import NextLink from "next/link";

type FooterProps = {};

const Footer: React.FC<FooterProps> = () => {
  const color = useColorModeValue(light, dark);

  return (
    <Box
      py={{ base: "20", sm: "30", md: "40" }}
      bg={color.surfaceVariant}
      color={color.onSurfaceVariant}
    >
      <Container maxW="container.xl">
        <Flex
          direction={{ base: "column", md: "row" }}
          gap="12"
          px="4"
          justify="space-around"
        >
          <VStack align="start" spacing="4">
            <Text fontSize="lg" fontWeight="bold">
              Team
            </Text>
            <Link as={NextLink} href="/service">
              Service status
            </Link>
            <Link as={NextLink} href="/about">
              About us
            </Link>
            <Link as={NextLink} href="/contact">
              Contact us
            </Link>
          </VStack>

          <VStack align="start" spacing="4">
            <Text fontSize="lg" fontWeight="bold">
              Support
            </Text>
            <Link as={NextLink} href="/questions">
              FAQs
            </Link>
            <Link as={NextLink} href="/report">
              Report a bug
            </Link>
            <Link as={NextLink} href="/request">
              Submit a request
            </Link>
          </VStack>

          <VStack align="start" spacing="4">
            <Text fontSize="lg" fontWeight="bold">
              Learn more
            </Text>
            <Link as={NextLink} href="/news">
              News
            </Link>
            <Link as={NextLink} href="/anime">
              Anime
            </Link>
            <Link as={NextLink} href="/blogs">
              Blogs
            </Link>
          </VStack>

          <VStack align="start" spacing="4">
            <Text fontSize="lg" fontWeight="bold">
              Follow us
            </Text>
            <HStack spacing="4">
              <Link
                href="https://www.instagram.com/"
                isExternal
                target="_blank"
              >
                <Icon as={BsInstagram} boxSize="6" />
              </Link>
              <Link href="https://www.facebook.com/" isExternal target="_blank">
                <Icon as={BsFacebook} boxSize="6" />
              </Link>
              <Link href="https://www.youtube.com/" isExternal target="_blank">
                <Icon as={BsYoutube} boxSize="6" />
              </Link>
            </HStack>
          </VStack>
        </Flex>
        <Box mt="8">
          <Divider />
        </Box>
        <Text mt="8" textAlign="center">
          © {new Date().getFullYear()} TFIX. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
};
export default Footer;
