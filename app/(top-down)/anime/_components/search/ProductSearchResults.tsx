import React from "react";
import { ProductSchema, getProductsByFilter } from "../getProducts";
import { Button, Grid, GridItem, Skeleton, Stack } from "@chakra-ui/react";
import SearchCard from "./SearchCard";
import { sortProductFactory } from "./sort";
import { useInfiniteData } from "@/hooks/useInfiniteData";
import { SearchQuery, generateProductSearchQuery } from "./getQuery";
import { query, startAfter } from "firebase/firestore";
import { scrollToTop } from "@/functions/other";

type ProductSearchResultsProps = {
  products: ProductSchema[];
  sort: null | "Price" | "Release Date";
  formik: SearchQuery;
};

const ProductSearchResults: React.FC<ProductSearchResultsProps> = ({
  products,
  sort,
  formik,
}) => {
  const { data, fetchData, hasNext, loading, error } =
    useInfiniteData<ProductSchema>(products);

  const fetchMore = async (el: ProductSchema[]) => {
    let q = generateProductSearchQuery(formik.query, formik.product);
    q = query(q, startAfter(el[el.length - 1].uid));
    const result = await getProductsByFilter(q);
    if (!result) return [];
    return result;
  };

  if (!data.length) return <></>;

  return (
    <Grid
      w="full"
      templateColumns="repeat(4, 1fr)"
      gap="4"
      mx="auto"
      pb={{ base: "10", md: "20" }}
    >
      {sortProductFactory(data, sort).map((el, i) => (
        <GridItem key={i} colSpan={{ base: 2, md: 1 }}>
          <SearchCard
            url={el.images[0] ? el.images[0] : el.image} //image inside images is more high quality
            title={el.title}
            source={el.link}
          />
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
      <>
        {hasNext && (
          <GridItem colSpan={4}>
            <Button
              w="full"
              variant="solid"
              isLoading={loading}
              onClick={() => fetchData(fetchMore)}
            >
              More
            </Button>
          </GridItem>
        )}
        {!hasNext && (
          <GridItem colSpan={4}>
            <Button w="full" variant="solid" onClick={scrollToTop}>
              Scroll to Top
            </Button>
          </GridItem>
        )}
      </>
    </Grid>
  );
};
export default React.memo(ProductSearchResults);
