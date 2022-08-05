import { axiosClient } from "./axiosClient";
import { stringify } from "qs";
const cartAPI = {
  getListOrder() {
    const url = `/orders`;
    return axiosClient.get(url);
  },
  getCartById(id) {
    const url = `/order/${id}`;
    return axiosClient.get(url);
  },
  getCartByUser(userId) {
    const url = `/get-order-user/${userId}`;
    return axiosClient.get(url);
  },
  addOrder(data) {
    const url = `/order`;
    return axiosClient.post(url, data);
  },
    updateStatusOrder(data){
    const url = `/update-status-order/${data._id}`;
    return axiosClient.put(url, data);
  }
};
export default cartAPI;
