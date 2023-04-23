"use client";

import { auth } from "@/firebase/firebaseApp";
import { Button, ButtonProps, useToast } from "@chakra-ui/react";
import React from "react";
import { useSignOut } from "react-firebase-hooks/auth";

type SignoutButtonProps = ButtonProps;

const SignoutButton: React.FC<SignoutButtonProps> = ({ ...props }) => {
  const [signOut, loading, firebaseError] = useSignOut(auth);

  const toast = useToast();

  const handleSignOut = async (): Promise<void> => {
    try {
      const success = await signOut();
      if (success)
        toast({
          title: `See you!`,
          variant: "solid",
          status: "success",
          isClosable: true,
        });
    } catch (error) {
      console.log("Sign out error: ", error);
      const message = firebaseError?.message;
      if (message)
        toast({
          title: message,
          variant: "solid",
          status: "error",
          isClosable: true,
        });
    }
  };
  return (
    <Button
      isLoading={loading}
      onClick={handleSignOut}
      {...props}
      variant="custom_outline"
    >
      Sign out
    </Button>
  );
};
export default SignoutButton;
