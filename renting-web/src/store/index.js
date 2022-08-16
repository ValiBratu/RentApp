import { createStore } from "vuex";

import createPersistedState from "vuex-persistedstate"
import SecureLS from "secure-ls"; 
import postsModule from "./modules/posts-module";
import userModule from "./modules/user-module";
var ls = new SecureLS({ isCompression: false });

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  plugins: [    
    createPersistedState({
        storage: {
          getItem: (key) => ls.get(key),
          setItem: (key, value) => ls.set(key, value),
          removeItem: (key) => ls.remove(key),
        },
    }),
    ],
  modules: {
    postsModule,
    userModule
  }
});
