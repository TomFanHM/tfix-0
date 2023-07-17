"use client";

import React from "react";
import dynamic from "next/dynamic";
import { FormControl, FormLabel, Input, Flex } from "@chakra-ui/react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ size: ["small", "large", "huge", false] }],
    ["blockquote", "code-block"],
    //[{ list: "ordered" }, { list: "bullet" }],
    //[{ script: "sub" }, { script: "super" }],
    //[{ direction: "rtl" }],
    [{ align: [] }],
    ["image", "link", "video"],
    [{ color: [] }, { background: [] }],
    ["clean"],
    //[{ indent: "+1" }, { indent: "-1" }],
  ],
};

type ArticleInputProps = {
  headline: string;
  introduction: string;
  content: string;
  handleChange: (e: React.ChangeEvent) => void;
  setFieldValue: (field: string, value: any) => void;
};

const ArticleInput: React.FC<ArticleInputProps> = ({
  headline,
  introduction,
  content,
  handleChange,
  setFieldValue,
}) => {
  return (
    <Flex flexDirection="column" gap="4" align="center" justify="center">
      <FormControl isRequired>
        <FormLabel htmlFor="headline">Headline</FormLabel>
        <Input
          isRequired
          id="headline"
          name="headline"
          type="text"
          value={headline}
          placeholder="Insert headline here..."
          onChange={handleChange}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="introduction">Introduction</FormLabel>
        <Input
          isRequired
          id="introduction"
          name="introduction"
          type="text"
          value={introduction}
          placeholder="Insert brief introduction"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="content">Content</FormLabel>
        <ReactQuill
          id="content"
          theme="snow"
          bounds="#editor"
          placeholder="Write ..."
          modules={modules}
          value={content}
          onChange={(value) => setFieldValue("content", value)}
        />
      </FormControl>
    </Flex>
  );
};
export default ArticleInput;
