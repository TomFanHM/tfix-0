"use client";

import { Box } from "@chakra-ui/react";
import React from "react";

const styles = {
  grid: {
    backgroundImage:
      "linear-gradient(0deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)",
    _dark: {
      backgroundImage:
        "linear-gradient(0deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
    },
    backgroundSize: "100px 100px",
  },
  dot: {
    backgroundImage:
      "radial-gradient(circle, rgba(0, 0, 0, 0.1) 10%, transparent 11%)",
    _dark: {
      backgroundImage:
        "radial-gradient(circle, rgba(255, 255, 255, 0.1) 10%, transparent 11%)",
    },
    backgroundSize: "3rem 3rem",
  },
};

type BackgroundImageProps = {
  style: "grid" | "dot";
  children: React.ReactNode;
};

const BackgroundImage: React.FC<BackgroundImageProps> = ({
  style,
  children,
}) => {
  return (
    <Box w="full" {...styles[style]}>
      {children}
    </Box>
  );
};

export default BackgroundImage;
