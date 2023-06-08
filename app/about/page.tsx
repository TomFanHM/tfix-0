import HeroBanner from "@/components/chakra/ui/HeroBanner";
import { GridItem } from "@/components/chakra/LayoutComponents";
import React from "react";
import MotionContainer from "@/components/container/MotionContainer";
import GridWrapper from "@/components/container/GridWrapper";
import SectionCard from "@/components/chakra/ui/SectionCard";
import { Heading, Text } from "@/components/chakra/TypographyComponents";

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
        message="Our passion for entertainment and our commitment to delivering high-quality content drive us to create an online platform that caters to the interests of enthusiasts like you."
      />
      <MotionContainer>
        <GridWrapper>
          <GridItem colSpan={2}>
            <SectionCard image="/images/fire_man.png">
              <Heading mt="4" size={{ base: "2xl", md: "4xl" }} pb="4">
                Welcome to TFIX
              </Heading>
              <Text whiteSpace="pre-wrap" mt="2">
                We have worked tirelessly to curate and deliver the most
                engaging and relevant news, reviews, and recommendations. Our
                goal is to provide you with a comprehensive overview of the
                ever-evolving landscape of movies, games, anime, and more.
              </Text>
              <Text whiteSpace="pre-wrap" mt="2">
                We are committed to continuously improving our platform and
                delivering the best possible experience to our users.
              </Text>
            </SectionCard>
          </GridItem>
        </GridWrapper>
      </MotionContainer>
    </>
  );
};
export default About;
