import { login } from '@assets/js/api/user'
import { getToken, setToken, removeToken, getRoles, setRoles, removeRoles, getAuths, setAuths, removeAuths, getUserInfo, setUserInfo, removeUserInfo} from '@assets/js/auth'

const user = {
  state: {
    token: getToken(),
    authorities: [],
    userInfo: getUserInfo(),
    avatar: '',
    roles: getRoles(),
    accesses: getAuths()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ACCESSES: (state, accesses) => {
      state.accesses = accesses
    },
    SET_AUTH: (state, authorities) => {
      if(authorities) {
        authorities = authorities.split(",")
        state.authorities = authorities
      }
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          setToken(data.Authentication)
          setRoles(data.roles)
          setAuths(data.accesses)
          setUserInfo({
            name: username
          })
          commit('SET_USERINFO', {
            name: username
          })
          commit('SET_TOKEN', data.Authentication)
          commit('SET_AUTH', data.authorities)
          commit('SET_ROLES', data.roles)
          commit('SET_ACCESSES', data.accesses)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    // GetInfo({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getInfo(state.token).then(response => {
    //       const data = response.data
    //       if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
    //         commit('SET_ROLES', data.roles)
    //       } else {
    //         reject('getInfo: roles must be a non-null array !')
    //       }
    //       commit('SET_NAME', data.name)
    //       commit('SET_AVATAR', data.avatar)
    //       resolve(response)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    // LogOut({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     logout(state.token).then(() => {
    //       commit('SET_TOKEN', '')
    //       commit('SET_ROLES', [])
    //       removeToken()
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        removeAuths()
        removeRoles()
        removeUserInfo()
        resolve()
      })
    }
  }
}

export default user
