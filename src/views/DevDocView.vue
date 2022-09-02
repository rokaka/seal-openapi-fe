<template>
    <div class="flex box-border" style="height: calc(100vh - 64px)">
        <SideNav />
        <component :is="currentDoc"></component>
        <RightMenu />
    </div>
</template>

<script>
import ProfileMd from "@/assets/md/profile.md"
import SignToolMd from "@/assets/md/signTool.md"
import AppAccessDescriptionMd from "@/assets/md/appAccessDesc.md"
import DEAMd from "@/assets/md/dea.md"
import ErrorCodeMd from "@/assets/md/errorCode.md"
import SideNav from "./subComponents/SideNav.vue"
import RightMenu from "./subComponents/RightMenu.vue"
import throttle from "@/utils/throttle.js"
import { mapGetters, mapActions } from "vuex"

export default {
    components: {
        ProfileMd,
        SideNav,
        RightMenu,
        SignToolMd,
        AppAccessDescriptionMd,
        DEAMd,
        ErrorCodeMd,
    },
    computed: {
        ...mapGetters(["menu", "flatMenu", "pageHeaders"]),
    },
    watch: {
        $route: {
            handler: function (route, oldRoute) {
                const {
                    params: { docName },
                } = route

                if (!docName) {
                    // 第一次进入时，默认进入第一篇文档
                    this.$router.push({
                        name: "DevDoc",
                        params: { docName: "开放平台介绍" },
                    })
                } else if (!oldRoute || docName !== oldRoute.params.docName) {
                    // 切换文档
                    const menuItem = this.flatMenu.find(
                        item => item.name === docName
                    )
                    this.currentDoc = menuItem.link // 更新文档
                    this.getPageHeaders() // 更新右侧文档目录

                    this.$nextTick(() => {
                        // 页面渲染完后，重新监听当前文档的滚动事件
                        this.listenScroll()
                    })
                }
            },
            immediate: true,
        },
    },
    mounted() {
        this.scrollHandle = throttle(this.scrollHandle, 500)
        this.listenScroll()
        this.locationToAnchor()
    },
    beforeDestroy() {
        this.removeListenScroll()
    },
    methods: {
        ...mapActions({
            getPageHeaders: "getPageHeaders",
        }),

        locationToAnchor() {
            // 进入页面时定位到URL中的锚点位置
            const anchor = this.$route.hash
            if (anchor) {
                const target_dom = document.getElementById(
                    anchor.replace(/^#/, "")
                )
                if (target_dom) {
                    target_dom.scrollIntoView()
                }
            }
        },
        removeListenScroll() {
            const scroll_dom = document.querySelector(".markdown-body")
            scroll_dom &&
                scroll_dom.removeEventListener("scroll", this.scrollHandle)
        },
        listenScroll() {
            const scroll_dom = document.querySelector(".markdown-body")
            scroll_dom &&
                scroll_dom.addEventListener("scroll", this.scrollHandle)
        },
        scrollHandle() {
            const h2_doms = document.querySelectorAll(".markdown-body h2")
            Array.from(h2_doms)
                .reverse()
                .forEach(h2 => {
                    const { top, bottom } = h2.getBoundingClientRect()
                    if (top > 50 && bottom <= window.innerHeight - 50) {
                        // 标题滚动到页面中时，更新URL
                        const urlHash = `#${h2.id}`
                        if (urlHash !== this.$route.hash) {
                            // 相同的URL不更新
                            this.$router.push(urlHash)
                        }
                    }
                })
        },
    },
    data() {
        return {
            currentDoc: "",
        }
    },
}
</script>
