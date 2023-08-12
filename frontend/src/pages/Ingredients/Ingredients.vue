<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-xl font-semibold">Ingredients ({{ ingredients.length }})</h1>
                <p class="text-sm text-gray-500">Manage pizzas</p>
            </div>

            <BaseButton icon="iconoir:plus" @click="handleCreate">Create ingredient</BaseButton>
        </div>

        <hr>

        <BaseTable :columns="['Name', 'Price']" :data="ingredients" @openItem="goToIngredient($event)" />
        <APIDocs model="Pizza" :endpoints="apiDoc" />
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue'
    import { useQuery } from '@/composables/useAPI'
    import { useGlobalStore } from '@/stores/global'
    import { useRouter } from 'vue-router'

    import BaseButton from '@/components/UI/BaseButton.vue'
    import BaseTable from '@/components/UI/BaseTable.vue'
    import APIDocs from '@/components/APIDocs.vue'

    const router = useRouter()
    const globalStore = useGlobalStore()

    const apiDoc = ref([
        { reqType: 'GET', url: 'http://localhost:3000/ingredients' },
        { reqType: 'DELETE', url: 'http://localhost:3000/ingredients/{id}' },
    ])

    onMounted(async () => {
        const result = await useQuery('http://localhost:3000/ingredients')

        globalStore.setIngredients(result.data.ingredients)
    })

    const ingredients = computed(() => {
        return globalStore.ingredients
    })

    function handleCreate() {
        router.push('/ingredient/new')
    }

    function goToIngredient(id: string) {
        router.push(`/ingredient/${id}`)
    }
</script>