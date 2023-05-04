"use client";

import { AuthModalState, authModalState } from "@/atoms/authModalAom";

import { blogsConfig } from "@/config/blogs";
import { chatbotConfig } from "@/config/chatbot";
import { newsConfig } from "@/config/news";
import { auth } from "@/firebase/firebaseApp";
import { light, dark } from "@/styles/chakra/colors";
import { HamburgerIcon, SmallCloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Icon,
  IconButton,
  useColorModeValue,
  Show,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import UserAvatar from "../auth/avatar/UserAvatar";
import SignoutButton from "../auth/modal/SignoutButton";
import DarkModeSwitch from "./DarkModeSwitch";
import HeaderMenu from "./HeaderMenu";
import MobileDrawer from "./MobileDrawer";
import { mediaConfig } from "@/config/media";

const Header: React.FC = () => {
  const color = useColorModeValue(light, dark);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const toggleDrawer = () => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  };

  const [user, loading] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState<AuthModalState>(authModalState);

  return (
    <Box as="header">
      <Flex
        w="full"
        h="4rem"
        maxH="4rem"
        borderBottom="1px solid"
        borderColor={color.outline}
        bg={color.semiPrimaryContainer}
        color={color.onPrimaryContainer}
        backdropBlur="16px"
        backdropFilter="blur(16px)"
      >
        <Container
          maxW="container.xl"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <DarkModeSwitch
            display={{ md: "none" }}
            aria-label="toggle dark mode"
          />

          <Heading
            flex="0 0 auto"
            onClick={() => router.push("/")}
            cursor="pointer"
          >
            TFIX
          </Heading>
          {/* pc */}
          <Show above="md">
            <Grid
              flex="1 1 auto"
              gridTemplateColumns="1fr auto auto auto"
              alignItems="center"
              gap="4"
              ml="8"
            >
              {/* menu */}
              <Flex gap="2">
                <HeaderMenu
                  color={color}
                  buttonText="News"
                  menuGroupTitle="Category"
                  navItems={newsConfig.mainNav}
                />
                <HeaderMenu
                  color={color}
                  buttonText="Media"
                  menuGroupTitle="Discover"
                  navItems={mediaConfig.mainNav}
                />
                <HeaderMenu
                  color={color}
                  buttonText="Blogs"
                  menuGroupTitle="Connect"
                  navItems={blogsConfig.mainNav}
                />
                <HeaderMenu
                  color={color}
                  buttonText="Chatbot"
                  menuGroupTitle="ChatGPT"
                  navItems={chatbotConfig.mainNav}
                />
              </Flex>
              {/* menu */}
              <DarkModeSwitch aria-label="toggle dark mode" />
              {!user && (
                <Button
                  variant="custom_outline"
                  isLoading={loading}
                  onClick={() =>
                    setAuthModalState({ open: true, view: "login" })
                  }
                >
                  Log in
                </Button>
              )}
              {!user && (
                <Button
                  variant="custom_solid"
                  isLoading={loading}
                  onClick={() =>
                    setAuthModalState({ open: true, view: "signup" })
                  }
                >
                  Sign up
                </Button>
              )}
              {user && <UserAvatar user={user} />}
              {user && <SignoutButton variant="solid" />}
            </Grid>
          </Show>
          {/* pc */}
          {/* mobile */}
          <Show below="md">
            <IconButton
              variant="ghost"
              aria-label="Open mobile menu"
              icon={
                <Icon
                  as={isOpen ? SmallCloseIcon : HamburgerIcon}
                  boxSize={6}
                />
              }
              onClick={toggleDrawer}
            />
          </Show>
          {/* mobile */}

          {/* mobile menu */}
          <Show below="md">
            <MobileDrawer
              isOpen={isOpen}
              onClose={onClose}
              color={color}
              user={user}
            />
          </Show>
          {/* mobile menu */}
        </Container>
      </Flex>
    </Box>
  );
};
export default Header;
