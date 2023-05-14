"use client";

import React from "react";
import { PostsData } from "./getPosts";
import MotionContainer from "@/components/container/MotionContainer";
import { Grid } from "@chakra-ui/react";

type BlogContainerProps = {
  posts: PostsData[];
};

const BlogContainer: React.FC<BlogContainerProps> = ({ posts }) => {
  return (
    <MotionContainer>
      <Grid></Grid>
    </MotionContainer>
  );
};
export default BlogContainer;
