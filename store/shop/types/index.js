const headers = {
    "Content-Type": "application/json",
    Access: "application/json",
};


export const state = () => ({
    types: [],
})

export const mutations = {
    SET_TYPES(state, payload){
        state.Types = payload.data.obj
    }
}

export const getters = {
    getTypes: ()=> {
        return state.Types;
    }
}

export const actions = {
    async getAll(context, payload) {
        let res = await this.$axios.get(payload.link, {
            headers
        })

        context.commit('SET_TYPES', res)
        
        return res;
    },

    async create(context, payload){



        let res = await this.$axios.post(payload.link, payload.data, { headers }) 
       

        return res;
    },

    async edit(context, payload){
        let res = await this.$axios.put(payload.link + payload.id, payload.data, { headers })
       
        return res;
    },
    
    async delete(context, payload){
        let res =  await this.$axios.delete(payload.link + payload.id, { headers })
        return res;
    }
}

