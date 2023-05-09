"use client";

import { Center, Spinner } from "@chakra-ui/react";
import React from "react";

const Loading: React.FC = () => {
  return (
    <Center minH="calc(100vh - 4rem)">
      <Spinner color="var(--chakra-colors-primary)" />
    </Center>
  );
};
export default Loading;
