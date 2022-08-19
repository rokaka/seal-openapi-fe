// 应用相关
import { get, post, put } from './index'

export function createApp(app_name) {
    return post(`/api/v1/app`, { app_name })
}

export function fetchAppList() {
    return get(`/api/v1/apps`)
}

export function renameApp(appId, newName) {
    return put(`/api/v1/app/${appId}/app-name`, {
        app_name: newName
    })
}

export function fetchAlgorithmUsage(app_id) { // 获取算法用量
    return get(`/api/v1/app/${app_id}/domain/algorithm/usage-quota`)
}

export function fetchAlgorithmQuotao(app_id, params) {
    return get(`/api/v1/app/${app_id}/domain/algorithm/api/quota/page`, params)
}