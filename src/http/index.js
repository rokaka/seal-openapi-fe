import axios from 'axios';
import { Message } from '@wenjuan/ui'

const config = {
    headers: {
        post: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*',
    },
    // 超时设置
    timeout: 40000,
    // 跨域是否带Token
    withCredentials: false,
    // 响应的数据格式 json / blob /document /arraybuffer / text / stream
    responseType: 'json',
}
const service = axios.create(config);

if (process.env.NODE_ENV == 'development') {
    service.defaults.baseURL = '/api';
}


// 请求拦截器
service.interceptors.request.use(
    config => {
        const token = localStorage.getItem('auth_token')
        config.headers['Authorization'] = token
        return config
    },
    error => Promise.reject(error)
);
// 响应拦截器
service.interceptors.response.use(
    (response) => {
        let data = response.data;
        return data;
    },
    (error) => {
        if (error.response.status == 401 && error.response.data.code === 10002) {
            if (localStorage.getItem('auth_token')) {
                error.message = '登录已过期，请重新登录'
                localStorage.removeItem('auth_token')
            } else {
                error.message = '请登录'
            }
            Message({
                type: 'info',
                message: error.message
            })
            setTimeout(() => {
                window.location.href += '?login'
            }, 800)
            return
        } else if (error && error.response && error.response.data) {
            error.message = error.response.data.message;
        }

        error.message = error.message || '网络有点小问题，请稍后再试';

        Message({
            message: `${error.message}`,
            duration: 2000,
            type: 'error'
        });
        return Promise.reject(error.response || error);
    }
);

export const get = (url, data) => service({ method: 'get', url, params: data });
export const post = (url, data, params, headers) => service({ method: 'post', url, data, params, headers });
export const put = (url, data) => service({ method: 'put', url, data })
