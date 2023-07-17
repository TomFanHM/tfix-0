"use client";

import React, { useMemo } from "react";
import { CommentData } from "../getPosts";
import { Avatar, Box, Flex, HStack, Text } from "@chakra-ui/react";
import { fromNow } from "@/functions/dateUtils";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import { cleanHtml } from "@/functions/functions";
import { User } from "firebase/auth";

type CommentCardProps = {
  user: User | null | undefined;
  comment: CommentData;
};

const CommentCard: React.FC<CommentCardProps> = ({ user, comment }) => {
  const editedAtDate = comment.editedAt
    ? new Date(comment.editedAt.seconds * 1000)
    : null;

  const processedHtml = useMemo(() => {
    return cleanHtml(comment.content);
  }, [comment.content]);

  return (
    <Flex gap="4">
      <Avatar
        src={comment.creatorPhotoURL || ""}
        name={comment.creatorDisplayName || "unknown"}
      />
      <Flex flexDirection="column" flex="1 1 auto" gap="4">
        <Box outline="1px solid" borderRadius="4" p="4">
          <HStack wrap="wrap" layerStyle="Medium-emphasis" fontSize="sm">
            <Text>{comment.creatorDisplayName}</Text>
            <Text>&#8226;</Text>
            <Text>
              {/* show the editedAt date if it exists, otherwise show the createdAt */}
              {editedAtDate
                ? fromNow(editedAtDate)
                : fromNow(new Date(comment.createdAt.seconds * 1000))}
            </Text>
          </HStack>
          <Prose mt="4">
            <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
          </Prose>
        </Box>
        <HStack gap="4">
          {/* <VoteCommentButton /> */}
          {/* <ReplyButton /> */}
        </HStack>
      </Flex>
    </Flex>
  );
};

export default CommentCard;
