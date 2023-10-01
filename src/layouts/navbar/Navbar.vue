<script setup>
import {onMounted, onUnmounted} from 'vue'
import {useUserStore} from "@/store";
import {useFullscreen} from '@vueuse/core'
import {handleScroll, isDark, scrolling, sidebarState, toggleDarkMode,} from '@/composables'
import {getOssUrl} from "@/money.config.js";
import Logo from '@/layouts/Logo.vue'

const avatar = getOssUrl(useUserStore().info.avatar)
const {isFullscreen, toggle: toggleFullScreen} = useFullscreen()

onMounted(() => {
    document.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    document.removeEventListener('scroll', handleScroll)
})

function logout() {
    useUserStore().logout()
}
</script>

<template>
    <!-- PC nav -->
    <nav aria-label="secondary" :class="[
        'sticky bg-base-100 top-0 z-10 px-6 py-3 flex items-center justify-between border-b border-gray-200 transition-transform duration-500 dark:border-gray-600',
        {
            '-translate-y-full': scrolling.down,
            'translate-y-0': scrolling.up,
        },
    ]">
        <div class="flex items-center gap-2">
            <a href="javascript:void(0)" class="px-2 md:hidden" @click="toggleDarkMode()">
                <svg-icon name="moon" v-show="!isDark" />
                <svg-icon name="sun" v-show="isDark" />
            </a>
        </div>

        <div class="flex items-center gap-2">
            <a href="javascript:void(0)" class="hidden md:inline-flex" @click="toggleDarkMode()">
                <svg-icon name="moon" v-show="!isDark" />
                <svg-icon name="sun" v-show="isDark" />
            </a>

            <a href="javascript:void(0)" class="px-2 hidden md:inline-flex" @click="toggleFullScreen()">
                <svg-icon name="arrow-expand-all" v-show="!isFullscreen" />
                <svg-icon name="arrow-collapse-all" v-show="isFullscreen" />
            </a>


            <el-dropdown>
                <div class="w-8 rounded cursor-pointer">
                    <el-avatar :src="avatar" shape="square"  />
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>
                            <router-link :to="{name: 'Personal'}">个人中心</router-link>
                        </el-dropdown-item>
                        <el-dropdown-item @click="logout">登出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </nav>

    <!-- Mobile bottom bar -->
    <nav :class="[
        'fixed bg-base-100 bottom-0 z-10 px-4 py-4 sm:px-6 inset-x-0 flex items-center justify-between transition-transform duration-500 md:hidden',
        {
            'translate-y-full': scrolling.down,
            'translate-y-0': scrolling.up,
        },
    ]">
        <label class="swap">
            <svg-icon name="search" />
        </label>

        <router-link to="">
            <Logo class="w-10 h-10" />
            <span class="sr-only">Money</span>
        </router-link>

        <label class="swap" @click="sidebarState.isOpen = !sidebarState.isOpen">
            <svg-icon name="menu" v-show="!sidebarState.isOpen" />
            <svg-icon name="window-close" v-show="sidebarState.isOpen" class="w-6 h-6" />
        </label>
    </nav>
</template>
