import { AuthModalState, authModalState } from "@/atoms/authModalAtom";
import FormContainer from "@/components/container/FormContainer";
import { auth } from "@/firebase/firebaseApp";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  useToast,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { FaGoogle } from "react-icons/fa";
import { ThemeColor } from "@/styles/chakra/colors";

type LoginProps = {
  toggleView: (view: string) => void;
  handleClose: () => void;
  color: ThemeColor;
};

const Login: React.FC<LoginProps> = ({ toggleView, handleClose, color }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const setAuthModalState = useSetRecoilState<AuthModalState>(authModalState);

  const [signInWithEmailAndPassword, user, loading, firebaseError] =
    useSignInWithEmailAndPassword(auth);

  const [signInWithGoogle, googleUser, googleLoading, firebaseGoogleError] =
    useSignInWithGoogle(auth);

  const toast = useToast();

  const handleSubmit = async (
    e: React.FormEvent<HTMLDivElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const success = await signInWithEmailAndPassword(email, password);
      if (success) {
        toast({
          title: `Logged in, Welcome!`,
          variant: "solid",
          status: "success",
          isClosable: true,
        });
        setAuthModalState({ open: false, view: "login" });
      }
    } catch (error) {
      console.log("Login error: ", error);
    }
  };

  const handleContinueWithGoogle = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const success = await signInWithGoogle();
      if (success) {
        toast({
          title: `Logged in, Welcome!`,
          variant: "solid",
          status: "success",
          isClosable: true,
        });
        setAuthModalState({ open: false, view: "login" });
      }
    } catch (error: any) {
      console.log(`Google auth error: ${error.message}`);
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
          minLength={6}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          placeholder="At least 6 characters"
        />
      </FormControl>
      <Button variant="form" type="submit" isLoading={loading}>
        Submit
      </Button>
      <Button
        variant="form"
        leftIcon={<Icon as={FaGoogle} />}
        isLoading={googleLoading}
        onClick={handleContinueWithGoogle}
      >
        Sign in with Google
      </Button>
      <Flex
        w="full"
        align="center"
        justify="space-between"
        color={color.primary}
      >
        <Text
          _hover={{ color: color.secondary }}
          onClick={() => toggleView("signup")}
        >
          Sign up
        </Text>
        <Text>&#8226;</Text>
        <Text _hover={{ color: color.secondary }} onClick={handleClose}>
          Guest
        </Text>
        <Text>&#8226;</Text>
        <Text
          _hover={{ color: color.secondary }}
          onClick={() => toggleView("resetPassword")}
        >
          Forget password?
        </Text>
      </Flex>
      <Text color={color.error} textAlign="center">
        {firebaseGoogleError?.message || firebaseError?.message}
      </Text>
    </FormContainer>
  );
};
export default Login;
