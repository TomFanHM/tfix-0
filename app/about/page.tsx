import HeroBanner from "@/components/chakra/ui/HeroBanner";
import React from "react";

const About: React.FC = () => {
  return (
    <>
      <HeroBanner
        image="/images/banner.png"
        mobileImage="/images/banner_mobile.png"
        title="About Us"
        message="Our mission is to provide you with a gateway to knowledge and entertainment. Explore our content and let your curiosity guide you on a journey."
      />
    </>
  );
};
export default About;
