import { firestore } from "@/firebase/firebaseApp";
import { DocumentData, Query, doc, getDoc, getDocs } from "firebase/firestore";
import safeJsonStringify from "safe-json-stringify";
import { z } from "zod";

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
  likes: z.array(z.string()),
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
  likes: z.array(z.string()),
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
export async function getPostById(slug: string) {
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
