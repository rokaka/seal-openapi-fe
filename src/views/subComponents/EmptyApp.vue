<template>
    <div class="w-full h-full flex flex-col items-center">
        <img
            :src="require('@/assets/image/empty-app.png')"
            style="width: 336px; height: 195px; margin-top: 121px"
            alt=""
        />
        <span class="text-sm" style="color: #6a6f77">您尚未创建应用</span>
        <wj-button class="bg-blue mt-12" type="primary" @click="visible = true"
            >创建应用</wj-button
        >
        <wj-dialog :visible.sync="visible" title="新建应用" width="380px">
            <wj-form :model="newAppForm" @submit.native.prevent inline>
                <wj-form-item prop="appName" label="应用名称">
                    <wj-input
                        placeholder="请输入"
                        v-model="newAppForm.appName"
                    ></wj-input>
                </wj-form-item>
            </wj-form>
            <div slot="footer" class="flex items-center justify-end">
                <wj-button @click="visible = false">取消</wj-button>
                <wj-button class="bg-blue" type="primary" @click="createApp"
                    >确定</wj-button
                >
            </div>
        </wj-dialog>
    </div>
</template>

<script>
import { Button, Input, Form, FormItem, Dialog } from "@wenjuan/ui"
export default {
    data() {
        return {
            visible: false,
            newAppForm: {
                appName: "",
            },
        }
    },
    components: {
        "wj-button": Button,
        "wj-input": Input,
        "wj-form": Form,
        "wj-form-item": FormItem,
        "wj-dialog": Dialog,
    },
    methods: {
        createApp() {
            console.log("create app...")
        },
    },
}
</script>
