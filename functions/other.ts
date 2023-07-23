import axios from "axios";
import xss from "xss";

export const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export function getYoutubeEmbedLink(input: string): string {
  if (input.startsWith("https://www.youtube-nocookie.com/embed/")) {
    return input;
  }

  if (input.startsWith("https://www.youtube.com/embed/")) {
    return input.replace(
      "https://www.youtube.com/embed/",
      "https://www.youtube-nocookie.com/embed/"
    );
  }

  return `https://www.youtube-nocookie.com/embed/${input}`;
}

export function cleanHtml(dirty: string): string {
  const clean = xss(dirty);
  return clean;
}

export async function revalidatePathByNextApi(path: string) {
  const basePath = process.env.NEXT_PUBLIC_APP_URL;
  const secret = process.env.NEXT_PUBLIC_APP_REVALIDATION_SECRET;
  if (!basePath) return null;

  try {
    const res = await axios.get<{
      revalidated: boolean;
      now: number;
      error: string;
    }>(`${basePath}/api/revalidate`, {
      params: {
        path: path,
        secret: secret,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
  return null;
}
