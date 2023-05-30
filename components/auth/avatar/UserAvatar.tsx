"use client";

import CustomAvatar from "@/components/image/CustomAvatar";
import { firestore } from "@/firebase/firebaseApp";
import { SkeletonCircle } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React from "react";

type UserAvatarProps = {
  user: User;
};

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  const { isLoading, data } = useQuery({
    queryKey: ["user", user],
    queryFn: async () => {
      try {
        const userId = user.uid;
        const userDocRef = doc(firestore, "users", userId);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          return {
            displayName: userData.displayName || "Unknown",
            photoURL: userData.photoURL || "",
          };
        }
      } catch (error) {
        console.log("UserAvatar error: ", error);
      }
    },
  });

  if (isLoading) return <SkeletonCircle size="8" />;

  return (
    <CustomAvatar src={data?.photoURL} name={data?.displayName} size="8" />
  );
};
export default UserAvatar;

{
  /* <Avatar
  size="sm"
  name={data?.displayName || ""}
  src={data?.photoURL || ""}
  pointerEvents="none"
  loading="lazy"
/> */
}
