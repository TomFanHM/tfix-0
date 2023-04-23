"use client";

import { light, dark } from "@/styles/chakra/colors";
import { useColorModeValue, Center, Spinner } from "@chakra-ui/react";
import React from "react";

const Loading: React.FC = () => {
  const color = useColorModeValue(light, dark);
  return (
    <Center minH="calc(100vh - 4rem)">
      <Spinner color={color.primary} />
    </Center>
  );
};
export default Loading;
