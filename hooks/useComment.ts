import { CommentData } from "@/app/(top-down)/blogs/_components/getPosts";
import { firestore } from "@/firebase/firebaseApp";
import { getUser } from "@/functions/getUser";
import { User } from "firebase/auth";
import { doc, writeBatch } from "firebase/firestore";
import { useState } from "react";
import { z } from "zod";

export const useComment = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const onVote = async (commentId: string, user: User, liked: boolean) => {
    if (loading) return;
    setError(null);
    setLoading(true);
    try {
      const commentDocRef = doc(firestore, "comments", commentId);
      const userDocRef = doc(firestore, "users", user.uid);
      const userDoc = await getUser(user.uid);
      const userLikes = z.array(z.string()).parse(userDoc.likes);
      const batch = writeBatch(firestore);

      if (liked) {
        //not like now
        batch.update(commentDocRef, {
          [`likes.${user.uid}`]: false,
        });
        batch.update(userDocRef, {
          likes: userLikes.filter((e) => e !== commentId),
        });
      } else {
        //vote like now
        batch.update(commentDocRef, { [`likes.${user.uid}`]: true });
        batch.update(userDocRef, {
          likes: [...new Set([...userLikes, commentId])], //check no duplicate
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

  return { loading, error, onVote };
};
