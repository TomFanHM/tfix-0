"use client";

import React from "react";
import { CommentData } from "../getPosts";

type CommentsContainerProps = {
  comments: CommentData[];
};

const CommentsContainer: React.FC<CommentsContainerProps> = ({ comments }) => {
  return <div>Have a good coding</div>;
};
export default CommentsContainer;
