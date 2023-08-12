<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-xl font-semibold">New ingredient</h1>
                <p class="text-sm text-gray-500">Create new ingredient</p>
            </div>

            <BaseButton @click="saveIngredient">Save</BaseButton>
        </div>

        <hr>

        <div class="flex space-x-4">
            <BaseInput label="Name" :value="name" class="w-64" @input="name = $event.target.value" />
            <BaseInput label="Price" :value="price" class="w-20" @input="price = $event.target.value" />
        </div>

        <hr>

        <APIDocs model="Pizza" :endpoints="apiDoc" />
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { useMutation } from '@/composables/useAPI'
    import { useRouter } from 'vue-router'
    import { useGlobalStore } from '@/stores/global'

    import BaseInput from '@/components/UI/BaseInput.vue'
    import BaseButton from '@/components/UI/BaseButton.vue'
    import APIDocs from '@/components/APIDocs.vue'

    const router = useRouter()
    const globalStore = useGlobalStore()

    const name = ref('')
    const price = ref('')
    const apiDoc = ref([
        { reqType: 'POST', url: 'http://localhost:3000/ingredients' },
    ])

    async function saveIngredient() {
        if (name.value != '' && price.value != '') {
            const result = await useMutation('http://localhost:3000/ingredients', 'post', {
                name: name.value,
                price: parseFloat(price.value)
            })

            globalStore.addIngredient(result.data.ingredients)

            name.value = ''
            price.value = ''

            globalStore.handleToast('The Ingredient was successfully created!')
            router.push('/ingredients')
        }
    }
</script>