export const state = () => ({
    products: [],
})

export const mutations = {
    addFruit(state, fruit) {
        state.products.push(fruit)
    },
    removeFruit(state, fruitId) {
        state.products = state.products.filter((fruit) => fruit.id !== fruitId)
    },
}

export const actions = {
    addFruit(context, fruit) {
        const slicedFruit = sliceFruit(fruit)
        context.commit(slicedFruit)
    },
}

export const getters = {
    getApples: (state) => {
        return state.products.filter((fruit) => fruit.type === 'Iphone')
    },
}