import { notFound } from "next/navigation";
import React from "react";
import { getNews } from "../getNews";
import NewsContainer from "../NewsContainer";
import { capitalizeFirstLetter } from "@/functions/functions";
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
  const filter = capitalizeFirstLetter(params.slug);
  const articles = await getNews(
    [
      {
        fieldPath: "category",
        opStr: "==",
        value: filter,
      },
    ],
    10
  );

  if (!categories.includes(params.slug)) {
    notFound();
  }

  return (
    <NewsContainer title={filter} getArticles={articles} filter={filter} />
  );
};

export default SelectedCategory;
