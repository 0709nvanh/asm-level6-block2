export const formatprice = (price) => {
  const data = price.toLocaleString("vi", {
    style: "currency",
    currency: "VND",
  });
  return data;
};
