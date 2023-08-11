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
                <tr class="hover:bg-gray-100 hover:cursor-pointer" v-for="item in data">
                    <td class="px-4 py-4 text-sm whitespace-nowrap">
                        <div>
                            <h4 class="text-gray-700">{{ item.name }}</h4>
                        </div>
                    </td>

                    <td class="px-4 py-4 text-sm whitespace-nowrap">
                        <div>
                            <h4 class="text-gray-700">{{ item.price }}</h4>
                        </div>
                    </td>

                    <td class="px-4 py-4 text-sm whitespace-nowrap">
                        <div class="flex space-x-2">
                            <h4 class="text-gray-700" v-for="ingredient in JSON.parse(item.ingredients)">{{ ingredient.name }}</h4>
                        </div>
                    </td>

                    <td class="px-4 py-4 text-sm text-right whitespace-nowrap">
                        <button class="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                            </svg>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
    defineProps<{
        columns: string[],
        data: any
    }>()
</script>