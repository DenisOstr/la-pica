import { defineStore } from "pinia"
import { ref } from "vue"

import { Pizza } from '@/types/Global'

export const useGlobalStore = defineStore('global', () => {
    const toastShowed = ref(false)
    const toastMessage = ref('')
    const pizzas = ref<Pizza[]>([])
    const ingredients = ref<any>([])

    function setPizzas(payload: any) {
        pizzas.value = payload
    }

    function addPizza(payload: any) {
        pizzas.value.push(payload)
    }

    function setIngredients(payload: any) {
        ingredients.value = payload
    }

    function addIngredient(payload: any) {
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