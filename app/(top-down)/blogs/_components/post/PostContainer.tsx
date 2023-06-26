"use client";

import React, { useEffect } from "react";
import { CommentData, PostData, getVoteCount } from "../getPosts";
import MotionContainer from "@/components/container/MotionContainer";
import { cleanHtml } from "@/functions/functions";
import { Divider, Flex, HStack, Heading, Text } from "@chakra-ui/react";
import { fromNow } from "@/functions/dateUtils";
import OptimizedImage from "@/components/image/OptimizedImage";
import { getFunctions, httpsCallable } from "firebase/functions";
import CommentsContainer from "./CommentsContainer";
import CommentInput from "./CommentInput";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import CommentCard from "../comment/CommentCard";

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
        w="full"
        flexDirection="column"
        py={{ base: "6", md: "8" }}
        my={{ base: "6", md: "8" }}
      >
        <Heading>{post.headline}</Heading>
        <HStack wrap="wrap" layerStyle="Medium-emphasis" fontSize="sm" mt="4">
          <Text>{fromNow(new Date(post.createdAt.seconds * 1000))}</Text>
          <Text>&#8226;</Text>
          {post.editedAt && (
            <>
              <Text>
                updated {fromNow(new Date(post.editedAt.seconds * 1000))}
              </Text>
              <Text>&#8226;</Text>
            </>
          )}
          <Text>{getVoteCount(post.likes)} likes</Text>
          <Text>&#8226;</Text>
          <Text>{post.comments} comments</Text>
          <Text>&#8226;</Text>
          <Text>{post.views} views</Text>
        </HStack>
        <OptimizedImage
          mt="4"
          mb="6"
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
        <Prose>
          <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
        </Prose>
        <Divider mt="8" mb="4" />
        <Text mb="4" layerStyle="Medium-emphasis" fontSize="sm">
          Comments {`(${comments.length})`}
        </Text>
        <CommentInput receiverId={post.id} />
        {comments.map((comment, i) => (
          <CommentCard key={i} comment={comment} />
        ))}
      </Flex>
      <CommentsContainer comments={comments} />
    </MotionContainer>
  );
};
export default PostContainer;
