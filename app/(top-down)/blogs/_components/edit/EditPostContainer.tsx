"use client";

import React from "react";
import { PostData } from "../getPosts";
import { auth } from "@/firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import UnauthorizedUser from "@/components/auth/unauthorizedUser/unauthorizedUser";
import { Grid, GridItem } from "@chakra-ui/react";
import Guidelines from "../create/Guidelines";
import EditPostForm from "./EditPostForm";
import MotionContainer from "@/components/container/MotionContainer";

type EditPostContainerProps = {
  post: PostData;
};

const EditPostContainer: React.FC<EditPostContainerProps> = ({ post }) => {
  //check user is post creator
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <></>;

  if (!user) return <UnauthorizedUser />;

  if (user.uid !== post.creatorId) return <UnauthorizedUser />;

  return (
    <MotionContainer>
      {user.uid === post.creatorId && (
        <>
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
              <EditPostForm user={user} post={post} />
            </GridItem>
            <GridItem colSpan={{ base: 3, md: 1 }}>
              <Guidelines />
            </GridItem>
          </Grid>
        </>
      )}
    </MotionContainer>
  );
};
export default EditPostContainer;
