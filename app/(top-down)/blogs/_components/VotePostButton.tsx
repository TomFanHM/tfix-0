"use client";

import { AuthModalState, authModalState } from "@/atoms/authModalAtom";
import { usePost } from "@/hooks/usePost";
import { Button, Icon } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { useSetRecoilState } from "recoil";

function getLiked(
  user: User | null | undefined,
  likes: Record<string, boolean>
) {
  if (!user) return false;
  if (likes[user.uid]) return true;
  return false;
}

type VotePostButtonProps = {
  postId: string;
  user: User | null | undefined;
  likesData: Record<string, boolean>;
};

const VotePostButton: React.FC<VotePostButtonProps> = ({
  postId,
  user,
  likesData,
}) => {
  const setAuthModalState = useSetRecoilState<AuthModalState>(authModalState);
  const { loading, onVote } = usePost();

  const [likes, setLikes] = useState<Record<string, boolean>>(likesData);
  const liked = getLiked(user, likes);
  const count = Object.values(likes).reduce(
    (acc, curr) => acc + Number(curr),
    0
  );

  //vote
  const handleVote = async () => {
    //request user login
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }
    //if logged in
    const success = await onVote(postId, user, liked);
    if (success) {
      const updated = { ...likes, [user.uid]: liked ? false : true };
      setLikes(updated);
    }
  };

  useEffect(() => {
    setLikes(likesData);
  }, [likesData]);

  return (
    <Button
      variant="custom_solid"
      isLoading={loading}
      leftIcon={<Icon as={BsFillHeartFill} boxSize={6} />}
      color={liked ? "red.400" : "var(--onPrimary)"}
      onClick={handleVote}
    >
      {count}
    </Button>
  );
};

export default VotePostButton;
