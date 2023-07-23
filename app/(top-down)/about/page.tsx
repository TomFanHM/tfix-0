import { GridItem } from "@/components/chakra/LayoutComponents";
import BannerText from "@/components/chakra/ui/BannerText";
import HeroBanner from "@/components/chakra/ui/HeroBanner";
import GridWrapper from "@/components/container/GridWrapper";
import MotionContainer from "@/components/container/MotionContainer";
import { Heading, Text } from "@/components/chakra/TypographyComponents";
import React from "react";
import { Metadata } from "next";
import BackgroundImage from "@/components/container/BackgroundImage";
import CallToAction from "@/components/chakra/ui/CallToAction";

export const metadata: Metadata = {
  title: "About us",
};

const About: React.FC = () => {
  return (
    <BackgroundImage style="grid">
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
                  <Text as="span" color="var(--primary)">
                    experience
                  </Text>
                </>
              }
              line3="We are committed to providing you with the best experience possible, and we are constantly working to improve our services"
            />
          </GridItem>
          <GridItem colSpan={2}>
            <BannerText
              line1="Join our community"
              line2="Inspire and be inspired"
              line3="Connect with like-minded individuals"
            />
          </GridItem>
          <GridItem colSpan={2}>
            <CallToAction
              background="transparent"
              color="var(--onBackground)"
              images={[
                { url: "/images/service/maid_00.png", aspectRatio: "2/3" },
                { url: "/images/service/maid_01.png", aspectRatio: "2/3" },
                { url: "/images/service/maid_02.png", aspectRatio: "2/3" },
                { url: "/images/service/butler.png", aspectRatio: "3/4" },
              ]}
            >
              <Text as="b"></Text>
              <Heading mt="6" size={{ base: "2xl", md: "4xl" }}></Heading>
            </CallToAction>
          </GridItem>
          <GridItem colSpan={2}></GridItem>
          <GridItem colSpan={2}></GridItem>
          <GridItem colSpan={2}></GridItem>
        </GridWrapper>
      </MotionContainer>
    </BackgroundImage>
  );
};
export default About;
