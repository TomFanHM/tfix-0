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
    <Flex w="full" flexDirection="column" mt="4" bg="red" py='4'>
      {comments.map((comment, i) => (
        <CommentCard comment={comment} key={i} />
      ))}
    </Flex>
  );
};
export default CommentsContainer;
