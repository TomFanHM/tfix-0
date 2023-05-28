"use client";

import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  AspectRatio,
  Text,
} from "@chakra-ui/react";
import React from "react";

type IframeInputProps = {
  iframeURL: string;
  handleChange: (e: React.ChangeEvent) => void;
};

const IframeInput: React.FC<IframeInputProps> = ({
  iframeURL,
  handleChange,
}) => {
  return (
    <Flex flexDirection="column" gap="4">
      <FormControl>
        <FormLabel htmlFor="iframeURL">Iframe URL</FormLabel>
        <Input
          id="iframeURL"
          name="iframeURL"
          type="text"
          value={iframeURL}
          placeholder="Enter URL for the iframe content"
          onChange={handleChange}
        />
      </FormControl>
      <Text layerStyle="Medium-emphasis">
        ps. Enter the unique identifier for the YouTube video you want to
        display in the iframe. The identifier is the series of letters and
        numbers that appears after embed/ in the YouTube URL (e.g., dQw4w9WgXcQ)
      </Text>
      {/* <AspectRatio ratio={4 / 3} w="full">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${iframeURL}`}
          allowFullScreen
        />
      </AspectRatio> */}
    </Flex>
  );
};
export default IframeInput;
