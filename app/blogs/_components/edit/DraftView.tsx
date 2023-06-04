"use client";

import OptimizedImage from "@/components/image/OptimizedImage";
import { cleanHtml, splitString } from "@/functions/functions";
import {
  Flex,
  HStack,
  Heading,
  AspectRatio,
  Box,
  Text,
} from "@chakra-ui/react";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import React from "react";

type EditForm = {
  headline: string;
  introduction: string;
  content: string;
  iframeURL: string;
  selectedTag: string;
};

type DraftViewProps = {
  data: EditForm;
  coverURL: string;
};

const DraftView: React.FC<DraftViewProps> = ({ data, coverURL }) => {
  const { headline, introduction, content, iframeURL, selectedTag } = data;

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

      <OptimizedImage
        w="full"
        objectFit="cover"
        url={coverURL}
        alt={headline}
        border_radius="20px"
      />

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
        <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
      </Prose>
    </Flex>
  );
};
export default DraftView;
