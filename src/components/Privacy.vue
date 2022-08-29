<template>
    <div class="markdown-container">
        <Privacy></Privacy>
    </div>
</template>
<script>
import Privacy from "@/assets/md/privacy.md"
export default {
    components: {
        Privacy,
    },
}
</script>

<style scoped>
.markdown-container {
    max-width: 960px;
    margin: 0 auto;
    padding: 60px 30px;
    box-sizing: content-box;
    text-align: left;
}
</style>
