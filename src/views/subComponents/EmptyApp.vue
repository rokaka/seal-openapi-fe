<template>
    <div class="w-full h-full flex flex-col items-center">
        <img
            :src="require('@/assets/image/empty-app.png')"
            style="width: 336px; height: 195px; margin-top: 121px"
            alt=""
        />
        <span class="text-sm" style="color: #6a6f77">您尚未创建应用</span>
        <wj-button class="bg-blue mt-12" type="primary" @click="openDialog"
            >创建应用</wj-button
        >
        <wj-dialog :visible.sync="visible" title="新建应用" width="380px">
            <wj-form
                :model="newAppForm"
                @submit.native.prevent
                inline
                ref="newAppForm"
            >
                <wj-form-item
                    prop="appName"
                    label="应用名称"
                    :rules="[
                        {
                            required: true,
                            message: '请输入应用名称',
                            trigger: 'blur',
                        },
                        {
                            validator: validateAppName,
                        },
                    ]"
                >
                    <wj-input
                        placeholder="请输入"
                        v-model="newAppForm.appName"
                        maxlength="30"
                        show-word-limit
                        class="input-wrapper"
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
import { createApp } from "@/http/app"
import { mapActions } from "vuex"
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
        ...mapActions(["openLoginDialog"]),
        validateAppName(rule, value, callback) {
            if (/^[\u4E00-\u9FA5,a-zA-Z]+$/g.test(value)) {
                callback()
            } else {
                callback(new Error("只允许填入中英文"))
            }
        },
        openDialog() {
            if (!localStorage.getItem("auth_token")) {
                this.$message("请先登录")

                let timer = setTimeout(() => {
                    this.openLoginDialog()
                    clearTimeout(timer)
                }, 800)

                return
            }
            this.visible = true
        },
        createApp() {
            this.$refs["newAppForm"].validate(async valid => {
                if (valid) {
                    await createApp(this.newAppForm.appName)
                    this.$emit("refresh") // 通知更新列表
                    this.visible = false
                }
            })
        },
    },
}
</script>

<style lang="scss" scoped>
::v-deep.input-wrapper input {
    padding-right: 50px;
}
</style>
