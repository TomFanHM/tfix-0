"use client";

//credits: https://codepen.io/Balo/pen/PezyWb

import { Box, keyframes } from "@chakra-ui/react";
import React from "react";

const count = 3;

const keyframesArr = Array(count)
  .fill("")
  .map(
    (_, i) => keyframes`
  from {
    opacity: 0;
    top: -${48 - i * 16}px;
  }
  
  to {
    opacity: 0;
    top: -${32 - i * 16}px;
  }

  50% {
    opacity: 1;
  }
  `
  );

const pseudoStyle = {
  content: `""`,
  w: "24px",
  h: "2px",
  background: "var(--primary)",
  display: "inline-block",
  borderRadius: "2px",
};

const ScrollDownIndicator: React.FC = () => {
  return (
    <Box pt="48px">
      {Array(count)
        .fill("")
        .map((_, i) => (
          <Box
            key={i}
            position="relative"
            w="48px"
            h="16px"
            top={`-${48 - i * 16}px`}
            _before={{
              ...pseudoStyle,
              transform: "rotate(45deg) translateX(25%)",
            }}
            _after={{
              ...pseudoStyle,
              transform: "rotate(-45deg) translateX(-25%)",
            }}
            animation={`${keyframesArr[i]} 0.9s infinite`}
            sx={{
              animationDelay: `-${0.9 - i * 0.3}s`,
            }}
          />
        ))}
    </Box>
  );
};
export default React.memo(ScrollDownIndicator);
