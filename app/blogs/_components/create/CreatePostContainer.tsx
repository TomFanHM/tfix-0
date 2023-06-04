"use client";

import { auth } from "@/firebase/firebaseApp";
import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import CreatePostForm from "./CreatePostForm";
import Guidelines from "./Guidelines";
import NotUser from "@/components/auth/notUser/notUser";
import Loading from "@/app/loading";

const CreatePostContainer: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <Loading />;

  return (
    <>
      {!user && <NotUser />}
      {user && (
        <Grid
          templateColumns="repeat(3, 1fr)"
          alignContent="center"
          w="full"
          mx="auto"
          gridGap="64px 16px"
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
