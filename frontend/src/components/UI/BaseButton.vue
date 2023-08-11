<template>
    <button
        class="flex items-center text-sm font-medium rounded-md"
        :class="{
            'space-x-1': size != 'icon',
            'bg-black text-white hover:bg-opacity-80': color == 'primary',
            'border border-gray-300 hover:bg-gray-100': color == 'secondary',
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