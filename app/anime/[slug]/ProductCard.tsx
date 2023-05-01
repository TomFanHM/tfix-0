"use client";

import React from "react";
import { ProductSchema } from "./getProducts";
import { Flex, Text, VStack } from "@chakra-ui/react";
import OptimizedImage from "@/components/image/OptimizedImage";

type ProductCardProps = {
  product: ProductSchema;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleOpenSource = () => {
    window.open(product.link, "_blank");
  };

  return (
    <Flex
      w="full"
      maxW="full"
      flexWrap="wrap"
      borderRadius="20px"
      p="4"
      overflow="hidden"
      align="start"
      gap="4"
      bg="elevation.dp02"
      boxShadow="dp02"
      cursor="pointer"
      onClick={handleOpenSource}
    >
      <OptimizedImage
        url={product.image}
        alt={product.title}
        border_radius="20px"
        sx={{ aspectRatio: "1/1" }}
        objectFit="cover"
        cursor="pointer"
        loading="lazy"
      />
      <VStack align="start" flex="1 1 15rem">
        <Text as="b">Title :</Text>
        <Text layerStyle="Medium-emphasis">{product.title || "Unknown"}</Text>
        <Text as="b">Price :</Text>
        <Text layerStyle="Medium-emphasis">{product.price || "Unknown"}</Text>
        <Text as="b">Release :</Text>
        <Text layerStyle="Medium-emphasis">
          {product.releaseDate || "Unknown"}
        </Text>
        <Text as="b">Manufacturer :</Text>
        <Text layerStyle="Medium-emphasis">
          {product.manufacturer || "Unknown"}
        </Text>
      </VStack>
    </Flex>
  );
};
export default ProductCard;
