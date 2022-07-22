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
  update(data){
    const url = `/category/${data.slug}`;
    return axiosClient.put(url, data);
  }
};
export default categoryAPI;