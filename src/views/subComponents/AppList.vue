<template>
    <div class="w-72 text-sm text-text-gray border-r border-gray h-full">
        <div
            style="height: 70px"
            class="font-sans flex justify-between items-center text-base font-bold px-6"
        >
            <span>全部应用</span>
            <i class="wj-icon-plus cursor-pointer"></i>
        </div>
        <ul class="overflow-auto" style="height: calc(100% - 70px)">
            <li
                v-for="(app, index) in appList"
                :key="app.appId"
                class="cursor-pointer h-10 leading-10 truncate px-6"
                :class="{ active: currentApp === index }"
                :title="app.appName"
                @click="$emit('update:currentApp', index)"
            >
                {{ app.appName }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ["appList", "currentApp"],
}
</script>

<style lang="scss" scoped>
li.active {
    color: #2672ff;
    background-color: rgba(26, 120, 255, 0.1);
}
</style>
