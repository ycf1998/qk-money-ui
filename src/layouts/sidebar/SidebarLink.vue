<script setup>
import {sidebarState} from '@/composables'

defineProps({
    summary: {
        type: Boolean,
        required: false,
    },
    href: {
        type: String,
        required: false,
    },
    to: {
        type: [String, Object],
        required: false,
    },
    active: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        default: '',
    },
})
</script>

<template>
    <summary v-if="summary" :class="['flex cursor-pointer px-2 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-100',
        { 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100': active && !sidebarState.isOpen && !sidebarState.isHovered}]">
        <svg-icon :name="icon" />
        <span class="ml-2 text-base font-medium" v-show="sidebarState.isOpen || sidebarState.isHovered">{{ title }}</span>
        <span class="shrink-0 transition duration-300 group-open:-rotate-180 absolute right-4"
              v-show="sidebarState.isOpen || sidebarState.isHovered">
            <svg-icon name="down" />
        </span>
    </summary>

    <a v-else-if="href" :href="href" :class="['flex px-2 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-100',
        { 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100': active}]">
        <svg-icon :name="icon" />
        <span class="ml-2 text-base font-medium" v-show="sidebarState.isOpen || sidebarState.isHovered">{{ title }}</span>
    </a>

    <router-link v-else-if="to" :to="to" :class="['flex px-2 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-100',
        { 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100': active}]">
        <svg-icon :name="icon" />
        <span class="ml-2 text-base font-medium" v-show="sidebarState.isOpen || sidebarState.isHovered">
            {{ title }}
        </span>
    </router-link>
</template>
