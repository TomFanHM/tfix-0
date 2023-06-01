"use client";

import { Avatar, Flex, Text } from "@chakra-ui/react";
import React from "react";

type CommentInputProps = {
  receiverId: string;
};

const CommentInput: React.FC<CommentInputProps> = ({ receiverId }) => {
  return (
    <Flex gap="4">
      <Avatar src="https://bit.ly/broken-link" name="text" />
    </Flex>
  );
};
export default CommentInput;
