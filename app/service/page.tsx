import { GridItem } from "@/components/chakra/LayoutComponents";
import HeroBanner from "@/components/chakra/ui/HeroBanner";
import SectionCard from "@/components/chakra/ui/SectionCard";
import GridWrapper from "@/components/container/GridWrapper";
import MotionContainer from "@/components/container/MotionContainer";
import React from "react";

const Spacer = () => {
  return <GridItem py={{ base: "8", md: "16" }} colSpan={2}></GridItem>;
};

const Service: React.FC = () => {
  return (
    <>
      <HeroBanner
        image="/images/about.png"
        mobileImage="/images/about_mobile.png"
        title=""
        message=""
      />
      <MotionContainer>
        <GridWrapper>
          <GridItem colSpan={2} mx="10">
            <SectionCard />
          </GridItem>
        </GridWrapper>
      </MotionContainer>
    </>
  );
};
export default Service;
