"use client";

import React from "react";
import { CommentData } from "../getPosts";
import { Flex } from "@chakra-ui/react";

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
    ></Flex>
  );
};
export default CommentsContainer;
