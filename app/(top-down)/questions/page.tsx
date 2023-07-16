import HeroBanner from "@/components/chakra/ui/HeroBanner";
import MotionContainer from "@/components/container/MotionContainer";
import React from "react";
import FAQSection from "./_components/FAQSection";

const Questions: React.FC = () => {
  return (
    <>
      <HeroBanner
        image="/images/questions/questions.png"
        mobileImage="/images/questions/questions_mobile.png"
        title="Frequently Asked Questions"
        message="Finding the answers to your questions doesn't have to be hard."
      />
      <MotionContainer>
        <FAQSection />
      </MotionContainer>
    </>
  );
};
export default Questions;
