import { notFound } from "next/navigation";
import React from "react";

import { capitalizeFirstLetter } from "@/functions/functions";
import { firestore } from "@/firebase/firebaseApp";
import { collection, limit, orderBy, query, where } from "firebase/firestore";
import { getNews } from "../_components/getNews";
import NewsContainer from "../_components/NewsContainer";
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

async function getData(category: string) {
  if (!categories.includes(category)) return null; //Invalid category
  const docRef = collection(firestore, "news");
  const q = query(
    docRef,
    where("category", "==", capitalizeFirstLetter(category)),
    orderBy("publishedAt", "desc"),
    limit(10)
  );
  const data = await getNews(q);
  if (!data.length) return null; //no data
  return data;
}

//https://beta.nextjs.org/docs/api-reference/file-conventions/page
const SelectedCategory = async ({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> => {
  const articles = await getData(params.slug);

  if (!articles) return notFound();

  const filter = capitalizeFirstLetter(params.slug);

  return (
    <NewsContainer title={filter} getArticles={articles} filter={filter} />
  );
};

export default SelectedCategory;
