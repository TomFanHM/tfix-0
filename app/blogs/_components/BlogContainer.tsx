"use client";

import React from "react";
import { PostData } from "./getPosts";
import MotionContainer from "@/components/container/MotionContainer";
import { Button, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import { auth } from "@/firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import PostCard from "./PostCard";

type BlogContainerProps = {
  posts: PostData[];
};

const BlogContainer: React.FC<BlogContainerProps> = ({ posts }) => {
  const [user] = useAuthState(auth);
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
            <PostCard
              key={i}
              id={i}
              user={user}
              post={post}
              isCreator={post.creatorId === user?.uid}
            />
          ))}
        </>
      </Grid>
    </MotionContainer>
  );
};
export default BlogContainer;
