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
                        name: '算法平台', children: [
                            {
                                name: '数据分析', children: [
                                    { name: "数据包络", link: "DEAMd" },
                                    { name: "信度分析", link: "ReliabilityAnalysisMd" },
                                    { name: "信度分析-折半系数", link: "ReliabilityAnalysisHalfCoefficientMd" },
                                    { name: "效度分析", link: "validityAnalysisMd" }
                                ]
                            },
                            {
                                name: 'DataFrame与Series', link: "DataFrameSeriesMd"
                            }
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

            function PUSH_ITEM(data) {
                let res = []
                for (let item of data) {
                    if (!item.children) {
                        res.push(item)
                    } else {
                        let temp = PUSH_ITEM(item.children)
                        res = res.concat(temp)
                    }
                }
                return res
            }
            const flatMenu = PUSH_ITEM(menu)
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