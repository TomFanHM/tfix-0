import { newsConfig } from "@/config/news";
import { siteConfig } from "@/config/site";
import { firestore } from "@/firebase/firebaseApp";
import { collection, query, orderBy } from "firebase/firestore";
import { MetadataRoute } from "next";
import { getAnimes } from "./(top-down)/anime/_components/getAnimes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const newsUrls = newsConfig.mainNav.map((el) => ({
    url: `${baseUrl}${el.href}`,
    lastModified: new Date(),
  }));
  //
  const animesRef = collection(firestore, "animes");
  const q = query(animesRef, orderBy("popularity", "asc"));
  const anime = await getAnimes(q);
  const animeUrls = anime.map((anime) => ({
    url: `${baseUrl}/anime/${anime.id}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...newsUrls,
    {
      url: `${baseUrl}/anime/search`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/anime`,
      lastModified: new Date(),
    },
    ...animeUrls,
    {
      url: `${baseUrl}/movie`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
    },
  ];
}
