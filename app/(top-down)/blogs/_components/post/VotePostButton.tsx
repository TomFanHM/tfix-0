"use client";

import { AuthModalState, authModalState } from "@/atoms/authModalAtom";
import { usePost } from "@/hooks/usePost";
import { Icon, IconButton } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { useSetRecoilState } from "recoil";
import { getVoteCount } from "../getPosts";

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
  handleVoteCount: (count: number) => void;
};

const VotePostButton: React.FC<VotePostButtonProps> = ({
  postId,
  user,
  likesData,
  handleVoteCount,
}) => {
  const setAuthModalState = useSetRecoilState<AuthModalState>(authModalState);
  const { loading, onVote } = usePost();

  const [likes, setLikes] = useState<Record<string, boolean>>(likesData);
  const liked = getLiked(user, likes);

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
      handleVoteCount(getVoteCount(updated));
    }
  };

  useEffect(() => {
    setLikes(likesData);
  }, [likesData]);

  return (
    <IconButton
      variant="custom_solid"
      isLoading={loading}
      aria-label="vote post"
      icon={<Icon as={BsFillHeartFill} boxSize={6} />}
      color={liked ? "red.400" : "var(--chakra-colors-onPrimary)"}
      onClick={handleVote}
    />
  );
};

export default VotePostButton;
