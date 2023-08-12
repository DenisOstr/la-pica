<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-xl font-semibold">{{ pizza?.name }} <span class="text-sm text-green-500">({{ pizza?.price.toFixed(2) }}€)</span></h1>
                <p class="text-sm text-gray-500">Update or delete pizza</p>
            </div>

            <div class="flex space-x-2">
                <BaseButton @click="updatePizza">Update</BaseButton>
                <BaseButton color="error" @click="deletePizza">Delete</BaseButton>
            </div>
        </div>

        <hr>

        <BaseInput label="Name" :value="name" class="w-64" @input="name = $event.target.value" />

        <div class="space-y-2">
            <p class="text-sm">Ingredients</p>

            <div class="space-y-2">
                <div class="flex justify-between items-center border p-2 rounded-md" v-for="ingredient in ingredients">
                    <div class="flex items-center space-x-2">
                        <Icon icon="fluent:re-order-dots-vertical-16-regular" class="cursor-pointer" />
                        <p class="text-sm font-semibold">{{ ingredient.name }}</p>
                    </div>

                    <div class="flex items-center space-x-2">
                        <p class="text-sm font-medium">{{ ingredient.price.toFixed(2) }}€</p>
                        <Icon icon="iconoir:cancel" class="hover:text-red-500 cursor-pointer" @click="deleteIngredient(ingredient)" />
                    </div>
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
        @submit="applyIngredients"
        v-if="ingModalOpened"
    >
        <div class="p-4 space-y-4">
            <p class="text-sm text-red-500" v-if="showExistError">Ingredient already added to the pizza</p>
            
            <div class="bg-gray-100 w-full p-2 max-h-52 rounded-md overflow-auto space-y-1" v-if="allIngredients.length != 0">
                <div
                    class="flex justify-between p-1 rounded cursor-pointer"
                    :class="{
                        'bg-black text-white': ingredientsList.includes(ingredient),
                        'hover:bg-gray-300 hover:text-gray-800': !ingredientsList.includes(ingredient)
                    }"
                    v-for="ingredient in allIngredients"
                    @click="addIngredientToList(ingredient)"
                >
                    <p class="text-sm font-medium">{{ ingredient.name }}</p>
                    <p class="text-sm">{{ ingredient.price.toFixed(2) }}€</p>
                </div>
            </div>

            <div class="flex space-x-2" v-if="inputFieldShowed">
                <BaseInput label="Name" :value="ingredientName" class="w-full" @input="ingredientName = $event.target.value" />
                <BaseInput label="Price" :value="ingredientPrice" class="w-20" @input="ingredientPrice = $event.target.value" />
            </div>

            <div class="flex justify-between">
                <BaseButton color="secondary" size="xs" icon="iconoir:plus" @click="inputFieldShowed = true" v-if="!inputFieldShowed">Add new</BaseButton>
                <BaseButton color="secondary" size="xs" icon="iconoir:check" @click="saveIngredient" v-if="inputFieldShowed">Save</BaseButton>
                <BaseButton color="secondary" size="icon" icon="iconoir:cancel" @click="inputFieldShowed = false" v-if="inputFieldShowed" />
            </div>
        </div>
    </BaseModal>
</template>

<script setup lang="ts">
    import { ref, computed, watchEffect, onMounted } from 'vue'
    import { Icon } from '@iconify/vue'
    import { useRouter } from 'vue-router'
    import { useQuery, useMutation } from '@/composables/useAPI'
    import { useGlobalStore } from '@/stores/global'

    import BaseButton from '@/components/UI/BaseButton.vue'
    import BaseInput from '@/components/UI/BaseInput.vue'
    import BaseModal from '@/components/UI/BaseModal.vue'
    import APIDocs from '@/components/APIDocs.vue'

    const router = useRouter()
    const globalStore = useGlobalStore()

    const pizzaId = ref(router.currentRoute.value.params.id)
    const pizza = ref<any>()
    const name = ref('')
    const ingredients = ref<any>({})
    const ingModalOpened = ref(false)
    const ingredientsList = ref<any>([])
    const inputFieldShowed = ref(false)
    const ingredientName = ref('')
    const ingredientPrice = ref('')
    const showExistError = ref(false)
    const apiDoc = ref([
        { reqType: 'GET', url: 'http://localhost:3000/pizzas/{id}' },
        { reqType: 'PATCH', url: 'http://localhost:3000/pizzas/{id}' },
        { reqType: 'DELETE', url: 'http://localhost:3000/pizzas/{id}' },
    ])

    const result = useQuery(`http://localhost:3000/pizzas/${pizzaId.value}`)
    
    onMounted(async () => {
        result.then((res) => {
            pizza.value = res.data.pizzas

            name.value = pizza.value.name
            ingredients.value = JSON.parse(pizza.value.ingredients)
        })
    })

    watchEffect(async () => {
        if (ingModalOpened.value) {
            const result = await useQuery('http://localhost:3000/ingredients')

            globalStore.setIngredients(result.data.ingredients)
        }
    })

    const allIngredients = computed(() => {
        return globalStore.ingredients
    })

    async function saveIngredient() {
        if (ingredientName.value != '' && ingredientPrice.value != '') {
            const result = await useMutation('http://localhost:3000/ingredients', 'post', {
                name: ingredientName.value,
                price: parseFloat(ingredientPrice.value)
            })

            globalStore.addIngredient(result.data.ingredients)

            ingredientName.value = ''
            ingredientPrice.value = ''

            inputFieldShowed.value = false
        }
    }

    function addIngredientToList(item: any) {
        const ingredientExist = ingredientsList.value.some((ingredient: any) => {
            return ingredient.name === item.name
        })

        if (ingredientExist) {
            const ingredientItem = ingredientsList.value.findIndex((ingredient: any) => {
                return ingredient.name == item.name
            })

            ingredientsList.value.splice(ingredientItem, 1)
        } else {
            ingredientsList.value.push(item)
        }
    }

    function applyIngredients() {
        if (ingredientsList.value.length != 0) {
            for (const ingredientItem in ingredientsList.value) {
                const ingredientExist = ingredients.value.some((ingredient: any) => {
                    return ingredient.name === ingredientsList.value[ingredientItem].name
                })

                if (!ingredientExist) {
                    ingredients.value.push(ingredientsList.value[ingredientItem])
                } else {
                    showExistError.value = true
                    return
                }
            }
            
            ingModalOpened.value = false
        }
    }

    function deleteIngredient(ingredient: any) {
        const ingredientItem = ingredients.value.findIndex((item: any) => {
            return item.name == ingredient.name
        })

        ingredients.value.splice(ingredientItem, 1)
    }

    async function deletePizza() {
        await useMutation(`http://localhost:3000/pizzas/${pizzaId.value}`, 'delete', null)

        router.push('/pizzas')
    }

    async function updatePizza() {
        if (name.value != '' && ingredients.value.length != 0) {
            await useMutation(`http://localhost:3000/pizzas/${pizzaId.value}`, 'patch', {
                name: name.value,
                ingredients: ingredients.value
            })

            router.push('/pizzas')
        }
    }
</script>