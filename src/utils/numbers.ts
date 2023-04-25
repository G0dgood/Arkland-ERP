export const removeNonNumeric = (num: any) =>
  num.toString().replace(/[^0-9]/g, "");
