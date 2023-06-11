import { GridItem } from "@/components/chakra/LayoutComponents";
import { Heading, Text } from "@/components/chakra/TypographyComponents";
import BannerText from "@/components/chakra/ui/BannerText";
import CallToAction from "@/components/chakra/ui/CallToAction";
import HeroBanner from "@/components/chakra/ui/HeroBanner";
import SectionCard from "@/components/chakra/ui/SectionCard";
import GridWrapper from "@/components/container/GridWrapper";
import MotionContainer from "@/components/container/MotionContainer";
import React from "react";
import { scripts } from "./_components/scripts";
import { Button } from "@/components/chakra/FormComponents";
import Link from "next/link";

const Service: React.FC = () => {
  return (
    <>
      <HeroBanner
        image="/images/service/service.png"
        mobileImage="/images/service/service_mobile.png"
        title="Our services"
        message="Experience entertainment like never before with our range of services."
      />
      <MotionContainer>
        <GridWrapper>
          <GridItem colSpan={2}>
            <SectionCard image="/images/service/clock.png" reverse>
              <Heading mt="4" pb="4">
                {scripts.news.title}
              </Heading>
              {scripts.news.description.map((item, index) => (
                <Text key={index} whiteSpace="pre-wrap" pb="4">
                  {item}
                </Text>
              ))}
            </SectionCard>
          </GridItem>
          <GridItem colSpan={2}>
            <SectionCard image="/images/service/write.png">
              <Heading mt="4" pb="4">
                {scripts.blogs.title}
              </Heading>
              {scripts.blogs.description.map((item, index) => (
                <Text key={index} whiteSpace="pre-wrap" pb="4">
                  {item}
                </Text>
              ))}
            </SectionCard>
          </GridItem>
          <GridItem colSpan={2}>
            <BannerText
              line1="A platform"
              line2={
                <>
                  <Text as="span" color="var(--chakra-colors-primary)">
                    Unparalleled
                  </Text>
                  <Text as="span"> experience</Text>
                </>
              }
              line3="This space is yours to explore, connect, and inspire."
            />
          </GridItem>
          <GridItem colSpan={2}>
            <CallToAction
              background="transparent"
              color="var(--chakra-colors-onBackground)"
              images={[
                { url: "/images/service/maid_00.png", aspectRatio: "2/3" },
                { url: "/images/service/maid_01.png", aspectRatio: "2/3" },
                { url: "/images/service/maid_02.png", aspectRatio: "2/3" },
                { url: "/images/service/butler.png", aspectRatio: "3/4" },
              ]}
            >
              <Text as="b">Express your creativity</Text>
              <Heading mt="6" size={{ base: "2xl", md: "4xl" }}>
                <Text as="span">Share your </Text>
                <Text
                  as="span"
                  bgGradient="linear(to-l, var(--chakra-colors-secondary), var(--chakra-colors-tertiary))"
                  bgClip="text"
                >
                  stories
                </Text>
                <Text as="span"> and </Text>
                <Text
                  as="span"
                  bgGradient="linear(to-l, var(--chakra-colors-secondary), var(--chakra-colors-tertiary))"
                  bgClip="text"
                >
                  thoughts
                </Text>
              </Heading>
              <Link href="/blogs">
                <Button variant="custom_solid" my="4" py="2" px="4">
                  Try it out
                </Button>
              </Link>
            </CallToAction>
          </GridItem>
          <GridItem colSpan={2}>
            <BannerText
              line1="Connect with like-minded individuals"
              line2="Inspire and be inspired"
              line3="Join our community."
            />
          </GridItem>
        </GridWrapper>
      </MotionContainer>
    </>
  );
};
export default Service;
