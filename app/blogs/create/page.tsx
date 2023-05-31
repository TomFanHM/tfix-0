import MotionContainer from "@/components/container/MotionContainer";
import React from "react";
import CreatePostContainer from "../_components/create/CreatePostContainer";
import "react-quill/dist/quill.snow.css";

const CreatePost: React.FC = () => {
  return (
    <MotionContainer>
      <CreatePostContainer />
    </MotionContainer>
  );
};
export default CreatePost;
