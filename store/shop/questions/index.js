const headers = {
    "Content-Type": "application/json",
    Access: "application/json",
};


export const state = () => ({
    questions: [],
})

export const mutations = {
    SET_QUESTIONS(state, payload){
        state.questions = payload.data.obj
    }
}

export const getters = {
    getTypes: ()=> {
        return state.questions;
    }
}

export const actions = {
    async getAll(context, payload) {
        let res = await this.$axios.get(payload.link, {
            headers
        })
        context.commit('SET_QUESTIONS', res)
        
        return res;
    },

    async create(context, payload){
        let res = await this.$axios.post(payload.link, payload.data, { headers }) 
        context.commit('SET_QUESTIONS', res)

        return res;
    },

    async edit(context, payload){
        let res = await this.$axios.put(payload.link + payload.id, payload.data, { headers })
       
        return res;
    },
    
    async delete(context, payload){
        let res = await this.$axios.delete(payload.link + payload.id, { headers })
        return res;
    }
}

