interface Ingredient {
    name: string;
    price: number;
}

export function calcTotalPrice(ingredients: Ingredient[]) {
    let totalPrice = 0

    ingredients.forEach(ingredient => {
      totalPrice += ingredient.price
    })

    totalPrice = (totalPrice * 0.5) + totalPrice

    return totalPrice
}