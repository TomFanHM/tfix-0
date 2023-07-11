import React from "react";

import { firestore } from "@/firebase/firebaseApp";
import { collection, limit, orderBy, query } from "firebase/firestore";
import { getNews } from "./_components/getNews";
import NewsContainer from "./_components/NewsContainer";
import { notFound } from "next/navigation";
import { Metadata } from "next";

//fetch per 1 hour
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Breaking News",
  description:
    "Stay informed with our up-to-date news coverage. Find the latest breaking news, analysis, and commentary on various topics, including politics, business, entertainment, and more.",
};

async function getData() {
  const docRef = collection(firestore, "news");
  const q = query(docRef, orderBy("publishedAt", "desc"), limit(20));
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
