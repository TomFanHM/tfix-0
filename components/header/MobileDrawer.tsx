"use client";

import { AuthModalState, authModalState } from "@/atoms/authModalAom";

import { blogsConfig } from "@/config/blogs";
import { chatbotConfig } from "@/config/chatbot";
import { newsConfig } from "@/config/news";
import { ThemeColor } from "@/styles/chakra/colors";
import { MainNavItem } from "@/types";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Heading,
  Flex,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";

import React from "react";
import { useSetRecoilState } from "recoil";
import SignoutButton from "../auth/modal/SignoutButton";
import { animeConfig } from "@/config/anime";

type MobileDrawerItemProps = {
  title: string;
  config: MainNavItem[];
  color: ThemeColor;
  onClose: () => void;
};

const MobileDrawerItem: React.FC<MobileDrawerItemProps> = ({
  title,
  config,
  color,
  onClose,
}) => {
  const router = useRouter();

  return (
    <AccordionItem
      color={color.onPrimaryContainer}
      borderColor={color.onPrimaryContainer}
    >
      <AccordionButton
        _expanded={{ bg: color.secondary, color: color.onSecondary }}
      >
        <Box as="span" flex="1" textAlign="left" fontWeight="extrabold">
          {title}
        </Box>
        <AccordionIcon />
      </AccordionButton>

      <AccordionPanel py="8" display="flex" flexDirection="column" gap="2">
        {config.map((el, i) => (
          <Text
            key={i}
            textAlign="start"
            py="1"
            px="4"
            _hover={{ bg: color.secondary, color: color.onSecondary }}
            onClick={() => {
              router.push(el.href);
              onClose();
            }}
          >
            {el.title}
          </Text>
        ))}
      </AccordionPanel>
    </AccordionItem>
  );
};

type MobileDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  color: ThemeColor;
  user: User | null | undefined;
};

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  color,
  user,
}) => {
  const setAuthModalState = useSetRecoilState<AuthModalState>(authModalState);

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="full">
      <DrawerOverlay />
      <DrawerContent
        bg={color.primaryContainer}
        color={color.onPrimaryContainer}
      >
        <DrawerCloseButton />

        <DrawerHeader>
          <Heading>TFIX</Heading>
        </DrawerHeader>

        <DrawerBody overflowY="scroll">
          <Accordion allowToggle>
            <MobileDrawerItem
              title="News"
              config={newsConfig.mainNav}
              color={color}
              onClose={onClose}
            />
            <MobileDrawerItem
              title="Anime"
              config={animeConfig.mainNav}
              color={color}
              onClose={onClose}
            />
            <MobileDrawerItem
              title="Blogs"
              config={blogsConfig.mainNav}
              color={color}
              onClose={onClose}
            />
            <MobileDrawerItem
              title="Chatbot"
              config={chatbotConfig.mainNav}
              color={color}
              onClose={onClose}
            />
          </Accordion>
        </DrawerBody>

        <DrawerFooter>
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
                onClick={() =>
                  setAuthModalState({ open: true, view: "signup" })
                }
              >
                Sign up
              </Button>
            )}
            {user && <SignoutButton variant="custom_solid" />}
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
export default MobileDrawer;
