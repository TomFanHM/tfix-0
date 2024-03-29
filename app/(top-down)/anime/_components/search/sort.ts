import { sort } from "@/functions/sort";
import { AnimeData } from "../getAnimes";
import { ProductSchema } from "../getProducts";

export type SortOptions = {
  anime: null | "Latest" | "Popular" | "Broadcast";
  product: null | "Price" | "Release Date";
};

const weekdayMap = {
  Mondays: 1,
  Tuesdays: 2,
  Wednesdays: 3,
  Thursdays: 4,
  Fridays: 5,
  Saturdays: 6,
  Sundays: 7,
};

const seasonMap = {
  winter: 0,
  spring: 3,
  summer: 6,
  fall: 9,
};

export function sortAnimeFactory(
  arr: AnimeData[],
  sortedBy: null | "Latest" | "Popular" | "Broadcast"
) {
  if (!sortedBy) return arr;
  if (sortedBy === "Popular") {
    return sort(arr, (el: AnimeData) => el.popularity, "asc"); //small popularity value means more popular
  }
  if (sortedBy === "Broadcast") {
    return sort(
      arr,
      (el: AnimeData) =>
        el.broadcast_day
          ? weekdayMap[el.broadcast_day as keyof typeof weekdayMap]
          : undefined,
      "asc"
    );
  }
  if (sortedBy === "Latest") {
    return sort(
      arr,
      (el: AnimeData) => {
        if (!el.year) return undefined;
        if (el.year && seasonMap[el.season as keyof typeof seasonMap])
          return el.year * 10 + seasonMap[el.season as keyof typeof seasonMap]; // eg.2023 winter => 20230 + 0 = 20230
        if (el.year && !el.season) return el.year * 10;
        return undefined;
      },
      "desc"
    );
  }
  return arr;
}

export function sortProductFactory(
  arr: ProductSchema[],
  sortedBy: null | "Price" | "Release Date"
) {
  if (!sortedBy) return arr;
  switch (sortedBy) {
    case "Price":
      return sort(
        arr,
        (el: ProductSchema) => Number(el.price.replace(/[^0-9]/g, "")),
        "desc"
      );
    case "Release Date":
      return sort(arr, (el: ProductSchema) => el.releaseDate, "desc");
    default:
      return arr;
  }
}
