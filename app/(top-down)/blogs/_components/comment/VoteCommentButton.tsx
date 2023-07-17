"use client";

import { useComment } from "@/hooks/useComment";
import { User } from "firebase/auth";
import React from "react";

type VoteCommentButtonProps = {
  commentId: string;
  user: User | null | undefined;
  likesData: Record<string, boolean>;
};

const VoteCommentButton: React.FC<VoteCommentButtonProps> = ({
  commentId,
  user,
  likesData,
}) => {
  const { loading, error, onVote } = useComment();
  return <></>;
};
export default VoteCommentButton;
