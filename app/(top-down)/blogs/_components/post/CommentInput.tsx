"use client";

import { AuthModalState, authModalState } from "@/atoms/authModalAtom";
import useCreateComment from "@/hooks/useCreateComment";
import { Avatar, Button, Flex, FormControl, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ size: ["small", "large", "huge", false] }],
    ["blockquote", "code-block"],
    [{ align: [] }],
    ["image", "link", "video"],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
};

type CommentInputProps = {
  target: "posts" | "comments";
  user: User | null | undefined;
  receiverId: string;
};

const CommentInput: React.FC<CommentInputProps> = ({
  target,
  user,
  receiverId,
}) => {
  const [content, setContent] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const setAuthModalState = useSetRecoilState<AuthModalState>(authModalState);

  const { loading, error, createComment } = useCreateComment(target);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    setErrorMessage(""); // reset error message
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }
    if (!content) {
      setErrorMessage("Content is required");
      return;
    }
    const success = await createComment(user, receiverId, content);
    if (success) {
      // do something
      setContent("");
      router.refresh();
    }
  };

  return (
    <Flex gap="4" as="form" onSubmit={handleSubmit} mt="4">
      <Avatar
        size={{ base: "sm", md: "md" }}
        src={user?.photoURL || ""}
        name={user?.displayName || "Guest"}
      />
      <Flex flexDirection="column" gap="4" flex="1 1 auto">
        <FormControl isRequired>
          <ReactQuill
            id="content"
            theme="snow"
            bounds="#editor"
            placeholder="Write ..."
            modules={modules}
            value={content}
            onChange={(value) => setContent(value)}
          />
        </FormControl>

        <Button
          type="submit"
          variant="custom_solid"
          w="min-content"
          isLoading={loading}
        >
          Submit
        </Button>
        <Text color="var(--error)" textAlign="center">
          {error?.message || errorMessage}
        </Text>
      </Flex>
    </Flex>
  );
};
export default CommentInput;
