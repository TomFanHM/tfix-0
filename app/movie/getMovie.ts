import { firestore } from "@/firebase/firebaseApp";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { z } from "zod";

export const MovieSheme = z.object({
  id: z.number(),
  original_language: z.string().nullable(),
  original_title: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  overview: z.string().nullable(),
  release_date: z.string().nullable(),
  title: z.string().nullable(),
  poster_path: z.string().nullable(),
});

export type MovieSheme = z.infer<typeof MovieSheme>;

export type MovieData = { docId: string } & MovieSheme;

export async function getMovies(): Promise<MovieData[] | null> {
  try {
    const moviesRef = collection(firestore, "movies");
    const q = query(moviesRef, orderBy("release_date", "desc"), limit(30));
    const querySnapshot = await getDocs(q);

    const movies = querySnapshot.docs.map((doc) => {
      const rawDocData = doc.data();
      const docData = MovieSheme.safeParse(rawDocData);
      if (docData.success) {
        return { docId: doc.id, ...docData.data };
      }
    });

    return movies.flatMap((f) => (f ? [f] : []));
  } catch (error) {
    console.log("getMovies: ", error);
  }
  return null;
}
