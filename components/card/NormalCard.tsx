"use client";

import { light, dark } from "@/styles/chakra/colors";
import {
  Button,
  Flex,
  GridItem,
  Heading,
  useColorModeValue,
  VStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

import React from "react";

type CustomColor = {
  light: string;
  dark: string;
};

type NormalCardProps = {
  title: string;
  message: string;
  backgroundImage?: string;
  prompt: string;
  customColor?: CustomColor;
  url: string;
};

const NormalCard: React.FC<NormalCardProps> = ({
  title,
  message,
  backgroundImage = "/IMG_0798.PNG",
  prompt,
  customColor = { light: light.onSurface, dark: dark.onSurface },
  url,
}) => {
  const custom_color = useColorModeValue(customColor.light, customColor.dark);
  const color = useColorModeValue(light, dark);
  const router = useRouter();

  return (
    <GridItem
      borderRadius="20px"
      overflow="hidden"
      position="relative"
      transform="translate3d(0px, 0px, 0px)"
      colSpan={{ base: 2, md: 1 }}
      boxShadow="dp02"
      data-group
      onClick={() => router.push(url)}
    >
      <Image
        position="absolute"
        inset="0"
        w="full"
        h="full"
        color="transparent"
        objectFit="cover"
        src={backgroundImage}
        alt="banner"
        transition="500ms ease-in-out"
        _groupHover={{ transform: "scale(1.1)" }}
        zIndex={0}
        loading="lazy"
      />
      <Flex
        flexDirection="column"
        p="8"
        transition="500ms ease-in-out"
        w="full"
        sx={{ aspectRatio: "3/4" }}
        gap="4"
        align="start"
        justify={{ md: "space-between" }}
        color={custom_color}
        bg={color.surface}
      >
        <VStack spacing="4" align="start" px="4" zIndex={1}>
          <Heading wordBreak="break-word">{title}</Heading>
          <Text wordBreak="break-word" fontWeight="bold">
            {message}
          </Text>
        </VStack>

        <Button
          variant="ghost"
          borderRadius="20px"
          fontWeight="bold"
          color={custom_color}
          _groupHover={{ bg: color.primary, color: color.onPrimary }}
          zIndex={1}
        >
          {prompt}
        </Button>
      </Flex>
    </GridItem>
  );
};
export default NormalCard;
