/* eslint-disable eol-last */
import axios from 'axios'
import store from '@/store'
import JSONbig from "json-bigint"
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net', // 接口的基础路径
  // 处理大数字的数据
  transformResponse: [function (data) {
    try {
      return JSONbig.parse(data);
    } catch (error) {
      return data
    }
  }],
})

// 请求拦截器
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 添加token
  if (store.state.user) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
// axios.interceptors.response.use(function (response) {
//   // 2xx 范围内的状态码都会触发该函数。
//   // 对响应数据做点什么
//   return response;
// }, function (error) {
//   // 超出 2xx 范围的状态码都会触发该函数。
//   // 对响应错误做点什么
//   return Promise.reject(error);
// });

export default request