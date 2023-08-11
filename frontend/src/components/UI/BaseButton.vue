<template>
    <button
        class="flex items-center bg-black text-white text-sm font-medium px-3 py-2 rounded-md hover:bg-opacity-80 space-x-1"
    >
        <Icon :icon="icon" class="text-xl" v-if="icon" />
        <p><slot /></p>
    </button>
</template>

<script setup lang="ts">
    import { Icon } from '@iconify/vue'

    defineProps<{
        icon?: string
    }>()
</script>