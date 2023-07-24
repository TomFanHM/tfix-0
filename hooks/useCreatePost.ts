//custom hook for create new post

import { firestore } from "@/firebase/firebaseApp";
import { getYoutubeEmbedLink } from "@/functions/other";
import { getTags, capitalizeFirstLetter } from "@/functions/string";
import { uploadImage } from "@/functions/uploadImage";
import { User } from "firebase/auth";
import {
  doc,
  collection,
  serverTimestamp,
  Timestamp,
  Transaction,
  runTransaction,
} from "firebase/firestore";
import { useState } from "react";
import { z } from "zod";

export const ArticleSchema = z.object({
  headline: z.string(),
  introduction: z.string(),
  content: z.string(),
});

export type ArticleSchema = z.infer<typeof ArticleSchema>;

export const TimestampSchema = z.object({
  seconds: z.number(),
  nanoseconds: z.number(),
});

export type TimestampSchema = z.infer<typeof TimestampSchema>;

export const SubmitPostSchema = z.object({
  creatorId: z.string(),
  createdAt: TimestampSchema,
  headline: z.string(),
  introduction: z.string(),
  coverURL: z.string(),
  iframeURL: z.string().nullable(),
  content: z.string(),
  tags: z.array(z.string()),
  views: z.number(),
  likes: z.record(z.boolean()),
  comments: z.number(),
  creatorDisplayName: z.string(),
  creatorPhotoURL: z.string(),
});

export type SubmitPostSchema = z.infer<typeof SubmitPostSchema>;

const useCreatePost = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const createPost = async (
    user: User,
    article: ArticleSchema,
    selectedFile: File | null | undefined,
    iframeURL: string | null | undefined,
    selectedTag: string
  ) => {
    if (loading) return;
    setError(null);
    setLoading(true);

    try {
      if (!selectedFile)
        throw new Error("Kindly insert at least one cover image.");
      //init
      const userId = user.uid;
      const userDocRef = doc(firestore, "users", userId);
      const postDocRef = doc(collection(firestore, "posts"));
      const postId = postDocRef.id;
      //upload image
      const downloadURL = await uploadImage(
        `posts/images/${postId}/${selectedFile.name}`,
        selectedFile
      );

      //prepare data
      const tags = selectedTag
        ? getTags(selectedTag).map((tag: string) => capitalizeFirstLetter(tag))
        : ["General"]; //if empty string, set general as default

      const iframe = iframeURL ? getYoutubeEmbedLink(iframeURL) : null;

      const postData = SubmitPostSchema.parse({
        creatorId: userId,
        createdAt: serverTimestamp() as Timestamp,
        headline: article.headline,
        introduction: article.introduction,
        content: article.content.replace(/\n/g, "<br />"),
        coverURL: downloadURL,
        iframeURL: iframe,
        tags: tags,
        views: 0,
        likes: {},
        comments: 0,
        creatorDisplayName: user.displayName || "",
        creatorPhotoURL: user.photoURL || "",
      });

      await runTransaction(firestore, async (transaction: Transaction) => {
        //Firestore transactions require all reads to be executed before all writes
        const userDoc = await transaction.get(userDocRef);
        if (userDoc.exists()) {
          transaction.set(postDocRef, postData); //create new post
          const userDocData = userDoc.data();
          const userPosts = z.array(z.string()).parse(userDocData.posts) || [];
          userPosts.push(postId);
          transaction.update(userDocRef, { posts: userPosts });
        }
      });
      //complete
      setLoading(false);

      return { success: true, postId: postId };
    } catch (error) {
      if (error instanceof Error) setError(error);
    }
    setLoading(false);
    return { success: false, postId: "" };
  };

  return { loading, createPost, error };
};

export default useCreatePost;
