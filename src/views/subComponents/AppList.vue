<template>
    <div class="w-72 text-sm text-text-gray border-r border-gray h-full">
        <div
            style="height: 70px"
            class="font-sans flex justify-between items-center text-base font-bold px-6"
        >
            <span>全部应用</span>
            <i class="wj-icon-plus cursor-pointer" @click="increaseApp"></i>
        </div>
        <ul class="overflow-auto" style="height: calc(100% - 70px)">
            <li
                v-for="(app, index) in appList"
                :key="app.app_id"
                class="cursor-pointer h-10 leading-10 truncate px-6"
                :class="{ active: currentApp === index }"
                :title="app.appName"
                @click="$emit('update:currentApp', index)"
            >
                {{ app.app_name }}
            </li>
        </ul>
        <wj-dialog :visible.sync="visible" title="提示" width="420px" center>
            <div class="text-center">
                <p>如需新增应用数，请联系商务经理</p>
            </div>
            <div slot="footer">
                <wj-button
                    type="primary"
                    class="bg-blue"
                    @click="visible = false"
                    >我知道了</wj-button
                >
            </div>
        </wj-dialog>
    </div>
</template>

<script>
import { Button, Dialog } from "@wenjuan/ui"

export default {
    props: ["appList", "currentApp"],
    data() {
        return {
            visible: false,
        }
    },
    methods: {
        increaseApp() {
            if (this.appList.length > 0) {
                this.visible = true
            }
        },
    },
    components: {
        "wj-button": Button,
        "wj-dialog": Dialog,
    },
}
</script>

<style lang="scss" scoped>
li.active {
    color: #2672ff;
    background-color: rgba(26, 120, 255, 0.1);
}
</style>
