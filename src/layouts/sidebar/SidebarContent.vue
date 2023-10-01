<script setup>
import {useRouter} from 'vue-router'
import SidebarLink from "@/layouts/sidebar/SidebarLink.vue";
import {sidebarState} from "@/composables/index.js";
import {useAppStore} from "@/store/index.js";

const routes = useAppStore().routes

const isCurrentRoute = (routeName) => {
    return useRouter().currentRoute.value.name === routeName
}

const isCurrentPath = (path) => {
    return useRouter().currentRoute.value.path.startsWith(path)
}
</script>

<template>
    <perfect-scrollbar tag="nav" aria-label="main" class="relative max-h-full">
        <ul class="mt-4 px-3 space-y-1">
            <li>
                <SidebarLink title="仪表盘" icon="dashboard" :to="{ name: 'Dashboard' }"
                             :active="isCurrentRoute('Dashboard')" />
            </li>

            <template v-for="(route, index) in routes" :key="index">
                <li v-if="route.children.length > 1">
                    <li>
                        <details class="group [&_summary::-webkit-details-marker]:hidden"
                                 :open="isCurrentPath(route.path)">
                            <SidebarLink summary :title="route.meta.title" :icon="route.meta.icon"
                                         :active="isCurrentPath(route.path)" />
                            <ul class="mt-2 space-y-1 px-3"
                                v-show="sidebarState.isOpen || sidebarState.isHovered">
                                <li v-for="(menu, index) in route.children" :key="index">
                                    <SidebarLink :title="menu.meta.title" :icon="menu.meta.icon"
                                                 :to="{ name: menu.name }"
                                                 :active="isCurrentRoute(menu.name)" />
                                </li>
                            </ul>
                        </details>
                    </li>
                </li>
                <li v-else>
                    <SidebarLink :title="route.meta.title" :icon="route.meta.icon"
                                 :to="{ name: route.name }" :active="isCurrentPath(route.path)" />
                </li>
            </template>
        </ul>
    </perfect-scrollbar>
</template>

