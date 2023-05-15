import { PostData } from "@/app/blogs/_components/getPosts";
import { firestore, storage } from "@/firebase/firebaseApp";
import { User } from "firebase/auth";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import { ref, listAll, deleteObject } from "firebase/storage";
import { useState } from "react";

export const usePost = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const onVote = async (
    post: PostData,
    user: User,
    liked: boolean
  ): Promise<boolean> => {
    setLoading(true);
    try {
      const postDocRef = doc(firestore, "posts", post.id);
      const userDocRef = doc(firestore, "users", user.uid);
      //fetch user doc
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) throw new Error("Oops. Please try again later.");
      //handle undefined error
      const userLikes: string[] = userDoc.data().likes;
      //use batch update
      const batch = writeBatch(firestore);
      //2 cases, toggle like/normal
      if (liked) {
        batch.update(postDocRef, {
          likes: post.likes.filter((e) => e !== user.uid),
        });
        batch.update(userDocRef, {
          likes: userLikes.filter((e) => e !== post.id),
        });
      } else {
        batch.update(postDocRef, { likes: [...post.likes, user.uid] });
        batch.update(userDocRef, { likes: [...userLikes, post.id] });
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

  const onDeletePost = async (post: PostData): Promise<boolean> => {
    setLoading(true);
    try {
      //It's not possible to execute a single operation across multiple Firebase products.
      //delete the post first, whatever error happen in delete image, we can clean up the image by firebase cloud functions
      const postDocRef = doc(firestore, "posts", post.id);
      const userDocRef = doc(firestore, "users", post.creatorId);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) throw new Error("Oops. Please try again later.");

      const batch = writeBatch(firestore);
      batch.delete(postDocRef);
      const userPosts = userDoc.data().posts;
      const newUserPosts = userPosts.filter((e: string) => e !== post.id); //remove post id
      batch.update(userDocRef, { posts: newUserPosts });
      await batch.commit();

      if (post.coverURL) {
        const imageRef = ref(storage, `posts/images/${post.id}`); //delete post file

        // List all files and directories located at the imageRef path
        const listResult = await listAll(imageRef);

        // Iterate through the list of items and delete each item
        listResult.items.forEach(async (itemRef) => {
          await deleteObject(itemRef);
        });
      }
      setLoading(false);
      return true;
    } catch (error) {
      console.log("Delete post error: ", error);
      if (error instanceof Error) setError(error);
    }
    setLoading(false);
    return false;
  };

  return { loading, error, onVote, onDeletePost };
};
