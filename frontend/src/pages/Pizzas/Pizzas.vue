<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-xl font-semibold">Pizzas ({{ pizzas.length }})</h1>
                <p class="text-sm text-gray-500">Manage pizzas</p>
            </div>

            <BaseButton icon="iconoir:plus" @click="handleCreate">Create pizza</BaseButton>
        </div>

        <hr>

        <BaseTable :columns="['Name', 'Price', 'Ingredients']" :data="pizzas" @openItem="goToPizza($event)" />
        <APIDocs model="Pizza" :endpoints="apiDoc" />
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, computed } from 'vue'
    import { useQuery } from '@/composables/useAPI'
    import { useGlobalStore } from '@/stores/global'
    import { useRouter } from 'vue-router'

    import BaseButton from '@/components/UI/BaseButton.vue'
    import BaseTable from '@/components/UI/BaseTable.vue'
    import APIDocs from '@/components/APIDocs.vue'

    const router = useRouter()
    const globalStore = useGlobalStore()

    const apiDoc = ref([
        { reqType: 'GET', url: 'http://localhost:3000/pizzas' },
        { reqType: 'DELETE', url: 'http://localhost:3000/pizzas/{id}' },
    ])

    onMounted(async () => {
        const result = await useQuery('http://localhost:3000/pizzas')
    
        globalStore.setPizzas(result.data.pizzas)
    })

    const pizzas = computed(() => {
        return globalStore.pizzas
    })

    function handleCreate() {
        router.push('/pizza/new')
    }

    function goToPizza(id: string) {
        router.push(`/pizza/${id}`)
    }
</script>