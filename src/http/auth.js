/** 用户认证相关接口 */

import { get, post } from './index'


export function sendCaptcha(telephone) {
    return get(`/api/v1/authentication/captcha`, { telephone })
}

export function authLogin(params) {
    return post(`/api/v1/authentication/authorization`, params)
}