<template>
    <Transition name="slide-fade">
        <div class="absolute bottom-5 right-5 flex items-center bg-white border border-gray-200 p-2 shadow-md rounded-md space-x-2" v-if="isToastActive">
            <Icon icon="iconoir:check-circle" class="text-lg text-green-500" />
            <p class="text-sm font-medium">{{ globalStore.toastMessage }}</p>
        </div>
    </Transition>
</template>

<script setup lang="ts">
    import { computed, watchEffect } from 'vue'
    import { Icon } from '@iconify/vue'
    import { useGlobalStore } from '@/stores/global'

    const globalStore = useGlobalStore()

    const isToastActive = computed(() => {
        return globalStore.toastShowed
    })

    watchEffect(() => {
        if (isToastActive.value) {
            setTimeout(() => {
                globalStore.closeToast()
            }, 2000)
        }
    })
</script>

<style>
    .slide-fade-enter-active {
        transition: all 0.3s ease-out;
    }

    .slide-fade-leave-active {
        transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .slide-fade-enter-from,
    .slide-fade-leave-to {
        transform: translateX(20px);
        opacity: 0;
    }
</style>