import { defineStore } from "pinia"
import { ref } from "vue"

import { Ingredient, Pizza } from '@/types/Global'

export const useGlobalStore = defineStore('global', () => {
    const toastShowed = ref(false)
    const toastMessage = ref('')
    const pizzas = ref<Pizza[]>([])
    const ingredients = ref<Ingredient[]>([])

    function setPizzas(payload: Pizza[]) {
        pizzas.value = payload
    }

    function addPizza(payload: Pizza) {
        pizzas.value.push(payload)
    }

    function setIngredients(payload: Ingredient[]) {
        ingredients.value = payload
    }

    function addIngredient(payload: Ingredient) {
        ingredients.value.push(payload)
    }

    function handleToast(message: string) {
        toastShowed.value = true
        toastMessage.value = message
    }

    function closeToast() {
        toastShowed.value = false
        toastMessage.value = ''
    }

    return {
        toastShowed,
        toastMessage,
        pizzas,
        ingredients,
        setPizzas,
        addPizza,
        setIngredients,
        addIngredient,
        handleToast,
        closeToast
    }
})