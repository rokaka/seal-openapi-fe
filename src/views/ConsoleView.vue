<template>
    <div style="height: calc(100vh - 64px)">
        <EmptyApp v-if="!appList.length" />
        <div class="h-full flex pb-14" v-else>
            <AppList :appList="appList" :currentApp.sync="currentApp"></AppList>
            <AppDetail :appDetail="appList[currentApp]"></AppDetail>
        </div>
    </div>
</template>
<script>
import EmptyApp from "./subComponents/EmptyApp.vue"
import AppList from "./subComponents/AppList.vue"
import AppDetail from "./subComponents/AppDetail.vue"

export default {
    data() {
        return {
            appList: [],
            currentApp: 0,
        }
    },
    components: {
        EmptyApp,
        AppList,
        AppDetail,
    },
    mounted() {
        this.getAppList().then(res => {
            this.appList = res.applist
        })
    },
    methods: {
        getAppList() {
            return Promise.resolve({
                applist: [
                    {
                        appName:
                            "福建日报福建日报福建日报福建日报福建日报福建日报",
                        appId: "60016535133",
                        appKey: "wjasdfasdfasdf",
                        appSecret: "wjasdfasdfasdf",
                    },
                    {
                        appName:
                            "福建日报福建日报福建日报福建日报福建日报福建日报",
                        appId: "6001653513",
                        appKey: "",
                        appSecret: "",
                    },
                ],
            })
        },
    },
}
</script>
