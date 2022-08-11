import axios from "axios"

let baseUrl = 'https://localhost:44364/api/';

const state = {
  rentPosts:[]
}
const getters = {
    rentPosts: state => state.rentPosts
}
const actions = {
    async fetchRentPosts({commit}){
        try {
            let response = await axios.get(`${baseUrl}RentPost/Photos`)
            commit('setRentPosts',response.data)
            return response;
        } catch (error) {
            return error.response;
        }
    }

}
const mutations = {
    setRentPosts:(state,payload)=>{
        state.rentPosts = payload
    }
}
export default{
    state,
    getters,
    actions,
    mutations
}