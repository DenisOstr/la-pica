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

        <div class="space-y-2">
            <p class="text-sm">Name</p>
            <input type="text" class="border p-1.5 rounded-md outline-offset-2 outline-2 focus:border-gray-400 focus:outline-black focus:outline-dashed">
        </div>

        <div class="space-y-2">
            <p>Ingredients</p>

            <div>
                <div class="flex justify-between items-center border p-2 rounded-md">
                    <div class="flex items-center space-x-2">
                        <Icon icon="fluent:re-order-dots-vertical-16-regular" class="cursor-pointer" />
                        <p class="text-sm font-semibold">Mozzarella</p>
                    </div>
                    <p class="text-sm font-medium">1.2$</p>
                </div>
            </div>
        </div>

        <hr>

        <APIDocs model="Pizza" :endpoints="apiDoc" />
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { Icon } from '@iconify/vue'

    import BaseButton from '@/components/UI/BaseButton.vue'
    import APIDocs from '@/components/APIDocs.vue'

    const apiDoc = ref([
        { reqType: 'POST', url: 'http://localhost:3000/pizzas' },
    ])
</script>