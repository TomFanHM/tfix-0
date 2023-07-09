"use client";

import React from "react";
import { PostData, getPosts } from "./getPosts";
import MotionContainer from "@/components/container/MotionContainer";
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import BlogPostCard from "./BlogPostCard";
import { auth, firestore } from "@/firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { scrollToTop } from "@/functions/functions";
import {
  Timestamp,
  collection,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { useInfiniteData } from "@/hooks/useInfiniteData";

type BlogContainerProps = {
  posts: PostData[];
};

const fetchMorePosts = async (el: PostData[]) => {
  const postsDocRef = collection(firestore, "posts");
  const lastItem = el[el.length - 1];

  const startAfterTimestamp = new Timestamp(
    lastItem.createdAt.seconds,
    lastItem.createdAt.nanoseconds
  );
  const q = query(
    postsDocRef,
    orderBy("createdAt", "desc"),
    startAfter(startAfterTimestamp),
    limit(10)
  );
  const morePosts = await getPosts(q);
  return morePosts;
};

const BlogContainer: React.FC<BlogContainerProps> = ({ posts }) => {
  //init user
  const [user] = useAuthState(auth);

  const { data, fetchData, hasNext, loading, error, editData } =
    useInfiniteData<PostData>(posts);

  const handleSuccessDeletePost = (postId: string) => {
    editData((el) => el.filter((post) => post.id !== postId));
  };

  return (
    <MotionContainer maxW="container.xl">
      {/* main body */}
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
          {data.map((post, i) => (
            <BlogPostCard
              key={i}
              large={i % 5 === 0}
              banner={i % 5 === 0 || i % 5 === 1}
              user={user}
              post={post}
              isCreator={post.creatorId === user?.uid}
              handleSuccessDeletePost={handleSuccessDeletePost}
            />
          ))}
        </>
        <>
          {loading && (
            <GridItem colSpan={3}>
              <Stack>
                <Skeleton h="4" />
                <Skeleton h="4" />
                <Skeleton h="4" />
              </Stack>
            </GridItem>
          )}
        </>
        <>
          {hasNext && (
            <GridItem colSpan={3}>
              <Button
                w="full"
                variant="solid"
                isLoading={loading}
                onClick={() => fetchData(fetchMorePosts)}
              >
                More
              </Button>
            </GridItem>
          )}
          {!hasNext && (
            <GridItem colSpan={3}>
              <Button w="full" variant="solid" onClick={scrollToTop}>
                Scroll to Top
              </Button>
            </GridItem>
          )}
        </>
      </Grid>
    </MotionContainer>
  );
};

export default BlogContainer;
