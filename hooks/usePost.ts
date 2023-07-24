import { firestore } from "@/firebase/firebaseApp";
import { getUser } from "@/functions/getUser";
import { User } from "firebase/auth";
import { doc, writeBatch } from "firebase/firestore";
import { useState } from "react";
import { z } from "zod";

export const usePost = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const onVote = async (postId: string, user: User, liked: boolean) => {
    if (loading) return;
    setError(null);
    setLoading(true);
    try {
      const postDocRef = doc(firestore, "posts", postId);
      const userDocRef = doc(firestore, "users", user.uid);
      const userDoc = await getUser(user.uid);
      const userLikes = z.array(z.string()).parse(userDoc.likes);

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
      if (error instanceof Error) setError(error);
    }
    setLoading(false);
    return false;
  };

  const onDeletePost = async (postId: string, creatorId: string) => {
    if (loading) return;
    setError(null);
    setLoading(true);
    try {
      //It's not possible to execute a single operation across multiple Firebase products.
      //delete the post first, whatever error happen in delete image, we can clean up the image by firebase cloud functions
      const postDocRef = doc(firestore, "posts", postId);
      const userDocRef = doc(firestore, "users", creatorId);
      const userDoc = await getUser(creatorId);
      const userPosts = z.array(z.string()).parse(userDoc.posts);
      const newUserPosts = userPosts.filter((e: string) => e !== postId);

      const batch = writeBatch(firestore);
      batch.delete(postDocRef);
      batch.update(userDocRef, { posts: newUserPosts });
      await batch.commit();

      /* const imageRef = ref(storage, `posts/images/${postId}`);
      const listResult = await listAll(imageRef);
      listResult.items.forEach(async (itemRef) => {
        await deleteObject(itemRef);
      }); */

      setLoading(false);
      return true;
    } catch (error) {
      if (error instanceof Error) setError(error);
    }
    setLoading(false);
    return false;
  };

  return { loading, error, onVote, onDeletePost };
};
