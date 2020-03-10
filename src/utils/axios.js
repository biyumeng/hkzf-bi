// 全局axios

import axios from 'axios'

import { Toast } from 'antd-mobile';

//后端接口的基础路径
const BASE_URL = 'http://api-haoke-dev.itheima.net'

//创建一个全局axios实例
const axios_my = axios.create({
    baseURL: BASE_URL
});

// 注册拦截器（request和response）

// Add a request interceptor
axios_my.interceptors.request.use(function (config) {
    // Do something before request is sent
    // console.log('开始请求了');
    Toast.loading('加载中...',0)
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  
  // Add a response interceptor
  axios_my.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log('请求成功了',response);
    Toast.hide()
    const { status , body , description } = response.data;
    const data ={
        status,
        description,
        data:body
    }
    return data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
  
  export { BASE_URL }
  export default axios_my;