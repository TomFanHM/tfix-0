"use client";

import { User } from "firebase/auth";
import { PostData, PostSchema } from "./getPosts";
import {
  Flex,
  GridItem,
  Heading,
  Link,
  useToast,
  Text,
  HStack,
  Divider,
  Button,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { siteConfig } from "@/config/site";
import { useCallback, useEffect, useState } from "react";
import OptimizedImage from "@/components/image/OptimizedImage";
import NextLink from "next/link";
import { fromNow } from "@/functions/dateUtils";
import { BsFillEyeFill, BsFillHeartFill } from "react-icons/bs";
import { MdDeleteForever, MdShare } from "react-icons/md";
import CustomAvatar from "@/components/image/CustomAvatar";
import { AuthModalState, authModalState } from "@/atoms/authModalAom";
import { useSetRecoilState } from "recoil";
import { usePost } from "@/hooks/usePost";

type BlogPostCardProps = {
  large: boolean;
  banner: boolean;
  user: User | null | undefined;
  post: PostData;
  isCreator: boolean;
  handleRemovePost: (postId: string) => void;
};

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  large,
  banner,
  user,
  post,
  isCreator,
  handleRemovePost,
}) => {
  const toast = useToast();
  const setAuthModalState = useSetRecoilState<AuthModalState>(authModalState);
  const { loading, error, onVote, onDeletePost } = usePost();
  const [likes, setLikes] = useState<PostSchema["likes"]>([...post.likes]);
  const liked: boolean = user ? likes.includes(user.uid) : false;
  const likeCount = likes.length;

  useEffect(() => {
    //reset
    setLikes([...post.likes]);
  }, [post]);

  //share
  const handleCopyURL = useCallback(async () => {
    try {
      await navigator.clipboard
        .writeText(`${siteConfig.url}/posts/${post.id}`)
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
  }, [post, toast]);

  //delete
  const handleDeletePost = useCallback(async (): Promise<void> => {
    const success = await onDeletePost(post);
    if (success) {
      toast({
        title: "Deleted.",
        variant: "solid",
        status: "success",
        isClosable: true,
      });
      handleRemovePost(post.id);
    }
  }, [onDeletePost, handleRemovePost, post, toast]);

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
      const newArr = liked
        ? likes.filter((e) => e !== user.uid)
        : [...likes, user.uid];
      setLikes(newArr);
    }
  };

  return (
    <GridItem colSpan={{ base: 3, md: large ? 2 : 1 }}>
      <OptimizedImage
        url={post.coverURL}
        alt={post.headline}
        border_radius="20px"
        position="relative"
        w="full"
        maxW="full" //important
        h={{ md: banner ? "500px" : "unset" }}
        sx={{ aspectRatio: "16/9" }}
        color="transparent"
        objectFit="cover"
        loading="lazy"
      />
      <Flex flexDirection="column" mt="4" gap="4">
        <Flex wrap="wrap" gap="4" mt="4">
          {post.tags.map((tag, i) => (
            <Link
              key={i}
              as={NextLink}
              href={"/blogs"}
              textDecoration="underline"
              w="min-content"
            >
              {tag}
            </Link>
          ))}
        </Flex>
        <Heading size="lg">{post.headline}</Heading>
        <Text mt="4" noOfLines={5}>
          {post.introduction}
        </Text>
        <HStack spacing={4}>
          <CustomAvatar
            src={post.creatorPhotoURL}
            name={post.creatorDisplayName}
            size="8"
          />
          <Text layerStyle="Medium-emphasis">
            {fromNow(new Date(post.createdAt.seconds * 1000))}
          </Text>
        </HStack>
        <Divider />
        <Flex wrap="wrap" gap="4" mt="4">
          <Button
            variant="custom_solid"
            isLoading={loading}
            leftIcon={<Icon as={BsFillHeartFill} boxSize={6} />}
            onClick={handleVote}
            color={liked ? "red.400" : "var(--chakra-colors-onPrimary)"}
          >
            {likeCount}
          </Button>
          <Button
            variant="custom_solid"
            isLoading={loading}
            leftIcon={<Icon as={BsFillEyeFill} boxSize={6} />}
          >
            {post.views}
          </Button>
          <IconButton
            variant="custom_solid"
            isLoading={loading}
            aria-label="share link"
            icon={<Icon as={MdShare} boxSize={6} />}
            onClick={handleCopyURL}
          />
          {isCreator && (
            <IconButton
              variant="custom_solid"
              isLoading={loading}
              aria-label="delete post"
              icon={<Icon as={MdDeleteForever} boxSize={6} />}
              onClick={handleDeletePost}
            />
          )}
        </Flex>
      </Flex>
    </GridItem>
  );
};

export default BlogPostCard;
