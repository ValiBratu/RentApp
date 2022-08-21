import axios from "axios"

let baseUrl = 'https://localhost:44364/api/';

const state = {
  rentPosts:[],
  cities:[]
}
const getters = {
    rentPosts: state => state.rentPosts,
    cities:state => state.cities
}
const actions = {
    async fetchRentPosts({commit}){
        try {
            let response = await axios.get(`${baseUrl}RentPost/Photos`)
            let posts = response.data.map(post => {
                return post.rentPost;
              })
            commit('setRentPosts',posts)
            
            return response;
        } catch (error) {
            return error.response;
        }
    },
    async fetchCities({commit}){
        try {
            let response = await axios.get(`${baseUrl}Cities`);
            commit('setCities',response.data);
            return response;
        } catch (error) {
            return error.response;
        }
    },
    async fetchPostsByCity({commit},id){
        try {
            let response = await axios.get(`${baseUrl}RentPost/city/${id}`);
            commit('setRentPosts',response.data)
            return response;
        } catch (error) {
            return error.response;
        }
    },
    async addNewRentPost(_,params){
        try {
            let response = await axios.post(`${baseUrl}RentPost`,params);
            return response;
        } catch (error) {
            return error.response;
        }
    }

}
const mutations = {
    setRentPosts:(state,payload)=>{
        state.rentPosts = payload
    },
    setCities:(state,payload)=>{
        state.cities = payload
    }
}
export default{
    state,
    getters,
    actions,
    mutations
}