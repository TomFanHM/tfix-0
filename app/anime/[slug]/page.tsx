import React from "react";
import { getAnimeById, getAnimes } from "../getAnimes";
import { notFound } from "next/navigation";
import MotionContainer from "@/components/container/MotionContainer";
import AnimeDetails from "./AnimeDetails";
import { getProductsByReducingSearchTerms } from "./getProducts";

export const revalidate = 3600 * 24;

export async function generateStaticParams() {
  const animes = await getAnimes([], 500);

  const animeList = animes.map((anime) => ({ slug: anime.id }));

  return animeList;
}

const SelectedAnime = async ({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> => {
  const anime = await getAnimeById(params.slug);

  if (!anime) notFound();
  const productsData = await getProductsByReducingSearchTerms(
    anime.title_english
  );

  return (
    <MotionContainer maxW="container.xl">
      <AnimeDetails anime={anime} productsData={productsData} />
    </MotionContainer>
  );
};
export default SelectedAnime;
