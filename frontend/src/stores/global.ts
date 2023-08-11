import { defineStore } from "pinia"
import { ref } from "vue"

import { Pizza } from '@/types/Global'

export const useGlobalStore = defineStore('global', () => {
    const pizzas = ref<Pizza[]>([])

    function setPizzas(payload: any) {
        pizzas.value = payload
    }

    return {
        pizzas,
        setPizzas
    }
})