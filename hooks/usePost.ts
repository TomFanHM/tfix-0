import { firestore, storage } from "@/firebase/firebaseApp";
import { User } from "firebase/auth";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import { ref, listAll, deleteObject } from "firebase/storage";
import { useState } from "react";
import { z } from "zod";

export const usePost = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const onVote = async (
    postId: string,
    user: User,
    liked: boolean
  ): Promise<boolean> => {
    setError(null);
    setLoading(true);
    try {
      const postDocRef = doc(firestore, "posts", postId);
      const userDocRef = doc(firestore, "users", user.uid);

      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) throw new Error("Oops. Please try again later.");
      const userLikes = z.array(z.string()).parse(userDoc.data().likes);

      const batch = writeBatch(firestore);

      if (liked) {
        batch.update(postDocRef, {
          [`likes.${user.uid}`]: false,
        });

        batch.update(userDocRef, {
          likes: userLikes.filter((e) => e !== postId),
        });
      } else {
        batch.update(postDocRef, { [`likes.${user.uid}`]: true });
        batch.update(userDocRef, {
          likes: [...new Set([...userLikes, postId])], //check no duplicate
        });
      }

      await batch.commit();

      setLoading(false);
      return true;
    } catch (error) {
      console.log("Vote error: ", error);
      if (error instanceof Error) setError(error);
    }
    setLoading(false);
    return false;
  };

  const onDeletePost = async (
    postId: string,
    creatorId: string
  ): Promise<{
    post: boolean;
    image: boolean;
  }> => {
    setError(null);
    setLoading(true);
    const result = {
      post: false,
      image: false,
    };
    try {
      //It's not possible to execute a single operation across multiple Firebase products.
      //delete the post first, whatever error happen in delete image, we can clean up the image by firebase cloud functions
      const postDocRef = doc(firestore, "posts", postId);
      const userDocRef = doc(firestore, "users", creatorId);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) throw new Error("Oops. Please try again later.");

      const batch = writeBatch(firestore);
      batch.delete(postDocRef);
      const userPosts = z.array(z.string()).parse(userDoc.data().posts);
      const newUserPosts = userPosts.filter((e: string) => e !== postId);
      batch.update(userDocRef, { posts: newUserPosts });
      await batch.commit();

      result.post = true; //deleted post

      const imageRef = ref(storage, `posts/images/${postId}`);
      // List all files and directories located at the imageRef path
      const listResult = await listAll(imageRef);
      // Iterate through the list of items and delete each item
      listResult.items.forEach(async (itemRef) => {
        await deleteObject(itemRef);
      });

      result.image = true;
    } catch (error) {
      console.log("Delete post error: ", error);
      if (error instanceof Error) setError(error);
    }
    setLoading(false);
    return result;
  };

  return { loading, error, onVote, onDeletePost };
};
