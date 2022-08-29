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
            @click="openLoginDialog"
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
            :visible="loginVisible"
            @update:visible="changeLoginDialog"
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
                                class="ml-1 px-0 text-blue border border-blue"
                                :class="{ 'opacity-40': cooling }"
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

                    <wj-checkbox v-model="accept"></wj-checkbox>
                    <span class="text-sm pl-1">
                        我接受<span
                            @click="openUrl('/terms')"
                            class="text-blue cursor-pointer"
                            >开发者协议</span
                        >及<span
                            @click="openUrl('/privacy')"
                            class="text-blue cursor-pointer"
                            >隐私政策</span
                        >
                    </span>
                    <wj-form-item class="mt-3">
                        <wj-button
                            type="primary"
                            class="bg-blue w-full h-10"
                            @click="login"
                            >登录</wj-button
                        >
                        <p
                            class="text-gray-500 text-xs text-center w-full mt-4"
                        >
                            未注册的手机号验证后自动注册
                        </p>
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
import { mapActions, mapGetters } from "vuex"
import debounce from "@/utils/debounce"
export default {
    data() {
        const checkPhoneNumber = (rule, value, callback) => {
            if (!/^1[3456789]\d{9}$/.test(value)) {
                callback(new Error("请填入正确的手机号"))
            } else {
                callback()
            }
        }
        return {
            form: {
                phone: "",
                validateCode: "",
            },
            captcha_key: "",
            accept: false, // 是否接受用户协议
            rules: {
                phone: [
                    { required: true, message: "手机号不能为空" },
                    { validator: checkPhoneNumber },
                ],
                validateCode: [{ required: true, message: "验证码不能为空" }],
            },
            timer: null,
            countDown: 60,
            cooling: false, //验证码发送冷却,
        }
    },
    mounted() {
        this.login = debounce(this.login)
    },
    computed: {
        isLogin() {
            return localStorage.getItem("auth_token")
        },
        phone() {
            return localStorage.getItem("user_phone")
        },
        ...mapGetters(["loginVisible"]),
    },
    methods: {
        ...mapActions([
            "openLoginDialog",
            "closeLoginDialog",
            "changeLoginDialog",
        ]),
        login() {
            this.$refs["loginForm"].validate(async valid => {
                if (valid) {
                    if (!this.accept) {
                        this.$message({
                            type: "info",
                            message: "请阅读并勾选开发者协议和隐私政策",
                        })
                        return
                    }
                    if (!this.captcha_key) {
                        this.$message({
                            type: "info",
                            message: "请先获取验证码",
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
                    this.closeLoginDialog()
                    setTimeout(() => {
                        location.reload()
                    }, 800)
                }
            })
        },
        logout() {
            localStorage.removeItem("auth_token")
            window.location.reload()
        },
        lauchCountDown() {
            // 启动定时器
            if (!this.cooling) {
                this.cooling = true
                this.timer = setInterval(() => {
                    this.countDown--
                    if (this.countDown < 1) {
                        this.cooling = false
                        this.countDown = 60
                        clearInterval(this.timer)
                    }
                }, 1000)
            }
        },
        async sendCode() {
            // 发送验证码
            if (this.cooling) return
            this.$refs["loginForm"].validateField("phone", async error => {
                if (!error) {
                    try {
                        const {
                            data: { captcha_key },
                        } = await sendCaptcha(this.form.phone)

                        this.$message({
                            type: "success",
                            message: "验证码已发送，请查收",
                        })
                        this.lauchCountDown()
                        this.captcha_key = captcha_key
                    } catch (error) {
                        if (error.data && error.data.code === 20301) {
                            this.countDown = error.data.data.retry_in
                            this.lauchCountDown()
                            this.cooling = true
                        }
                    }
                }
            })
        },
        openUrl(url) {
            window.open(url)
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
