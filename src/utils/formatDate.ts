import moment from "moment";

export const formatDate = (date: Date) => {
  const show = moment(date).format();
  return show;
};
