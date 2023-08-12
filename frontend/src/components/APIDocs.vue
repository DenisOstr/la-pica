<template>
    <div class="space-y-4 pt-10">
        <div class="space-y-1">
            <h1 class="text-lg font-bold">API</h1>
            <p class="text-sm text-gray-500">API calls for {{ model }}</p>
        </div>

        <hr>

        <div class="border border-gray-300 p-2 rounded-md space-x-6 space-y-5" v-for="endpoint in endpoints">
            <div class="flex items-center space-x-2">
                <Icon icon="iconoir:server" />
                <h1 class="text-sm font-medium">{{ endpoint.reqType }}</h1>
                <span class="bg-gray-200 px-3 py-px text-sm font-medium rounded">Public</span>
            </div>

            <div class="flex items-center justify-between">
                <p class="bg-gray-200 w-fit px-2 py-1 text-xs font-medium rounded">{{ endpoint.url }}</p>

                <BaseButton color="secondary" size="icon" icon="iconoir:copy" @click="copyUrl(endpoint.url)" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Icon } from '@iconify/vue'
    import { useGlobalStore } from '@/stores/global'

    import BaseButton from './UI/BaseButton.vue'

    defineProps<{
        model: string
        endpoints: any
    }>()

    const globalStore = useGlobalStore()

    function copyUrl(url: string) {
        navigator.clipboard.writeText(url)

        globalStore.handleToast('Copied successfully!')
    }
</script>