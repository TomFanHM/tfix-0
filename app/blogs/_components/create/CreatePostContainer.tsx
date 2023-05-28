"use client";

import { auth } from "@/firebase/firebaseApp";
import { Center, Grid, GridItem, Spinner } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import CreatePostForm from "./CreatePostForm";

const CreatePostContainer: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading)
    return (
      <Center minH="calc(100vh - 4rem)">
        <Spinner color="var(--chakra-colors-primary)" />
      </Center>
    );

  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      alignContent="center"
      w="full"
      mx="auto"
      gridGap="64px 16px"
      py={{ base: "6", md: "8" }}
      my={{ base: "6", md: "8" }}
    >
      {user && (
        <>
          <GridItem colSpan={{ base: 3, md: 2 }} outline="1px solid green">
            <CreatePostForm user={user} />
          </GridItem>
          <GridItem colSpan={{ base: 3, md: 1 }} outline="1px solid green">
            {/* <Guidelines /> */}
          </GridItem>
        </>
      )}

      {!user && <></>}
    </Grid>
  );
};
export default CreatePostContainer;
