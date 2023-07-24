"use client";

import React, { useEffect, useMemo, useState } from "react";
import { CommentData, PostData, getVoteCount } from "../getPosts";
import MotionContainer from "@/components/container/MotionContainer";
import {
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Text,
} from "@chakra-ui/react";
import OptimizedImage from "@/components/image/OptimizedImage";
import { getFunctions, httpsCallable } from "firebase/functions";
import CommentInput from "./CommentInput";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import { auth } from "@/firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import VotePostButton from "./VotePostButton";
import { siteConfig } from "@/config/site";
import ShareButton from "../ShareButton";
import DeletePostButton from "../DeletePostButton";
import { useRouter } from "next/navigation";
import { MdEdit } from "react-icons/md";
import CommentsContainer from "./CommentsContainer";
import { fromNow } from "@/functions/date";
import { cleanHtml } from "@/functions/other";

type PostContainerProps = {
  post: PostData;
  comments: CommentData[];
};

const functions = getFunctions();
const callableIncrementPostViewCount = httpsCallable(
  functions,
  "callableIncrementPostViewCount"
);

const PostContainer: React.FC<PostContainerProps> = ({ post, comments }) => {
  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState<number>(getVoteCount(post.likes));

  const processedHtml = useMemo(() => {
    return cleanHtml(post.content);
  }, [post.content]);

  useEffect(() => {
    callableIncrementPostViewCount({ postId: post.id });
  }, [post]);

  const createdAt = fromNow(new Date(post.createdAt.seconds * 1000));
  const editedAt = post.editedAt
    ? fromNow(new Date(post.editedAt.seconds * 1000))
    : undefined;

  const isCreator = user?.uid === post.creatorId;

  const router = useRouter();

  const handleDeletePost = () => {
    router.refresh();
  };

  const handleVoteCount = (count: number) => {
    setLikes(count);
  };

  return (
    <MotionContainer>
      <Flex
        w="full"
        flexDirection="column"
        py={{ base: "6", md: "8" }}
        my={{ base: "6", md: "8" }}
      >
        <Heading>{post.headline}</Heading>
        <HStack wrap="wrap" layerStyle="Medium-emphasis" fontSize="sm" my="4">
          <Text>{createdAt}</Text>
          <Text>&#8226;</Text>
          {editedAt && (
            <>
              <Text>updated {editedAt}</Text>
              <Text>&#8226;</Text>
            </>
          )}
          <Text>{likes} likes</Text>
          <Text>&#8226;</Text>
          <Text>{post.comments} comments</Text>
          <Text>&#8226;</Text>
          <Text>{post.views} views</Text>
        </HStack>
        <OptimizedImage
          url={post.coverURL}
          alt={post.headline}
          border_radius="20px"
          w="full"
          maxW="full" //important
          maxH="500px"
          sx={{ aspectRatio: "16/9" }}
          color="transparent"
          objectFit="cover"
          loading="lazy"
        />
        <Prose my="6">
          <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
        </Prose>
        <Divider my="4" />
        <Flex mb="4" align="center" justify="space-between">
          <Text layerStyle="Medium-emphasis" fontSize="sm">
            Comments {`(${post.comments})`}
          </Text>
          {/* Buttons */}
          <HStack spacing="4">
            <VotePostButton
              postId={post.id}
              user={user}
              likesData={post.likes}
              handleVoteCount={handleVoteCount}
            />
            <ShareButton url={`${siteConfig.url}/blogs/${post.id}`} />
            {isCreator && (
              <IconButton
                variant="custom_solid"
                aria-label="edit post"
                icon={<Icon as={MdEdit} boxSize={6} />}
                onClick={() => router.push(`/blogs/${post.id}/edit`)}
              />
            )}
            {isCreator && (
              <DeletePostButton
                postId={post.id}
                creatorId={post.creatorId}
                effect={handleDeletePost}
              />
            )}
          </HStack>
        </Flex>
        <CommentInput user={user} receiverId={post.id} target="posts" />
        <CommentsContainer comments={comments} user={user} />
      </Flex>
    </MotionContainer>
  );
};

export default PostContainer;
