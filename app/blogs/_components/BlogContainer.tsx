"use client";

import React from "react";
import { PostData } from "./getPosts";
import MotionContainer from "@/components/container/MotionContainer";
import { Grid } from "@chakra-ui/react";
import PostCard from "./PostCard";
import { auth } from "@/firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";

type BlogContainerProps = {
  posts: PostData[];
};

const BlogContainer: React.FC<BlogContainerProps> = ({ posts }) => {
  const [user] = useAuthState(auth);
  return (
    <MotionContainer>
      <Grid>
        {posts.map((post, i) => (
          <PostCard
            key={i}
            user={user}
            post={post}
            isCreator={post.creatorId === user?.uid}
          />
        ))}
      </Grid>
    </MotionContainer>
  );
};
export default BlogContainer;
