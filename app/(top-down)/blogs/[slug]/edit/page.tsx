import React from "react";
import { getPostById } from "../../_components/getPosts";
import { notFound } from "next/navigation";
import EditPostContainer from "../../_components/edit/EditPostContainer";
import { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Edit post",
  description: "",
};

async function getData(postId: string) {
  const data = await getPostById(postId);
  return data;
}

const EditPost = async ({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> => {
  const post = await getData(params.slug);

  if (!post) return notFound();

  return <EditPostContainer post={post} />;
};
export default EditPost;
