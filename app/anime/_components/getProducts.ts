import { firestore } from "@/firebase/firebaseApp";
import {
  DocumentData,
  Query,
  collection,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
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

export async function getProducts(searchTerm: string | null) {
  try {
    if (!searchTerm) return null;
    const docRef = collection(firestore, "anime_product");
    let q = query(
      docRef,
      where("related", "array-contains", searchTerm),
      limit(10)
    );

    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map((doc) => {
      const rawDocData = doc.data();
      const docData = ProductSchema.safeParse(rawDocData);

      if (docData.success) {
        return docData.data;
      }
    });

    return products.flatMap((f) => (f ? [f] : []));
  } catch (error) {
    console.log("getProducts: ", error);
    return null;
  }
}

export async function getProductsByFilter(q: Query<DocumentData>) {
  try {
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map((doc) => {
      const rawDocData = doc.data();
      const docData = ProductSchema.safeParse(rawDocData);

      if (docData.success) {
        return docData.data;
      }
    });

    return products.flatMap((f) => (f ? [f] : []));
  } catch (error) {
    console.log("getProductsByFilter: ", error);
  }
  return null;
}

/* export async function getProductsByReducingSearchTerms(
  searchTerm: string | null
) {
  if (!searchTerm) return null;
  //remove symbol
  const cleanedSearchTerm = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
  const words = cleanedSearchTerm.split(" ");

  while (words.length > 0) {
    const currentSearchTerm = words.join(" ");
    const result = await getProducts(currentSearchTerm);
    //the result should be array, if null, stop fetch
    if (!result) return null;
    if (result && result.length) return result; //check length bigger than 0
    words.pop(); //remove end item
  }

  return null;
} */
