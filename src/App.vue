<template>
    <div id="app" class="font-sans">
        <Header />

        <router-view></router-view>
    </div>
</template>

<script>
import Header from "./components/Header.vue"
export default {
    components: {
        Header,
    },
}
</script>
