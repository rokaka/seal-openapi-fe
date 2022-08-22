<template>
    <div style="height: calc(100vh - 64px)">
        <EmptyApp
            v-if="!appList.length"
            @refresh="getAppList"
            v-loading="loading"
            element-loading-text="加载中..."
            element-loading-spinner="wj-icon-loading-rota"
        />
        <div class="h-full flex pb-14" v-else>
            <AppList :appList="appList" :currentApp.sync="currentApp"></AppList>
            <AppDetail
                :appDetail="appList[currentApp]"
                @refresh="getAppList"
            ></AppDetail>
        </div>
    </div>
</template>
<script>
import EmptyApp from "./subComponents/EmptyApp.vue"
import AppList from "./subComponents/AppList.vue"
import AppDetail from "./subComponents/AppDetail.vue"
import { fetchAppList } from "@/http/app.js"

export default {
    data() {
        return {
            appList: [],
            currentApp: 0,
            loading: false,
        }
    },
    components: {
        EmptyApp,
        AppList,
        AppDetail,
    },
    mounted() {
        if (!this.$route.fullPath.includes("login")) {
            this.getAppList()
        }
    },
    methods: {
        async getAppList() {
            try {
                this.loading = true
                const res = await fetchAppList()
                this.appList = res.data
            } finally {
                this.loading = false
            }
        },
    },
}
</script>
