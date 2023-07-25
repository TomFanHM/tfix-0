"use client";

import React, { useMemo, useState } from "react";
import { CommentData, getComments } from "../getPosts";
import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import { User } from "firebase/auth";
import { fromNow } from "@/functions/date";
import { cleanHtml } from "@/functions/other";
import VoteCommentButton from "./VoteCommentButton";
import CommentInput from "../post/CommentInput";
import { MdComment, MdReply } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { collection, orderBy, query, where } from "firebase/firestore";
import { firestore } from "@/firebase/firebaseApp";

type CommentCardProps = {
  user: User | null | undefined;
  comment: CommentData;
};

const CommentCard: React.FC<CommentCardProps> = ({ user, comment }) => {
  const [reply, setReply] = useState<boolean>(false);

  const editedAtDate = comment.editedAt
    ? new Date(comment.editedAt.seconds * 1000)
    : null;

  const processedHtml = useMemo(() => {
    return cleanHtml(comment.content);
  }, [comment.content]);

  const { isFetching, error, data, refetch } = useQuery({
    queryKey: [`${comment.id} comments`],
    queryFn: async () => {
      const docRef = collection(firestore, "comments");
      const q = query(
        docRef,
        where("receiverId", "==", comment.id),
        orderBy("createdAt", "desc")
      );
      const results = await getComments(q);
      return results;
    },
    enabled: false,
  });

  return (
    <Flex gap="4">
      <VStack spacing="4">
        <Avatar
          size={{ base: "sm", md: "md" }}
          src={comment.creatorPhotoURL || ""}
          name={comment.creatorDisplayName || "unknown"}
        />
        <Center height="100%">
          <Divider orientation="vertical" />
        </Center>
      </VStack>

      <Flex flexDirection="column" flex="1 1 auto" gap="4">
        <Box outline="1px solid" borderRadius="4" p="4">
          <HStack wrap="wrap" layerStyle="Medium-emphasis" fontSize="sm">
            <Text>{comment.creatorDisplayName}</Text>
            <Text>&#8226;</Text>
            <Text>
              {/* show the editedAt date if it exists, otherwise show the createdAt */}
              {editedAtDate
                ? fromNow(editedAtDate)
                : fromNow(new Date(comment.createdAt.seconds * 1000))}
            </Text>
          </HStack>
          <Prose mt="4">
            <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
          </Prose>
        </Box>
        <HStack gap="4">
          <VoteCommentButton
            commentId={comment.id}
            user={user}
            likesData={comment.likes}
          />
          <Button
            variant="custom_solid"
            leftIcon={<Icon as={MdComment} boxSize={6} />}
            onClick={() => refetch()}
            isLoading={isFetching}
          >
            {comment.comments}
          </Button>
          <IconButton
            variant="custom_solid"
            aria-label="leave comment"
            icon={<Icon as={MdReply} boxSize={6} />}
            onClick={() => setReply((prev) => !prev)}
          />
        </HStack>
        {data &&
          data.length > 0 &&
          data.map((el, i) => (
            <CommentCard key={el.id} user={user} comment={el} />
          ))}
        {reply && (
          <CommentInput target="comments" user={user} receiverId={comment.id} />
        )}
      </Flex>
    </Flex>
  );
};

export default CommentCard;
