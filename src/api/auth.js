import { axiosClient } from "./axiosClient";
import { stringify } from "qs";
const authAPI = {
  login(data) {
    const url = `/login`;
    return axiosClient.post(url, data);
  },
  signup(data) {
    const url = `/signup`;
    return axiosClient.post(url, data);
  },
  getListUser(){
    const url = `/users`;
    return axiosClient.get(url);
  },

  searchUser(keySearch) {
    const url = `search-user`;
    return axiosClient.post(url, { keySearch });
  },

  readUser(id){
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },
  updateStatusUser(status){
    const url = `/update-status-user/${status._id}`;
    return axiosClient.put(url, status);
  }
};
export default authAPI;