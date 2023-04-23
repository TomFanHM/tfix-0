import FormContainer from "@/components/container/FormContainer";
import { auth } from "@/firebase/firebaseApp";
import { ThemeColor } from "@/styles/chakra/colors";
import {
  useToast,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";

type ResetPasswordProps = {
  toggleView: (view: string) => void;
  color: ThemeColor;
};

const ResetPassword: React.FC<ResetPasswordProps> = ({ toggleView, color }) => {
  const [email, setEmail] = useState<string>("");

  const [sendPasswordResetEmail, sending, firebaseError] =
    useSendPasswordResetEmail(auth);

  const toast = useToast();

  const handleSubmit = async (
    e: React.FormEvent<HTMLDivElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const success = await sendPasswordResetEmail(email);
      if (success)
        toast({
          title: `Check your email.`,
          variant: "solid",
          status: "success",
          isClosable: true,
        });
    } catch (error) {
      console.log("Reset password error: ", error);
    }
  };

  return (
    <FormContainer handleSubmit={handleSubmit}>
      <FormControl id="email" isRequired>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          placeholder="example@email.com"
        />
      </FormControl>
      <Button variant="form" type="submit" isLoading={sending}>
        Submit
      </Button>
      <Button variant="form" onClick={() => toggleView("login")}>
        Back to Login
      </Button>
      <Text color={color.error} textAlign="center">
        {firebaseError?.message}
      </Text>
    </FormContainer>
  );
};
export default ResetPassword;
