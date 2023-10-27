<script setup>
import {computed} from "vue";
import {sidebarState} from '@/composables'

const titleShow = computed(() => sidebarState.isOpen || sidebarState.isHovered)

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
    <summary v-if="summary" :class="['relative flex cursor-pointer px-2 py-2.5 rounded-lg text-sm font-medium text-gray-500 ' +
     'hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-100',
        { 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100': active && !sidebarState.isOpen && !sidebarState.isHovered}]">
        <svg-icon dir="open" :name="icon" />
        <span class="ml-2 text-base font-medium" v-show="titleShow">
            {{ title }}
        </span>
        <span v-show="titleShow" class="shrink-0 transition duration-300 group-open:-rotate-180 absolute right-1">
            <svg-icon name="down" />
        </span>
    </summary>

    <a v-else-if="href" :href="href" :class="['flex px-2 py-2.5 rounded-lg text-sm font-medium text-gray-500 ' +
     'hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-100',
        { 'bg-gray-100 text-gray-700 font-semibold dark:bg-gray-700 dark:text-gray-100': active}]">
        <svg-icon dir="open" :name="icon" />
        <span class="ml-2 text-base font-medium" v-show="titleShow">{{ title }}</span>
    </a>

    <router-link v-else-if="to" :to="to" :class="['flex px-2 py-2.5 rounded-lg text-sm  text-gray-500 ' +
     'hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-100',
        { 'bg-gray-100 text-gray-700 font-semibold dark:bg-gray-700 dark:text-gray-100': active}]">
        <svg-icon dir="open" :name="icon" />
        <span class="ml-2 text-base" v-show="titleShow">
            {{ title }}
        </span>
    </router-link>
</template>
