import React from "react";
import { ProductSchema } from "../getProducts";
import { Grid, GridItem, Skeleton, Stack } from "@chakra-ui/react";
import SearchCard from "./SearchCard";
import { sortProduct } from "./sort";
import { useInfiniteData } from "@/hooks/useInfiniteData";

type ProductSearchResultsProps = {
  data: ProductSchema[];
  sort: null | "Price" | "Release Date";
};

const ProductSearchResults: React.FC<ProductSearchResultsProps> = ({
  data,
  sort,
}) => {
  const {
    data: productData,
    fetchData,
    hasNext,
    loading,
    error,
  } = useInfiniteData<ProductSchema>([...data]);

  if (!productData) return <></>;
  return (
    <Grid
      templateColumns="repeat(4, 1fr)"
      gap="4"
      mx="auto"
      pb={{ base: "10", md: "20" }}
    >
      {sortProduct(productData, sort).map((el, i) => (
        <GridItem key={i} colSpan={{ base: 2, md: 1 }}>
          <SearchCard url={el.image} title={el.title} source={el.link} />
        </GridItem>
      ))}
      <>
        {loading && (
          <GridItem colSpan={4}>
            <Stack>
              <Skeleton h="4" />
              <Skeleton h="4" />
              <Skeleton h="4" />
            </Stack>
          </GridItem>
        )}
      </>
    </Grid>
  );
};
export default React.memo(ProductSearchResults);
