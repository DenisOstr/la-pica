<template>
    <div class="w-full px-8 py-5 flex items-center space-x-14 border-b">
        <h1 class="text-lg font-bold italic font-serif">La Pica</h1>

        <nav class="flex space-x-5">
            <RouterLink
                :to="navigation.url"
                class="text-sm text-gray-400 font-medium"
                :class="{
                    '!text-black': navigation.slug == $route.name
                }"
                v-for="navigation in navigations"
            >
                {{ navigation.name }}
            </RouterLink>
        </nav>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'

    const navigations = ref([
        { slug: 'overview', name: 'Overview', url: '/' },
        { slug: 'pizzas', name: 'Pizzas', url: '/pizzas' },
        { slug: 'ingredients', name: 'Ingredients', url: '/ingredients' },
    ])
</script>