import FormContainer from "@/components/container/FormContainer";
import { auth } from "@/firebase/firebaseApp";
import { ThemeColor } from "@/styles/chakra/colors";
import {
  useToast,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

type SignupProps = {
  toggleView: (view: string) => void;
  handleClose: () => void;
  color: ThemeColor;
};

const Signup: React.FC<SignupProps> = ({ toggleView, handleClose, color }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [createUserWithEmailAndPassword, _, loading, firebaseError] =
    useCreateUserWithEmailAndPassword(auth);

  const toast = useToast();

  const handleSubmit = async (
    e: React.FormEvent<HTMLDivElement>
  ): Promise<void> => {
    e.preventDefault();
    //check passwords
    try {
      if (password !== confirmPassword)
        return setErrorMessage("Passwords do not match");
      const success = await createUserWithEmailAndPassword(email, password);
      if (success) {
        toast({
          title: "Sign up successful.",
          variant: "solid",
          status: "success",
          isClosable: true,
        });
      }
    } catch (error) {
      console.log("Sign up error: ", error);
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
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          placeholder="At least 6 characters"
          minLength={6}
        />
      </FormControl>
      <FormControl id="confirm_password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
          placeholder="At least 6 characters"
          minLength={6}
        />
      </FormControl>
      <Button variant="form" type="submit" isLoading={loading}>
        Submit
      </Button>
      <Flex
        w="full"
        align="center"
        justify="space-between"
        color={color.primary}
      >
        <Text
          _hover={{ color: color.secondary }}
          onClick={() => toggleView("login")}
        >
          Login
        </Text>
        <Text>&#8226;</Text>
        <Text _hover={{ color: color.secondary }} onClick={handleClose}>
          Guest
        </Text>
        <Text>&#8226;</Text>
        <Text
          _hover={{ color: color.secondary }}
          onClick={() => toggleView("tos")}
        >
          Terms and conditions
        </Text>
      </Flex>
      <Text color={color.error} textAlign="center">
        {errorMessage || firebaseError?.message}
      </Text>
    </FormContainer>
  );
};
export default Signup;
