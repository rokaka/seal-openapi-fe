<template>
    <div class="flex-1 px-10">
        <h2 class="text-2xl font-bold mb-4 pt-8">基础信息</h2>
        <div class="text-sm text-text-gray">
            <div class="mb-2">
                应用名称：{{ appDetail.appName }}
                <i
                    @click="visible = true"
                    class="wj-icon-edit text-blue w-4 h-4 ml-2 cursor-pointer"
                ></i>
            </div>

            <div>
                应用ID： {{ appDetail.appId }}
                <i
                    :data-clipboard-text="appDetail.appId"
                    class="wj-icon-copy-document text-blue w-4 h-4 ml-2 cursor-pointer"
                ></i>
            </div>
        </div>

        <h2 class="text-2xl font-bold mb-4 pt-8">应用凭证</h2>
        <div class="text-sm text-text-gray">
            <div class="mb-2">
                AppKey：{{ appDetail.appKey }}
                <i
                    :data-clipboard-text="appDetail.appKey"
                    class="wj-icon-copy-document text-blue w-4 h-4 ml-2 cursor-pointer"
                ></i>
            </div>

            <div>
                AppSecret：
                {{ appDetail.appSecret }}
                <i
                    :data-clipboard-text="appDetail.appSecret"
                    class="wj-icon-copy-document text-blue w-4 h-4 ml-2 cursor-pointer"
                ></i>
            </div>
        </div>
        <h2 class="text-2xl font-bold mb-4 pt-8">版本权限</h2>
        <div class="text-sm text-text-gray">
            <div class="mb-2">当前版本：{{ appDetail.currentVersion }}</div>

            <div class="mb-2">单日成功调用分析次数：{{ appDetail.count }}</div>
            <div class="mb-2">到期时间：{{ appDetail.deadline }}</div>
        </div>

        <p class="flex items-center justify-between text-sm text-text-gray">
            <span style="color: #2b323d">权限列表</span>
            <wj-input
                size="small"
                class="w-56"
                v-model="searchWord"
                placeholder="算法名称"
                prefix-icon="wj-icon-search"
            >
            </wj-input>
        </p>

        <wj-table class="mt-3">
            <wj-table-column
                prop=""
                label="算法类型"
                :filters="filters"
                :filter-multiple="false"
            >
            </wj-table-column>
            <wj-table-column prop="" label="算法名称"> </wj-table-column>
            <wj-table-column prop="" label="限制样本数"> </wj-table-column>
            <wj-table-column prop="" label="限制列数"> </wj-table-column>
            <wj-table-column prop="" label="单次调用费用"> </wj-table-column>
        </wj-table>
        <wj-pagination
            :total="50"
            class="mt-6 float-right"
            layout="prev, pager, next"
        ></wj-pagination>
        <wj-dialog
            custom-class="rename-dialog"
            title="重命名"
            :visible.sync="visible"
            width="420px"
        >
            <wj-form @submit.native.prevent>
                <wj-form-item>
                    <wj-input
                        v-model="renameForm.newName"
                        maxlength="30"
                        show-word-limit
                        placeholder="最多输入30个字符"
                    ></wj-input>
                </wj-form-item>
            </wj-form>

            <span slot="footer" class="dialog-footer">
                <wj-button @click="visible = false">取 消</wj-button>
                <wj-button type="primary" class="bg-blue" @click="rename"
                    >确 定</wj-button
                >
            </span>
        </wj-dialog>
    </div>
</template>
<script>
import {
    Dialog,
    Button,
    Input,
    Form,
    FormItem,
    Table,
    TableColumn,
    Pagination,
} from "@wenjuan/ui"
import Clipboard from "clipboard"

function data() {
    return {
        visible: false,
        renameForm: {
            newName: "",
        },
        clip: null,
        searchWord: "",
        filters: [
            { text: "数据处理", value: "handle" },
            { text: "数据分析", value: "analysis" },
            { text: "业务BI模型", value: "bi" },
        ],
    }
}

export default {
    props: ["appDetail"],
    data,
    mounted() {
        this.initCopy()
    },
    beforeDestroy() {
        this.clip.destroy()
    },
    methods: {
        rename() {
            console.log("rename..." + this.renameForm.newName)
            this.visible = false
        },
        initCopy() {
            this.clip = new Clipboard(".wj-icon-copy-document")
            this.clip.on("success", () => {
                this.$message({
                    type: "success",
                    message: "内容已复制到剪贴板",
                })
            })

            this.clip.on("error", e => {
                this.$message({
                    type: "error",
                    message: "复制失败，[" + e.action + "]",
                })
            })
        },
    },
    components: {
        "wj-button": Button,
        "wj-dialog": Dialog,
        "wj-input": Input,
        "wj-form": Form,
        "wj-form-item": FormItem,
        "wj-table": Table,
        "wj-table-column": TableColumn,
        "wj-pagination": Pagination,
    },
}
</script>
