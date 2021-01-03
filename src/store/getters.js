const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  userInfo: state => state.user.userInfo,
  roles: state => state.user.roles,
  accesses: state => state.user.accesses,
  authorities: state => state.user.authorities
}
export default getters
