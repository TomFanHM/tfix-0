"use client";

import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Image,
  Icon,
  VisuallyHiddenInput,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { BsFillCloudUploadFill } from "react-icons/bs";

type ImageInputProps = {
  selectedFile: File | null;
  setFieldValue: (field: string, value: any) => void;
};

const ImageInput: React.FC<ImageInputProps> = ({
  selectedFile,
  setFieldValue,
}) => {
  const selectFileRef = useRef<HTMLInputElement | null>(null);
  return (
    <Flex flexDirection="column" gap="4">
      <FormControl isRequired>
        <FormLabel htmlFor="selectedFile">Cover image</FormLabel>
        <VisuallyHiddenInput
          id="selectedFile"
          name="selectedFile"
          type="file"
          accept=".jpg, .png"
          ref={selectFileRef}
          onChange={(e) => {
            if (!e.target.files) return;
            setFieldValue("selectedFile", e.target.files[0]);
          }}
        />
        {selectedFile && (
          <>
            <Box position="relative" p="4">
              <Image
                w="full"
                objectFit="cover"
                src={URL.createObjectURL(selectedFile)}
                alt={selectedFile.name}
              />
              <IconButton
                aria-label="remove file"
                icon={<SmallCloseIcon />}
                position="absolute"
                top="0"
                right="0"
                variant="icon"
                size="lg"
                onClick={() => {
                  if (selectFileRef.current) selectFileRef.current.value = "";
                  setFieldValue("selectedFile", null);
                }}
              />
            </Box>
          </>
        )}
        {!selectedFile && (
          <>
            <Flex
              align="center"
              justify="center"
              style={{ aspectRatio: "16/9" }}
              outline="1px solid"
              onClick={(e) => selectFileRef.current?.click()}
            >
              <Icon as={BsFillCloudUploadFill} boxSize={6} />
            </Flex>
          </>
        )}
      </FormControl>
    </Flex>
  );
};
export default ImageInput;
