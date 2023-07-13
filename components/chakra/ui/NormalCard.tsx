"use client";

import React from "react";
import { Button, Flex, Box, VStack, Image } from "@chakra-ui/react";
import { fallbackImage } from "@/config/site";
import Link from "next/link";

type NormalCardProps = {
  children?: React.ReactNode;
  image?: string;
  prompt: string;
  color?: string;
  url: string;
};

const NormalCard: React.FC<NormalCardProps> = ({
  image = fallbackImage,
  prompt,
  color = "var(--onSurface)",
  url,
  children,
}) => {
  return (
    <Link href={url}>
      <Box
        w="full"
        borderRadius="20px"
        overflow="hidden"
        position="relative"
        transform="translate3d(0px, 0px, 0px)"
        boxShadow="dp02"
        data-group
      >
        <Image
          position="absolute"
          inset="0"
          w="full"
          h="full"
          color="transparent"
          objectFit="cover"
          src={image}
          alt="banner"
          transition="500ms ease-in-out"
          _groupHover={{ transform: "scale(1.1)" }}
          zIndex={0}
          loading="lazy"
        />
        <Flex
          flexDirection="column"
          px="4"
          py="8"
          transition="500ms ease-in-out"
          w="full"
          sx={{ aspectRatio: "3/4" }}
          gap="4"
          align="start"
          justify={{ md: "space-between" }}
          bg="var(--surface)"
        >
          <VStack spacing="4" align="start" px="4" zIndex={1} color={color}>
            {children}
          </VStack>
          <Button
            variant="ghost"
            borderRadius="20px"
            fontWeight="bold"
            color={color}
            _groupHover={{
              bg: "var(--primary)",
              color: "var(--onPrimary)",
            }}
            zIndex={1}
          >
            {prompt}
          </Button>
        </Flex>
      </Box>
    </Link>
  );
};

export default NormalCard;
