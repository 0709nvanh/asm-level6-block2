import { axiosClient } from "./axiosClient";
import { stringify } from "qs";
const productAPI = {
  create(data) {
    const url = `/product`;
    return axiosClient.post(url, data);
  },
  getList(data) {
    const url = `/products?${stringify(data)}`;
    return axiosClient.get(url);
  },
  update(data){
    const url = `/product/${data.slug}`;
    return axiosClient.put(url, data);
  }
};
export default productAPI;