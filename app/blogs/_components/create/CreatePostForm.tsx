"use client";

import useCreatePost from "@/hooks/useCreatePost";
import { Flex, Heading } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { color } from "framer-motion";
import React, { useState } from "react";
import { IconType } from "react-icons";
import { BsCardText, BsTagsFill } from "react-icons/bs";
import { MdImage, MdVideocam } from "react-icons/md";

type TabType = {
  label: string;
  icon: IconType;
};

type PostArticleData = {
  headline: string;
  introduction: string;
  content: string;
};

const tabItems = [
  { label: "Post", icon: BsCardText },
  { label: "Image", icon: MdImage },
  { label: "Video", icon: MdVideocam },
  { label: "Tags", icon: BsTagsFill },
];

type CreatePostFormProps = { user: User };

const CreatePostForm: React.FC<CreatePostFormProps> = ({ user }) => {
  const { loading, createPost, error } = useCreatePost();

  const [errorMessage, setErrorMessage] = useState<string>("");
  //chakra ui tab
  const [tabIndex, setTabIndex] = useState<number>(0);
  //article
  const [article, setArticle] = useState<PostArticleData>({
    headline: "",
    introduction: "",
    content: "",
  });

  function handleUpdateArticle(key: keyof PostArticleData, value: string) {
    setArticle((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  //upload image
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file.size < 3000000) {
      setSelectedFile(file);
      setErrorMessage("");
    } else {
      setErrorMessage("Only jpg or jpg file and below 3MB is allowed");
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  //iframe
  const [iframeURL, setIframeURL] = useState<string>("");
  const handleUpdateURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIframeURL(e.target.value);
  };

  //tags
  const [selectedTag, setSelectedTag] = useState<string>("");
  const handleSelectTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTag(e.target.value);
  };

  //view draft
  const [draftview, setDraftview] = useState<boolean>(false);
  //

  return (
    <>
      <Flex
        flexDirection="column"
        p="4"
        gap="4"
        mx="auto"
        borderRadius="20px"
        as="form"
        bg="elevation.dp02"
        boxShadow="dp02"
      >
        <Heading>123</Heading>
      </Flex>
    </>
  );
};

export default CreatePostForm;
