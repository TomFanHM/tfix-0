/* "use client";

import { light, dark } from "@/styles/chakra/colors";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import MessageInput from "./MessageInput";

type ChatroomProps = {
  getMessages: [];
};

const Chatroom: React.FC<ChatroomProps> = ({ getMessages }) => {
  const [messages, setMessages] = useState<[]>(getMessages);

  const [inputMessage, setInputMessage] = useState<string>("");

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const handleInputMessages = (
    el: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInputMessage(el.target.value);
  };

  const scrollToBottom = () => {
    if (bottomRef && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const color = useColorModeValue(light, dark);

  return (
    <Container maxW="container.xl" h="full">
      <Flex
        position="relative"
        w="full"
        h="full"
        maxH="100vh"
        flexDirection="column"
      >
        <Box flexGrow={0} flexShrink={0}>
          <Text>123</Text>
        </Box>
        <Box
          py="4"
          overflowX="hidden"
          overflowY="auto"
          flexGrow={1}
          flexShrink={1}
        >
          <Text>123</Text>
        </Box>
        <Box flexGrow={0} flexShrink={0}>
          <MessageInput
            inputMessage={inputMessage}
            handleInputMessages={handleInputMessages}
          />
        </Box>
      </Flex>
    </Container>
  );
};

export default Chatroom;
 */