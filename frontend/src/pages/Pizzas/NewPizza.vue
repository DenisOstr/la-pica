<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-xl font-semibold">New pizza</h1>
                <p class="text-sm text-gray-500">Create new pizza</p>
            </div>

            <BaseButton @click="savePizza">Save</BaseButton>
        </div>

        <hr>

        <BaseInput label="Name" :value="name" class="w-64" @input="name = $event.target.value" />

        <div class="space-y-2">
            <p class="text-sm">Ingredients</p>

            <draggable
                v-model="pizzaIngredients"
                item-key="id"
                handle=".drag-handle"
                :animation="200"
                class="space-y-2"
            >
                <template #item="{ element }">
                    <div class="flex justify-between items-center border p-2 rounded-md">
                        <div class="flex items-center space-x-2">
                            <Icon icon="fluent:re-order-dots-vertical-16-regular" class="drag-handle cursor-pointer" />
                            <p class="text-sm font-semibold">{{ element.name }}</p>
                        </div>
                        
                        <div class="flex items-center space-x-2">
                            <p class="text-sm font-medium">{{ element.price.toFixed(2) }}€</p>
                            <Icon icon="iconoir:cancel" class="hover:text-red-500 cursor-pointer" @click="deleteIngredient(element)" />
                        </div>
                    </div>
                </template>
            </draggable>

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
            
            <div class="bg-gray-100 w-full p-2 max-h-52 rounded-md overflow-auto space-y-1" v-if="ingredients.length != 0">
                <div
                    class="flex justify-between p-1 rounded cursor-pointer"
                    :class="{
                        'bg-black text-white': ingredientsList.includes(ingredient),
                        'hover:bg-gray-300 hover:text-gray-800': !ingredientsList.includes(ingredient)
                    }"
                    v-for="ingredient in ingredients"
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
    import { computed, ref, watchEffect } from 'vue'
    import { Icon } from '@iconify/vue'
    import draggable from 'vuedraggable'
    import { useQuery, useMutation } from '@/composables/useAPI'
    import { useRouter } from 'vue-router'
    import { useGlobalStore } from '@/stores/global'
    import { APIDoc, Ingredient } from '@/types/Global'

    import BaseInput from '@/components/UI/BaseInput.vue'
    import BaseButton from '@/components/UI/BaseButton.vue'
    import BaseModal from '@/components/UI/BaseModal.vue'
    import APIDocs from '@/components/APIDocs.vue'

    const router = useRouter()
    const globalStore = useGlobalStore()

    const name = ref('')
    const pizzaIngredients = ref<Ingredient[]>([])
    const ingredientsList = ref<Ingredient[]>([])
    const ingModalOpened = ref(false)
    const inputFieldShowed = ref(false)
    const ingredientName = ref('')
    const ingredientPrice = ref('')
    const showExistError = ref(false)
    const apiDoc = ref<APIDoc[]>([
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

    function addIngredientToList(item: Ingredient) {
        const ingredientExist = ingredientsList.value.some((ingredient: Ingredient) => {
            return ingredient.name === item.name
        })

        if (ingredientExist) {
            const ingredientItem = ingredientsList.value.findIndex((ingredient: Ingredient) => {
                return ingredient.name == item.name
            })

            ingredientsList.value.splice(ingredientItem, 1)
        } else {
            ingredientsList.value.push(item)
        }
    }

    function applyIngredients() {
        if (ingredientsList.value.length != 0) {
            for (const ingredient in ingredientsList.value) {
                if (pizzaIngredients.value.indexOf(ingredientsList.value[ingredient]) == -1) {
                    pizzaIngredients.value.push(ingredientsList.value[ingredient])
                } else {
                    showExistError.value = true
                    return
                }
            }
            
            ingModalOpened.value = false
        }
    }

    function deleteIngredient(ingredient: Ingredient) {
        const ingredientItem = pizzaIngredients.value.findIndex((item: Ingredient) => {
            return item.name == ingredient.name
        })

        pizzaIngredients.value.splice(ingredientItem, 1)
    }

    async function savePizza() {
        if (name.value != '' && pizzaIngredients.value.length != 0) {
            const result = await useMutation('http://localhost:3000/pizzas', 'post', {
                name: name.value,
                ingredients: pizzaIngredients.value
            })

            globalStore.addPizza(result.data.pizzas)

            name.value = ''
            pizzaIngredients.value = []
            
            globalStore.handleToast('The Pizza was successfully created!')
            router.push('/pizzas')
        }
    }
</script>