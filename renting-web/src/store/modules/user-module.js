import axios from "axios"
import {parseJwt} from "../../components/composables/utils.js";
let baseUrl = 'https://localhost:44364/api/';

const state = {
  userData:[]
}
const getters = {
    userData: state => state.userData
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
    }

}
const mutations = {
    setuserData:(state,payload)=>{
        state.userData = {...payload,...parseJwt(payload.token)}
    }
}
export default{
    state,
    getters,
    actions,
    mutations
}