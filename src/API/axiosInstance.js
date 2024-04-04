// api/axiosInstance.js
import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8888', // 设置基本的请求 URL
    timeout: 5000, // 设置请求超时时间为 5 秒
    headers: {
        'Content-Type': 'application/json; charset=utf-8', // 设置请求头
    }
});

// 添加请求拦截器
axiosInstance.interceptors.request.use(config => {

    console.log('Request Interceptor - Request Config:', config);

    return config;
}, error => {
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
});

// 添加响应拦截器
axiosInstance.interceptors.response.use(response => {
    // 在响应返回之后做一些处理
    console.log('Response Interceptor - Response Data:', response.data);

    return response;
}, error => {
    // 处理响应错误
    console.error('Response Interceptor Error:', error);
    return Promise.reject(error);
});

export default axiosInstance;
