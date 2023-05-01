"use client";

import React from "react";
import { ProductSchema } from "./getProducts";
import { Flex, Heading, Image } from "@chakra-ui/react";
import ProductCard from "./ProductCard";

type ProductsProps = {
  productsData: ProductSchema[] | null;
};

const Products: React.FC<ProductsProps> = ({ productsData }) => {
  return (
    <Flex flexDirection="column" gap="4">
      {!productsData && (
        <Image src="/empty.png" alt="empty" w="10rem" mx="auto"></Image>
      )}
      {productsData &&
        productsData.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
    </Flex>
  );
};

export default Products;
