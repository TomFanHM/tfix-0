import { firestore } from "@/firebase/firebaseApp";
import { User } from "firebase/auth";
import {
  collection,
  doc,
  increment,
  runTransaction,
  serverTimestamp,
  Timestamp,
  Transaction,
} from "firebase/firestore";
import { useState } from "react";
import { z } from "zod";

const TimestampSchema = z.object({
  seconds: z.number(),
  nanoseconds: z.number(),
});

type TimestampSchema = z.infer<typeof TimestampSchema>;

const SubmitCommentSchema = z.object({
  receiverId: z.string(), //post id or comment id
  creatorId: z.string(),
  createdAt: TimestampSchema,
  content: z.string(),
  likes: z.array(z.string()),
  comments: z.number(),
  creatorDisplayName: z.string(),
  creatorPhotoURL: z.string(),
});

type SubmitCommentSchema = z.infer<typeof SubmitCommentSchema>;

const useCreateComment = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const createComment = async (
    user: User,
    receiverId: string,
    content: string
  ) => {
    setError(null);
    setLoading(true);
    try {
      const commentData: SubmitCommentSchema = {
        receiverId: receiverId,
        creatorId: user.uid,
        createdAt: serverTimestamp() as Timestamp,
        content: content,
        likes: [],
        comments: 0,
        creatorDisplayName: user.displayName as string,
        creatorPhotoURL: user.photoURL as string,
      };

      await runTransaction(firestore, async (transaction: Transaction) => {
        const postRef = doc(firestore, "posts", receiverId);
        const commentRef = doc(collection(firestore, "comments")); //generate new comment id
        transaction.set(commentRef, commentData);
        transaction.update(postRef, {
          comments: increment(1),
        });
      });

      setLoading(false);
      return true;
    } catch (error) {
      if (error instanceof Error) setError(error);
    }
    setLoading(false);
    return false;
  };

  return { loading, error, createComment };
};

export default useCreateComment;
