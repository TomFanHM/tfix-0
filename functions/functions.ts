import DOMPurify from "isomorphic-dompurify";

export function capitalizeFirstLetter(str: string): string {
  if (typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export type DateType = {
  year: number;
  month: number;
  day: number;
};

export function getToday(): DateType {
  const d = new Date();
  return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
}

export type MonthType = {
  year: number;
  month: number;
};

export function getNextMonth(year: number, month: number): MonthType {
  let next = month + 1;
  if (next > 12) return { year: year + 1, month: 1 };
  return { year: year, month: next };
}

export function getPrevMonth(year: number, month: number): MonthType {
  let prev = month - 1;
  if (prev < 1) return { year: year - 1, month: 12 };
  return { year: year, month: prev };
}

export function getDaysOfSpecifiedMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

//1D array to 2D array
export function arrayRestructure<T>(arr: T[], col: number): T[][] {
  const stack = [];
  for (let i = 0; i < arr.length; i += col) {
    stack.push(arr.slice(i, i + col));
  }
  return stack;
}

//string "a, b, c, d " to array ["a", "b", "c", "d"]
export function splitString(string: string): string[] {
  return string.split(",").map((word) => word.trim());
}

//https://stackoverflow.com/questions/1484506/random-color-generator?page=1&tab=scoredesc#tab-top
export function getRandomColor(): string {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//get today's date in dd/mm/yy format
export function getDate(d: Date): string {
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  return `${day}/${month}/${year}`;
}

//limit the number of words in a string
export function shortenString(s: string, l: number): string {
  const words = s.split(" ");
  if (words.length > l) {
    return words.slice(0, l).join(" ") + "...";
  } else {
    return s;
  }
}

export const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

//whatever input is embed link or video id, return embed link
export function getYoutubeEmbedLink(input: string): string {
  if (input.startsWith("https://www.youtube-nocookie.com/embed/")) {
    return input;
  }

  return `https://www.youtube-nocookie.com/embed/${input}`;
}

//prevent xss attack, clean html input
export function cleanHtml(dirty: string): string {
  const clean = DOMPurify.sanitize(dirty, {
    USE_PROFILES: { html: true },
    ADD_TAGS: ["iframe", "pre"],
    ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
    FORBID_TAGS: ["style"],
  });
  return clean;
}

//revalidatePath
export async function revalidatePathByNextApi(path: string) {
  const basePath = process.env.NEXT_PUBLIC_APP_URL;
  const secret = process.env.NEXT_PUBLIC_APP_REVALIDATION_SECRET;
  if (!basePath) return false;
  const res = await fetch(
    `${basePath}/api/revalidate?path=${path}&secret=${secret}`
  );
  return res;
}
