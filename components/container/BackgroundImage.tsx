"use client";

import { Box } from "@chakra-ui/react";
import React from "react";

const styles = {
  grid: {
    backgroundImage:
      "linear-gradient(0deg, var(--c) 1px, transparent 1px), linear-gradient(90deg, var(--c) 1px, transparent 1px)",
    backgroundSize: "100px 100px",
  },
  dot: {
    backgroundImage: "radial-gradient(circle, var(--c) 10%, transparent 10%)",
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
