import { z } from "zod";
import { firestore } from "@/firebase/firebaseApp";
import {
  collection,
  query,
  where,
  limit,
  getDocs,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
import { OptionSchema } from "@/types/types";

export const AnimeSchema = z.object({
  mal_id: z.number(),
  background: z.string().nullable(),
  broadcast_day: z.string().nullable(),
  episodes: z.number().nullable(),
  genres: z.string().array(),
  image: z.string().nullable(),
  popularity: z.number(),
  season: z.string(),
  source: z.string().nullable(),
  status: z.string(),
  studios: z.string().array(),
  synopsis: z.string().nullable(),
  title_english: z.string().nullable(),
  title_japanese: z.string().nullable(),
  trailer_embed_url: z.string().nullable(),
  trailer_image: z.string().nullable(),
  type: z.string().nullable(),
  year: z.number().nullable(),
});

export type AnimeSchema = z.infer<typeof AnimeSchema>;

export type AnimeData = { id: string } & AnimeSchema;

export async function getAnimes(
  options: OptionSchema[],
  count: number
): Promise<AnimeData[]> {
  const animesRef = collection(firestore, "animes");

  let q = query(animesRef);

  options.forEach((option) => {
    q = query(q, where(option.fieldPath, option.opStr, option.value));
  });

  q = query(q, orderBy("popularity", "asc"), limit(count));
  const querySnapshot = await getDocs(q);

  const animes = querySnapshot.docs.map((doc) => {
    const rawDocData = doc.data();
    const docData = AnimeSchema.safeParse(rawDocData);

    if (docData.success) {
      return { ...docData.data, id: doc.id };
    }
  });

  return animes.flatMap((f) => (f ? [f] : []));
}

export async function getAnimeById(id: string) {
  const docRef = doc(firestore, "animes", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const result = AnimeSchema.parse(docSnap.data());
    return result;
  }
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

export function getAnimeSeasons() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const seasonList = ["winter", "spring", "summer", "fall"];
  const monthToSeasonMap = {
    0: "winter",
    1: "winter",
    2: "winter",
    3: "spring",
    4: "spring",
    5: "spring",
    6: "summer",
    7: "summer",
    8: "summer",
    9: "fall",
    10: "fall",
    11: "fall",
  };

  const currentSeason =
    monthToSeasonMap[currentMonth as keyof typeof monthToSeasonMap];
  const currentSeasonIndex = seasonList.indexOf(currentSeason);
  const nextSeasonIndex = (currentSeasonIndex + 1) % seasonList.length;
  const nextSeason = seasonList[nextSeasonIndex];
  const nextSeasonYear =
    currentSeason === "fall" ? currentYear + 1 : currentYear;

  return {
    current: { year: currentYear, season: currentSeason },
    next: { year: nextSeasonYear, season: nextSeason },
  };
}
