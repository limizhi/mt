import axios from "axios";

//导出包含axios配置的实例
export const axios_instance =axios.create({
  baseURL: "http://127.0.0.1:5050",
  // timeout: timeout,
  headers: {
    "Content-Type":"application/x-www-form-urlencoded"
  }
});