import { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "TFIX",
  description: "Your go-to source for the latest news, anime updates, and engaging blog posts.",
  url: "https://tfix-module.com/",
  ogImage: "https://firebasestorage.googleapis.com/v0/b/tfix-fs.appspot.com/o/TFIX.png?alt=media&token=9ce11a8b-0e98-4a55-873b-8b8cb8b766ba",
  links: {
    twitter: "https://twitter.com/HoManFan1",
    github: "https://github.com/TomFanHM/TFIX",
  },
};

export const fallbackImage = "/fallback.png";

export const headerDisabledRoute = ["chatbot"];

export const footerDisabledRoute = ["chatbot"];
