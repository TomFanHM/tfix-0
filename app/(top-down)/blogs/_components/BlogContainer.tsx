"use client";

import React, { useState } from "react";
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

  //handle delete post from parent, prevent to create multiple modal
  const toast = useToast();

  const [deletePostId, setDeletePostId] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading: usePostLoading, onDeletePost } = usePost();

  const handleDeletePostModal = (postId: string) => {
    setDeletePostId(postId);
    onOpen();
  };

  const handleDeletePost = async (): Promise<void> => {
    //we are using state to store deletePostId
    const deleteTarget = data.find((post) => post.id === deletePostId); //find the first match post
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
      editData((el) => el.filter((post) => post.id !== deletePostId));
      setDeletePostId(null); //reset
      onClose();
    } else {
      toast({
        title: "Error.",
        variant: "solid",
        status: "error",
        isClosable: true,
      });
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
