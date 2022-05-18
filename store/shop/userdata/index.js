const headers = {
    "Content-Type": "application/json",
    Access: "application/json",
};


export const state = () => ({
    userDatas: [],
})

export const mutations = {
    SET_USERDATAS(state, payload){
        state.userDatas = payload.data.obj
    }
}

export const getters = {
    getUserDatas: ()=> {
        return state.userDatas;
    }
}

export const actions = {
    async getAll(context, payload) {
        let res = await this.$axios.get(payload.link, {
            headers
        })

        context.commit('SET_USERDATAS', res)
        return res;
    },

    async create(context, payload){
        let res = await this.$axios.post(payload.link, payload.data, { headers }) 
        context.commit('SET_USERDATAS', res)
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

