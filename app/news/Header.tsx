"use client";

import { GridItem, Heading } from "@chakra-ui/react";
import React from "react";

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <GridItem colSpan={3}>
      <Heading size={{ base: "2xl", md: "4xl" }} fontWeight="extrabold">
        {title}
      </Heading>
    </GridItem>
  );
};
export default Header;
