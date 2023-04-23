"use client";

import { light, dark } from "@/styles/chakra/colors";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";
import React from "react";

const DarkModeSwitch: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      variant="ghost"
      color={colorMode === "light" ? light.primary : dark.primary}
      borderColor={colorMode === "light" ? light.primary : dark.primary}
      aria-label="toggle theme mode"
      icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
    />
  );
};
export default DarkModeSwitch;
