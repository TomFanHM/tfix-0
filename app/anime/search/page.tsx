"use client";

import MotionContainer from "@/components/container/MotionContainer";
import { ChevronDownIcon, ChevronUpIcon, Search2Icon } from "@chakra-ui/icons";
import {
  InputGroup,
  Input,
  Button,
  Stack,
  SimpleGrid,
  Text,
  Box,
  Flex,
  Grid,
  InputLeftElement,
  Menu,
  MenuButton,
  HStack,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Search: React.FC = () => {
  const [category, setCategory] = useState("123");
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([
    { title: "hi", description: "hello" },
  ]);
  const [searchSection, setSearchSection] = useState("");

  return (
    <MotionContainer maxW="container.xl">
      <Flex
        py="64px"
        w="full"
        flexDirection="column"
        justify="center"
        align="center"
      >
        <HStack
          maxW="40rem"
          bg="elevation.dp02"
          boxShadow="dp02"
          w="full"
          borderRadius="4"
          spacing={0}
          pr="4"
        >
          <InputGroup _focus={{ outline: "none" }} size="lg">
            <Input
              border="0"
              focusBorderColor="transparent"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <InputLeftElement pointerEvents="none">
              <Search2Icon boxSize={4} />
            </InputLeftElement>
          </InputGroup>
          <Menu offset={[0, 24]}>
            {({ isOpen }) => (
              <>
                <MenuButton
                  isActive={isOpen}
                  bg="transparent"
                  variant="ghost"
                  as={Button}
                  rightIcon={
                    isOpen ? (
                      <ChevronUpIcon boxSize={4} />
                    ) : (
                      <ChevronDownIcon boxSize={4} />
                    )
                  }
                >
                  {category}
                </MenuButton>
                <MenuList>
                  <MenuItem>Download</MenuItem>
                  <MenuItem onClick={() => alert("Kagebunshin")}>
                    Create a Copy
                  </MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
        </HStack>
      </Flex>
      <Grid
        templateColumns="repeat(12, 1fr)"
        gap="5" //1.25rem
        alignContent="center"
        w="full"
        mx="auto"
        pb={{ base: "10", md: "20" }}
      ></Grid>

      <Stack spacing={3}>
        {/* Render search results */}
        <SimpleGrid columns={3} spacing={10}>
          {results.map((result, index) => (
            <Box key={index} borderWidth="1px" borderRadius="lg" p={5}>
              <Text fontWeight="bold">{result.title}</Text>
              <Text>{result.description}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Stack>
    </MotionContainer>
  );
};
export default Search;
