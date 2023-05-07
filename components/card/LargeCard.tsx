"use client";

import { fallbackImage } from "@/config/site";
import { dark, light } from "@/styles/chakra/colors";
import {
  Button,
  Flex,
  GridItem,
  Heading,
  useColorModeValue,
  VStack,
  Text,
  useBreakpointValue,
  Image,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

type CustomColor = {
  light: string;
  dark: string;
};

type LargeCardProps = {
  title: string;
  message: string;
  backgroundImage?: string;
  backgroundImageMobile?: string;
  prompt: string;
  customColor?: CustomColor;
  url: string;
};

const LargeCard: React.FC<LargeCardProps> = ({
  title,
  message,
  backgroundImage = fallbackImage,
  backgroundImageMobile = fallbackImage,
  prompt,
  customColor = { light: light.onSurface, dark: dark.onSurface },
  url,
}) => {
  const custom_color = useColorModeValue(customColor.light, customColor.dark);
  const color = useColorModeValue(light, dark);
  const router = useRouter();
  const isLargerThanMdSize = useBreakpointValue({ base: false, md: true });

  return (
    <GridItem
      borderRadius="20px"
      overflow="hidden"
      position="relative"
      transform="translate3d(0px, 0px, 0px)"
      colSpan={2}
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
        src={isLargerThanMdSize ? backgroundImage : backgroundImageMobile}
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
        sx={{ aspectRatio: { base: "3/4", md: "2/1" } }}
        gap="4"
        align="start"
        justify={{ md: "space-between" }}
        color={custom_color}
        bg={color.surface}
      >
        <VStack
          spacing="4"
          align="start"
          px="4"
          w={{ md: "50%" }}
          zIndex={1}
          my={{ md: "auto" }}
        >
          <Heading wordBreak="break-word">{title}</Heading>
          <Text wordBreak="break-word">{message}</Text>
        </VStack>

        <Button
          variant="ghost"
          borderRadius="20px"
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
export default LargeCard;
