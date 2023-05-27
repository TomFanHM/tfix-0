import React from "react";

import { firestore } from "@/firebase/firebaseApp";
import { collection, limit, orderBy, query } from "firebase/firestore";
import { getNews } from "./_components/getNews";
import NewsContainer from "./_components/NewsContainer";

//fetch per 1 hour
export const revalidate = 3600;

async function getData() {
  const docRef = collection(firestore, "news");
  const q = query(docRef, orderBy("publishedAt", "desc"), limit(10));
  const data = await getNews(q);

  if (!data.length) {
    throw new Error("Failed to fetch data");
  }

  return data;
}

const News = async (): Promise<JSX.Element> => {
  const articles = await getData();
  return <NewsContainer title="Breaking" getArticles={articles} />;
};

export default News;
