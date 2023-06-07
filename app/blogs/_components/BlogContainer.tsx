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
  useDisclosure,
  useToast,
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
import { usePost } from "@/hooks/usePost";
import DeletePostModal from "./DeletePostModal";

type BlogContainerProps = {
  posts: PostData[];
};

const BlogContainer: React.FC<BlogContainerProps> = ({ posts }) => {
  //init user
  const [user] = useAuthState(auth);
  //clone posts
  const [blogPosts, setBlogPosts] = useState<PostData[]>([...posts]);
  //loading state
  const [loading, setLoading] = useState<boolean>(false);
  //record last visible post, null value means no more posts after fetch more
  const [lastVisible, setLastVisible] = useState<PostData | null>(
    posts.length > 0 ? posts[posts.length - 1] : null
  );

  useEffect(() => {
    //reset blog posts when posts change
    setBlogPosts([...posts]);
    setLastVisible(posts.length > 0 ? posts[posts.length - 1] : null);
  }, [posts]);
  
  //fetch more posts
  const fetchMorePosts = useCallback(async () => {
    if (loading || !lastVisible) return; //prevent multiple fetch, also prevent fetch when no more posts
    setLoading(true);
    const postsDocRef = collection(firestore, "posts");
    const startAfterTimestamp = new Timestamp(
      lastVisible.createdAt.seconds,
      lastVisible.createdAt.nanoseconds
    ); //convert to timestamp for startAfter
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
        setLastVisible(null); //no more posts
      }
    } catch (error) {
      console.log("fetchMorePosts error: ", error);
    }
    setLoading(false);
  }, [lastVisible, loading]);

  //handle delete post from parent, prevent to create multiple modal
  const toast = useToast();

  const [deletePostId, setDeletePostId] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading: usePostLoading, error, onDeletePost } = usePost();

  const handleDeletePostModal = useCallback((postId: string) => {
    setDeletePostId(postId);
    onOpen();
  }, []);

  const handleDeletePost = async (): Promise<void> => {
    //we are using state to store deletePostId
    const deleteTarget = blogPosts.find((post) => post.id === deletePostId); //find the first match post
    if (!deleteTarget) {
      toast({
        title: "Post not found.",
        variant: "solid",
        status: "error",
        isClosable: true,
      });
      return;
    }

    const success = await onDeletePost(deleteTarget);
    if (success) {
      toast({
        title: "Deleted.",
        variant: "solid",
        status: "success",
        isClosable: true,
      });
      setBlogPosts((prev) => prev.filter((post) => post.id !== deletePostId));
      setDeletePostId(null); //reset
      onClose();
    }
  };

  return (
    <MotionContainer maxW="container.xl">
      {/* confirmation modal */}
      <>
        <DeletePostModal
          isOpen={isOpen}
          onClose={onClose}
          loading={usePostLoading}
          handleDeletePost={handleDeletePost}
        />
      </>
      {/* main body */}
      <Grid
        templateColumns="repeat(3, 1fr)"
        alignContent="start"
        w="full"
        minH="100vh"
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
              handleDeletePostModal={handleDeletePostModal}
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
