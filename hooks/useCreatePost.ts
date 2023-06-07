//custom hook for create new post

import { firestore, storage } from "@/firebase/firebaseApp";
import {
  splitString,
  capitalizeFirstLetter,
  getYoutubeEmbedLink,
} from "@/functions/functions";
import { User } from "firebase/auth";
import {
  doc,
  collection,
  serverTimestamp,
  Timestamp,
  Transaction,
  runTransaction,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
      const imageRef = ref(
        storage,
        `posts/images/${postId}/${selectedFile.name}`
      );
      const uploadSuccess = await uploadBytes(imageRef, selectedFile);
      if (!uploadSuccess)
        throw new Error(
          "Sorry, the image upload was unsuccessful. Please try again later."
        );
      const downloadURL = await getDownloadURL(imageRef);
      if (!downloadURL) {
        throw new Error("Oops. Please try again later.");
      }
      //prepare data
      const tags = selectedTag
        ? splitString(selectedTag).map((tag: string) =>
            capitalizeFirstLetter(tag)
          )
        : ["General"]; //if empty string, set general as default

      const iframe = iframeURL ? getYoutubeEmbedLink(iframeURL) : null;

      const postData: SubmitPostSchema = {
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
      };

      await runTransaction(firestore, async (transaction: Transaction) => {
        //Firestore transactions require all reads to be executed before all writes
        const userDoc = await transaction.get(userDocRef);
        transaction.set(postDocRef, postData); //create new post
        let userPosts = [];
        if (userDoc.exists()) {
          const userDocData = userDoc.data();
          userPosts = userDocData.posts || []; //if not posts, init a new empty array
        }
        userPosts.push(postId);
        //update
        transaction.update(userDocRef, { posts: userPosts });
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
