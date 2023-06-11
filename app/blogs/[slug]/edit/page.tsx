import React from "react";
import { getPostById } from "../../_components/getPosts";
import { notFound } from "next/navigation";
import Maintenance from "@/components/others/Maintenance";
export const revalidate = 0;

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

  return <Maintenance />;
};
export default EditPost;
