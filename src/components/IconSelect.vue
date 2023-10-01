<script setup>
import {ref} from "vue";
import SvgIcon from "@/components/SvgIcon.vue";

const icon = ref('')
const icons = [
    'app', 'dashboard', 'sys-manage',
    'sys-user', 'sys-role', 'sys-permission',
    'sys-dict', 'sys-tenant',
]
const {defaultIcon} = defineProps(['defaultIcon'])
icon.value = defaultIcon
defineEmits(['selected'])
</script>
<template>
    <el-select v-model="icon" filterable placeholder="请选择图标" @change="() => $emit('selected', icon)">
        <template #prefix>
            <SvgIcon :name="icon" class="w-4 h-4" />
        </template>
        <div class="grid grid-cols-3 px-1">
            <el-option
                v-for="item in icons"
                :key="item"
                :label="item"
                :value="item"
                class="flex items-center gap-1"
            >
                <span><SvgIcon :name="item" class="w-4 h-4" /></span>
                <span>{{ item }}</span>
            </el-option>
        </div>
    </el-select>
</template>
<style scoped>
.el-select-dropdown__item {
    padding: 0 1px;
}
</style>