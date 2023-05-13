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
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import UserAvatar from "../auth/avatar/UserAvatar";
import SignoutButton from "../auth/modal/SignoutButton";
import DarkModeSwitch from "./DarkModeSwitch";
import HeaderMenu from "./HeaderMenu";
import MobileDrawer from "./MobileDrawer";
import { mediaConfig } from "@/config/media";
import Link from "next/link";

const Header: React.FC = () => {
  const color = useColorModeValue(light, dark);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          <Link href="/">
            <Heading flex="0 0 auto" cursor="pointer">
              TFIX
            </Heading>
          </Link>

          {/* pc */}
          <Box display={{ base: "none", md: "unset" }} flex="1 1 auto">
            <Grid
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
          </Box>
          {/* pc */}
          {/* ------------------------------ */}
          {/* mobile */}
          <IconButton
            variant="ghost"
            aria-label="Open mobile menu"
            icon={
              <Icon as={isOpen ? SmallCloseIcon : HamburgerIcon} boxSize={6} />
            }
            onClick={toggleDrawer}
            display={{ md: "none" }}
          />
          {/* mobile menu */}
          <MobileDrawer
            isOpen={isOpen}
            onClose={onClose}
            color={color}
            user={user}
          />
          {/* mobile menu */}

          {/* mobile */}
        </Container>
      </Flex>
    </Box>
  );
};
export default Header;
