import getPageHeaders from '@/utils/getPageHeaders'
import { fetchUserInfo } from '@/http/auth'
import Vue from 'vue'

export default {
    state: {
        MENU: [
            { name: "开放平台介绍", link: "ProfileMd" },
            { name: 'APP接入说明', link: "AppAccessDescriptionMd" },
            { name: "全局错误码", link: "ErrorCodeMd" },
            { name: "签名规则", link: "SignToolMd" },
            {
                name: "API文档",
                children: [
                    {
                        name: '算法', children: [
                            { name: "数据包络", link: "DEAMd" },
                        ]
                    },

                ],
            },
        ],
        pageHeaders: [],
        loginVisible: false,
        userInfo: {
            phone: ''
        }
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
                    for (let j = 0; j < menu[i].children.length; j++) {
                        if (menu[i].children[j].children) {
                            flatMenu.push(...menu[i].children[j].children)
                        } else {
                            flatMenu.push(menu[i].children[j])
                        }
                    }
                } else {
                    flatMenu.push(menu[i])
                }
            }

            return flatMenu
        },
        pageHeaders: state => {
            return state.pageHeaders
        },
        loginVisible: state => {
            return state.loginVisible
        },
        userphone: state => {
            return state.userInfo.phone
        }
    },
    mutations: {
        GET_PAGE_HEADERS(state) {
            state.pageHeaders = getPageHeaders()
        },
        OPEN_LOGIN_DIALOG(state) {
            state.loginVisible = true
        },
        CLOSE_LOGIN_DIALOG(state) {
            state.loginVisible = false
        },
        CHANGE_LOGIN_DIALOG(state, status) {
            state.loginVisible = status
        },
        SET_USER_PHONE(state, phone) {
            state.userInfo.phone = phone
        }
    },
    actions: {
        getPageHeaders({ commit }) {
            Vue.nextTick(() => {
                commit("GET_PAGE_HEADERS")
            })
        },
        openLoginDialog({ commit }) {
            commit('OPEN_LOGIN_DIALOG')
        },
        closeLoginDialog({ commit }) {
            commit('CLOSE_LOGIN_DIALOG')
        },
        changeLoginDialog({ commit }, status) {
            commit('CHANGE_LOGIN_DIALOG', status)
        },
        getUserInfo({ commit }) {
            return fetchUserInfo().then(res => {
                commit('SET_USER_PHONE', res.data.telephone)
            })
        }
    }
}