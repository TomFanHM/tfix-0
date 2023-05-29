import { firestore } from "@/firebase/firebaseApp";
import { collection, limit, orderBy, query } from "firebase/firestore";
import React from "react";
//import BlogContainer from "./_components/BlogContainer";
import { getPosts } from "./_components/getPosts";

export const revalidate = 3600;

async function getData() {
  const postsDocRef = collection(firestore, "posts");
  const q = query(postsDocRef, orderBy("createdAt", "desc"), limit(20));
  const data = await getPosts(q);

  return data;
}

const Blogs = async (): Promise<JSX.Element> => {
  const posts = await getData();

  return (
    <>
      <h1>hi</h1>
      {/* <BlogContainer posts={posts} /> */}
    </>
  );
};
export default Blogs;
