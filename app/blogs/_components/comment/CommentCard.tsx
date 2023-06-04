"use client";

import React from "react";
import { CommentData } from "../getPosts";
import { Avatar, Flex, HStack, Text } from "@chakra-ui/react";
import { fromNow } from "@/functions/dateUtils";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import { cleanHtml } from "@/functions/functions";

type CommentCardProps = {
  comment: CommentData;
};

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  const editedAtDate = comment.editedAt
    ? new Date(comment.editedAt.seconds * 1000)
    : null;

  const processedHtml = cleanHtml(comment.content);
  return (
    <Flex gap="4">
      <Avatar
        src={comment.creatorPhotoURL || ""}
        name={comment.creatorDisplayName || ""}
      />
      <Flex
        flexDirection="column"
        flex="1 1 auto"
        outline="1px solid"
        px="4"
        borderRadius="4"
      >
        <HStack wrap="wrap" layerStyle="Medium-emphasis" fontSize="sm" mt="4">
          <Text>{comment.creatorDisplayName}</Text>
          <Text>&#8226;</Text>
          <Text>
            {/* show the editedAt date if it exists, otherwise show the createdAt */}
            {editedAtDate
              ? fromNow(editedAtDate)
              : fromNow(new Date(comment.createdAt.seconds * 1000))}
          </Text>
        </HStack>
        <Prose>
          <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
        </Prose>
      </Flex>
    </Flex>
  );
};
export default CommentCard;
