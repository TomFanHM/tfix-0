"use client";

import { splitString } from "@/functions/functions";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Tag,
  Box,
} from "@chakra-ui/react";
import React from "react";

type TagsInputProps = {
  selectedTag: string;
  handleChange: (e: React.ChangeEvent) => void;
};

const TagsInput: React.FC<TagsInputProps> = ({ selectedTag, handleChange }) => {
  return (
    <Flex flexDirection="column" gap="4" align="center">
      <FormControl>
        <FormLabel htmlFor="selectedTag">Tags</FormLabel>
        <Input
          id="selectedTag"
          name="selectedTag"
          type="text"
          value={selectedTag}
          placeholder="Insert your desired tags, e.g. lifestyle, web, funny"
          onChange={handleChange}
        />
      </FormControl>
      <Box w="full">
        {selectedTag &&
          splitString(selectedTag).map((tag: string, i) => (
            <Tag key={i} mr="4" mb="4" size="md" wordBreak="break-word">
              {tag}
            </Tag>
          ))}
      </Box>
    </Flex>
  );
};
export default TagsInput;
