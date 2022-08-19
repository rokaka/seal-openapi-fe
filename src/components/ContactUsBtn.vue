<template>
    <div>
        <wj-button type="primary" class="bg-blue" @click="visible = true"
            >联系客服</wj-button
        >
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
    data() {
        return {
            visible: false,
        }
    },
    components: {
        "wj-button": Button,
        "wj-dialog": Dialog,
    },
}
</script>
