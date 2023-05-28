import { firestore } from "@/firebase/firebaseApp";
import { collection, limit, orderBy, query } from "firebase/firestore";
import React from "react";
import BlogContainer from "./_components/BlogContainer";
import { getPosts } from "./_components/getPosts";

export const revalidate = 3600;

async function getData() {
  const postsDocRef = collection(firestore, "posts");
  const q = query(postsDocRef, orderBy("createdAt", "desc"), limit(20));
  const data = await getPosts(q);

  if (!data.length) {
    throw new Error("Failed to fetch data");
  }

  return data;
}

const Blog = async (): Promise<JSX.Element> => {
  const posts = await getData();

  return <BlogContainer posts={posts} />;
};
export default Blog;
