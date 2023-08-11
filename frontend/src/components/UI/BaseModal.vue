<template>
    <div class="absolute inset-0 flex justify-center items-center bg-gray-200 bg-opacity-50 z-50 backdrop-blur-sm">
		<div class="max-w-xl w-[26rem] border border-gray-300 bg-white shadow-md rounded-lg">
            <div class="flex p-4">
                <div>
                    <h1 class="text-lg font-medium">{{ heading }}</h1>
                    <p class="text-sm text-gray-500">{{ subheading }}</p>
                </div>
                
                <Icon icon="iconoir:cancel" class="text-2xl hover:bg-gray-100 rounded cursor-pointer" @click="$emit('close')" />
            </div>
			<slot />
			<div class="dark:bg-darkSemiLight p-2 flex justify-end space-x-1 rounded-b-md">
                <BaseButton>Submit</BaseButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
    import { Icon } from '@iconify/vue'

    import BaseButton from './BaseButton.vue'

    defineProps<{
        heading: string,
        subheading: string
    }>()
</script>