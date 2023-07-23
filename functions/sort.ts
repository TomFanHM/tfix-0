export function sort<T, K extends keyof T>(
  arr: T[],
  fn: (el: T) => T[K] | number | undefined | null,
  order: "asc" | "desc" = "asc"
) {
  function compareFn(a: T, b: T) {
    const aVal = fn(a);
    const bVal = fn(b);

    if (aVal === undefined || aVal === null) {
      return order === "asc" ? -1 : 1;
    }
    if (bVal === undefined || bVal === null) {
      return order === "asc" ? 1 : -1;
    }

    if (aVal < bVal) {
      return order === "asc" ? -1 : 1;
    } else if (aVal > bVal) {
      return order === "asc" ? 1 : -1;
    } else {
      return 0;
    }
  }

  return mergeSort(arr, compareFn);
}

function mergeSort<T>(arr: T[], compare: (a: T, b: T) => number): T[] {
  if (arr.length <= 1) {
    return arr;
  }

  const middleIndex = Math.floor(arr.length / 2);
  const left = arr.slice(0, middleIndex);
  const right = arr.slice(middleIndex);

  return merge(mergeSort(left, compare), mergeSort(right, compare), compare);
}

function merge<T>(left: T[], right: T[], compare: (a: T, b: T) => number): T[] {
  let result: T[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    const comparison = compare(left[leftIndex], right[rightIndex]);
    if (comparison <= 0) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}
