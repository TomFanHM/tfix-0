"use client";

import { authModalState } from "@/atoms/authModalAom";
import ModalWrapper from "@/components/container/ModalWrapper";
import { light, dark } from "@/styles/chakra/colors";
import {
  useColorModeValue,
  ModalHeader,
  Heading,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import Signup from "./Signup";
import Terms from "./Terms";

//use authModalState to control modal, trigger modal from anywhere
const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);

  const handleClose = (): void => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const toggleView = (view: string): void => {
    setModalState({
      ...modalState,
      view: view as typeof modalState.view,
    });
  };

  //this component is not inside MainContainer, so we need to manually set color
  const color = useColorModeValue(light, dark);
  return (
    <ModalWrapper isOpen={modalState.open} onClose={handleClose}>
      <ModalHeader
        display="flex"
        flexDirection="column"
        alignItems="start"
        justifyContent="center"
        bg={color.primaryContainer}
        color={color.onPrimaryContainer}
      >
        <Heading>
          {modalState.view === "login" && "Login"}
          {modalState.view === "signup" && "Join Us"}
          {modalState.view === "resetPassword" && "Reset Password"}
          {modalState.view === "tos" && "Terms & Conditions"}
        </Heading>
      </ModalHeader>
      <ModalCloseButton color={color.onPrimaryContainer} />
      <ModalBody py="10" bg={color.surface} color={color.onSurface}>
        {modalState.view === "login" && (
          <Login
            toggleView={toggleView}
            handleClose={handleClose}
            color={color}
          />
        )}
        {modalState.view === "signup" && (
          <Signup
            toggleView={toggleView}
            handleClose={handleClose}
            color={color}
          />
        )}
        {modalState.view === "resetPassword" && (
          <ResetPassword toggleView={toggleView} color={color} />
        )}
        {modalState.view === "tos" && (
          <Terms
            toggleView={toggleView}
            handleClose={handleClose}
            color={color}
          />
        )}
      </ModalBody>
    </ModalWrapper>
  );
};
export default AuthModal;
