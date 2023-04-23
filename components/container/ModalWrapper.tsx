import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import React from "react";

type ModalWrapperProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  children,
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      size={{ base: "full", md: "md" }}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      scrollBehavior="inside"
      closeOnOverlayClick={true}
    >
      <ModalOverlay />
      <ModalContent overflow="hidden">{children}</ModalContent>
    </Modal>
  );
};
export default ModalWrapper;
