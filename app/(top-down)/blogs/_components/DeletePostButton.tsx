"use client";

import { usePost } from "@/hooks/usePost";
import { IconButton, Icon, useDisclosure, useToast } from "@chakra-ui/react";
import React from "react";
import { MdDeleteForever } from "react-icons/md";
import DeletePostModal from "./DeletePostModal";

type DeletePostButtonProps = {
  postId: string;
  creatorId: string;
  effect: () => void;
};

const DeletePostButton: React.FC<DeletePostButtonProps> = ({
  postId,
  creatorId,
  effect,
}) => {
  const { loading, onDeletePost } = usePost();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleDeletePost = async (): Promise<void> => {
    const success = await onDeletePost(postId, creatorId);
    if (success) {
      toast({
        title: "Deleted.",
        variant: "solid",
        status: "success",
        isClosable: true,
      });

      effect();
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
    <>
      <IconButton
        variant="custom_solid"
        isLoading={loading}
        aria-label="delete post"
        icon={<Icon as={MdDeleteForever} boxSize={6} />}
        onClick={() => onOpen()}
      />
      {isOpen && (
        <DeletePostModal
          isOpen={isOpen}
          onClose={onClose}
          loading={loading}
          handleDeletePost={handleDeletePost}
        />
      )}
    </>
  );
};
export default DeletePostButton;
