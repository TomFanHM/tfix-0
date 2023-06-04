import MotionContainer from "@/components/container/MotionContainer";
import React from "react";
import EditPostContainer from "../../_components/edit/EditPostContainer";
import { getPostById } from "../../_components/getPosts";
import { notFound } from "next/navigation";
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

  return (
    <MotionContainer>
      <EditPostContainer post={post} />
    </MotionContainer>
  );
};
export default EditPost;
