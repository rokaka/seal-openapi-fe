<template>
    <div
        class="w-72 pl-10 text-sm text-text-gray border-r border-gray h-full pt-8"
    >
        <div
            v-for="(menuItem, index) in menu"
            :key="index"
            :class="{
                'mt-3': index !== 0,
                'text-blue': menuItem.name === $route.params.docName,
            }"
            class="cursor-pointer"
            @click="show(menuItem)"
        >
            <template v-if="menuItem.children">
                <span class="relative" @click="openSubItem(menuItem.name)">
                    <i
                        class="wj-icon-caret-bottom absolute top-1/2 transform -translate-y-1/2 -left-5"
                        :class="{
                            '-rotate-90': openSubItemName !== menuItem.name,
                        }"
                    ></i>
                    {{ menuItem.name }}
                </span>
                <ul
                    class="ml-3"
                    :class="{
                        hidden: openSubItemName !== menuItem.name,
                    }"
                >
                    <li
                        v-for="(subMenuItem, subIndex) in menuItem.children"
                        :key="subIndex"
                        class="mt-3"
                        :class="{
                            'text-blue':
                                subMenuItem.name === $route.params.docName,
                        }"
                        @click="show(subMenuItem)"
                    >
                        <template v-if="subMenuItem.children">
                            <span
                                class="relative"
                                @click="openGrandItem(subMenuItem.name)"
                            >
                                <i
                                    class="wj-icon-caret-bottom absolute top-1/2 transform -translate-y-1/2 -left-5"
                                    :class="{
                                        '-rotate-90':
                                            openGrandItemName !==
                                            subMenuItem.name, // 展开的三级菜单名称
                                    }"
                                ></i>
                                {{ subMenuItem.name }}
                            </span>
                            <ul
                                class="ml-3 mt-2"
                                :class="{
                                    hidden:
                                        openGrandItemName !== subMenuItem.name,
                                }"
                            >
                                <li
                                    v-for="(
                                        grandMenuItem, grandIndex
                                    ) in subMenuItem.children"
                                    :key="`${subIndex}-${grandIndex}`"
                                    class="mt-2"
                                    :class="{
                                        'text-blue':
                                            grandMenuItem.name ===
                                            $route.params.docName,
                                    }"
                                    @click="show(grandMenuItem)"
                                >
                                    <template v-if="grandMenuItem.children">
                                        <span
                                            class="relative"
                                            @click="
                                                openGrandSubItem(
                                                    grandMenuItem.name
                                                )
                                            "
                                        >
                                            <i
                                                class="wj-icon-caret-bottom absolute top-1/2 transform -translate-y-1/2 -left-5"
                                                :class="{
                                                    '-rotate-90':
                                                        openGrandSubItemName !==
                                                        grandMenuItem.name, // 展开的三级菜单名称
                                                }"
                                            ></i>
                                            {{ grandMenuItem.name }}
                                        </span>
                                        <ul
                                            class="ml-3 mt-2"
                                            :class="{
                                                hidden:
                                                    openGrandSubItemName !==
                                                    grandMenuItem.name,
                                            }"
                                        >
                                            <li
                                                v-for="(
                                                    grandMenuItem, grandIndex
                                                ) in grandMenuItem.children"
                                                :key="`${subIndex}-${grandIndex}`"
                                                class="mt-2"
                                                :class="{
                                                    'text-blue':
                                                        grandMenuItem.name ===
                                                        $route.params.docName,
                                                }"
                                                @click="show(grandMenuItem)"
                                            >
                                                {{ grandMenuItem.name }}
                                            </li>
                                        </ul>
                                    </template>
                                    <span v-else>
                                        {{ grandMenuItem.name }}</span
                                    >
                                </li>
                            </ul>
                        </template>
                        <span v-else> {{ subMenuItem.name }}</span>
                    </li>
                </ul>
            </template>
            <span v-else> {{ menuItem.name }}</span>
        </div>
    </div>
</template>

<script>
// TODO: 后面可以改为递归渲染的组件
import { mapGetters } from "vuex"
export default {
    data() {
        return {
            openSubItemName: "", //开启的二级菜单
            openGrandItemName: "", // 开启的三级菜单
            openGrandSubItemName: "", // 开启的四级菜单
        }
    },
    computed: {
        ...mapGetters(["menu"]),
    },
    methods: {
        show(menuItem) {
            if (
                !menuItem.children &&
                this.$route.params.docName !== menuItem.name
            ) {
                this.$router.push({
                    name: "DevDoc",
                    params: { docName: menuItem.name },
                })
            }
        },
        openSubItem(name) {
            this.openSubItemName = this.openSubItemName === name ? "" : name
        },
        openGrandItem(name) {
            this.openGrandItemName = this.openGrandItemName === name ? "" : name
        },
        openGrandSubItem(name) {
            this.openGrandSubItemName =
                this.openGrandSubItemName === name ? "" : name
        },
    },
}
</script>
