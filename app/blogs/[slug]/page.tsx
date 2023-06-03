import { firestore } from "@/firebase/firebaseApp";
import { collection, query, orderBy, limit, where } from "firebase/firestore";
import React from "react";
import {
  CommentData,
  PostData,
  getComments,
  getPostById,
} from "../_components/getPosts";
import PostContainer from "../_components/post/PostContainer";

export const revalidate = 0; //server side rendering

//we are using server side rendering here, generateStaticParams is not needed
/* export async function generateStaticParams(): Promise<
  {
    slug: string;
  }[]
> {
  const postsDocRef = collection(firestore, "posts");
  const q = query(postsDocRef, orderBy("createdAt", "desc"), limit(100));
  const data = await getPosts(q);

  return data.map((post) => ({ slug: post.id }));
}
 */

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
  if (!post) throw new Error("Post not found");
  return { post, comments };
}

const PostDetail = async ({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> => {
  const { post, comments } = await getData(params.slug);

  return <PostContainer post={post} comments={comments} />;
};
export default PostDetail;
