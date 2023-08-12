<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-xl font-semibold">{{ ingredient?.name }} <span class="text-sm text-green-500">({{ ingredient?.price.toFixed(2) }}€)</span></h1>
                <p class="text-sm text-gray-500">Update or delete ingredient</p>
            </div>

            <div class="flex space-x-2">
                <BaseButton @click="updateIngredient">Update</BaseButton>
                <BaseButton color="error" @click="deleteIngredient">Delete</BaseButton>
            </div>
        </div>

        <hr>

        <div class="flex space-x-4">
            <BaseInput label="Name" :value="name" class="w-64" @input="name = $event.target.value" />
            <BaseInput label="Price" :value="price" class="w-20" @input="price = $event.target.value" />
        </div>

        <hr>

        <APIDocs model="Ingredient" :endpoints="apiDoc" />
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { useQuery, useMutation } from '@/composables/useAPI'
    import { useGlobalStore } from '@/stores/global'
    import { APIDoc, Ingredient } from '@/types/Global'

    import BaseButton from '@/components/UI/BaseButton.vue'
    import BaseInput from '@/components/UI/BaseInput.vue'
    import APIDocs from '@/components/APIDocs.vue'

    const router = useRouter()
    const globalStore = useGlobalStore()

    const ingredientId = ref(router.currentRoute.value.params.id)
    const ingredient = ref<Ingredient>()
    const name = ref('')
    const price = ref<any>('')
    const apiDoc = ref<APIDoc[]>([
        { reqType: 'GET', url: 'http://localhost:3000/pizzas/{id}' },
        { reqType: 'PATCH', url: 'http://localhost:3000/pizzas/{id}' },
        { reqType: 'DELETE', url: 'http://localhost:3000/pizzas/{id}' },
    ])

    const result = useQuery(`http://localhost:3000/ingredients/${ingredientId.value}`)
    
    onMounted(async () => {
        result.then((res) => {
            ingredient.value = res.data.ingredients

            name.value = ingredient.value!.name
            price.value = ingredient.value!.price
        })
    })

    async function deleteIngredient() {
        await useMutation(`http://localhost:3000/ingredients/${ingredientId.value}`, 'delete', null)

        globalStore.handleToast('The Ingredient was successfully deleted!')
        router.push('/ingredients')
    }

    async function updateIngredient() {
        if (name.value != '' && price.value != '') {
            await useMutation(`http://localhost:3000/ingredients/${ingredientId.value}`, 'patch', {
                name: name.value,
                price: parseFloat(price.value)
            })

            globalStore.handleToast('The Ingredient was successfully updated!')
            router.push('/ingredients')
        }
    }
</script>