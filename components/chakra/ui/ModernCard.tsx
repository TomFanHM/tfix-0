"use client";

import { Flex, Box, Text, Image, Link } from "@chakra-ui/react";
import NextLink from "next/link";

type ModernCardProps = {
  date: string;
  imageUrl: string;
  title: string;
  summary: string;
  link: string;
};

const ModernCard: React.FC<ModernCardProps> = ({
  date,
  imageUrl,
  title,
  summary,
  link,
}) => {
  return (
    <Flex as="article" bg="elevation.dp02" shadow="dp02">
      <Box
        p={2}
        transform="rotate(180deg)"
        sx={{
          writingMode: "vertical-lr",
        }}
      >
        <Flex
          as="time"
          dateTime={date}
          fontSize="xs"
          fontWeight="bold"
          textTransform="uppercase"
          align="center"
          justify="space-between"
          gap="4"
        >
          <Text as="span">{new Date(date).getFullYear()}</Text>
          <Text as="span" w="1px" flex="1" />
          <Text as="span">
            {new Date(date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </Text>
        </Flex>
      </Box>

      <Box
        overflow="hidden"
        display={{ base: "none", sm: "block" }}
        flexBasis={{ sm: 56 }}
      >
        <Image alt={title} src={imageUrl} objectFit="cover" w="full" h="full" />
      </Box>

      <Flex flex="1" direction="column" justify="space-between">
        <Box p={{ base: 4, sm: 6 }}>
          <Text fontWeight="bold" textTransform="uppercase">
            {title}
          </Text>

          <Text mt={2} fontSize="sm" lineHeight="relaxed" noOfLines={3}>
            {summary}
          </Text>
        </Box>

        <Box
          display={{ base: "unset", sm: "flex" }}
          alignItems="end"
          justifyContent="end"
        >
          <Link
            as={NextLink}
            href={link}
            px={5}
            py={3}
            fontSize="xs"
            fontWeight="bold"
            textTransform="uppercase"
            bg="var(--chakra-colors-primary)"
            color="var(--chakra-colors-onPrimary)"
            _hover={{
              bg: "var(--chakra-colors-secondary)",
              color: "var(--chakra-colors-onSecondary)",
            }}
          >
            Read Blog
          </Link>
        </Box>
      </Flex>
    </Flex>
  );
};
export default ModernCard;
