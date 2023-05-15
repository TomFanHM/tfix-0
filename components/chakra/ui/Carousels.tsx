"use client";
//https://choc-ui.com/
import { Flex, HStack, Box, Text, Image } from "@chakra-ui/react";
import { useState } from "react";
import React from "react";
import { z } from "zod";

const SlidesSchema = z.object({ img: z.string() }).array();
export type SlidesSchema = z.infer<typeof SlidesSchema>;

type CarouselsProps = {
  slides: SlidesSchema;
};

const arrowStyles = {
  cursor: "pointer",
  position: "absolute",
  top: "50%",
  w: "auto",
  p: "4",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "18px",
  transition: "0.6s ease",
  borderRadius: "0 3px 3px 0",
  transform: "translate(0, -50%)",
  _hover: {
    opacity: 0.8,
    bg: "blackAlpha.800",
  },
} as const;

export const Carousels: React.FC<CarouselsProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const slidesCount = slides.length;

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  };

  const setSlide = (slide: number) => {
    setCurrentSlide(slide);
  };

  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 100}%`,
  };

  return (
    <Flex
      w="full"
      borderRadius="20px"
      overflow="hidden"
      align="center"
      justify="center"
    >
      <Flex w="full" overflow="hidden" position="relative">
        <Flex h="400px" w="full" {...carouselStyle}>
          {slides.map((slide, sid) => (
            <Box key={`slide-${sid}`} boxSize="full" shadow="md" flex="none">
              <Image
                src={slide.img}
                alt="carousel image"
                w="full"
                h="full"
                color="transparent"
                objectFit="cover"
              />
            </Box>
          ))}
        </Flex>
        <Text {...arrowStyles} left="0" onClick={prevSlide}>
          &#10094;
        </Text>
        <Text {...arrowStyles} right="0" onClick={nextSlide}>
          &#10095;
        </Text>
        <HStack justify="center" position="absolute" bottom="2" w="full">
          {Array.from({
            length: slidesCount,
          }).map((_, slide) => (
            <Box
              key={`dots-${slide}`}
              cursor="pointer"
              boxSize={["2", null, "4"]}
              m="0 2px"
              bg={currentSlide === slide ? "blackAlpha.800" : "blackAlpha.500"}
              rounded="50%"
              display="inline-block"
              transition="background-color 0.6s ease"
              _hover={{
                bg: "blackAlpha.800",
              }}
              onClick={() => setSlide(slide)}
            ></Box>
          ))}
        </HStack>
      </Flex>
    </Flex>
  );
};
