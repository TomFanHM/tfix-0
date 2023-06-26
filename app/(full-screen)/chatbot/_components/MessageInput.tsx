/* "use client";

import { Flex, Icon, IconButton, Input } from "@chakra-ui/react";
import React from "react";
import { MdSend } from "react-icons/md";

type MessageInputProps = {
  inputMessage: string;
  handleInputMessages: (el: React.ChangeEvent<HTMLInputElement>) => void;
};

const MessageInput: React.FC<MessageInputProps> = ({
  inputMessage,
  handleInputMessages,
}) => {
  return (
    <Flex h="5rem" flexDirection="row" gap="4" align="center" as="form">
      <Input
        type="text"
        placeholder="Write..."
        value={inputMessage}
        onChange={handleInputMessages}
      />
      <IconButton
        variant="solid"
        aria-label="Open mobile menu"
        icon={<Icon as={MdSend} boxSize={6} />}
      />
    </Flex>
  );
};

export default MessageInput;
 */