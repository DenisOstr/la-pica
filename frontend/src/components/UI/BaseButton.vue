<template>
    <button
        class="text-sm font-medium rounded-md"
        :class="{
            'flex items-center': color != 'ternary',
            'space-x-1': size != 'icon',
            'bg-black text-white hover:bg-opacity-80': color == 'primary',
            'border border-gray-300 hover:bg-gray-100': color == 'secondary',
            'text-gray-500 transition-colors duration-200 rounded-lg hover:bg-gray-200': color == 'ternary',
            'bg-red-500 text-white hover:bg-opacity-80': color == 'error',
            'px-3 py-2': size == 'sm', 'px-3 py-1': size == 'xs', 'p-1': size == 'icon'
        }"
    >
        <Icon :icon="icon" class="text-xl" v-if="icon" />
        <p><slot /></p>
    </button>
</template>

<script setup lang="ts">
    import { Icon } from '@iconify/vue'

    withDefaults(defineProps<{
        color?: string
        size?: string
        icon?: string
    }>(), {
        size: 'sm',
        color: 'primary'
    })
</script>