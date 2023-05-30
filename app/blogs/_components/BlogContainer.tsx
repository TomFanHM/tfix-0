"use client";

import React from "react";
import { PostData } from "./getPosts";
import MotionContainer from "@/components/container/MotionContainer";
import { Button, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import Link from "next/link";
import BlogPostCard from "./BlogPostCard";

type BlogContainerProps = {
  posts: PostData[];
};

const BlogContainer: React.FC<BlogContainerProps> = ({ posts }) => {
  return (
    <MotionContainer maxW="container.xl">
      <Grid
        templateColumns="repeat(3, 1fr)"
        alignContent="center"
        w="full"
        mx="auto"
        gridGap="64px 16px"
        py={{ base: "6", md: "8" }}
        my={{ base: "6", md: "8" }}
      >
        <GridItem colSpan={3}>
          <Flex justify="space-between" align="center">
            <Heading size={{ base: "2xl", md: "4xl" }} fontWeight="extrabold">
              Blogs
            </Heading>
            <Link href="/blogs/create">
              <Button variant="custom_solid">Create Post</Button>
            </Link>
          </Flex>
        </GridItem>
        <>
          {posts.map((post, i) => (
            <BlogPostCard
              key={i}
              large={i % 5 === 0}
              banner={i % 5 === 0 || i % 5 === 1}
              user={null}
              post={post}
            />
          ))}
        </>
      </Grid>
    </MotionContainer>
  );
};
export default BlogContainer;
