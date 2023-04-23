import { firestore } from "@/firebase/firebaseApp";
import { OptionSchema } from "@/types/types";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { z } from "zod";

export const ArticleSchema = z.object({
  title: z.string().nullable(),
  url: z.string(),
  imageUrl: z.string().nullable(),
  description: z.string().nullable(),
  publishedAt: z.string().datetime(),
  source: z.string().nullable(),
  category: z.string(),
});

export type ArticleSchema = z.infer<typeof ArticleSchema>;

export async function getNews(
  options: OptionSchema[],
  count: number
): Promise<ArticleSchema[]> {
  const docRef = collection(firestore, "news");

  let q = query(docRef);

  options.forEach((option) => {
    q = query(q, where(option.fieldPath, option.opStr, option.value));
  });
  q = query(q, orderBy("publishedAt", "desc"), limit(count));

  const querySnapshot = await getDocs(q);

  const articles = querySnapshot.docs.map((doc) => {
    const rawDocData = doc.data();
    const docData = ArticleSchema.safeParse(rawDocData);
    if (docData.success) {
      return docData.data;
    }
  });

  return articles.flatMap((f) => (f ? [f] : []));
}
