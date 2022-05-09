const headers = {
    "Content-Type": "application/json",
    Access: "application/json",
};


export const state = () => ({
    alternatives: [],
})

export const mutations = {
    SET_ALTERNATIVES(state, payload){
        state.alternatives = payload.data.obj
    }
}

export const getters = {
    getTypes: ()=> {
        return state.alternatives;
    }
}

export const actions = {
   async getAll(context, payload) {

        let res = await this.$axios.get(payload.link, {
            headers
        })
       
        context.commit('SET_ALTERNATIVES', res)
        
        
        return res;
    },

    async create(context, payload){
        let res = await this.$axios.post(payload.link, payload.data, { headers }) 
        context.commit('SET_ALTERNATIVES', res)

        return res;
    },

    async edit(context, payload){
        let res = await this.$axios.put(payload.link + payload.id, payload.data, { headers })
        context.commit('SET_ALTERNATIVES', res)
        
        return res;
    },
    
    async delete(context, payload){
        let res = await this.$axios.delete(payload.link + payload.id, { headers })
        context.commit('SET_ALTERNATIVES', res)

        return res;
    }
}

