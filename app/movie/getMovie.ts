import { DocumentData, Query, getDocs } from "firebase/firestore";
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

export async function getMovies(q: Query<DocumentData>): Promise<MovieData[]> {
  const querySnapshot = await getDocs(q);

  const movies = querySnapshot.docs.map((doc) => {
    const rawDocData = doc.data();
    const docData = MovieSheme.safeParse(rawDocData);
    if (docData.success) {
      return { docId: doc.id, ...docData.data };
    }
  });

  return movies.flatMap((f) => (f ? [f] : []));
}
