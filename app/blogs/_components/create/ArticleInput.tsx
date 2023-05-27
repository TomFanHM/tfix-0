"use client";

import React from "react";
import dynamic from "next/dynamic";
import { FormControl, FormLabel, Input, Flex } from "@chakra-ui/react";
import { ArticleSchema } from "@/hooks/useCreatePost";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "+1" }, { indent: "-1" }],
    [{ align: [] }],
    [{ size: ["small", "large", "huge", false] }],
    ["image", "link", "video", "formula"],
    ["link", "video", "formula"],
    [{ color: "1" }, { background: [] }],
    [{ font: [] }],
    ["code-block"],
  ],
};

type ArticleInputProps = {
  article: ArticleSchema;
};

const ArticleInput: React.FC<ArticleInputProps> = ({ article }) => {
  return <div>Have a good coding</div>;
};
export default ArticleInput;
