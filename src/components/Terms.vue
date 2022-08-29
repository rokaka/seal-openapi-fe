<template>
    <div class="markdown-container">
        <Terms></Terms>
    </div>
</template>
<script>
import Terms from "@/assets/md/terms.md"
export default {
    components: {
        Terms,
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
