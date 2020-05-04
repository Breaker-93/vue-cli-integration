const TokenKey = 'token'
const sidebarStatusKey = 'sidebarStatus'

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