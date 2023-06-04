import React from "react";

import { firestore } from "@/firebase/firebaseApp";
import { collection, limit, orderBy, query } from "firebase/firestore";
import { getNews } from "./_components/getNews";
import NewsContainer from "./_components/NewsContainer";
import { notFound } from "next/navigation";

//fetch per 1 hour
export const revalidate = 3600;

async function getData() {
  const docRef = collection(firestore, "news");
  const q = query(docRef, orderBy("publishedAt", "desc"), limit(10));
  const data = await getNews(q);

  if (!data.length) return null; //no data

  return data;
}

const News = async (): Promise<JSX.Element> => {
  const articles = await getData();

  if (!articles) return notFound();
  
  return <NewsContainer title="Breaking" getArticles={articles} />;
};

export default News;
