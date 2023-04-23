import { z } from "zod";
import { firestore } from "@/firebase/firebaseApp";
import { collection, query, where, limit, getDocs } from "firebase/firestore";
import { OptionSchema } from "@/types/types";

export const AnimeSchema = z.object({
  mal_id: z.number(),
  image: z.string().nullable(),
  trailer_embed_url: z.string().nullable(),
  title_english: z.string().nullable(),
  title_japanese: z.string().nullable(),
  type: z.string().nullable(),
  episodes: z.number(),
  synopsis: z.string().nullable(),
  background: z.string().nullable(),
  season: z.string().nullable(),
  year: z.number().nullable(),
  broadcast_day: z.string().nullable(),
});

export type AnimeSchema = z.infer<typeof AnimeSchema>;

export async function getAnimes(
  options: OptionSchema[],
  count: number
): Promise<AnimeSchema[]> {
  const animesRef = collection(firestore, "animes");

  let q = query(animesRef);

  options.forEach((option) => {
    q = query(q, where(option.fieldPath, option.opStr, option.value));
  });

  q = query(q, limit(count));
  const querySnapshot = await getDocs(q);

  const animes = querySnapshot.docs.map((doc) => {
    const rawDocData = doc.data();
    const docData = AnimeSchema.safeParse(rawDocData);

    if (docData.success) {
      return docData.data;
    }
  });

  return animes.flatMap((f) => (f ? [f] : []));
}

export function getCurrentSeason(): "winter" | "spring" | "summer" | "fall" {
  const currentDate = new Date();
  const month = currentDate.getMonth();

  if (month >= 0 && month <= 2) {
    return "winter";
  } else if (month >= 3 && month <= 5) {
    return "spring";
  } else if (month >= 6 && month <= 8) {
    return "summer";
  } else {
    return "fall";
  }
}

export function getNextSeason(): "winter" | "spring" | "summer" | "fall" {
  const currentSeason = getCurrentSeason();

  switch (currentSeason) {
    case "winter":
      return "spring";
    case "spring":
      return "summer";
    case "summer":
      return "fall";
    case "fall":
      return "winter";
    default:
      throw new Error("Invalid season");
  }
}
