import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router"

import inner from '@/layouts/inner.vue'

const OverviewPage = () => import('@/pages/Overview.vue')
const PizzasPage = () => import('@/pages/Pizzas/Pizzas.vue')
const PizzaPage = () => import('@/pages/Pizzas/[id].vue')
const NewPizzaPage = () => import('@/pages/Pizzas/NewPizza.vue')
const IngredientsPage = () => import('@/pages/Ingredients/Ingredients.vue')
const IngredientPage = () => import('@/pages/Ingredients/[id].vue')

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'overview',
        component: OverviewPage,
        meta: {
            layout: inner
        }
    },
    {
        path: '/pizzas',
        name: 'pizzas',
        component: PizzasPage,
        meta: {
            layout: inner
        }
    },
    {
        path: '/pizza/:id',
        name: 'pizza',
        component: PizzaPage,
        meta: {
            layout: inner
        }
    },
    {
        path: '/pizza/new',
        name: 'new pizza',
        component: NewPizzaPage,
        meta: {
            layout: inner
        }
    },
    {
        path: '/ingredients',
        name: 'ingredients',
        component: IngredientsPage,
        meta: {
            layout: inner
        }
    },
    {
        path: '/ingredient/:id',
        name: 'ingredient',
        component: IngredientPage,
        meta: {
            layout: inner
        }
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})