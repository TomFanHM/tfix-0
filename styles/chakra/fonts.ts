import { Roboto, Open_Sans } from "next/font/google";

export const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const openSans = Open_Sans({
  weight: "400",
  subsets: ["latin"],
});

export const fonts = {
  body: openSans.style.fontFamily,
  heading: roboto.style.fontFamily,
};
