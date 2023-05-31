"use client";

import React, { useEffect } from "react";
import { CommentData, PostData } from "../getPosts";
import MotionContainer from "@/components/container/MotionContainer";
import { cleanHtml } from "@/functions/functions";
import { Box, Flex, HStack, Heading, Text } from "@chakra-ui/react";
import { fromNow } from "@/functions/dateUtils";
import OptimizedImage from "@/components/image/OptimizedImage";
import { getFunctions, httpsCallable } from "firebase/functions";
import CommentsContainer from "./CommentsContainer";

type PostContainerProps = {
  post: PostData;
  comments: CommentData[];
};

const functions = getFunctions();
const callableIncrementPostViewCount = httpsCallable(
  functions,
  "callableIncrementPostViewCount"
);

const PostContainer: React.FC<PostContainerProps> = ({ post, comments }) => {
  const processedHtml = cleanHtml(post.content);

  useEffect(() => {
    callableIncrementPostViewCount({ postId: post.id });
  }, [post]);

  return (
    <MotionContainer>
      <Flex
        flexDirection="column"
        py={{ base: "6", md: "8" }}
        my={{ base: "6", md: "8" }}
      >
        <Heading>{post.headline}</Heading>
        <HStack wrap="wrap" layerStyle="Medium-emphasis" fontSize="sm" mt="4">
          <Text>{fromNow(new Date(post.createdAt.seconds * 1000))}</Text>
          <Text>&#8226;</Text>
          <Text>{post.likes.length} likes</Text>
          <Text>&#8226;</Text>
          <Text>{post.comments} comments</Text>
          <Text>&#8226;</Text>
          <Text>{post.views} views</Text>
        </HStack>
        <OptimizedImage
          mt="4"
          url={post.coverURL}
          alt={post.headline}
          border_radius="20px"
          w="full"
          maxW="full" //important
          maxH="500px"
          sx={{ aspectRatio: "16/9" }}
          color="transparent"
          objectFit="cover"
          loading="lazy"
        />
        <Box
          mt="6"
          wordBreak="break-word"
          dangerouslySetInnerHTML={{ __html: processedHtml }}
        />
      </Flex>
      <CommentsContainer comments={comments} />
    </MotionContainer>
  );
};
export default PostContainer;
