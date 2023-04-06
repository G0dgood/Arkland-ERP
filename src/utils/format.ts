export const formatToTrue = (value?: any) => {
  if (value === "Yes") {
    return true;
  } else if (value === "No") {
    return false;
  }
};
