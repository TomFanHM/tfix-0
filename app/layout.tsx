import MainContainer from "@/components/container/MainContainer";
import { siteConfig } from "@/config/site";
import AppLayout from "./AppLayout";

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  verification: {
    google: "G1fdKaWiLVjT0jg00pyrdcncs1OjOocbEussHVq-4Bk",
    yandex: "yandex",
    yahoo: "yahoo",
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
        url: `${siteConfig.url}/og.png`,
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  manifest: `${siteConfig.url}/site.webmanifest`,
  robots: {
    follow: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
