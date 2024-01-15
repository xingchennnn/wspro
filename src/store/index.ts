import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo:{
      username: '' ,
      userpic:'',
      userId:''
    }
  },
  getters: {
    getuserInfo(state){
     console.log(state)
     return state.userInfo
    }
  },
  mutations: {
    setuserInfo(state,data){
      console.log('设置参数=' , state,data)
      localStorage.setItem('userInfo', JSON.stringify(data));
      state.userInfo = data
    },
    inituserInfo(state,data){
      state.userInfo = data
    },
  },
  actions: {
    commituserInfo({commit}, data){
      console.log('commit提交' ,data)
      commit("inituserInfo", data)
   }
  },
  modules: {
  }
})
