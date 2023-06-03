import { useState, useEffect } from "react";

//bigger scaleRate -> slower scale change

export const useScrollScale = (
  initialScale = 1,
  scaleRate = 1000,
  maxScale = 1.2
): number => {
  const [scale, setScale] = useState<number>(initialScale);
  const [scrollTop, setScrollTop] = useState<number>(0);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setScrollTop(scrollPosition);
  };

  useEffect(() => {
    const calculatedScale = initialScale + scrollTop / scaleRate;
    setScale(Math.min(calculatedScale, maxScale));

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [initialScale, scaleRate, scrollTop, maxScale]);

  return scale;
};
