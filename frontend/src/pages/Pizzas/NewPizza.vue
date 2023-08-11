<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-xl font-semibold">New pizza</h1>
                <p class="text-sm text-gray-500">Create new pizza</p>
            </div>

            <BaseButton @click="() => {}">Save</BaseButton>
        </div>

        <hr>

        <BaseInput label="Name" class="w-64" />

        <div class="space-y-2">
            <p class="text-sm">Ingredients</p>

            <div>
                <div class="flex justify-between items-center border p-2 rounded-md">
                    <div class="flex items-center space-x-2">
                        <Icon icon="fluent:re-order-dots-vertical-16-regular" class="cursor-pointer" />
                        <p class="text-sm font-semibold">Mozzarella</p>
                    </div>
                    <p class="text-sm font-medium">1.2$</p>
                </div>
            </div>

            <BaseButton color="secondary" size="xs" icon="iconoir:plus" @click="ingModalOpened = !ingModalOpened">Add ingredient</BaseButton>
        </div>

        <hr>

        <APIDocs model="Pizza" :endpoints="apiDoc" />
    </div>

    <BaseModal
        heading="Ingredients"
        subheading="Select ingredient from list of ingredients or create a new one"
        @close="ingModalOpened = false"
        v-if="ingModalOpened"
    >
        <div class="p-4 space-y-4">
            <div class="bg-gray-100 w-full p-2 max-h-52 rounded-md overflow-auto" v-if="ingredients.length != 0">
                <div class="hover:bg-gray-300 hover:text-white p-1 rounded cursor-pointer" v-for="ingredient in ingredients">
                    <p>{{ ingredient.name }}</p>
                    <p>{{ ingredient.price }}</p>
                </div>
            </div>

            <div class="flex space-x-2" v-if="inputFieldShowed">
                <BaseInput label="Name" class="w-full" />
                <BaseInput label="Price" class="w-20" />
            </div>

            <div class="flex justify-between">
                <BaseButton color="secondary" size="xs" icon="iconoir:plus" @click="inputFieldShowed = true" v-if="!inputFieldShowed">Add new</BaseButton>
                <BaseButton color="secondary" size="xs" icon="iconoir:check" @click="inputFieldShowed = true" v-if="inputFieldShowed">Save</BaseButton>
                <BaseButton color="secondary" size="icon" icon="iconoir:cancel" @click="inputFieldShowed = false" v-if="inputFieldShowed" />
            </div>
        </div>
    </BaseModal>
</template>

<script setup lang="ts">
    import { computed, ref, watchEffect } from 'vue'
    import { Icon } from '@iconify/vue'
    import { useQuery } from '@/composables/useAPI'
    import { useGlobalStore } from '@/stores/global'

    import BaseInput from '@/components/UI/BaseInput.vue'
    import BaseButton from '@/components/UI/BaseButton.vue'
    import BaseModal from '@/components/UI/BaseModal.vue'
    import APIDocs from '@/components/APIDocs.vue'

    const globalStore = useGlobalStore()

    const ingModalOpened = ref(false)
    const inputFieldShowed = ref(false)
    const apiDoc = ref([
        { reqType: 'POST', url: 'http://localhost:3000/pizzas' },
    ])

    watchEffect(async () => {
        if (ingModalOpened.value) {
            const result = await useQuery('http://localhost:3000/ingredients')

            globalStore.setIngredients(result.data.ingredients)
        }
    })

    const ingredients = computed(() => {
        return globalStore.ingredients
    })
</script>