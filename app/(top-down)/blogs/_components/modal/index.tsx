"use client";

import { blogModalState } from "@/atoms/blogModalAtom";
import { light, dark } from "@/styles/chakra/colors";
import {
  Modal,
  ModalContent,
  ModalOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";

const BlogModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(blogModalState);

  const handleClose = (): void => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  //this component is not inside MainContainer, so we need to manually set color
  const color = useColorModeValue(light, dark);

  return (
    <Modal
      size="md"
      isOpen={modalState.open}
      onClose={handleClose}
      isCentered
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent
        overflow="hidden"
        bg={color.surface}
        color={color.onSurface}
      ></ModalContent>
    </Modal>
  );
};
export default BlogModal;
