export function lowerCase(str: string) {
  return str.toLowerCase();
}

export function upperCase(str: string) {
  return str.toUpperCase();
}

export function capitalizeFirstLetter(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
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

export function getTags(string: string): string[] {
  return string.split(",").map((word) => word.trim());
}

export function getRandomColor(): string {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
