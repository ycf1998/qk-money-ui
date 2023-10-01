<script setup>
defineProps({
    title: String,
})
</script>

<template>
    <!-- Page Content -->
    <main class="flex-1" :class="{ 'mt-4': !$slots.header }">
        <div class="grid gap-6 px-4 sm:px-6">
            <slot />
        </div>
    </main>
</template>
