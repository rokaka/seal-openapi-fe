<template>
    <div
        style="width: 264px"
        class="h-full border-r border-gray pl-10 pr-6 pt-8"
    >
        <ul class="w-full">
            <li
                v-for="(item, index) in pageHeaders"
                :key="item.name"
                class="text-sm text-text-gray relative box-border"
                :class="{ active: urlHash == headerName2Url(item.name) }"
                :style="{ padding: index !== 0 ? '5px 0' : '' }"
            >
                <a @click="locationToAnchor(item.href)" class="cursor-pointer">
                    {{ item.name }}
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
    watch: {
        $route: {
            immediate: true,
            handler: function (route) {
                this.urlHash = this.decodeHash(route.hash)
            },
        },
        pageHeaders: {
            immediate: true,
            handler() {
                if (this.pageHeaders.length) {
                    this.urlHash = this.decodeHash(this.pageHeaders[0].href)
                }
            },
        },
    },
    data() {
        return {
            urlHash: "",
        }
    },
    methods: {
        headerName2Url(link) {
            return link.replace(/\s/g, "-").toLowerCase()
        },
        decodeHash(hash) {
            return decodeURIComponent(hash.replace(/^#/, ""))
        },
        locationToAnchor(anchor) {
            // 定位到URL中的锚点位置
            if (anchor) {
                const target_dom = document.getElementById(
                    anchor.replace(/^#/, "")
                )
                if (target_dom) {
                    target_dom.scrollIntoView()
                }
            }
        },
    },
    computed: {
        ...mapGetters(["pageHeaders"]),
    },
}
</script>

<style lang="scss" scoped>
ul {
    li::before {
        content: "";
        position: absolute;
        left: -20px;
        top: 50%;
        transform: translateY(-50%);
        width: 2px;
        height: 100%;
        background-color: #eef1f5;
    }

    .active::before {
        background: #1a78ff;
    }

    li.active {
        color: #1a78ff;
    }
}
</style>
