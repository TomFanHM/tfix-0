"use client";

import { light, dark } from "@/styles/chakra/colors";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

type DeletePostModalProps = {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  handleDeletePost: () => Promise<void>;
};

//disable modal close if loading

const DeletePostModal: React.FC<DeletePostModalProps> = ({
  isOpen,
  onClose,
  loading,
  handleDeletePost,
}) => {
  const color = useColorModeValue(light, dark);

  return (
    <Modal
      size="md"
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      scrollBehavior="inside"
      closeOnOverlayClick={!loading}
    >
      <ModalOverlay />
      <ModalContent
        overflow="hidden"
        bg={color.surface}
        color={color.onSurface}
      >
        <ModalHeader>Delete this post?</ModalHeader>
        <ModalCloseButton isDisabled={loading} />
        <ModalBody>
          This will delete this post permanently. You cannot undo this action.
        </ModalBody>
        <ModalFooter>
          <Button
            mr="4"
            variant="custom_outline"
            onClick={onClose}
            isLoading={loading}
          >
            Cancel
          </Button>
          <Button
            variant="custom_solid"
            isLoading={loading}
            onClick={handleDeletePost}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeletePostModal;
