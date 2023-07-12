import { GridItem } from "@/components/chakra/LayoutComponents";
import BannerText from "@/components/chakra/ui/BannerText";
import HeroBanner from "@/components/chakra/ui/HeroBanner";
import GridWrapper from "@/components/container/GridWrapper";
import MotionContainer from "@/components/container/MotionContainer";
import { Text } from "@/components/chakra/TypographyComponents";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About us",
};

const About: React.FC = () => {
  return (
    <>
      <HeroBanner
        image="/images/about/about.png"
        mobileImage="/images/about/about_mobile.png"
        title="About us"
        message="Learn more about our mission and vision"
      />
      <MotionContainer>
        <GridWrapper>
          <GridItem colSpan={2}>
            <BannerText
              line1="Our mission"
              line2={
                <>
                  <Text as="span">Elevate your </Text>
                  <Text as="span" color="var(--chakra-colors-primary)">
                    experience
                  </Text>
                </>
              }
              line3="We are committed to providing you with the best experience possible, and we are constantly working to improve our services"
            />
          </GridItem>
          <GridItem colSpan={2}></GridItem>
          <GridItem colSpan={2}></GridItem>
        </GridWrapper>
      </MotionContainer>
    </>
  );
};
export default About;
