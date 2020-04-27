const TokenKey = 'token'

export function getToken() {
  return localStorage.getItem(TokenKey) || sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  localStorage.removeItem(TokenKey) && sessionStorage.removeItem(TokenKey)
}