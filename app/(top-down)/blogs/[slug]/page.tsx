import { firestore } from "@/firebase/firebaseApp";
import { collection, query, orderBy, limit, where } from "firebase/firestore";
import React from "react";
import { getComments, getPostById, getPosts } from "../_components/getPosts";
import { notFound } from "next/navigation";
import Maintenance from "@/components/others/Maintenance";

export const revalidate = 0; //server side rendering

export async function generateStaticParams(): Promise<
  {
    slug: string;
  }[]
> {
  const postsDocRef = collection(firestore, "posts");
  const q = query(postsDocRef, orderBy("createdAt", "desc"), limit(100));
  const data = await getPosts(q);

  return data.map((post) => ({ slug: post.id }));
}

async function getData(postId: string) {
  const docRef = collection(firestore, "comments");
  const q = query(
    docRef,
    where("receiverId", "==", postId),
    orderBy("createdAt", "desc"),
    limit(20)
  );
  const [post, comments] = await Promise.all([
    getPostById(postId),
    getComments(q),
  ]);
  if (!post) return null;
  return { post, comments };
}

const PostDetail = async ({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> => {
  const results = await getData(params.slug);
  if (!results) return notFound();

  const { post, comments } = results;

  return <Maintenance />;
};
export default PostDetail;
