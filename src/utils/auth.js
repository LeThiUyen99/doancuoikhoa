import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const accountKey = 'Account-info'
const uidKey = 'Account-UID'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUID() {
  return localStorage.getItem(uidKey) ? localStorage.getItem(uidKey) : ''
}

export function setUID(uid) {
  return localStorage.setItem(uidKey, uid)
}
export function removeUID() {
  return localStorage.removeItem(uidKey)
}

export function setAcountInfo(account = {}) {
  Cookies.set(accountKey, account)
}

export function getAcountInfo(account = '{}') {
  const ac = Cookies.get(accountKey)
  console.log('.............. thong tin tk  ', ac)
  return account ? parseJson(ac) : null
}

export function removeAcountInfo() {
  return Cookies.remove(accountKey)
}

export function parseJson(json) {
  try {
    return JSON.parse(json)
  } catch (error) {
    return null
  }
}
