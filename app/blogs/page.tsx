import { firestore } from "@/firebase/firebaseApp";
import { collection, limit, orderBy, query } from "firebase/firestore";
import React from "react";

import { notFound } from "next/navigation";
import BlogContainer from "./_components/BlogContainer";
import { getPosts } from "./_components/getPosts";

//export const revalidate = 3600 * 24;

const Blog = async (): Promise<JSX.Element> => {
  const postsDocRef = collection(firestore, "posts");
  const q = query(postsDocRef, orderBy("createdAt", "desc"), limit(20));
  const posts = await getPosts(q);

  if (!posts.length) notFound();
  return <BlogContainer posts={posts} />;
};
export default Blog;
