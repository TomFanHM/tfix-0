import SimpleStack from "@/components/action/SimpleStack";
import LargeCard from "@/components/card/LargeCard";
import NormalCard from "@/components/card/NormalCard";
import GridLine from "@/components/container/GridLine";
import GridWrapper from "@/components/container/GridWrapper";
import MotionContainer from "@/components/container/MotionContainer";
import BannerText from "@/components/hero/BannerText";
import HeroBanner from "@/components/hero/HeroBanner";
import GridSpacer from "@/components/others/GridSpacer";

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
          <LargeCard
            title="Breaking News"
            message="Get the latest headlines and updates in real-time"
            prompt="Catch up now"
            backgroundImage="/images/dummy_1600x900.png"
            backgroundImageMobile="/images/dummy_600x800.png"
            customColor={{ light: "#000", dark: "#000" }}
            url="/news"
          />
          {/* media, including anime and movie */}
          <GridSpacer />
          <BannerText
            topText="Media"
            middleText="Experience the magic of storytelling"
            bottomText="Discover a vast collection of movies and anime"
          />
          <LargeCard
            title="Featured Anime"
            message="Immerse yourself in our curated anime selection, handpicked by our staff for your enjoyment"
            prompt="Watch now"
            backgroundImage="/images/dummy_1600x900.png"
            backgroundImageMobile="/images/dummy_600x800.png"
            url="/anime"
          />
          <NormalCard
            title="New Releases"
            message="Stay updated with the latest anime titles"
            prompt="Discover new"
            backgroundImage="/images/dummy_600x800.png"
            customColor={{ light: "#000", dark: "#000" }}
            url="/anime/new_releases"
          />
          <NormalCard
            title="Popular Movie"
            message="Explore the most popular movies loved by our community"
            prompt="See popular"
            backgroundImage="/images/dummy_600x800.png"
            customColor={{ light: "#000", dark: "#000" }}
            url="/movie"
          />
          {/* blog */}
          <GridSpacer />
          <BannerText
            topText="Blog"
            middleText="Share your thoughts, create connections"
            bottomText="Voice your opinions and interact with like-minded individuals. Experience the power of collective wisdom"
          />
          <NormalCard
            title="Featured Posts"
            message="Read insightful articles by our talented contributors"
            prompt="Read more"
            backgroundImage="/images/dummy_600x800.png"
            customColor={{ light: "#000", dark: "#000" }}
            url="/blog"
          />
          <NormalCard
            title="Write a Post"
            message="Share your ideas and engage with our growing community"
            prompt="Start writing"
            backgroundImage="/images/dummy_600x800.png"
            customColor={{ light: "#000", dark: "#000" }}
            url="/blog/create"
          />
          {/* chatbot */}
          <GridSpacer />
          <BannerText
            topText="Chatbot"
            middleText="Embrace engaging interactions"
            bottomText="Personalized assistance at your fingertips"
          />
          <LargeCard
            title="Powered by OpenAI"
            message="Experience a cutting-edge chatbot backed by OpenAI's advanced language model, designed to understand and assist you better"
            prompt="Chat with AI"
            backgroundImage="/images/dummy_1600x900.png"
            backgroundImageMobile="/images/dummy_600x800.png"
            customColor={{ light: "#fff", dark: "#fff" }}
            url="/chatbot"
          />

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
