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

const arrow1 = keyframes`  
  from {transform: rotate(0deg);}   
  to {transform: rotate(360deg)} 
`;

const pseudoStyle = {
  content: `""`,
  w: "24px",
  h: "2px",
  background: "var(--chakra-colors-primary)",
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
            animation={`${keyframesArr[i]} 1s ease ${0.25 * i}s infinite`}
          />
        ))}
    </Box>
  );
};
export default React.memo(ScrollDownIndicator);
