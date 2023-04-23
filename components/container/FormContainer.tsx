"use client";

import { Flex } from "@chakra-ui/react";
import React from "react";

type FormContainerProps = {
  children: React.ReactNode;
  handleSubmit: (e: React.FormEvent<HTMLDivElement>) => Promise<void>;
};

const FormContainer: React.FC<FormContainerProps> = ({
  children,
  handleSubmit,
  ...props
}) => {
  return (
    <Flex
      as="form"
      maxW="20rem"
      flexDirection="column"
      align="start"
      gap="4"
      mx="auto"
      onSubmit={handleSubmit}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default FormContainer;
