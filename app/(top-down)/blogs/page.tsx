import { firestore } from "@/firebase/firebaseApp";
import { collection, limit, orderBy, query } from "firebase/firestore";
import React from "react";
import { getPosts } from "./_components/getPosts";
import { notFound } from "next/navigation";
import BlogContainer from "./_components/BlogContainer";
import { Metadata } from "next";

export const revalidate = 0;
//export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Our blog page is a platform for you to share your thoughts and ideas with the world. Write about any topic that interests you, and connect with other bloggers who share your passion. Whether you're a seasoned writer or just starting out, our blog is the perfect place to share your voice and join a community of like-minded individuals.",
};

async function getData() {
  const postsDocRef = collection(firestore, "posts");
  const q = query(postsDocRef, orderBy("createdAt", "desc"), limit(20));
  const data = await getPosts(q);
  if (!data.length) return null; //no data
  return data;
}

const Blogs = async (): Promise<JSX.Element> => {
  const posts = await getData();
  if (!posts) return notFound();

  return <BlogContainer posts={posts} />;
};

export default Blogs;
