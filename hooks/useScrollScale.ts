import { useEffect, useState } from "react";

//this hook is used to handle the scale for animation

const getScrollPosition = (): number => window.scrollY;

export const useScrollScale = (
  initialScale = 1,
  scaleRate = 1000,
  maxScale = 1.2
): number => {
  const [scale, setScale] = useState<number>(initialScale);
  const [scrollTop, setScrollTop] = useState<number>(0);

  const handleScroll = () => {
    const scrollPosition = getScrollPosition();
    setScrollTop(scrollPosition);
  };

  useEffect(() => {
    const calculatedScale = initialScale + scrollTop / scaleRate;
    setScale(Math.min(calculatedScale, maxScale));

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollTop, initialScale, scaleRate, maxScale]);

  return scale;
};
