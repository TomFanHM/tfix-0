import GridWrapper from "@/components/container/GridWrapper";
import MotionContainer from "@/components/container/MotionContainer";
import { Heading, Text } from "@/components/chakra/TypographyComponents";
import { GridItem } from "@/components/chakra/LayoutComponents";
import NormalCard from "@/components/chakra/ui/NormalCard";
import LargeCard from "@/components/chakra/ui/LargeCard";
import HeroBanner from "@/components/chakra/ui/HeroBanner";
import BannerText from "@/components/chakra/ui/BannerText";
import CallToAction from "@/components/chakra/ui/CallToAction";
import NewsletterSection from "@/components/chakra/ui/Newsletter";
import GridLine from "@/components/container/GridLine";

const Spacer = () => {
  return <GridItem py={{ base: "8", md: "16" }} colSpan={2}></GridItem>;
};

export default function Home() {
  return (
    <GridLine>
      {/* */}
      <HeroBanner
        image="/images/home/banner.png"
        mobileImage="/images/home/banner_mobile.png"
        title={
          <>
            <Text as="span">Your Gateway to </Text>
            <Text
              as="span"
              bgGradient="linear(to-l, var(--secondary), var(--tertiary))"
              bgClip="text"
            >
              Discovery
            </Text>
          </>
        }
        message="Unlock endless possibilities, fuel your curiosity, and let your imagination soar in this world of discovery"
      />
      {/* */}
      <MotionContainer>
        <GridWrapper>
          {/* news */}
          {/* */}
          <GridItem colSpan={2} mx="10">
            <BannerText
              line1="News"
              line2={
                <>
                  <Text as="span" color="var(--primary)">
                    Stay informed
                  </Text>
                  <Text as="span">, stay connected</Text>
                </>
              }
              line3="Unravel diverse perspectives and explore the world through journalism"
            />
          </GridItem>
          {/* */}
          <GridItem colSpan={2}>
            <LargeCard
              prompt="Catch up now"
              image="/images/home/news.png"
              mobileImage="/images/home/news_mobile.png"
              url="/news"
              color="#282828"
            >
              <Heading wordBreak="break-word">Breaking News</Heading>
              <Text wordBreak="break-word" fontWeight="bold">
                Get the latest headlines and updates in real-time
              </Text>
            </LargeCard>
          </GridItem>

          {/* media, including anime and movie */}
          {/* */}
          <Spacer />
          {/* */}
          <GridItem colSpan={2} mx="10">
            <BannerText
              line1="Media"
              line2="Experience the magic of storytelling"
              line3="Discover a vast collection of movies and anime"
            />
          </GridItem>
          {/* */}
          <GridItem colSpan={2}>
            <LargeCard
              prompt="Watch now"
              image="/images/home/anime.png"
              mobileImage="/images/home/anime_mobile.png"
              url="/anime"
              color="#282828"
            >
              <Heading wordBreak="break-word">Featured Anime</Heading>
              <Text wordBreak="break-word" fontWeight="bold">
                Immerse yourself in our curated anime selection, handpicked by
                our staff for your enjoyment
              </Text>
            </LargeCard>
          </GridItem>
          {/* */}
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <NormalCard
              prompt="Discover new"
              image="/images/home/search.png"
              url="/anime/search"
              color="#282828"
            >
              <Heading wordBreak="break-word">Search</Heading>
              <Text wordBreak="break-word" fontWeight="bold">
                Find your next favorite anime by searching our vast collection
              </Text>
            </NormalCard>
          </GridItem>
          {/* */}
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <NormalCard
              prompt="See popular"
              image="/images/home/movie.png"
              url="/movie"
              color="#282828"
            >
              <Heading wordBreak="break-word">Popular Movie</Heading>
              <Text wordBreak="break-word" fontWeight="bold">
                Explore the most popular movies loved by our community
              </Text>
            </NormalCard>
          </GridItem>

          {/* blog */}
          {/* */}
          <Spacer />
          {/* */}
          <GridItem colSpan={2} mx="10">
            <BannerText
              line1="Blog"
              line2={
                <>
                  <Text as="span">Share your thoughts, </Text>
                  <Text as="span" color="var(--primary)">
                    create connections
                  </Text>
                </>
              }
              line3="Voice your opinions and interact with like-minded individuals. Experience the power of collective wisdom"
            />
          </GridItem>
          {/* */}
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <NormalCard
              prompt="Read more"
              image="/images/home/blog.png"
              url="/blogs"
              color="#282828"
            >
              <Heading wordBreak="break-word">Featured Posts</Heading>
              <Text wordBreak="break-word" fontWeight="bold">
                Read insightful articles by our talented contributors
              </Text>
            </NormalCard>
          </GridItem>
          {/* */}
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <NormalCard
              prompt="Start writing"
              image="/images/home/create.png"
              url="/blogs/create"
              color="#282828"
            >
              <Heading wordBreak="break-word">Write a Post</Heading>
              <Text wordBreak="break-word" fontWeight="bold">
                Share your ideas and engage with our growing community
              </Text>
            </NormalCard>
          </GridItem>
          {/* chatbot */}
          {/* */}
          <Spacer />
          {/* */}
          <GridItem colSpan={2} mx="10">
            <BannerText
              line1="Chatbot"
              line2="Embrace engaging interactions"
              line3="Personalized assistance at your fingertips"
            />
          </GridItem>
          {/* */}
          <GridItem colSpan={2}>
            <LargeCard
              prompt="Chat with AI"
              image="/images/home/chatbot.png"
              mobileImage="/images/home/chatbot_mobile.png"
              url="/chatbot"
              color="#f4f4f4"
            >
              <Heading wordBreak="break-word">Powered by OpenAI</Heading>
              <Text wordBreak="break-word" fontWeight="bold">
                Experience a cutting-edge chatbot backed by OpenAI&apos;s
                advanced language model, designed to understand and assist you
                better
              </Text>
            </LargeCard>
          </GridItem>
          {/* */}
          <Spacer />
          {/* */}
          <GridItem colSpan={2}>
            <CallToAction
              background="var(--secondaryContainer)"
              color="var(--onSecondaryContainer)"
              images={[
                { url: "/images/home/one_side_front.png", aspectRatio: "2/3" },
                { url: "/images/home/one_side.png", aspectRatio: "1/1" },
                {
                  url: "/images/home/one_side_front_other.png",
                  aspectRatio: "2/3",
                },
                { url: "/images/home/one_side_male.png", aspectRatio: "3/4" },
              ]}
            >
              <Text as="b">Ready for a personalized experience?</Text>
              <Heading mt="6" size={{ base: "2xl", md: "4xl" }}>
                Sign up now and unlock all our features!
              </Heading>
            </CallToAction>
          </GridItem>
          {/* */}
          <Spacer />
          {/* */}
          <GridItem colSpan={2}>
            <NewsletterSection />
          </GridItem>
        </GridWrapper>
      </MotionContainer>
    </GridLine>
  );
}
