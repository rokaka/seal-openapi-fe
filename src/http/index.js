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
    config => config,
    error => Promise.reject(error)
);
// 响应拦截器
service.interceptors.response.use(
    (response) => {
        // config.headers['Authorization'] = 'token'
        let data = response.data;
        return data;
    },
    (error) => {
        if (error.response.status == 401 && error.response.data.message === 'Unauthorized') {
            error.message = '请先登录';
            setTimeout(() => {
                window.location.href = '/';
            }, 800);
        } else if (error && error.response && error.response.data) {
            error.message = error.response.data.message;
        }

        error.message = error.message || 'error';
        Message({
            message: `${error.message}`,
            duration: 2000,
            offset: 70,
        });
        return Promise.reject(error.response || error);
    }
);

// [注]put2中的data是body参数
export default {
    get: (url, data) => service({ method: 'get', url, params: data }),
    post: (url, data, params, headers) => service({ method: 'post', url, data, params, headers }),
    delete: (url, data) => service({ method: 'delete', url, data }),
    put: (url, data) => service({ method: 'put', url, params: data }),
    patch: (url, data, params, headers) => service({ method: 'patch', url, data, params, headers }),
};
