"use client";

import OptimizedImage from "@/components/image/OptimizedImage";
import { cleanHtml, splitString } from "@/functions/functions";
import {
  AspectRatio,
  Box,
  Flex,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Prose } from "@nikolovlazar/chakra-ui-prose";

type CreateForm = {
  headline: string;
  introduction: string;
  content: string;
  selectedFile: File | null;
  iframeURL: string;
  selectedTag: string;
};

type DraftViewProps = {
  data: CreateForm;
};

const DraftView: React.FC<DraftViewProps> = ({ data }) => {
  const {
    headline,
    introduction,
    content,
    selectedFile,
    iframeURL,
    selectedTag,
  } = data;

  const processedHtml: string = cleanHtml(content.replace(/\n/g, "<br />"));

  return (
    <Flex
      flexDirection="column"
      align="start"
      wordBreak="break-word" //<=very important!!!
      gap="4"
    >
      {selectedTag && (
        <HStack spacing="2" layerStyle="Medium-emphasis">
          {splitString(selectedTag).map((tag, i) => (
            <Text key={i}>#{tag}</Text>
          ))}
        </HStack>
      )}
      <Heading>{headline}</Heading>
      <Text>{introduction}</Text>
      {selectedFile && (
        <OptimizedImage
          w="full"
          objectFit="cover"
          url={URL.createObjectURL(selectedFile)}
          alt={selectedFile.name}
          border_radius="20px"
        />
      )}
      {iframeURL && (
        <Box w="full">
          <AspectRatio ratio={4 / 3}>
            <iframe
              src={`https://www.youtube.com/embed/${iframeURL}`}
              allowFullScreen
            />
          </AspectRatio>
        </Box>
      )}
      <Prose>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Prose>
    </Flex>
  );
};
export default DraftView;
