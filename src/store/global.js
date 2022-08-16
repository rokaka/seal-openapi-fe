import getPageHeaders from '@/utils/getPageHeaders'
import Vue from 'vue'

export default {
    state: {
        isLogin: false,
        MENU: [
            { name: "开放平台介绍", link: "ProfileMd" },
            { name: "签名规则", link: "RuleMd" },
            { name: "签名工具", link: "" },
            { name: "频率限制", link: "" },
            { name: "错误代码", link: "" },
            { name: "主要参数说明", link: "" },
            { name: "常见问题", link: "" },
            {
                name: "账号对接",
                children: [
                    { name: "注册问卷网账号", link: "ProfileMd" },
                    { name: "获取第三方登录链接", link: "RuleMd" },
                    { name: "获取绑定账号列表", link: "" },
                ],
            },
            {
                name: "账号对接2",
                children: [
                    { name: "注册问卷网账号", link: "" },
                    { name: "获取第三方登录链接", link: "" },
                    { name: "获取绑定账号列表", link: "" },
                ],
            },
        ],
        pageHeaders: [],
    },
    getters: {
        menu: state => {
            return state.MENU
        },
        flatMenu: state => {
            const menu = state.MENU
            const flatMenu = []
            const len = menu.length
            for (let i = 0; i < len; i++) {
                if (menu[i].children) {
                    flatMenu.push(...menu[i].children)
                } else {
                    flatMenu.push(menu[i])
                }
            }

            return flatMenu
        },
        pageHeaders: state => {
            return state.pageHeaders
        }
    },
    mutations: {
        GET_PAGE_HEADERS(state) {
            state.pageHeaders = getPageHeaders()
        }
    },
    actions: {
        getPageHeaders({ commit }) {
            Vue.nextTick(() => {
                commit("GET_PAGE_HEADERS")
            })
        }
    }
}