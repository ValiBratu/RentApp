import axios from "axios"
import {parseJwt} from "../../components/composables/utils.js";
let baseUrl = 'https://localhost:44364/api/';

const state = {
  userData:[],
  userProfileDetails:{},
  userPosts:[],
  userFavorites:[]
}
const getters = {
    userData: state => state.userData,
    userProfileDetails:state => state.userProfileDetails,
    userPosts:state=>state.userPosts,
    userFavorites:state=>state.userFavorites
}
const actions = {
    async registeruser(_,params) {
        try {
            let response = await axios.post(`${baseUrl}Authenticate/register`,params);
            return response;
        } catch (error) {
            return error.response;
        }
    },
    async authenticateUser({commit},params){
        try {
            let response = await axios.post(`${baseUrl}Authenticate/login`,params);
            commit('setuserData',response.data);
            return response;
        } catch (error) {
            return error.response;
        }
    },
    async fetchUserProfileDetails({commit},params){
        try {
            let response = await axios.get(`${baseUrl}User/${params.id}`)
            commit('setUserProfileDetails',response.data)
            return response;
        } catch (error) {
            return error.response;
        }
    },
    async fetchUserPosts({commit},params){
        try {
            let response = await axios.get(`${baseUrl}User/${params.id}/rent-posts`);
            commit('setUserPosts',response.data);
            return response
        } catch (error) {
            return error.response;
        }
    },
    async fetchUserFavorites({commit},params){
        try {
            let response = await axios.get(`${baseUrl}UserFavorites/${params.id}`)
            commit('setUserFavorites',response.data);
            return response;
        } catch (error) {
            return error.response;
        }
    },
    async putUserPhoto(_,params){
        try {
            let response = await axios.put(`${baseUrl}UserPhoto/${params.UserId}`,params)
            return response;
        } catch (error) {
            return error.response;
        }
    },
    async postUserPhoto(_,params){
        try {
            let response = await axios.post(`${baseUrl}UserPhoto`,params)
            return response;
        } catch (error) {
            return error.response;
        }
    },
    async editUserData(_,params){
        try {
            let response = await axios.put(`${baseUrl}User/${params.UserId}`,params);
            return response;
        } catch (error) {
            return error.response;
        }
    }

}
const mutations = {
    setuserData:(state,payload)=>{
        state.userData = {...payload,...parseJwt(payload.token)}
    },
    setUserProfileDetails:(state,payload)=>{
        state.userProfileDetails = payload;
    },
    setUserPosts:(state,payload)=>{
        state.userPosts = payload;
    },
    setUserFavorites:(state,payload)=>{
        state.userFavorites = payload;
    }
}
export default{
    state,
    getters,
    actions,
    mutations
}