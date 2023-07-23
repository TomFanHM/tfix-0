import { notFound } from "next/navigation";
import React from "react";
import { firestore } from "@/firebase/firebaseApp";
import { collection, limit, orderBy, query, where } from "firebase/firestore";
import { getNews } from "../_components/getNews";
import NewsContainer from "../_components/NewsContainer";
import { capitalizeFirstLetter } from "@/functions/string";

export const revalidate = 3600;
export const dynamicParams = false; //Dynamic segments not included in generateStaticParams will return a 404

const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props) {
  const category = capitalizeFirstLetter(params.slug);
  return {
    title: `${category} News`,
    description:
      "Stay informed with our up-to-date news coverage. Find the latest breaking news, analysis, and commentary on various topics, including politics, business, entertainment, and more.",
  };
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category,
  }));
}

async function getData(category: string) {
  const docRef = collection(firestore, "news");
  const q = query(
    docRef,
    where("category", "==", capitalizeFirstLetter(category)),
    orderBy("publishedAt", "desc"),
    limit(20)
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
