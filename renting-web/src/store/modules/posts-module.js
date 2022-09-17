import axios from "axios"

let baseUrl = 'https://localhost:44364/api/';

const state = {
  rentPosts:[],
  cities:[],
  postDetails:{}
}
const getters = {
    rentPosts: state => state.rentPosts,
    cities:state => state.cities,
    postDetails:state=>state.postDetails
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
    },
    async fetchPostDetails({commit},params){
        try {
            let response = await axios.get(`${baseUrl}RentPost/${params.id}/Details`)
            commit('setPostDetails',response.data);
            return response;
        } catch (error) {
            return error.response;
        }
    },
    async fetchPostPhotos(_,params){
        try {
            let response = await axios.get(`${baseUrl}RentPostPhotos/post/${params.id}`);
            return response;
        } catch (error) {
            return error.response;
        }
    },
    async addPostPhoto(_,params){
        try {
            let response = await axios.post(`${baseUrl}RentPostPhotos`,params);
            return response
        } catch (error) {
            return error.response;
        }
    },
    async editPostDetails({commit},params){
        try {
            let response = await axios.put(`${baseUrl}RentPost/${params.postId}`,params);
            commit('setPostDetails',response.data);
            return response;
        } catch (error) {
            return error.response;
        }
    },
    async addPostToFavorites(_,params){
        try{
            let response = await axios.post(`${baseUrl}UserFavorites`,params)
            return response;
        }catch(error){
            return error.response;
        }
    },
    async removePostFromFavorites(_,params){
        try {
            let response = await axios.delete(`${baseUrl}UserFavorites/${params.userId}/post/${params.postId}`);
            return response;
        } catch (error) {
            return error.reponse;
        }
    }


}
const mutations = {
    setRentPosts:(state,payload)=>{
        state.rentPosts = payload
    },
    setCities:(state,payload)=>{
        state.cities = payload
    },
    setPostDetails:(state,payload)=>{
        state.postDetails = payload;
    }
}
export default{
    state,
    getters,
    actions,
    mutations
}