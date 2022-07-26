import { axiosClient } from "./axiosClient";
import { stringify } from "qs";
const productAPI = {
  create(data) {
    const url = `/product`;
    return axiosClient.post(url, data);
  },
  read(slug) {
    const url = `/product/${slug}`;
    return axiosClient.get(url);
  },
  getList(data) {
    const url = `/products?${stringify(data)}`;
    return axiosClient.get(url);
  },
  update(data){
    const url = `/product/${data.slug}`;
    return axiosClient.put(url, data);
  },
  updateStatus(data){
    const url = `/product-update-status/${data._id}`;
    return axiosClient.put(url, data);
  }
};
export default productAPI;