"use client";

import { User } from "firebase/auth";
import React, { useState } from "react";
import { PostData } from "../getPosts";
import { FormikProps, useFormik } from "formik";
import { useRouter } from "next/navigation";
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
  useToast,
} from "@chakra-ui/react";
import DraftView from "./DraftView";
import { IconType } from "react-icons";
import { BsCardText, BsTagsFill } from "react-icons/bs";
import { MdImage, MdVideocam } from "react-icons/md";
import ArticleInput from "../create/ArticleInput";
import IframeInput from "../create/IframeInput";
import TagsInput from "../create/TagsInput";
import { useEditPost } from "@/hooks/useEditPost";
import { revalidatePathByNextApi } from "@/functions/other";

type TabType = {
  label: string;
  icon: IconType;
  isDisabled: boolean;
};

const tabItems: TabType[] = [
  { label: "Post", icon: BsCardText, isDisabled: false },
  { label: "Image", icon: MdImage, isDisabled: true },
  { label: "Video", icon: MdVideocam, isDisabled: false },
  { label: "Tags", icon: BsTagsFill, isDisabled: false },
];

type EditForm = {
  headline: string;
  introduction: string;
  content: string;
  iframeURL: string;
  selectedTag: string;
};

type EditPostFormProps = {
  user: User;
  post: PostData;
};

const EditPostForm: React.FC<EditPostFormProps> = ({ user, post }) => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  //data
  const formik: FormikProps<EditForm> = useFormik<EditForm>({
    initialValues: {
      headline: post.headline,
      introduction: post.introduction,
      content: post.content,
      iframeURL: post.iframeURL || "",
      selectedTag: post.tags.join(", "),
    },
    onSubmit: async (values) => {
      //do nothing
    },
  });

  const [draftView, setDraftView] = useState<boolean>(false);

  const router = useRouter();

  const { loading, updatePost, error } = useEditPost();

  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    const { headline, introduction, content, iframeURL, selectedTag } =
      formik.values;

    const result = await updatePost(
      post.id,
      user,
      headline,
      introduction,
      content,
      selectedTag,
      iframeURL
    );

    if (result) {
      //revalidate path
      const res = await revalidatePathByNextApi(`/blogs/${post.id}`);
      //if not success, show error message
      if (!res || !res.revalidated) {
        toast({
          title:
            "Update successful, but content may not appear immediately due to server loading. Thank you for your patience.",
          variant: "solid",
          status: "loading",
          isClosable: true,
        });
        router.push(`/blogs/${post.id}`);
      } else {
        //if success, redirect to post
        router.push(`/blogs/${post.id}`);
      }
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
          <Text as="b">Edit post</Text>
          <Button
            variant="custom_solid"
            onClick={() => setDraftView((prev) => !prev)}
          >
            {draftView ? "Publish" : "Preview"}
          </Button>
        </Flex>
        <Divider />
        {draftView && (
          <DraftView data={formik.values} coverURL={post.coverURL} />
        )}
        {!draftView && (
          <>
            <Tabs
              isFitted
              index={tabIndex}
              onChange={(index: number) => setTabIndex(index)}
            >
              <TabList>
                {tabItems.map((tab: TabType, i) => (
                  <Tab key={i} isDisabled={tab.isDisabled}>
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
                <TabPanel px="0">disable panel</TabPanel>
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
            <Button
              variant="form"
              mx="auto"
              isLoading={loading}
              onClick={() => router.push("/blogs")}
            >
              Back
            </Button>
            <Text color="var(--error)" textAlign="center">
              {error?.message}
            </Text>
          </>
        )}
      </Flex>
    </form>
  );
};
export default EditPostForm;
