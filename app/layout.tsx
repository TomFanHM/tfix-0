import { siteConfig } from "@/config/site";
import AppLayout from "./AppLayout";
import "@fontsource/roboto/400.css";
import "@fontsource/open-sans/400.css";
import "react-quill/dist/quill.snow.css";
import { Metadata } from "next";
//import Analytics from "@/components/others/Analytics";
import Indicator from "@/components/others/Indicator";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: siteConfig.name,
  },
  verification: {
    google: "G1fdKaWiLVjT0jg00pyrdcncs1OjOocbEussHVq-4Bk",
  },
  description: siteConfig.description,
  keywords: [
    "Next",
    "React",
    "TFIX",
    "Server Components",
    "Chakra UI",
    "News",
    "Anime",
    "Blog",
    "ChatGPT",
  ],
  authors: [
    {
      name: "Tom Fan",
      url: "https://github.com/TomFanHM",
    },
  ],
  creator: "Tom Fan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og.png`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.png`],
    creator: "Tom Fan",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        {/* <Analytics /> */}
        <AppLayout>
          <Indicator />
          {children}
        </AppLayout>
      </body>
    </html>
  );
}
