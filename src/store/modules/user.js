import { loginUser, getMenu } from '@/api/user'
import { getToken, setToken, removeToken, setAcountInfo, setUID } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import md5 from 'js-md5'
import { Message } from 'element-ui'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: {},
  accountID: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ACCOUNT_ID: (state, accountID) => {
    state.accountID = accountID
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = Object.assign({}, introduction)
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      loginUser({ username: username.trim(), password: md5(password), grant_type: 'password' }).then(response => {
        // console.log(response, '---------------')
        const { data, error_code, error_msg } = response
        if (error_code === 0) {
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          setAcountInfo(data.account)
          setUID(data.account.id)
          resolve()
        } else {
          console.log(error_msg)
          Message.error(error_msg)
          reject(error_msg)
        }
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getMenu().then(response => {
        const arrayRoles = []
        if (response.error === 0) {
          const menus = response.menu
          // console.log('........................menu : ', JSON.stringify(menus))
          const account = response.account
          commit('SET_NAME', account.name)
          commit('SET_AVATAR', 'https://s3.kstorage.vn/public/default-user.png')
          commit('SET_INTRODUCTION', account)
          commit('SET_ACCOUNT_ID', account.id)
          setAcountInfo(account)
          menus.map(menu => {
            const stringPath = menu.path.replace('/', '')
            arrayRoles.push(stringPath)
          })
        }
        const data = {
          roles: arrayRoles
        }
        const { roles } = data
        commit('SET_ROLES', roles)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state, dispatch }) {
    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
    removeToken()
    resetRouter()
    dispatch('tagsView/delAllViews', null, { root: true })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // console.log('......................accessRoutes ', accessRoutes)
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
