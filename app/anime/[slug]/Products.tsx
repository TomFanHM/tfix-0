"use client";

import React from "react";
import { ProductSchema, getProductsByReducingSearchTerms } from "./getProducts";
import { useQuery } from "@tanstack/react-query";

type ProductsProps = {
  searchTerm: string;
};

const Products: React.FC<ProductsProps> = ({ searchTerm }) => {
  const { isLoading, data } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        if (!searchTerm) return null;
        console.log('run')
        const result = await getProductsByReducingSearchTerms(searchTerm);
        console.log(result);
        return result;
      } catch (error) {
        console.log("UserAvatar error: ", error);
      }
      return null;
    },
  });

  return (
    <div>
      {/*       {products && products.map((el, i) => <h1 key={i}>{el.title}</h1>)} */}
    </div>
  );
};

export default Products;
