import React from "react";
import CreatePostContainer from "../_components/create/CreatePostContainer";
import MotionContainer from "@/components/container/MotionContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create a Post",
  description:
    "Our create post page allows you to write and publish your own blog posts on any topic that interests you. Share your ideas and opinions with the world, and connect with other bloggers who share your passion. Whether you're a seasoned writer or just starting out, our platform is the perfect place to express yourself and join a community of like-minded individuals.",
};

const CreatePost: React.FC = () => {
  return (
    <MotionContainer maxW="container.xl">
      <CreatePostContainer />
    </MotionContainer>
  );
};

export default CreatePost;
