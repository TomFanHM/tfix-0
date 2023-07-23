export function getChunks<T>(arr: T[], chunkSize: number): T[][] {
  if (arr.length === 0) {
    return [];
  }

  const chunks: T[][] = [];

  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    chunks.push(chunk);
  }

  return chunks;
}

export function flatten<T>(arr: T[][]): T[] {
  return arr.reduce((acc, val) => acc.concat(val), []);
}

export function shuffle<T>(arr: T[]): T[] {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export function uniq<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}
