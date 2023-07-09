"use client";

import React from "react";
import { CommentData } from "../getPosts";
import { Flex } from "@chakra-ui/react";
import CommentCard from "../comment/CommentCard";

type CommentsContainerProps = {
  comments: CommentData[];
};

const CommentsContainer: React.FC<CommentsContainerProps> = ({ comments }) => {
  return (
    <Flex
      w="full"
      flexDirection="column"
      py={{ base: "6", md: "8" }}
      my={{ base: "6", md: "8" }}
    >
      {comments.map((comment, i) => (
        <CommentCard comment={comment} key={i} />
      ))}
    </Flex>
  );
};
export default CommentsContainer;
