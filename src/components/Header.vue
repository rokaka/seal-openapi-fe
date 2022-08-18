<template>
    <div
        class="flex items-center px-6 h-[64px] justify-between border-b border-gray"
        style="height: 64px"
    >
        <div class="flex items-center h-full">
            <wj-image
                :src="require('@/assets/image/logo.png')"
                style="width: 110px; height: 18px"
            />
            <span class="ml-1">开放平台</span>
            <div class="flex items-center ml-6 h-full box-border">
                <router-link
                    to="/console"
                    class="w-16 box-border h-full text-center"
                    style="line-height: 64px"
                    >控制台</router-link
                >
                <router-link
                    to="/dev_doc"
                    class="w-16 box-border h-full text-center ml-6"
                    style="line-height: 64px"
                    >开放文档</router-link
                >
            </div>
        </div>
        <wj-button
            type="primary"
            v-if="!isLogin"
            class="bg-blue"
            @click="loginVisible = true"
            >登录</wj-button
        >

        <wj-dropdown v-else>
            <span class="wj-dropdown-link text-base">
                {{ phone }}<i class="wj-icon-arrow-down wj-icon--right"></i>
            </span>
            <wj-dropdown-menu slot="dropdown">
                <wj-dropdown-item>
                    <span style="color: red" @click="logout">退出登录</span>
                </wj-dropdown-item>
            </wj-dropdown-menu>
        </wj-dropdown>

        <wj-dialog
            :visible.sync="loginVisible"
            width="440px"
            :append-to-body="true"
            type="small"
        >
            <div class="flex flex-col items-center">
                <span class="mt-8 text-2xl font-medium">登录</span>
                <wj-form
                    :model="form"
                    class="px-16 mt-6"
                    ref="loginForm"
                    :rules="rules"
                >
                    <wj-form-item prop="phone">
                        <wj-input
                            v-model="form.phone"
                            placeholder="请输入手机号码"
                        ></wj-input>
                    </wj-form-item>

                    <wj-form-item prop="validateCode">
                        <div class="flex items-center">
                            <wj-input
                                v-model="form.validateCode"
                                placeholder="请输入验证码"
                            ></wj-input>
                            <wj-button
                                class="ml-1 px-0"
                                :disabled="cooling"
                                @click="sendCode"
                                style="height: 38px"
                                >{{
                                    cooling
                                        ? `${countDown}秒后获取`
                                        : "获取验证码"
                                }}</wj-button
                            >
                        </div>
                    </wj-form-item>

                    <wj-form-item>
                        <wj-checkbox v-model="accept"></wj-checkbox>
                        <span class="text-sm">
                            我接受<a href="" class="text-blue">开发者协议</a
                            >及<a href="" class="text-blue">隐私政策</a>
                        </span>
                    </wj-form-item>
                    <wj-form-item>
                        <wj-button
                            type="primary"
                            class="bg-blue w-full h-10"
                            @click="login"
                            >登录</wj-button
                        >
                    </wj-form-item>
                </wj-form>
            </div>
        </wj-dialog>
    </div>
</template>

<script>
import {
    Button,
    Dialog,
    Form,
    FormItem,
    Checkbox,
    Input,
    Dropdown,
    DropdownItem,
    DropdownMenu,
} from "@wenjuan/ui"
import { sendCaptcha, authLogin } from "@/http/auth"
export default {
    data() {
        return {
            loginVisible: false,
            form: {
                phone: "",
                validateCode: "",
            },
            captcha_key: "",
            accept: false, // 是否接受用户协议
            rules: {
                phone: [{ required: true, message: "手机号不能为空" }],
                validateCode: [{ required: true, message: "验证码不能为空" }],
            },
            countDown: 60,
            cooling: false, //验证码发送冷却
        }
    },
    computed: {
        isLogin() {
            return localStorage.getItem("auth_token")
        },
        phone() {
            return localStorage.getItem("user_phone")
        },
    },
    methods: {
        login() {
            this.$refs["loginForm"].validate(async valid => {
                if (valid) {
                    if (!this.accept) {
                        this.$message({
                            type: "info",
                            message: "请先接受开发者协议及隐私政策",
                        })
                        return
                    }

                    const params = {
                        telephone: this.form.phone,
                        captcha_key: this.captcha_key,
                        captcha_code: this.form.validateCode,
                    }
                    const {
                        data: { authorization },
                    } = await authLogin(params)

                    authorization &&
                        localStorage.setItem("auth_token", authorization)

                    localStorage.setItem("user_phone", this.form.phone)

                    this.$message({
                        type: "success",
                        message: "登录成功",
                    })

                    window.location.href = "/" // 登录跳转
                }
            })
        },
        logout() {
            localStorage.removeItem("auth_token")
            window.location.href = "/"
        },
        lauchCountDown() {
            // 启动定时器
            if (!this.cooling) {
                this.cooling = true
                let timer = setInterval(() => {
                    this.countDown--
                    if (this.countDown === 0) {
                        this.cooling = false
                        this.countDown = 60
                        clearInterval(timer)
                    }
                }, 1000)
            }
        },
        async sendCode() {
            // 发送验证码
            this.$refs["loginForm"].validateField("phone", async error => {
                if (!error) {
                    this.lauchCountDown()

                    const {
                        data: { captcha_key },
                    } = await sendCaptcha(this.form.phone)

                    this.$message({
                        type: "success",
                        message: "验证码已发送，请查收",
                    })

                    this.captcha_key = captcha_key
                }
            })
        },
    },
    components: {
        "wj-button": Button,
        "wj-dialog": Dialog,
        "wj-form": Form,
        "wj-form-item": FormItem,
        "wj-checkbox": Checkbox,
        "wj-input": Input,
        "wj-dropdown": Dropdown,
        "wj-dropdown-menu": DropdownMenu,
        "wj-dropdown-item": DropdownItem,
    },
}
</script>
