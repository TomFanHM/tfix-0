import HeroBanner from "@/components/chakra/ui/HeroBanner";
import { GridItem } from "@/components/chakra/LayoutComponents";
import React from "react";
import MotionContainer from "@/components/container/MotionContainer";
import GridWrapper from "@/components/container/GridWrapper";
import SectionCard from "@/components/chakra/ui/SectionCard";

const Spacer = () => {
  return <GridItem py={{ base: "8", md: "16" }} colSpan={2}></GridItem>;
};

const About: React.FC = () => {
  return (
    <>
      <HeroBanner
        image="/images/about.png"
        mobileImage="/images/about_mobile.png"
        title="About Us"
        message="Our mission is to provide you with a gateway to knowledge and entertainment."
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
export default About;
