import React from "react";
import CreatePostContainer from "../_components/create/CreatePostContainer";
import MotionContainer from "@/components/container/MotionContainer";

const CreatePost: React.FC = () => {
  return (
    <MotionContainer maxW="container.xl">
      <CreatePostContainer />
    </MotionContainer>
  );
};

export default CreatePost;
