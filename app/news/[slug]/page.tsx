import { notFound } from "next/navigation";
import React from "react";
import { getNews } from "../getNews";
import NewsContainer from "../NewsContainer";
import { capitalizeFirstLetter } from "@/functions/functions";
import { firestore } from "@/firebase/firebaseApp";
import { collection, limit, orderBy, query, where } from "firebase/firestore";
export const revalidate = 3600;

const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category,
  }));
}

//https://beta.nextjs.org/docs/api-reference/file-conventions/page
const SelectedCategory = async ({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> => {
  if (!categories.includes(params.slug)) {
    notFound();
  }

  const filter = capitalizeFirstLetter(params.slug);
  const docRef = collection(firestore, "news");
  const q = query(
    docRef,
    where("category", "==", filter),
    orderBy("publishedAt", "desc"),
    limit(10)
  );
  const articles = await getNews(q);

  return (
    <NewsContainer title={filter} getArticles={articles} filter={filter} />
  );
};

export default SelectedCategory;
