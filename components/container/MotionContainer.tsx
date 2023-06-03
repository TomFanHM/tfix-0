"use client";

import { Container, ContainerProps } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

type MotionContainerProps = {
  children: React.ReactNode;
} & ContainerProps;

//this is a framer motion container, which is used to animate the page transition

const MotionContainer: React.FC<MotionContainerProps> = ({
  children,
  ...props
}) => {
  return (
    <Container
      as={motion.main}
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "-100%" }}
      maxW="container.lg"
      centerContent
      {...props}
    >
      {children}
    </Container>
  );
};
export default MotionContainer;
