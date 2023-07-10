"use client";

import { Icon, IconButton, useToast } from "@chakra-ui/react";
import { MdShare } from "react-icons/md";

type ShareButtonProps = {
  url: string;
};

const ShareButton: React.FC<ShareButtonProps> = ({ url }) => {
  const toast = useToast();

  const handleCopyURL = async () => {
    try {
      await navigator.clipboard.writeText(url).then(() =>
        toast({
          title: "Copied to clipboard.",
          variant: "solid",
          status: "success",
          isClosable: true,
        })
      );
    } catch (error) {
      toast({
        title: "Failed to copy",
        variant: "solid",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <IconButton
      variant="custom_solid"
      aria-label="share link"
      icon={<Icon as={MdShare} boxSize={6} />}
      onClick={handleCopyURL}
    />
  );
};

export default ShareButton;
