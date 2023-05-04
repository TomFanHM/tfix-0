"use client";

import { light, dark } from "@/styles/chakra/colors";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { IconButton, IconButtonProps, useColorMode } from "@chakra-ui/react";
import React from "react";

type DarkModeSwitchProps = IconButtonProps;

const DarkModeSwitch: React.FC<DarkModeSwitchProps> = ({ ...rest }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      variant="ghost"
      color={colorMode === "light" ? light.primary : dark.primary}
      borderColor={colorMode === "light" ? light.primary : dark.primary}
      icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
      {...rest}
    />
  );
};
export default DarkModeSwitch;
