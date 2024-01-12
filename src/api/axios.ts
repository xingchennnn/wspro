import axios from "axios";
import config from "./config";
import type {

  AxiosResponse,
  AxiosRequestHeaders,
} from "axios";
import {ElMessage} from "element-plus"

axios.defaults.baseURL = config.BASE_URL;
axios.defaults.timeout = config.TIMEOUT;

axios.interceptors.request.use(
  (config) => {
    const headers = config.headers as AxiosRequestHeaders;
    headers.Authorization = "";
    // 在发送请求之前做些什么
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);


// 添加响应拦截器
axios.interceptors.response.use(
  function (response: AxiosResponse) {
    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    console.log("错误", error)
    const response = error.response
    if (response.status === 401) {
      console.log('401错误:', response.message )
    }


    if (error.response.data.code == '500') {
      console.log("错误", error)
      if (error.response.data.message.indexOf('ServerException') != -1) {
        ElMessage({
          message: error.response.data.message.split('ServerException:')[1] || '请求失败!',
          type: 'warning',
          duration: 3000,
        });
      } else if (error.response.data.message.indexOf('java.lang.Exception') != -1) {
        ElMessage({
          message: error.response.data.message.split('java.lang.Exception:')[1] || '请求失败!',
          type: 'warning',
          duration: 3000,
        });
      } else {
        ElMessage({
          message: error.response.data.message || '请求失败!',
          type: 'error',
          duration: 3000,
        });
      }
    }
    // return Promise.reject(error.response);
    // 对响应错误做点什么
    return Promise.reject(error.response?.data)
  }
)


export default axios