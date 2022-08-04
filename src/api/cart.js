import { axiosClient } from "./axiosClient";
import { stringify } from "qs";
const cartAPI = {
  getListOrder(data) {
    const url = `/orders?${stringify(data)}`;
    return axiosClient.get(url);
  },
  addOrder(data) {
    const url = `/order`;
    return axiosClient.post(url, data);
  },
};
export default cartAPI;
