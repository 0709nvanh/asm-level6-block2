import axios from "axios";
export const axiosClient = axios.create({
  baseURL: "http://localhost:8866/api",
  headers: {
    "Content-Type": "application/json",
  },
});