import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const accountKey = 'Account-info'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setAcountInfo(account = {}) {
  Cookies.set(accountKey, account)
}

export function getAcountInfo(account = '{}') {
  const ac = Cookies.get(accountKey)
  console.log('.............. thong tin tk  ', ac)
  return account ? parseJson(ac) : null
}

export function parseJson(json) {
  try {
    return JSON.parse(json)
  } catch (error) {
    return null
  }
}
