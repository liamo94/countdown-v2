export const checkWord = (arr: string[], search: string) =>
  checkWordUtility(arr, search, 0, arr.length - 1);

const checkWordUtility = (
  arr: string[],
  x: string,
  start: number,
  end: number
): boolean => {
  if (start > end) return false;

  const mid = Math.floor((start + end) / 2);

  if (arr[mid] === x) return true;

  return arr[mid] > x
    ? checkWordUtility(arr, x, start, mid - 1)
    : checkWordUtility(arr, x, mid + 1, end);
};
