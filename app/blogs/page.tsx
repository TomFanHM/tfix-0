import { firestore } from "@/firebase/firebaseApp";
import { collection, limit, orderBy, query } from "firebase/firestore";
import React from "react";
import { getPosts } from "./_components/getPosts";
import BlogContainer from "./_components/BlogContainer";

//export const revalidate = 3600;

async function getData() {
  const postsDocRef = collection(firestore, "posts");
  const q = query(postsDocRef, orderBy("createdAt", "desc"), limit(20));
  const data = await getPosts(q);

  return data;
}

const Blogs = async (): Promise<JSX.Element> => {
  const posts = await getData();

  return <BlogContainer posts={posts} />;
};
export default Blogs;
