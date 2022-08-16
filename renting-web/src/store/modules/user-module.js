import axios from "axios"

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
    }

}
const mutations = {
    setuserData:(state,payload)=>{
        state.userData = payload
    }
}
export default{
    state,
    getters,
    actions,
    mutations
}