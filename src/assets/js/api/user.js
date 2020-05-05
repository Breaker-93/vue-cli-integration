import xhr from '@utils/http'

export function login(username, password) {
  return xhr.post('/login', {
    username,
    password
  })
}

