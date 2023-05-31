import { firestore } from "@/firebase/firebaseApp";
import { collection, query, orderBy, limit, where } from "firebase/firestore";
import React from "react";
import { getComments, getPostById, getPosts } from "../_components/getPosts";
import PostContainer from "../_components/post/PostContainer";

export const revalidate = 0;

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

const PostDetail = async ({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> => {
  const docRef = collection(firestore, "comments");
  const q = query(
    docRef,
    where("receiverId", "==", params.slug),
    orderBy("createdAt", "desc"),
    limit(20)
  );

  const [post, comments] = await Promise.all([
    getPostById(params.slug),
    getComments(q),
  ]);

  if (!post) return <div>Post not found</div>;

  return <PostContainer post={post} comments={comments} />;
};
export default PostDetail;
