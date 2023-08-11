<template>
    <div class="flex flex-col space-y-2">
        <label for="" class="text-sm">{{ label }}</label>
        <input type="text" :value="value" @input="$emit('input', $event)" class="border p-1.5 rounded-md outline-offset-2 outline-2 focus:border-gray-400 focus:outline-black focus:outline-dashed">
    </div>
</template>

<script setup lang="ts">
    withDefaults(defineProps<{
        label: string
        type?: string
        value: string
    }>(), {
        type: 'text'
    })

    defineEmits(['input'])
</script>