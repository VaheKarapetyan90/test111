import axios from "axios";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NodeEnvs } from "../constants/env";

axios.defaults.baseURL =
  import.meta.env.NODE_ENV === NodeEnvs.development
    ? import.meta.env.REACT_APP_BASE_URL_DEV
    : import.meta.env.REACT_APP_BASE_URL;

axios.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

export const baseQuery = fetchBaseQuery({
  baseUrl:
    import.meta.env.MODE === NodeEnvs.development
      ? import.meta.env.VITE_APP_BASE_URL_DEV
      : import.meta.env.VITE_APP_BASE_URL,
  prepareHeaders: (headers) => {
    const data: string | any = localStorage.getItem("auth");
    const token = JSON.parse(data)?.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
