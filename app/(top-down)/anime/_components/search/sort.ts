import { sortFactory } from "@/functions/functions";
import { AnimeData } from "../getAnimes";
import { ProductSchema } from "../getProducts";

type Season = "winter" | "spring" | "summer" | "fall";

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
    return sortFactory(arr, (el: AnimeData) => el.popularity, "asc"); //small popularity value means more popular
  }
  if (sortedBy === "Broadcast") {
    return sortFactory(
      arr,
      (el: AnimeData) =>
        el.broadcast_day
          ? weekdayMap[el.broadcast_day as keyof typeof weekdayMap]
          : undefined,
      "asc"
    );
  }
  if (sortedBy === "Latest") {
    return sortFactory(
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

export function sortAnime(
  arr: AnimeData[],
  sortedBy: null | "Latest" | "Popular" | "Broadcast"
): AnimeData[] {
  if (!sortedBy) return arr;
  switch (sortedBy) {
    case "Latest":
      return [...arr].sort((a, b) => {
        //compare the year values
        if (!a.year) return 1;
        if (!b.year) return -1;
        if (a.year !== b.year) return b.year - a.year;
        //compare the season values
        const aSeason = seasonMap[a.season as Season];
        const bSeason = seasonMap[b.season as Season];
        if (!aSeason) return 1;
        if (!bSeason) return -1;
        return bSeason - aSeason;
      });
    case "Popular":
      return [...arr].sort((a, b) => {
        if (!a.popularity) return 1;
        if (!b.popularity) return -1;
        return a.popularity - b.popularity; //small popularity value means more popular
      });
    case "Broadcast":
      return [...arr].sort((a, b) => {
        const aDay = weekdayMap[a.broadcast_day as keyof typeof weekdayMap];
        const bDay = weekdayMap[b.broadcast_day as keyof typeof weekdayMap];
        if (!aDay) return 1;
        if (!bDay) return -1;
        return bDay - aDay;
      });
    default:
      return arr;
  }
}

export function sortProduct(
  arr: ProductSchema[],
  sortedBy: null | "Price" | "Release Date"
): ProductSchema[] {
  if (!sortedBy) return arr;
  switch (sortedBy) {
    case "Price":
      // First, remove the non-numeric characters from each string and parse as a number
      return [...arr].sort((a, b) => {
        const aPrice = Number(a.price.replace(/[^0-9]/g, "")); //^ = match any character that is not in the set
        const bPrice = Number(b.price.replace(/[^0-9]/g, ""));
        if (!aPrice) return 1;
        if (!bPrice) return -1;
        return bPrice - aPrice;
      });
    case "Release Date":
      return [...arr].sort((a, b) => {
        if (!a.releaseDate) return 1;
        if (!b.releaseDate) return -1;
        return b.releaseDate.localeCompare(a.releaseDate);
      });
    default:
      return arr;
  }
}
