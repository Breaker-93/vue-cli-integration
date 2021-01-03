const TokenKey = 'token'
const sidebarStatusKey = 'sidebarStatus'
const RoleKey = 'roles'
const AuthKey = 'auths'
const infoKey = 'userInfo'

export function getUserInfo() {
  let arrayJson = localStorage.getItem(infoKey) || sessionStorage.getItem(infoKey)
  if(arrayJson) {
    return JSON.parse(arrayJson)
  }else {
    return {}
  }
}

export function setUserInfo(userInfo) {
  return localStorage.setItem(infoKey, JSON.stringify(userInfo))
}

export function removeUserInfo() {
  localStorage.removeItem(infoKey) && sessionStorage.removeItem(infoKey)
}

export function getToken() {
  return localStorage.getItem(TokenKey) || sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  localStorage.removeItem(TokenKey) && sessionStorage.removeItem(TokenKey)
}

export function getSidebarStatus() {
  return localStorage.getItem(sidebarStatusKey) || sessionStorage.getItem(sidebarStatusKey)
}

export function setSidebarStatus(status) {
  return localStorage.setItem(sidebarStatusKey, status)
}

export function removeSidebarStatus() {
  localStorage.removeItem(sidebarStatusKey) && sessionStorage.removeItem(sidebarStatusKey)
}

export function getRoles() {
  let arrayJson = localStorage.getItem(RoleKey) || sessionStorage.getItem(RoleKey)
  console.log(arrayJson)
  if(arrayJson) {
    return JSON.parse(arrayJson)
  }else {
    return []
  }
}

export function setRoles(roles) {
  return localStorage.setItem(RoleKey, JSON.stringify(roles))
}

export function removeRoles() {
  localStorage.removeItem(RoleKey) && sessionStorage.removeItem(RoleKey)
}

export function getAuths() {
  let arrayJson = localStorage.getItem(AuthKey) || sessionStorage.getItem(AuthKey)
  if(arrayJson) {
    return JSON.parse(arrayJson)
  }else {
    return []
  }
}

export function setAuths(auths) {
  return localStorage.setItem(AuthKey, JSON.stringify(auths))
}

export function removeAuths() {
  localStorage.removeItem(AuthKey) && sessionStorage.removeItem(AuthKey)
}