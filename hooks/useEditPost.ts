import { firestore } from "@/firebase/firebaseApp";
import { getYoutubeEmbedLink } from "@/functions/other";
import { capitalizeFirstLetter, getTags } from "@/functions/string";
import { User } from "firebase/auth";
import { doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { z } from "zod";

//this hook is used to handle edit post
//it takes 1 parameter, postId: the id of the post that will be edited

const TimestampSchema = z.object({
  seconds: z.number(),
  nanoseconds: z.number(),
});

type TimestampSchema = z.infer<typeof TimestampSchema>;

export const EditPostSchema = z.object({
  headline: z.string(),
  introduction: z.string(),
  content: z.string(),
  iframeURL: z.string().nullable(),
  tags: z.array(z.string()),
  creatorDisplayName: z.string(), //update user display name
  creatorPhotoURL: z.string(), //update user photo url
});

export type EditPostSchema = z.infer<typeof EditPostSchema>;

type UpdatePostData = {
  editedAt: TimestampSchema;
} & EditPostSchema;

export const useEditPost = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const updatePost = async (
    postId: string,
    user: User,
    headline: string,
    introduction: string,
    content: string,
    selectedTag: string,
    iframeURL: string | null
  ) => {
    if (loading) return;
    setError(null);
    setLoading(true);
    try {
      //init
      const postDocRef = doc(firestore, "posts", postId);
      //prepare data
      const tags = selectedTag
        ? getTags(selectedTag).map((tag: string) => capitalizeFirstLetter(tag)) //selectedTag is a string, we need to split it into array and capitalize each word
        : ["General"]; //if empty string, set general as default

      const iframe = iframeURL ? getYoutubeEmbedLink(iframeURL) : null; //convert it to youtube link

      const postData = {
        headline: headline,
        introduction: introduction,
        content: content,
        iframeURL: iframe,
        tags: tags,
        creatorDisplayName: user.displayName || "unknown",
        creatorPhotoURL: user.photoURL || "",
      };

      //cant not check serverTimestamp() with zod
      const processedData = EditPostSchema.parse(postData);

      const finalProduct: UpdatePostData = {
        editedAt: serverTimestamp() as Timestamp,
        ...processedData,
      };

      await updateDoc(postDocRef, finalProduct).catch((error) => {
        throw new Error("Server error. Please try again later.");
      });

      setLoading(false);
      return true;
    } catch (error) {
      if (error instanceof Error) setError(error);
    }
    //if error
    setLoading(false);
    return false;
  };

  return { loading, updatePost, error };
};
