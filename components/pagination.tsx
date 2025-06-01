export const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 3;
  const from = page ? page * (limit + 1) : 0;
  const to = page ? from + size : size;

  // console.log(limit, from, to)
  return { from, to };
};