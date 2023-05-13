import { firestore } from "@/firebase/firebaseApp";
import { collection } from "firebase/firestore";
import { z } from "zod";

const Filters = z.object({
  anime: z.object({
    year: z.union([z.number(), z.literal("")]),
    season: z.string(),
    genres: z.string(),
    studios: z.string(),
  }),
  product: z.object({
    category: z.string(),
    series: z.string(),
  }),
});

export type Filters = z.infer<typeof Filters>;

type SearchQuery = {
  query: string;
  category: "Anime" | "Product";
} & Filters;

export async function getData(searchQuery: SearchQuery) {
  try {
    let q;
    switch (searchQuery.category) {
      case "Anime":
        q = collection(firestore, "animes");
        break;
      case "Product":
        q = collection(firestore, "anime_product");
        break;
      default:
        break;
    }
  } catch (error) {}
}
