<template>
    <div class="flex-1 px-10 overflow-y-auto">
        <h2 class="text-2xl font-bold mb-4 pt-8">基础信息</h2>
        <div class="text-sm text-text-gray">
            <div class="mb-2">
                应用名称：{{ appDetail.app_name }}
                <i
                    @click="visible = true"
                    class="wj-icon-edit text-blue w-4 h-4 ml-2 cursor-pointer"
                ></i>
            </div>

            <div>
                应用ID： {{ appDetail.app_id }}
                <i
                    :data-clipboard-text="appDetail.app_id"
                    class="wj-icon-copy-document text-blue w-4 h-4 ml-2 cursor-pointer"
                ></i>
            </div>
        </div>

        <h2 class="text-2xl font-bold mb-4 pt-8">应用凭证</h2>
        <div class="text-sm text-text-gray">
            <div class="mb-2">
                AppKey：{{ appDetail.app_key }}
                <i
                    :data-clipboard-text="appDetail.app_key"
                    class="wj-icon-copy-document text-blue w-4 h-4 ml-2 cursor-pointer"
                ></i>
            </div>

            <div>
                AppSecret：
                {{ appDetail.app_secret }}
                <i
                    :data-clipboard-text="appDetail.app_secret"
                    class="wj-icon-copy-document text-blue w-4 h-4 ml-2 cursor-pointer"
                ></i>
            </div>
        </div>
        <h2 class="text-2xl font-bold mb-4 pt-8">版本权限</h2>
        <div class="text-sm text-text-gray">
            <div class="mb-2">当前版本：{{ appDetail.edition }}</div>

            <div class="mb-2">
                单日成功调用分析次数：{{ calls_today }} /
                {{ max_calls_per_day }}
            </div>
            <div class="mb-2">到期时间：{{ appDetail.edition_expire_at }}</div>
        </div>

        <p class="flex items-center justify-between text-sm text-text-gray">
            <span style="color: #2b323d">权限列表</span>
            <wj-input
                size="small"
                class="w-56"
                v-model="filterName"
                placeholder="算法名称"
                prefix-icon="wj-icon-search"
                @keypress.native.enter="getQuota(1, filterType, filterName)"
            >
            </wj-input>
        </p>

        <wj-table
            class="mt-3"
            :data="algorithmQuotaList"
            @filter-change="filterChange"
            v-loading="loading"
            element-loading-text="加载中..."
            element-loading-spinner="wj-icon-loading-rota"
        >
            <wj-table-column
                prop="algorithm_type"
                label="算法类型"
                column-key="algorithm_type"
                :filters="filters"
                :filter-multiple="false"
            >
            </wj-table-column>
            <wj-table-column prop="algorithm_name" label="算法名称">
            </wj-table-column>
            <wj-table-column prop="max_rows" label="限制样本数">
            </wj-table-column>
            <wj-table-column prop="max_columns" label="限制列数">
            </wj-table-column>
            <wj-table-column prop="cost" label="单次调用费用">
            </wj-table-column>
        </wj-table>
        <wj-pagination
            :total="quotaTotal"
            @current-change="getQuota(...arguments, filterType, filterName)"
            :page-size="10"
            class="mt-6 float-right"
            layout="prev, pager, next"
        ></wj-pagination>
        <wj-dialog
            custom-class="rename-dialog"
            title="重命名"
            :visible.sync="visible"
            width="420px"
        >
            <wj-form
                @submit.native.prevent
                ref="renameForm"
                :model="renameForm"
            >
                <wj-form-item
                    :rules="[
                        {
                            required: true,
                            message: '请输入应用名称',
                            trigger: 'blur',
                        },
                    ]"
                >
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
import {
    renameApp,
    fetchAlgorithmUsage,
    fetchAlgorithmQuotao,
} from "@/http/app"

function data() {
    return {
        visible: false,
        renameForm: {
            newName: this.appDetail.app_name,
        },
        clip: null,
        calls_today: "",
        max_calls_per_day: "",
        filters: [
            { text: "数据处理", value: "数据处理" },
            { text: "数据分析", value: "数据分析" },
            { text: "业务BI模型", value: "业务BI模型" },
        ],
        algorithmQuotaList: [],
        filterType: "",
        filterName: "",
        quotaTotal: 0,
        loading: false,
    }
}

export default {
    props: ["appDetail"],
    data,
    mounted() {
        this.initCopy() // 初始化copy
        this.getUsage() // 获取每日限额和用量
        this.getQuota() // 获取算法配额
    },
    beforeDestroy() {
        this.clip.destroy() // 销毁copy示例
    },
    methods: {
        filterChange(val) {
            this.filterType = val.algorithm_type[0]
            this.getQuota(1, this.filterType, this.filterName)
        },
        async getUsage() {
            const { app_id } = this.appDetail

            const {
                data: { calls_today, max_calls_per_day },
            } = await fetchAlgorithmUsage(app_id)

            this.calls_today = calls_today
            this.max_calls_per_day = max_calls_per_day
        },
        async getQuota(pageNum = 1, algorithm_type = "", algorithm_name = "") {
            if (this.isloading) return
            this.loading = true

            const { app_id } = this.appDetail
            try {
                const res = await fetchAlgorithmQuotao(app_id, {
                    size: 10,
                    current: pageNum - 1, //the current is base on 0
                    algorithm_type,
                    algorithm_name,
                })

                this.algorithmQuotaList = res.data
                this.quotaTotal = res.total
            } finally {
                this.loading = false
            }
        },
        rename() {
            this.$refs["renameForm"].validate(async valid => {
                if (valid) {
                    const { app_id } = this.appDetail
                    const { newName } = this.renameForm
                    await renameApp(app_id, newName)
                    this.$emit("refresh")
                }
            })
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
