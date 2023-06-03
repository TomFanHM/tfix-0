"use client";

import { Flex } from "@chakra-ui/react";
import React from "react";

type FormContainerProps = {
  children: React.ReactNode;
  handleSubmit: (e: React.FormEvent<HTMLDivElement>) => Promise<void>;
};

//this is a form container, which is used to wrap the form, make all form having same style

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
