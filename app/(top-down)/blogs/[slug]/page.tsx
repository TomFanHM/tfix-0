import React from "react";
import { getPostCache } from "../_components/getPosts";
import { notFound } from "next/navigation";
import PostContainer from "../_components/post/PostContainer";

export const revalidate = 0; //server side rendering

/* export async function generateStaticParams(): Promise<
  {
    slug: string;
  }[]
> {
  const postsDocRef = collection(firestore, "posts");
  const q = query(postsDocRef, orderBy("createdAt", "desc"), limit(100));
  const data = await getPosts(q);

  return data.map((post) => ({ slug: post.id }));
} */

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props) {
  const results = await getPostCache(params.slug);
  if (!results) return notFound();
  const { post } = results;
  return {
    title: post.headline,
    description: post.introduction,
  };
}

const PostDetail = async ({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> => {
  const results = await getPostCache(params.slug);
  if (!results) return notFound();

  const { post, comments } = results;

  return <PostContainer post={post} comments={comments} />;
};
export default PostDetail;
