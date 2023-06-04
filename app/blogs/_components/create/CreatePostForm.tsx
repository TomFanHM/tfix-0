"use client";

import useCreatePost from "@/hooks/useCreatePost";
import {
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import { FormikProps, useFormik } from "formik";
import React, { useState } from "react";
import { IconType } from "react-icons";
import { BsCardText, BsTagsFill } from "react-icons/bs";
import { MdImage, MdVideocam } from "react-icons/md";
import DraftView from "./DraftView";
import ArticleInput from "./ArticleInput";
import ImageInput from "./ImageInput";
import IframeInput from "./IframeInput";
import TagsInput from "./TagsInput";
import { useRouter } from "next/navigation";
import { revalidatePathByNextApi } from "@/functions/functions";

type TabType = {
  label: string;
  icon: IconType;
};

const tabItems: TabType[] = [
  { label: "Post", icon: BsCardText },
  { label: "Image", icon: MdImage },
  { label: "Video", icon: MdVideocam },
  { label: "Tags", icon: BsTagsFill },
];

type CreateForm = {
  headline: string;
  introduction: string;
  content: string;
  selectedFile: File | null;
  iframeURL: string;
  selectedTag: string;
};

type CreatePostFormProps = { user: User };

const CreatePostForm: React.FC<CreatePostFormProps> = ({ user }) => {
  const { loading, createPost, error } = useCreatePost();
  //chakra ui tab
  const [tabIndex, setTabIndex] = useState<number>(0);
  //data
  const formik: FormikProps<CreateForm> = useFormik<CreateForm>({
    initialValues: {
      headline: "",
      introduction: "",
      content: "",
      selectedFile: null,
      iframeURL: "",
      selectedTag: "",
    },
    onSubmit: async (values) => {},
  });

  //view draft
  const [draftView, setDraftView] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      headline,
      introduction,
      content,
      selectedFile,
      iframeURL,
      selectedTag,
    } = formik.values;
    const article = {
      headline: headline,
      introduction: introduction,
      content: content,
    };

    const success = await createPost(
      user,
      article,
      selectedFile,
      iframeURL,
      selectedTag
    );

    if (success) {
      const res = await revalidatePathByNextApi("/blogs");
      console.log(res);
      router.push("/blogs");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex
        w="full"
        flexDirection="column"
        p="4"
        gap="4"
        mx="auto"
        borderRadius="20px"
        bg="elevation.dp02"
        boxShadow="dp02"
      >
        <Flex justify="space-between" gap="4" align="center">
          <Text as="b">New post</Text>
          <Button
            variant="custom_solid"
            onClick={() => setDraftView((prev) => !prev)}
          >
            {draftView ? "Publish" : "Preview"}
          </Button>
        </Flex>
        <Divider />
        {draftView && <DraftView data={formik.values} />}
        {!draftView && (
          <>
            <Tabs
              isFitted
              index={tabIndex}
              onChange={(index: number) => setTabIndex(index)}
            >
              <TabList>
                {tabItems.map((tab: TabType, i) => (
                  <Tab key={i}>
                    <HStack>
                      <Icon as={tab.icon} />
                      <Text display={{ base: "none", md: "block" }}>
                        {tab.label}
                      </Text>
                    </HStack>
                  </Tab>
                ))}
              </TabList>
              <TabPanels>
                <TabPanel px="0">
                  <ArticleInput
                    headline={formik.values.headline}
                    introduction={formik.values.introduction}
                    content={formik.values.content}
                    handleChange={formik.handleChange}
                    setFieldValue={formik.setFieldValue}
                  />
                </TabPanel>
                <TabPanel px="0">
                  <ImageInput
                    selectedFile={formik.values.selectedFile}
                    setFieldValue={formik.setFieldValue}
                  />
                </TabPanel>
                <TabPanel px="0">
                  <IframeInput
                    iframeURL={formik.values.iframeURL}
                    handleChange={formik.handleChange}
                  />
                </TabPanel>
                <TabPanel px="0">
                  <TagsInput
                    selectedTag={formik.values.selectedTag}
                    handleChange={formik.handleChange}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
            <Button variant="form" type="submit" mx="auto" isLoading={loading}>
              Publish
            </Button>
            <Text color="var(--chakra-colors-error)" textAlign="center">
              {error?.message}
            </Text>
          </>
        )}
      </Flex>
    </form>
  );
};

export default CreatePostForm;
