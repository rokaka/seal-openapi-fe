<template>
    <div class="sign-tool">
        <div class="form-body">
            <div class="sign-title">签名工具</div>
            <div class="form-item">
                <div class="form-item-lable"><span class="must">*</span>AppSecret:</div>
                <div class="form-item-input">
                    <wj-input v-model="formData.appSecret"></wj-input>
                </div>
            </div>
            <div class="form-item">
                <div class="form-item-lable"><span class="must">*</span>请求方法:</div>
                <div class="form-item-input">
                    <wj-select v-model="formData.option">
                        <wj-option
                            v-for="item in methodArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </wj-option>
                    </wj-select>
                </div>
            </div>
            <div class="form-item">
                <div class="form-item-lable"><span class="must">*</span>请求路径:</div>
                <div class="form-item-input">
                    <wj-input v-model="formData.path"></wj-input>
                </div>
            </div>
            <div class="form-item">
                <div class="form-item-lable">请求体:</div>
                <div class="form-item-input">
                    <wj-input v-model="formData.body" type="textarea" rows="3"></wj-input>
                </div>
            </div>
            <div class="sign-tool-button">
                <wj-button type="primary" class="bg-blue" @click="generateSignature" size="small"
                    >生成签名</wj-button
                >
            </div>
            <div class="form-item">
                <div class="form-item-lable">签名:</div>
                <div class="form-item-input">
                    <wj-input v-model="signName" type="textarea" rows="3"></wj-input>
                </div>
            </div>
            <div class="sign-tool-button">
                <wj-button @click="copy" size="small">复制</wj-button>
            </div>
        </div>
    </div>
</template>

<script>
import throttle from '@/utils/throttle.js';
import { mapGetters } from 'vuex';
import { Button, Input, Select, Option } from '@wenjuan/ui';
import CryptoJS from 'crypto-js/crypto-js';

export default {
    data() {
        return {
            signToolVisible: false,
            formData: {
                appSecret: '',
                option: 'GET',
                path: '',
                body: '',
            },
            signName: '', //签名后生成的字符串
            methodArr: [
                {
                    value: 'GET',
                    label: 'GET',
                },
                {
                    value: 'POST',
                    label: 'POST',
                },
                {
                    value: 'PUT',
                    label: 'PUT',
                },
                {
                    value: 'DELETE',
                    label: 'DELETE',
                },
            ],
        };
    },
    components: {
        'wj-button': Button,
        'wj-input': Input,
        'wj-select': Select,
        'wj-option': Option,
    },
    computed: {
        ...mapGetters(['menu', 'flatMenu', 'pageHeaders']),
    },

    mounted() {
        this.scrollHandle = throttle(this.scrollHandle, 500);
    },

    methods: {
        // 点击复制
        copy() {
            let oInput = document.createElement('input');
            //赋值给文本框
            oInput.value = this.signName;
            document.body.appendChild(oInput);
            // 选择对象;
            oInput.select();
            // 执行浏览器复制命令
            document.execCommand('Copy');
            //复制完成删除掉输入框
            oInput.remove();
            this.$message({
                type: 'success',
                message: '复制成功',
            });
        },
        //   生成签名
        generateSignature() {
            if (this.formData.appSecret === '') {
                this.$message({
                    type: 'info',
                    message: 'AppSecret不能为空',
                });
                return;
            }
            if (this.formData.path === '') {
                this.$message({
                    type: 'info',
                    message: '请求路径不能为空',
                });
                return;
            }
            let queryStr = this.formData.path;

            let pathStr = '';
            let paramStr = '';
            let resultQueryStr = '';
            let pathObj = {};

            if (queryStr.indexOf('http:') > -1 || queryStr.indexOf('https:') > -1) {
                // 路径带有域名
                pathObj = new URL(queryStr);
                pathStr = pathObj.pathname;
                paramStr = pathObj.search.replace('?', '');
            } else {
                if (queryStr.substr(0, 1) === '/') {
                    pathObj = new URL(`http://spsspro.com${queryStr}`);
                    pathStr = pathObj.pathname;
                    paramStr = pathObj.search.replace('?', '');
                } else {
                    pathObj = new URL(['http://spsspro.com', queryStr].join('/'));
                    pathStr = pathObj.pathname.slice(1);
                    paramStr = pathObj.search.replace('?', '');
                }
            }

            console.log('pathObj', pathObj);

            let beforeSort = paramStr.split('&');
            let afterSort = beforeSort.sort();
            resultQueryStr = afterSort.join('&');
            //   let sortedQueryString = `${pathStr}?${resultQueryStr}`

            let signingString = [
                this.formData.option,
                pathStr,
                resultQueryStr,
                this.formData.body,
            ].join('\n');

            let signature = CryptoJS.HmacSHA256(signingString, this.formData.appSecret);
            //   this.signName = CryptoJS.enc.Hex.stringify(signature)
            this.signName = signature.toString();
            console.log('signature', signingString, this.signName);
        },
        // 打开签名工具弹窗
        showSignTool() {
            this.signToolVisible = true;
        },
    },
};
</script>
<style scoped lang="scss">
.sign-tool {
    width: 100vw;
    background: #f6f8fa;
    height: calc(100vh - 64px);
    position: absolute;
    .form-body {
        width: 742px;
        background: #fff;
        margin: 0 auto;
        margin-top: 40px;
        padding: 30px 60px;
        border-radius: 2px;
        .sign-title {
            font-weight: 500;
            text-align: center;
            color: #000000;
            font-size: 32px;
            margin-bottom: 30px;
        }
        .form-item {
            display: flex;
            margin-bottom: 16px;

            .form-item-lable {
                width: 102px;
                height: 38px;
                font-size: 16px;
                font-family: PingFangSC, PingFangSC-Regular;
                font-weight: 400;
                text-align: right;
                line-height: 38px;

                .must {
                    color: #c13e31;
                }
            }

            .form-item-input {
                margin-left: 10px;
                width: calc(100% - 70px);
            }
        }
    }
    .sign-tool-button {
        text-align: right;
        margin-bottom: 16px;
        margin-top: 16px;
    }
}
</style>
