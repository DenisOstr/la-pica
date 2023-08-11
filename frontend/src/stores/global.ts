import { defineStore } from "pinia"
import { ref } from "vue"

import { Pizza } from '@/types/Global'

export const useGlobalStore = defineStore('global', () => {
    const pizzas = ref<Pizza[]>([])
    const ingredients = ref<any>([])

    function setPizzas(payload: any) {
        pizzas.value = payload
    }

    function setIngredients(payload: any) {
        ingredients.value = payload
    }

    return {
        pizzas,
        ingredients,
        setPizzas,
        setIngredients
    }
})