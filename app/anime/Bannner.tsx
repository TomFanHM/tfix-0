"use client";

import OptimizedImage from "@/components/image/OptimizedImage";
import { GridItem } from "@chakra-ui/react";
import React from "react";

type BannnerProps = {};

const Bannner: React.FC<BannnerProps> = () => {
  return (
    <GridItem colSpan={2}>
      <OptimizedImage
        url={"/images/dummy_1600x900.png"}
        alt="banner"
        position="relative"
        color="transparent"
        border_radius="20px"
        w="full"
        maxW="full" //important
        sx={{ aspectRatio: { base: "16/9", md: "21/9" } }}
        objectFit="cover"
        loading="lazy"
      />
    </GridItem>
  );
};
export default Bannner;
