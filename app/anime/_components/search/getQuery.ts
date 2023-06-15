import { firestore } from "@/firebase/firebaseApp";
import {
  DocumentData,
  Query,
  collection,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { z } from "zod";

const Filters = z.object({
  anime: z.object({
    year: z.union([z.number(), z.literal("")]),
    season: z.string(),
    genre: z.string(),
    studio: z.string(),
  }),
  product: z.object({
    category: z.string(),
    series: z.string(),
  }),
});

export type Filters = z.infer<typeof Filters>;

export type SearchQuery = {
  query: string;
} & Filters;

export function generateAnimeSearchQuery(
  searchTerms: string,
  filters: Filters["anime"]
): Query<DocumentData> {
  const docRef = collection(firestore, "animes");
  let q = query(docRef);

  if (searchTerms) q = query(q, where("title_english", "==", searchTerms));
  if (filters.year) q = query(q, where("year", "==", filters.year));
  if (filters.season) q = query(q, where("season", "==", filters.season));
  if (filters.genre) {
    const genre = `genres.${filters.genre}`;
    q = query(q, where(genre, "==", true));
  }
  if (filters.studio) {
    const studio = `studios.${filters.studio}`;
    q = query(q, where(studio, "==", true));
  }
  q = query(q, orderBy("mal_id", "desc"), limit(20));

  return q;
}

export function generateProductSearchQuery(
  searchTerms: string,
  filters: Filters["product"]
): Query<DocumentData> {
  const docRef = collection(firestore, "anime_product");
  let q = query(docRef);
  if (searchTerms) q = query(q, where("name", "==", searchTerms));
  if (filters.category) q = query(q, where("category", "==", filters.category));
  if (filters.series)
    q = query(q, where("related", "array-contains", filters.series));
  q = query(q, orderBy("releaseDate", "desc"), limit(20));

  return q;
}
