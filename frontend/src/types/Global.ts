export interface Navigation {
    slug: string
    name: string
    url: string
}


export interface APIDoc {
    reqType: string
    url: string
}


export interface Pizza {
    name: string
    price: number
    ingredients: Ingredient[]
}


export interface Ingredient {
    name: string
    price: number
}