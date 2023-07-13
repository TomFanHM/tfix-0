"use client";

import { fallbackImage } from "@/config/site";
import {
  useBreakpointValue,
  Flex,
  VStack,
  Button,
  Box,
  Image,
} from "@chakra-ui/react";
import Link from "next/link";

type LargeCardProps = {
  children?: React.ReactNode;
  mobileImage?: string;
  image?: string;
  prompt: string;
  color?: string;
  url: string;
};

const LargeCard: React.FC<LargeCardProps> = ({
  mobileImage = fallbackImage,
  image = fallbackImage,
  prompt,
  color = "var(--onSurface)",
  url,
  children,
}) => {
  const isLargerThanMdSize = useBreakpointValue({ base: false, md: true });

  return (
    <Link href={url}>
      <Box
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
          src={isLargerThanMdSize ? image : mobileImage}
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
          sx={{ aspectRatio: { base: "3/4", md: "16/9" } }}
          gap="4"
          align="start"
          justify={{ md: "space-between" }}
          color={color}
          bg="var(--surface)"
        >
          <VStack
            spacing="4"
            align="start"
            px="4"
            w={{ md: "50%" }}
            zIndex={1}
            my={{ md: "auto" }}
          >
            {children}
          </VStack>
          <Button
            variant="ghost"
            borderRadius="20px"
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
export default LargeCard;
