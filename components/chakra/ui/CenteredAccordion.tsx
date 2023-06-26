"use client";

import { Box, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { TiMinus, TiPlus } from "react-icons/ti";

type ItemProps = {
  question: string;
  answer: string;
};

const Item: React.FC<ItemProps> = ({ question, answer }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Box as="dt" mt="6" borderTop="1px solid">
      <Flex
        py="4"
        w="full"
        align="start"
        justify="space-between"
        textAlign="left"
        cursor="pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Text as="span" fontWeight="semibold" lineHeight="6">
          {question}
        </Text>
        <Flex as="span" ml="6" h="7" align="center">
          {open && <Icon as={TiMinus} boxSize={6} />}
          {!open && <Icon as={TiPlus} boxSize={6} />}
        </Flex>
      </Flex>
      {open && (
        <Text as="dd" mt="4" fontWeight="semibold" lineHeight="6">
          {answer}
        </Text>
      )}
    </Box>
  );
};

type CenteredAccordionProps = {
  title: string;
  items: ItemProps[];
};

const CenteredAccordion: React.FC<CenteredAccordionProps> = ({
  title,
  items,
}) => {
  return (
    <Box bg="elevation.dp02" boxShadow="dp02" borderRadius="20px">
      <Box w="full" maxW="lg" mx="auto" p="4">
        <Heading fontSize="2xl" fontWeight="bold" lineHeight="10">
          {title}
        </Heading>
        <Box as="dl" mt="10">
          {items.map((item, i) => (
            <Item key={i} question={item.question} answer={item.answer} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CenteredAccordion;
