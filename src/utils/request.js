/* eslint-disable eol-last */
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net' // 接口的基础路径
})

// 请求拦截器
// 相应拦截器

export default request