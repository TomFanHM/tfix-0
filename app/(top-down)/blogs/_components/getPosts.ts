import { firestore } from "@/firebase/firebaseApp";
import {
  DocumentData,
  Query,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { cache } from "react";
import safeJsonStringify from "safe-json-stringify";
import { z } from "zod";

type VoteCount = {
  [key: string]: boolean;
};

export const getVoteCount = (likes: VoteCount) => {
  return Object.values(likes).reduce((sum, value) => sum + Number(value), 0);
};

export const Timestamp = z.object({
  seconds: z.number(),
  nanoseconds: z.number(),
});

export const PostSchema = z.object({
  creatorId: z.string(),
  createdAt: Timestamp,
  editedAt: Timestamp.optional(),
  headline: z.string(),
  introduction: z.string(),
  coverURL: z.string(),
  iframeURL: z.string().optional().nullable(),
  content: z.string(),
  tags: z.array(z.string()),
  views: z.number(),
  likes: z.record(z.boolean()),
  comments: z.number(),
  creatorDisplayName: z.string(),
  creatorPhotoURL: z.string(),
});

export const CommentSchema = z.object({
  receiverId: z.string(), //post id or comment id
  creatorId: z.string(),
  createdAt: Timestamp,
  editedAt: Timestamp.optional(),
  content: z.string(),
  likes: z.record(z.boolean()),
  comments: z.number(),
  creatorDisplayName: z.string(),
  creatorPhotoURL: z.string(),
});

export type CommentSchema = z.infer<typeof CommentSchema>;

export type PostSchema = z.infer<typeof PostSchema>;

export type PostData = {
  id: string;
} & PostSchema;

export type CommentData = {
  id: string;
} & CommentSchema;

//fetch posts by query
export async function getPosts(q: Query<DocumentData>): Promise<PostData[]> {
  const querySnapshot = await getDocs(q);
  const posts = querySnapshot.docs.map((doc) => {
    const rawDocData = doc.data();
    const safeData = JSON.parse(safeJsonStringify(rawDocData));
    const docData = PostSchema.safeParse(safeData);
    if (docData.success) {
      return { id: doc.id, ...docData.data };
    }
  });
  return posts.flatMap((f) => (f ? [f] : []));
}

//only fetch one post by id
export async function getPostById(slug: string): Promise<PostData | null> {
  try {
    const postDocRef = doc(firestore, "posts", slug);
    const rawPostDoc = await getDoc(postDocRef);
    if (!rawPostDoc.exists()) throw new Error("Invalid post id.");
    const safeData = JSON.parse(safeJsonStringify(rawPostDoc.data()));
    const docData = PostSchema.parse(safeData);
    return { id: rawPostDoc.id, ...docData };
  } catch (error) {
    return null;
  }
}

//fetch comments by query
export async function getComments(
  q: Query<DocumentData>
): Promise<CommentData[]> {
  const querySnapshot = await getDocs(q);
  const comments = querySnapshot.docs.map((doc) => {
    const rawDocData = doc.data();
    const safeData = JSON.parse(safeJsonStringify(rawDocData));
    const docData = CommentSchema.safeParse(safeData);
    if (docData.success) {
      return { id: doc.id, ...docData.data };
    }
  });
  return comments.flatMap((f) => (f ? [f] : []));
}

export const getPostCache = cache(async (postId: string) => {
  const docRef = collection(firestore, "comments");
  const q = query(
    docRef,
    where("receiverId", "==", postId),
    orderBy("createdAt", "desc"),
    limit(20)
  );
  try {
    const response = await Promise.all([getPostById(postId), getComments(q)]);
    const [post, comments] = response;
    if (!post) return null;
    return { post, comments };
  } catch (error) {
    console.log("getPostCache error: ", error);
  }
  return null;
});
