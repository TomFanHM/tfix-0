"use client";

import { auth } from "@/firebase/firebaseApp";
import { Center, Grid, GridItem, Spinner } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import CreatePostForm from "./CreatePostForm";
import Guidelines from "./Guidelines";
import NotUser from "@/components/auth/notUser/notUser";

const CreatePostContainer: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading)
    return (
      <>
        <Center minH="calc(100vh - 4rem)">
          <Spinner color="var(--primary)" />
        </Center>
      </>
    );

  return (
    <>
      {!user && <NotUser />}
      {user && (
        <Grid
          templateColumns="repeat(3, 1fr)"
          alignContent="center"
          w="full"
          mx="auto"
          gap="4"
          py={{ base: "6", md: "8" }}
          my={{ base: "6", md: "8" }}
        >
          <GridItem colSpan={{ base: 3, md: 2 }}>
            <CreatePostForm user={user} />
          </GridItem>
          <GridItem colSpan={{ base: 3, md: 1 }}>
            <Guidelines />
          </GridItem>
        </Grid>
      )}
    </>
  );
};
export default CreatePostContainer;
