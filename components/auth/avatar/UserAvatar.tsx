"use client";

import { Avatar } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";

type UserAvatarProps = {
  user: User;
};

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  /* const { isLoading, data } = useQuery({
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

  if (isLoading) return <SkeletonCircle size="8" />; */

  return (
    <Avatar
      size="sm"
      name={user.displayName || ""}
      src={user.photoURL || ""}
      pointerEvents="none"
      loading="lazy"
    />
  );
};
export default UserAvatar;
