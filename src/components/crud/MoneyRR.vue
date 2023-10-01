<template>
    <div class="flex flex-col md:flex-row" :class="{'hidden': !moneyCrud.optShow.moneyRR}">
        <div class="grid md:grid-flow-col md:auto-cols-max gap-3">
            <slot />
        </div>
        <div class="mt-3 md:ml-3 md:mt-0">
            <slot name="opt">
                <el-button plain type="success" @click="moneyCrud.doQuery">搜索</el-button>
                <el-button plain type="warning" @click="moneyCrud.reset">重置</el-button>
            </slot>
        </div>
    </div>
</template>

<script setup>
import MoneyCrud from "@/components/crud/MoneyCrud.js";

defineProps({
    moneyCrud: {
        required: true,
        type: MoneyCrud
    }
})
</script>