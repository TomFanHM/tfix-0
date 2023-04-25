import MainContainer from "@/components/container/MainContainer";
import { siteConfig } from "@/config/site";
import AppLayout from "./AppLayout";
import { absoluteUrl } from "@/lib/utils";

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
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
        url: absoluteUrl("/og.jpg"),
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
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
    <html lang="en">
      <head />
      <body>
        <AppLayout>
          <MainContainer>{children}</MainContainer>
        </AppLayout>
      </body>
    </html>
  );
}
