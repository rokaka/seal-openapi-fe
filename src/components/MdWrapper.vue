<template>
    <div class="m-demo-block">
        <div class="demo"><slot></slot></div>
    </div>
</template>

<script>
export default {
    props: {
        data: Object,
        params: {
            type: Object,
            default() {
                return {}
            },
        },
    },
    provide() {
        return {
            filePath: this.params.jsonObj,
        }
    },
}
</script>
