<template>
    <div class="flex flex-col flex-grow h-screen">
        <TheHeader />

        <div class="h-full p-8 overflow-auto">
            <RouterView />
        </div>
    </div>

    <Toast />
</template>

<script setup lang="ts">
    import TheHeader from '@/components/TheHeader.vue'
    import Toast from '@/components/UI/Toast.vue'
</script>