export const formatprice = (price) => {
  if(price){
    const data = price.toLocaleString("vi", {
      style: "currency",
      currency: "VND",
    });
    return data;
  }
  return 0
};
