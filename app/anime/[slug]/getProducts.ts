import { firestore } from "@/firebase/firebaseApp";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { z } from "zod";

const ProductSchema = z.object({
  title: z.string(),
  image: z.string(),
  link: z.string(),
  name: z.string(),
  series: z.string(),
  manufacturer: z.string(),
  category: z.string(),
  price: z.string(),
  releaseDate: z.string(),
  specifications: z.string(),
  sculptor: z.string(),
  paintwork: z.string(),
  images: z.array(z.string()),
});

export type ProductSchema = z.infer<typeof ProductSchema>;

//use ja
export async function getProducts(title: string) {
  const docRef = collection(firestore, "anime_product");
  let q = query(docRef, where("series", "in", title), limit(10));
  const querySnapshot = await getDocs(q);

  const products = querySnapshot.docs.map((doc) => {
    const rawDocData = doc.data();
    const docData = ProductSchema.safeParse(rawDocData);

    if (docData.success) {
      return docData.data;
    }
  });

  return products.flatMap((f) => (f ? [f] : []));
}
