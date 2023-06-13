import { GridItem } from "@/components/chakra/LayoutComponents";
import { Heading, Text } from "@/components/chakra/TypographyComponents";
import BannerText from "@/components/chakra/ui/BannerText";
import CallToAction from "@/components/chakra/ui/CallToAction";
import HeroBanner from "@/components/chakra/ui/HeroBanner";
import SectionCard from "@/components/chakra/ui/SectionCard";
import GridWrapper from "@/components/container/GridWrapper";
import MotionContainer from "@/components/container/MotionContainer";
import React from "react";
import { banner } from "./_components/banner";
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
                {banner.news.title}
              </Heading>
              {banner.news.description.map((item, index) => (
                <Text key={index} whiteSpace="pre-wrap" pb="4">
                  {item}
                </Text>
              ))}
            </SectionCard>
          </GridItem>
          <GridItem colSpan={2}>
            <SectionCard image="/images/service/write.png">
              <Heading mt="4" pb="4">
                {banner.blogs.title}
              </Heading>
              {banner.blogs.description.map((item, index) => (
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
                Share your stories and thoughts
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
              line1="Join our community"
              line2="Inspire and be inspired"
              line3="Connect with like-minded individuals"
            />
          </GridItem>
        </GridWrapper>
      </MotionContainer>
    </>
  );
};
export default Service;
