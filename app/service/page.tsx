import { GridItem } from "@/components/chakra/LayoutComponents";
import HeroBanner from "@/components/chakra/ui/HeroBanner";
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
        image="/images/service.png"
        mobileImage="/images/service_mobile.png"
        title="Our services"
        message="Experience entertainment like never before with our range of services."
      />
      <MotionContainer>
        <GridWrapper>
          <GridItem colSpan={2} mx="10"></GridItem>
        </GridWrapper>
      </MotionContainer>
    </>
  );
};
export default Service;
