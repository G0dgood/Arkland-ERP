export const thousandSeparator = (x: any) => {
  return x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
