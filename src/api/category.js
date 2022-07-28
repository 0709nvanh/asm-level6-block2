import { axiosClient } from "./axiosClient";
import { stringify } from "qs";
const categoryAPI = {
  create(data) {
    const url = `/category`;
    return axiosClient.post(url, data);
  },
  getList(data) {
    const url = `/categories?${stringify(data)}`;
    return axiosClient.get(url);
  },
  searchCategory(keySearch) {
    const url = `category-search`;
    return axiosClient.post(url, { keySearch });
  },
  read(slug) {
    const url = `/category/${slug}`;
    return axiosClient.get(url);
  },
  update(data){
    const url = `/category/${data.slug}`;
    return axiosClient.put(url, data);
  },
  updateStatus(data){
    const url = `/category/update-status/${data._id}`;
    return axiosClient.put(url, data);
  }
};
export default categoryAPI;