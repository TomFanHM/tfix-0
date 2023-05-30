"use client";

import React, { useCallback, useEffect, useState } from "react";
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

type BlogContainerProps = {
  posts: PostData[];
};

const BlogContainer: React.FC<BlogContainerProps> = ({ posts }) => {
  const [user] = useAuthState(auth);

  const [blogPosts, setBlogPosts] = useState<PostData[]>([...posts]);

  const handleRemovePost = useCallback((postId: string) => {
    setBlogPosts((prev) => prev.filter((post) => post.id !== postId));
  }, []);

  const [loading, setLoading] = useState<boolean>(false);
  const [lastVisible, setLastVisible] = useState<PostData | null>(
    posts.length > 0 ? posts[posts.length - 1] : null
  );

  useEffect(() => {
    //reset
    setBlogPosts([...posts]);
    setLastVisible(posts.length > 0 ? posts[posts.length - 1] : null);
  }, [posts]);

  const fetchMorePosts = useCallback(async () => {
    if (loading || !lastVisible) return;
    setLoading(true);
    const postsDocRef = collection(firestore, "posts");
    const startAfterTimestamp = new Timestamp(
      lastVisible.createdAt.seconds,
      lastVisible.createdAt.nanoseconds
    );
    const q = query(
      postsDocRef,
      orderBy("createdAt", "desc"),
      startAfter(startAfterTimestamp),
      limit(10)
    );
    try {
      const morePosts = await getPosts(q);
      if (morePosts.length > 0) {
        setBlogPosts((prev) => [...prev, ...morePosts]);
        setLastVisible(morePosts[morePosts.length - 1]);
      } else {
        setLastVisible(null);
      }
    } catch (error) {
      console.log("fetchMorePosts error: ", error);
    }
    setLoading(false);
  }, [lastVisible, loading]);

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
          {blogPosts.map((post, i) => (
            <BlogPostCard
              key={i}
              large={i % 5 === 0}
              banner={i % 5 === 0 || i % 5 === 1}
              user={user}
              post={post}
              isCreator={post.creatorId === user?.uid}
              handleRemovePost={handleRemovePost}
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
          {lastVisible && (
            <GridItem colSpan={3}>
              <Button
                w="full"
                variant="solid"
                isLoading={loading}
                onClick={fetchMorePosts}
              >
                More
              </Button>
            </GridItem>
          )}
          {!lastVisible && (
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
