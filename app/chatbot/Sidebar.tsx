"use client";

import { AuthModalState, authModalState } from "@/atoms/authModalAom";
import UserAvatar from "@/components/auth/avatar/UserAvatar";
import SignoutButton from "@/components/auth/modal/SignoutButton";
import DarkModeSwitch from "@/components/header/DarkModeSwitch";
import { auth } from "@/firebase/firebaseApp";
import { light, dark } from "@/styles/chakra/colors";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

const Sidebar: React.FC = () => {
  const color = useColorModeValue(light, dark);
  const router = useRouter();
  const setAuthModalState = useSetRecoilState<AuthModalState>(authModalState);
  const [user] = useAuthState(auth);

  return (
    <Flex
      w="15rem"
      h="full"
      maxH="100vh"
      flexDirection="column"
      boxShadow="dp02"
      bg="elevation.dp02"
      color={color.onSurface}
      position={{ base: "fixed", md: "relative" }}
      top="0"
      left="0"
      transform={{ base: "translateX(-100%)", md: "unset" }}
    >
      <Box flexGrow={0} flexShrink={0}>
        <Flex justify="space-between" px="4" py="2" align="center">
          <Heading
            flexShrink={0}
            onClick={() => router.push("/")}
            cursor="pointer"
          >
            TFIX
          </Heading>

          <IconButton
            variant="ghost"
            aria-label="menu"
            icon={<Icon as={HamburgerIcon} boxSize={6} />}
          />
        </Flex>
        <Divider borderColor={color.outline} />
      </Box>
      <Box flexGrow={0} flexShrink={0} px="4">
        <Flex py="2" justify="space-between" align="center">
          {!user && <Box borderRadius="full" bg="transparent" w="8" h="8" />}
          {user && <UserAvatar user={user} />}
          <DarkModeSwitch aria-label="toggle dark mode" />
        </Flex>
        <Divider borderColor={color.outline} />
      </Box>
      <Box py="4" overflowX="hidden" overflowY="auto">
        <Text>module</Text>
      </Box>
      <Box mt="auto" flexGrow={0} flexShrink={0} px="4">
        <Flex flexDirection="column" gap="4" w="full">
          {!user && (
            <Button
              variant="custom_outline"
              onClick={() => setAuthModalState({ open: true, view: "login" })}
            >
              Log in
            </Button>
          )}
          {!user && (
            <Button
              variant="custom_solid"
              onClick={() => setAuthModalState({ open: true, view: "signup" })}
            >
              Sign up
            </Button>
          )}
          {user && <SignoutButton variant="custom_solid" />}
        </Flex>
      </Box>
    </Flex>
  );
};

export default Sidebar;
