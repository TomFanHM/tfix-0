import SimpleStack from "@/components/action/SimpleStack";
import GridLine from "@/components/container/GridLine";
import GridWrapper from "@/components/container/GridWrapper";
import MotionContainer from "@/components/container/MotionContainer";
import BannerText from "@/components/hero/BannerText";
import HeroBanner from "@/components/hero/HeroBanner";

import { Heading, Text } from "../components/chakra/TypographyComponents";
import { GridItem } from "../components/chakra/LayoutComponents";
import NormalCard from "../components/chakra/ui/NormalCard";
import LargeCard from "../components/chakra/ui/LargeCard";

export default function Home() {
  return (
    <GridLine>
      <HeroBanner
        title="Your Gateway to Discovery"
        message="Unlock endless possibilities, fuel your curiosity, and let your imagination soar in this world of discovery!"
      />
      <MotionContainer>
        <GridWrapper>
          {/* news */}
          <BannerText
            topText="News"
            middleText="Stay informed, stay connected"
            bottomText="Unravel diverse perspectives and explore the world through journalism"
          />

          <GridItem colSpan={2}>
            <LargeCard
              prompt="Catch up now"
              image="/images/dummy_1600x900.png"
              mobileImage="/images/dummy_600x800.png"
              url="/news"
            >
              <Heading wordBreak="break-word">Breaking News</Heading>
              <Text wordBreak="break-word" fontWeight="bold">
                Get the latest headlines and updates in real-time
              </Text>
            </LargeCard>
          </GridItem>

          {/* media, including anime and movie */}
          <GridItem py={{ base: "10", md: "20" }} colSpan={2}></GridItem>
          <BannerText
            topText="Media"
            middleText="Experience the magic of storytelling"
            bottomText="Discover a vast collection of movies and anime"
          />

          <GridItem colSpan={2}>
            <LargeCard
              prompt="Watch now"
              image="/images/dummy_1600x900.png"
              mobileImage="/images/dummy_600x800.png"
              url="/anime"
            >
              <Heading wordBreak="break-word">Featured Anime</Heading>
              <Text wordBreak="break-word" fontWeight="bold">
                Immerse yourself in our curated anime selection, handpicked by
                our staff for your enjoyment
              </Text>
            </LargeCard>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <NormalCard
              prompt="Discover new"
              image="/images/dummy_600x800.png"
              url="/anime"
            >
              <Heading wordBreak="break-word">New Releases</Heading>
              <Text wordBreak="break-word" fontWeight="bold">
                Stay updated with the latest anime titles
              </Text>
            </NormalCard>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <NormalCard
              prompt="See popular"
              image="/images/dummy_600x800.png"
              url="/movie"
            >
              <Heading wordBreak="break-word">Popular Movie</Heading>
              <Text wordBreak="break-word" fontWeight="bold">
                Explore the most popular movies loved by our community
              </Text>
            </NormalCard>
          </GridItem>

          {/* blog */}
          <GridItem py={{ base: "10", md: "20" }} colSpan={2}></GridItem>
          <BannerText
            topText="Blog"
            middleText="Share your thoughts, create connections"
            bottomText="Voice your opinions and interact with like-minded individuals. Experience the power of collective wisdom"
          />
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <NormalCard
              prompt="Read more"
              image="/images/dummy_600x800.png"
              url="/blog"
            >
              <Heading wordBreak="break-word">Featured Posts</Heading>
              <Text wordBreak="break-word" fontWeight="bold">
                Read insightful articles by our talented contributors
              </Text>
            </NormalCard>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <NormalCard
              prompt="Start writing"
              image="/images/dummy_600x800.png"
              url="/blog/create"
            >
              <Heading wordBreak="break-word">Write a Post</Heading>
              <Text wordBreak="break-word" fontWeight="bold">
                Share your ideas and engage with our growing community
              </Text>
            </NormalCard>
          </GridItem>
          {/* chatbot */}
          <GridItem py={{ base: "10", md: "20" }} colSpan={2}></GridItem>
          <BannerText
            topText="Chatbot"
            middleText="Embrace engaging interactions"
            bottomText="Personalized assistance at your fingertips"
          />

          <GridItem colSpan={2}>
            <LargeCard
              prompt="Chat with AI"
              image="/images/dummy_1600x900.png"
              mobileImage="/images/dummy_600x800.png"
              url="/chatbot"
            >
              <Heading wordBreak="break-word">Powered by OpenAI</Heading>
              <Text wordBreak="break-word" fontWeight="bold">
                Experience a cutting-edge chatbot backed by OpenAI's advanced
                language model, designed to understand and assist you better
              </Text>
            </LargeCard>
          </GridItem>

          <SimpleStack
            weakText="Ready for a personalized experience?"
            strongText="Sign up now and unlock all our features!"
            imageUrls={[
              "/images/dummy_600x900.png",
              "/images/dummy_600x600.png",
              "/images/dummy_600x900.png",
              "/images/dummy_600x800.png",
            ]}
          />
        </GridWrapper>
      </MotionContainer>
    </GridLine>
  );
}
