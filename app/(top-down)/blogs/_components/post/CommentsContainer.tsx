"use client";

import React from "react";
import { CommentData } from "../getPosts";
import { Flex } from "@chakra-ui/react";
import CommentCard from "../comment/CommentCard";
import { User } from "firebase/auth";

type CommentsContainerProps = {
  user: User | null | undefined;
  comments: CommentData[];
};

const CommentsContainer: React.FC<CommentsContainerProps> = ({
  user,
  comments,
}) => {
  return (
    <Flex w="full" flexDirection="column" mt="4" py="4" gap="8">
      {comments.map((comment, i) => (
        <CommentCard key={i} user={user} comment={comment} />
      ))}
    </Flex>
  );
};

export default React.memo(CommentsContainer);
