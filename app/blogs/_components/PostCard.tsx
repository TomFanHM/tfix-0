"use client";

import { User } from "firebase/auth";
import React, { useState } from "react";
import { PostData } from "./getPosts";
import { AuthModalState, authModalState } from "@/atoms/authModalAom";
import { Flex, Heading, useToast, Text, Button, Icon } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import Link from "next/link";
import { fromNow } from "@/functions/dateUtils";
import OptimizedImage from "@/components/image/OptimizedImage";
import { BsFillEyeFill, BsFillHeartFill, BsShareFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { usePost } from "@/hooks/usePost";

type PostCardProps = {
  user: User | null | undefined;
  post: PostData;
  isCreator?: boolean;
};

const PostCard: React.FC<PostCardProps> = ({ user, post, isCreator }) => {
  const toast = useToast();
  const setAuthModalState = useSetRecoilState<AuthModalState>(authModalState);

  const { loading, error, onVote, onDeletePost } = usePost();
  const [likes, setLikes] = useState<PostData["likes"]>(post.likes);

  const liked: boolean = user ? likes.includes(user.uid) : false;
  const likeCount = likes.length;

  //share
  const handleCopyURL = async (): Promise<void> => {
    try {
      await navigator.clipboard
        .writeText(`${window.location.href}/posts/${post.id}`)
        .then(() =>
          toast({
            title: "Copied to clipboard.",
            variant: "solid",
            status: "success",
            isClosable: true,
          })
        );
    } catch (error) {
      toast({
        title: "Failed to copy",
        variant: "solid",
        status: "error",
        isClosable: true,
      });
    }
  };

  //delete
  const handleDeletePost = async (): Promise<void> => {
    const success = await onDeletePost(post);
    if (success) {
      toast({
        title: "Deleted.",
        variant: "solid",
        status: "success",
        isClosable: true,
      });
    }
  };

  //vote
  const handleVote = async () => {
    //request user login
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }
    //if logged in
    const success = await onVote(post, user, liked);
    if (success) {
      const newList = liked
        ? likes.filter((e) => e !== user.uid)
        : [...likes, user.uid];
      setLikes((prev) => ({
        ...prev,
        likes: newList,
      }));
    }
  };

  return (
    <Flex
      flexDirection="column"
      borderRadius="20px"
      overflow="hidden"
      bg="elevation.dp02"
      shadow="dp02"
      pt="4"
    >
      <Link href={`/posts/${post.id}`}>
        <Heading px="4" mt="4">
          {post.headline}
        </Heading>
      </Link>
      <Text layerStyle="Medium-emphasis" fontSize="sm" px="4" mt="2" mb="4">
        {fromNow(new Date(post.createdAt.seconds * 1000))}
      </Text>
      <OptimizedImage
        url={post.coverURL}
        alt={post.headline}
        border_radius="0"
        objectFit="cover"
        loading="lazy"
        cursor="pointer"
        color="transparent"
      />
      <Text cursor="pointer" mt="6" px="4" noOfLines={3}>
        {post.introduction}
      </Text>
      <Flex
        p="4"
        borderTop="1px solid"
        borderColor="var(--chakra-colors-outline)"
        wrap="wrap"
        gap="4"
        mt="4"
      >
        <Button
          isLoading={loading}
          variant="custom_solid"
          leftIcon={
            <Icon
              as={BsFillHeartFill}
              boxSize={6}
              color={
                liked
                  ? "red.400"
                  : "var(--chakra-colors-onSurface)"
              }
            />
          }
          onClick={handleVote}
        >
          {likeCount}
        </Button>
        <Button
          isLoading={loading}
          variant="custom_solid"
          leftIcon={<Icon as={BsFillEyeFill} boxSize={6} />}
        >
          {post.views}
        </Button>
        <Button
          isLoading={loading}
          variant="custom_solid"
          leftIcon={<Icon as={BsShareFill} boxSize={6} />}
          onClick={handleCopyURL}
        >
          Share
        </Button>
        {isCreator && (
          <Button
            isLoading={loading}
            variant="custom_solid"
            leftIcon={<Icon as={MdDeleteForever} boxSize={6} />}
            onClick={handleDeletePost}
          >
            Delete
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
export default PostCard;
