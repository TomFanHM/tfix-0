import { firestore } from "@/firebase/firebaseApp";
import { collection, query, orderBy, limit } from "firebase/firestore";
import React from "react";
import { getPostById, getPosts } from "../_components/getPosts";
import PostContainer from "../_components/post/PostContainer";

export const revalidate = 86400; //3600 * 24;

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

const PostDetail = async ({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> => {
  const post = await getPostById(params.slug);
  if (!post) return <div>Post not found</div>;

  return <PostContainer post={post} />;
};
export default PostDetail;
