import { firestore } from "@/firebase/firebaseApp";
import { collection, query, orderBy, limit } from "firebase/firestore";
import React from "react";
import { getPostById, getPosts } from "../_components/getPosts";
import { notFound } from "next/navigation";

export const revalidate = 86400; //3600 * 24;

export async function generateStaticParams() {
  const postsDocRef = collection(firestore, "posts");
  const q = query(postsDocRef, orderBy("createdAt", "desc"), limit(100));
  const data = await getPosts(q);

  const postList = data.map((post) => ({ slug: post.id }));

  return postList;
}

const PostDetail = async ({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> => {
  const post = await getPostById(params.slug);
  if (!post) notFound();
  return <div>Have a good coding</div>;
};
export default PostDetail;
