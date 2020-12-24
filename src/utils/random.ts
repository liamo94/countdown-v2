export const random = (x: number | any[], y?: number) => {
  if (Array.isArray(x)) {
    const index = Math.floor(Math.random() * x.length);
    return x[index];
  }
  return y
    ? Math.floor(Math.random() * (y - x) + x)
    : Math.floor(Math.random() * x);
};
