<template>
    <div class="overflow-hidden border border-gray-300 md:rounded-lg">
        <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
                <tr>
                    <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left text-gray-500" v-for="col in columns">{{ col }}</th>

                    <th scope="col" class="relative py-3.5 px-4">
                        <span class="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                <tr class="hover:bg-gray-100 hover:cursor-pointer" v-for="item in data" @click="$emit('openItem', item.id)">
                    <td class="px-4 py-4 text-sm whitespace-nowrap">
                        <div>
                            <h4 class="text-gray-700">{{ item.name }}</h4>
                        </div>
                    </td>

                    <td class="px-4 py-4 text-sm whitespace-nowrap">
                        <div>
                            <h4 class="text-gray-700">{{ item.price.toFixed(2) }}€</h4>
                        </div>
                    </td>

                    <td class="px-4 py-4 text-sm whitespace-nowrap" v-if="item.hasOwnProperty('ingredients')">
                        <div class="flex space-x-2">
                            <h4 class="bg-gray-200 px-1 text-gray-700 text-xs rounded" v-for="ingredient in JSON.parse(item.ingredients)">{{ ingredient.name }}</h4>
                        </div>
                    </td>

                    <td class="px-4 py-4 text-sm text-right whitespace-nowrap">
                        <BaseButton color="ternary" size="icon" icon="fluent:more-vertical-20-regular" @click="isOptionsOpened = !isOptionsOpened" />

                        <div class="text-left absolute right-12 top-[300px] bg-white w-40 min-w-40 p-1 shadow-md rounded-md" v-if="isOptionsOpened">
                            <div class="flex items-center p-2 hover:bg-gray-200 rounded-md space-x-2">
                                <Icon icon="iconoir:edit-pencil" class="text-base" />
                                <p>Edit</p>
                            </div>
                            
                            <div class="flex items-center p-2 text-red-500 hover:bg-gray-200 rounded-md space-x-2">
                                <Icon icon="iconoir:trash" class="text-base" />
                                <p>Delete</p>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="text-center font-semibold p-2" v-if="data.length == 0">Data not found</div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { Icon } from '@iconify/vue'

    import BaseButton from './BaseButton.vue'

    defineProps<{
        columns: string[],
        data: any
    }>()

    const isOptionsOpened = ref(false)
</script>