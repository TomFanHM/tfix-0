"use client";

import { User } from "firebase/auth";
import { PostData } from "./getPosts";
import {
  Flex,
  GridItem,
  Heading,
  Link,
  Text,
  HStack,
  Divider,
  Button,
  Icon,
  IconButton,
  Avatar,
} from "@chakra-ui/react";
import { siteConfig } from "@/config/site";
import OptimizedImage from "@/components/image/OptimizedImage";
import NextLink from "next/link";
import { fromNow } from "@/functions/dateUtils";
import { BsFillEyeFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { useRouter } from "next/navigation";
import DeletePostButton from "./DeletePostButton";
import VotePostButton from "./VotePostButton";
import ShareButton from "./ShareButton";

type BlogPostCardProps = {
  large: boolean;
  banner: boolean;
  user: User | null | undefined;
  post: PostData;
  isCreator: boolean;
  handleSuccessDeletePost: (postId: string) => void;
};

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  large,
  banner,
  user,
  post,
  isCreator,
  handleSuccessDeletePost,
}) => {
  //redirect to edit page
  const router = useRouter();

  const handleEditPost = () => {
    router.push(`/blogs/${post.id}/edit`);
  };

  const deletePostEffect = () => {
    handleSuccessDeletePost(post.id);
  };

  return (
    <GridItem colSpan={{ base: 3, md: large ? 2 : 1 }}>
      <Link as={NextLink} href={`/blogs/${post.id}`}>
        <OptimizedImage
          url={post.coverURL}
          alt={post.headline}
          border_radius="20px"
          position="relative"
          w="full"
          maxW="full" //important
          h={{ md: banner ? "500px" : "unset" }}
          sx={{ aspectRatio: "16/9" }}
          color="transparent"
          objectFit="cover"
          loading="lazy"
        />
      </Link>
      <Flex flexDirection="column" mt="4" gap="4">
        <Flex wrap="wrap" gap="4" mt="4">
          {post.tags.map((tag, i) => (
            <Link
              key={i}
              as={NextLink}
              href={"/blogs"}
              textDecoration="underline"
              w="min-content"
            >
              {tag}
            </Link>
          ))}
        </Flex>
        <Heading size="lg">{post.headline}</Heading>
        <Text mt="4" noOfLines={5}>
          {post.introduction}
        </Text>
        <HStack spacing={4}>
          <Avatar
            src={post.creatorPhotoURL}
            name={post.creatorDisplayName}
            size="sm"
          />
          <Text layerStyle="Medium-emphasis">
            {fromNow(new Date(post.createdAt.seconds * 1000))}
          </Text>
        </HStack>
        <Divider />
        <Flex wrap="wrap" gap="4">
          <VotePostButton postId={post.id} user={user} likesData={post.likes} />
          <Button
            variant="custom_solid"
            leftIcon={<Icon as={BsFillEyeFill} boxSize={6} />}
          >
            {post.views}
          </Button>
          <ShareButton url={`${siteConfig.url}/blogs/${post.id}`} />
          {isCreator && (
            <IconButton
              variant="custom_solid"
              aria-label="edit post"
              icon={<Icon as={MdEdit} boxSize={6} />}
              onClick={handleEditPost}
            />
          )}
          {isCreator && (
            <DeletePostButton
              key={post.id}
              postId={post.id}
              creatorId={post.creatorId}
              effect={deletePostEffect}
            />
          )}
        </Flex>
      </Flex>
    </GridItem>
  );
};

export default BlogPostCard;
