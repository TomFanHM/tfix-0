import { CommentData } from "@/app/(top-down)/blogs/_components/getPosts";
import { firestore } from "@/firebase/firebaseApp";
import { User } from "firebase/auth";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import { useState } from "react";
import { z } from "zod";

export const useComment = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const onVote = async (comment: CommentData, user: User, liked: boolean) => {
    setError(null);
    setLoading(true);
    try {
      const commentDocRef = doc(firestore, "comments", comment.id);
      const userDocRef = doc(firestore, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) throw new Error("Oops. Please try again later.");
      const userLikes = z.array(z.string()).parse(userDoc.data().likes);
      const batch = writeBatch(firestore);

      if (liked) {
        //not like now
        batch.update(commentDocRef, {
          [`likes.${user.uid}`]: false,
        });
        batch.update(userDocRef, {
          likes: userLikes.filter((e) => e !== comment.id),
        });
      } else {
        //vote like now
        batch.update(commentDocRef, { [`likes.${user.uid}`]: true });
        batch.update(userDocRef, {
          likes: [...new Set([...userLikes, comment.id])], //check no duplicate
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
