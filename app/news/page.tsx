import React from "react";

import { firestore } from "@/firebase/firebaseApp";
import { collection, limit, orderBy, query } from "firebase/firestore";
import { getNews } from "./_components/getNews";
import NewsContainer from "./_components/NewsContainer";

//fetch per 1 hour
export const revalidate = 3600;

const News = async (): Promise<JSX.Element> => {
  const docRef = collection(firestore, "news");

  const q = query(docRef, orderBy("publishedAt", "desc"), limit(10));

  const articles = await getNews(q);
  return <NewsContainer title="Breaking" getArticles={articles} />;
};

export default News;
