import React from "react";
import { getNews } from "./getNews";

import NewsContainer from "./NewsContainer";
//fetch per 1 hour
export const revalidate = 3600;

const News = async (): Promise<JSX.Element> => {
  const articles = await getNews([], 10);
  return <NewsContainer title="Breaking" getArticles={articles} />;
};

export default News;
